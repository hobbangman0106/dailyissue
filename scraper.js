const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const iconv = require('iconv-lite');
const https = require('https');

const DATA_FILE = path.join(__dirname, 'data.json');
const JS_DATA_FILE = path.join(__dirname, 'data.js');

const PC_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

const CATEGORIES = ['정치', '경제', '사회', '과학', '예술', '세계'];

const TASKS = [
    { cat: '정치', portal: '네이버', url: 'https://news.naver.com/section/100', domain: 'naver.com' },
    { cat: '경제', portal: '네이버', url: 'https://news.naver.com/section/101', domain: 'naver.com' },
    { cat: '사회', portal: '네이버', url: 'https://news.naver.com/section/102', domain: 'naver.com' },
    { cat: '예술', portal: '네이버', url: 'https://news.naver.com/section/103', domain: 'naver.com' },
    { cat: '세계', portal: '네이버', url: 'https://news.naver.com/section/104', domain: 'naver.com' },
    { cat: '과학', portal: '네이버', url: 'https://news.naver.com/section/105', domain: 'naver.com' },
    
    { cat: '정치', portal: '다음', url: 'https://news.daum.net/politics', domain: 'daum.net' },
    { cat: '경제', portal: '다음', url: 'https://news.daum.net/economic', domain: 'daum.net' },
    { cat: '사회', portal: '다음', url: 'https://news.daum.net/society', domain: 'daum.net' },
    { cat: '예술', portal: '다음', url: 'https://news.daum.net/culture', domain: 'daum.net' },
    { cat: '세계', portal: '다음', url: 'https://news.daum.net/foreign', domain: 'daum.net' },
    { cat: '과학', portal: '다음', url: 'https://news.daum.net/digital', domain: 'daum.net' },

    { cat: '정치', portal: '네이트', url: 'https://news.nate.com/pol', domain: 'nate.com', enc: 'euc-kr' },
    { cat: '경제', portal: '네이트', url: 'https://news.nate.com/eco', domain: 'nate.com', enc: 'euc-kr' },
    { cat: '사회', portal: '네이트', url: 'https://news.nate.com/soc', domain: 'nate.com', enc: 'euc-kr' },
    { cat: '예술', portal: '네이트', url: 'https://news.nate.com/ent', domain: 'nate.com', enc: 'euc-kr' },
    { cat: '세계', portal: '네이트', url: 'https://news.nate.com/glbl', domain: 'nate.com', enc: 'euc-kr' },
    { cat: '과학', portal: '네이트', url: 'https://news.nate.com/its', domain: 'nate.com', enc: 'euc-kr' },

    { cat: '세계', portal: 'Yahoo US', url: 'https://news.yahoo.com/rss/world', domain: 'yahoo.com', isXml: true }
];

function parseNaver($, url) {
    const posts = [];
    $('.sa_text_title').each((i, el) => {
        if (posts.length >= 20) return;
        posts.push({ Title: $(el).text().trim(), Link: $(el).attr('href'), Portal: '네이버', Time: '' });
    });
    return posts;
}

function parseDaum($, url) {
    const posts = [];
    $('.item_tit a.tit_g').each((i, el) => {
        if (posts.length >= 20) return;
        posts.push({ Title: $(el).text().trim(), Link: $(el).attr('href'), Portal: '다음', Time: '' });
    });
    return posts;
}

function parseNate($, url) {
    const posts = [];
    $('.mduSubjectList a, .postSubjectList a, .tit').each((i, el) => {
        if (posts.length >= 20) return;
        const title = $(el).text().trim();
        let link = $(el).attr('href') || $(el).parent('a').attr('href') || '';
        if (title && link) {
            if (link.startsWith('//')) link = 'https:' + link;
            posts.push({ Title: title, Link: link, Portal: '네이트', Time: '' });
        }
    });
    return posts;
}

function parseYahooXml($, limit) {
    const posts = [];
    $('item').slice(0, limit).each((i, el) => {
        posts.push({
            Title: $(el).find('title').text() || '',
            Link: $(el).find('link').text() || '',
            Portal: 'Yahoo US',
            Time: $(el).find('pubDate').text() || ''
        });
    });
    return posts;
}

async function scrape() {
    let results = {};
    CATEGORIES.forEach(c => results[c] = []);

    for (const task of TASKS) {
        try {
            console.log(`Scraping ${task.portal} - ${task.cat}...`);
            let posts = [];

            if (task.isXml) {
                const response = await axios.get(task.url, { headers: { 'User-Agent': PC_UA }, httpsAgent, timeout: 8000 });
                const $ = cheerio.load(response.data, { xmlMode: true });
                posts = parseYahooXml($, 20);
            } else {
                let htmlData = '';
                const requestConfig = {
                    headers: { 'User-Agent': PC_UA },
                    httpsAgent,
                    timeout: 8000
                };

                if (task.enc === 'euc-kr') {
                    requestConfig.responseType = 'arraybuffer';
                    const response = await axios.get(task.url, requestConfig);
                    htmlData = iconv.decode(Buffer.from(response.data), 'euc-kr');
                } else {
                    const response = await axios.get(task.url, requestConfig);
                    htmlData = response.data;
                }

                const $ = cheerio.load(htmlData);
                
                if (task.portal === '네이버') posts = parseNaver($, task.url);
                else if (task.portal === '다음') posts = parseDaum($, task.url);
                else if (task.portal === '네이트') posts = parseNate($, task.url);
            }

            posts.forEach(p => {
                if (p.Title && p.Link) {
                    if (p.Link && !p.Link.startsWith('http')) {
                        try { p.Link = new URL(p.Link, task.url).href; } catch(e) {}
                    }
                    results[task.cat].push(p);
                }
            });
            console.log(`  Scraped ${posts.length} posts.`);
        } catch (error) {
            console.error(`Failed to scrape ${task.portal} - ${task.cat}: ${error.message}`);
        }
    }

    // Shuffle posts within categories to mix portals
    for (const cat of CATEGORIES) {
        for (let i = results[cat].length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [results[cat][i], results[cat][j]] = [results[cat][j], results[cat][i]];
        }
    }

    fs.writeFileSync(DATA_FILE, JSON.stringify(results, null, 2));
    fs.writeFileSync(JS_DATA_FILE, 'window.LOCAL_DATA = ' + JSON.stringify(results, null, 2) + ';');
    console.log('Update Complete.');
}

scrape();

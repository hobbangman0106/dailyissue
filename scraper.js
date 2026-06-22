const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const https = require('https');

const DATA_FILE = path.join(__dirname, 'data.json');
const JS_DATA_FILE = path.join(__dirname, 'data.js');

const PC_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

const CATEGORIES = ['전체', '경제', '세계', 'IT/과학', '생활', '문화', '정치', '연예', '스포츠'];

const TASKS = [
    // Naver
    { cat: '정치', portal: '네이버', url: 'https://news.naver.com/section/100' },
    { cat: '경제', portal: '네이버', url: 'https://news.naver.com/section/101' },
    { cat: '문화', portal: '네이버', url: 'https://news.naver.com/section/103' },
    { cat: '생활', portal: '네이버', url: 'https://news.naver.com/section/102' }, 
    { cat: '세계', portal: '네이버', url: 'https://news.naver.com/section/104' },
    { cat: '스포츠', portal: '네이버', url: 'https://sports.news.naver.com/index.nhn' },
    { cat: 'IT/과학', portal: '네이버', url: 'https://news.naver.com/section/105' },
    
    // Daum
    { cat: '정치', portal: '다음', url: 'https://news.daum.net/politics' },
    { cat: '경제', portal: '다음', url: 'https://news.daum.net/economic' },
    { cat: '문화', portal: '다음', url: 'https://news.daum.net/culture' },
    { cat: '생활', portal: '다음', url: 'https://news.daum.net/society' },
    { cat: '세계', portal: '다음', url: 'https://news.daum.net/foreign' },
    { cat: '스포츠', portal: '다음', url: 'https://sports.daum.net/' },
    { cat: 'IT/과학', portal: '다음', url: 'https://news.daum.net/digital' },
    { cat: '연예', portal: '다음', url: 'https://entertain.daum.net/' },

    // Google News
    { cat: '정치', portal: 'Google News', url: 'https://news.google.com/rss/headlines/section/topic/POLITICS?hl=ko&gl=KR&ceid=KR:ko', isXml: true },
    { cat: '경제', portal: 'Google News', url: 'https://news.google.com/rss/headlines/section/topic/BUSINESS?hl=ko&gl=KR&ceid=KR:ko', isXml: true },
    { cat: '생활', portal: 'Google News', url: 'https://news.google.com/rss/headlines/section/topic/HEALTH?hl=ko&gl=KR&ceid=KR:ko', isXml: true },
    { cat: '스포츠', portal: 'Google News', url: 'https://news.google.com/rss/headlines/section/topic/SPORTS?hl=ko&gl=KR&ceid=KR:ko', isXml: true },
    { cat: '세계', portal: 'Google News', url: 'https://news.google.com/rss/headlines/section/topic/WORLD?hl=ko&gl=KR&ceid=KR:ko', isXml: true },
    { cat: 'IT/과학', portal: 'Google News', url: 'https://news.google.com/rss/headlines/section/topic/TECHNOLOGY?hl=ko&gl=KR&ceid=KR:ko', isXml: true },
    { cat: '연예', portal: 'Google News', url: 'https://news.google.com/rss/headlines/section/topic/ENTERTAINMENT?hl=ko&gl=KR&ceid=KR:ko', isXml: true },

    // Yahoo US
    { cat: '세계', portal: 'Yahoo US', url: 'https://news.yahoo.com/rss/world', isXml: true },
    { cat: '스포츠', portal: 'Yahoo US', url: 'https://news.yahoo.com/rss/sports', isXml: true },
    { cat: 'IT/과학', portal: 'Yahoo US', url: 'https://news.yahoo.com/rss/tech', isXml: true },
    { cat: '연예', portal: 'Yahoo US', url: 'https://news.yahoo.com/rss/entertainment', isXml: true }
];

function parseNaver($, url) {
    const posts = [];
    
    if (url.includes('sports')) {
        $('.today_item .title, .text_area .title, a').each((i, el) => {
            const text = $(el).text().trim();
            const href = $(el).attr('href');
            if (href && (href.includes('/news/read') || href.includes('news/read'))) {
                if (text && text.length > 5 && posts.length < 20) {
                    posts.push({ Title: text, Link: href, Portal: '네이버' });
                }
            }
        });
        return posts;
    }

    $('.sa_text_title').each((i, el) => {
        if (posts.length >= 20) return;
        posts.push({ Title: $(el).text().trim(), Link: $(el).attr('href'), Portal: '네이버' });
    });
    return posts;
}

function parseDaum($, url) {
    const posts = [];
    $('a').each((i, el) => {
        const text = $(el).text().trim();
        const href = $(el).attr('href');
        if (text && text.length > 10 && href && href.includes('/v/')) {
            if (posts.length >= 20) return;
            posts.push({ Title: text, Link: href, Portal: '다음' });
        }
    });
    return posts;
}

function parseGoogleXml($, limit, portalName) {
    const posts = [];
    $('item').slice(0, limit).each((i, el) => {
        posts.push({
            Title: $(el).find('title').text() || '',
            Link: $(el).find('link').text() || '',
            Portal: portalName
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
                posts = parseGoogleXml($, 20, task.portal);
            } else {
                const requestConfig = {
                    headers: { 'User-Agent': PC_UA },
                    httpsAgent,
                    timeout: 8000
                };

                const response = await axios.get(task.url, requestConfig);
                const htmlData = response.data;
                const $ = cheerio.load(htmlData);
                
                if (task.portal === '네이버') posts = parseNaver($, task.url);
                else if (task.portal === '다음') posts = parseDaum($, task.url);
            }

            posts.forEach(p => {
                if (p.Title && p.Link) {
                    if (p.Link && !p.Link.startsWith('http')) {
                        try { p.Link = new URL(p.Link, task.url).href; } catch(e) {}
                    }
                    if (!results[task.cat].find(existing => existing.Title === p.Title)) {
                        results[task.cat].push(p);
                    }
                }
            });
            console.log(`  Scraped ${posts.length} posts.`);
        } catch (error) {
            console.error(`Failed to scrape ${task.portal} - ${task.cat}: ${error.message}`);
        }
    }

    for (const cat of CATEGORIES) {
        if(cat === '전체') continue;
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

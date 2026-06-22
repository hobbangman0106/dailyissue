const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const https = require('https');

const DATA_FILE = path.join(__dirname, 'data.json');
const JS_DATA_FILE = path.join(__dirname, 'data.js');

const PC_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

// New categories
const CATEGORIES = ['전체', '경제', '세계', 'IT/과학', '건강/의학', '생활/문화', '정치', '연예', '기타'];

const TASKS = [
    // --- 정치 ---
    { cat: '정치', portal: '네이버', url: 'https://news.naver.com/section/100' },
    { cat: '정치', portal: '다음', url: 'https://news.daum.net/politics' },
    { cat: '정치', portal: 'Google News', url: 'https://news.google.com/rss/headlines/section/topic/POLITICS?hl=ko&gl=KR&ceid=KR:ko', isXml: true },

    // --- 경제 (금융, 증권, 부동산, 코인, 금 포함) ---
    { cat: '경제', portal: '네이버', url: 'https://news.naver.com/section/101' },
    { cat: '경제', portal: '다음', url: 'https://news.daum.net/economic' },
    { cat: '경제', portal: '다음', url: 'https://realestate.daum.net/news' }, // Daum Real estate
    { cat: '경제', portal: 'Google News', url: 'https://news.google.com/rss/headlines/section/topic/BUSINESS?hl=ko&gl=KR&ceid=KR:ko', isXml: true },
    { cat: '경제', portal: 'Google News', url: 'https://news.google.com/rss/search?q=%EB%B9%84%ED%8A%B8%EC%BD%94%EC%9D%B8+OR+%EA%B0%80%EC%83%81%ED%99%94%ED%8F%90+OR+%EB%B6%80%EB%8F%99%EC%82%B0+OR+%EC%A6%9D%EA%B6%8C+OR+%EA%B8%88%EA%B0%92&hl=ko&gl=KR&ceid=KR:ko', isXml: true }, // Search for Bitcoin, Crypto, Real estate, Stocks, Gold

    // --- 세계 ---
    { cat: '세계', portal: '네이버', url: 'https://news.naver.com/section/104' },
    { cat: '세계', portal: '다음', url: 'https://news.daum.net/foreign' },
    { cat: '세계', portal: 'Google News', url: 'https://news.google.com/rss/headlines/section/topic/WORLD?hl=ko&gl=KR&ceid=KR:ko', isXml: true },
    { cat: '세계', portal: 'Yahoo US', url: 'https://news.yahoo.com/rss/world', isXml: true },

    // --- IT/과학 ---
    { cat: 'IT/과학', portal: '네이버', url: 'https://news.naver.com/section/105' },
    { cat: 'IT/과학', portal: '다음', url: 'https://news.daum.net/digital' },
    { cat: 'IT/과학', portal: 'Google News', url: 'https://news.google.com/rss/headlines/section/topic/TECHNOLOGY?hl=ko&gl=KR&ceid=KR:ko', isXml: true },
    { cat: 'IT/과학', portal: 'Yahoo US', url: 'https://news.yahoo.com/rss/tech', isXml: true },

    // --- 건강/의학 ---
    { cat: '건강/의학', portal: 'Google News', url: 'https://news.google.com/rss/headlines/section/topic/HEALTH?hl=ko&gl=KR&ceid=KR:ko', isXml: true },
    { cat: '건강/의학', portal: 'Yahoo US', url: 'https://news.yahoo.com/rss/health', isXml: true },

    // --- 생활/문화 (통합) ---
    { cat: '생활/문화', portal: '네이버', url: 'https://news.naver.com/section/103' }, // Naver Life/Culture
    { cat: '생활/문화', portal: '네이버', url: 'https://news.naver.com/section/102' }, // Naver Society
    { cat: '생활/문화', portal: '다음', url: 'https://news.daum.net/society' }, // Daum Society
    { cat: '생활/문화', portal: '다음', url: 'https://news.daum.net/culture' }, // Daum Culture

    // --- 연예 ---
    { cat: '연예', portal: '다음', url: 'https://entertain.daum.net/' },
    { cat: '연예', portal: 'Google News', url: 'https://news.google.com/rss/headlines/section/topic/ENTERTAINMENT?hl=ko&gl=KR&ceid=KR:ko', isXml: true },
    { cat: '연예', portal: 'Yahoo US', url: 'https://news.yahoo.com/rss/entertainment', isXml: true },

    // --- 기타 (유머, 시사 상식, 칼럼 등) ---
    { cat: '기타', portal: 'Google News', url: 'https://news.google.com/rss/search?q=%EC%9C%A0%EB%A8%B8&hl=ko&gl=KR&ceid=KR:ko', isXml: true },
    { cat: '기타', portal: 'Google News', url: 'https://news.google.com/rss/search?q=%EC%8B%9C%EC%82%AC%EC%83%81%EC%8B%9D&hl=ko&gl=KR&ceid=KR:ko', isXml: true },
    { cat: '기타', portal: 'Google News', url: 'https://news.google.com/rss/search?q=%EC%B9%BC%EB%9F%BC&hl=ko&gl=KR&ceid=KR:ko', isXml: true },
    { cat: '기타', portal: '다음', url: 'https://news.daum.net/editorial' }
];

function parseNaver($, url) {
    const posts = [];
    if (url.includes('sports')) {
        $('.today_item .title, .text_area .title, a').each((i, el) => {
            const text = $(el).text().trim();
            const href = $(el).attr('href');
            if (href && (href.includes('/news/read') || href.includes('news/read'))) {
                if (text && text.length > 5 && posts.length < 40) {
                    posts.push({ Title: text, Link: href, Portal: '네이버' });
                }
            }
        });
        return posts;
    }
    $('.sa_text_title').each((i, el) => {
        if (posts.length >= 40) return;
        posts.push({ Title: $(el).text().trim(), Link: $(el).attr('href'), Portal: '네이버' });
    });
    return posts;
}

function parseDaum($, url) {
    const posts = [];
    $('a').each((i, el) => {
        let text = $(el).find('.tit_txt, .tit_g, .tit_thumb, .tit_main, strong').first().text().trim();
        if (!text) {
            // Fallback to text if no inner title elements exist, but remove child paragraph/span texts if possible
            const clone = $(el).clone();
            clone.find('p, span, .desc_txt, .info_txt').remove();
            text = clone.text().replace(/\s+/g, ' ').trim();
        }
        
        const href = $(el).attr('href');
        if (text && text.length > 5 && href && href.includes('/v/')) {
            if (posts.length >= 40) return;
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
                posts = parseGoogleXml($, 40, task.portal); // Fetch up to 40
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
        
        // Add Category tag to each post
        results[cat] = results[cat].map(p => ({ ...p, Category: cat }));

        for (let i = results[cat].length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [results[cat][i], results[cat][j]] = [results[cat][j], results[cat][i]];
        }

        // Aggregate into '전체'
        results['전체'] = results['전체'].concat(results[cat]);
    }

    // Shuffle '전체'
    for (let i = results['전체'].length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [results['전체'][i], results['전체'][j]] = [results['전체'][j], results['전체'][i]];
    }

    fs.writeFileSync(DATA_FILE, JSON.stringify(results, null, 2));
    fs.writeFileSync(JS_DATA_FILE, 'window.LOCAL_DATA = ' + JSON.stringify(results, null, 2) + ';');
    console.log('Update Complete.');
}

scrape();

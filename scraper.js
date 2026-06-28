const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const https = require('https');
const iconv = require('iconv-lite');

const DATA_FILE = path.join(__dirname, 'data.json');
const JS_DATA_FILE = path.join(__dirname, 'data.js');

const PC_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

// New categories
const CATEGORIES = ['전체', '경제', '사회', '정치', '생활/건강', '세계', 'IT/과학', '연예', '스포츠'];

const TASKS = [
    // --- 정치 ---
    { cat: '정치', portal: '네이버', url: 'https://news.naver.com/main/ranking/popularDay.naver?rankingType=age&subType=100' },
    { cat: '정치', portal: '다음', url: 'https://news.daum.net/politics' },
    { cat: '정치', portal: 'Google News', url: 'https://news.google.com/rss/headlines/section/topic/POLITICS?hl=ko&gl=KR&ceid=KR:ko', isXml: true },

    // --- 경제 (투자 정보 집중 배치: 부동산, 증권, 채권, 금, 석유, 비트코인, 기업 실적 및 전망 등) ---
    { cat: '경제', portal: '네이버', url: 'https://finance.naver.com/news/news_list.naver?mode=RANK' },
    { cat: '경제', portal: 'Google News', url: 'https://news.google.com/rss/search?q=%EB%B6%80%EB%8F%99%EC%82%B0+OR+%EC%95%84%ED%8C%8C%ED%8A%B8+OR+%EC%A3%BC%ED%83%9D&hl=ko&gl=KR&ceid=KR:ko', isXml: true }, // 부동산
    { cat: '경제', portal: 'Google News', url: 'https://news.google.com/rss/search?q=%EC%A3%BC%EC%8B%9D+OR+%EC%A6%9D%EA%B6%8C+OR+%EC%B1%84%EA%B6%8C+OR+%ED%8E%80%EB%93%9C+OR+%EC%84%A0%EB%AC%BC%EA%B1%B0%EB%9E%98&hl=ko&gl=KR&ceid=KR:ko', isXml: true }, // 주식/채권/선물/펀드
    { cat: '경제', portal: 'Google News', url: 'https://news.google.com/rss/search?q=%ED%99%98%EC%9C%A8+OR+%EA%B8%88%EB%A6%AC+OR+%EC%98%88%EC%A0%81%EA%B8%88+OR+%EA%B8%88%EC%9C%B5%EC%83%81%ED%92%88&hl=ko&gl=KR&ceid=KR:ko', isXml: true }, // 환율/금리/예적금/금융상품
    { cat: '경제', portal: 'Google News', url: 'https://news.google.com/rss/search?q=%EA%B8%88%EA%B0%92+OR+%EC%85%A5%EC%9C%A0+OR+%EC%9C%A0%EA%B0%80+OR+%EC%9B%90%EC%9E%90%EC%9E%AC&hl=ko&gl=KR&ceid=KR:ko', isXml: true }, // 금/석유/원자재
    { cat: '경제', portal: 'Google News', url: 'https://news.google.com/rss/search?q=%EB%B9%84%ED%8A%B8%EC%BD%94%EC%9D%B8+OR+%EA%B0%80%EC%83%81%EC%9E%90%EC%82%B0+OR+%EC%95%94%ED%98%B8%ED%99%94%ED%8F%90&hl=ko&gl=KR&ceid=KR:ko', isXml: true }, // 비트코인/가상자산
    { cat: '경제', portal: 'Google News', url: 'https://news.google.com/rss/search?q=%EA%B8%B0%EC%97%85%EC%8B%A4%EC%A0%81+OR+%EC%98%81%EC%97%85%EC%9D%B4%EC%9D%B5+OR+%EA%B8%B0%EC%97%85%EC%A0%84%EB%A7%9D&hl=ko&gl=KR&ceid=KR:ko', isXml: true }, // 기업 실적 및 전망

    // --- 사회 (사건사고, 사회 일반, 사설/칼럼) ---
    { cat: '사회', portal: '네이버', url: 'https://news.naver.com/main/ranking/popularDay.naver?rankingType=age&subType=102' }, // 사회 랭킹
    { cat: '사회', portal: '다음', url: 'https://news.daum.net/society' }, // 사회 섹션
    { cat: '사회', portal: 'Google News', url: 'https://news.google.com/rss/search?q=%EC%82%AC%EA%B1%B4%EC%82%AC%EA%B3%A0+OR+%EC%8B%9C%EC%82%AC%EC%83%81%EC%8B%9D&hl=ko&gl=KR&ceid=KR:ko', isXml: true }, // 사건사고/시사상식
    { cat: '사회', portal: '다음', url: 'https://news.daum.net/editorial' }, // 사설/칼럼

    // --- 생활/건강 (문화, 건강, 웰빙 정보 특화) ---
    { cat: '생활/건강', portal: '네이버', url: 'https://news.naver.com/main/ranking/popularDay.naver?rankingType=age&subType=103' }, // 생활/문화 랭킹
    { cat: '생활/건강', portal: '다음', url: 'https://news.daum.net/culture' }, // 문화/생활
    { cat: '생활/건강', portal: 'Google News', url: 'https://news.google.com/rss/headlines/section/topic/HEALTH?hl=ko&gl=KR&ceid=KR:ko', isXml: true },
    { cat: '생활/건강', portal: 'Yahoo US', url: 'https://news.yahoo.com/rss/health', isXml: true },

    // --- 세계 ---
    { cat: '세계', portal: '네이버', url: 'https://news.naver.com/main/ranking/popularDay.naver?rankingType=age&subType=104' },
    { cat: '세계', portal: '다음', url: 'https://news.daum.net/foreign' },
    { cat: '세계', portal: 'Google News', url: 'https://news.google.com/rss/headlines/section/topic/WORLD?hl=ko&gl=KR&ceid=KR:ko', isXml: true },
    { cat: '세계', portal: 'Yahoo US', url: 'https://news.yahoo.com/rss/world', isXml: true },

    // --- IT/과학 ---
    { cat: 'IT/과학', portal: '네이버', url: 'https://news.naver.com/main/ranking/popularDay.naver?rankingType=age&subType=105' },
    { cat: 'IT/과학', portal: '다음', url: 'https://news.daum.net/digital' },
    { cat: 'IT/과학', portal: 'Google News', url: 'https://news.google.com/rss/headlines/section/topic/TECHNOLOGY?hl=ko&gl=KR&ceid=KR:ko', isXml: true },
    { cat: 'IT/과학', portal: 'Yahoo US', url: 'https://news.yahoo.com/rss/tech', isXml: true },

    // --- 연예 ---
    { cat: '연예', portal: '다음', url: 'https://entertain.daum.net/' },
    { cat: '연예', portal: 'Google News', url: 'https://news.google.com/rss/headlines/section/topic/ENTERTAINMENT?hl=ko&gl=KR&ceid=KR:ko', isXml: true },
    { cat: '연예', portal: 'Yahoo US', url: 'https://news.yahoo.com/rss/entertainment', isXml: true },

    // --- 스포츠 ---
    { cat: '스포츠', portal: '다음', url: 'https://sports.daum.net/' },
    { cat: '스포츠', portal: 'Google News', url: 'https://news.google.com/rss/headlines/section/topic/SPORTS?hl=ko&gl=KR&ceid=KR:ko', isXml: true },
    { cat: '스포츠', portal: 'Yahoo US', url: 'https://news.yahoo.com/rss/sports', isXml: true }
];

function parseNaver($, url) {
    const posts = [];
    if (url.includes('finance.naver.com')) {
        $('a[href*="news_read.naver"]').each((i, el) => {
            if (posts.length >= 40) return;
            const title = $(el).attr('title') || $(el).text().trim();
            let href = $(el).attr('href');
            if (title && title.length > 5 && href) {
                // Convert clunky finance link to clean direct Naver News link
                if (href.includes('article_id=') && href.includes('office_id=')) {
                    try {
                        const resolvedUrl = new URL(href, 'https://finance.naver.com');
                        const officeId = resolvedUrl.searchParams.get('office_id');
                        const articleId = resolvedUrl.searchParams.get('article_id');
                        if (officeId && articleId) {
                            href = `https://n.news.naver.com/article/${officeId}/${articleId}`;
                        }
                    } catch (e) {}
                }
                if (!posts.find(p => p.Title === title)) {
                    posts.push({ Title: title, Link: href, Portal: '네이버' });
                }
            }
        });
        return posts;
    }
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
    if (url.includes('ranking')) {
        $('.rankingnews_list li a, .rankingnews_list a, a.ranking_title').each((i, el) => {
            if (posts.length >= 40) return;
            const title = $(el).attr('title') || $(el).text().trim();
            const href = $(el).attr('href');
            if (title && title.length > 5 && href) {
                if (!posts.find(p => p.Title === title)) {
                    posts.push({ Title: title, Link: href, Portal: '네이버' });
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
        if (posts.length >= 40) return;
        const href = $(el).attr('href');
        if (href && href.includes('/v/')) {
            let title = '';
            
            // 1. If it has a data-title attribute, decode it (prevents body leaking)
            const dataTitle = $(el).attr('data-title');
            if (dataTitle) {
                try {
                    title = decodeURIComponent(dataTitle).trim();
                } catch (e) {
                    title = '';
                }
            }
            
            // 2. If no data-title, look for specific title child elements
            if (!title) {
                const titTxt = $(el).find('.tit_txt, .tit_g, .link_txt, strong').first();
                if (titTxt.length > 0) {
                    title = titTxt.text().trim();
                }
            }
            
            // 3. Fallback: if still no title and it's a simple link, use its own text but only if it's not wrapping description
            if (!title) {
                if ($(el).find('.desc_txt, .info_txt, .txt_g, .desc_g').length === 0) {
                    title = $(el).text().trim();
                }
            }
            
            // Clean title from extra whitespaces/newlines
            title = title.replace(/\s+/g, ' ').trim();

            if (title && title.length > 5) {
                if (!posts.find(p => p.Title === title)) {
                    posts.push({ Title: title, Link: href, Portal: '다음' });
                }
            }
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

// Seed-based random generator (LCG)
function seededRandom(seed) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

// Seed-based shuffle function
function seededShuffle(array, seed) {
    let m = array.length, t, i;
    let s = seed;
    while (m) {
        const r = seededRandom(s++);
        i = Math.floor(r * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
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
                if (task.portal === '네이버') {
                    requestConfig.responseType = 'arraybuffer';
                }
                const response = await axios.get(task.url, requestConfig);
                
                let htmlData;
                if (task.portal === '네이버') {
                    htmlData = iconv.decode(response.data, 'EUC-KR');
                } else {
                    htmlData = response.data;
                }
                
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

    const now = new Date();
    // Deterministic 1-hour seed (e.g., 2026062219)
    const timeSeed = now.getFullYear() * 1000000 + (now.getMonth() + 1) * 10000 + now.getDate() * 100 + now.getHours();

    for (const cat of CATEGORIES) {
        if(cat === '전체') continue;
        
        // Add Category tag to each post
        results[cat] = results[cat].map(p => ({ ...p, Category: cat }));

        // Shuffle with time seed
        seededShuffle(results[cat], timeSeed);

        // Aggregate into '전체'
        results['전체'] = results['전체'].concat(results[cat]);
    }

    // Shuffle '전체' using the same hour-based seed
    seededShuffle(results['전체'], timeSeed);

    fs.writeFileSync(DATA_FILE, JSON.stringify(results, null, 2));
    fs.writeFileSync(JS_DATA_FILE, 'window.LOCAL_DATA = ' + JSON.stringify(results, null, 2) + ';');
    console.log('Update Complete.');
}

scrape();

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const iconv = require('iconv-lite');
const https = require('https');

const DATA_FILE = 'data.json';
const JS_DATA_FILE = 'data.js';

const PC_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

// Categories including Economic Dashboard and YouTube
const CATEGORIES = ['증시/지표', '전체', '경제', '사회', '정치', '생활/건강', '세계', 'IT/과학', '연예', '스포츠', '칼럼', '유튜브'];

const TASKS = [
    // --- 정치 ---
    { cat: '정치', portal: '네이버', url: 'https://news.naver.com/main/main.naver?mode=LSD&mid=shm&sid1=100', tier: 1 },
    { cat: '정치', portal: '다음', url: 'https://news.daum.net/politics', tier: 1 },
    { cat: '정치', portal: 'ZUM', url: 'https://news.zum.com/front?c=01', tier: 1 },
    { cat: '정치', portal: 'Google News', url: 'https://news.google.com/rss/headlines/section/topic/POLITICS?hl=ko&gl=KR&ceid=KR:ko', isXml: true, tier: 1 },

    // --- 경제 (투자 정보 집중 배치: 부동산, 증권, 채권, 금, 석유, 비트코인, 기업 실적 및 전망 등) ---
    { cat: '경제', portal: '네이버', url: 'https://finance.naver.com/news/news_list.naver?mode=RANK', tier: 1 },
    { cat: '경제', portal: '다음', url: 'https://news.daum.net/economy', tier: 1 },
    { cat: '경제', portal: 'ZUM', url: 'https://news.zum.com/front?c=03', tier: 1 },
    { cat: '경제', portal: 'Google News', url: 'https://news.google.com/rss/search?q=%EB%B6%80%EB%8F%99%EC%82%B0+OR+%EC%95%84%ED%8C%8C%ED%8A%B8+OR+%EC%A3%BC%ED%83%9D&hl=ko&gl=KR&ceid=KR:ko', isXml: true, tier: 3 },
    { cat: '경제', portal: 'Google News', url: 'https://news.google.com/rss/search?q=%EC%A3%BC%EC%8B%9D+OR+%EC%A6%9D%EA%B6%8C+OR+%EC%B1%84%EA%B6%8C+OR+%ED%8E%80%EB%93%9C+OR+%EC%84%A0%EB%AC%BC%EA%B1%B0%EB%9E%98&hl=ko&gl=KR&ceid=KR:ko', isXml: true, tier: 3 },
    { cat: '경제', portal: 'Google News', url: 'https://news.google.com/rss/search?q=%ED%99%98%EC%9C%A8+OR+%EA%B8%88%EB%A6%AC+OR+%EC%98%88%EC%A0%81%EA%B8%88+OR+%EA%B8%88%EC%9C%B5%EC%83%81%ED%92%88&hl=ko&gl=KR&ceid=KR:ko', isXml: true, tier: 3 },
    { cat: '경제', portal: 'Google News', url: 'https://news.google.com/rss/search?q=%EA%B8%B8%EA%B0%92+OR+%EC%85%A5%EC%9C%A0+OR+%EC%9C%A0%EA%B0%80+OR+%EC%9B%90%EC%9E%90%EC%9E%AC&hl=ko&gl=KR&ceid=KR:ko', isXml: true, tier: 3 },
    { cat: '경제', portal: 'Google News', url: 'https://news.google.com/rss/search?q=%EB%B9%8B%ED%8A%B8%EC%BD%94%EC%9D%B8+OR+%EA%B0%80%EC%83%81%EC%9E%90%EC%82%B0+OR+%EC%95%94%ED%98%B8%ED%99%94%ED%8F%90&hl=ko&gl=KR&ceid=KR:ko', isXml: true, tier: 3 },
    { cat: '경제', portal: 'Google News', url: 'https://news.google.com/rss/search?q=%EA%B8%B0%EC%97%85%EC%8B%A4%EC%A0%81+OR+%EC%98%81%EC%97%85%EC%9D%B4%EC%9D%B5+OR+%EA%B8%B0%EC%97%85%EC%A0%전망&hl=ko&gl=KR&ceid=KR:ko', isXml: true, tier: 3 },

    // --- 사회 (사건사고, 사회 일반) ---
    { cat: '사회', portal: '네이버', url: 'https://news.naver.com/main/main.naver?mode=LSD&mid=shm&sid1=102', tier: 1 },
    { cat: '사회', portal: '다음', url: 'https://news.daum.net/society', tier: 1 },
    { cat: '사회', portal: 'ZUM', url: 'https://news.zum.com/front?c=02', tier: 1 },
    { cat: '사회', portal: 'Google News', url: 'https://news.google.com/rss/search?q=%EC%82%AC%EA%B1%B4%EC%82%AC%EA%B3%A0+OR+%EC%8B%9C%EC%82%AC%EC%83%81%EC%8B%9D&hl=ko&gl=KR&ceid=KR:ko', isXml: true, tier: 3 },

    // --- 생활/건강 (문화, 건강, 웰빙 정보 특화) ---
    { cat: '생활/건강', portal: '네이버', url: 'https://news.naver.com/main/main.naver?mode=LSD&mid=shm&sid1=103', tier: 1 },
    { cat: '생활/건강', portal: '다음', url: 'https://news.daum.net/culture', tier: 1 },
    { cat: '생활/건강', portal: 'ZUM', url: 'https://news.zum.com/front?c=07', tier: 1 },
    { cat: '생활/건강', portal: 'Google News', url: 'https://news.google.com/rss/headlines/section/topic/HEALTH?hl=ko&gl=KR&ceid=KR:ko', isXml: true, tier: 1 },

    // --- 세계 ---
    { cat: '세계', portal: '네이버', url: 'https://news.naver.com/main/main.naver?mode=LSD&mid=shm&sid1=104', tier: 1 },
    { cat: '세계', portal: '다음', url: 'https://news.daum.net/foreign', tier: 1 },
    { cat: '세계', portal: 'ZUM', url: 'https://news.zum.com/front?c=04', tier: 1 },
    { cat: '세계', portal: 'Google News', url: 'https://news.google.com/rss/headlines/section/topic/WORLD?hl=ko&gl=KR&ceid=KR:ko', isXml: true, tier: 1 },

    // --- IT/과학 ---
    { cat: 'IT/과학', portal: '네이버', url: 'https://news.naver.com/main/main.naver?mode=LSD&mid=shm&sid1=105', tier: 1 },
    { cat: 'IT/과학', portal: '다음', url: 'https://news.daum.net/digital', tier: 1 },
    { cat: 'IT/과학', portal: 'ZUM', url: 'https://news.zum.com/front?c=08', tier: 1 },
    { cat: 'IT/과학', portal: 'Google News', url: 'https://news.google.com/rss/headlines/section/topic/TECHNOLOGY?hl=ko&gl=KR&ceid=KR:ko', isXml: true, tier: 1 },

    // --- 연예 ---
    { cat: '연예', portal: '다음', url: 'https://entertain.daum.net/', tier: 1 },
    { cat: '연예', portal: 'ZUM', url: 'https://news.zum.com/front?c=06', tier: 1 },
    { cat: '연예', portal: 'Google News', url: 'https://news.google.com/rss/headlines/section/topic/ENTERTAINMENT?hl=ko&gl=KR&ceid=KR:ko', isXml: true, tier: 1 },

    // --- 스포츠 ---
    { cat: '스포츠', portal: '다음', url: 'https://sports.daum.net/', tier: 1 },
    { cat: '스포츠', portal: 'ZUM', url: 'https://news.zum.com/front?c=05', tier: 1 },
    { cat: '스포츠', portal: 'Google News', url: 'https://news.google.com/rss/headlines/section/topic/SPORTS?hl=ko&gl=KR&ceid=KR:ko', isXml: true, tier: 1 },

    // --- 칼럼 ---
    { cat: '칼럼', portal: '다음', url: 'https://news.daum.net/editorial', tier: 1 },
    { cat: '칼럼', portal: 'ZUM', url: 'https://news.zum.com/front?c=09', tier: 1 },
    { cat: '칼럼', portal: 'Google News', url: 'https://news.google.com/rss/search?q=%EC%82%AC%EC%85%8B+OR+%EC%B9%BC%EB%9F%BC+OR+%EB%A7%8C%ED%8F%89&hl=ko&gl=KR&ceid=KR:ko', isXml: true, tier: 3 },

    // --- 유튜브 (검증된 고품격 교양/지식 전문 추천 채널 RSS) ---
    // 뉴스/시사
    { cat: '유튜브', subCat: '뉴스/시사', portal: 'YouTube', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCcQTRi69dsVYHN3exePtZ1A', isXml: true, tier: 1, channelName: 'KBS뉴스' },
    { cat: '유튜브', subCat: '뉴스/시사', portal: 'YouTube', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCF4Wxdo3inmxP-Y59wXDsFw', isXml: true, tier: 1, channelName: 'MBC뉴스' },
    { cat: '유튜브', subCat: '뉴스/시사', portal: 'YouTube', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCkinYTS9IHqOEwR1Sze2JTw', isXml: true, tier: 1, channelName: 'SBS뉴스' },
    { cat: '유튜브', subCat: '뉴스/시사', portal: 'YouTube', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCsU-I-vHLiaMfV_ceaYz5rQ', isXml: true, tier: 1, channelName: 'JTBC뉴스' },
    { cat: '유튜브', subCat: '뉴스/시사', portal: 'YouTube', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UChlgI3UHCOnwUGzWzbJ3H5w', isXml: true, tier: 1, channelName: 'YTN뉴스' },
    { cat: '유튜브', subCat: '뉴스/시사', portal: 'YouTube', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCGMVfIVvYVJRL2bQXl1sxiw', isXml: true, tier: 1, channelName: 'OBS뉴스' },
    // 경제
    { cat: '유튜브', subCat: '경제', portal: 'YouTube', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCOB62fKRT7b73X7tRxMuN2g', isXml: true, tier: 1, channelName: '박종훈의 지식한방' },
    { cat: '유튜브', subCat: '경제', portal: 'YouTube', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCl_tB4AqPkkxuYcJQHz6dMw', isXml: true, tier: 1, channelName: '교양이를 부탁해' },
    { cat: '유튜브', subCat: '경제', portal: 'YouTube', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCFCtZJTuJhE18k8IXwmXTYQ', isXml: true, tier: 1, channelName: 'EBS 다큐멘터리' },
    { cat: '유튜브', subCat: '경제', portal: 'YouTube', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCF8AeLlUbEpKju6v1H6p8Eg', isXml: true, tier: 1, channelName: '한국경제TV' },
    { cat: '유튜브', subCat: '경제', portal: 'YouTube', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCsJ6RuBiTVWRX156FVbeaGg', isXml: true, tier: 1, channelName: '슈카월드' },
    { cat: '유튜브', subCat: '경제', portal: 'YouTube', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCGCGxsbmG_9nincyI7xypow', isXml: true, tier: 1, channelName: '한경 코리아마켓' },
    { cat: '유튜브', subCat: '경제', portal: 'YouTube', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UC3p-0EWA8OXko2EUDUXAy5w', isXml: true, tier: 1, channelName: '서울경제TV' },
    { cat: '유튜브', subCat: '경제', portal: 'YouTube', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCnfwIKyFYRuqZzzKBDt6JOA', isXml: true, tier: 1, channelName: '매일경제TV' },
    // 과학
    { cat: '유튜브', subCat: '과학', portal: 'YouTube', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCMc4EmuDxnHPc6pgGW-QWvQ', isXml: true, tier: 1, channelName: '안될과학' },
    { cat: '유튜브', subCat: '과학', portal: 'YouTube', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCIk1-yPCTnFuzfgu4gyfWqw', isXml: true, tier: 1, channelName: '과학드림' },
    { cat: '유튜브', subCat: '과학', portal: 'YouTube', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCoCvTlU0KpNYwnMIgs7MPrA', isXml: true, tier: 1, channelName: 'boda' },
    { cat: '유튜브', subCat: '과학', portal: 'YouTube', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCsOmBJ5jPTufS7sHea1HiTw', isXml: true, tier: 1, channelName: '석군의 비밀 수납장' },
    { cat: '유튜브', subCat: '과학', portal: 'YouTube', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UC7F6UDq3gykPZHWRhrj_BDw', isXml: true, tier: 1, channelName: '사물궁이 잡학지식' },
    { cat: '유튜브', subCat: '과학', portal: 'YouTube', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCPECLB_-7T4WukChKqhjv8g', isXml: true, tier: 1, channelName: '내셔널지오그래픽 코리아' },
    { cat: '유튜브', subCat: '과학', portal: 'YouTube', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCZdBJIbJz0P9xyFipgOj1fA', isXml: true, tier: 1, channelName: 'YTN 사이언스' },
    { cat: '유튜브', subCat: '과학', portal: 'YouTube', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UC8rKCy_tipwTEY3RdkNCKmw', isXml: true, tier: 1, channelName: '쿠르츠게작트 (한국어)' },
    // 의학/건강
    { cat: '유튜브', subCat: '의학/건강', portal: 'YouTube', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCF9vbHlZpz7FbOAky3fnYxw', isXml: true, tier: 1, channelName: '의학채널 비온뒤' },
    { cat: '유튜브', subCat: '의학/건강', portal: 'YouTube', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCedNxnMK3b2-_hzqLyo4stg', isXml: true, tier: 1, channelName: '닥터딩요' },
    // 인문/교양
    { cat: '유튜브', subCat: '인문/교양', portal: 'YouTube', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCvW8norVMTLt7QN-s2pS4Bw', isXml: true, tier: 1, channelName: '조승연의 탐구생활' },
    { cat: '유튜브', subCat: '인문/교양', portal: 'YouTube', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCcYk_KPZZMLv_bcaSAWSSxA', isXml: true, tier: 1, channelName: '지식브런치' },
    { cat: '유튜브', subCat: '인문/교양', portal: 'YouTube', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UC-swf20n5xdKW0waeLpXPFQ', isXml: true, tier: 1, channelName: 'EBS' },
    { cat: '유튜브', subCat: '인문/교양', portal: 'YouTube', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UC3CVLtaxfEbbgB8WHG3CyAQ', isXml: true, tier: 1, channelName: 'KBS 다큐' },
];

function parseNaver($, url) {
    const posts = [];
    if (url.includes('finance.naver.com')) {
        $('a[href*="news_read.naver"]').each((i, el) => {
            if (posts.length >= 40) return;
            const href = $(el).attr('href');
            const text = $(el).text().trim();
            if (href && text && text.length > 5) {
                let office_id = '';
                let article_id = '';
                try {
                    const urlObj = new URL(href, 'https://finance.naver.com');
                    office_id = urlObj.searchParams.get('office_id') || '';
                    article_id = urlObj.searchParams.get('article_id') || '';
                } catch(e) {}

                if (office_id && article_id) {
                    const cleanUrl = `https://n.news.naver.com/article/${office_id}/${article_id}`;
                    if (!posts.find(p => p.Link === cleanUrl)) {
                        posts.push({ Title: text, Link: cleanUrl, Portal: '네이버' });
                    }
                } else {
                    posts.push({ Title: text, Link: href, Portal: '네이버' });
                }
            }
        });
        return posts;
    }
    
    if (url.includes('main.naver')) {
        $('a').each((i, el) => {
            if (posts.length >= 40) return;
            const title = $(el).text().trim() || $(el).attr('title') || '';
            let href = $(el).attr('href') || '';
            
            const cleanTitle = title.replace(/\s+/g, ' ').trim();
            
            if (href.includes('article') && cleanTitle.length > 10) {
                if (cleanTitle.includes('동영상') || cleanTitle.includes('재생시간') || cleanTitle.includes('포토') || cleanTitle.includes('카드뉴스') || cleanTitle.includes('동영상기사')) {
                    return;
                }
                
                if (href.startsWith('//')) {
                    href = 'https:' + href;
                } else if (href.startsWith('/')) {
                    href = 'https://news.naver.com' + href;
                }
                
                let office_id = '';
                let article_id = '';
                try {
                    const urlObj = new URL(href, 'https://news.naver.com');
                    office_id = urlObj.searchParams.get('office_id') || '';
                    article_id = urlObj.searchParams.get('article_id') || '';
                    if (!office_id || !article_id) {
                        const match = href.match(/\/article\/(\d+)\/(\d+)/);
                        if (match) {
                            office_id = match[1];
                            article_id = match[2];
                        }
                    }
                } catch(e) {}

                if (office_id && article_id) {
                    const cleanUrl = `https://n.news.naver.com/article/${office_id}/${article_id}`;
                    if (!posts.find(p => p.Link === cleanUrl || p.Title === cleanTitle)) {
                        posts.push({ Title: cleanTitle, Link: cleanUrl, Portal: '네이버' });
                    }
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
            const dataTitle = $(el).attr('data-title');
            if (dataTitle) {
                try {
                    title = decodeURIComponent(dataTitle).trim();
                } catch (e) {
                    title = '';
                }
            }
            if (!title) {
                const titTxt = $(el).find('.tit_txt, .tit_g, .link_txt, strong').first();
                if (titTxt.length > 0) {
                    title = titTxt.text().trim();
                }
            }
            if (!title) {
                if ($(el).find('.desc_txt, .info_txt, .txt_g, .desc_g').length === 0) {
                    title = $(el).text().trim();
                }
            }
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

function parseZum($, url) {
    const posts = [];
    $('a').each((i, el) => {
        if (posts.length >= 40) return;
        let href = $(el).attr('href') || '';
        
        if (href.startsWith('http') && !href.includes('zum.com')) {
            let title = '';
            const titleEl = $(el).find('.title');
            if (titleEl.length > 0) {
                title = titleEl.text().trim();
            } else {
                const clone = $(el).clone();
                clone.find('.text, .thumb, .desc, .info, .media').remove();
                title = clone.text().trim();
            }
            
            const cleanTitle = title.replace(/\s+/g, ' ').trim();
            
            if (cleanTitle.length > 10) {
                if (cleanTitle.includes('이용약관') || cleanTitle.includes('개인정보') || cleanTitle.includes('고객센터') || cleanTitle.includes('저작권')) {
                    return;
                }
                if (!posts.find(p => p.Link === href || p.Title === cleanTitle)) {
                    posts.push({ Title: cleanTitle, Link: href, Portal: 'ZUM' });
                }
            }
        }
    });
    return posts;
}

function parseYoutubeXml($, channelName) {
    const posts = [];
    $('entry').each((i, el) => {
        const title = $(el).find('title').text() || '';
        let link = $(el).find('link').attr('href') || $(el).find('link').text() || '';
        const published = $(el).find('published').text() || $(el).find('updated').text() || '';
        
        if (title && link) {
            // Remove any trailing whitespace or newlines
            const cleanTitle = title.replace(/\s+/g, ' ').trim();
            const displayTitle = `[${channelName}] ${cleanTitle}`;
            const post = {
                Title: displayTitle,
                Link: link,
                Portal: 'YouTube'
            };
            if (published) {
                try {
                    post.Date = new Date(published).toISOString();
                } catch(e) {}
            }
            posts.push(post);
        }
    });
    return posts;
}

function parseGoogleXml($, limit, portalName) {
    const posts = [];
    $('item').slice(0, limit).each((i, el) => {
        let title = $(el).find('title').text() || '';
        const pubDate = $(el).find('pubDate').text() || '';
        
        // Clean up the portal suffix (e.g., " - Yahoo News", " - Yahoo Finance", " - Google News", etc.)
        title = title.replace(/\s*-\s*Yahoo\s*[a-zA-Z]*$/gi, '');
        title = title.replace(/\s*-\s*Google\s*News$/gi, '');
        title = title.trim();

        const post = {
            Title: title,
            Link: $(el).find('link').text() || '',
            Portal: portalName
        };
        if (pubDate) {
            try {
                post.Date = new Date(pubDate).toISOString();
            } catch(e) {}
        }
        posts.push(post);
    });
    return posts;
}

function seededRandom(seed) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

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

function tieredShuffle(posts, seed) {
    const tier1 = posts.filter(p => p.Tier === 1);
    const tier2 = posts.filter(p => p.Tier === 2);
    const tier3 = posts.filter(p => p.Tier === 3 || !p.Tier);

    seededShuffle(tier1, seed);
    seededShuffle(tier2, seed + 1);
    seededShuffle(tier3, seed + 2);

    return [...tier1, ...tier2, ...tier3];
}

function interleavedAllShuffle(posts, seed) {
    const keywords = ['증시', '재테크', '주식', '부동산', '금리', '환율', '증권', '코스피', '코스닥', '나스닥', '예적금', '청약', '분양', '금투세', '종부세'];
    
    const highInterest = [];
    const others = [];
    
    posts.forEach(p => {
        const title = p.Title.toLowerCase();
        const hasKeyword = keywords.some(kw => title.includes(kw));
        if (hasKeyword) {
            highInterest.push(p);
        } else {
            others.push(p);
        }
    });

    // Shuffle within tiers for highInterest
    const hiTier1 = highInterest.filter(p => p.Tier === 1);
    const hiTier2 = highInterest.filter(p => p.Tier === 2);
    const hiTier3 = highInterest.filter(p => p.Tier === 3 || !p.Tier);
    
    seededShuffle(hiTier1, seed);
    seededShuffle(hiTier2, seed + 1);
    seededShuffle(hiTier3, seed + 2);
    const hiSorted = [...hiTier1, ...hiTier2, ...hiTier3];
    
    // Shuffle within tiers for others
    const otherTier1 = others.filter(p => p.Tier === 1);
    const otherTier2 = others.filter(p => p.Tier === 2);
    const otherTier3 = others.filter(p => p.Tier === 3 || !p.Tier);
    
    seededShuffle(otherTier1, seed + 3);
    seededShuffle(otherTier2, seed + 4);
    seededShuffle(otherTier3, seed + 5);
    const otherSorted = [...otherTier1, ...otherTier2, ...otherTier3];

    const result = [];
    let hiIdx = 0;
    let otherIdx = 0;
    
    // Interleave in the top 30 (1 high interest, 1 other)
    while (result.length < 30 && (hiIdx < hiSorted.length || otherIdx < otherSorted.length)) {
        if (hiIdx < hiSorted.length && (result.length % 2 === 0 || otherIdx >= otherSorted.length)) {
            result.push(hiSorted[hiIdx++]);
        } else if (otherIdx < otherSorted.length) {
            result.push(otherSorted[otherIdx++]);
        }
    }
    
    // Append the rest
    while (hiIdx < hiSorted.length) {
        result.push(hiSorted[hiIdx++]);
    }
    while (otherIdx < otherSorted.length) {
        result.push(otherSorted[otherIdx++]);
    }
    
    return result;
}

function classifySubCategory(category, title) {
    const t = title.toLowerCase();
    
    if (category === '유튜브') {
        return '인기 동영상';
    }
    
    if (category === '정치') {
        if (t.includes('대통령') || t.includes('윤석열') || t.includes('용산') || t.includes('대통령실') || t.includes('영부인') || t.includes('김건희') || t.includes('청와대')) return '대통령실';
        if (t.includes('국회') || t.includes('민주당') || t.includes('국민의힘') || t.includes('의원') || t.includes('대표') || t.includes('정당') || t.includes('총선') || t.includes('전당대회') || t.includes('특검')) return '국회/정당';
        if (t.includes('북한') || t.includes('김정은') || t.includes('미사일') || t.includes('도발') || t.includes('탈북')) return '북한';
        if (t.includes('외교') || t.includes('안보') || t.includes('동맹') || t.includes('정상회담') || t.includes('방미') || t.includes('방중') || t.includes('미·중') || t.includes('러시아') || t.includes('우크라이나')) return '외교/안보';
        return '정치 일반';
    }
    
    if (category === '경제') {
        if (t.includes('부동산') || t.includes('아파트') || t.includes('분양') || t.includes('재건축') || t.includes('주택') || t.includes('공급') || t.includes('청약') || t.includes('양도세') || t.includes('종부세') || t.includes('취득세') || t.includes('재산세')) return '부동산';
        if (t.includes('주식') || t.includes('증권') || t.includes('코스피') || t.includes('코스닥') || t.includes('나스닥') || t.includes('채권') || t.includes('펀드') || t.includes('상장') || t.includes('주가') || t.includes('비트코인') || t.includes('가상자산') || t.includes('암호화폐') || t.includes('금투세')) return '금융/증권';
        if (t.includes('삼성') || t.includes('현대') || t.includes('lg') || t.includes('sk') || t.includes('실적') || t.includes('영업이익') || t.includes('매출') || t.includes('반도체') || t.includes('배터리') || t.includes('기업')) return '산업/기업';
        if (t.includes('취업') || t.includes('창업') || t.includes('일자리') || t.includes('고용') || t.includes('구직')) return '취업/창업';
        if (t.includes('미국') || t.includes('중국') || t.includes('유럽') || t.includes('글로벌') || t.includes('환율') || t.includes('달러') || t.includes('금리') || t.includes('유가') || t.includes('수출')) return '국제경제';
        if (t.includes('생활') || t.includes('가계') || t.includes('물가') || t.includes('소비') || t.includes('마트') || t.includes('절세') || t.includes('세금') || t.includes('소득세') || t.includes('상속세') || t.includes('증여세') || t.includes('연말정산')) return '생활 경제';
        return '경제 일반';
    }
    
    if (category === '사회') {
        if (t.includes('사고') || t.includes('화재') || t.includes('붕괴') || t.includes('폭행') || t.includes('경찰') || t.includes('검찰') || t.includes('사기') || t.includes('혐의') || t.includes('구속') || t.includes('재판') || t.includes('선고') || t.includes('음주운전') || t.includes('마약') || t.includes('피해') || t.includes('숨져') || t.includes('사망')) return '사건/사고';
        if (t.includes('학교') || t.includes('교육') || t.includes('대학') || t.includes('학생') || t.includes('교사') || t.includes('수능') || t.includes('입시')) return '교육/학교';
        if (t.includes('교통') || t.includes('지하철') || t.includes('버스') || t.includes('도로') || t.includes('지역') || t.includes('지방') || t.includes('시장') || t.includes('도지사') || t.includes('시의회')) return '교통/지역';
        if (t.includes('인권') || t.includes('복지') || t.includes('장애인') || t.includes('기초수급') || t.includes('연금') || t.includes('취약계층')) return '인권/복지';
        if (t.includes('여성') || t.includes('노동') || t.includes('노조') || t.includes('파업') || t.includes('임금') || t.includes('근로자')) return '여성/노동';
        if (t.includes('환경') || t.includes('기후') || t.includes('오염') || t.includes('쓰레기') || t.includes('재활용') || t.includes('탄소')) return '환경';
        if (t.includes('방송') || t.includes('언론') || t.includes('뉴스') || t.includes('미디어') || t.includes('기자') || t.includes('유튜브') || t.includes('유튜버')) return '미디어';
        if (t.includes('종교') || t.includes('교회') || t.includes('사찰') || t.includes('스님') || t.includes('목사') || t.includes('신부')) return '종교';
        if (t.includes('인물') || t.includes('별세') || t.includes('부고') || t.includes('취임') || t.includes('임명')) return '인물';
        return '사회 일반';
    }
    
    if (category === '생활/건강') {
        if (t.includes('건강') || t.includes('질환') || t.includes('치료') || t.includes('의사') || t.includes('병원') || t.includes('의학') || t.includes('암') || t.includes('당뇨') || t.includes('다이어트') || t.includes('운동') || t.includes('웰빙') || t.includes('의료')) return '건강';
        if (t.includes('생활') || t.includes('정보') || t.includes('꿀팁') || t.includes('청소') || t.includes('인테리어') || t.includes('육아') || t.includes('교육정보')) return '생활정보';
        if (t.includes('문화') || t.includes('예술') || t.includes('연극') || t.includes('뮤지컬') || t.includes('미술') || t.includes('전시') || t.includes('도서') || t.includes('책') || t.includes('소설') || t.includes('작가') || t.includes('역사')) return '문화/예술';
        if (t.includes('여행') || t.includes('레저') || t.includes('관광') || t.includes('호텔') || t.includes('캠핑') || t.includes('등산') || t.includes('축제')) return '여행/레저';
        if (t.includes('음식') || t.includes('맛집') || t.includes('요리') || t.includes('레시피') || t.includes('식당') || t.includes('카페') || t.includes('디저트')) return '음식/맛집';
        return '생활/건강 일반';
    }
    
    if (category === '세계') {
        if (t.includes('중국') || t.includes('일본') || t.includes('아시아') || t.includes('대만') || t.includes('인도') || t.includes('호주') || t.includes('시드니') || t.includes('도쿄') || t.includes('베이징')) return '아시아/호주';
        if (t.includes('미국') || t.includes('워싱턴') || t.includes('뉴욕') || t.includes('백악관') || t.includes('바이든') || t.includes('트럼프') || t.includes('캐나다') || t.includes('멕시코') || t.includes('브라질') || t.includes('남미') || t.includes('중남미')) return '미국/중남미';
        if (t.includes('유럽') || t.includes('영국') || t.includes('프랑스') || t.includes('독일') || t.includes('러시아') || t.includes('우크라이나') || t.includes('런던') || t.includes('파리')) return '유럽';
        if (t.includes('중동') || t.includes('이스라엘') || t.includes('하마스') || t.includes('가자') || t.includes('이란') || t.includes('아프리카') || t.includes('홍해')) return '중동/아프리카';
        if (t.includes('화제') || t.includes('기적') || t.includes('황당') || t.includes('포착') || t.includes('세계최초') || t.includes('기네스')) return '해외 화제';
        return '세계 일반';
    }
    
    if (category === 'IT/과학') {
        if (t.includes('과학') || t.includes('우주') || t.includes('위성') || t.includes('발사') || t.includes('연구') || t.includes('개발') || t.includes('기술') || t.includes('바이오') || t.includes('의학기술') || t.includes('노벨상')) return '과학';
        if (t.includes('디지털') || t.includes('ai') || t.includes('인공지능') || t.includes('반도체') || t.includes('칩') || t.includes('로봇') || t.includes('스마트폰') || t.includes('애플') || t.includes('삼성전자') || t.includes('엔비디아')) return '디지털';
        if (t.includes('컴퓨터') || t.includes('인터넷') || t.includes('플랫폼') || t.includes('네이버') || t.includes('카카오') || t.includes('보안') || t.includes('해킹')) return '컴퓨터/인터넷';
        if (t.includes('통신') || t.includes('5g') || t.includes('6g') || t.includes('이통사') || t.includes('skt') || t.includes('kt') || t.includes('lgu+') || t.includes('망')) return '뉴미디어/통신';
        if (t.includes('게임') || t.includes('e스포츠') || t.includes('넥슨') || t.includes('엔씨') || t.includes('넷마블') || t.includes('크래프톤') || t.includes('게이머')) return '게임';
        return 'IT/과학 일반';
    }
    
    if (category === '연예') {
        if (t.includes('드라마') || t.includes('예능') || t.includes('방송') || t.includes('시청률') || t.includes('출연') || t.includes('넷플릭스') || t.includes('티빙') || t.includes('웨이브') || t.includes('tv')) return 'TV/방송';
        if (t.includes('영화') || t.includes('극장') || t.includes('박스오피스') || t.includes('감독') || t.includes('개봉') || t.includes('관객')) return '영화';
        if (t.includes('음악') || t.includes('앨범') || t.includes('차트') || t.includes('빌보드') || t.includes('콘서트') || t.includes('공연') || t.includes('아이돌') || t.includes('신곡') || t.includes('가수') || t.includes('음원')) return '음악';
        if (t.includes('배우') || t.includes('스타') || t.includes('연예인') || t.includes('열애') || t.includes('결혼') || t.includes('이혼') || t.includes('결별') || t.includes('근황') || t.includes('인스타')) return '스타/연예인';
        return '연예 일반';
    }
    
    if (category === '스포츠') {
        if (t.includes('야구') || t.includes('kbo') || t.includes('mlb') || t.includes('홈런') || t.includes('안타') || t.includes('투수') || t.includes('타자') || t.includes('구단')) return '야구';
        if (t.includes('축구') || t.includes('손흥민') || t.includes('이강인') || t.includes('황희찬') || t.includes('김민재') || t.includes('k리그') || t.includes('epl') || t.includes('챔스') || t.includes('월드컵') || t.includes('대표팀')) return '축구';
        if (t.includes('골프') || t.includes('lpga') || t.includes('pga') || t.includes('kpga') || t.includes('klpga') || t.includes('라운딩') || t.includes('퍼팅')) return '골프';
        if (t.includes('농구') || t.includes('배구') || t.includes('kbl') || t.includes('v리그') || t.includes('덩크') || t.includes('스파이크')) return '농구/배구';
        return '일반 스포츠';
    }
    
    if (category === '칼럼') {
        if (t.includes('사설') || t.includes('논평')) return '사설';
        if (t.includes('만평') || t.includes('웹툰')) return '만평';
        return '칼럼';
    }
    
    return '';
}

function calculateRankingScores(newsList, youtubeList, now) {
    // 1. Common stop words / media terms to ignore during keyword extraction
    const STOP_WORDS = new Set([
        '포토', '속보', '영상', '오늘', '종합', '뉴스', '단독', '이유', '논란', '어떻게',
        '것', '등', '때문', '오후', '오전', '내일', '어제', '지난', '올해', '이번',
        '대해', '위해', '통해', '관련', '사진', '현장', '그래픽', '인사', '부고',
        '전국', '주요', '브리핑', '전문', '직격', '기자', '보도', '뉴스룸', '스페셜',
        '헤드라인', '라이브', '공개', '발표', '시작', '주목', '확인', '진짜',
        // User preference: exclude coin/crypto from popularity boosting
        '코인', '비트코인', '가상화폐', '암호화폐', '이더리움', '업비트', '빗썸', '리플'
    ]);

    // 2. Count cross-portal keyword frequencies
    const keywordFrequency = {};
    newsList.forEach(p => {
        const words = (p.Title || '').match(/[가-힣]{2,}/g) || [];
        const uniqueWords = new Set(words.filter(w => !STOP_WORDS.has(w)));
        uniqueWords.forEach(w => {
            keywordFrequency[w] = (keywordFrequency[w] || 0) + 1;
        });
    });

    // 3. Identify Hot Keywords (occurring across >= 3 articles)
    const hotKeywords = {};
    for (const [kw, count] of Object.entries(keywordFrequency)) {
        if (count >= 3) {
            // Hotness bonus proportional to frequency (max 25 pts per keyword)
            hotKeywords[kw] = Math.min(25, count * 3);
        }
    }

    // High public interest evergreen topics (economy, stock, real estate, science, tech)
    const evergreenKeywords = {
        '증시': 12, '주식': 12, '부동산': 12, '금리': 15, '환율': 12, '코스피': 12,
        '청약': 10, '아파트': 10, '대출': 10, '물가': 10, '세금': 10, '절세': 10,
        '우주': 10, '반도체': 12, '인공지능': 12, 'AI': 12, '전망': 8
    };

    // 4. Calculate score for each news post
    newsList.forEach(p => {
        // A. Portal Rank Score (100 down to 0)
        const rank = typeof p.OriginalRank === 'number' ? p.OriginalRank : 20;
        const rankScore = Math.max(0, 100 - rank * 2.5);

        // B. Hot Keyword & Evergreen Topic Bonus
        let keywordBonus = 0;
        const title = p.Title || '';
        for (const [kw, boost] of Object.entries(hotKeywords)) {
            if (title.includes(kw)) {
                keywordBonus += boost;
            }
        }
        for (const [kw, boost] of Object.entries(evergreenKeywords)) {
            if (title.includes(kw)) {
                keywordBonus += boost;
            }
        }
        keywordBonus = Math.min(50, keywordBonus);

        // C. Time Decay Penalty (older articles lose points gradually)
        let decayPenalty = 0;
        if (p.Date) {
            const ageHours = Math.max(0, (now.getTime() - new Date(p.Date).getTime()) / (1000 * 60 * 60));
            decayPenalty = Math.min(40, ageHours * 2.5);
        }

        // D. Tier Bonus
        let tierBonus = 0;
        if (p.Tier === 1) tierBonus = 15;
        else if (p.Tier === 2) tierBonus = 8;

        p.Score = Math.round((rankScore + keywordBonus + tierBonus - decayPenalty) * 10) / 10;
    });

    // 5. Calculate score for YouTube posts
    youtubeList.forEach(p => {
        let keywordBonus = 0;
        const title = p.Title || '';
        for (const [kw, boost] of Object.entries(hotKeywords)) {
            if (title.includes(kw)) {
                keywordBonus += boost;
            }
        }
        for (const [kw, boost] of Object.entries(evergreenKeywords)) {
            if (title.includes(kw)) {
                keywordBonus += boost;
            }
        }
        keywordBonus = Math.min(40, keywordBonus);

        let decayPenalty = 0;
        if (p.Date) {
            const ageDays = Math.max(0, (now.getTime() - new Date(p.Date).getTime()) / (1000 * 60 * 60 * 24));
            decayPenalty = Math.min(30, ageDays * 4);
        }

        p.Score = Math.round((80 + keywordBonus - decayPenalty) * 10) / 10;
    });
}

async function fetchEconomicDashboard() {
    console.log('Fetching Comprehensive Economic Dashboard data...');
    const dashboard = {
        updatedAt: new Date().toISOString(),
        sections: [
            {
                title: '국내외 주요 증시',
                id: 'stocks',
                items: []
            },
            {
                title: '주요 선물 지수',
                id: 'futures',
                items: []
            },
            {
                title: '환율 (FX)',
                id: 'exchange',
                items: []
            },
            {
                title: '현물 & 에너지 원자재',
                id: 'commodities',
                items: []
            },
            {
                title: '주요국 국채 금리 (10년물)',
                id: 'bonds',
                items: []
            },
            {
                title: '가상자산 (Crypto)',
                id: 'crypto',
                items: []
            },
            {
                title: '농산물 & 곡물',
                id: 'agriculture',
                items: []
            },
            {
                title: '해운 물류 & 경기·심리 지표',
                id: 'logistics_sentiment',
                items: []
            }
        ]
    };

    // 1. Fetch Naver home majors (KOSPI, KOSDAQ, Dow, Nasdaq, Dow Futures, Nasdaq 100 Futures)
    try {
        const res = await axios.get('https://m.stock.naver.com/api/home/majors', {
            headers: { 'User-Agent': PC_UA },
            httpsAgent,
            timeout: 6000
        });
        const majors = res.data.homeMajors || [];
        majors.forEach(m => {
            const item = {
                name: m.name,
                code: m.itemCode || '',
                price: m.closePrice,
                change: m.compareToPreviousClosePrice,
                changeRate: m.fluctuationsRatio,
                direction: m.compareToPreviousPrice ? m.compareToPreviousPrice.text : ''
            };
            if (m.name.includes('선물')) {
                dashboard.sections[1].items.push(item);
            } else if (['코스피', '코스닥', '다우존스', '나스닥 종합'].includes(m.name)) {
                dashboard.sections[0].items.push(item);
            }
        });
    } catch(e) {
        console.error('Naver majors error:', e.message);
    }

    // 2. Fetch Daum Exchange rates (USD, JPY, EUR, CNY)
    try {
        const res = await axios.get('https://finance.daum.net/api/exchanges/summaries', {
            headers: {
                'User-Agent': PC_UA,
                'Referer': 'https://finance.daum.net/exchanges'
            },
            httpsAgent,
            timeout: 6000
        });
        const list = res.data.data || [];
        const targets = [
            { symbol: 'FRX.KRWUSD', name: '원/달러 (USD)' },
            { symbol: 'FRX.KRWJPY', name: '원/엔 (100 JPY)' },
            { symbol: 'FRX.KRWEUR', name: '원/유로 (EUR)' },
            { symbol: 'FRX.KRWCNY', name: '원/위안 (CNY)' }
        ];
        targets.forEach(t => {
            const found = list.find(x => x.symbolCode === t.symbol);
            if (found) {
                const dir = found.change === 'RISE' ? '상승' : found.change === 'FALL' ? '하락' : '보합';
                dashboard.sections[2].items.push({
                    name: t.name,
                    price: found.basePrice.toLocaleString(),
                    change: (dir === '하락' ? '-' : '+') + found.changePrice.toFixed(2),
                    changeRate: (found.changeRate * 100).toFixed(2),
                    direction: dir
                });
            }
        });
    } catch(e) {
        console.error('Daum exchange error:', e.message);
    }

    // 3. Upbit Crypto (BTC, ETH in KRW)
    try {
        const res = await axios.get('https://api.upbit.com/v1/ticker?markets=KRW-BTC,KRW-ETH', {
            headers: { 'User-Agent': PC_UA },
            timeout: 5000
        });
        const coinMap = {
            'KRW-BTC': '비트코인 (BTC/KRW)',
            'KRW-ETH': '이더리움 (ETH/KRW)'
        };
        res.data.forEach(c => {
            const dir = c.change === 'RISE' ? '상승' : c.change === 'FALL' ? '하락' : '보합';
            const changeVal = c.change_price * (dir === '하락' ? -1 : 1);
            const rateVal = (c.change_rate * 100 * (dir === '하락' ? -1 : 1)).toFixed(2);
            dashboard.sections[5].items.push({
                name: coinMap[c.market] || c.market,
                price: c.trade_price.toLocaleString() + '원',
                change: (changeVal > 0 ? '+' : '') + changeVal.toLocaleString() + '원',
                changeRate: (rateVal > 0 ? '+' : '') + rateVal + '%',
                direction: dir
            });
        });
    } catch(e) {
        console.error('Upbit error:', e.message);
    }

    // 4. CNBC Major Sovereign Bonds (US, Korea, Japan, Germany, UK, China 10Y)
    try {
        const cnbcSymbols = [
            { sym: 'US10Y', name: '미국 국채 10년물' },
            { sym: 'KR10Y', name: '한국 국채 10년물' },
            { sym: 'JP10Y', name: '일본 국채 10년물' },
            { sym: 'DE10Y', name: '독일 국채 10년물 (분트)' },
            { sym: 'GB10Y', name: '영국 국채 10년물 (길트)' },
            { sym: 'CN10Y', name: '중국 국채 10년물' }
        ];
        const symQuery = cnbcSymbols.map(s => s.sym).join('|');
        const cnbcUrl = `https://quote.cnbc.com/quote-html-webservice/restQuote/symbolType/symbol?symbols=${symQuery}&requestMethod=itv&noform=1&partnerId=2&fund=1&exthrs=1&output=json`;
        const res = await axios.get(cnbcUrl, {
            headers: { 'User-Agent': PC_UA },
            timeout: 5000
        });
        const quotes = res.data.FormattedQuoteResult.FormattedQuote || [];
        cnbcSymbols.forEach(s => {
            const q = quotes.find(item => item.symbol === s.sym);
            if (q && q.last) {
                const dir = q.changetype === 'UP' ? '상승' : q.changetype === 'DOWN' ? '하락' : '보합';
                dashboard.sections[4].items.push({
                    name: s.name,
                    price: q.last.endsWith('%') ? q.last : q.last + '%',
                    change: q.change || '0',
                    changeRate: q.change_pct ? (q.change_pct.endsWith('%') ? q.change_pct : q.change_pct + '%') : '0%',
                    direction: dir
                });
            }
        });
    } catch(e) {
        console.error('CNBC Bonds error:', e.message);
    }

    // 5. Baltic Dry Index (BDI) from TradingEconomics
    try {
        const res = await axios.get('https://tradingeconomics.com/commodity/baltic', {
            headers: { 'User-Agent': PC_UA },
            timeout: 6000
        });
        const $ = cheerio.load(res.data);
        let bdiPrice = '', bdiChange = '', bdiRate = '';
        $('#market tr, .table tr').each((i, el) => {
            const txt = $(el).text().replace(/\s+/g, ' ').trim();
            if (txt.includes('Baltic Dry') && !bdiPrice) {
                const parts = txt.split(' ');
                if (parts.length >= 5) {
                    bdiPrice = parts[2];
                    bdiChange = parts[3];
                    bdiRate = parts[4];
                }
            }
        });
        if (bdiPrice) {
            const isDown = bdiChange.startsWith('-');
            const isUp = bdiChange.startsWith('+') || (!isDown && parseFloat(bdiChange) > 0);
            dashboard.sections[7].items.push({
                name: '발틱 운임 지수 (BDI)',
                price: bdiPrice,
                change: bdiChange,
                changeRate: bdiRate,
                direction: isUp ? '상승' : isDown ? '하락' : '보합'
            });
        }
    } catch(e) {
        console.error('Baltic Dry error:', e.message);
    }

    // 6. Yahoo Commodities, Equities, Agriculture, Logistics, Sentiment
    const yahooSymbols = [
        // S&P 500 & Futures
        { sym: '^GSPC', name: 'S&P 500', section: 0 },
        { sym: 'ES=F', name: 'S&P 500 선물', section: 1 },
        // FX
        { sym: 'DX-Y.NYB', name: '달러 인덱스 (DXY)', section: 2 },
        // Commodities & Energy
        { sym: 'GC=F', name: '국제 금 (Gold $/oz)', section: 3 },
        { sym: 'CL=F', name: 'WTI 원유 ($/배럴)', section: 3 },
        { sym: 'SI=F', name: '국제 은 (Silver $/oz)', section: 3 },
        { sym: 'HG=F', name: '국제 구리 (닥터 코퍼)', section: 3 },
        { sym: 'NG=F', name: '천연가스 ($/MMBtu)', section: 3 },
        // Crypto USD
        { sym: 'BTC-USD', name: '비트코인 (BTC/USD)', section: 5 },
        // Agriculture & Grains
        { sym: 'ZC=F', name: '국제 옥수수 (Corn)', section: 6 },
        { sym: 'ZS=F', name: '국제 대두 (Soybeans)', section: 6 },
        { sym: 'ZW=F', name: '국제 소맥 (Wheat)', section: 6 },
        // Logistics & Sentiment
        { sym: 'BDRY', name: '해운 운임 ETF (BDRY)', section: 7 },
        { sym: '^SOX', name: '필라델피아 반도체', section: 7 },
        { sym: '^VIX', name: 'VIX 변동성 (공포지수)', section: 7 }
    ];

    for (const y of yahooSymbols) {
        try {
            const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(y.sym)}?interval=1d&range=2d`;
            const res = await axios.get(url, {
                headers: { 'User-Agent': PC_UA },
                httpsAgent,
                timeout: 5000
            });
            const meta = res.data.chart.result[0].meta;
            const price = meta.regularMarketPrice;
            const prev = meta.chartPreviousClose || meta.previousClose;
            const change = price - prev;
            const changePct = (change / prev) * 100;
            const dir = change > 0 ? '상승' : change < 0 ? '하락' : '보합';

            dashboard.sections[y.section].items.push({
                name: y.name,
                price: price >= 100 ? price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : price.toFixed(2),
                change: (change > 0 ? '+' : '') + change.toFixed(2),
                changeRate: (changePct > 0 ? '+' : '') + changePct.toFixed(2) + '%',
                direction: dir
            });
        } catch(e) {
            console.error(`Yahoo ${y.sym} error:`, e.message);
        }
    }

    // 7. Industry Specific Earnings Indicators Hub (with verified source links)
    dashboard.industries = [
        {
            sector: '해운 / 물류',
            icon: 'ship',
            relatedStocks: 'HMM, 팬오션, 대한해운, 대한항공, 현대글로비스',
            description: '글로벌 물동량 및 완제품·원자재 운송 비용으로 해운사 매출과 수출 제조업체 물류비를 결정합니다.',
            indicators: [
                {
                    name: '상하이 컨테이너 운임지수 (SCFI)',
                    role: '완제품(스마트폰·가전·자동차) 컨테이너 해상 운임',
                    impact: '운임 상승 시 HMM 등 해운사 마진 급증 / 삼성·현대차 등 수출기업 물류비 압박',
                    benchmark: '손익분기점 약 1,000pt 내외 (2,000pt 이상 시 공급망 비용 가중)',
                    sourceName: 'TradingEconomics SCFI',
                    sourceUrl: 'https://tradingeconomics.com/commodity/containerized-freight'
                },
                {
                    name: '발틱 건화물 운임지수 (BDI)',
                    role: '철광석·석탄·곡물 등 건화물 벌크선 운임',
                    impact: '팬오션, 대한해운 영업이익과 철강·발전사 원재료 조달비용 직결',
                    benchmark: '실물 원자재 수요 및 글로벌 경기 사이클 최선행 지표',
                    sourceName: 'TradingEconomics BDI',
                    sourceUrl: 'https://tradingeconomics.com/commodity/baltic'
                },
                {
                    name: '글로벌 항공화물 운임 (TAC Index)',
                    role: '반도체·2차전지·바이오 등 긴급 고부가가치 항공 운송비',
                    impact: '대한항공, 아시아나 화물사업부 분기 실적 결정 요인',
                    benchmark: '글로벌 테크/바이오 신제품 출시 및 출하 사이클 반영',
                    sourceName: 'Baltic Air Freight (TAC)',
                    sourceUrl: 'https://www.balticexchange.com/en/data-services/market-information0/air-freight.html'
                }
            ]
        },
        {
            sector: '반도체 / IT 하드웨어',
            icon: 'cpu',
            relatedStocks: '삼성전자, SK하이닉스, 한미반도체, 원익IPS, 리노공업',
            description: '글로벌 빅테크의 서버/AI 투자와 스마트폰·PC 수요가 메모리·비메모리 공급망 실적을 견인합니다.',
            indicators: [
                {
                    name: '필라델피아 반도체 지수 (SOX)',
                    role: '글로벌 반도체 대표 30개 기업 주가 지수',
                    impact: '한국 코스피 및 삼성전자, SK하이닉스 주가와 실적에 1~2분기 선행',
                    benchmark: '글로벌 테크 하드웨어 및 파운드리 투자 심리 바로미터',
                    sourceName: 'Yahoo Finance SOX',
                    sourceUrl: 'https://finance.yahoo.com/quote/%5ESOX/'
                },
                {
                    name: 'DRAM / NAND 메모리 가격 (DRAMeXchange)',
                    role: 'DRAM/낸드 고정거래가격 및 현물가격 추이',
                    impact: '삼성전자·SK하이닉스 반도체(DS) 부문 분기 영업이익률의 절대적 지표',
                    benchmark: '빅테크 서버 교체 주기 및 AI 서버(HBM) 증설 사이클',
                    sourceName: 'TrendForce DRAMeXchange',
                    sourceUrl: 'https://www.dramexchange.com/'
                },
                {
                    name: 'TSMC 월간 매출 동향 (Monthly Revenue)',
                    role: '세계 1위 파운드리 업체의 매월 10일 전후 발표 매출',
                    impact: '글로벌 빅테크(애플·엔비디아·AMD)의 최첨단 칩 주문량과 실적 선행',
                    benchmark: '전월비(MoM) 및 전년동기비(YoY) 성장세 추적',
                    sourceName: 'TSMC Investor Relations',
                    sourceUrl: 'https://investor.tsmc.com/english/monthly-revenue'
                }
            ]
        },
        {
            sector: '정유 / 에너지',
            icon: 'flame',
            relatedStocks: 'S-Oil, SK이노베이션, GS, HD현대',
            description: '원유 도입가와 석유제품 판매가의 차이(정제마진) 및 재고평가손익이 정유사 분기 실적의 90%를 결정합니다.',
            indicators: [
                {
                    name: '싱가포르 복합 정제마진 (GRM)',
                    role: '원유 1배럴을 정제해 휘발유·경유 등을 팔 때 남는 마진',
                    impact: 'S-Oil, SK이노베이션의 정유 부문 영업손익을 직접 결정',
                    benchmark: '손익분기점(BEP) 배럴당 $4.5~$5.0 ( $10 이상 시 어닝 서프라이즈)',
                    sourceName: 'Petronet (한국석유공사)',
                    sourceUrl: 'https://www.petronet.co.kr/'
                },
                {
                    name: 'WTI 원유 및 두바이유 시세',
                    role: '글로벌 원유 표준 거래 가격',
                    impact: '유가 상승 시 재고평가이익 발생, 급락 시 대규모 재고평가손실 발생',
                    benchmark: '산유국(OPEC+) 감산 정책 및 글로벌 수요 반영',
                    sourceName: 'Yahoo Finance WTI Crude',
                    sourceUrl: 'https://finance.yahoo.com/quote/CL=F/'
                },
                {
                    name: '국제 천연가스 선물 (Henry Hub)',
                    role: '미국 및 글로벌 천연가스 기준 가격',
                    impact: '도시가스사 판가, 발전공기업 원가, LNG선 운용 수익 연동',
                    benchmark: '동절기 난방 수요 및 발전용 가스 재고량',
                    sourceName: 'Yahoo Finance Natural Gas',
                    sourceUrl: 'https://finance.yahoo.com/quote/NG=F/'
                }
            ]
        },
        {
            sector: '석유화학 / 화학소재',
            icon: 'flask-conical',
            relatedStocks: 'LG화학, 롯데케미칼, 대한유화, 금호석유',
            description: '원재료(나프타)와 기초유분(에틸렌 등)의 가격 격차(스프레드)가 플라스틱·합성고무 기업 마진을 좌우합니다.',
            indicators: [
                {
                    name: '에틸렌 - 나프타 스프레드 (Ethylene-Naphtha)',
                    role: '석유화학의 쌀인 에틸렌 가격에서 원료인 나프타 가격을 뺀 스프레드',
                    impact: 'LG화학, 롯데케미칼, 대한유화 기초소재 부문 흑자/적자 판별',
                    benchmark: '손익분기점 톤당 $300 내외 ($250 이하는 적자 한계선)',
                    sourceName: 'TradingEconomics Naphtha',
                    sourceUrl: 'https://tradingeconomics.com/commodity/naphtha'
                },
                {
                    name: '부타디엔 - NB라텍스 스프레드',
                    role: '위생용 장갑 및 합성고무 주원료 스프레드',
                    impact: '금호석유화학 합성고무 사업부 이익률 직결',
                    benchmark: '동남아 고무장갑 제조사 가동률 및 글로벌 의료·위생 수요',
                    sourceName: 'TradingEconomics Rubber',
                    sourceUrl: 'https://tradingeconomics.com/commodity/rubber'
                }
            ]
        },
        {
            sector: '2차전지 / 배터리 소재',
            icon: 'battery-charging',
            relatedStocks: 'LG에너지솔루션, 삼성SDI, 에코프로비엠, 포스코퓨처엠, 엘앤에프',
            description: '핵심 광물(리튬·니켈) 가격 변동이 양극재 판가(ASP)와 셀 제조사 이익률 및 재고손익을 실시간 결정합니다.',
            indicators: [
                {
                    name: '탄산리튬 / 수산화리튬 시세 (Lithium)',
                    role: '양극재 핵심 원자재 가격',
                    impact: '에코프로비엠, 포스코퓨처엠 등 양극재 판가 연동 계약에 직결',
                    benchmark: '리튬 가격 하락 시 역래깅(비싸게 산 원료, 싸게 납품) 적자 발생',
                    sourceName: 'KOMIS 한국자원정보서비스',
                    sourceUrl: 'https://www.komis.or.kr/'
                },
                {
                    name: 'LME 니켈 (Nickel) 선물',
                    role: '하이니켈 배터리(NCM/NCMA) 주원료',
                    impact: '에너지 밀도 핵심 광물로 2차전지 소재단가 및 셀 원가 구조 영향',
                    benchmark: '인도네시아 니켈 공급량 및 중국 제련소 가동률',
                    sourceName: 'London Metal Exchange (LME)',
                    sourceUrl: 'https://www.lme.com/en/metals/non-ferrous/lme-nickel'
                }
            ]
        },
        {
            sector: '철강 / 산업 금속',
            icon: 'shield',
            relatedStocks: 'POSCO홀딩스, 현대제철, 동국제강, 고려아연',
            description: '철광석·원료탄 가격과 중국 부동산·인프라 수요가 열연·후판 스프레드와 철강사 실적을 만듭니다.',
            indicators: [
                {
                    name: '국제 철광석 (Iron Ore) 수입가',
                    role: '고로(용광로) 제철소의 가장 큰 원가 비중 원자재',
                    impact: 'POSCO홀딩스, 현대제철 원가율 및 강판 가격 협상력 잣대',
                    benchmark: '중국 항구 철광석 재고량 및 제선 가동률',
                    sourceName: 'TradingEconomics Iron Ore',
                    sourceUrl: 'https://tradingeconomics.com/commodity/iron-ore'
                },
                {
                    name: 'LME 전기동 / 구리 (Doctor Copper)',
                    role: '전선, 변압기, 전력망, 전기차 모터 핵심 금속',
                    impact: 'LS, 대한전선, HD현대일렉트릭, 효성중공업 실적과 직결',
                    benchmark: '글로벌 전력망 인프라 투자 및 제조업 경기 선행 지표',
                    sourceName: 'London Metal Exchange (LME)',
                    sourceUrl: 'https://www.lme.com/en/metals/non-ferrous/lme-copper'
                }
            ]
        },
        {
            sector: '조선 / 해양 플랜트',
            icon: 'anchor',
            relatedStocks: 'HD한국조선해양, HD현대중공업, 한화오션, 삼성중공업, HD현대미포',
            description: '선박 건조 가격(신조선가)과 후판(철판) 가격의 차이가 조선사의 3개년 수주 잔고 수익성을 결정합니다.',
            indicators: [
                {
                    name: '클락슨 신조선가 지수 (Newbuilding Price Index)',
                    role: '선박을 새로 건조할 때 책정되는 선박 가격 지수',
                    impact: '국내 대형 조선 3사의 향후 2~3년 뒤 매출 마진율을 선행 결정',
                    benchmark: '지수 180pt 돌파 시 슈퍼사이클 호황 국면 평가',
                    sourceName: 'Clarksons Research',
                    sourceUrl: 'https://www.clarksons.com/home/research/'
                },
                {
                    name: '조선용 후판(Thick Plate) 가격',
                    role: '선박 제조 원가의 약 20%를 차지하는 두꺼운 강판',
                    impact: '철강사(포스코)와의 반기별 후판가 협상 결과에 따라 충당금 환입/설정',
                    benchmark: '선가 상승분 대비 후판가 안정 시 조선사 마진 극대화',
                    sourceName: '한국해양진흥공사 (KOBC)',
                    sourceUrl: 'https://www.kobc.or.kr/'
                }
            ]
        },
        {
            sector: '자동차 / 완성차 & 부품',
            icon: 'car',
            relatedStocks: '현대차, 기아, 현대모비스, 한온시스템, HL만도',
            description: '미국·유럽 신차 판매율과 인센티브(할인), 원/달러 환율이 완성차 업체의 분기 영업이익률을 결정합니다.',
            indicators: [
                {
                    name: '미국 신차 연간판매속도 (TOTAL SAAR)',
                    role: '미국 시장의 계절조정 연간 환산 자동차 판매 대수',
                    impact: '현대차·기아의 최대 수익처인 북미 시장 완성차 판매 수요 가늠',
                    benchmark: '연간 1,500만~1,600만 대 이상 유지 시 안정적 호실적',
                    sourceName: 'FRED (세인트루이스 연방준비은행)',
                    sourceUrl: 'https://fred.stlouisfed.org/series/TOTALSA'
                },
                {
                    name: 'KAMA 자동차 월간 수출 동향',
                    role: '한국 완성차(내연기관·하이브리드·전기차) 월별 수출 실적',
                    impact: '국내 완성차 및 1차 협력 부품사 매출에 실시간 반영',
                    benchmark: '고부가가치 SUV / 하이브리드(HEV) 수출 믹스 비중',
                    sourceName: '한국자동차모빌리티산업협회 (KAMA)',
                    sourceUrl: 'https://www.kama.or.kr/'
                }
            ]
        },
        {
            sector: '건설 / 부동산 인프라',
            icon: 'building-2',
            relatedStocks: '현대건설, 대우건설, GS건설, 쌍용C&E, 한샘',
            description: '전국 미분양 주택 통계와 착공 실적, 시멘트·레미콘 가격이 건설사 PF 위험과 분기 실적을 좌우합니다.',
            indicators: [
                {
                    name: '전국 미분양 주택 현황 (국토부 통계)',
                    role: '준공 후 미분양(악성 미분양) 및 지역별 분양률 추이',
                    impact: '주택 건설사 매출 채권 회수, PF 우발채무 리스크, 대손충당금 직결',
                    benchmark: '위험 수위 6만~7만 호 기준점 모니터링',
                    sourceName: '국토교통부 통계누리',
                    sourceUrl: 'https://stat.molit.go.kr/'
                },
                {
                    name: '한국은행 주택 착공 실적 및 건설수주액',
                    role: '신규 아파트/상업용 건물 착공 면적 및 수주 통계',
                    impact: '착공 후 2~3년에 걸쳐 공사 진행률에 따라 매출 인식',
                    benchmark: '건자재(시멘트, 철근, 가구, 창호) 수요 선행',
                    sourceName: '한국은행 ECOS 통계시스템',
                    sourceUrl: 'https://ecos.bok.or.kr/'
                }
            ]
        }
    ];

    // Defensive fallback: If all sections are empty, recover previous dashboard from data.json
    const totalItems = dashboard.sections.reduce((acc, s) => acc + s.items.length, 0);
    if (totalItems === 0 && fs.existsSync(DATA_FILE)) {
        try {
            const existing = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
            if (existing['증시/지표']) {
                console.log('Recovered previous economic dashboard from cache.');
                return existing['증시/지표'];
            }
        } catch(e) {}
    }

    return dashboard;
}

async function scrape() {
    const now = new Date();
    let results = {};
    CATEGORIES.forEach(c => results[c] = (c === '증시/지표' ? null : []));

    // Fetch comprehensive economic dashboard data
    results['증시/지표'] = await fetchEconomicDashboard();

    for (const task of TASKS) {
        try {
            console.log(`Scraping ${task.portal} - ${task.cat}${task.channelName ? ` (${task.channelName})` : ''}...`);
            let posts = [];

            if (task.isXml) {
                const response = await axios.get(task.url, { headers: { 'User-Agent': PC_UA }, httpsAgent, timeout: 8000 });
                const $ = cheerio.load(response.data, { xmlMode: true });
                if (task.portal === 'YouTube') {
                    posts = parseYoutubeXml($, task.channelName);
                } else {
                    posts = parseGoogleXml($, 40, task.portal);
                }
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
                    if (task.url.includes('finance.naver.com')) {
                        htmlData = iconv.decode(response.data, 'EUC-KR');
                    } else {
                        htmlData = iconv.decode(response.data, 'utf-8');
                    }
                } else {
                    htmlData = response.data;
                }
                
                const $ = cheerio.load(htmlData);
                
                if (task.portal === '네이버') posts = parseNaver($, task.url);
                else if (task.portal === '다음') posts = parseDaum($, task.url);
                else if (task.portal === 'ZUM') posts = parseZum($, task.url);
            }

            posts.forEach((p, idx) => {
                if (p.Title && p.Link) {
                    if (p.Link && !p.Link.startsWith('http')) {
                        try { p.Link = new URL(p.Link, task.url).href; } catch(e) {}
                    }
                    
                    // Dynamic Tax Cross-Classification Override
                    let finalCat = task.cat;
                    const t = p.Title.toLowerCase();
                    const economyTaxKeywords = ['절세', '세테크', '소득세', '양도세', '증여세', '상속세', '감세', '세금혜택', '연말정산', '납세자'];
                    const societyTaxKeywords = ['탈세', '세무조사', '체납', '조세포탈', '세무비리'];
                    
                    if (economyTaxKeywords.some(kw => t.includes(kw))) {
                        finalCat = '경제';
                    } else if (societyTaxKeywords.some(kw => t.includes(kw))) {
                        finalCat = '사회';
                    }
                    
                    if (!results[finalCat].find(existing => existing.Title === p.Title)) {
                        p.Tier = task.tier || 3;
                        p.OriginalRank = idx;
                        if (task.subCat) {
                            p.SubCategory = task.subCat;
                        }
                        if (!p.Date) {
                            p.Date = new Date(now.getTime() - idx * 15 * 60 * 1000).toISOString();
                        }
                        results[finalCat].push(p);
                    }
                }
            });
            console.log(`  Scraped ${posts.length} posts.`);
        } catch (error) {
            console.error(`Failed to scrape ${task.portal} - ${task.cat}: ${error.message}`);
            // Defensive Cash Fallback: Recover from existing data.json to prevent disappearing entries
            if (fs.existsSync(DATA_FILE)) {
                try {
                    const existingData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
                    let fallbackPosts = [];
                    for (const catKey of Object.keys(existingData)) {
                        const postsInCat = existingData[catKey] || [];
                        let matched = [];
                        if (task.portal === 'YouTube') {
                            matched = postsInCat.filter(p => p.Portal === 'YouTube' && p.Title && p.Title.startsWith(`[${task.channelName}]`));
                        } else {
                            matched = postsInCat.filter(p => p.Portal === task.portal && p.Category === task.cat);
                        }
                        fallbackPosts.push(...matched);
                    }
                    if (fallbackPosts.length > 0) {
                        console.log(`  -> Recovered ${fallbackPosts.length} cached posts for fallback.`);
                        fallbackPosts.forEach(p => {
                            const targetCat = p.Category || task.cat;
                            if (results[targetCat] && !results[targetCat].find(existing => existing.Title === p.Title)) {
                                if (typeof p.OriginalRank === 'undefined') p.OriginalRank = 15;
                                results[targetCat].push(p);
                            }
                        });
                    }
                } catch (e) {
                    console.error('Failed to read fallback cache:', e.message);
                }
            }
        }
    }

    // Deterministic 1-hour seed (e.g., 2026062219)
    const timeSeed = now.getFullYear() * 1000000 + (now.getMonth() + 1) * 10000 + now.getDate() * 100 + now.getHours();

    const newsList = [];
    const youtubeList = [];

    for (const cat of CATEGORIES) {
        if(cat === '전체' || cat === '증시/지표') continue;
        
        // Add Category and SubCategory tag to each post
        results[cat] = results[cat].map(p => {
            const sub = p.SubCategory || classifySubCategory(cat, p.Title);
            return { ...p, Category: cat, SubCategory: sub };
        });

        if (cat === '유튜브') {
            const oneWeekAgo = new Date(now);
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
            oneWeekAgo.setHours(0, 0, 0, 0);
            
            const filteredYt = results[cat].filter(p => {
                if (p.Date) {
                    return new Date(p.Date) >= oneWeekAgo;
                }
                return true;
            });
            youtubeList.push(...filteredYt);
        } else {
            newsList.push(...results[cat]);
        }
    }

    // Calculate ranking scores based on portal rank, cross-portal hot topics, and time decay
    calculateRankingScores(newsList, youtubeList, now);

    // Sort individual categories by Score descending
    for (const cat of CATEGORIES) {
        if (cat === '전체' || cat === '유튜브' || cat === '증시/지표') continue;
        results[cat].sort((a, b) => {
            if ((b.Score || 0) !== (a.Score || 0)) return (b.Score || 0) - (a.Score || 0);
            return new Date(b.Date || 0) - new Date(a.Date || 0);
        });
    }

    // Sort newsList by Score descending (highest popularity/interest first)
    newsList.sort((a, b) => {
        if ((b.Score || 0) !== (a.Score || 0)) return (b.Score || 0) - (a.Score || 0);
        return new Date(b.Date || 0) - new Date(a.Date || 0);
    });

    // Sort youtubeList by Score descending
    youtubeList.sort((a, b) => {
        if ((b.Score || 0) !== (a.Score || 0)) return (b.Score || 0) - (a.Score || 0);
        return new Date(b.Date || 0) - new Date(a.Date || 0);
    });

    // Interleave news and YouTube: 5 news articles followed by 1 YouTube video
    const mixedAll = [];
    let newsIdx = 0;
    let ytIdx = 0;
    const interval = 5;

    while (newsIdx < newsList.length || ytIdx < youtubeList.length) {
        for (let i = 0; i < interval && newsIdx < newsList.length; i++) {
            mixedAll.push(newsList[newsIdx++]);
        }
        if (ytIdx < youtubeList.length) {
            mixedAll.push(youtubeList[ytIdx++]);
        }
    }

    results['전체'] = mixedAll;

    fs.writeFileSync(DATA_FILE, JSON.stringify(results, null, 2));
    fs.writeFileSync(JS_DATA_FILE, 'window.LOCAL_DATA = ' + JSON.stringify(results, null, 2) + ';');
    console.log('Update Complete.');
}

scrape();

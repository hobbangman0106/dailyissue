const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const iconv = require('iconv-lite');
const https = require('https');

const DATA_FILE = 'data.json';
const JS_DATA_FILE = 'data.js';

const PC_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

// Categories including YouTube
const CATEGORIES = ['전체', '경제', '사회', '정치', '생활/건강', '세계', 'IT/과학', '연예', '스포츠', '칼럼', '유튜브'];

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
    // 경제
    { cat: '유튜브', subCat: '경제', portal: 'YouTube', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCOB62fKRT7b73X7tRxMuN2g', isXml: true, tier: 1, channelName: '박종훈의 지식한방' },
    { cat: '유튜브', subCat: '경제', portal: 'YouTube', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCl_tB4AqPkkxuYcJQHz6dMw', isXml: true, tier: 1, channelName: '교양이를 부탁해' },
    { cat: '유튜브', subCat: '경제', portal: 'YouTube', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCFCtZJTuJhE18k8IXwmXTYQ', isXml: true, tier: 1, channelName: 'EBS 다큐멘터리' },
    { cat: '유튜브', subCat: '경제', portal: 'YouTube', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCF8AeLlUbEpKju6v1H6p8Eg', isXml: true, tier: 1, channelName: '한국경제TV' },
    { cat: '유튜브', subCat: '경제', portal: 'YouTube', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCsJ6RuBiTVWRX156FVbeaGg', isXml: true, tier: 1, channelName: '슈카월드' },
    { cat: '유튜브', subCat: '경제', portal: 'YouTube', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCGCGxsbmG_9nincyI7xypow', isXml: true, tier: 1, channelName: '한경 코리아마켓' },
    // 과학
    { cat: '유튜브', subCat: '과학', portal: 'YouTube', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCMc4EmuDxnHPc6pgGW-QWvQ', isXml: true, tier: 1, channelName: '안될과학' },
    { cat: '유튜브', subCat: '과학', portal: 'YouTube', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCIk1-yPCTnFuzfgu4gyfWqw', isXml: true, tier: 1, channelName: '과학드림' },
    { cat: '유튜브', subCat: '과학', portal: 'YouTube', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCoCvTlU0KpNYwnMIgs7MPrA', isXml: true, tier: 1, channelName: 'boda' },
    { cat: '유튜브', subCat: '과학', portal: 'YouTube', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCsOmBJ5jPTufS7sHea1HiTw', isXml: true, tier: 1, channelName: '석군의 비밀 수납장' },
    { cat: '유튜브', subCat: '과학', portal: 'YouTube', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UC7F6UDq3gykPZHWRhrj_BDw', isXml: true, tier: 1, channelName: '사물궁이 잡학지식' },
    // 의학/건강
    { cat: '유튜브', subCat: '의학/건강', portal: 'YouTube', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCF9vbHlZpz7FbOAky3fnYxw', isXml: true, tier: 1, channelName: '의학채널 비온뒤' },
    { cat: '유튜브', subCat: '의학/건강', portal: 'YouTube', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCedNxnMK3b2-_hzqLyo4stg', isXml: true, tier: 1, channelName: '닥터딩요' },
    // 인문/교양
    { cat: '유튜브', subCat: '인문/교양', portal: 'YouTube', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCvW8norVMTLt7QN-s2pS4Bw', isXml: true, tier: 1, channelName: '조승연의 탐구생활' },
    { cat: '유튜브', subCat: '인문/교양', portal: 'YouTube', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCcYk_KPZZMLv_bcaSAWSSxA', isXml: true, tier: 1, channelName: '지식브런치' },
    { cat: '유튜브', subCat: '인문/교양', portal: 'YouTube', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UC-swf20n5xdKW0waeLpXPFQ', isXml: true, tier: 1, channelName: 'EBS' },
    // 여행
    { cat: '유튜브', subCat: '여행', portal: 'YouTube', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCNhofiqfw5nl-NeDJkXtPvw', isXml: true, tier: 1, channelName: '빠니보틀' },
    { cat: '유튜브', subCat: '여행', portal: 'YouTube', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UClRNDVO8093rmRTtLe4GEPw', isXml: true, tier: 1, channelName: '곽튜브' },
    { cat: '유튜브', subCat: '여행', portal: 'YouTube', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UC9gxOp_-R78phMHmv2bW_sg', isXml: true, tier: 1, channelName: '원지의 하루' }
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
        
        if (title && link) {
            // Remove any trailing whitespace or newlines
            const cleanTitle = title.replace(/\s+/g, ' ').trim();
            const displayTitle = `[${channelName}] ${cleanTitle}`;
            posts.push({
                Title: displayTitle,
                Link: link,
                Portal: 'YouTube'
            });
        }
    });
    return posts;
}

function parseGoogleXml($, limit, portalName) {
    const posts = [];
    $('item').slice(0, limit).each((i, el) => {
        let title = $(el).find('title').text() || '';
        
        // Clean up the portal suffix (e.g., " - Yahoo News", " - Yahoo Finance", " - Google News", etc.)
        title = title.replace(/\s*-\s*Yahoo\s*[a-zA-Z]*$/gi, '');
        title = title.replace(/\s*-\s*Google\s*News$/gi, '');
        title = title.trim();

        posts.push({
            Title: title,
            Link: $(el).find('link').text() || '',
            Portal: portalName
        });
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

async function scrape() {
    let results = {};
    CATEGORIES.forEach(c => results[c] = []);

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

            posts.forEach(p => {
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
                        if (task.subCat) {
                            p.SubCategory = task.subCat;
                        }
                        results[finalCat].push(p);
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
        
        // Add Category and SubCategory tag to each post
        results[cat] = results[cat].map(p => {
            const sub = p.SubCategory || classifySubCategory(cat, p.Title);
            return { ...p, Category: cat, SubCategory: sub };
        });

        // Apply tiered shuffle to individual category
        results[cat] = tieredShuffle(results[cat], timeSeed);

        // Aggregate into '전체'
        results['전체'] = results['전체'].concat(results[cat]);
    }

    // Apply interleaved shuffle to '전체' category to prioritize high-interest articles in the top 30
    results['전체'] = interleavedAllShuffle(results['전체'], timeSeed);

    fs.writeFileSync(DATA_FILE, JSON.stringify(results, null, 2));
    fs.writeFileSync(JS_DATA_FILE, 'window.LOCAL_DATA = ' + JSON.stringify(results, null, 2) + ';');
    console.log('Update Complete.');
}

scrape();

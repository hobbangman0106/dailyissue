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
const CATEGORIES = ['전체', '경제', '세계', 'IT/과학', '생활/건강', '정치', '연예', '스포츠', '블로그', '기타'];

const BLOGS = [
    { name: 'silercan', url: 'https://rss.blog.naver.com/silercan.xml', limit: 3 },
    { name: 'binehase', url: 'https://rss.blog.naver.com/binehase.xml', limit: 3 },
    { name: 'rgbsky', url: 'https://rss.blog.naver.com/rgbsky.xml', limit: 3 },
    { name: 'mymykoo', url: 'https://rss.blog.naver.com/mymykoo.xml', limit: 3 },
    { name: 'dssr1115', url: 'https://rss.blog.naver.com/dssr1115.xml', limit: 3 },
    { name: 'robbiedhu', url: 'https://rss.blog.naver.com/robbiedhu.xml', limit: 3 },
    { name: 'calista21', url: 'https://rss.blog.naver.com/calista21.xml', limit: 3 },
    { name: 'kuy1738', url: 'https://rss.blog.naver.com/kuy1738.xml', limit: 3 }
];

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

    // --- 생활/건강 (통합) ---
    { cat: '생활/건강', portal: 'Google News', url: 'https://news.google.com/rss/headlines/section/topic/HEALTH?hl=ko&gl=KR&ceid=KR:ko', isXml: true },
    { cat: '생활/건강', portal: 'Yahoo US', url: 'https://news.yahoo.com/rss/health', isXml: true },
    { cat: '생활/건강', portal: '네이버', url: 'https://news.naver.com/section/103' }, // Naver Life/Culture
    { cat: '생활/건강', portal: '네이버', url: 'https://news.naver.com/section/102' }, // Naver Society
    { cat: '생활/건강', portal: '다음', url: 'https://news.daum.net/society' }, // Daum Society
    { cat: '생활/건강', portal: '다음', url: 'https://news.daum.net/culture' }, // Daum Culture

    // --- 연예 ---
    { cat: '연예', portal: '다음', url: 'https://entertain.daum.net/' },
    { cat: '연예', portal: 'Google News', url: 'https://news.google.com/rss/headlines/section/topic/ENTERTAINMENT?hl=ko&gl=KR&ceid=KR:ko', isXml: true },
    { cat: '연예', portal: 'Yahoo US', url: 'https://news.yahoo.com/rss/entertainment', isXml: true },

    // --- 스포츠 ---
    { cat: '스포츠', portal: '다음', url: 'https://sports.daum.net/' },
    { cat: '스포츠', portal: 'Google News', url: 'https://news.google.com/rss/headlines/section/topic/SPORTS?hl=ko&gl=KR&ceid=KR:ko', isXml: true },
    { cat: '스포츠', portal: 'Yahoo US', url: 'https://news.yahoo.com/rss/sports', isXml: true },

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

    const now = new Date();
    // Deterministic 1-hour seed (e.g., 2026062219)
    const timeSeed = now.getFullYear() * 1000000 + (now.getMonth() + 1) * 10000 + now.getDate() * 100 + now.getHours();

    // Scrape blogs BEFORE the category mapping and overall merging loop
    try {
        console.log('Scraping Blogs...');
        results['블로그'] = await scrapeBlogs();
    } catch (e) {
        console.error('Failed to scrape blogs:', e.message);
        results['블로그'] = [];
    }

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

    // Scrape market indicators dashboard
    try {
        console.log('Scraping Market Indicators...');
        results['시장지표'] = await scrapeMarketIndicators();
    } catch (e) {
        console.error('Failed to scrape market indicators:', e.message);
        results['시장지표'] = { type: 'dashboard', updatedAt: '', stockIndices: [], exchangeRates: [], commodities: [], interestRates: [], cryptocurrencies: [] };
    }

    fs.writeFileSync(DATA_FILE, JSON.stringify(results, null, 2));
    fs.writeFileSync(JS_DATA_FILE, 'window.LOCAL_DATA = ' + JSON.stringify(results, null, 2) + ';');
    console.log('Update Complete.');
}

async function scrapeBlogs() {
    const posts = [];
    for (const blog of BLOGS) {
        try {
            console.log(`  Scraping Blog: ${blog.name}...`);
            const response = await axios.get(blog.url, {
                headers: { 'User-Agent': PC_UA },
                httpsAgent,
                timeout: 8000
            });
            const $ = cheerio.load(response.data, { xmlMode: true });
            
            let count = 0;
            $('item').each((i, el) => {
                if (count >= blog.limit) return;
                
                let title = $(el).find('title').text() || '';
                title = title.replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1').trim();
                
                let link = $(el).find('link').text() || '';
                link = link.replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1').trim();
                
                if (title && link) {
                    posts.push({
                        Title: title,
                        Link: link,
                        Portal: '네이버 블로그',
                        Author: blog.name
                    });
                    count++;
                }
            });
            console.log(`    Successfully fetched ${count} posts from ${blog.name}`);
        } catch (e) {
            console.error(`    Failed to scrape blog ${blog.name}:`, e.message);
        }
    }
    return posts;
}

async function scrapeMarketIndicators() {
    // 0. Load previous data cache as fallback
    let previousData = null;
    try {
        if (fs.existsSync(DATA_FILE)) {
            previousData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        }
    } catch (e) {
        console.error('Failed to load previous data cache:', e.message);
    }

    const data = {
        type: 'dashboard',
        updatedAt: '',
        stockIndices: [],
        exchangeRates: [],
        commodities: [],
        interestRates: [],
        cryptocurrencies: []
    };

    // Calculate KST time and dates
    const dateInfo = getKstDateInfo();
    const zeroPad = (num) => String(num).padStart(2, '0');
    data.updatedAt = `${dateInfo.todayKstStr} ${zeroPad(dateInfo.kstHour)}:${zeroPad(dateInfo.kstMinute)}`;

    // Helper: Extract a cached symbol from previous data
    function getCachedSymbol(name, category) {
        if (previousData && previousData['시장지표']) {
            let list = [];
            if (category === 'stock') list = previousData['시장지표'].stockIndices || [];
            else if (category === 'exchange') list = previousData['시장지표'].exchangeRates || [];
            else if (category === 'commodity') list = previousData['시장지표'].commodities || [];
            else if (category === 'interest') list = previousData['시장지표'].interestRates || [];
            else if (category === 'crypto') list = previousData['시장지표'].cryptocurrencies || [];

            const match = list.find(x => x.name === name);
            if (match) {
                return {
                    name: match.name,
                    value: match.value,
                    change: match.change,
                    percent: match.percent,
                    direction: match.direction,
                    link: match.link,
                    date: match.date
                };
            }
        }
        return null;
    }

    // Helper: Fetch domestic index with Naver-to-Yahoo fallback
    async function fetchDomesticIndex(name, symbol, cachedSymbol, dateInfo) {
        const targetDate = getTargetDateForSymbol(name, dateInfo);

        if (cachedSymbol && cachedSymbol.date === targetDate) {
            console.log(`  [Cache] ${name} is already up-to-date for ${targetDate}.`);
            return cachedSymbol;
        }

        console.log(`  [Fetch] Updating ${name} for target date ${targetDate}...`);

        // 1. Try Naver Finance (Primary)
        try {
            console.log(`    Trying Naver Finance for ${name}...`);
            const response = await axios.get('https://finance.naver.com/', {
                responseType: 'arraybuffer',
                headers: { 'User-Agent': PC_UA },
                httpsAgent,
                timeout: 8000
            });
            const html = iconv.decode(response.data, 'EUC-KR');
            const $ = cheerio.load(html);

            let foundData = null;
            $('h4').each((i, el) => {
                const h4Text = $(el).find('span.blind').text().trim() || $(el).text().trim();
                if (h4Text === name) {
                    const sibling = $(el).nextAll('a').first();
                    const numQuot = sibling.find('.num_quot');
                    const value = numQuot.find('.num').text().trim();
                    const change = numQuot.find('.num2').text().trim();
                    const percent = numQuot.find('.num3').text().trim();
                    
                    let direction = 'stable';
                    if (numQuot.hasClass('up')) direction = 'up';
                    else if (numQuot.hasClass('dn')) direction = 'down';
                    
                    const linkRaw = sibling.attr('href') || '';
                    const link = linkRaw ? 'https://finance.naver.com' + linkRaw : '';
                    
                    if (value && change) {
                        foundData = {
                            name,
                            value,
                            change,
                            percent,
                            direction,
                            link,
                            date: targetDate
                        };
                    }
                }
            });

            if (foundData) {
                console.log(`    Successfully fetched ${name} from Naver Finance: ${foundData.value}`);
                return foundData;
            }
        } catch (err) {
            console.warn(`    Naver Finance failed for ${name}: ${err.message}`);
        }

        // 2. Try Yahoo Finance Fallback (Secondary)
        try {
            console.log(`    Trying Yahoo Finance fallback for ${name} (${symbol})...`);
            const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=2d`;
            const response = await axios.get(url, { headers: { 'User-Agent': PC_UA }, timeout: 8000 });
            const meta = response.data.chart.result[0].meta;
            const price = meta.regularMarketPrice;
            const prevClose = meta.chartPreviousClose;
            const change = price - prevClose;
            const percent = (change / prevClose) * 100;
            let direction = 'stable';
            if (change > 0) direction = 'up'; else if (change < 0) direction = 'down';
            
            const sign = direction === 'up' ? '+' : (direction === 'down' ? '-' : '');
            const formattedValue = price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            const formattedChange = Math.abs(change).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            const formattedPercent = `${sign}${Math.abs(percent).toFixed(2)}%`;

            const foundData = {
                name,
                value: formattedValue,
                change: formattedChange,
                percent: formattedPercent,
                direction,
                link: `https://finance.yahoo.com/quote/${symbol}`,
                date: targetDate
            };
            console.log(`    Successfully fetched ${name} from Yahoo Finance fallback: ${foundData.value}`);
            return foundData;
        } catch (err) {
            console.error(`    Yahoo Finance fallback failed for ${name}: ${err.message}`);
        }

        // 3. Try Cache Fallback (Tertiary)
        if (cachedSymbol) {
            console.warn(`    Both Naver and Yahoo failed for ${name}. Using cache: ${cachedSymbol.value}`);
            return cachedSymbol;
        }

        // 4. Fallback default
        return {
            name,
            value: '-',
            change: '-',
            percent: '',
            direction: 'stable',
            link: `https://finance.yahoo.com/quote/${symbol}`,
            date: dateInfo.yesterdayKstStr
        };
    }

    // 1. Fetch Domestic Stock Indices (KOSPI, KOSDAQ, KOSPI200) with fallback
    const domesticIndices = [
        { name: '코스피', symbol: '^KS11' },
        { name: '코스닥', symbol: '^KQ11' },
        { name: '코스피200', symbol: '^KS200' }
    ];

    for (const idx of domesticIndices) {
        const cached = getCachedSymbol(idx.name, 'stock');
        const res = await fetchDomesticIndex(idx.name, idx.symbol, cached, dateInfo);
        data.stockIndices.push(res);
    }

    // 2. Fetch Domestic Interest Rates
    try {
        const targetDate = getTargetDateForSymbol('CD금리', dateInfo);
        const needsRateUpdate = shouldUpdateSymbol('CD금리', dateInfo, getCachedSymbol('CD금리', 'interest'));
        
        if (!needsRateUpdate && previousData && previousData['시장지표'] && previousData['시장지표'].interestRates) {
            console.log('  [Cache] Domestic interest rates are already up-to-date.');
            previousData['시장지표'].interestRates.forEach(rate => {
                if (rate.name !== '미국 국채 10년') {
                    data.interestRates.push(rate);
                }
            });
        } else {
            console.log('  [Fetch] Fetching domestic interest rates from Naver...');
            const response = await axios.get('https://finance.naver.com/marketindex/', {
                responseType: 'arraybuffer',
                headers: { 'User-Agent': PC_UA },
                httpsAgent,
                timeout: 8000
            });
            const html = iconv.decode(response.data, 'EUC-KR');
            const $ = cheerio.load(html);

            $('table.tbl_exchange.market tr').each((i, el) => {
                if (i === 0 || i === 7) return;
                const tds = $(el).find('td');
                const th = $(el).find('th');
                if (th.length && tds.length) {
                    const name = th.text().trim();
                    const value = tds.eq(0).text().trim();
                    const change = tds.eq(1).text().trim();
                    
                    let direction = 'stable';
                    if (tds.eq(1).hasClass('up')) direction = 'up';
                    else if (tds.eq(1).hasClass('down')) direction = 'down';

                    const linkRaw = th.find('a').attr('href') || $(el).find('a').first().attr('href') || '';
                    const link = linkRaw ? 'https://finance.naver.com' + linkRaw : '';

                    if (!name.includes('달러 인덱스')) {
                        data.interestRates.push({ name, value, change, direction, link, date: targetDate });
                    }
                }
            });
        }
    } catch (e) {
        console.error('Failed to scrape domestic interest rates from Naver, using cache fallback:', e.message);
        if (previousData && previousData['시장지표'] && previousData['시장지표'].interestRates) {
            previousData['시장지표'].interestRates.forEach(rate => {
                if (rate.name !== '미국 국채 10년') {
                    data.interestRates.push(rate);
                }
            });
        }
    }

    // 3. Fetch Yahoo Finance symbols
    const yahooJobs = [
        { name: '다우산업', symbol: '^DJI', category: 'stock', formatter: indexFormatter },
        { name: '나스닥', symbol: '^IXIC', category: 'stock', formatter: indexFormatter },
        { name: 'S&P 500', symbol: '^GSPC', category: 'stock', formatter: indexFormatter },
        { name: '니케이225', symbol: '^N225', category: 'stock', formatter: indexFormatter },
        { name: '상해종합', symbol: '000001.SS', category: 'stock', formatter: indexFormatter },
        { name: '홍콩H', symbol: '^HSCE', category: 'stock', formatter: indexFormatter },
        { name: '미국 USD', symbol: 'USDKRW=X', category: 'exchange', formatter: rateFormatter },
        { name: '일본 JPY(100엔)', symbol: 'JPYKRW=X', category: 'exchange', formatter: jpyRateFormatter },
        { name: '유럽 EUR', symbol: 'EURKRW=X', category: 'exchange', formatter: rateFormatter },
        { name: '중국 CNY', symbol: 'CNYKRW=X', category: 'exchange', formatter: rateFormatter },
        { name: '달러인덱스', symbol: 'DX-Y.NYB', category: 'exchange', formatter: dxyFormatter, linkSymbol: 'DX-Y.NYB' },
        { name: 'WTI 원유', symbol: 'CL=F', category: 'commodity', formatter: commFormatter },
        { name: '국제 금', symbol: 'GC=F', category: 'commodity', formatter: commFormatter },
        { name: '구리 (LME)', symbol: 'HG=F', category: 'commodity', formatter: copperFormatter },
        { name: '천연가스', symbol: 'NG=F', category: 'commodity', formatter: copperFormatter },
        { name: '미국 국채 10년', symbol: '%5ETNX', category: 'interest', formatter: bondFormatter, linkSymbol: '^TNX' }
    ];

    function indexFormatter(price, change, percent, direction) {
        const sign = direction === 'up' ? '+' : (direction === 'down' ? '-' : '');
        return { value: price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }), change: Math.abs(change).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }), percent: `${sign}${Math.abs(percent).toFixed(2)}%` };
    }
    function rateFormatter(price, change, percent, direction) {
        const sign = direction === 'up' ? '+' : (direction === 'down' ? '-' : '');
        return { value: price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }), change: Math.abs(change).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }), percent: `${sign}${Math.abs(percent).toFixed(2)}%` };
    }
    function jpyRateFormatter(price, change, percent, direction) {
        const sign = direction === 'up' ? '+' : (direction === 'down' ? '-' : '');
        return { value: (price * 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }), change: Math.abs(change * 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }), percent: `${sign}${Math.abs(percent).toFixed(2)}%` };
    }
    function dxyFormatter(price, change, percent, direction) {
        const sign = direction === 'up' ? '+' : (direction === 'down' ? '-' : '');
        return { value: price.toFixed(3), change: Math.abs(change).toFixed(3), percent: `${sign}${Math.abs(percent).toFixed(2)}%` };
    }
    function commFormatter(price, change, percent, direction) {
        const sign = direction === 'up' ? '+' : (direction === 'down' ? '-' : '');
        return { value: price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }), change: Math.abs(change).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }), percent: `${sign}${Math.abs(percent).toFixed(2)}%` };
    }
    function copperFormatter(price, change, percent, direction) {
        const sign = direction === 'up' ? '+' : (direction === 'down' ? '-' : '');
        return { value: price.toFixed(4), change: Math.abs(change).toFixed(4), percent: `${sign}${Math.abs(percent).toFixed(2)}%` };
    }
    function bondFormatter(price, change, percent, direction) {
        const sign = direction === 'up' ? '+' : (direction === 'down' ? '-' : '');
        return { value: price.toFixed(3), change: Math.abs(change).toFixed(3), percent: `${sign}${Math.abs(percent).toFixed(2)}%` };
    }

    const targetMap = { stock: data.stockIndices, exchange: data.exchangeRates, commodity: data.commodities, interest: data.interestRates };

    const yahooResults = await Promise.allSettled(
        yahooJobs.map(async (job) => {
            const cached = getCachedSymbol(job.name, job.category);
            const targetDate = getTargetDateForSymbol(job.name, dateInfo);
            
            const needUpdate = shouldUpdateSymbol(job.name, dateInfo, cached);
            if (!needUpdate) {
                console.log(`  [Cache] ${job.name} is already up-to-date for ${targetDate}.`);
                return { ...cached, category: job.category };
            }

            console.log(`  [Fetch] Updating ${job.name} for target date ${targetDate}...`);
            try {
                const url = `https://query1.finance.yahoo.com/v8/finance/chart/${job.symbol}?interval=1d&range=2d`;
                const response = await axios.get(url, { headers: { 'User-Agent': PC_UA }, timeout: 8000 });
                const meta = response.data.chart.result[0].meta;
                const price = meta.regularMarketPrice;
                const prevClose = meta.chartPreviousClose;
                const change = price - prevClose;
                const percent = (change / prevClose) * 100;
                let direction = 'stable';
                if (change > 0) direction = 'up'; else if (change < 0) direction = 'down';
                const formatted = job.formatter(price, change, percent, direction);
                return { name: job.name, value: formatted.value, change: formatted.change, percent: formatted.percent, direction, link: `https://finance.yahoo.com/quote/${job.linkSymbol || job.symbol}`, date: targetDate, category: job.category };
            } catch (e) {
                console.error(`Failed to fetch Yahoo symbol ${job.name} (${job.symbol}):`, e.message);
                if (cached) return { ...cached, category: job.category };
                return { name: job.name, value: '-', change: '-', percent: '', direction: 'stable', link: `https://finance.yahoo.com/quote/${job.linkSymbol || job.symbol}`, date: dateInfo.yesterdayKstStr, category: job.category };
            }
        })
    );

    yahooResults.forEach((res) => {
        if (res.status === 'fulfilled') {
            const item = res.value;
            const targetArray = targetMap[item.category];
            if (targetArray) {
                const cleanedItem = {
                    name: item.name,
                    value: item.value,
                    change: item.change,
                    percent: item.percent,
                    direction: item.direction,
                    link: item.link,
                    date: item.date
                };
                targetArray.push(cleanedItem);
            }
        }
    });

    // 4. Fetch Upbit Crypto (비트코인, 이더리움)
    const cryptoSymbols = ['비트코인', '이더리움'];
    
    for (const name of cryptoSymbols) {
        const cached = getCachedSymbol(name, 'crypto');
        const targetDate = getTargetDateForSymbol(name, dateInfo);
        
        const needCryptoUpdate = shouldUpdateSymbol(name, dateInfo, cached);
        if (!needCryptoUpdate) {
            console.log(`  [Cache] ${name} is already up-to-date for ${targetDate}.`);
            data.cryptocurrencies.push(cached);
        } else {
            console.log(`  [Fetch] Updating ${name} for target date ${targetDate}...`);
            try {
                const marketCode = name === '비트코인' ? 'KRW-BTC' : 'KRW-ETH';
                const url = `https://api.upbit.com/v1/ticker?markets=${marketCode}`;
                const response = await axios.get(url, {
                    headers: { 'User-Agent': PC_UA },
                    timeout: 8000
                });

                const item = response.data[0];
                const price = item.trade_price;
                const changePrice = item.signed_change_price;
                const changeRate = item.signed_change_rate * 100;
                
                let direction = 'stable';
                if (changeRate > 0) direction = 'up';
                else if (changeRate < 0) direction = 'down';

                const sign = direction === 'up' ? '+' : '-';
                const formattedPrice = Math.round(price / 1000).toLocaleString() + ' 천원';
                const formattedChange = Math.round(Math.abs(changePrice) / 1000).toLocaleString();
                const formattedPercent = `${sign}${Math.abs(changeRate).toFixed(2)}%`;

                data.cryptocurrencies.push({
                    name,
                    value: formattedPrice,
                    change: formattedChange,
                    percent: formattedPercent,
                    direction,
                    link: `https://upbit.com/exchange?code=CRIX.UPBIT.${marketCode}`,
                    date: targetDate
                });
                console.log(`    Successfully fetched ${name} from Upbit: ${formattedPrice}`);
            } catch (e) {
                console.error(`Failed to fetch Upbit Crypto ${name}, using cache fallback:`, e.message);
                if (cached) {
                    data.cryptocurrencies.push(cached);
                } else {
                    data.cryptocurrencies.push({
                        name,
                        value: '-',
                        change: '-',
                        percent: '',
                        direction: 'stable',
                        link: `https://upbit.com/exchange?code=CRIX.UPBIT.${name === '비트코인' ? 'KRW-BTC' : 'KRW-ETH'}`,
                        date: dateInfo.yesterdayKstStr
                    });
                }
            }
        }
    }

    return data;
}

// ==========================================
// Helper functions for date & closing time
// ==========================================
function getKstDateInfo() {
    const now = new Date();
    const kstOffset = 9 * 60 * 60 * 1000;
    const kstTime = new Date(now.getTime() + kstOffset);
    
    const yyyy = kstTime.getUTCFullYear();
    const mm = String(kstTime.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(kstTime.getUTCDate()).padStart(2, '0');
    const todayKstStr = `${yyyy}.${mm}.${dd}`;
    const kstHour = kstTime.getUTCHours();
    const kstMinute = kstTime.getUTCMinutes();

    const yesterdayTime = new Date(kstTime.getTime() - (24 * 60 * 60 * 1000));
    const y_yyyy = yesterdayTime.getUTCFullYear();
    const y_mm = String(yesterdayTime.getUTCMonth() + 1).padStart(2, '0');
    const y_dd = String(yesterdayTime.getUTCDate()).padStart(2, '0');
    const yesterdayKstStr = `${y_yyyy}.${y_mm}.${y_dd}`;

    return { todayKstStr, yesterdayKstStr, kstHour, kstMinute };
}

function getTargetDateForSymbol(name, dateInfo) {
    const { todayKstStr, yesterdayKstStr, kstHour } = dateInfo;
    let closeHour = 16;
    if (['코스피', '코스닥', '코스피200', '니케이225'].includes(name)) {
        closeHour = 16;
    } else if (['상해종합', '홍콩H'].includes(name)) {
        closeHour = 17;
    } else if (['다우산업', '나스닥', 'S&P 500', '미국 국채 10년'].includes(name)) {
        closeHour = 6;
    } else if (['미국 USD', '일본 JPY(100엔)', '유럽 EUR', '중국 CNY', '달러인덱스', 'WTI 원유', '국제 금', '구리 (LME)', '천연가스'].includes(name)) {
        closeHour = 7;
    } else if (['비트코인', '이더리움'].includes(name)) {
        closeHour = 9;
    }

    return kstHour < closeHour ? yesterdayKstStr : todayKstStr;
}

function shouldUpdateSymbol(name, dateInfo, cachedSymbol) {
    if (!cachedSymbol || !cachedSymbol.date) return true;
    const targetDate = getTargetDateForSymbol(name, dateInfo);
    return cachedSymbol.date !== targetDate;
}

scrape();

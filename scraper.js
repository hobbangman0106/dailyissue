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
const CATEGORIES = ['전체', '시장지표', '경제', '세계', 'IT/과학', '건강/의학', '생활/문화', '정치', '연예', '스포츠', '기타'];

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

    for (const cat of CATEGORIES) {
        if(cat === '전체' || cat === '시장지표') continue;
        
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

    const now = new Date();
    const zeroPad = (num) => String(num).padStart(2, '0');
    data.updatedAt = `${now.getFullYear()}.${zeroPad(now.getMonth() + 1)}.${zeroPad(now.getDate())} ${zeroPad(now.getHours())}:${zeroPad(now.getMinutes())}`;

    // 1. Fetch Domestic Interest Rates from Naver (CD, Call, 국고채 3년, 회사채 3년, COFIX)
    // Since these only change once a day, we keep Naver scraping but wrap it in a strict try-catch.
    // If it fails (IP block, structural change), we immediately recover from previous data.
    try {
        const response = await axios.get('https://finance.naver.com/marketindex/', {
            responseType: 'arraybuffer',
            headers: { 'User-Agent': PC_UA },
            httpsAgent,
            timeout: 8000
        });
        const html = iconv.decode(response.data, 'EUC-KR');
        const $ = cheerio.load(html);

        $('table.tbl_exchange.market tr').each((i, el) => {
            if (i === 0 || i === 7) return; // skip headers
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

                // We exclude Dollar Index here because we will fetch it fresh from Yahoo
                if (!name.includes('달러 인덱스')) {
                    data.interestRates.push({ name, value, change, direction, link });
                }
            }
        });
    } catch (e) {
        console.error('Failed to scrape domestic interest rates from Naver, using cache fallback:', e.message);
        if (previousData && previousData['시장지표'] && previousData['시장지표'].interestRates) {
            // Copy cached domestic interest rates (filter out US 10-Year Treasury since we get it fresh from Yahoo)
            data.interestRates = previousData['시장지표'].interestRates.filter(item => item.name !== '미국 국채 10년');
        }
    }

    // 2. Fetch Yahoo Finance symbols in parallel (complies with crawling policy, fast and clean JSON)
    const yahooJobs = [
        // --- Stock Indices ---
        { name: '코스피', symbol: '^KS11', category: 'stock', formatter: indexFormatter },
        { name: '코스닥', symbol: '^KQ11', category: 'stock', formatter: indexFormatter },
        { name: '코스피200', symbol: '^KS200', category: 'stock', formatter: indexFormatter },
        { name: '다우산업', symbol: '^DJI', category: 'stock', formatter: indexFormatter },
        { name: '나스닥', symbol: '^IXIC', category: 'stock', formatter: indexFormatter },
        { name: 'S&P 500', symbol: '^GSPC', category: 'stock', formatter: indexFormatter },
        { name: '니케이225', symbol: '^N225', category: 'stock', formatter: indexFormatter },
        { name: '상해종합', symbol: '000001.SS', category: 'stock', formatter: indexFormatter },
        { name: '홍콩H', symbol: '^HSCE', category: 'stock', formatter: indexFormatter },

        // --- Exchange Rates ---
        { name: '미국 USD', symbol: 'USDKRW=X', category: 'exchange', formatter: rateFormatter },
        { name: '일본 JPY(100엔)', symbol: 'JPYKRW=X', category: 'exchange', formatter: jpyRateFormatter },
        { name: '유럽 EUR', symbol: 'EURKRW=X', category: 'exchange', formatter: rateFormatter },
        { name: '중국 CNY', symbol: 'CNYKRW=X', category: 'exchange', formatter: rateFormatter },
        { name: '달러인덱스', symbol: 'DX-Y.NYB', category: 'exchange', formatter: dxyFormatter, linkSymbol: 'DX-Y.NYB' },

        // --- Commodities ---
        { name: 'WTI 원유', symbol: 'CL=F', category: 'commodity', formatter: commFormatter },
        { name: '국제 금', symbol: 'GC=F', category: 'commodity', formatter: commFormatter },
        { name: '구리 (LME)', symbol: 'HG=F', category: 'commodity', formatter: copperFormatter },
        { name: '천연가스', symbol: 'NG=F', category: 'commodity', formatter: copperFormatter },

        // --- Interest Rates ---
        { name: '미국 국채 10년', symbol: '%5ETNX', category: 'interest', formatter: bondFormatter, linkSymbol: '^TNX' }
    ];

    // Helper formatting functions
    function indexFormatter(price, change, percent, direction) {
        const sign = direction === 'up' ? '+' : (direction === 'down' ? '-' : '');
        return {
            value: price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            change: Math.abs(change).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            percent: `${sign}${Math.abs(percent).toFixed(2)}%`
        };
    }

    function rateFormatter(price, change, percent, direction) {
        const sign = direction === 'up' ? '+' : (direction === 'down' ? '-' : '');
        return {
            value: price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            change: Math.abs(change).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            percent: `${sign}${Math.abs(percent).toFixed(2)}%`
        };
    }

    function jpyRateFormatter(price, change, percent, direction) {
        const sign = direction === 'up' ? '+' : (direction === 'down' ? '-' : '');
        return {
            value: (price * 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            change: Math.abs(change * 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            percent: `${sign}${Math.abs(percent).toFixed(2)}%`
        };
    }

    function dxyFormatter(price, change, percent, direction) {
        const sign = direction === 'up' ? '+' : (direction === 'down' ? '-' : '');
        return {
            value: price.toFixed(3),
            change: Math.abs(change).toFixed(3),
            percent: `${sign}${Math.abs(percent).toFixed(2)}%`
        };
    }

    function commFormatter(price, change, percent, direction) {
        const sign = direction === 'up' ? '+' : (direction === 'down' ? '-' : '');
        return {
            value: price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            change: Math.abs(change).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            percent: `${sign}${Math.abs(percent).toFixed(2)}%`
        };
    }

    // Note: copper/natgas are standard decimals
    function copperFormatter(price, change, percent, direction) {
        const sign = direction === 'up' ? '+' : (direction === 'down' ? '-' : '');
        return {
            value: price.toFixed(4),
            change: Math.abs(change).toFixed(4),
            percent: `${sign}${Math.abs(percent).toFixed(2)}%`
        };
    }

    function bondFormatter(price, change, percent, direction) {
        const sign = direction === 'up' ? '+' : (direction === 'down' ? '-' : '');
        return {
            value: price.toFixed(3),
            change: Math.abs(change).toFixed(3),
            percent: `${sign}${Math.abs(percent).toFixed(2)}%`
        };
    }

    // Map categories to target arrays in data object
    const targetMap = {
        stock: data.stockIndices,
        exchange: data.exchangeRates,
        commodity: data.commodities,
        interest: data.interestRates
    };

    // Execute Yahoo fetches in parallel using Promise.allSettled
    const yahooResults = await Promise.allSettled(
        yahooJobs.map(async (job) => {
            try {
                const url = `https://query1.finance.yahoo.com/v8/finance/chart/${job.symbol}?interval=1d&range=2d`;
                const response = await axios.get(url, {
                    headers: { 'User-Agent': PC_UA },
                    timeout: 6000
                });
                
                const meta = response.data.chart.result[0].meta;
                const price = meta.regularMarketPrice;
                const prevClose = meta.chartPreviousClose;
                const change = price - prevClose;
                const percent = (change / prevClose) * 100;
                
                let direction = 'stable';
                if (change > 0) direction = 'up';
                else if (change < 0) direction = 'down';

                const formatted = job.formatter(price, change, percent, direction);
                const quoteSymbol = job.linkSymbol || job.symbol;

                return {
                    name: job.name,
                    value: formatted.value,
                    change: formatted.change,
                    percent: formatted.percent,
                    direction,
                    link: `https://finance.yahoo.com/quote/${quoteSymbol}`,
                    category: job.category
                };
            } catch (e) {
                console.error(`Failed to fetch Yahoo symbol ${job.name} (${job.symbol}):`, e.message);
                
                // Fallback to previous data cache if available
                if (previousData && previousData['시장지표']) {
                    const allPrev = [
                        ...(previousData['시장지표'].stockIndices || []),
                        ...(previousData['시장지표'].exchangeRates || []),
                        ...(previousData['시장지표'].commodities || []),
                        ...(previousData['시장지표'].interestRates || [])
                    ];
                    const match = allPrev.find(x => x.name === job.name);
                    if (match) {
                        return { ...match, category: job.category };
                    }
                }
                
                return {
                    name: job.name,
                    value: '-',
                    change: '-',
                    percent: '',
                    direction: 'stable',
                    link: `https://finance.yahoo.com/quote/${job.linkSymbol || job.symbol}`,
                    category: job.category
                };
            }
        })
    );

    // Populate data with Yahoo results
    yahooResults.forEach((res) => {
        if (res.status === 'fulfilled') {
            const item = res.value;
            const targetArray = targetMap[item.category];
            if (targetArray) {
                // Delete category field from final object to keep it clean
                const cleanedItem = {
                    name: item.name,
                    value: item.value,
                    change: item.change,
                    percent: item.percent,
                    direction: item.direction,
                    link: item.link
                };
                targetArray.push(cleanedItem);
            }
        }
    });

    // 3. Fetch Upbit Crypto (비트코인, 이더리움)
    try {
        const url = 'https://api.upbit.com/v1/ticker?markets=KRW-BTC,KRW-ETH';
        const response = await axios.get(url, {
            headers: { 'User-Agent': PC_UA },
            timeout: 5000
        });

        response.data.forEach(item => {
            const name = item.market === 'KRW-BTC' ? '비트코인' : '이더리움';
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
                link: `https://upbit.com/exchange?code=CRIX.UPBIT.${item.market}`
            });
        });
    } catch (e) {
        console.error('Failed to fetch Upbit Crypto, using cache fallback:', e.message);
        if (previousData && previousData['시장지표'] && previousData['시장지표'].cryptocurrencies) {
            data.cryptocurrencies = previousData['시장지표'].cryptocurrencies;
        }
    }

    return data;
}

scrape();

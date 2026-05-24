const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const iconv = require('iconv-lite');
const https = require('https');

const DATA_FILE = path.join(__dirname, 'data.json');

// 프리미엄 브라우저 User-Agent 정의
const PC_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const MOBILE_UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1';

// SSL 인증서 우회를 위한 HTTPS Agent 설정 (82Cook 등 일부 사이트 오류 방지)
const httpsAgent = new https.Agent({
    rejectUnauthorized: false
});

const DEFAULT_HEADERS = {
    'User-Agent': PC_UA,
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
    'Referer': 'https://www.google.com/',
    'Connection': 'keep-alive'
};

const CONFIG = {
    'FM Korea': {
        url: 'https://www.fmkorea.com/best',
        urlTemplate: (page) => `https://www.fmkorea.com/best?page=${page}`,
        domain: 'fmkorea.com',
        pagesCount: 5,
        limit: 100,
        headers: {
            'User-Agent': MOBILE_UA,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'ko-KR,ko;q=0.9',
            'Referer': 'https://www.fmkorea.com/',
            'Accept-Encoding': 'gzip, deflate, br'
        },
        selector: '.bd_lst.li_ca tr:not(.notice)',
        parse: ($el, $) => {
            const titleEl = $el.find('.title a');
            return {
                Title: titleEl.text().replace(/\[\d+\]$/, '').trim(),
                Link: titleEl.attr('href'),
                Comments: $el.find('.replyNum').text().replace(/\[|\]/g, '') || '0',
                Votes: $el.find('.vst').text().trim() || '0',
                Time: $el.find('.regdate').text().trim() || ''
            };
        }
    },
    'Ruliweb': {
        url: 'https://bbs.ruliweb.com/best',
        urlTemplate: (page) => `https://bbs.ruliweb.com/best?page=${page}`,
        domain: 'bbs.ruliweb.com',
        pagesCount: 4,
        limit: 100,
        selector: 'tr.table_body',
        parse: ($el, $) => {
            const titleEl = $el.find('.subject strong.text_over');
            const linkEl = $el.find('.subject a.subject_link');
            const commentsEl = $el.find('.num_reply');
            
            const rawTitle = titleEl.text().trim() || $el.find('.subject a').text().trim();
            const title = rawTitle.replace(/\s+/g, ' ').replace(/\s*\(\d+\)$/, '').trim();
            const link = linkEl.attr('href') || $el.find('.subject a').attr('href');
            
            return {
                Title: title,
                Link: link,
                Comments: commentsEl.text().replace(/[\(\)\s]/g, '').trim() || '0',
                Views: $el.find('td.hit').text().trim() || '0',
                Votes: $el.find('td.recomd').text().trim() || '0',
                Time: $el.find('td.time').text().trim() || ''
            };
        }
    },
    'Theqoo': {
        url: 'https://theqoo.net/hot',
        urlTemplate: (page) => `https://theqoo.net/hot?page=${page}&filter_mode=normal`,
        domain: 'theqoo.net',
        pagesCount: 5,
        limit: 100,
        selector: 'tbody tr:not(.notice)',
        parse: ($el, $) => {
            const titleEl = $el.find('.title a').first();
            let title = titleEl.text().trim();
            if (!title) return null;
            title = title.replace(/\s+/g, ' ').replace(/\s*\[\d+\]$/, '').trim();
            return {
                Title: title,
                Link: titleEl.attr('href'),
                Comments: $el.find('.reply, .comments').text().trim() || '0',
                Views: $el.find('.views').text().trim() || '0',
                Time: $el.find('.time').text().trim() || ''
            };
        }
    },
    'Bobae Dream': {
        url: 'https://www.bobaedream.co.kr/list?code=best',
        urlTemplate: (page) => `https://www.bobaedream.co.kr/list?code=best&page=${page}`,
        domain: 'bobaedream.co.kr',
        pagesCount: 5,
        limit: 100,
        selector: 'tr',
        parse: ($el, $) => {
            const titleEl = $el.find('a[href*="No="]').first();
            if (titleEl.length === 0) return null;
            let title = titleEl.text().trim();
            return {
                Title: title,
                Link: titleEl.attr('href'),
                Comments: $el.find('.comment').text().replace(/[\[\]\s]/g, '').trim() || '0',
                Views: $el.find('.hit').text().trim() || '0',
                Votes: $el.find('.recomm').text().trim() || '0',
                Time: $el.find('.date').text().trim() || ''
            };
        }
    },
    'Clien': {
        url: 'https://www.clien.net/service/board/park',
        urlTemplate: (page) => `https://www.clien.net/service/board/park?po=${page - 1}`,
        domain: 'clien.net',
        pagesCount: 4,
        limit: 100,
        selector: '.list_item',
        parse: ($el, $) => {
            const titleEl = $el.find('.list_subject span').first();
            const title = titleEl.text().trim();
            if (!title) return null;
            const link = $el.find('.list_subject').attr('href');
            return {
                Title: title,
                Link: link,
                Comments: $el.find('.r_count').text().trim() || '0',
                Time: $el.find('.timestamp').text().trim() || ''
            };
        }
    },
    'Ppomppu': {
        url: 'https://www.ppomppu.co.kr/hot.php',
        urlTemplate: (page) => `https://www.ppomppu.co.kr/hot.php?page=${page}`,
        domain: 'ppomppu.co.kr',
        encoding: 'euc-kr',
        pagesCount: 5,
        limit: 100,
        headers: {
            'User-Agent': PC_UA,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
            'Accept-Language': 'ko-KR,ko;q=0.9',
            'Referer': 'https://www.ppomppu.co.kr/',
            'Connection': 'keep-alive'
        },
        selector: 'tr',
        parse: ($el, $) => {
            // 텍스트가 있는 view.php 링크만 골라 냄 (제목 수집 누락 해결)
            const titleEl = $el.find('a[href*="view.php"]').filter((i, aEl) => $(aEl).text().trim().length > 3).first();
            let title = titleEl.text().trim();
            if (!title) return null;
            title = title.replace(/\s+/g, ' ').replace(/\s*\(\d+\)$/, '').trim();
            return {
                Title: title,
                Link: titleEl.attr('href'),
                Comments: $el.find('.list_comment2').text().trim() || '0',
                Time: $el.find('td').eq(4).text().trim() || ''
            };
        }
    },
    'DC Inside': {
        url: 'https://gall.dcinside.com/board/lists/?id=dcbest',
        urlTemplate: (page) => `https://gall.dcinside.com/board/lists/?id=dcbest&page=${page}`,
        domain: 'gall.dcinside.com',
        pagesCount: 4,
        limit: 100,
        selector: '.gall_list tbody tr.ub-content, .gall_list tbody tr.us-post',
        parse: ($el, $) => {
            const titleEl = $el.find('.gall_tit a').first();
            let title = titleEl.text().trim();
            if (!title || !titleEl.attr('href') || titleEl.attr('href').startsWith('javascript')) return null;
            return {
                Title: title.replace(/\s+/g, ' ').trim(),
                Link: titleEl.attr('href'),
                Comments: $el.find('.reply_num').text().replace(/[\[\]]/g, '').trim() || '0',
                Views: $el.find('.gall_count').text().trim() || '0',
                Votes: $el.find('.gall_recommend').text().trim() || '0',
                Time: $el.find('.gall_date').text().trim() || ''
            };
        }
    },
    'MLB Park': {
        url: 'https://mlbpark.donga.com/mp/b.php?b=bullpen&m=best',
        urlTemplate: (page) => `https://mlbpark.donga.com/mp/b.php?b=bullpen&m=best&p=${(page - 1) * 30 + 1}`,
        domain: 'mlbpark.donga.com',
        pagesCount: 4,
        limit: 100,
        selector: '.tbl_type01 tbody tr',
        parse: ($el, $) => {
            if ($el.find('.notice').length > 0 || $el.text().includes('공지')) return null;
            const titleEl = $el.find('a[href*="id="]').first();
            let title = titleEl.text().trim();
            if (!title) return null;
            title = title.replace(/\s+/g, ' ').replace(/\[\d+\]$/, '').trim();
            return {
                Title: title,
                Link: titleEl.attr('href'),
                Comments: $el.find('.reply').text().trim() || '0',
                Views: $el.find('.hit').text().trim() || '0',
                Time: $el.find('.date').text().trim() || ''
            };
        }
    },
    'Instiz': {
        url: 'https://www.instiz.net/bbs/list.php?id=pt',
        urlTemplate: (page) => `https://www.instiz.net/bbs/list.php?id=pt&page=${page}`,
        domain: 'instiz.net',
        pagesCount: 4,
        limit: 100,
        selector: 'tr',
        parse: ($el, $) => {
            const titleEl = $el.find('a[href*="/pt/"]').first();
            if (titleEl.length === 0) return null;
            let title = titleEl.text().trim();
            title = title.replace(/\s+/g, ' ').replace(/\s*\(\d+\).*$/, '').replace(/\d+$/, '').trim();
            return {
                Title: title,
                Link: titleEl.attr('href'),
                Comments: $el.find('.comment').text().trim() || '0',
                Views: $el.find('.hit').text().trim() || '0',
                Time: $el.find('.regdate').text().trim() || $el.find('.date').text().trim() || ''
            };
        }
    },
    'Inven': {
        url: 'https://www.inven.co.kr/board/inven/2097?my=chuchu',
        urlTemplate: (page) => `https://www.inven.co.kr/board/inven/2097?my=chuchu&p=${page}`,
        domain: 'inven.co.kr',
        pagesCount: 4,
        limit: 100,
        selector: 'tr',
        parse: ($el, $) => {
            const titleEl = $el.find('a[href*="/board/webzine/2097/"]').first();
            if (titleEl.length === 0) return null;
            let title = titleEl.text().trim();
            title = title.replace(/\s+/g, ' ').replace(/^\[.*?\]/, '').trim();
            return {
                Title: title,
                Link: titleEl.attr('href'),
                Comments: $el.find('.commentNum').text().replace(/[\[\]]/g, '').trim() || '0',
                Views: $el.find('.hit').text().trim() || '0',
                Votes: $el.find('.recom').text().trim() || '0',
                Time: $el.find('.date').text().trim() || ''
            };
        }
    },
    'HumorUniv': {
        url: 'http://web.humoruniv.com/board/humor/list.html?table=pds&st=day',
        urlTemplate: (page) => `http://web.humoruniv.com/board/humor/list.html?table=pds&st=day&pg=${page - 1}`,
        domain: 'humoruniv.com',
        encoding: 'euc-kr',
        pagesCount: 5,
        limit: 100,
        selector: 'tr[id^="li_chk_pds-"]',
        parse: ($el, $) => {
            const titleEl = $el.find('.li_sbj a span[id^="title_chk_pds-"]');
            const linkEl = $el.find('.li_sbj a');
            const commentsEl = $el.find('.list_comment_num');
            
            return {
                Title: titleEl.text().trim(),
                Link: linkEl.attr('href'),
                Comments: commentsEl.text().replace(/\[|\]/g, '').trim() || '0',
                Views: $el.find('td.li_und').eq(0).text().replace(/,/g, '').trim() || '0',
                Votes: $el.find('td.li_und').eq(1).text().trim() || '0',
                Time: `${$el.find('.li_date .w_date').text().trim()} ${$el.find('.li_date .w_time').text().trim()}`.trim()
            };
        }
    },
    'TodayHumor': {
        url: 'http://www.todayhumor.co.kr/board/list.php?table=bestofbest',
        urlTemplate: (page) => `http://www.todayhumor.co.kr/board/list.php?table=bestofbest&page=${page}`,
        domain: 'todayhumor.co.kr',
        pagesCount: 4,
        limit: 100,
        selector: 'tr.view',
        parse: ($el, $) => {
            const titleEl = $el.find('td.subject a');
            return {
                Title: titleEl.text().trim(),
                Link: titleEl.attr('href'),
                Comments: $el.find('.list_memo_count_span').text().replace(/\[|\]/g, '').trim() || '0',
                Views: $el.find('td.hits').text().trim() || '0',
                Votes: $el.find('td.oknok').text().trim() || '0',
                Time: $el.find('td.date').text().trim() || ''
            };
        }
    },
    'Wygosu': {
        url: 'https://ygosu.com/board/real_article',
        urlTemplate: (page) => `https://ygosu.com/board/real_article?page=${page}`,
        domain: 'ygosu.com',
        pagesCount: 4,
        limit: 100,
        selector: 'tr',
        parse: ($el, $) => {
            const titleEl = $el.find('a[href*="/real_article/"]').first();
            if (titleEl.length === 0) return null;
            let title = titleEl.text().trim();
            title = title.replace(/\s+/g, ' ').replace(/\s*\(\d+\)$/, '').trim();
            return {
                Title: title,
                Link: titleEl.attr('href'),
                Comments: $el.find('td').eq(3).text().replace(/[^\d]/g, '') || '0',
                Views: $el.find('td').eq(2).text().trim() || '0',
                Votes: $el.find('td').eq(4).text().trim() || '0',
                Time: $el.find('td').eq(5).text().trim() || ''
            };
        }
    },
    '82Cook': {
        url: 'https://www.82cook.com/list.php?table=26',
        urlTemplate: (page) => `https://www.82cook.com/list.php?table=26&page=${page}`,
        domain: '82cook.com',
        pagesCount: 4,
        limit: 100,
        headers: {
            'User-Agent': PC_UA,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
            'Accept-Language': 'ko-KR,ko;q=0.9',
            'Referer': 'https://www.82cook.com/',
            'Connection': 'keep-alive'
        },
        selector: 'tr',
        parse: ($el, $) => {
            const titleEl = $el.find('td.title a').first();
            if (titleEl.length === 0) return null;
            let title = titleEl.text().trim();
            return {
                Title: title,
                Link: titleEl.attr('href'),
                Comments: $el.find('td.title .comment').text().replace(/[\[\]]/g, '').trim() || '0',
                Views: $el.find('td.hit').text().trim() || '0',
                Time: $el.find('td.date').text().trim() || ''
            };
        }
    },
    'Etoland': {
        url: 'https://etoland.co.kr/hit/list',
        urlTemplate: (page) => `https://etoland.co.kr/hit/list?page=${page}`,
        domain: 'etoland.co.kr',
        pagesCount: 4,
        limit: 100,
        selector: 'a',
        parse: ($el, $) => {
            const href = $el.attr('href') || '';
            const text = $el.text().replace(/\s+/g, ' ').trim();
            if (!href.match(/\/hit\/[a-zA-Z0-9_]+\/view\//)) return null;
            
            let title = text.replace(/\{var.*\}/g, '').replace(/\{.*\}/g, '').trim();
            const commMatch = title.match(/\((\d+)\)/);
            const comments = commMatch ? commMatch[1] : '0';
            title = title.replace(/\s*\(\d+\).*$/, '').trim();
            
            const parts = text.split('|');
            let views = '0';
            let votes = '0';
            parts.forEach(p => {
                if (p.includes('조회')) views = p.replace(/[^\d]/g, '').trim();
                if (p.includes('추천')) votes = p.replace(/[^\d]/g, '').trim();
            });

            return {
                Title: title,
                Link: href,
                Comments: comments,
                Views: views,
                Votes: votes,
                Time: ''
            };
        }
    },
    'Reddit': {
        url: 'https://www.reddit.com/r/korea/hot.json?limit=100',
        domain: 'reddit.com',
        isJson: true,
        limit: 100,
        parseJson: (data) => {
            if (!data || !data.data || !data.data.children) return [];
            return data.data.children.map(child => ({
                Title: child.data.title,
                Link: 'https://www.reddit.com' + child.data.permalink,
                Comments: String(child.data.num_comments || 0),
                Votes: String(child.data.score || 0),
                Time: new Date(child.data.created_utc * 1000).toISOString().split('T')[0]
            }));
        }
    }
};

async function scrape() {
    console.log('Scraping started...');
    const results = { lastUpdated: new Date().toISOString() };

    for (const [name, cfg] of Object.entries(CONFIG)) {
        try {
            console.log(`Scraping ${name}...`);
            const targetLimit = cfg.limit || 100;
            
            // 1. Reddit JSON 처리
            if (cfg.isJson) {
                const response = await axios.get(cfg.url, { 
                    headers: { 
                        'User-Agent': PC_UA,
                        'Accept': 'application/json'
                    } 
                });
                results[name] = cfg.parseJson(response.data).slice(0, targetLimit);
                console.log(`  Scraped ${results[name].length} posts from ${name}`);
                continue;
            }

            // 2. 일반 HTML 수집 처리
            let cookies = '';
            const activeHeaders = cfg.headers || DEFAULT_HEADERS;

            if (name === 'FM Korea') {
                try {
                    // 동일 세션 유지를 위해 메인 페이지 접속
                    const mainRes = await axios.get('https://www.fmkorea.com/', { 
                        headers: activeHeaders,
                        timeout: 5000 
                    });
                    const setCookies = mainRes.headers['set-cookie'] || [];
                    cookies = setCookies.map(c => c.split(';')[0]).join('; ');
                } catch (e) {
                    console.log(`  [FM Korea Cookies Info] ${e.message}`);
                }
            }

            const posts = [];
            const pagesCount = cfg.pagesCount || 1;

            for (let page = 1; page <= pagesCount; page++) {
                if (posts.length >= targetLimit) break;

                const pageUrl = cfg.urlTemplate ? cfg.urlTemplate(page) : cfg.url;
                let htmlData;
                
                const requestConfig = {
                    headers: {
                        ...activeHeaders,
                        'Cookie': cookies
                    },
                    httpsAgent: httpsAgent, // rejectUnauthorized 설정
                    timeout: 8000
                };

                if (cfg.encoding === 'euc-kr') {
                    requestConfig.responseType = 'arraybuffer';
                    const response = await axios.get(pageUrl, requestConfig);
                    htmlData = iconv.decode(Buffer.from(response.data), 'euc-kr');
                } else {
                    const response = await axios.get(pageUrl, requestConfig);
                    htmlData = response.data;
                }

                const $ = cheerio.load(htmlData);
                $(cfg.selector).each((i, el) => {
                    if (posts.length < targetLimit) {
                        const post = cfg.parse($(el), $);
                        if (post && post.Title) {
                            // 상대 경로 -> 절대 경로 보정
                            if (post.Link && !post.Link.startsWith('http')) {
                                try {
                                    post.Link = new URL(post.Link, pageUrl).href;
                                } catch(e) {}
                            }
                            // domain 강제 통일 보정 (서브도메인 Ruliweb 등 처리)
                            if (cfg.domain && post.Link) {
                                try {
                                    const urlObj = new URL(post.Link);
                                    if (cfg.domain === 'bbs.ruliweb.com') {
                                        urlObj.hostname = 'bbs.ruliweb.com';
                                    } else if (!urlObj.hostname.includes(cfg.domain)) {
                                        urlObj.hostname = cfg.domain;
                                    }
                                    post.Link = urlObj.href;
                                } catch(e) {}
                            }
                            posts.push(post);
                        }
                    }
                });
            }
            results[name] = posts;
            console.log(`  Scraped ${posts.length} posts from ${name}`);
        } catch (error) {
            console.error(`Failed to scrape ${name}:`, error.message);
        }
    }

    fs.writeFileSync(DATA_FILE, JSON.stringify(results, null, 2));
    console.log('Update Complete.');
}

scrape();

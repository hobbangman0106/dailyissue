const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const iconv = require('iconv-lite');

const DATA_FILE = path.join(__dirname, 'data.json');

const CONFIG = {
    'FM Korea': {
        url: 'https://www.fmkorea.com/best',
        domain: 'fmkorea.com',
        selector: '.bd_lst.li_ca tr:not(.notice)',
        parse: ($el, $) => {
            const titleEl = $el.find('.title a');
            return {
                Title: titleEl.text().replace(/\[\d+\]$/, '').trim(),
                Link: titleEl.attr('href'),
                Comments: $el.find('.replyNum').text().replace(/\[|\]/g, '') || '0',
                Votes: $el.find('.vst').text().trim(),
                Time: $el.find('.regdate').text().trim()
            };
        }
    },
    'Ruliweb': {
        url: 'https://bbs.ruliweb.com/best',
        urlTemplate: (page) => `https://bbs.ruliweb.com/best?page=${page}`,
        domain: 'ruliweb.com',
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
                Views: $el.find('td.hit').text().trim(),
                Votes: $el.find('td.recomd').text().trim(),
                Time: $el.find('td.time').text().trim()
            };
        }
    },
    'Theqoo': {
        url: 'https://theqoo.net/hot',
        domain: 'theqoo.net',
        selector: 'tbody tr:not(.notice)',
        parse: ($el, $) => {
            const titleEl = $el.find('.title a').first(); // first()로 변경하여 제목 링크 추출 시도
            return {
                Title: titleEl.text().trim(),
                Link: titleEl.attr('href'),
                Comments: $el.find('.reply').text().trim() || '0',
                Views: $el.find('.views').text().trim(),
                Time: $el.find('.time').text().trim()
            };
        }
    },
    'Bobae Dream': {
        url: 'https://www.bobaedream.co.kr/list?code=best',
        domain: 'bobaedream.co.kr',
        selector: '.tr_list',
        parse: ($el, $) => {
            const titleEl = $el.find('.pl14 a');
            return {
                Title: titleEl.text().trim(),
                Link: titleEl.attr('href'),
                Comments: $el.find('.comment').text().trim() || '0',
                Votes: $el.find('.recomm').text().trim(),
                Time: $el.find('.date').text().trim()
            };
        }
    },
    'Clien': {
        url: 'https://www.clien.net/service/board/park?sk=title&sv=%EB%B2%A0%EC%8A%A4%ED%8A%B8',
        domain: 'clien.net',
        selector: '.list_item',
        parse: ($el, $) => {
            const titleEl = $el.find('.list_subject span').first();
            return {
                Title: titleEl.text().trim(),
                Link: $el.find('.list_subject').attr('href'),
                Comments: $el.find('.r_count').text().trim() || '0',
                Time: $el.find('.timestamp').text().trim()
            };
        }
    },
    'DC Inside': {
        url: 'https://www.dcinside.com/',
        domain: 'dcinside.com',
        selector: '.box_best .list_best li', // 임시 선택자
        parse: ($el, $) => {
            const titleEl = $el.find('a');
            return {
                Title: titleEl.text().trim(),
                Link: titleEl.attr('href'),
                Time: new Date().toISOString().split('T')[0] // 시간 정보가 없을 경우 오늘 날짜
            };
        }
    },
    'Inven': {
        url: 'https://www.inven.co.kr/webzine/news/',
        domain: 'inven.co.kr',
        selector: '.newsList .item', // 임시 선택자
        parse: ($el, $) => {
            const titleEl = $el.find('.title a');
            return {
                Title: titleEl.text().trim(),
                Link: titleEl.attr('href'),
                Time: $el.find('.date').text().trim()
            };
        }
    },
    'Instiz': {
        url: 'https://www.instiz.net/',
        domain: 'instiz.net',
        selector: '.list_item', // 임시 선택자
        parse: ($el, $) => {
            const titleEl = $el.find('.title a');
            return {
                Title: titleEl.text().trim(),
                Link: titleEl.attr('href'),
                Time: $el.find('.date').text().trim()
            };
        }
    },
    'Reddit': {
        url: 'https://www.reddit.com/r/korea/hot.json?limit=30',
        domain: 'reddit.com',
        isJson: true,
        parseJson: (data) => {
            return data.data.children.map(child => ({
                Title: child.data.title,
                Link: 'https://www.reddit.com' + child.data.permalink,
                Comments: String(child.data.num_comments),
                Votes: String(child.data.score),
                Time: new Date(child.data.created_utc * 1000).toISOString().split('T')[0]
            }));
        }
    },
    'HumorUniv': {
        url: 'http://web.humoruniv.com/board/humor/list.html?table=pds&st=day',
        domain: 'humoruniv.com',
        encoding: 'euc-kr',
        selector: 'tr[id^="li_chk_pds-"]',
        parse: ($el, $) => {
            const titleEl = $el.find('.li_sbj a span[id^="title_chk_pds-"]');
            const linkEl = $el.find('.li_sbj a');
            const commentsEl = $el.find('.list_comment_num');
            
            return {
                Title: titleEl.text().trim(),
                Link: linkEl.attr('href'),
                Comments: commentsEl.text().replace(/\[|\]/g, '').trim() || '0',
                Views: $el.find('td.li_und').eq(0).text().replace(/,/g, '').trim(),
                Votes: $el.find('td.li_und').eq(1).text().trim(),
                Time: `${$el.find('.li_date .w_date').text().trim()} ${$el.find('.li_date .w_time').text().trim()}`.trim()
            };
        }
    },
    'TodayHumor': {
        url: 'http://www.todayhumor.co.kr/board/list.php?table=bestofbest',
        domain: 'todayhumor.co.kr',
        selector: 'tr.view',
        parse: ($el, $) => {
            const titleEl = $el.find('td.subject a');
            return {
                Title: titleEl.text().trim(),
                Link: titleEl.attr('href'),
                Comments: $el.find('.list_memo_count_span').text().replace(/\[|\]/g, '').trim() || '0',
                Views: $el.find('td.hits').text().trim(),
                Votes: $el.find('td.oknok').text().trim(),
                Time: $el.find('td.date').text().trim()
            };
        }
    }
};

async function scrape() {
    console.log('Scraping started...');
    const results = { lastUpdated: new Date().toISOString() };

    for (const [name, cfg] of Object.entries(CONFIG)) {
        try {
            console.log(`Scraping ${name}...`);
            
            if (cfg.isJson) {
                const response = await axios.get(cfg.url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
                results[name] = cfg.parseJson(response.data).slice(0, cfg.limit || 30);
                continue;
            }

            const posts = [];
            const pagesCount = cfg.pagesCount || 1;
            const targetLimit = cfg.limit || 30;

            for (let page = 1; page <= pagesCount; page++) {
                if (posts.length >= targetLimit) break;

                const pageUrl = cfg.urlTemplate ? cfg.urlTemplate(page) : cfg.url;
                let htmlData;
                
                if (cfg.encoding === 'euc-kr') {
                    const response = await axios.get(pageUrl, { 
                        responseType: 'arraybuffer',
                        headers: { 
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' 
                        } 
                    });
                    htmlData = iconv.decode(Buffer.from(response.data), 'euc-kr');
                } else {
                    const response = await axios.get(pageUrl, { 
                        headers: { 
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' 
                        } 
                    });
                    htmlData = response.data;
                }

                const $ = cheerio.load(htmlData);
                $(cfg.selector).each((i, el) => {
                    if (posts.length < targetLimit) {
                        const post = cfg.parse($(el), $);
                        if (post && post.Title) {
                            if (post.Link && !post.Link.startsWith('http')) {
                                try {
                                    post.Link = new URL(post.Link, pageUrl).href;
                                } catch(e) {}
                            }
                            if (cfg.domain && post.Link) {
                                try {
                                    const url = new URL(post.Link);
                                    url.hostname = cfg.domain;
                                    post.Link = url.href;
                                } catch(e) {}
                            }
                            posts.push(post);
                        }
                    }
                });
            }
            results[name] = posts;
        } catch (error) {
            console.error(`Failed to scrape ${name}:`, error.message);
        }
    }

    fs.writeFileSync(DATA_FILE, JSON.stringify(results, null, 2));
    console.log('Update Complete.');
}

scrape();

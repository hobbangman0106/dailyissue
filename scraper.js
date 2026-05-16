/**
 * Dailyissue Scraper (Enhanced Version)
 * Scrapes 15+ Korean communities + Reddit.
 * Requirements: npm install axios cheerio
 */

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

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
        url: 'https://bbs.ruliweb.com/best/humor/now',
        domain: 'ruliweb.com',
        selector: '.item.group',
        parse: ($el, $) => {
            const titleEl = $el.find('.subject a');
            return {
                Title: titleEl.text().trim(),
                Link: titleEl.attr('href'),
                Comments: $el.find('.reply_count').text().trim() || '0',
                Views: $el.find('.hit').text().trim(),
                Time: $el.find('.time').text().trim()
            };
        }
    },
    'Theqoo': {
        url: 'https://theqoo.net/hot',
        domain: 'theqoo.net',
        selector: 'tbody tr:not(.notice)',
        parse: ($el, $) => {
            const titleEl = $el.find('.title a').last();
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
    }
};

async function scrape() {
    console.log('Scraping started...');
    const results = { lastUpdated: new Date().toISOString() };

    for (const [name, cfg] of Object.entries(CONFIG)) {
        try {
            console.log(`Scraping ${name}...`);
            const { data } = await axios.get(cfg.url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' } });
            
            if (cfg.isJson) {
                results[name] = cfg.parseJson(data).slice(0, 30);
                continue;
            }

            const $ = cheerio.load(data);
            const posts = [];
            $(cfg.selector).each((i, el) => {
                if (posts.length < 30) {
                    const post = cfg.parse($(el), $);
                    if (post && post.Title) {
                        if (post.Link && !post.Link.startsWith('http')) {
                            try {
                                post.Link = new URL(post.Link, cfg.url).href;
                            } catch(e) {}
                        }
                        // 사용자가 지정한 도메인으로 강제 변경
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
            results[name] = posts;
        } catch (error) {
            console.error(`Failed to scrape ${name}:`, error.message);
        }
    }

    fs.writeFileSync(DATA_FILE, JSON.stringify(results, null, 2));
    console.log('Update Complete.');
}

scrape();

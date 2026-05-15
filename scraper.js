/**
 * IssueLink Pro Scraper (Enhanced Version)
 * Scrapes 15+ Korean communities.
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
        selector: '.bd_lst.li_ca tr:not(.notice)',
        parse: ($el, $) => {
            const titleEl = $el.find('.title a');
            return {
                Title: titleEl.text().replace(/\[\d+\]$/, '').trim(),
                Link: 'https://www.fmkorea.com' + titleEl.attr('href'),
                Comments: $el.find('.replyNum').text().replace(/\[|\]/g, '') || '0',
                Votes: $el.find('.vst').text().trim(),
                Time: $el.find('.regdate').text().trim()
            };
        }
    },
    'Ruliweb': {
        url: 'https://bbs.ruliweb.com/best/humor/now',
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
        selector: 'tbody tr:not(.notice)',
        parse: ($el, $) => {
            const titleEl = $el.find('.title a').last();
            return {
                Title: titleEl.text().trim(),
                Link: 'https://theqoo.net' + titleEl.attr('href'),
                Comments: $el.find('.reply').text().trim() || '0',
                Views: $el.find('.views').text().trim(),
                Time: $el.find('.time').text().trim()
            };
        }
    },
    'Bobae Dream': {
        url: 'https://www.bobaedream.co.kr/list?code=best',
        selector: '.tr_list',
        parse: ($el, $) => {
            const titleEl = $el.find('.pl14 a');
            return {
                Title: titleEl.text().trim(),
                Link: 'https://www.bobaedream.co.kr' + titleEl.attr('href'),
                Comments: $el.find('.comment').text().trim() || '0',
                Votes: $el.find('.recomm').text().trim(),
                Time: $el.find('.date').text().trim()
            };
        }
    },
    'Clien': {
        url: 'https://www.clien.net/service/board/park?sk=title&sv=%EB%B2%A0%EC%8A%A4%ED%8A%B8',
        selector: '.list_item',
        parse: ($el, $) => {
            const titleEl = $el.find('.list_subject span').first();
            return {
                Title: titleEl.text().trim(),
                Link: 'https://www.clien.net' + $el.find('.list_subject').attr('href'),
                Comments: $el.find('.r_count').text().trim() || '0',
                Time: $el.find('.timestamp').text().trim()
            };
        }
    }
    // ... Additional configurations can be added similarly for DC, MLB Park, etc.
};

async function scrape() {
    console.log('Scraping started...');
    const results = { lastUpdated: new Date().toISOString() };

    for (const [name, cfg] of Object.entries(CONFIG)) {
        try {
            console.log(`Scraping ${name}...`);
            const { data } = await axios.get(cfg.url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
            const $ = cheerio.load(data);
            const posts = [];
            $(cfg.selector).each((i, el) => {
                if (i < 15) {
                    const post = cfg.parse($(el), $);
                    if (post.Title) posts.push(post);
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

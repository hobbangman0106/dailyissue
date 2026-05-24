const axios = require('axios');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');

const UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1';

async function testFMKoreaInstance() {
    console.log('--- Testing FM Korea with SAME AXIOS INSTANCE ---');
    try {
        const instance = axios.create({
            headers: {
                'User-Agent': UA,
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
                'Accept-Encoding': 'gzip, deflate, br'
            },
            timeout: 8000
        });

        console.log('  Hitting main page...');
        const mainRes = await instance.get('https://www.fmkorea.com/');
        console.log(`  Main Success! Set-Cookie: ${mainRes.headers['set-cookie'] ? 'Yes' : 'No'}`);

        console.log('  Hitting best page...');
        const bestRes = await instance.get('https://www.fmkorea.com/best');
        console.log(`  Best Success! Status: ${bestRes.status}. Length: ${bestRes.data.length}`);
        
        const $ = cheerio.load(bestRes.data);
        const rows = $('.bd_lst.li_ca tr:not(.notice)');
        console.log(`  FM Korea rows: ${rows.length}`);
        rows.slice(0, 3).each((i, el) => {
            const a = $(el).find('.title a');
            console.log(`    [${i+1}] Title="${a.text().trim()}" Link="${a.attr('href')}"`);
        });
    } catch (e) {
        console.log(`  FM Korea Instance Failed: ${e.message}`);
    }
}

async function test82CookReferer() {
    console.log('\n--- Testing 82Cook with Referer and PC UA ---');
    try {
        const url = 'https://www.82cook.com/list.php?table=26';
        const res = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                'Accept-Language': 'ko-KR,ko;q=0.9',
                'Referer': 'https://www.82cook.com/',
                'Connection': 'keep-alive'
            },
            timeout: 5000
        });
        console.log(`  82Cook Success! Status: ${res.status}. Length: ${res.data.length}`);
        const $ = cheerio.load(res.data);
        // 82쿡 리스트 분석
        let count = 0;
        $('tr').each((i, el) => {
            const a = $(el).find('td.title a').first();
            if (a.length > 0) {
                if (count++ < 3) {
                    console.log(`    Row ${count}: Title="${a.text().trim()}" Link="${a.attr('href')}"`);
                }
            }
        });
    } catch (e) {
        console.log(`  82Cook Failed: ${e.message}`);
    }
}

async function testPpomppuHeaders() {
    console.log('\n--- Testing Ppomppu with Full Headers ---');
    try {
        const url = 'https://www.ppomppu.co.kr/hot.php';
        const res = await axios.get(url, {
            responseType: 'arraybuffer',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                'Accept-Language': 'ko-KR,ko;q=0.9',
                'Referer': 'https://www.ppomppu.co.kr/',
                'Connection': 'keep-alive'
            },
            timeout: 5000
        });
        const html = iconv.decode(Buffer.from(res.data), 'euc-kr');
        const $ = cheerio.load(html);
        console.log(`  Ppomppu Success! Length: ${html.length}`);
        
        let count = 0;
        $('tr').each((i, el) => {
            // zboard/view.php 를 포함하는 링크 탐색
            const a = $(el).find('a[href*="view.php"]').first();
            if (a.length > 0 && a.text().trim().length > 3) {
                if (count++ < 3) {
                    console.log(`    Row ${count}: Title="${a.text().trim().replace(/\s+/g, ' ')}" | Link="${a.attr('href')}"`);
                }
            }
        });
    } catch (e) {
        console.log(`  Ppomppu headers Failed: ${e.message}`);
    }
}

async function run() {
    await testFMKoreaInstance();
    await test82CookReferer();
    await testPpomppuHeaders();
}

run();

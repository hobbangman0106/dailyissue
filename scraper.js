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
const CATEGORIES = ['전체', '경제', '사회', '정치', '생활/건강', '세계', 'IT/과학', '연예', '스포츠', '칼럼'];

const TASKS = [
    // --- 정치 ---
    { cat: '정치', portal: '네이버', url: 'https://news.naver.com/main/ranking/popularDay.naver?rankingType=age&subType=100' },
    { cat: '정치', portal: '다음', url: 'https://news.daum.net/politics' },
    { cat: '정치', portal: 'Google News', url: 'https://news.google.com/rss/headlines/section/topic/POLITICS?hl=ko&gl=KR&ceid=KR:ko', isXml: true },

    // --- 경제 (투자 정보 집중 배치: 부동산, 증권, 채권, 금, 석유, 비트코인, 기업 실적 및 전망 등) ---
    { cat: '경제', portal: '네이버', url: 'https://finance.naver.com/news/news_list.naver?mode=RANK' },
    { cat: '경제', portal: '다음', url: 'https://news.daum.net/economy' }, // 다음 경제 기사 추가 복구
    { cat: '경제', portal: 'Google News', url: 'https://news.google.com/rss/search?q=%EB%B6%80%EB%8F%99%EC%82%B0+OR+%EC%95%84%ED%8C%8C%ED%8A%B8+OR+%EC%A3%BC%ED%83%9D&hl=ko&gl=KR&ceid=KR:ko', isXml: true }, // 부동산
    { cat: '경제', portal: 'Google News', url: 'https://news.google.com/rss/search?q=%EC%A3%BC%EC%8B%9D+OR+%EC%A6%9D%EA%B6%8C+OR+%EC%B1%84%EA%B6%8C+OR+%ED%8E%80%EB%93%9C+OR+%EC%84%A0%EB%AC%BC%EA%B1%B0%EB%9E%98&hl=ko&gl=KR&ceid=KR:ko', isXml: true }, // 주식/채권/선물/펀드
    { cat: '경제', portal: 'Google News', url: 'https://news.google.com/rss/search?q=%ED%99%98%EC%9C%A8+OR+%EA%B8%88%EB%A6%AC+OR+%EC%98%88%EC%A0%81%EA%B8%88+OR+%EA%B8%88%EC%9C%B5%EC%83%81%ED%92%88&hl=ko&gl=KR&ceid=KR:ko', isXml: true }, // 환율/금리/예적금/금융상품
    { cat: '경제', portal: 'Google News', url: 'https://news.google.com/rss/search?q=%EA%B8%88%EA%B0%92+OR+%EC%85%A5%EC%9C%A0+OR+%EC%9C%A0%EA%B0%80+OR+%EC%9B%90%EC%9E%90%EC%9E%AC&hl=ko&gl=KR&ceid=KR:ko', isXml: true }, // 금/석유/원자재
    { cat: '경제', portal: 'Google News', url: 'https://news.google.com/rss/search?q=%EB%B9%84%ED%8A%B8%EC%BD%94%EC%9D%B8+OR+%EA%B0%80%EC%83%81%EC%9E%90%EC%82%B0+OR+%EC%95%94%ED%98%B8%ED%99%94%ED%8F%90&hl=ko&gl=KR&ceid=KR:ko', isXml: true }, // 비트코인/가상자산
    { cat: '경제', portal: 'Google News', url: 'https://news.google.com/rss/search?q=%EA%B8%B0%EC%97%85%EC%8B%A4%EC%A0%81+OR+%EC%98%81%EC%97%85%EC%9D%B4%EC%9D%B5+OR+%EA%B8%B0%EC%97%85%EC%A0%84%EB%A7%9D&hl=ko&gl=KR&ceid=KR:ko', isXml: true }, // 기업 실적 및 전망

    // --- 사회 (사건사고, 사회 일반) ---
    { cat: '사회', portal: '네이버', url: 'https://news.naver.com/main/ranking/popularDay.naver?rankingType=age&subType=102' }, // 사회 랭킹
    { cat: '사회', portal: '다음', url: 'https://news.daum.net/society' }, // 사회 섹션
    { cat: '사회', portal: 'Google News', url: 'https://news.google.com/rss/search?q=%EC%82%AC%EA%B1%B4%EC%82%AC%EA%B3%A0+OR+%EC%8B%9C%EC%82%AC%EC%83%81%EC%8B%9D&hl=ko&gl=KR&ceid=KR:ko', isXml: true }, // 사건사고/시사상식

    // --- 생활/건강 (문화, 건강, 웰빙 정보 특화) ---
    { cat: '생활/건강', portal: '네이버', url: 'https://news.naver.com/main/ranking/popularDay.naver?rankingType=age&subType=103' }, // 생활/문화 랭킹
    { cat: '생활/건강', portal: '다음', url: 'https://news.daum.net/culture' }, // 문화/생활
    { cat: '생활/건강', portal: 'Google News', url: 'https://news.google.com/rss/headlines/section/topic/HEALTH?hl=ko&gl=KR&ceid=KR:ko', isXml: true },
    { cat: '생활/건강', portal: 'Yahoo US', url: 'https://news.google.com/rss/search?q=site:news.yahoo.com+OR+site:yahoo.com+health+OR+lifestyle&hl=en-US&gl=US&ceid=US:en', isXml: true }, // Yahoo US 우회 검색

    // --- 세계 ---
    { cat: '세계', portal: '네이버', url: 'https://news.naver.com/main/ranking/popularDay.naver?rankingType=age&subType=104' },
    { cat: '세계', portal: '다음', url: 'https://news.daum.net/foreign' },
    { cat: '세계', portal: 'Google News', url: 'https://news.google.com/rss/headlines/section/topic/WORLD?hl=ko&gl=KR&ceid=KR:ko', isXml: true },
    { cat: '세계', portal: 'Yahoo US', url: 'https://news.google.com/rss/search?q=site:news.yahoo.com+OR+site:yahoo.com+world&hl=en-US&gl=US&ceid=US:en', isXml: true }, // Yahoo US 우회 검색

    // --- IT/과학 ---
    { cat: 'IT/과학', portal: '네이버', url: 'https://news.naver.com/main/ranking/popularDay.naver?rankingType=age&subType=105' },
    { cat: 'IT/과학', portal: '다음', url: 'https://news.daum.net/digital' },
    { cat: 'IT/과학', portal: 'Google News', url: 'https://news.google.com/rss/headlines/section/topic/TECHNOLOGY?hl=ko&gl=KR&ceid=KR:ko', isXml: true },
    { cat: 'IT/과학', portal: 'Yahoo US', url: 'https://news.google.com/rss/search?q=site:finance.yahoo.com+OR+site:yahoo.com+technology+OR+science&hl=en-US&gl=US&ceid=US:en', isXml: true }, // Yahoo US 우회 검색

    // --- 연예 ---
    { cat: '연예', portal: '다음', url: 'https://entertain.daum.net/' },
    { cat: '연예', portal: 'Google News', url: 'https://news.google.com/rss/headlines/section/topic/ENTERTAINMENT?hl=ko&gl=KR&ceid=KR:ko', isXml: true },
    { cat: '연예', portal: 'Yahoo US', url: 'https://news.google.com/rss/search?q=site:news.yahoo.com+OR+site:yahoo.com+entertainment+OR+celebrity&hl=en-US&gl=US&ceid=US:en', isXml: true }, // Yahoo US 우회 검색

    // --- 스포츠 ---
    { cat: '스포츠', portal: '다음', url: 'https://sports.daum.net/' },
    { cat: '스포츠', portal: 'Google News', url: 'https://news.google.com/rss/headlines/section/topic/SPORTS?hl=ko&gl=KR&ceid=KR:ko', isXml: true },
    { cat: '스포츠', portal: 'Yahoo US', url: 'https://news.google.com/rss/search?q=site:sports.yahoo.com+OR+site:yahoo.com+sports&hl=en-US&gl=US&ceid=US:en', isXml: true }, // Yahoo US 우회 검색

    // --- 칼럼 ---
    { cat: '칼럼', portal: '다음', url: 'https://news.daum.net/editorial' }, // 사설/칼럼
    { cat: '칼럼', portal: 'Google News', url: 'https://news.google.com/rss/search?q=%EC%82%AC%EC%85%8B+OR+%EC%B9%BC%EB%9F%BC+OR+%EB%A7%8C%ED%8F%89&hl=ko&gl=KR&ceid=KR:ko', isXml: true }
];

function parseNaver($, url) {
    const posts = [];
    if (url.includes('finance.naver.com')) {
        $('a[href*="news_read.naver"]').each((i, el) => {
            if (posts.length >= 40) return;
            const href = $(el).attr('href');
            const text = $(el).text().trim();
            if (href && text && text.length > 5) {
                // Parse office_id and article_id
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

// Sub-Category Classifier
function classifySubCategory(category, title) {
    const t = title.toLowerCase();
    
    if (category === '정치') {
        if (t.includes('대통령') || t.includes('윤석열') || t.includes('용산') || t.includes('대통령실') || t.includes('영부인') || t.includes('김건희') || t.includes('청와대')) return '대통령실';
        if (t.includes('국회') || t.includes('민주당') || t.includes('국민의힘') || t.includes('의원') || t.includes('대표') || t.includes('정당') || t.includes('총선') || t.includes('전당대회') || t.includes('특검')) return '국회/정당';
        if (t.includes('북한') || t.includes('김정은') || t.includes('미사일') || t.includes('도발') || t.includes('탈북')) return '북한';
        if (t.includes('외교') || t.includes('안보') || t.includes('동맹') || t.includes('정상회담') || t.includes('방미') || t.includes('방중') || t.includes('미·중') || t.includes('러시아') || t.includes('우크라이나')) return '외교/안보';
        return '정치 일반';
    }
    
    if (category === '경제') {
        if (t.includes('부동산') || t.includes('아파트') || t.includes('분양') || t.includes('재건축') || t.includes('주택') || t.includes('공급') || t.includes('청약')) return '부동산';
        if (t.includes('주식') || t.includes('증권') || t.includes('코스피') || t.includes('코스닥') || t.includes('나스닥') || t.includes('채권') || t.includes('펀드') || t.includes('상장') || t.includes('주가') || t.includes('비트코인') || t.includes('가상자산') || t.includes('암호화폐')) return '금융/증권';
        if (t.includes('삼성') || t.includes('현대') || t.includes('lg') || t.includes('sk') || t.includes('실적') || t.includes('영업이익') || t.includes('매출') || t.includes('반도체') || t.includes('배터리') || t.includes('기업')) return '산업/기업';
        if (t.includes('취업') || t.includes('창업') || t.includes('일자리') || t.includes('고용') || t.includes('구직')) return '취업/창업';
        if (t.includes('미국') || t.includes('중국') || t.includes('유럽') || t.includes('글로벌') || t.includes('환율') || t.includes('달러') || t.includes('금리') || t.includes('유가') || t.includes('수출')) return '국제경제';
        if (t.includes('생활') || t.includes('가계') || t.includes('물가') || t.includes('소비') || t.includes('마트')) return '생활 경제';
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
        
        // Add Category and SubCategory tag to each post
        results[cat] = results[cat].map(p => {
            const sub = classifySubCategory(cat, p.Title);
            return { ...p, Category: cat, SubCategory: sub };
        });

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

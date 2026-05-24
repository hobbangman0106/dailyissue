// Initial fallback data for local file access (CORS bypass)
const FALLBACK_DATA = {
    "lastUpdated": "2026-05-15T20:45:00+09:00",
    "FM Korea": [{"Title": "3년 전에 은폐된 예비군 사망 사건", "Link": "https://www.fmkorea.com/9828247185", "Comments": "342", "Votes": "1520", "Time": "1시간 전"},{"Title": "연예계 최고의 미스테리.jpg", "Link": "https://www.fmkorea.com/9827587814", "Comments": "156", "Votes": "890", "Time": "2시간 전"}],
    "Ruliweb": [
        {"Title": "한국인은 20억 무슬림을 존중하지 않는다는 여자", "Link": "https://bbs.ruliweb.com/best/board/300143/read/66085521", "Views": "45200", "Comments": "234", "Time": "20:15"},
        {"Title": "자영업하려고 5년차 경찰공무원 때려친 유튜버", "Link": "https://bbs.ruliweb.com/best/board/300143/read/66084478", "Views": "31200", "Comments": "145", "Time": "19:30"},
        {"Title": "켄이치) 켄이치가 등신처럼 지면 생기는 일", "Link": "https://bbs.ruliweb.com/best/board/300143/read/66084479", "Views": "28100", "Comments": "89", "Time": "19:10"},
        {"Title": "사육난이도 극악이라는 어느 동물.jpg", "Link": "https://bbs.ruliweb.com/best/board/300143/read/66084480", "Views": "34200", "Comments": "112", "Time": "18:50"},
        {"Title": "디지몬) 레오몬 근황 ㄷㄷ", "Link": "https://bbs.ruliweb.com/best/board/300143/read/66084481", "Views": "19800", "Comments": "45", "Time": "18:40"},
        {"Title": "한국인에게 공포감을 느끼는 일본 트위터 유저들", "Link": "https://bbs.ruliweb.com/best/board/300143/read/66084482", "Views": "41200", "Comments": "167", "Time": "18:25"},
        {"Title": "결국 모기 활용법을 발명한 인간들.jpg", "Link": "https://bbs.ruliweb.com/best/board/300143/read/66084483", "Views": "29500", "Comments": "98", "Time": "18:10"},
        {"Title": "왕녀의 반란덕분에 3년간 면세를 받아낸 정치의 신", "Link": "https://bbs.ruliweb.com/best/board/300143/read/66084484", "Views": "32100", "Comments": "142", "Time": "17:55"},
        {"Title": "인도 육군 사단장, 추락한 헬기에서 셀카 찍은 사연", "Link": "https://bbs.ruliweb.com/best/board/300143/read/66084485", "Views": "21400", "Comments": "64", "Time": "17:40"},
        {"Title": "중국 붕괴론자들의 최근 근황", "Link": "https://bbs.ruliweb.com/best/board/300143/read/66084486", "Views": "38900", "Comments": "120", "Time": "17:20"},
        {"Title": "스마트폰 가격이 점점 비싸지는 핵심적인 이유", "Link": "https://bbs.ruliweb.com/best/board/300143/read/66084487", "Views": "18000", "Comments": "55", "Time": "17:00"},
        {"Title": "야겜 업계의 나쁜 문화와 폐단", "Link": "https://bbs.ruliweb.com/best/board/300143/read/66084488", "Views": "44200", "Comments": "188", "Time": "16:45"},
        {"Title": "현대차 vs BYD 캐삭빵 최종 결론.jpg", "Link": "https://bbs.ruliweb.com/best/board/300143/read/66084489", "Views": "51200", "Comments": "299", "Time": "16:30"},
        {"Title": "켄이치 작가가 독자에게 던진 엄청난 충격의 메시지", "Link": "https://bbs.ruliweb.com/best/board/300143/read/66084490", "Views": "27000", "Comments": "82", "Time": "16:15"},
        {"Title": "일본인들이 한국 와서 감동받고 우는 진짜 이유", "Link": "https://bbs.ruliweb.com/best/board/300143/read/66084491", "Views": "33400", "Comments": "105", "Time": "15:55"},
        {"Title": "불매운동의 아주 모범적이고 좋은 자세.jpg", "Link": "https://bbs.ruliweb.com/best/board/300143/read/66084492", "Views": "26000", "Comments": "77", "Time": "15:40"},
        {"Title": "최근 넷플릭스 흑백요리사 참가자 근황 ㄷㄷ", "Link": "https://bbs.ruliweb.com/best/board/300143/read/66084493", "Views": "48900", "Comments": "210", "Time": "15:20"},
        {"Title": "길고양이 키우다가 집안 파산할 뻔한 썰", "Link": "https://bbs.ruliweb.com/best/board/300143/read/66084494", "Views": "31500", "Comments": "130", "Time": "15:00"},
        {"Title": "한국 아파트 브랜드 선호도 최근 순위 리스트", "Link": "https://bbs.ruliweb.com/best/board/300143/read/66084495", "Views": "23000", "Comments": "94", "Time": "14:45"},
        {"Title": "전기차 충전 구역 불법 주차 참교육한 아파트 입대위", "Link": "https://bbs.ruliweb.com/best/board/300143/read/66084496", "Views": "39500", "Comments": "172", "Time": "14:30"},
        {"Title": "우주선 안에서 라면 먹으면 생기는 예상 밖의 일", "Link": "https://bbs.ruliweb.com/best/board/300143/read/66084497", "Views": "20500", "Comments": "62", "Time": "14:15"},
        {"Title": "최근 한국 편의점 두바이 초콜릿 열풍 근황.jpg", "Link": "https://bbs.ruliweb.com/best/board/300143/read/66084498", "Views": "42300", "Comments": "199", "Time": "13:55"},
        {"Title": "아마존 정글에서 생존한 아이들이 발견된 기적적인 순간", "Link": "https://bbs.ruliweb.com/best/board/300143/read/66084499", "Views": "30200", "Comments": "125", "Time": "13:30"},
        {"Title": "손흥민 최근 토트넘 홋스퍼 재계약 협상 분위기", "Link": "https://bbs.ruliweb.com/best/board/300143/read/66084500", "Views": "26400", "Comments": "86", "Time": "13:10"},
        {"Title": "세계에서 가장 외딴 섬에 거주하는 주민들의 삶의 기록", "Link": "https://bbs.ruliweb.com/best/board/300143/read/66084501", "Views": "19500", "Comments": "50", "Time": "12:50"}
    ],
    "Theqoo": [{"Title": "“쓰레기 줍기는 아동학대”라며 학교 고소...", "Link": "https://theqoo.net/hot/3231456789", "Views": "15600", "Comments": "432", "Time": "20:05"},{"Title": "뉴진스 카피 관련 민희진 인터뷰 내용", "Link": "https://theqoo.net/hot/3231467890", "Views": "89000", "Comments": "1200", "Time": "19:20"}],
    "Bobae Dream": [{"Title": "오늘 대구 찾은 이재명 대통령", "Link": "https://www.bobaedream.co.kr/view?code=best&No=712345", "Comments": "890", "Votes": "2300", "Time": "1시간 전"}],
    "DC Inside": [{"Title": "오늘자 실베 레전드 ㅋㅋㅋㅋ", "Link": "https://gall.dcinside.com/board/view/?id=dcbest&no=123456", "Comments": "567", "Time": "20:45"}],
    "Clien": [{"Title": "LCK DNS는 정말 못하는군요.", "Link": "https://www.clien.net/service/board/park/18745612", "Comments": "56", "Time": "20:40"}],
    "Ppomppu": [{"Title": "[알리] 꽁돈대첩 역대급 할인", "Link": "https://www.ppomppu.co.kr/zboard/view.php?id=ppomppu&no=123456", "Comments": "156", "Time": "20:10"}],
    "MLB Park": [{"Title": "오늘자 코스피 8000 돌파 ㄷㄷ", "Link": "https://mlbpark.donga.com/mp/b.php?b=bullpen&id=20260515001", "Views": "12000", "Time": "20:00"}],
    "HumorUniv": [{"Title": "아 진짜 좋은소식있음", "Link": "http://humoruniv.com/board/humor/read.html?table=pds&st=day&pg=0&number=1411274", "Comments": "103", "Views": "54222", "Votes": "1660", "Time": "12시간 전"},{"Title": "당연하지 게임 첫판부터 지게 만드는 법", "Link": "http://humoruniv.com/board/humor/read.html?table=pds&st=day&pg=0&number=1411265", "Comments": "39", "Views": "46573", "Votes": "804", "Time": "15시간 전"}],
    "TodayHumor": [{"Title": "스타벅스 냅킨에 그림그리는걸로 유명하던 작가 근황", "Link": "http://todayhumor.co.kr/board/view.php?table=bestofbest&no=482947&s_no=482947&page=1", "Comments": "2", "Views": "3995", "Votes": "93", "Time": "13시간 전"},{"Title": "스벅 골수들이라..", "Link": "http://todayhumor.co.kr/board/view.php?table=bestofbest&no=482946&s_no=482946&page=1", "Comments": "13", "Views": "3707", "Votes": "92", "Time": "16시간 전"}]
};

const COMMUNITY_COLORS = {
    "FM Korea": "#5d7ad3",
    "Ruliweb": "#0054a6",
    "Theqoo": "#3b4a5d",
    "Bobae Dream": "#0068b7",
    "Clien": "#3b3b5c",
    "Ppomppu": "#9e9e9e",
    "DC Inside": "#29b6f6",
    "MLB Park": "#ff6d00",
    "Instiz": "#00c73c",
    "Inven": "#8bc34a",
    "HumorUniv": "#e91e63",
    "TodayHumor": "#546e7a",
    "Wygosu": "#424242",
    "82Cook": "#2e7d32",
    "Etoland": "#4caf50"
};

document.addEventListener('DOMContentLoaded', () => {
    let allPosts = [];
    let currentCommunity = 'all';
    let searchQuery = '';
    let visibleCount = 10;

    const postsList = document.getElementById('posts-list');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const searchInput = document.getElementById('post-search');
    const lastUpdateText = document.getElementById('last-update-text');
    const syncIcon = document.getElementById('sync-icon');
    const updateTimer = document.getElementById('update-timer');

    // Initialize Lucide icons
    lucide.createIcons();

    // Fetch Data
    async function fetchData() {
        syncIcon.classList.add('spin-icon');
        try {
            const response = await fetch('data.json');
            if (!response.ok) throw new Error('CORS or Network Error');
            const data = await response.json();
            processData(data);
        } catch (error) {
            console.warn('Using fallback data due to local file restrictions (CORS).');
            const localFallback = {
                ...FALLBACK_DATA,
                lastUpdated: new Date().toISOString()
            };
            processData(localFallback);
        } finally {
            syncIcon.classList.remove('spin-icon');
        }
    }

    function parseTime(timeStr) {
        if (!timeStr) return 0;
        const now = new Date();
        
        if (timeStr.includes('분 전')) {
            const mins = parseInt(timeStr.replace(/[^0-9]/g, '')) || 0;
            return now.getTime() - mins * 60000;
        }
        if (timeStr.includes('시간 전')) {
            const hours = parseInt(timeStr.replace(/[^0-9]/g, '')) || 0;
            return now.getTime() - hours * 3600000;
        }
        if (/^\d{1,2}:\d{2}/.test(timeStr)) {
            const parts = timeStr.match(/(\d{1,2}):(\d{2})/);
            if (parts) {
                const date = new Date();
                date.setHours(parseInt(parts[1]), parseInt(parts[2]), 0, 0);
                if (date > now) date.setDate(date.getDate() - 1);
                return date.getTime();
            }
        }
        const d = new Date(timeStr.replace(/\./g, '-').replace(/\//g, '-'));
        if (!isNaN(d.getTime())) return d.getTime();
        
        return 0;
    }

    function processData(data) {
        allPosts = [];
        let activeCount = 0;
        
        Object.keys(data).forEach(key => {
            if (key !== 'lastUpdated') {
                const communityPosts = data[key].map(post => ({
                    ...post,
                    Community: key
                }));
                allPosts = [...allPosts, ...communityPosts];
                
                if (Array.isArray(data[key]) && data[key].length > 0) {
                    activeCount++;
                }
            }
        });

        // 시간순 정렬 (최신순)
        allPosts.sort((a, b) => parseTime(b.Time) - parseTime(a.Time));

        // Set last updated time
        if (data.lastUpdated) {
            const date = new Date(data.lastUpdated);
            lastUpdateText.textContent = `${date.getHours()}시 ${date.getMinutes()}분 갱신됨`;
        }

        // Update portal stats
        const activeCommunitiesEl = document.getElementById('stats-active-communities');
        const totalPostsEl = document.getElementById('stats-total-posts');
        if (activeCommunitiesEl) activeCommunitiesEl.textContent = `${activeCount}개`;
        if (totalPostsEl) totalPostsEl.textContent = `${allPosts.length}개`;

        renderPosts();
    }

    // Render Posts
    function renderPosts() {
        let filtered = allPosts;
        if (currentCommunity !== 'all') {
            filtered = filtered.filter(post => post.Community === currentCommunity);
        }

        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            filtered = filtered.filter(post => 
                post.Title.toLowerCase().includes(q) || 
                post.Community.toLowerCase().includes(q)
            );
        }

        if (filtered.length === 0) {
            postsList.innerHTML = `
                <div style="text-align:center; padding:60px 20px; color:var(--text-secondary);">
                    <i data-lucide="inbox" style="width:48px; height:48px; margin-bottom:16px; opacity:0.5;"></i>
                    <p>검색 결과가 없습니다.</p>
                </div>
            `;
            lucide.createIcons();
            return;
        }

        // Apply slice pagination for "더보기" (Show More)
        const displayed = filtered.slice(0, visibleCount);

        let postsHtml = displayed.map((post, index) => {
            const color = COMMUNITY_COLORS[post.Community] || 'var(--accent-color)';
            return `
                <a href="${post.Link}" target="_blank" class="post-card">
                    <div class="post-left-meta">
                        <span class="community-tag" style="background: ${color};">${post.Community.substring(0,2)}</span>
                        <div class="post-rank">${index + 1}</div>
                    </div>
                    <div class="post-main">
                        <div class="post-title">
                            ${post.Title}
                            <span class="comment-count">${post.Comments ? `[${post.Comments}]` : ''}</span>
                        </div>
                        <div class="post-bottom">
                            <span class="community-name" style="color: ${color}">${post.Community}</span>
                            <div class="post-stats">
                                ${post.Views ? `<span class="stat-item"><i data-lucide="eye"></i>${post.Views}</span>` : ''}
                                ${post.Votes ? `<span class="stat-item"><i data-lucide="thumbs-up"></i>${post.Votes}</span>` : ''}
                                <span class="post-time">${post.Time || ''}</span>
                            </div>
                        </div>
                    </div>
                </a>
            `;
        }).join('');

        // Append Show More button if there are more posts to display
        if (filtered.length > visibleCount) {
            postsHtml += `
                <button id="show-more-btn" class="show-more-btn">
                    <span>더 보기</span>
                    <i data-lucide="chevron-down"></i>
                </button>
            `;
        }

        postsList.innerHTML = postsHtml;

        // Bind click event to Show More button
        const showMoreBtn = document.getElementById('show-more-btn');
        if (showMoreBtn) {
            showMoreBtn.addEventListener('click', () => {
                visibleCount += 10;
                renderPosts();
            });
        }

        lucide.createIcons();
    }

    // Tab Event Listeners
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCommunity = btn.dataset.community;
            visibleCount = 10; // Reset pagination!
            
            // Update grid cell active class in portal view
            const cells = document.querySelectorAll('.grid-cell[data-community]');
            cells.forEach(c => {
                if (c.dataset.community === currentCommunity) {
                    c.classList.add('active');
                } else {
                    c.classList.remove('active');
                }
            });
            
            renderPosts();
            
            // Scroll tab into view if needed
            btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        });
    });

    // Search Event Listener
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        visibleCount = 10; // Reset pagination!
        renderPosts();
    });

    // Portal Layout Integrations
    const COMMUNITY_NAMES_MAP = {
        "FM Korea": "펨코",
        "Ruliweb": "루리웹",
        "Theqoo": "더쿠",
        "Bobae Dream": "보배",
        "Clien": "클리앙",
        "Ppomppu": "뽐뿌",
        "DC Inside": "디시",
        "MLB Park": "엠팍",
        "Instiz": "인티",
        "Inven": "인벤",
        "HumorUniv": "웃대",
        "TodayHumor": "오유",
        "Wygosu": "와고",
        "82Cook": "82쿡",
        "Etoland": "이토",
        "Reddit": "레딧"
    };

    function renderCommunityGrid() {
        const gridEl = document.getElementById('community-grid');
        if (!gridEl) return;

        let gridHtml = '';
        Object.keys(COMMUNITY_NAMES_MAP).forEach(key => {
            const shortName = COMMUNITY_NAMES_MAP[key];
            const color = COMMUNITY_COLORS[key] || 'var(--accent-color)';
            const initial = key.substring(0, 2);
            
            gridHtml += `
                <div class="grid-cell" data-community="${key}" id="grid-cell-${key.replace(/\s+/g, '')}">
                    <span class="grid-brand-icon" style="background: ${color};">${initial}</span>
                    <span class="grid-brand-name">${shortName}</span>
                </div>
            `;
        });

        // Add 2 mock slots for a clean 6x3 Naver-like Newsstand grid (total 18 slots)
        gridHtml += `
            <div class="grid-cell" style="cursor: default; background: #fafafa;">
                <span class="grid-brand-name" style="color: var(--text-secondary); font-size: 0.75rem; font-weight: 700;">Dailyissue</span>
                <span style="font-size: 0.65rem; color: #a1a1a1;">공식 서비스</span>
            </div>
            <div class="grid-cell" style="cursor: default; background: #fafafa;">
                <span class="grid-brand-name" style="color: var(--text-secondary); font-size: 0.75rem; font-weight: 700;">광고 제로</span>
                <span style="font-size: 0.65rem; color: #a1a1a1;">실시간 갱신</span>
            </div>
        `;

        gridEl.innerHTML = gridHtml;

        const cells = gridEl.querySelectorAll('.grid-cell[data-community]');
        cells.forEach(cell => {
            cell.addEventListener('click', () => {
                const targetCommunity = cell.dataset.community;
                
                cells.forEach(c => c.classList.remove('active'));
                
                const targetTab = Array.from(tabBtns).find(btn => btn.dataset.community === targetCommunity);
                if (targetTab) {
                    targetTab.click();
                    cell.classList.add('active');
                }
            });
        });
    }

    // Portal Google Search Logic
    let searchMode = 'local';
    const toggleLocal = document.getElementById('search-mode-local');
    const toggleGoogle = document.getElementById('search-mode-google');
    const portalSearchInput = document.getElementById('portal-search-input');
    const portalSearchSubmit = document.getElementById('portal-search-submit');

    if (toggleLocal && toggleGoogle && portalSearchInput) {
        toggleLocal.addEventListener('click', () => {
            searchMode = 'local';
            toggleLocal.classList.add('active');
            toggleGoogle.classList.remove('active');
            portalSearchInput.placeholder = 'Google 검색 또는 실시간 베스트 검색...';
        });

        toggleGoogle.addEventListener('click', () => {
            searchMode = 'google';
            toggleGoogle.classList.add('active');
            toggleLocal.classList.remove('active');
            portalSearchInput.placeholder = 'Google 검색...';
        });

        function performPortalSearch() {
            const query = portalSearchInput.value.trim();
            if (!query) return;
            if (searchMode === 'google') {
                window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
            } else {
                searchQuery = query;
                visibleCount = 10; // Reset pagination!
                if (searchInput) searchInput.value = query;
                renderPosts();
            }
        }

        portalSearchSubmit.addEventListener('click', performPortalSearch);
        portalSearchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                performPortalSearch();
            }
        });

        portalSearchInput.addEventListener('input', (e) => {
            if (searchMode === 'local') {
                searchQuery = e.target.value;
                visibleCount = 10; // Reset pagination!
                if (searchInput) searchInput.value = e.target.value;
                renderPosts();
            }
        });
    }

    // Sidebar clock updater
    function updateClock() {
        const clockEl = document.getElementById('portal-clock');
        if (!clockEl) return;
        const now = new Date();
        const hrs = String(now.getHours()).padStart(2, '0');
        const mins = String(now.getMinutes()).padStart(2, '0');
        const secs = String(now.getSeconds()).padStart(2, '0');
        clockEl.textContent = `${hrs}:${mins}:${secs}`;
    }

    // Initialize portal elements
    renderCommunityGrid();
    updateClock();
    setInterval(updateClock, 1000);

    // Initial Fetch
    fetchData();

    // Manual Refresh
    if (updateTimer) {
        updateTimer.addEventListener('click', fetchData);
    }

    // Auto Refresh every 1 hour (3600000 ms)
    setInterval(fetchData, 3600000);
});

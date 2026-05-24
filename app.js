// Initial fallback data for local file access (CORS bypass)
const FALLBACK_DATA = {
    "lastUpdated": "2026-05-15T20:45:00+09:00",
    "FM Korea": [{"Title": "3년 전에 은폐된 예비군 사망 사건", "Link": "https://www.fmkorea.com/9828247185", "Comments": "342", "Votes": "1520", "Time": "1시간 전"},{"Title": "연예계 최고의 미스테리.jpg", "Link": "https://www.fmkorea.com/9827587814", "Comments": "156", "Votes": "890", "Time": "2시간 전"}],
    "Ruliweb": [{"Title": "한국인은 20억 무슬림을 존중하지 않는다는 여자", "Link": "https://bbs.ruliweb.com/best/board/300143/read/66085521", "Views": "45200", "Comments": "234", "Time": "20:15"},{"Title": "자영업하려고 5년차 경찰공무원 때려친 유튜버", "Link": "https://bbs.ruliweb.com/best/board/300143/read/66084478", "Views": "31200", "Comments": "145", "Time": "19:30"}],
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
            processData(FALLBACK_DATA);
            // If fallback data is missing some communities the user added, we should at least show something.
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

        postsList.innerHTML = filtered.map((post, index) => {
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

        lucide.createIcons();
    }

    // Tab Event Listeners
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCommunity = btn.dataset.community;
            
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

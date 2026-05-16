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
    "MLB Park": [{"Title": "오늘자 코스피 8000 돌파 ㄷㄷ", "Link": "https://mlbpark.donga.com/mp/b.php?b=bullpen&id=20260515001", "Views": "12000", "Time": "20:00"}]
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

    function processData(data) {
        allPosts = [];
        Object.keys(data).forEach(key => {
            if (key !== 'lastUpdated') {
                const communityPosts = data[key].map(post => ({
                    ...post,
                    Community: key
                }));
                allPosts = [...allPosts, ...communityPosts];
            }
        });

        // Set last updated time
        if (data.lastUpdated) {
            const date = new Date(data.lastUpdated);
            lastUpdateText.textContent = `${date.getHours()}시 ${date.getMinutes()}분 갱신됨`;
        }

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

    // Initial Fetch
    fetchData();

    // Manual Refresh
    if (updateTimer) {
        updateTimer.addEventListener('click', fetchData);
    }

    // Auto Refresh every 1 hour (3600000 ms)
    setInterval(fetchData, 3600000);
});

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    const CATEGORIES = ['전체', '경제', '사회', '정치', '생활/건강', '세계', 'IT/과학', '연예', '스포츠', '칼럼'];
    const SUB_CATEGORIES = {
        '경제': ['최신뉴스', '생활 경제', '부동산', '금융/증권', '산업/기업', '취업/창업', '국제경제', '경제 일반'],
        '사회': ['최신뉴스', '사건/사고', '교육/학교', '교통/지역', '인권/복지', '여성/노동', '환경', '미디어', '종교', '인물', '사회 일반'],
        '정치': ['최신뉴스', '대통령실', '국회/정당', '북한', '외교/안보', '정치 일반'],
        '생활/건강': ['최신뉴스', '건강', '생활정보', '문화/예술', '여행/레저', '음식/맛집', '생활/건강 일반'],
        '세계': ['최신뉴스', '아시아/호주', '미국/중남미', '유럽', '중동/아프리카', '해외 화제', '세계 일반'],
        'IT/과학': ['최신뉴스', '과학', '디지털', '컴퓨터/인터넷', '뉴미디어/통신', '게임', 'IT/과학 일반'],
        '연예': ['최신뉴스', '스타/연예인', 'TV/방송', '영화', '음악', '연예 일반'],
        '스포츠': ['최신뉴스', '야구', '축구', '골프', '농구/배구', '일반 스포츠'],
        '칼럼': ['최신뉴스', '사설', '칼럼', '만평']
    };

    console.log("=== App v4.2.0 Loaded ===");
    console.log("Categories defined:", CATEGORIES);

    // Persistent category state across refreshes and back navigation
    let currentCategory = sessionStorage.getItem('active_category') || '전체';
    let currentSubCategory = sessionStorage.getItem('active_subcategory') || '최신뉴스';
    let data = window.LOCAL_DATA || {};

    const postsList = document.getElementById('posts-list');
    const tabsNav = document.getElementById('category-tabs');
    const subTabsNav = document.getElementById('subcategory-tabs');
    
    // Build Tabs
    if (tabsNav) {
        let tabsHtml = '';
        CATEGORIES.forEach(cat => {
            tabsHtml += `<button class="tab-btn ${cat === currentCategory ? 'active' : ''}" data-category="${cat}">${cat}</button>`;
        });
        tabsNav.innerHTML = tabsHtml;

        const tabBtns = tabsNav.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentCategory = btn.dataset.category;
                currentSubCategory = '최신뉴스'; // Reset to '최신뉴스' on main category change
                
                // Save to sessionStorage to persist across page refreshes
                sessionStorage.setItem('active_category', currentCategory);
                sessionStorage.setItem('active_subcategory', currentSubCategory);
                
                // Reset scroll position to top on category shift
                window.scrollTo({ top: 0, behavior: 'instant' });
                
                renderSubTabs();
                renderPosts();
            });
        });
    }

    function renderSubTabs() {
        if (!subTabsNav) return;
        const subCats = SUB_CATEGORIES[currentCategory];
        if (!subCats || subCats.length === 0) {
            subTabsNav.style.display = 'none';
            subTabsNav.innerHTML = '';
            return;
        }

        subTabsNav.style.display = 'flex';
        let html = '';
        subCats.forEach(sub => {
            html += `<button class="subcategory-tab ${sub === currentSubCategory ? 'active' : ''}" data-subcategory="${sub}">${sub}</button>`;
        });
        subTabsNav.innerHTML = html;

        const btns = subTabsNav.querySelectorAll('.subcategory-tab');
        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                btns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentSubCategory = btn.dataset.subcategory;
                sessionStorage.setItem('active_subcategory', currentSubCategory);
                
                // Reset scroll position to top on subcategory shift
                window.scrollTo({ top: 0, behavior: 'instant' });
                
                renderPosts();
            });
        });
    }

    async function fetchData() {
        try {
            const response = await fetch('data.json?t=' + new Date().getTime());
            if (response.ok) {
                const fetchedData = await response.json();
                if (Object.keys(fetchedData).length > 0) {
                    data = fetchedData;
                }
            }
        } catch (e) {
            console.error('Fetch failed, using local data', e);
        }
        renderSubTabs();
        renderPosts();
    }

    function renderPosts() {
        if (!postsList) return;
        
        let html = '';
        
        let displayPosts = data[currentCategory] || [];
        if (currentCategory !== '전체' && currentSubCategory !== '최신뉴스') {
            displayPosts = displayPosts.filter(p => p.SubCategory === currentSubCategory);
        }

        if (displayPosts.length === 0) {
            postsList.innerHTML = html + '<div class="empty-state">해당 카테고리에 뉴스가 없습니다.</div>';
            return;
        }

        const COMMUNITY_COLORS = {
            "네이버": "#03c75a",
            "다음": "#ffcc00",
            "Google News": "#ea4335",
            "Yahoo US": "#410093",
            "default": "#5c7cfa"
        };
        
        const visitedLinks = JSON.parse(localStorage.getItem('visited_news') || '[]');

        displayPosts.forEach((post, index) => {
            const portalColor = COMMUNITY_COLORS[post.Portal] || COMMUNITY_COLORS['default'];
            const isVisited = visitedLinks.includes(post.Link) ? 'visited-post' : '';
            html += `
                <a href="${post.Link}" class="post-list-item ${isVisited}" onclick="markAsVisited(this, '${post.Link}')">
                    <div class="item-meta">
                        <span class="item-badge" style="background-color: ${portalColor};">${post.Portal}</span>
                        <span class="cat-badge">${post.Category}</span>
                        ${post.SubCategory ? `<span class="cat-badge" style="background: rgba(0,0,0,0.02);">${post.SubCategory}</span>` : ''}
                    </div>
                    <h3 class="item-title">${post.Title}</h3>
                </a>
            `;

            // Insert Ad every 20 posts
            if ((index + 1) % 20 === 0) {
                const screenWidth = window.innerWidth;
                const adWidth = screenWidth < 768 ? Math.min(screenWidth - 32, 680) : 680;
                html += `
                <div class="post-list-item ad-container" style="display: flex; justify-content: center; padding: 20px 0; overflow: hidden; width: 100%;">
                    <iframe src="https://ads-partners.coupang.com/widgets.html?id=992250&template=carousel&trackingCode=AF5661883&subId=&width=${adWidth}&height=140" width="${adWidth}" height="140" frameborder="0" scrolling="no" referrerpolicy="unsafe-url" browsingtopics style="max-width: 100%; border: none;"></iframe>
                </div>
                `;
            }
        });
        
        postsList.innerHTML = html;
        
        // Fade in animation for items
        const items = postsList.querySelectorAll('.post-list-item');
        items.forEach((item, i) => {
            item.style.animationDelay = `${i * 0.03}s`;
            item.classList.add('fade-in-up');
        });

        // Initialize Lucide icons if present in the dashboard
        if (window.lucide) {
            window.lucide.createIcons();
        }

        // Restore scroll position if back navigation and data exists
        const savedScrollY = sessionStorage.getItem('prev_scroll_y');
        if (savedScrollY !== null) {
            setTimeout(() => {
                window.scrollTo({
                    top: parseInt(savedScrollY, 10),
                    behavior: 'instant'
                });
                sessionStorage.removeItem('prev_scroll_y');
            }, 80);
        }
    }

    // Global function to mark post as visited
    window.markAsVisited = function(element, link) {
        element.classList.add('visited-post');
        
        // Save scroll position and active category state
        sessionStorage.setItem('prev_scroll_y', window.scrollY);
        sessionStorage.setItem('prev_category', currentCategory);

        let visitedLinks = JSON.parse(localStorage.getItem('visited_news') || '[]');
        if (!visitedLinks.includes(link)) {
            visitedLinks.push(link);
            if (visitedLinks.length > 500) visitedLinks.shift(); // Keep only last 500
            localStorage.setItem('visited_news', JSON.stringify(visitedLinks));
        }
    };

    fetchData();
});

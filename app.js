document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    const CATEGORIES = ['전체', '경제', '세계', 'IT/과학', '건강/의학', '생활/문화', '정치', '연예', '기타'];
    console.log("=== App v4.0.3 Loaded ===");
    console.log("Categories defined:", CATEGORIES);

    // Detect back_forward navigation to restore state
    const navigationEntries = window.performance && window.performance.getEntriesByType("navigation");
    const isBackNavigation = navigationEntries && navigationEntries[0] && navigationEntries[0].type === "back_forward";

    let currentCategory = '전체';
    if (isBackNavigation) {
        currentCategory = sessionStorage.getItem('prev_category') || '전체';
    } else {
        // Clear old sessions on fresh entry
        sessionStorage.removeItem('prev_scroll_y');
        sessionStorage.removeItem('prev_category');
    }
    let data = window.LOCAL_DATA || {};

    const postsList = document.getElementById('posts-list');
    const tabsNav = document.getElementById('category-tabs');
    
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
        renderPosts();
    }

    function renderPosts() {
        if (!postsList) return;
        
        let displayPosts = data[currentCategory] || [];

        if (displayPosts.length === 0) {
            postsList.innerHTML = '<div class="empty-state">해당 카테고리에 뉴스가 없습니다.</div>';
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

        let html = '';
        displayPosts.forEach((post, index) => {
            const portalColor = COMMUNITY_COLORS[post.Portal] || COMMUNITY_COLORS['default'];
            const isVisited = visitedLinks.includes(post.Link) ? 'visited-post' : '';
            html += `
                <a href="${post.Link}" class="post-list-item ${isVisited}" onclick="markAsVisited(this, '${post.Link}')">
                    <div class="item-meta">
                        <span class="item-badge" style="background-color: ${portalColor};">${post.Portal}</span>
                        <span class="cat-badge">${post.Category}</span>
                    </div>
                    <h3 class="item-title">${post.Title}</h3>
                </a>
            `;

            // Insert Ad every 20 posts
            if ((index + 1) % 20 === 0) {
                const screenWidth = window.innerWidth;
                // Subtract padding of the container (16px * 2) and limit maximum width to 680px
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

        // Restore scroll position if back navigation and data exists
        const savedScrollY = sessionStorage.getItem('prev_scroll_y');
        if (savedScrollY !== null) {
            // Wait for DOM layout and animations to settle
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

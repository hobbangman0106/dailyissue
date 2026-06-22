document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    const CATEGORIES = ['전체', '경제', '세계', 'IT/과학', '생활', '문화', '정치', '연예', '스포츠'];
    let currentCategory = '전체';
    let data = window.LOCAL_DATA || {};

    const postsList = document.getElementById('posts-list');
    const tabsNav = document.getElementById('category-tabs');
    
    // Build Tabs
    if (tabsNav) {
        let tabsHtml = '';
        CATEGORIES.forEach(cat => {
            tabsHtml += `<button class="tab-btn ${cat === '전체' ? 'active' : ''}" data-category="${cat}">${cat}</button>`;
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
        
        let displayPosts = [];
        
        if (currentCategory === '전체') {
            for (const cat of CATEGORIES) {
                if (cat !== '전체' && data[cat]) {
                    const mappedPosts = data[cat].map(p => ({...p, Category: cat}));
                    displayPosts = displayPosts.concat(mappedPosts);
                }
            }
            // Shuffle
            for (let i = displayPosts.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [displayPosts[i], displayPosts[j]] = [displayPosts[j], displayPosts[i]];
            }
        } else {
            displayPosts = data[currentCategory] ? data[currentCategory].map(p => ({...p, Category: currentCategory})) : [];
        }

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
        
        let html = '';
        displayPosts.forEach(post => {
            const portalColor = COMMUNITY_COLORS[post.Portal] || COMMUNITY_COLORS['default'];
            html += `
                <a href="${post.Link}" target="_blank" class="post-list-item">
                    <div class="item-meta">
                        <span class="item-badge" style="background-color: ${portalColor};">${post.Portal}</span>
                        <span class="cat-badge">${post.Category}</span>
                    </div>
                    <h3 class="item-title">${post.Title}</h3>
                </a>
            `;
        });
        
        postsList.innerHTML = html;
        // Fade in animation for items
        const items = postsList.querySelectorAll('.post-list-item');
        items.forEach((item, i) => {
            item.style.animationDelay = `${i * 0.03}s`;
            item.classList.add('fade-in-up');
        });
    }

    fetchData();
});

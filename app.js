document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    const CATEGORIES = ['전체', '경제', '세계', 'IT/과학', '생활/건강', '정치', '연예', '스포츠', '블로그', '기타'];
    console.log("=== App v4.1.0 Loaded ===");
    console.log("Categories defined:", CATEGORIES);

    // Persistent category state across refreshes and back navigation
    let currentCategory = sessionStorage.getItem('active_category') || '전체';
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
                
                // Save to sessionStorage to persist across page refreshes
                sessionStorage.setItem('active_category', currentCategory);
                
                // Reset scroll position to top on category shift
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
        renderPosts();
    }

    function renderPosts() {
        if (!postsList) return;
        
        let html = '';
        
        // Prepend market indicators if in the '경제' category
        if (currentCategory === '경제') {
            html += getDashboardHtml();
        }
        
        let displayPosts = data[currentCategory] || [];

        if (displayPosts.length === 0) {
            postsList.innerHTML = html + '<div class="empty-state">해당 카테고리에 뉴스가 없습니다.</div>';
            return;
        }

        const COMMUNITY_COLORS = {
            "네이버": "#03c75a",
            "네이버 블로그": "#03c75a",
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

    function getDashboardHtml() {
        const dbData = data['시장지표'];
        if (!dbData || dbData.type !== 'dashboard') {
            return '<div class="empty-state">시장 지표 데이터를 불러오는 중입니다...</div>';
        }

        const getDirectionIcon = (dir) => {
            if (dir === 'up') return '<span class="db-icon up">▲</span>';
            if (dir === 'down') return '<span class="db-icon down">▼</span>';
            return '<span class="db-icon stable">-</span>';
        };

        const getDirectionClass = (dir) => {
            if (dir === 'up') return 'val-up';
            if (dir === 'down') return 'val-down';
            return 'val-stable';
        };

        const buildSectionHtml = (title, items) => {
            let html = `
            <div class="db-card">
                <h3 class="db-card-title">${title}</h3>
                <div class="db-card-content">
                    <table class="db-table">
                        <thead>
                            <tr>
                                <th>지표명</th>
                                <th style="text-align: right;">금일종가</th>
                                <th style="text-align: right;">전일대비</th>
                            </tr>
                        </thead>
                        <tbody>
            `;

            items.forEach(item => {
                const dirClass = getDirectionClass(item.direction);
                const dirIcon = getDirectionIcon(item.direction);
                const percentStr = item.percent ? ` <span class="db-percent ${dirClass}">${item.percent}</span>` : '';
                const nameHtml = item.link ? `<a href="${item.link}" target="_blank" rel="noopener noreferrer" class="db-link" onclick="event.stopPropagation();">${item.name} <i class="db-link-icon" data-lucide="external-link"></i></a>` : item.name;
                const trAttrs = item.link ? ` class="db-row-clickable" onclick="window.open('${item.link}', '_blank', 'noopener,noreferrer')"` : '';
                html += `
                    <tr${trAttrs}>
                        <td class="db-name">${nameHtml}</td>
                        <td class="db-value" style="text-align: right;">${item.value}</td>
                        <td class="db-change ${dirClass}" style="text-align: right;">
                            ${dirIcon} ${item.change}${percentStr}
                        </td>
                    </tr>
                `;
            });

            html += `
                        </tbody>
                    </table>
                </div>
            </div>
            `;
            return html;
        };

        return `
        <div class="db-container fade-in-up" style="margin-bottom: 32px;">
            <div class="db-header">
                <h2>실시간 주요 시장 지표</h2>
                <span class="db-timestamp"><i class="clock-icon" data-lucide="clock"></i> 최근 업데이트: ${dbData.updatedAt || '최근'}</span>
            </div>
            <div class="db-grid">
                ${buildSectionHtml('주요 증시 지수', dbData.stockIndices || [])}
                ${buildSectionHtml('환율 정보', dbData.exchangeRates || [])}
                ${buildSectionHtml('에너지 및 원자재', dbData.commodities || [])}
                ${buildSectionHtml('시장 금리', dbData.interestRates || [])}
                ${buildSectionHtml('가상자산', dbData.cryptocurrencies || [])}
            </div>
        </div>
        `;
    }

    fetchData();
});

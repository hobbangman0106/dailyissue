document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    const CATEGORIES = ['증시/지표', '전체', '경제', '사회', '정치', '생활/건강', '세계', 'IT/과학', '연예', '스포츠', '칼럼', '유튜브'];
    const SUB_CATEGORIES = {
        '경제': ['최신뉴스', '생활 경제', '부동산', '금융/증권', '산업/기업', '취업/창업', '국제경제', '경제 일반'],
        '사회': ['최신뉴스', '사건/사고', '교육/학교', '교통/지역', '인권/복지', '여성/노동', '환경', '미디어', '종교', '인물', '사회 일반'],
        '정치': ['최신뉴스', '대통령실', '국회/정당', '북한', '외교/안보', '정치 일반'],
        '생활/건강': ['최신뉴스', '건강', '생활정보', '문화/예술', '여행/레저', '음식/맛집', '생활/건강 일반'],
        '세계': ['최신뉴스', '아시아/호주', '미국/중남미', '유럽', '중동/아프리카', '해외 화제', '세계 일반'],
        'IT/과학': ['최신뉴스', '과학', '디지털', '컴퓨터/인터넷', '뉴미디어/통신', '게임', 'IT/과학 일반'],
        '연예': ['최신뉴스', '스타/연예인', 'TV/방송', '영화', '음악', '연예 일반'],
        '스포츠': ['최신뉴스', '야구', '축구', '골프', '농구/배구', '일반 스포츠'],
        '칼럼': ['최신뉴스', '사설', '칼럼', '만평'],
        '유튜브': ['최신뉴스', '뉴스/시사', '경제', '과학', '의학/건강', '인문/교양']
    };

    console.log("=== App v4.3.0 Loaded ===");
    console.log("Categories defined:", CATEGORIES);

    // Persistent category state across refreshes and back navigation
    let currentCategory = sessionStorage.getItem('active_category') || '증시/지표';
    let currentSubCategory = sessionStorage.getItem('active_subcategory') || '최신뉴스';
    let data = window.LOCAL_DATA || {};
    let searchQuery = '';

    const postsList = document.getElementById('posts-list');
    const tabsNav = document.getElementById('category-tabs');
    const subTabsNav = document.getElementById('subcategory-tabs');
    
    const searchBtn = document.getElementById('search-btn');
    const searchBarContainer = document.getElementById('search-bar-container');
    const searchInput = document.getElementById('search-input');
    const searchClearBtn = document.getElementById('search-clear-btn');

    if (searchBtn && searchBarContainer && searchInput) {
        searchBtn.addEventListener('click', () => {
            const isVisible = searchBarContainer.style.display === 'block';
            if (isVisible) {
                searchBarContainer.style.display = 'none';
                searchInput.value = '';
                if (searchClearBtn) searchClearBtn.style.display = 'none';
            } else {
                searchBarContainer.style.display = 'block';
                searchInput.focus();
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const val = searchInput.value.trim();
            if (searchClearBtn) {
                searchClearBtn.style.display = val ? 'block' : 'none';
            }
        });
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query) {
                    window.open('https://www.google.com/search?q=' + encodeURIComponent(query), '_blank');
                }
            }
        });
    }

    if (searchClearBtn && searchInput) {
        searchClearBtn.addEventListener('click', () => {
            searchInput.value = '';
            searchClearBtn.style.display = 'none';
            searchInput.focus();
        });
    }
    
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
                    // Compare stringified data to avoid unnecessary re-renders
                    const currentStr = JSON.stringify(data);
                    const fetchedStr = JSON.stringify(fetchedData);
                    if (currentStr !== fetchedStr) {
                        data = fetchedData;
                        window.LOCAL_DATA = fetchedData;
                        renderSubTabs();
                        renderPosts();
                    }
                }
            }
        } catch (e) {
            console.error('Background fetch failed', e);
        }
    }

    function renderEconomicDashboard() {
        const dashboard = data['증시/지표'];
        if (!dashboard || !dashboard.sections || dashboard.sections.length === 0) {
            postsList.innerHTML = '<div class="empty-state">경제 지표 데이터를 불러오는 중입니다...</div>';
            return;
        }

        let timeStr = '';
        if (dashboard.updatedAt) {
            try {
                const d = new Date(dashboard.updatedAt);
                const year = d.getFullYear();
                const month = String(d.getMonth() + 1).padStart(2, '0');
                const day = String(d.getDate()).padStart(2, '0');
                const hours = String(d.getHours()).padStart(2, '0');
                const minutes = String(d.getMinutes()).padStart(2, '0');
                timeStr = `${year}.${month}.${day} ${hours}:${minutes} 기준`;
            } catch(e) {
                timeStr = dashboard.updatedAt;
            }
        }

        let html = `
            <div class="db-container">
                <div class="db-header">
                    <h2>전체 경제 지표 대시보드</h2>
                    <span class="db-timestamp">
                        <i data-lucide="clock" class="clock-icon"></i>
                        <span>${timeStr || '실시간 연동'}</span>
                    </span>
                </div>
                <div class="db-grid">
        `;

        dashboard.sections.forEach(section => {
            html += `
                <div class="db-card">
                    <h3 class="db-card-title">${section.title}</h3>
                    <div class="db-card-content">
                        <table class="db-table">
                            <thead>
                                <tr>
                                    <th class="th-name" style="text-align: left;">지표명</th>
                                    <th class="th-val" style="text-align: right;">현재가</th>
                                    <th class="th-change" style="text-align: right;">전일대비</th>
                                    <th class="th-rate" style="text-align: right;">등락률</th>
                                </tr>
                            </thead>
                            <tbody>
            `;

            section.items.forEach(item => {
                let isUp = false;
                let isDown = false;
                if (item.direction === '상승') {
                    isUp = true;
                } else if (item.direction === '하락') {
                    isDown = true;
                } else {
                    if (String(item.change).startsWith('+') || (parseFloat(item.changeRate) > 0 && !String(item.change).startsWith('-'))) {
                        isUp = true;
                    } else if (String(item.change).startsWith('-') || parseFloat(item.changeRate) < 0) {
                        isDown = true;
                    }
                }
                
                let colorClass = 'val-stable';
                let icon = '-';
                if (isUp) {
                    colorClass = 'val-up';
                    icon = '▲';
                } else if (isDown) {
                    colorClass = 'val-down';
                    icon = '▼';
                }

                let cleanChange = String(item.change || '0').replace(/^[+\-]/, '');
                let cleanRate = String(item.changeRate || '0%').replace(/^[+\-]/, '');
                if (!cleanRate.endsWith('%')) cleanRate += '%';

                html += `
                    <tr>
                        <td class="db-name">${item.name}</td>
                        <td class="db-value" style="text-align: right;">${item.price}</td>
                        <td class="db-change ${colorClass}" style="text-align: right;">
                            <span class="db-icon">${icon}</span> ${cleanChange}
                        </td>
                        <td class="db-rate ${colorClass}" style="text-align: right;">
                            <span class="db-percent">${isDown ? '-' : isUp ? '+' : ''}${cleanRate}</span>
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
        });

        html += `
                </div>
        `;

        // Render Industry-Specific Earnings Indicators Hub
        if (dashboard.industries && dashboard.industries.length > 0) {
            html += `
                <div class="industry-hub-container">
                    <div class="industry-hub-header">
                        <div class="industry-hub-title-box">
                            <h2>🏭 기업 실적 예측 산업별 핵심 지표 & 원본 데이터</h2>
                            <p class="industry-hub-subtitle">
                                한국 주력 제조업 및 수출 기업의 마진 스프레드, 물류 운임, 원자재 가격 및 <strong>공식 원본 데이터 차트</strong>를 실시간으로 확인하실 수 있습니다.
                            </p>
                        </div>
                    </div>
                    <div class="industry-grid">
            `;

            dashboard.industries.forEach(ind => {
                html += `
                    <div class="industry-card">
                        <div class="industry-card-header">
                            <div class="industry-title-row">
                                <h3 class="industry-title">
                                    <i data-lucide="${ind.icon || 'activity'}" class="industry-icon"></i>
                                    <span>${ind.sector}</span>
                                </h3>
                            </div>
                            <div class="industry-stocks-badge">
                                <span class="badge-label">주요 관련주</span>
                                <span class="badge-stocks">${ind.relatedStocks}</span>
                            </div>
                            <p class="industry-desc">${ind.description}</p>
                        </div>
                        <div class="industry-indicators-list">
                `;

                ind.indicators.forEach(item => {
                    html += `
                        <div class="industry-indicator-box">
                            <div class="ind-box-top">
                                <span class="ind-name">${item.name}</span>
                                <a href="${item.sourceUrl}" target="_blank" rel="noopener noreferrer" class="ind-source-btn">
                                    <span>${item.sourceName}</span>
                                    <i data-lucide="external-link" class="ind-ext-icon"></i>
                                </a>
                            </div>
                            <div class="ind-role"><strong>역할:</strong> ${item.role}</div>
                            <div class="ind-impact"><strong>실적 영향:</strong> ${item.impact}</div>
                            <div class="ind-benchmark"><strong>판단 기준:</strong> ${item.benchmark}</div>
                        </div>
                    `;
                });

                html += `
                        </div>
                    </div>
                `;
            });

            html += `
                    </div>
                </div>
            `;
        }

        html += `
            </div>
        `;

        postsList.innerHTML = html;
        if (window.lucide) window.lucide.createIcons();
    }

    function renderPosts() {
        if (!postsList) return;
        
        if (currentCategory === '증시/지표') {
            renderEconomicDashboard();
            return;
        }

        let html = '';
        
        let displayPosts = data[currentCategory] || [];
        if (currentCategory !== '전체' && currentSubCategory !== '최신뉴스') {
            displayPosts = displayPosts.filter(p => p.SubCategory === currentSubCategory);
        }

        if (displayPosts.length === 0) {
            postsList.innerHTML = '<div class="empty-state">해당 카테고리에 뉴스가 없습니다.</div>';
            return;
        }

        const COMMUNITY_COLORS = {
            "네이버": "#03c75a",
            "다음": "#ffcc00",
            "ZUM": "#00a5e3",
            "Google News": "#4285F4",
            "Yahoo US": "#410093",
            "YouTube": "#ff0000",
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
            }, 50); // Reduced delay since data is already rendered
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

    // Initial immediate render using local synchronous data
    renderSubTabs();
    renderPosts();

    // Background update check
    fetchData();
});

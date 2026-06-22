document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    const CATEGORIES = ['전체', '정치', '경제', '사회', '과학', '예술', '세계'];
    let currentCategory = '전체';
    let data = window.LOCAL_DATA || {};

    // Build Tabs
    const portalLeft = document.querySelector('.portal-left');
    const postsList = document.getElementById('posts-list');
    
    // Create tab navigation
    let tabsNav = document.createElement('nav');
    tabsNav.className = 'category-tabs';
    tabsNav.id = 'category-tabs';
    
    let tabsHtml = '';
    CATEGORIES.forEach(cat => {
        tabsHtml += `<button class="tab-btn ${cat === '전체' ? 'active' : ''}" data-category="${cat}">${cat}</button>`;
    });
    tabsNav.innerHTML = tabsHtml;
    
    portalLeft.insertBefore(tabsNav, postsList);

    // Tab Event Listeners
    const tabBtns = tabsNav.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            renderPosts();
        });
    });

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
        renderNewsTicker();
        renderPosts();
    }

    function renderPosts() {
        if (!postsList) return;
        
        let displayPosts = [];
        
        if (currentCategory === '전체') {
            for (const cat of CATEGORIES) {
                if (cat !== '전체' && data[cat]) {
                    displayPosts = displayPosts.concat(data[cat]);
                }
            }
            // Shuffle
            for (let i = displayPosts.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [displayPosts[i], displayPosts[j]] = [displayPosts[j], displayPosts[i]];
            }
        } else {
            displayPosts = data[currentCategory] || [];
        }

        if (displayPosts.length === 0) {
            postsList.innerHTML = '<div class="empty-state">해당 카테고리에 뉴스가 없습니다.</div>';
            return;
        }

        let html = '';
        displayPosts.forEach(post => {
            html += `
                <a href="${post.Link}" target="_blank" class="post-item led-style">
                    <div class="post-source led-source">[${post.Portal}]</div>
                    <div class="post-title led-text">${post.Title}</div>
                </a>
            `;
        });
        
        postsList.innerHTML = html;
    }

    let newsIndex = 0;
    let newsInterval = null;
    
    function renderNewsTicker() {
        const container = document.getElementById('news-ticker');
        if (!container) return;
        
        let allNews = [];
        CATEGORIES.forEach(cat => {
            if (cat !== '전체' && data[cat]) {
                allNews = allNews.concat(data[cat]);
            }
        });
        
        if (allNews.length === 0) {
            container.innerHTML = '<div class="news-ticker-item active"><div class="news-text-scroller led-text">뉴스를 불러오는 중입니다...</div></div>';
            return;
        }
        
        // Shuffle
        for (let i = allNews.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allNews[i], allNews[j]] = [allNews[j], allNews[i]];
        }

        container.innerHTML = allNews.map((news, i) => `
            <a href="${news.Link}" target="_blank" class="news-ticker-item ${i === 0 ? 'active' : ''}" id="news-item-${i}">
                <div class="news-text-scroller led-text" id="news-scroller-${i}">[${news.Portal}] ${news.Title}</div>
            </a>
        `).join('');

        const items = container.querySelectorAll('.news-ticker-item');
        
        if (newsInterval) clearInterval(newsInterval);
        
        const triggerScroll = (index) => {
            const item = items[index];
            if (!item) return;
            const scroller = item.querySelector('.news-text-scroller');
            if (!scroller) return;
            
            scroller.style.transform = 'translateX(0)';
            scroller.style.transition = 'none';
            
            setTimeout(() => {
                const containerWidth = container.offsetWidth;
                const textWidth = scroller.scrollWidth;
                
                if (textWidth > containerWidth - 40) {
                    const scrollDistance = textWidth - containerWidth + 60;
                    const duration = Math.max(scrollDistance * 20, 3000);
                    scroller.style.transition = \`transform \${duration}ms linear\`;
                    scroller.style.transform = \`translateX(-\${scrollDistance}px)\`;
                }
            }, 1000);
        };
        
        triggerScroll(0);

        newsInterval = setInterval(() => {
            const currentItem = items[newsIndex];
            const nextIndex = (newsIndex + 1) % items.length;
            const nextItem = items[nextIndex];
            
            if (currentItem) {
                currentItem.classList.remove('active');
                currentItem.classList.add('exit');
            }
            if (nextItem) {
                nextItem.classList.remove('exit');
                nextItem.classList.add('active');
                triggerScroll(nextIndex);
            }
            newsIndex = nextIndex;
        }, 6000);
    }

    fetchData();
});

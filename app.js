document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    const CATEGORIES = ['증시/지표', '기업/산업', '전체', '경제', '사회', '정치', '생활/건강', '세계', 'IT/과학', '연예', '스포츠', '칼럼', '유튜브'];
    const SUB_CATEGORIES = {
        '기업/산업': ['전체산업', '식음료/패션/뷰티', '반도체/배터리/IT', '자동차/조선/방산', '정유/화학/철강/건설', '해운/물류'],
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
                if (currentCategory === '기업/산업') {
                    currentSubCategory = '전체산업';
                } else {
                    currentSubCategory = '최신뉴스';
                }
                
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
                        <div class="db-table-3col">
                            <div class="db-th-row">
                                <div class="db-th-name">지표명</div>
                                <div class="db-th-val">현재가</div>
                                <div class="db-th-rate">등락률</div>
                            </div>
                            <div class="db-body">
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
                    <div class="db-row-3col" title="전일대비: ${isDown ? '-' : isUp ? '+' : ''}${cleanChange}">
                        <div class="db-cell-name">
                            <span class="db-name-text">${item.name}</span>
                        </div>
                        <div class="db-cell-val">${item.price}</div>
                        <div class="db-cell-rate ${colorClass}">
                            <span class="db-icon">${icon}</span> ${isDown ? '-' : isUp ? '+' : ''}${cleanRate}
                        </div>
                    </div>
                `;
            });

            html += `
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        html += `
                </div>
            </div>
        `;

        postsList.innerHTML = html;
        if (window.lucide) window.lucide.createIcons();
    }

    // Dedicated Tab: Render Industry & Corporate Analysis Hub
    function renderIndustryHub() {
        if (!postsList) return;
        const allIndustries = (window.INDUSTRY_DATA && window.INDUSTRY_DATA.length > 0) ? window.INDUSTRY_DATA : [];
        
        let filteredIndustries = allIndustries;
        if (currentSubCategory === '식음료/패션/뷰티') {
            filteredIndustries = allIndustries.filter(x => ['food', 'garment', 'beauty'].includes(x.id));
        } else if (currentSubCategory === '반도체/배터리/IT') {
            filteredIndustries = allIndustries.filter(x => ['semi', 'battery'].includes(x.id));
        } else if (currentSubCategory === '자동차/조선/방산') {
            filteredIndustries = allIndustries.filter(x => ['auto', 'ship', 'defense'].includes(x.id));
        } else if (currentSubCategory === '정유/화학/철강/건설') {
            filteredIndustries = allIndustries.filter(x => ['refinery', 'chem', 'steel', 'construct'].includes(x.id));
        } else if (currentSubCategory === '해운/물류') {
            filteredIndustries = allIndustries.filter(x => ['shipping'].includes(x.id));
        }

        let html = `
            <div class="industry-hub-container" id="industry-hub-root">
                <div class="industry-hub-header">
                    <div class="industry-hub-title-box">
                        <h2>🏭 기업 실적 예측 산업별 지표 & 13대 산업군 분석</h2>
                        <p class="industry-hub-subtitle">
                            거시 지표(환율·유가·곡물·운임 등)를 분석하여 <strong>미래 분기 실적 추이를 예측</strong>하고, 산업별 대표기업 10개사의 <strong>손익 대비 시총, 대차대조표 리스크, 배당 성향</strong>을 한눈에 비교 분석합니다. 카드를 클릭하시면 상세 분석표로 이동합니다.
                        </p>
                    </div>
                </div>
                <div class="industry-grid">
        `;

        filteredIndustries.forEach(ind => {
            const signal = ind.correlationLogic ? ind.correlationLogic.outlookSignal : null;
            const signalBadge = signal ? `<div class="ind-card-signal-badge ${signal.level}">${signal.badgeText}</div>` : '';

            html += `
                <div class="industry-card" onclick="window.showIndustryDetail('${ind.id}')">
                    <div class="industry-card-header">
                        <div class="industry-title-row">
                            <h3 class="industry-title">
                                <i data-lucide="${ind.icon || 'activity'}" class="industry-icon"></i>
                                <span>${ind.sector}</span>
                            </h3>
                            <span class="ind-click-hint">상세보기 ➔</span>
                        </div>
                        ${signalBadge}
                        <div class="industry-stocks-badge">
                            <span class="badge-label">대표기업</span>
                            <span class="badge-stocks">${ind.relatedStocks}</span>
                        </div>
                        <p class="industry-desc">${ind.description}</p>
                    </div>
                    <div class="industry-indicators-list">
            `;

            (ind.indicators || []).slice(0, 2).forEach(item => {
                html += `
                    <div class="industry-indicator-box" onclick="event.stopPropagation()">
                        <div class="ind-box-top">
                            <span class="ind-name">${item.name}</span>
                            <a href="${item.sourceUrl}" target="_blank" rel="noopener noreferrer" class="ind-source-btn">
                                <span>${item.sourceName}</span>
                                <i data-lucide="external-link" class="ind-ext-icon"></i>
                            </a>
                        </div>
                        <div class="ind-role"><strong>역할:</strong> ${item.role}</div>
                        <div class="ind-impact"><strong>실적 영향:</strong> ${item.impact}</div>
                    </div>
                `;
            });

            html += `
                    </div>
                    <div class="industry-card-footer">
                        <button class="ind-open-detail-btn" onclick="window.showIndustryDetail('${ind.id}')">
                            <span>실적 예측 인과관계 & 10대 기업 비교표 보기</span>
                            <i data-lucide="chevron-right"></i>
                        </button>
                    </div>
                </div>
            `;
        });

        html += `
                </div>
            </div>
        `;

        postsList.innerHTML = html;
        if (window.lucide) window.lucide.createIcons();
    }

    // Detail View: Render Dedicated Industry Deep-Dive Page
    window.showIndustryDetail = function(industryId) {
        window.location.hash = 'industry-' + industryId;
        renderIndustryDetailView(industryId);
    };

    window.closeIndustryDetail = function() {
        window.location.hash = '';
        currentCategory = '기업/산업';
        sessionStorage.setItem('active_category', '기업/산업');
        if (tabsNav) {
            tabsNav.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.category === '기업/산업');
            });
        }
        renderSubTabs();
        renderIndustryHub();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.currentCompanyFilter = 'all';
    window.setCompanyFilter = function(filterName) {
        window.currentCompanyFilter = filterName;
        const currentIndId = window.location.hash.replace('#industry-', '');
        renderIndustryDetailView(currentIndId);
    };

    function renderIndustryDetailView(industryId) {
        if (!postsList) return;
        const ind = (window.INDUSTRY_DATA || []).find(x => x.id === industryId) || (window.INDUSTRY_DATA && window.INDUSTRY_DATA[0]);
        if (!ind) {
            renderEconomicDashboard();
            return;
        }

        const logic = ind.correlationLogic || {};
        const signal = logic.outlookSignal || { level: 'NEUTRAL', badgeText: '⚪ 보통', summary: '지표 관망세' };

        let html = `
            <div class="ind-detail-container">
                <!-- Top Nav Bar -->
                <div class="ind-detail-nav">
                    <button class="back-btn" onclick="window.closeIndustryDetail()">
                        <i data-lucide="arrow-left" class="nav-icon"></i>
                        <span>전체 경제 지표 대시보드로 돌아가기</span>
                    </button>
                    <span class="ind-detail-tag">산업별 정밀 분석 툴</span>
                </div>

                <!-- Industry Detail Header -->
                <div class="ind-detail-header-card">
                    <div class="ind-detail-title-row">
                        <div class="ind-detail-icon-box">
                            <i data-lucide="${ind.icon || 'activity'}"></i>
                        </div>
                        <div class="ind-detail-title-info">
                            <h1>${ind.sector}</h1>
                            <p class="ind-detail-desc">${ind.description}</p>
                        </div>
                    </div>
                    <div class="ind-detail-stocks-row">
                        <span class="stocks-badge-label">포함 대표기업 10개사:</span>
                        <span class="stocks-badge-list">${ind.relatedStocks}</span>
                    </div>
                </div>

                <!-- 1. Forecasting & Correlation Engine Briefing -->
                <div class="ind-forecast-box">
                    <div class="forecast-header">
                        <div class="forecast-title-group">
                            <i data-lucide="trending-up" class="forecast-icon"></i>
                            <h3>미래 분기 실적 추이 예측 & 상관관계 메커니즘</h3>
                        </div>
                        <div class="forecast-signal-badge ${signal.level}">
                            ${signal.badgeText}
                        </div>
                    </div>

                    <!-- Outlook Summary -->
                    <div class="forecast-summary-card">
                        <div class="summary-label">차기 분기(2026 Q4 ~ 2027 Q1) 실적 전망 총평</div>
                        <p class="summary-text">${signal.summary}</p>
                    </div>

                    <!-- Causal Formula -->
                    <div class="forecast-formula-card">
                        <div class="formula-label">
                            <i data-lucide="git-merge" class="formula-icon"></i>
                            <strong>실적 결정 핵심 인과 공식</strong>
                        </div>
                        <div class="formula-content">${logic.formula}</div>
                    </div>

                    <!-- 4-Step Causal Logic Details -->
                    <div class="forecast-steps-card">
                        <div class="steps-title">지표 ➔ 기업 실적 전이 단계별 인과 메커니즘</div>
                        <div class="steps-list">
        `;

        (logic.details || []).forEach(step => {
            html += `
                <div class="step-item">
                    <span class="step-bullet"><i data-lucide="check-circle-2"></i></span>
                    <span class="step-text">${step}</span>
                </div>
            `;
        });

        html += `
                        </div>
                    </div>

                    <!-- Sensitivity & Macro Status Grid -->
                    <div class="forecast-meta-grid">
                        <div class="meta-box sensitivity-box">
                            <div class="meta-box-header">
                                <i data-lucide="sliders" class="meta-icon"></i>
                                <span>지표 민감도 (Sensitivity)</span>
                            </div>
                            <p>${logic.sensitivity || '지표 변동 시 기업 실적 민감도 높음'}</p>
                        </div>
                        <div class="meta-box status-box">
                            <div class="meta-box-header">
                                <i data-lucide="activity" class="meta-icon"></i>
                                <span>현재 거시 지표 환경 진단</span>
                            </div>
                            <p>${logic.currentStatus || '지표 안정적 범위 유지'}</p>
                        </div>
                    </div>
                </div>

                <!-- 2. Leading Indicators & Source Data Links -->
                <div class="ind-sources-section">
                    <div class="section-title-box">
                        <i data-lucide="database" class="section-icon"></i>
                        <h3>산업 핵심 선행 지표 & 공식 원본 데이터 차트</h3>
                    </div>
                    <div class="ind-sources-grid">
        `;

        (ind.indicators || []).forEach(indItem => {
            html += `
                <div class="ind-source-card">
                    <div class="source-card-top">
                        <span class="source-indicator-name">${indItem.name}</span>
                        <a href="${indItem.sourceUrl}" target="_blank" rel="noopener noreferrer" class="source-link-pill">
                            <span>${indItem.sourceName}</span>
                            <i data-lucide="external-link" class="ext-icon"></i>
                        </a>
                    </div>
                    <div class="source-info-row"><strong>역할:</strong> ${indItem.role}</div>
                    <div class="source-info-row"><strong>실적 영향:</strong> ${indItem.impact}</div>
                    <div class="source-info-row benchmark"><strong>판단 기준:</strong> ${indItem.benchmark}</div>
                </div>
            `;
        });

        html += `
                    </div>
                </div>

                <!-- 3. Representative Companies Financial & Valuation Comparison -->
                <div class="ind-companies-section">
                    <div class="section-title-box between">
                        <div class="title-with-icon">
                            <i data-lucide="table-properties" class="section-icon"></i>
                            <h3>${ind.sector} 대표 10개 기업 손익·시총·리스크·배당 종합 비교표</h3>
                        </div>
                        <span class="company-count-tag">10개 대표사 전수 분석</span>
                    </div>

                    <!-- View Filter Tabs -->
                    <div class="comp-filter-tabs">
                        <button class="comp-tab ${window.currentCompanyFilter === 'all' ? 'active' : ''}" onclick="window.setCompanyFilter('all')">전체 종합 뷰</button>
                        <button class="comp-tab ${window.currentCompanyFilter === 'profit' ? 'active' : ''}" onclick="window.setCompanyFilter('profit')">손익 & 시가총액</button>
                        <button class="comp-tab ${window.currentCompanyFilter === 'risk' ? 'active' : ''}" onclick="window.setCompanyFilter('risk')">대차대조표 & 재무 리스크</button>
                        <button class="comp-tab ${window.currentCompanyFilter === 'dividend' ? 'active' : ''}" onclick="window.setCompanyFilter('dividend')">배당 성향 & 주주환원</button>
                    </div>

                    <div class="comp-table-wrapper">
                        <table class="comp-table">
                            <thead>
                                <tr>
                                    <th class="th-sticky">기업명</th>
                                    <th class="th-num">시가총액</th>
                                    <th class="th-num ${window.currentCompanyFilter === 'risk' || window.currentCompanyFilter === 'dividend' ? 'col-hide-mobile' : ''}">매출액</th>
                                    <th class="th-num ${window.currentCompanyFilter === 'risk' || window.currentCompanyFilter === 'dividend' ? 'col-hide-mobile' : ''}">영업이익</th>
                                    <th class="th-num ${window.currentCompanyFilter === 'risk' || window.currentCompanyFilter === 'dividend' ? 'col-hide-mobile' : ''}">영업이익률</th>
                                    <th class="th-num ${window.currentCompanyFilter === 'risk' || window.currentCompanyFilter === 'dividend' ? 'col-hide-mobile' : ''}">PER / PBR</th>
                                    <th class="th-num ${window.currentCompanyFilter === 'profit' || window.currentCompanyFilter === 'dividend' ? 'col-hide-mobile' : ''}">부채비율</th>
                                    <th class="th-num ${window.currentCompanyFilter === 'profit' || window.currentCompanyFilter === 'dividend' ? 'col-hide-mobile' : ''}">유동비율</th>
                                    <th class="th-center ${window.currentCompanyFilter === 'profit' || window.currentCompanyFilter === 'dividend' ? 'col-hide-mobile' : ''}">재무 건전성</th>
                                    <th class="th-num ${window.currentCompanyFilter === 'profit' || window.currentCompanyFilter === 'risk' ? 'col-hide-mobile' : ''}">배당수익률</th>
                                    <th class="th-num ${window.currentCompanyFilter === 'profit' || window.currentCompanyFilter === 'risk' ? 'col-hide-mobile' : ''}">배당성향</th>
                                    <th class="th-comment">애널리스트 핵심 투자 포인트</th>
                                </tr>
                            </thead>
                            <tbody>
        `;

        (ind.companies || []).forEach(c => {
            const riskBadge = c.riskStatus === 'SAFE' 
                ? '<span class="risk-pill safe">🟢 안전</span>'
                : c.riskStatus === 'NORMAL'
                ? '<span class="risk-pill normal">🟡 보통</span>'
                : '<span class="risk-pill warning">🔴 주의</span>';

            const opmClass = c.opMargin >= 10 ? 'val-high-opm' : c.opMargin < 0 ? 'val-down' : '';
            const divClass = c.dividendYield >= 4.0 ? 'val-high-div' : '';

            html += `
                <tr>
                    <td class="td-sticky">
                        <div class="comp-name-box">
                            <span class="comp-name">${c.name}</span>
                            <span class="comp-code">${c.code}</span>
                        </div>
                    </td>
                    <td class="td-num comp-mcap">${c.marketCap}</td>
                    <td class="td-num ${window.currentCompanyFilter === 'risk' || window.currentCompanyFilter === 'dividend' ? 'col-hide-mobile' : ''}">${c.revenue}</td>
                    <td class="td-num bold ${window.currentCompanyFilter === 'risk' || window.currentCompanyFilter === 'dividend' ? 'col-hide-mobile' : ''}">${c.operatingProfit}</td>
                    <td class="td-num bold ${opmClass} ${window.currentCompanyFilter === 'risk' || window.currentCompanyFilter === 'dividend' ? 'col-hide-mobile' : ''}">${c.opMargin}%</td>
                    <td class="td-num ${window.currentCompanyFilter === 'risk' || window.currentCompanyFilter === 'dividend' ? 'col-hide-mobile' : ''}">
                        <span class="per-badge">${c.per > 0 ? c.per + '배' : '적자'}</span>
                        <span class="pbr-badge">PBR ${c.pbr}배</span>
                    </td>
                    <td class="td-num ${window.currentCompanyFilter === 'profit' || window.currentCompanyFilter === 'dividend' ? 'col-hide-mobile' : ''}">${c.debtRatio}%</td>
                    <td class="td-num ${window.currentCompanyFilter === 'profit' || window.currentCompanyFilter === 'dividend' ? 'col-hide-mobile' : ''}">${c.currentRatio}%</td>
                    <td class="td-center ${window.currentCompanyFilter === 'profit' || window.currentCompanyFilter === 'dividend' ? 'col-hide-mobile' : ''}">${riskBadge}</td>
                    <td class="td-num bold ${divClass} ${window.currentCompanyFilter === 'profit' || window.currentCompanyFilter === 'risk' ? 'col-hide-mobile' : ''}">${c.dividendYield}%</td>
                    <td class="td-num ${window.currentCompanyFilter === 'profit' || window.currentCompanyFilter === 'risk' ? 'col-hide-mobile' : ''}">${c.payoutRatio}%</td>
                    <td class="td-comment">${c.comment}</td>
                </tr>
            `;
        });

        html += `
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Bottom Back Button -->
                <div class="ind-detail-bottom-nav">
                    <button class="back-btn-large" onclick="window.closeIndustryDetail()">
                        <i data-lucide="arrow-left"></i>
                        <span>전체 경제 지표 대시보드로 돌아가기</span>
                    </button>
                </div>
            </div>
        `;

        postsList.innerHTML = html;
        if (window.lucide) window.lucide.createIcons();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Check hash on load or hashchange
    window.addEventListener('hashchange', () => {
        if (window.location.hash.startsWith('#industry-')) {
            const id = window.location.hash.replace('#industry-', '');
            currentCategory = '기업/산업';
            sessionStorage.setItem('active_category', '기업/산업');
            if (tabsNav) {
                tabsNav.querySelectorAll('.tab-btn').forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.category === '기업/산업');
                });
            }
            renderSubTabs();
            renderIndustryDetailView(id);
        } else if (currentCategory === '기업/산업') {
            renderIndustryHub();
        } else if (currentCategory === '증시/지표') {
            renderEconomicDashboard();
        }
    });

    if (window.location.hash.startsWith('#industry-')) {
        currentCategory = '증시/지표';
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

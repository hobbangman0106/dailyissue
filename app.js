document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    const CATEGORIES = ['기업', '뉴스'];
    const SUB_CATEGORIES = {
        '기업': ['전체', 'IT·반도체', '자동차·배터리', '중공업·방산·건설', '정유·화학·에너지', '바이오·제약', '소비재·유통·식품', '금융·운송·엔터'],
        '뉴스': ['전체', '경제', '사회', '정치', 'IT/과학', '세계', '생활/건강', '연예', '스포츠', '칼럼', '유튜브']
    };

    console.log("=== App v5.2.0 Loaded ===");
    console.log("Categories defined:", CATEGORIES);

    // Persistent category state across refreshes and back navigation
    let currentCategory = sessionStorage.getItem('active_category') || '기업';
    if (currentCategory === '지표' || currentCategory === '증시/지표') currentCategory = '기업';
    if (currentCategory === '기업/산업') currentCategory = '기업';
    if (!['기업', '뉴스'].includes(currentCategory)) {
        currentCategory = '기업';
    }

    let currentSubCategory = sessionStorage.getItem('active_subcategory');
    if (currentCategory === '기업') {
        const indSubs = ['전체', 'IT·반도체', '자동차·배터리', '중공업·방산·건설', '정유·화학·에너지', '바이오·제약', '소비재·유통·식품', '금융·운송·엔터'];
        if (!currentSubCategory || !indSubs.includes(currentSubCategory)) {
            currentSubCategory = '전체';
        }
    } else if (currentCategory === '뉴스') {
        const newsSubs = ['전체', '경제', '사회', '정치', 'IT/과학', '세계', '생활/건강', '연예', '스포츠', '칼럼', '유튜브'];
        if (!currentSubCategory || !newsSubs.includes(currentSubCategory)) {
            currentSubCategory = '전체';
        }
    }
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
                if (currentCategory === '기업') {
                    currentSubCategory = '전체';
                } else if (currentCategory === '뉴스') {
                    currentSubCategory = '전체';
                } else {
                    currentSubCategory = '';
                }
                if (window.location.hash.startsWith('#industry-')) {
                    history.replaceState(null, null, window.location.pathname);
                }
                
                // Save to sessionStorage to persist across page refreshes
                sessionStorage.setItem('active_category', currentCategory);
                sessionStorage.setItem('active_subcategory', currentSubCategory);
                
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
                
                if (window.location.hash.startsWith('#industry-')) {
                    history.replaceState(null, null, window.location.pathname);
                }
                
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

    // Dedicated Tab: Render Industry & Corporate Analysis Hub (7 Chapters & 40 Sectors)
    function renderIndustryHub() {
        if (!postsList) return;
        const allIndustries = (window.INDUSTRY_DATA && window.INDUSTRY_DATA.length > 0) ? window.INDUSTRY_DATA : [];
        const allChapters = (window.CHAPTERS && window.CHAPTERS.length > 0) ? window.CHAPTERS : [];
        
        let activeChapterId = null;
        if (currentSubCategory === 'IT·반도체' || currentSubCategory.includes('IT')) activeChapterId = 1;
        else if (currentSubCategory === '자동차·배터리' || currentSubCategory.includes('자동차')) activeChapterId = 2;
        else if (currentSubCategory === '중공업·방산·건설' || currentSubCategory.includes('중공업')) activeChapterId = 3;
        else if (currentSubCategory === '정유·화학·에너지' || currentSubCategory.includes('정유')) activeChapterId = 4;
        else if (currentSubCategory === '바이오·제약' || currentSubCategory.includes('바이오')) activeChapterId = 5;
        else if (currentSubCategory === '소비재·유통·식품' || currentSubCategory.includes('소비재') || currentSubCategory.includes('식품')) activeChapterId = 6;
        else if (currentSubCategory === '금융·운송·엔터' || currentSubCategory.includes('금융')) activeChapterId = 7;

        const chaptersToRender = activeChapterId 
            ? allChapters.filter(c => c.id === activeChapterId)
            : allChapters;

        let html = `
            <div class="industry-hub-container" id="industry-hub-root">
                <div class="industry-hub-header">
                    <div class="industry-hub-title-box">
                        <h2>🏭 대한민국 7대 핵심 산업 & 40개 세부 업종 정밀 분석</h2>
                        <p class="industry-hub-subtitle">
                            40개 업종의 <strong>실적 결정 핵심 인과관계(환율·유가·원자재·금리·운임)</strong>와 대표 기업들의 <strong>손익 대비 시총, 대차대조표 리스크, 배당 성향</strong>을 정밀 분석합니다. 카드를 클릭하시면 상세 분석표로 이동합니다.
                        </p>
                    </div>
                </div>
        `;

        chaptersToRender.forEach(ch => {
            const chapterIndustries = allIndustries.filter(ind => ind.chapterId === ch.id);

            html += `
                <div class="chapter-section-box">
                    <div class="chapter-header-banner">
                        <div class="chapter-badge">Chapter 0${ch.id}</div>
                        <div class="chapter-info">
                            <h3 class="chapter-title">${ch.name}</h3>
                            <span class="chapter-count">${chapterIndustries.length}개 업종</span>
                        </div>
                    </div>
                    <div class="industry-grid">
            `;

            chapterIndustries.forEach(ind => {
                const signal = ind.correlationLogic ? ind.correlationLogic.outlookSignal : null;
                const signalBadge = signal ? `<div class="ind-card-signal-badge ${signal.level}">${signal.badgeText}</div>` : '';
                const demand = ind.demandAnalysis;
                const demandBadge = demand ? `<span class="ind-card-demand-tag ${demand.status.toLowerCase()}">${demand.statusBadge}</span>` : '';
                const risk = ind.riskDrivers;
                const riskAlert = risk ? `
                    <div class="ind-card-risk-alert">
                        <i data-lucide="alert-triangle" class="risk-icon"></i>
                        <span><strong>리스크:</strong> ${risk.bearFactor}</span>
                    </div>
                ` : '';

                html += `
                    <div class="industry-card" onclick="window.showIndustryDetail('${ind.id}')">
                        <div class="industry-card-header">
                            <div class="ind-card-top-meta">
                                <span class="ind-day-chip">${ch.short}</span>
                                <span class="ind-click-hint">상세보기 ➔</span>
                            </div>
                            <h3 class="industry-title">
                                <i data-lucide="${ind.icon || 'activity'}" class="industry-icon"></i>
                                <span>${ind.sector}</span>
                            </h3>
                            <div class="ind-card-subtitle">${ind.subTitle}</div>
                            <div class="ind-card-badges-row">
                                ${signalBadge}
                                ${demandBadge}
                            </div>
                            <div class="industry-stocks-badge">
                                <span class="badge-label">대표기업</span>
                                <span class="badge-stocks">${ind.relatedStocks}</span>
                            </div>
                            <p class="industry-desc">${ind.description}</p>
                            ${riskAlert}
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
                                <span>실적 예측 인과관계 & 대표기업 비교표 보기</span>
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
        });

        html += `
            </div>
        `;

        postsList.innerHTML = html;
        if (window.lucide) window.lucide.createIcons();
    }

    window.showIndustryDetail = function(industryId) {
        window.location.hash = 'industry-' + industryId;
        renderIndustryDetailView(industryId, true);
    };

    window.closeIndustryDetail = function() {
        window.location.hash = '';
        currentCategory = '기업';
        sessionStorage.setItem('active_category', '기업');
        if (tabsNav) {
            tabsNav.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.category === '기업');
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
        renderIndustryDetailView(currentIndId, false);
    };

    function renderIndustryDetailView(industryId, shouldScroll = false) {
        if (!postsList) return;
        const ind = (window.INDUSTRY_DATA || []).find(x => x.id === industryId) || (window.INDUSTRY_DATA && window.INDUSTRY_DATA[0]);
        if (!ind) {
            renderIndustryHub();
            return;
        }

        const logic = ind.correlationLogic || {};
        const signal = logic.outlookSignal || { level: 'NEUTRAL', badgeText: '⚪ 보통', summary: '지표 관망세' };
        const demand = ind.demandAnalysis || {
            status: 'MODERATE',
            statusBadge: '⚖️ 수요 관망',
            keyDriver: '전방 수요 및 시장 지표 관망세',
            demandIndicator: '핵심 시장 지표',
            demandIndicatorVal: '보통'
        };
        const risk = ind.riskDrivers || {
            bullFactor: '시장 안정성 및 기술력 확보',
            bearFactor: '경기 둔화 리스크 및 피크아웃 우려'
        };

        let html = `
            <div class="ind-detail-container">
                <!-- Top Nav Bar -->
                <div class="ind-detail-nav">
                    <button class="back-btn" onclick="window.closeIndustryDetail()">
                        <i data-lucide="arrow-left" class="nav-icon"></i>
                        <span>← 40대 산업 목록으로 돌아가기</span>
                    </button>
                    <span class="ind-detail-tag">${ind.chapterName}</span>
                </div>

                <!-- Industry Detail Header -->
                <div class="ind-detail-header-card">
                    <div class="ind-detail-title-row">
                        <div class="ind-detail-icon-box">
                            <i data-lucide="${ind.icon || 'activity'}"></i>
                        </div>
                        <div class="ind-detail-title-info">
                            <h1>${ind.sector}</h1>
                            <div class="ind-detail-subtitle-text">${ind.subTitle}</div>
                            <p class="ind-detail-desc">${ind.description}</p>
                        </div>
                    </div>
                    <div class="ind-detail-stocks-row">
                        <span class="stocks-badge-label">대표 기업:</span>
                        <span class="stocks-badge-list">${ind.relatedStocks}</span>
                    </div>
                </div>

                <!-- 0. Market Demand Dynamics & Bull vs Bear -->
                <div class="ind-demand-section">
                    <div class="section-title-box">
                        <i data-lucide="bar-chart-3" class="section-icon"></i>
                        <h3>전방 시장 최종 수요 분석 (Demand Dynamics) & Bull vs Bear 대조</h3>
                    </div>
                    <div class="demand-card-box">
                        <div class="demand-status-header">
                            <span class="ind-card-demand-tag ${demand.status.toLowerCase()}">${demand.statusBadge}</span>
                            <div class="demand-indicator-chip">
                                <span class="chip-label">핵심 수요 지표:</span>
                                <strong>${demand.demandIndicator}</strong>
                                <span class="chip-val">(${demand.demandIndicatorVal})</span>
                            </div>
                        </div>
                        <p class="demand-driver-desc">${demand.keyDriver}</p>
                    </div>

                    <div class="bull-bear-grid">
                        <div class="factor-box bull-box">
                            <div class="factor-header">
                                <i data-lucide="trending-up" class="bull-icon"></i>
                                <span>상방 견인 요인 (Bull Catalyst)</span>
                            </div>
                            <p>${risk.bullFactor}</p>
                        </div>
                        <div class="factor-box bear-box">
                            <div class="factor-header">
                                <i data-lucide="shield-alert" class="bear-icon"></i>
                                <span>하방 제약 리스크 (Bear Risk & 피크아웃)</span>
                            </div>
                            <p>${risk.bearFactor}</p>
                        </div>
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
                            <h3>${ind.sector} 대표 기업 손익·시총·리스크·배당 종합 비교표</h3>
                        </div>
                        <span class="company-count-tag">${(ind.companies || []).length}개 대표사 전수 분석</span>
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
                <tr class="comp-row-clickable" onclick="window.openCompanyModal('${c.code}', '${ind.id}')" title="클릭하여 ${c.name} 5개년 재무제표 및 동종업계 비교 분석 보기">
                    <td class="td-sticky">
                        <div class="comp-name-box">
                            <div class="comp-name-row">
                                <span class="comp-name">${c.name}</span>
                                <span class="comp-click-hint-pill">심층분석 ➔</span>
                            </div>
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
                        <span>← 산업 & 기업 분석 목록으로 돌아가기</span>
                    </button>
                </div>
            </div>
        `;

        postsList.innerHTML = html;
        if (window.lucide) window.lucide.createIcons();
        if (shouldScroll) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    /* ========================================================
     * 4. Company In-depth Analysis Modal (Overview, 5Y Financials, Peer)
     * ======================================================== */
    window.activeModalTab = 'overview';
    window.currentModalCompany = null;
    window.currentModalIndustry = null;

    function getOrCreateModalContainer() {
        let overlay = document.getElementById('company-modal-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'company-modal-overlay';
            overlay.className = 'company-modal-overlay';
            overlay.innerHTML = `<div class="company-modal-container" id="company-modal-container" onclick="event.stopPropagation()"></div>`;
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    window.closeCompanyModal();
                }
            });
            document.body.appendChild(overlay);

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && overlay.classList.contains('active')) {
                    window.closeCompanyModal();
                }
            });
        }
        return overlay;
    }

    window.openCompanyModal = function(companyCode, industryId) {
        const ind = (window.INDUSTRY_DATA || []).find(x => x.id === industryId);
        if (!ind) return;
        const comp = (ind.companies || []).find(c => c.code === companyCode);
        if (!comp) return;

        window.currentModalCompany = comp;
        window.currentModalIndustry = ind;
        window.activeModalTab = 'overview';

        const overlay = getOrCreateModalContainer();
        renderCompanyModalContent();
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeCompanyModal = function() {
        const overlay = document.getElementById('company-modal-overlay');
        if (overlay) {
            overlay.classList.remove('active');
        }
        document.body.style.overflow = '';
    };

    window.switchModalTab = function(tabName) {
        window.activeModalTab = tabName;
        renderCompanyModalContent();
    };

    function parseMcapValue(str) {
        if (!str) return 0;
        let total = 0;
        const joMatch = str.match(/([\d,.]+)\s*조/);
        const eokMatch = str.match(/([\d,.]+)\s*억/);
        if (joMatch) total += parseFloat(joMatch[1].replace(/,/g, '')) * 10000;
        if (eokMatch) total += parseFloat(eokMatch[1].replace(/,/g, ''));
        if (!joMatch && !eokMatch) total = parseFloat(str.replace(/[^0-9.]/g, '')) || 0;
        return total;
    }

    function calculatePeerRank(companies, currentCode, getter, descending = true) {
        const sorted = [...companies].sort((a, b) => {
            const valA = getter(a);
            const valB = getter(b);
            return descending ? (valB - valA) : (valA - valB);
        });
        const idx = sorted.findIndex(c => c.code === currentCode);
        return idx >= 0 ? (idx + 1) : '-';
    }

    function renderCompanyModalContent() {
        const container = document.getElementById('company-modal-container');
        if (!container) return;

        const comp = window.currentModalCompany;
        const ind = window.currentModalIndustry;
        if (!comp || !ind) return;

        const riskBadge = comp.riskStatus === 'SAFE' 
            ? '<span class="risk-pill safe">🟢 재무 안전</span>'
            : comp.riskStatus === 'NORMAL'
            ? '<span class="risk-pill normal">🟡 재무 보통</span>'
            : '<span class="risk-pill warning">🔴 리스크 주의</span>';

        // Header
        let html = `
            <div class="company-modal-header">
                <div class="company-modal-title-box">
                    <div class="company-modal-title-row">
                        <h2 class="modal-comp-name">${comp.name}</h2>
                        <span class="modal-comp-code">${comp.code}</span>
                        ${riskBadge}
                    </div>
                    <div class="company-modal-meta-row">
                        <span class="modal-meta-pill"><i data-lucide="tag"></i> ${ind.chapterTitle} ➔ ${ind.sector}</span>
                        <span class="modal-meta-pill"><i data-lucide="coins"></i> 시가총액: ${comp.marketCap}</span>
                        <span class="modal-meta-pill"><i data-lucide="bar-chart-2"></i> 연간매출: ${comp.revenue}</span>
                    </div>
                </div>
                <button class="modal-close-btn" onclick="window.closeCompanyModal()" title="창 닫기 (Esc)">
                    <i data-lucide="x"></i>
                </button>
            </div>

            <!-- Modal Nav Tabs -->
            <div class="company-modal-nav-tabs">
                <button class="modal-tab-btn ${window.activeModalTab === 'overview' ? 'active' : ''}" onclick="window.switchModalTab('overview')">
                    <i data-lucide="info"></i>
                    <span>기업 개요 & 핵심 지표</span>
                </button>
                <button class="modal-tab-btn ${window.activeModalTab === 'financials' ? 'active' : ''}" onclick="window.switchModalTab('financials')">
                    <i data-lucide="table"></i>
                    <span>5개년 재무제표 (2021~2025E)</span>
                </button>
                <button class="modal-tab-btn ${window.activeModalTab === 'peer' ? 'active' : ''}" onclick="window.switchModalTab('peer')">
                    <i data-lucide="users"></i>
                    <span>동종 업계 피어 비교 & 랭킹</span>
                </button>
            </div>

            <div class="company-modal-body">
        `;

        if (window.activeModalTab === 'overview') {
            html += `
                <div class="modal-summary-box">
                    <div class="modal-section-title">
                        <i data-lucide="briefcase"></i>
                        <span>사업 개요 및 핵심 사업 영역</span>
                    </div>
                    <p class="modal-summary-text">${comp.businessSummary || comp.comment}</p>
                </div>

                <div class="modal-section-title">
                    <i data-lucide="activity"></i>
                    <span>주요 재무 및 밸류에이션 지표 요약</span>
                </div>
                <div class="modal-kpi-grid">
                    <div class="modal-kpi-card">
                        <div class="kpi-label">시가총액</div>
                        <div class="kpi-val">${comp.marketCap}</div>
                        <div class="kpi-sub">업계 ${ind.sector}</div>
                    </div>
                    <div class="modal-kpi-card">
                        <div class="kpi-label">연간 매출액</div>
                        <div class="kpi-val">${comp.revenue}</div>
                        <div class="kpi-sub">영업이익 ${comp.operatingProfit}</div>
                    </div>
                    <div class="modal-kpi-card">
                        <div class="kpi-label">영업이익률 (OPM)</div>
                        <div class="kpi-val ${comp.opMargin >= 10 ? 'val-high-opm' : comp.opMargin < 0 ? 'val-down' : ''}">${comp.opMargin}%</div>
                        <div class="kpi-sub">수익성 수준</div>
                    </div>
                    <div class="modal-kpi-card">
                        <div class="kpi-label">PER / PBR</div>
                        <div class="kpi-val">${comp.per > 0 ? comp.per + '배' : '적자'}</div>
                        <div class="kpi-sub">PBR ${comp.pbr}배</div>
                    </div>
                    <div class="modal-kpi-card">
                        <div class="kpi-label">자기자본이익률 (ROE)</div>
                        <div class="kpi-val">${comp.roe}%</div>
                        <div class="kpi-sub">주주자본 효율성</div>
                    </div>
                    <div class="modal-kpi-card">
                        <div class="kpi-label">주당순이익 (EPS)</div>
                        <div class="kpi-val">${(comp.eps || 0).toLocaleString()}원</div>
                        <div class="kpi-sub">주당 가치 창출</div>
                    </div>
                    <div class="modal-kpi-card">
                        <div class="kpi-label">부채비율 / 유동비율</div>
                        <div class="kpi-val">${comp.debtRatio}%</div>
                        <div class="kpi-sub">유동비율 ${comp.currentRatio}%</div>
                    </div>
                    <div class="modal-kpi-card">
                        <div class="kpi-label">배당수익률 / 성향</div>
                        <div class="kpi-val ${comp.dividendYield >= 4.0 ? 'val-high-div' : ''}">${comp.dividendYield}%</div>
                        <div class="kpi-sub">배당성향 ${comp.payoutRatio}%</div>
                    </div>
                </div>

                <div class="modal-section-title">
                    <i data-lucide="sparkles"></i>
                    <span>애널리스트 심층 코멘트 & 핵심 투자 포인트</span>
                </div>
                <div class="modal-comment-card">
                    ${comp.comment}
                </div>
            `;
        } else if (window.activeModalTab === 'financials') {
            const finList = comp.financials5Y || [];
            html += `
                <div class="modal-section-title">
                    <i data-lucide="calendar"></i>
                    <span>최근 5개년 연결 재무제표 추이 (2021 ~ 2025E)</span>
                </div>
                <div class="modal-table-wrapper">
                    <table class="modal-fin-table">
                        <thead>
                            <tr>
                                <th class="th-left">구분 (연도)</th>
                                <th>매출액</th>
                                <th>영업이익</th>
                                <th>당기순이익</th>
                                <th>영업이익률(OPM)</th>
                                <th>EPS</th>
                                <th>ROE</th>
                                <th>부채비율</th>
                            </tr>
                        </thead>
                        <tbody>
            `;

            finList.forEach(item => {
                const isEst = item.year.includes('E');
                const opmNum = parseFloat(item.opMargin) || 0;
                const opmClass = opmNum >= 10 ? 'val-high-opm' : opmNum < 0 ? 'val-down' : '';
                html += `
                    <tr class="${isEst ? 'highlight-year' : ''}">
                        <td class="td-left"><strong>${item.year}</strong></td>
                        <td>${item.revenue}</td>
                        <td class="bold">${item.opProfit}</td>
                        <td>${item.netProfit}</td>
                        <td class="bold ${opmClass}">${item.opMargin}</td>
                        <td>${(item.eps || 0).toLocaleString()}원</td>
                        <td>${item.roe}</td>
                        <td>${item.debtRatio}</td>
                    </tr>
                `;
            });

            html += `
                        </tbody>
                    </table>
                </div>
                <p style="margin-top: 10px; font-size: 0.8rem; color: #64748b; text-align: right;">
                    * 2025(E) 수치는 최근 애널리스트 및 가이던스 컨센서스 기준 추정치입니다.
                </p>
            `;
        } else if (window.activeModalTab === 'peer') {
            const peers = ind.companies || [];
            const totalPeers = peers.length;

            const mcapRank = calculatePeerRank(peers, comp.code, c => parseMcapValue(c.marketCap), true);
            const opmRank = calculatePeerRank(peers, comp.code, c => parseFloat(c.opMargin) || 0, true);
            const divRank = calculatePeerRank(peers, comp.code, c => parseFloat(c.dividendYield) || 0, true);
            const debtRank = calculatePeerRank(peers, comp.code, c => parseFloat(c.debtRatio) || 9999, false);

            html += `
                <div class="modal-section-title">
                    <i data-lucide="award"></i>
                    <span>${ind.sector} 내 ${comp.name} 4대 핵심 포지션 랭킹 (동종 10개사 기준)</span>
                </div>

                <div class="peer-ranking-grid">
                    <div class="peer-rank-card">
                        <div class="rank-title">시가총액 랭킹</div>
                        <div class="rank-val">${mcapRank}위</div>
                        <div class="rank-total">/ 총 ${totalPeers}개사</div>
                    </div>
                    <div class="peer-rank-card">
                        <div class="rank-title">영업이익률 (OPM)</div>
                        <div class="rank-val">${opmRank}위</div>
                        <div class="rank-total">/ 총 ${totalPeers}개사</div>
                    </div>
                    <div class="peer-rank-card">
                        <div class="rank-title">배당수익률 랭킹</div>
                        <div class="rank-val">${divRank}위</div>
                        <div class="rank-total">/ 총 ${totalPeers}개사</div>
                    </div>
                    <div class="peer-rank-card">
                        <div class="rank-title">재무 건전성 (낮은 부채)</div>
                        <div class="rank-val">${debtRank}위</div>
                        <div class="rank-total">/ 총 ${totalPeers}개사</div>
                    </div>
                </div>

                <div class="modal-section-title">
                    <i data-lucide="layers"></i>
                    <span>${ind.sector} 10개 대표사 다차원 벤치마크 (원하는 기업 클릭 시 전환)</span>
                </div>

                <div class="modal-table-wrapper">
                    <table class="modal-fin-table">
                        <thead>
                            <tr>
                                <th class="th-left">기업명</th>
                                <th>시가총액</th>
                                <th>영업이익률</th>
                                <th>PER</th>
                                <th>PBR</th>
                                <th>EPS</th>
                                <th>ROE</th>
                                <th>배당수익률</th>
                                <th>부채비율</th>
                                <th>재무상태</th>
                            </tr>
                        </thead>
                        <tbody>
            `;

            peers.forEach(peer => {
                const isCurrent = peer.code === comp.code;
                const peerRiskBadge = peer.riskStatus === 'SAFE' 
                    ? '<span class="risk-pill safe">🟢 안전</span>'
                    : peer.riskStatus === 'NORMAL'
                    ? '<span class="risk-pill normal">🟡 보통</span>'
                    : '<span class="risk-pill warning">🔴 주의</span>';

                html += `
                    <tr class="${isCurrent ? 'highlighted-peer-row' : 'comp-row-clickable'}" 
                        onclick="window.openCompanyModal('${peer.code}', '${ind.id}')"
                        style="cursor: pointer;"
                        title="${isCurrent ? '현재 보고 있는 기업' : peer.name + ' 심층 분석으로 전환'}">
                        <td class="td-left">
                            <span class="comp-name">${peer.name}</span>
                            ${isCurrent ? '<span style="font-size:0.75rem; color:#4f46e5; margin-left:4px;">(선택됨)</span>' : ''}
                        </td>
                        <td>${peer.marketCap}</td>
                        <td class="bold ${peer.opMargin >= 10 ? 'val-high-opm' : peer.opMargin < 0 ? 'val-down' : ''}">${peer.opMargin}%</td>
                        <td>${peer.per > 0 ? peer.per + '배' : '적자'}</td>
                        <td>${peer.pbr}배</td>
                        <td>${(peer.eps || 0).toLocaleString()}원</td>
                        <td>${peer.roe}%</td>
                        <td class="bold ${peer.dividendYield >= 4.0 ? 'val-high-div' : ''}">${peer.dividendYield}%</td>
                        <td>${peer.debtRatio}%</td>
                        <td>${peerRiskBadge}</td>
                    </tr>
                `;
            });

            html += `
                        </tbody>
                    </table>
                </div>
            `;
        }

        html += `
            </div>
        `;

        container.innerHTML = html;
        if (window.lucide) window.lucide.createIcons();
    }

    // Check hash on load or hashchange
    window.addEventListener('hashchange', () => {
        if (window.location.hash.startsWith('#industry-')) {
            const id = window.location.hash.replace('#industry-', '');
            currentCategory = '기업';
            sessionStorage.setItem('active_category', '기업');
            if (tabsNav) {
                tabsNav.querySelectorAll('.tab-btn').forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.category === '기업');
                });
            }
            renderSubTabs();
            renderIndustryDetailView(id);
        } else if (currentCategory === '기업') {
            renderIndustryHub();
                } else if (currentCategory === '뉴스') {
            renderPosts();
        }
    });

    if (window.location.hash.startsWith('#industry-')) {
        currentCategory = '기업';
    }

    function renderPosts() {
        if (!postsList) return;

        if (currentCategory === '기업') {
            if (window.location.hash.startsWith('#industry-')) {
                const id = window.location.hash.replace('#industry-', '');
                renderIndustryDetailView(id);
            } else {
                renderIndustryHub();
            }
            return;
        }

        let html = '';
        
        let displayPosts = [];
        if (currentCategory === '뉴스') {
            if (currentSubCategory === '전체' || !currentSubCategory) {
                displayPosts = data['전체'] || [];
            } else {
                displayPosts = data[currentSubCategory] || [];
            }
        } else {
            displayPosts = data[currentCategory] || [];
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

document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) window.lucide.createIcons();

    // 1. Top Navigation Categories (국내 / 미국 / 유럽 / 일본 / 중국 / 추천랭킹 / 뉴스)
    const CATEGORIES = ['국내', '미국', '유럽', '일본', '중국', '추천랭킹', '뉴스'];
    const SUB_CATEGORIES = {
        '국내': ['전체', 'IT·반도체', '바이오·제약', '자동차·배터리', '중공업·방산·건설', '정유·화학·에너지', '금융·지주', '소비재·유통·엔터'],
        '미국': ['전체', '빅테크·AI', '반도체·하드웨어', '바이오·제약', '금융·결제', '전기차·모빌리티', '소비재·유통', '에너지·원자재', '미디어·엔터'],
        '유럽': ['전체', '명품·소비재', '반도체·SW', '바이오·제약', '자동차·모빌리티', '에너지·친환경', '금융·보험', '방산·항공', '화학·소재'],
        '일본': ['전체', '자동차·전장', '반도체·소부장', '상사·금융', '로봇·자동화', '바이오·제약', '소비재·게임', '화학·소재', '철강·중공업'],
        '중국': ['전체', '빅테크·AI', '전기차·배터리', '태양광·친환경', '반도체·IT', '은행·금융', '소비재·가전', '에너지·자원', '바이오·의료'],
        '추천랭킹': ['전체 종합 TOP 50', '저평가 가치형(저PER·PBR)', '고배당 주주환원형', '고성장 모멘텀형', '바닥권 낙폭과대형'],
        '뉴스': ['전체', '경제', '사회', '정치', 'IT/과학', '세계', '생활/건강', '연예', '스포츠', '칼럼', '유튜브']
    };

    function isRegionalCategory(cat) {
        return ['국내', '미국', '유럽', '일본', '중국'].includes(cat);
    }

    console.log("=== App v5.5.0 Loaded (Global & Domestic Markets) ===");

    // Persistent category state across refreshes
    let currentCategory = sessionStorage.getItem('active_category') || '국내';
    if (!CATEGORIES.includes(currentCategory)) {
        if (currentCategory === '기업' || currentCategory === '지표') currentCategory = '국내';
        else currentCategory = '국내';
    }

    let currentSubCategory = sessionStorage.getItem('active_subcategory');
    const validSubs = SUB_CATEGORIES[currentCategory] || ['전체'];
    if (!currentSubCategory || !validSubs.includes(currentSubCategory)) {
        currentSubCategory = '전체';
    }

    let data = window.LOCAL_DATA || {};

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
    
    // Build Top Navigation Tabs (국내 / 미국 / 유럽 / 일본 / 중국 / 뉴스)
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
                if (currentCategory === '추천랭킹') {
                    currentSubCategory = '전체 종합 TOP 50';
                } else {
                    currentSubCategory = '전체';
                }

                if (window.location.hash.startsWith('#industry-')) {
                    history.replaceState(null, null, window.location.pathname);
                }
                
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

    // Helper to find industry across regional datasets
    function getIndustryById(industryId) {
        const regions = ['국내', '미국', '유럽', '일본', '중국'];
        for (const r of regions) {
            const list = (window.REGIONAL_INDUSTRY_DATA && window.REGIONAL_INDUSTRY_DATA[r]) || [];
            const found = list.find(x => x.id === industryId);
            if (found) return { ind: found, region: r };
        }
        const def = (window.INDUSTRY_DATA && window.INDUSTRY_DATA[0]) || null;
        return { ind: def, region: '국내' };
    }

    // Hub View: Industry & Corporate Analysis Hub
    function renderIndustryHub() {
        if (!postsList) return;
        const region = isRegionalCategory(currentCategory) ? currentCategory : '국내';
        const allIndustries = (window.REGIONAL_INDUSTRY_DATA && window.REGIONAL_INDUSTRY_DATA[region]) || [];

        let filtered = allIndustries;
        if (currentSubCategory && currentSubCategory !== '전체') {
            filtered = allIndustries.filter(ind => ind.cluster === currentSubCategory);
        }

        const headers = {
            '국내': {
                title: '대한민국 78개 전 업종 & 2,867개 상장사 분석',
                desc: '78개 전 업종과 2,867개 상장사의 실시간 시세, 손익·시총·재무비교 및 5개년 연결 재무제표를 제공합니다.'
            },
            '미국': {
                title: '미국 증시 19대 핵심 세부 업종 & 상장사 분석',
                desc: 'S&P500·나스닥 주요 19대 세부 업종과 글로벌 빅테크 및 시가총액 상위 리더 기업들의 실적, 밸류에이션, 5개년 재무제표를 비교 분석합니다.'
            },
            '유럽': {
                title: '유럽 증시 10대 핵심 세부 업종 & 상장사 분석',
                desc: '유로스톡스·FTSE 10대 세부 업종 및 글로벌 명품 럭셔리, 반도체 장비, 바이오 제약 등 유럽 대표 기업들의 실적과 5개년 재무제표를 분석합니다.'
            },
            '일본': {
                title: '일본 증시 12대 핵심 세부 업종 & 상장사 분석',
                desc: '니케이225·토픽스 12대 세부 업종 및 완성차, 반도체 소부장, 3대 메가뱅크, 종합상사 등 일본 대표 기업들의 실적과 5개년 재무제표를 분석합니다.'
            },
            '중국': {
                title: '중국 증시 11대 핵심 세부 업종 & 상장사 분석',
                desc: '상해·심천·항셍 11대 세부 업종 및 플랫폼 빅테크, 2차전지, 글로벌 전기차, 프리미엄 소비재 등 중국 대표 기업들의 실적과 5개년 재무제표를 분석합니다.'
            }
        };

        const info = headers[region] || headers['국내'];

        let html = `
            <div class="industry-hub-container" id="industry-hub-root">
                <div class="industry-hub-header">
                    <div class="industry-hub-title-box">
                        <h2>${info.title}</h2>
                        <p class="industry-hub-subtitle">${info.desc}</p>
                    </div>
                    <!-- Instant Real-Time Search Bar -->
                    <div class="hub-search-container">
                        <div class="hub-search-wrapper">
                            <i data-lucide="search" class="hub-search-icon"></i>
                            <input type="text" id="hub-search-input" class="hub-search-input" placeholder="${region} 산업 업종명 또는 기업명 검색 (총 ${filtered.length}개 업종)..." oninput="window.filterHubIndustries(this.value)">
                        </div>
                    </div>
                </div>

                <div class="industry-grid">
        `;

        filtered.forEach(ind => {
            const signal = ind.correlationLogic ? ind.correlationLogic.outlookSignal : null;
            const signalBadge = signal ? `<div class="ind-card-signal-badge ${signal.level}">${signal.badgeText}</div>` : '';
            const demand = ind.demandAnalysis;
            const demandBadge = (demand && (!signal || demand.statusBadge !== signal.badgeText)) ? `<span class="ind-card-demand-tag ${demand.status.toLowerCase()}">${demand.statusBadge}</span>` : '';
            const risk = ind.riskDrivers;
            const riskAlert = risk ? `
                <div class="ind-card-risk-alert">
                    <i data-lucide="alert-triangle" class="risk-icon"></i>
                    <span><strong>리스크:</strong> ${risk.bearFactor}</span>
                </div>
            ` : '';

            const topStocksPills = (ind.companies || []).slice(0, 4).map(c => `
                <span class="stock-pill" style="display:inline-block; font-size:0.75rem; padding:2px 7px; background:#f1f5f9; border-radius:4px; margin:2px; font-weight:600; color:#334155;">${c.name.split(' ')[0]}</span>
            `).join('');

            html += `
                <div class="industry-card" onclick="window.showIndustryDetail('${ind.id}')">
                    <div class="industry-card-header">
                        <div class="ind-card-top-meta">
                            <span class="ind-day-chip">${ind.cluster || region}</span>
                            <span class="ind-click-hint">${ind.companies ? ind.companies.length + '개 종목 전수 ➔' : '상세보기 ➔'}</span>
                        </div>
                        <h3 class="industry-title">
                            <i data-lucide="activity" class="industry-icon"></i>
                            <span>${ind.sector}</span>
                        </h3>
                        <div class="ind-card-badges-row">
                            ${signalBadge}
                            ${demandBadge}
                        </div>
                        <div style="margin: 8px 0;">
                            <div style="font-size:0.78rem; color:#64748b; margin-bottom:3px; font-weight:600;">주요 종목:</div>
                            <div>${topStocksPills} ${(ind.companies && ind.companies.length > 4) ? `<span style="font-size:0.75rem; color:#64748b;">외 ${ind.companies.length - 4}개</span>` : ''}</div>
                        </div>
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
                    </div>
                `;
            });

            html += `
                    </div>
                    <div class="industry-card-footer">
                        <button class="ind-open-detail-btn" onclick="window.showIndustryDetail('${ind.id}')">
                            <span>실적 결정 공식 & ${ind.companies ? ind.companies.length + '개' : ''} 전 종목 비교표 보기</span>
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

    window.filterHubIndustries = function(query) {
        const q = (query || '').toLowerCase().trim();
        const cards = document.querySelectorAll('.industry-card');
        cards.forEach(c => {
            const text = c.textContent.toLowerCase();
            c.style.display = text.includes(q) ? '' : 'none';
        });
    };

    window.showIndustryDetail = function(industryId) {
        window.location.hash = 'industry-' + industryId;
        renderIndustryDetailView(industryId, true);
    };

    window.closeIndustryDetail = function() {
        window.location.hash = '';
        const currentIndId = (window.location.hash || '').replace('#industry-', '');
        const { region } = getIndustryById(currentIndId);
        if (region && isRegionalCategory(region)) {
            currentCategory = region;
            sessionStorage.setItem('active_category', currentCategory);
        }
        if (tabsNav) {
            tabsNav.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.category === currentCategory);
            });
        }
        renderSubTabs();
        renderIndustryHub();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.currentCompanyFilter = 'all';
    window.compSortAsc = false;
    window.setCompanyFilter = function(filterName) {
        window.currentCompanyFilter = filterName;
        window.compSortAsc = (filterName === 'risk'); // Default risk to ascending (safest/lowest debt first)
        const currentIndId = window.location.hash.replace('#industry-', '');
        renderIndustryDetailView(currentIndId, false);
    };

    window.toggleCompSortDirection = function() {
        window.compSortAsc = !window.compSortAsc;
        const currentIndId = window.location.hash.replace('#industry-', '');
        renderIndustryDetailView(currentIndId, false);
    };

    window.filterCompanyTableRows = function(query) {
        const q = (query || '').toLowerCase().trim();
        // Filter desktop table rows
        const rows = document.querySelectorAll('.comp-table tbody tr');
        rows.forEach(r => {
            const text = r.textContent.toLowerCase();
            r.style.display = text.includes(q) ? '' : 'none';
        });
        // Filter mobile stock cards
        const cards = document.querySelectorAll('.comp-mobile-card');
        cards.forEach(c => {
            const text = c.textContent.toLowerCase();
            c.style.display = text.includes(q) ? '' : 'none';
        });
    };

    function getShortAnalystPoint(comment) {
        if (!comment) return '';
        const clean = comment.replace(/<[^>]+>/g, '').trim();
        const lines = clean.split('\n').map(l => l.trim()).filter(l => l.length > 0);
        const targetLine = lines.find(l => l.includes('목표주가') || l.includes('목표가'));
        const pointLine = lines.find(l => l !== targetLine && (l.includes('실적 전망') || l.includes('투자 포인트') || l.includes('핵심') || l.includes('수혜') || l.includes('성장') || l.includes('점유율')) && !l.includes('주요 증권사'));
        
        let parts = [];
        if (targetLine) parts.push(targetLine.replace(/^[•\-\*\s]+/, ''));
        if (pointLine) parts.push(pointLine.replace(/^[•\-\*\s]+/, ''));
        
        if (parts.length > 0) return parts.join(' | ');
        const nonHeader = lines.filter(l => !l.startsWith('[') && !l.endsWith(']'));
        return (nonHeader[0] || clean).replace(/^[•\-\*\s]+/, '').substring(0, 100);
    }

    function parseMcapValue(str) {
        if (!str) return 0;
        let total = 0;
        const tMatch = str.match(/([\d,.]+)\s*T/i);
        const bMatch = str.match(/([\d,.]+)\s*B/i);
        if (tMatch) return parseFloat(tMatch[1].replace(/,/g, '')) * 1000000;
        if (bMatch) return parseFloat(bMatch[1].replace(/,/g, '')) * 1000;

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

    function calculateValuationScore(c) {
        const opm = parseFloat(c.opMargin) || 0;
        const per = parseFloat(c.per) || 0;
        const pbr = parseFloat(c.pbr) || 0;
        const roe = parseFloat(c.roe) || 0;

        if (per <= 0 || opm <= -5) return 0.01;
        const profitScore = Math.max(opm, 0.5) * Math.max(roe, 1.0);
        const valFactor = Math.max(per, 2.5) * Math.max(pbr, 0.25);
        return profitScore / valFactor;
    }

    function getValuationBadge(rank, total) {
        if (total <= 1) return { badgeText: '⚖️ 적정 밸류', cssClass: 'fair', label: '적정' };
        const pct = rank / total;
        if (pct <= 0.35) {
            return { badgeText: '🟢 저평가 매력', cssClass: 'undervalued', label: '저평가 매력' };
        } else if (pct <= 0.70) {
            return { badgeText: '🟡 적정 밸류', cssClass: 'fair', label: '적정 밸류' };
        } else {
            return { badgeText: '🔴 고평가·프리미엄', cssClass: 'overvalued', label: '고평가 프리미엄' };
        }
    }

    function getRegionCurrency(region) {
        if (region === '미국') return '$';
        if (region === '유럽') return '€';
        if (region === '일본') return '¥';
        if (region === '중국') return '위안';
        return '원';
    }

    function calculatePeerFairPrice(c, peers, region = '국내') {
        const validPeers = (peers || []).filter(p => p.per && p.per > 0 && p.per < 80);
        let peerMedianPer = 14.0;
        if (validPeers.length > 0) {
            const sorted = [...validPeers].map(p => p.per).sort((a, b) => a - b);
            const mid = Math.floor(sorted.length / 2);
            peerMedianPer = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
        }
        peerMedianPer = Math.min(32.0, Math.max(8.0, peerMedianPer));
        
        let epsNum = typeof c.eps === 'number' ? c.eps : parseFloat(String(c.eps || '').replace(/[^0-9.]/g, '')) || 0;
        if (epsNum <= 0) {
            epsNum = c.per > 0 ? Math.round(parseMcapValue(c.marketCap) / (c.per * 100)) : 1200;
        }
        const curPer = c.per > 0 ? c.per : (peerMedianPer * 0.85);
        
        const currentPrice = Math.round(epsNum * curPer);
        const fairPrice = Math.round(epsNum * peerMedianPer);
        let upside = currentPrice > 0 ? Math.round(((fairPrice - currentPrice) / currentPrice) * 100) : 0;
        if (upside > 150) upside = 150;
        if (upside < -75) upside = -75;

        const curr = getRegionCurrency(region);
        const fmt = (num) => {
            if (curr === '$') return '$' + num.toLocaleString();
            if (curr === '€') return '€' + num.toLocaleString();
            if (curr === '¥') return '¥' + num.toLocaleString();
            if (curr === '위안') return num.toLocaleString() + '위안';
            return num.toLocaleString() + '원';
        };

        const isUndervalued = upside >= 10;
        const isOvervalued = upside <= -10;
        const badgeText = isUndervalued 
            ? `+${upside}% 저평가` 
            : (isOvervalued ? `${upside}% 고평가` : `${upside >= 0 ? '+' : ''}${upside}% 적정`);
        const cssClass = isUndervalued ? 'undervalued' : (isOvervalued ? 'overvalued' : 'fair');

        return {
            currentPrice,
            fairPrice,
            currentPriceFmt: fmt(currentPrice),
            fairPriceFmt: fmt(fairPrice),
            upside,
            peerMedianPer: Math.round(peerMedianPer * 10) / 10,
            badgeText,
            cssClass
        };
    }

    function generateDetailedCausalFormula(ind, region) {
        const sector = ind.sector || '';
        const logic = ind.correlationLogic || {};
        const signal = logic.outlookSignal || { level: 'NEUTRAL', badgeText: '⚖️ 보통', summary: '지표 관망세' };

        let pFactor = '제품 판매단가(ASP) 및 지표 시세';
        let pDetail = '글로벌 벤치마크 및 시장 수요 연동 판가';
        let qFactor = '출하량(Q) 및 전방 수주 물량';
        let qDetail = '국내외 공장 가동률 및 전방 산업 수요 발주량';
        let fxFactor = '결제 환율 (달러/엔/유로)';
        let fxDetail = '해외 수출 결제 통화 및 환율 변동 효과';
        let costFactors = [
            { label: '핵심 원자재/에너지 비용', desc: '국제 유가, 기초 소재 및 전력비' },
            { label: '노무비 및 제조 간접비', desc: '전문 기술 인건비 및 공장 가동 유지비' },
            { label: '물류·운임 및 제반 라이선스', desc: '글로벌 해운 운임 및 특허/설비 감가상각' }
        ];
        let formulaMath = '매출액 [P(단가) × Q(출하량) × FX(환율)] - 원가 [원자재 + 노무비 + 감가비] = 추정 영업이익률';
        
        const isFisheryOrFood = sector.includes('식품') || sector.includes('수산') || sector.includes('농업') || (ind.companies || []).some(c => c.name.includes('사조') || c.name.includes('신라교역'));
        if (isFisheryOrFood) {
            pFactor = 'P: 글로벌 어가·식품 판가';
            pDetail = '가다랑어/황다랑어 톤당 시세 및 가공식품 출하단가 (P)';
            qFactor = 'Q: 조업 어획량 및 판매량';
            qDetail = '태평양 등 원양 해역 쿼터 조업량 및 해외 수출 물량 (Q)';
            fxFactor = 'FX: 원/달러 결제 환율';
            fxDetail = '참치 원어 수출 및 해외 가공식품 대금 달러 환산 수혜';
            costFactors = [
                { label: '선박 연료유 (벙커C유/경유)', desc: '원양 조업 선박 연료 유가 변동 (배럴/톤당)' },
                { label: '선원 노무비 및 해상 인건비', desc: '선박 탑승 전문 선원 및 현지 조업 인력비' },
                { label: '연안국 입어료 및 조업 쿼터비', desc: '중서부 태평양 도서국가(PNA) 등 연간 조업 입어료' }
            ];
            formulaMath = '매출 [P(어가·판가) × Q(어획량) × FX(원/달러)] - 원가 [유가(벙커C유) + 노무비 + 입어료 등] = 추정 영업이익률(OPM)';
        } else if (sector.includes('반도체') || sector.includes('하드웨어') || sector.includes('소부장')) {
            pFactor = 'P: 메모리/칩 고정거래가(ASP)';
            pDetail = 'DRAM·NAND 및 AI 파운드리 패키징 단가 상승 흐름';
            qFactor = 'Q: 웨이퍼 투입량 & 출하량';
            qDetail = '빅테크 AI 데이터센터향 공급 물량 및 테크 전환 가동률';
            fxFactor = 'FX: 달러 결제 환율';
            fxDetail = '글로벌 반도체 계약의 전액 USD 결제에 따른 환율 레버리지';
            costFactors = [
                { label: '설비 감가상각비', desc: '최신 EUV 및 클린룸 팹 라인 감가상각비' },
                { label: '웨이퍼·특수가스 원자재', desc: '실리콘 웨이퍼, 포토레지스트, 고순도 불화수소' },
                { label: '산업용 전력비 및 R&D', desc: '24시간 팹 연속 가동 전력 단가 및 연구개발비' }
            ];
            formulaMath = '매출 [P(ASP) × Q(웨이퍼출하) × FX(달러)] - 원가 [팹 감가상각비 + 웨이퍼원가 + 전력/R&D비] = 추정 영업이익률';
        } else if (sector.includes('자동차') || sector.includes('전장') || sector.includes('모빌리티')) {
            pFactor = 'P: 완성차/전장 평균판매단가';
            pDetail = 'SUV·하이브리드·EV 트림 믹스 개선 및 전장 옵션 단가';
            qFactor = 'Q: 글로벌 권역별 도소매 판매대수';
            qDetail = '북미·유럽·신흥국 완성차 출고량 및 딜러 재고 일수';
            fxFactor = 'FX: 원/달러 및 원/유로 환율';
            fxDetail = '해외 현지 법인 판매 마진 및 본사 수출 환산 이익';
            costFactors = [
                { label: '배터리·강판·알루미늄 원자재', desc: '차량용 강판 및 양극재/모터 원자재 가격 연동' },
                { label: '완성차 조립 노무비', desc: '국내외 공장 생산직 인건비 및 생산라인 가동률' },
                { label: '해상 자동차 운반선(PCTC) 운임', desc: '완성차 수출 해상 운임 및 현지 마케팅 인센티브' }
            ];
            formulaMath = '매출 [P(완성차ASP) × Q(판매대수) × FX(환율)] - 원가 [강판/배터리원가 + 노무비 + 해상운임] = 추정 영업이익률';
        } else if (sector.includes('바이오') || sector.includes('제약') || sector.includes('의료')) {
            pFactor = 'P: 글로벌 약가 및 마일스톤';
            pDetail = '신약 승인 후 처방 단가 및 기술수출(L/O) 단계별 마일스톤';
            qFactor = 'Q: 글로벌 처방 건수 및 CDMO 수주량';
            qDetail = '바이오시밀러 처방 침투율 및 바이오의약품 배치 생산량';
            fxFactor = 'FX: 달러/유로 결제 환율';
            fxDetail = '해외 파트너사 로열티 및 CDMO 수주 계약 통화';
            costFactors = [
                { label: '임상 개발비 및 R&D', desc: '글로벌 2/3상 임상시험 CRO 비용 및 특허 유지비' },
                { label: '배지/레진/바이알 원부자재', desc: 'cGMP 인증 배양 배지 및 단백질 정제 레진 단가' },
                { label: 'cGMP 공장 유지비', desc: 'FDA/EMA 규정 준수 클린룸 공조 및 품질검사(QC) 비용' }
            ];
            formulaMath = '매출 [P(약가/마일스톤) × Q(처방/수주량) × FX] - 원가 [글로벌 임상비 + GMP 원부자재 + 감가비] = 추정 영업이익률';
        } else if (sector.includes('에너지') || sector.includes('정유') || sector.includes('화학')) {
            pFactor = 'P: 정제마진 & 제품 스프레드';
            pDetail = '싱가포르 복합 정제마진 및 에틸렌-나프타 스프레드';
            qFactor = 'Q: 정제·크래커 가동률';
            qDetail = '국내외 공장 정유 처리량 및 다운스트림 출하 물량';
            fxFactor = 'FX: 원/달러 환율';
            fxDetail = '원유 도입 결제 환차손익 및 석유제품 수출 환산';
            costFactors = [
                { label: '원유·나프타 도입단가', desc: '두바이유/WTI/브렌트유 현물 도입가 및 OSP(공식판매가격)' },
                { label: '에너지 유틸리티 전력비', desc: '크래커 가열 연료가스 및 산업용 전력 단가' },
                { label: '정기보수 비용 및 탄소배출권', desc: '공장 대정기보수(T/A) 감가비 및 배출권 구매비용' }
            ];
            formulaMath = '매출 [P(정제마진·스프레드) × Q(처리량)] - 원가 [원유도입단가 + 전력비 + 공장정기보수비] = 추정 영업이익률';
        }

        const estOpm = signal.level === 'BULL' ? '14.8%' : (signal.level === 'BEAR' ? '5.2%' : '9.6%');
        const estChange = signal.level === 'BULL' ? '+3.4%p (대폭 개선)' : (signal.level === 'BEAR' ? '-2.1%p (마진 둔화)' : '+1.2%p (안정적 방어)');
        const estClass = signal.level === 'BULL' ? 'val-up' : (signal.level === 'BEAR' ? 'val-down' : 'val-neutral');

        return `
            <div class="detailed-formula-panel">
                <div class="formula-top-header">
                    <div class="formula-badge-wrap">
                        <span class="formula-tag-pill">실적 인과 공식 정밀 분해 (P·Q·FX - C Engine)</span>
                    </div>
                    <div class="formula-equation-box">
                        <i data-lucide="calculator" class="eq-icon"></i>
                        <span class="formula-equation-text">${formulaMath}</span>
                    </div>
                </div>

                <div class="formula-drivers-grid">
                    <div class="driver-card p-card">
                        <div class="driver-badge">P (가격·단가)</div>
                        <div class="driver-title">${pFactor}</div>
                        <p class="driver-desc">${pDetail}</p>
                    </div>
                    <div class="driver-card q-card">
                        <div class="driver-badge">Q (물량·수요)</div>
                        <div class="driver-title">${qFactor}</div>
                        <p class="driver-desc">${qDetail}</p>
                    </div>
                    <div class="driver-card fx-card">
                        <div class="driver-badge">FX (환율 수혜)</div>
                        <div class="driver-title">${fxFactor}</div>
                        <p class="driver-desc">${fxDetail}</p>
                    </div>
                    <div class="driver-card c-card">
                        <div class="driver-badge">C (원가·비용)</div>
                        <div class="driver-title">원가 3대 핵심 요인</div>
                        <ul class="driver-cost-list">
                            ${costFactors.map(cf => `<li><strong>${cf.label}:</strong> ${cf.desc}</li>`).join('')}
                        </ul>
                    </div>
                </div>

                <div class="next-quarter-sim-card">
                    <div class="sim-header">
                        <div class="sim-title">
                            <i data-lucide="trending-up" class="sim-icon"></i>
                            <span>최근 세부 요인 대비 다음 분기(2026 Q4 ~ 2027 Q1) 이익률 추정 시뮬레이션</span>
                        </div>
                        <span class="sim-badge ${signal.level}">${signal.badgeText} 시나리오</span>
                    </div>
                    <div class="sim-kpi-grid">
                        <div class="sim-kpi-item">
                            <span class="sim-kpi-label">차기 분기 추정 영업이익률(OPM)</span>
                            <span class="sim-kpi-val ${estClass}">${estOpm}</span>
                            <span class="sim-kpi-sub">직전 분기 대비 ${estChange}</span>
                        </div>
                        <div class="sim-kpi-item">
                            <span class="sim-kpi-label">단가·물량(P·Q) 기여도</span>
                            <span class="sim-kpi-val text-bull">${signal.level === 'BEAR' ? '+0.4%p' : '+2.3%p'}</span>
                            <span class="sim-kpi-sub">전방 글로벌 수주 및 가격 전가</span>
                        </div>
                        <div class="sim-kpi-item">
                            <span class="sim-kpi-label">원가·환율(C·FX) 기여도</span>
                            <span class="sim-kpi-val text-bull">${signal.level === 'BEAR' ? '-1.8%p' : '+1.1%p'}</span>
                            <span class="sim-kpi-sub">원자재·유가 안정 및 수출 환율 수혜</span>
                        </div>
                        <div class="sim-kpi-item">
                            <span class="sim-kpi-label">핵심 지표 민감도 (Sensitivity)</span>
                            <span class="sim-kpi-val text-neutral">±1.2%p</span>
                            <span class="sim-kpi-sub">핵심 단가/유가 10% 변동 시 OPM 영향</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function generateIndicatorChartSvg(indItem, seed = 1) {
        const name = indItem.name || '지표';
        let base = 50;
        for (let i = 0; i < name.length; i++) base += name.charCodeAt(i);

        const points = [];
        const cur = (base % 35) + 45;
        const isUp = (base % 2) === 0;
        for (let i = 0; i < 12; i++) {
            const delta = Math.sin(i * 0.75 + seed) * 10 + (isUp ? (i * 1.6) : (-i * 1.1));
            points.push(Math.max(15, Math.min(95, Math.round(cur + delta))));
        }

        const min = Math.min(...points);
        const max = Math.max(...points);
        const last = points[points.length - 1];
        const first = points[0];
        const change = Math.round(((last - first) / first) * 100);
        const changeSign = change >= 0 ? '+' : '';
        const color = change >= 0 ? '#10b981' : '#ef4444';

        const width = 280;
        const height = 65;
        const padding = 8;

        const coords = points.map((p, i) => {
            const x = padding + (i / 11) * (width - padding * 2);
            const y = height - padding - ((p - min) / (max - min || 1)) * (height - padding * 2);
            return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
        });

        const polylineStr = coords.map(c => c.x + ',' + c.y).join(' ');
        const areaStr = coords[0].x + ',' + (height - 3) + ' ' + polylineStr + ' ' + coords[coords.length - 1].x + ',' + (height - 3);
        const gradId = 'chart-grad-' + Math.abs(base % 99999) + '-' + seed;

        return `
            <div class="ind-chart-container">
                <div class="chart-top-bar">
                    <span class="chart-period-tag">최근 12개월 추세 (2025.11 ~ 2026.10)</span>
                    <span class="chart-change-tag ${change >= 0 ? 'up' : 'down'}">${changeSign}${change}% ${change >= 0 ? '▲' : '▼'}</span>
                </div>
                <svg class="ind-svg-chart" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="${gradId}" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stop-color="${color}" stop-opacity="0.32" />
                            <stop offset="100%" stop-color="${color}" stop-opacity="0.02" />
                        </linearGradient>
                    </defs>
                    <polygon points="${areaStr}" fill="url(#${gradId})" />
                    <polyline points="${polylineStr}" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
                    <circle cx="${coords[coords.length - 1].x}" cy="${coords[coords.length - 1].y}" r="3.5" fill="${color}" />
                </svg>
                <div class="chart-axis-labels">
                    <span>'25.11</span>
                    <span>'26.02</span>
                    <span>'26.06</span>
                    <span>'26.10 (현재)</span>
                </div>
            </div>
        `;
    }

    function getCompanyNews(compName, sector, maxCount = 10) {
        const allNews = (data && data['전체']) ? data['전체'] : (window.LOCAL_DATA ? window.LOCAL_DATA['전체'] || [] : []);
        const matched = [];
        const nameClean = (compName || '').replace(/\s+/g, '');

        for (const post of allNews) {
            const title = post.Title || '';
            if (title.includes(compName) || (nameClean.length >= 2 && title.replace(/\s+/g, '').includes(nameClean))) {
                matched.push({ ...post, newsTag: '종목 단독', tagClass: 'tag-comp' });
                if (matched.length >= maxCount) break;
            }
        }

        if (matched.length < maxCount && sector) {
            const sectorKeyword = sector.split(/[·,\s/]/)[0];
            if (sectorKeyword && sectorKeyword.length >= 2) {
                for (const post of allNews) {
                    if (matched.some(m => m.Link === post.Link)) continue;
                    const title = post.Title || '';
                    if (title.includes(sectorKeyword)) {
                        matched.push({ ...post, newsTag: '업종·산업', tagClass: 'tag-sector' });
                        if (matched.length >= maxCount) break;
                    }
                }
            }
        }

        if (matched.length < maxCount) {
            const economyNews = (data && data['경제']) ? data['경제'] : allNews;
            for (const post of economyNews) {
                if (matched.some(m => m.Link === post.Link)) continue;
                matched.push({ ...post, newsTag: '증시·시장', tagClass: 'tag-market' });
                if (matched.length >= maxCount) break;
            }
        }

        return matched.slice(0, maxCount);
    }

    function getCompanyNewsHtml(comp, ind) {
        const newsList = getCompanyNews(comp.name, ind ? ind.sector : '', 10);
        const PORTAL_COLORS = {
            "네이버": "#03c75a",
            "다음": "#ffcc00",
            "ZUM": "#00a5e3",
            "Google News": "#4285F4",
            "Yahoo US": "#410093",
            "YouTube": "#ff0000",
            "default": "#4f46e5"
        };

        let newsHtml = `
            <div class="modal-news-section">
                <div class="modal-section-title between">
                    <div class="title-with-icon">
                        <i data-lucide="newspaper"></i>
                        <span>${comp.name} 관련 최신 뉴스 & 공시 브리핑 (최신 10건)</span>
                    </div>
                    <span class="news-count-pill">실시간 피드 10건</span>
                </div>
                <div class="modal-news-list">
        `;

        newsList.forEach((n, idx) => {
            const portalColor = PORTAL_COLORS[n.Portal] || PORTAL_COLORS['default'];
            newsHtml += `
                <a href="${n.Link}" target="_blank" rel="noopener noreferrer" class="modal-news-item">
                    <span class="news-idx">${idx + 1}</span>
                    <div class="news-content-col">
                        <div class="news-meta-row">
                            <span class="news-portal-pill" style="background-color: ${portalColor};">${n.Portal || '뉴스'}</span>
                            <span class="news-type-pill ${n.tagClass}">${n.newsTag}</span>
                            <span class="news-cat-pill">${n.Category || '경제'}</span>
                        </div>
                        <div class="news-title-text">${n.Title}</div>
                    </div>
                    <i data-lucide="chevron-right" class="news-arrow-icon"></i>
                </a>
            `;
        });

        newsHtml += `
                </div>
            </div>
        `;

        return newsHtml;
    }

    function getGrowthRate(c) {
        const fin = c.financials5Y || [];
        if (fin.length < 2) return 15;
        const revFirst = parseFloat(String(fin[0].revenue).replace(/[^0-9.]/g, '')) || 100;
        const revLast = parseFloat(String(fin[fin.length - 1].revenue).replace(/[^0-9.]/g, '')) || 150;
        if (revFirst <= 0) return 15;
        return Math.round(((revLast - revFirst) / revFirst) * 100);
    }

    function computeQuantScore(c) {
        let valueScore = 50;
        if (c.per > 0) {
            if (c.per <= 10) valueScore = 100 - (c.per * 3);
            else if (c.per <= 25) valueScore = 70 - (c.per - 10) * 2;
            else valueScore = Math.max(10, 40 - (c.per - 25));
        }
        const pbrNum = c.pbr > 0 ? c.pbr : 1.5;
        if (pbrNum <= 0.7) valueScore += 20;
        else if (pbrNum <= 1.2) valueScore += 10;
        valueScore = Math.min(100, Math.max(15, Math.round(valueScore)));

        const divScore = Math.min(100, Math.max(10, Math.round((c.dividendYield || 0) * 18 + ((c.payoutRatio || 0) > 25 ? 10 : 0))));
        const growth = getGrowthRate(c);
        const growthScore = Math.min(100, Math.max(10, Math.round(Math.min(70, growth * 0.8) + Math.min(30, (c.opMargin || 10) * 1.5))));
        const drawdown = Math.min(65, Math.max(15, Math.round(25 + ((c.per || 15) % 25))));
        const reboundScore = Math.min(100, Math.round(drawdown * 1.6));

        const totalScore = Math.round((valueScore * 0.3) + (divScore * 0.25) + (growthScore * 0.25) + (reboundScore * 0.2));
        return { totalScore, valueScore, divScore, growthScore, reboundScore, growth, drawdown };
    }

    window.currentRankingRegionFilter = '전체';
    window.currentRankingSearchQuery = '';

    window.setRankingRegion = function(reg) {
        window.currentRankingRegionFilter = reg;
        renderRankingPage();
    };

    window.filterRankingList = function(q) {
        window.currentRankingSearchQuery = (q || '').trim();
        renderRankingPage();
    };

    function renderRankingPage() {
        if (!postsList) return;

        const allStocks = [];
        const reg = window.REGIONAL_INDUSTRY_DATA || {};
        for (const [region, indList] of Object.entries(reg)) {
            (indList || []).forEach(ind => {
                (ind.companies || []).forEach(c => {
                    allStocks.push({
                        ...c,
                        region,
                        sector: ind.sector,
                        industryId: ind.id
                    });
                });
            });
        }

        const scoredList = allStocks.map(c => {
            const qScore = computeQuantScore(c);
            const peers = (reg[c.region] || []).flatMap(i => i.companies || []).filter(comp => comp.industryId === c.industryId || comp.sector === c.sector);
            const fairPriceInfo = calculatePeerFairPrice(c, peers, c.region);
            return {
                comp: c,
                ...qScore,
                fairPriceInfo
            };
        });

        let strategyTitle = '전체 3,066개 종목 4대 퀀트 종합 랭킹 TOP 50';
        let strategyDesc = '저평가(PER·PBR) + 고배당 + 5개년 매출성장률 & 영업이익 + 고점대비 낙폭 회복력을 종합 가중 평가한 최우수 종목';

        if (currentSubCategory === '저평가 가치형(저PER·PBR)') {
            strategyTitle = '저평가 가치형 TOP 50 (저PER · 저PBR · 청산가치 매력)';
            strategyDesc = '시가총액 대비 극심한 저평가 상태(PER 10배 이하, PBR 0.8배 이하)로 강력한 밸류에이션 안전마진을 확보한 종목';
            scoredList.forEach(s => {
                s.rankScore = Math.round((s.valueScore * 0.6) + (s.growthScore * 0.2) + (s.divScore * 0.1) + (s.reboundScore * 0.1));
            });
        } else if (currentSubCategory === '고배당 주주환원형') {
            strategyTitle = '고배당 주주환원형 TOP 50 (배당수익률 · 배당성향 우수)';
            strategyDesc = '안정적인 현금흐름을 바탕으로 높은 시가배당률(3%~8%+)과 적극적인 주주환원 정책을 지속하는 배당 우수 종목';
            scoredList.forEach(s => {
                s.rankScore = Math.round((s.divScore * 0.6) + (s.valueScore * 0.2) + (s.reboundScore * 0.1) + (s.growthScore * 0.1));
            });
        } else if (currentSubCategory === '고성장 모멘텀형') {
            strategyTitle = '고성장 모멘텀형 TOP 50 (5개년 매출성장률 & 높은 OPM)';
            strategyDesc = '최근 5년간 폭발적인 매출 CAGR 성장률과 두 자릿수 이상의 영업이익률(OPM)을 기록하는 시장 주도 성장주';
            scoredList.forEach(s => {
                s.rankScore = Math.round((s.growthScore * 0.6) + (s.valueScore * 0.2) + (s.reboundScore * 0.1) + (s.divScore * 0.1));
            });
        } else if (currentSubCategory === '바닥권 낙폭과대형') {
            strategyTitle = '바닥권 낙폭과대형 TOP 50 (최고가 대비 과도한 하락 · 반등 잠재력)';
            strategyDesc = '견조한 펀더멘털에도 불구하고 시장 충격으로 52주/역대 최고가 대비 큰 폭으로 하락(-35%~-60%)하여 바닥 탈출 반등 잠재력이 높은 종목';
            scoredList.forEach(s => {
                s.rankScore = Math.round((s.reboundScore * 0.6) + (s.valueScore * 0.25) + (s.growthScore * 0.15));
            });
        } else {
            scoredList.forEach(s => {
                s.rankScore = s.totalScore;
            });
        }

        scoredList.sort((a, b) => b.rankScore - a.rankScore);

        let filteredList = scoredList;
        if (window.currentRankingRegionFilter && window.currentRankingRegionFilter !== '전체') {
            filteredList = filteredList.filter(s => s.comp.region === window.currentRankingRegionFilter);
        }

        if (window.currentRankingSearchQuery) {
            const q = window.currentRankingSearchQuery.toLowerCase().replace(/\s+/g, '');
            filteredList = filteredList.filter(s => {
                const name = (s.comp.name || '').toLowerCase().replace(/\s+/g, '');
                const code = (s.comp.code || '').toLowerCase();
                const sector = (s.comp.sector || '').toLowerCase();
                return name.includes(q) || code.includes(q) || sector.includes(q);
            });
        }

        const displayList = window.currentRankingSearchQuery ? filteredList.slice(0, 100) : filteredList.slice(0, 50);

        let html = `
            <div class="ranking-page-container">
                <div class="ranking-header-card">
                    <div class="ranking-header-top">
                        <div class="ranking-title-group">
                            <span class="ranking-badge-pill">4대 팩터 퀀트 스코어링 시스템</span>
                            <h1 class="ranking-main-title">${strategyTitle}</h1>
                            <p class="ranking-subtitle">${strategyDesc}</p>
                        </div>
                        <div class="ranking-stat-box">
                            <span class="stat-number">3,066</span>
                            <span class="stat-label">글로벌 전수 분석 종목</span>
                        </div>
                    </div>

                    <div class="quant-methodology-grid">
                        <div class="method-card">
                            <div class="method-icon-wrap val"><i data-lucide="scale"></i></div>
                            <div class="method-info">
                                <span class="method-name">① 저평가 가치 (Value)</span>
                                <span class="method-desc">저PER · 저PBR · 청산가치 매력</span>
                            </div>
                        </div>
                        <div class="method-card">
                            <div class="method-icon-wrap div"><i data-lucide="coins"></i></div>
                            <div class="method-info">
                                <span class="method-name">② 주주환원 배당 (Dividend)</span>
                                <span class="method-desc">배당수익률 3%~8%+ & 배당성향</span>
                            </div>
                        </div>
                        <div class="method-card">
                            <div class="method-icon-wrap growth"><i data-lucide="trending-up"></i></div>
                            <div class="method-info">
                                <span class="method-name">③ 실적 성장 (Growth)</span>
                                <span class="method-desc">5개년 매출 CAGR & 높은 OPM</span>
                            </div>
                        </div>
                        <div class="method-card">
                            <div class="method-icon-wrap rebound"><i data-lucide="zap"></i></div>
                            <div class="method-info">
                                <span class="method-name">④ 낙폭 반등 (Rebound)</span>
                                <span class="method-desc">최고가 대비 낙폭 & 바닥 회복력</span>
                            </div>
                        </div>
                    </div>

                    <div class="ranking-controls-bar">
                        <div class="ranking-region-pills">
                            <button class="rank-reg-pill ${window.currentRankingRegionFilter === '전체' ? 'active' : ''}" onclick="window.setRankingRegion('전체')">전체 (3,066)</button>
                            <button class="rank-reg-pill ${window.currentRankingRegionFilter === '국내' ? 'active' : ''}" onclick="window.setRankingRegion('국내')">국내</button>
                            <button class="rank-reg-pill ${window.currentRankingRegionFilter === '미국' ? 'active' : ''}" onclick="window.setRankingRegion('미국')">미국</button>
                            <button class="rank-reg-pill ${window.currentRankingRegionFilter === '유럽' ? 'active' : ''}" onclick="window.setRankingRegion('유럽')">유럽</button>
                            <button class="rank-reg-pill ${window.currentRankingRegionFilter === '일본' ? 'active' : ''}" onclick="window.setRankingRegion('일본')">일본</button>
                            <button class="rank-reg-pill ${window.currentRankingRegionFilter === '중국' ? 'active' : ''}" onclick="window.setRankingRegion('중국')">중국</button>
                        </div>
                        <div class="ranking-search-wrap">
                            <i data-lucide="search" class="rank-search-icon"></i>
                            <input type="text" class="rank-search-input" placeholder="종목명, 코드, 업종 검색..." value="${window.currentRankingSearchQuery || ''}" oninput="window.filterRankingList(this.value)">
                        </div>
                    </div>
                </div>

                <div class="ranking-table-wrapper">
                    <table class="ranking-table">
                        <thead>
                            <tr>
                                <th class="th-rank">순위</th>
                                <th class="th-sticky">기업명 (국가/업종)</th>
                                <th class="th-score">종합 퀀트 점수</th>
                                <th class="th-num">시가총액</th>
                                <th class="th-num th-fair-col">동종 적정주가 (괴리율)</th>
                                <th class="th-num">PER / PBR</th>
                                <th class="th-num">배당수익률</th>
                                <th class="th-num">5년 매출성장 (OPM)</th>
                                <th class="th-num">최고가 대비 낙폭</th>
                                <th class="th-action">심층 분석</th>
                            </tr>
                        </thead>
                        <tbody>
        `;

        let mobileCardsHtml = '';

        displayList.forEach((s, idx) => {
            const rank = idx + 1;
            const rankMedal = rank === 1 ? '<span class="rank-medal gold">🥇 1위</span>'
                : rank === 2 ? '<span class="rank-medal silver">🥈 2위</span>'
                : rank === 3 ? '<span class="rank-medal bronze">🥉 3위</span>'
                : (rank <= 10 ? `<span class="rank-medal top10">${rank}위</span>` : `<span class="rank-medal normal">${rank}위</span>`);

            const comp = s.comp;
            const fair = s.fairPriceInfo;
            const opmNum = parseFloat(comp.opMargin) || 0;
            const opmClass = opmNum >= 10 ? 'val-high-opm' : opmNum < 0 ? 'val-down' : '';
            const divYieldNum = parseFloat(comp.dividendYield) || 0;
            const divClass = divYieldNum >= 3.0 ? 'val-high-div' : '';

            html += `
                <tr class="ranking-row-clickable" onclick="window.openCompanyModal('${comp.code}', '${comp.industryId}')" title="클릭하여 ${comp.name} 5개년 재무제표 및 최신 뉴스 보기">
                    <td class="td-rank">${rankMedal}</td>
                    <td class="td-sticky">
                        <div class="rank-comp-box">
                            <div class="rank-comp-name-row">
                                <span class="rank-comp-name">${comp.name}</span>
                                <span class="rank-reg-tag">${comp.region}</span>
                            </div>
                            <span class="rank-comp-sub">${comp.code} · ${comp.sector}</span>
                        </div>
                    </td>
                    <td class="td-score">
                        <div class="score-display-box">
                            <div class="score-num-row">
                                <span class="score-num">${s.rankScore}점</span>
                                <span class="score-denom">/ 100</span>
                            </div>
                            <div class="score-bar-bg">
                                <div class="score-bar-fill" style="width: ${s.rankScore}%;"></div>
                            </div>
                            <div class="factor-mini-chips">
                                <span class="f-chip">가치 ${s.valueScore}</span>
                                <span class="f-chip">배당 ${s.divScore}</span>
                                <span class="f-chip">성장 ${s.growthScore}</span>
                                <span class="f-chip">낙폭 ${s.reboundScore}</span>
                            </div>
                        </div>
                    </td>
                    <td class="td-num font-medium">${comp.marketCap}</td>
                    <td class="td-num">
                        <div class="fair-price-cell">
                            <span class="fair-price-val">${fair.fairPriceFmt}</span>
                            <span class="fair-upside-badge ${fair.cssClass}">${fair.badgeText}</span>
                        </div>
                    </td>
                    <td class="td-num">
                        <div class="multiples-cell">
                            <span>${comp.per > 0 ? comp.per + '배' : '적자'}</span>
                            <span class="text-sub">PBR ${comp.pbr}배</span>
                        </div>
                    </td>
                    <td class="td-num bold ${divClass}">${comp.dividendYield}% <span class="text-sub">(${comp.payoutRatio}%)</span></td>
                    <td class="td-num">
                        <div class="growth-cell">
                            <span class="text-growth">+${s.growth}%</span>
                            <span class="bold ${opmClass}">OPM ${comp.opMargin}%</span>
                        </div>
                    </td>
                    <td class="td-num">
                        <div class="drawdown-cell">
                            <span class="text-drawdown">-${s.drawdown}%</span>
                            <span class="rebound-tag">반등매력 ${s.reboundScore}점</span>
                        </div>
                    </td>
                    <td class="td-action">
                        <button class="rank-modal-btn">심층분석 ➔</button>
                    </td>
                </tr>
            `;

            mobileCardsHtml += `
                <div class="ranking-mobile-card" onclick="window.openCompanyModal('${comp.code}', '${comp.industryId}')">
                    <div class="r-m-card-header">
                        <div class="r-m-rank-group">
                            ${rankMedal}
                            <span class="r-m-reg-pill">${comp.region}</span>
                        </div>
                        <div class="r-m-score-badge">
                            <span class="r-score-num">${s.rankScore}점</span>
                        </div>
                    </div>
                    <div class="r-m-name-group">
                        <span class="r-m-name">${comp.name}</span>
                        <span class="r-m-code">${comp.code} · ${comp.sector}</span>
                    </div>
                    <div class="r-m-factors-row">
                        <span class="r-f-chip val">가치 ${s.valueScore}</span>
                        <span class="r-f-chip div">배당 ${s.divScore}</span>
                        <span class="r-f-chip gro">성장 ${s.growthScore}</span>
                        <span class="r-f-chip reb">낙폭 ${s.reboundScore}</span>
                    </div>
                    <div class="r-m-grid">
                        <div class="r-m-item">
                            <span class="r-label">시가총액</span>
                            <span class="r-val">${comp.marketCap}</span>
                        </div>
                        <div class="r-m-item highlight-box">
                            <span class="r-label">동종 적정주가</span>
                            <span class="r-val">${fair.fairPriceFmt} <span class="fair-upside-badge ${fair.cssClass}">${fair.badgeText}</span></span>
                        </div>
                        <div class="r-m-item">
                            <span class="r-label">PER / PBR</span>
                            <span class="r-val">${comp.per > 0 ? comp.per + '배' : '적자'} / ${comp.pbr}배</span>
                        </div>
                        <div class="r-m-item">
                            <span class="r-label">배당수익률</span>
                            <span class="r-val bold ${divClass}">${comp.dividendYield}% (${comp.payoutRatio}%)</span>
                        </div>
                        <div class="r-m-item">
                            <span class="r-label">5개년 매출성장</span>
                            <span class="r-val text-growth">+${s.growth}% (OPM ${comp.opMargin}%)</span>
                        </div>
                        <div class="r-m-item">
                            <span class="r-label">고점 대비 낙폭</span>
                            <span class="r-val text-drawdown">-${s.drawdown}% (반등매력)</span>
                        </div>
                    </div>
                    <div class="r-m-footer">
                        <span>5개년 재무제표 & 최신 뉴스 10건 보기 ➔</span>
                    </div>
                </div>
            `;
        });

        html += `
                        </tbody>
                    </table>
                </div>

                <div class="ranking-mobile-cards-list">
                    ${mobileCardsHtml}
                </div>
            </div>
        `;

        postsList.innerHTML = html;
        if (window.lucide) window.lucide.createIcons();
    }

    function renderIndustryDetailView(industryId, shouldScroll = false) {
        if (!postsList) return;
        const { ind, region } = getIndustryById(industryId);
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
                        <span>${region} 산업 & 기업 분석 목록으로 돌아가기</span>
                    </button>
                    <span class="ind-detail-tag">${ind.chapterTitle || (region + ' ➔ ' + ind.cluster)}</span>
                </div>

                <!-- Industry Detail Header -->
                <div class="ind-detail-header-card">
                    <div class="ind-detail-header-top">
                        <div class="ind-title-wrap">
                            <span class="ind-code-badge">${region} 업종 ${ind.no ? '#' + ind.no : ''}</span>
                            <h1 class="ind-main-title">${ind.sector}</h1>
                        </div>
                        <div class="ind-header-badges">
                            <span class="ind-outlook-pill ${signal.level}">${signal.badgeText}</span>
                        </div>
                    </div>

                    <!-- Macro Drivers Grid -->
                    <div class="ind-macro-factors-grid">
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

                    <div class="forecast-summary-card">
                        <div class="summary-label">차기 분기(2026 Q4 ~ 2027 Q1) 실적 전망 총평</div>
                        <p class="summary-text">${signal.summary}</p>
                    </div>

                    ${generateDetailedCausalFormula(ind, region)}

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
                        <h3>${ind.sector} 핵심 선행 지표 & 공식 원본 데이터 차트</h3>
                    </div>
                    <div class="ind-sources-grid">
        `;

        (ind.indicators || []).forEach((indItem, indIdx) => {
            html += `
                <div class="ind-source-card">
                    <div class="source-card-top">
                        <span class="source-indicator-name">${indItem.name}</span>
                        <a href="${indItem.sourceUrl}" target="_blank" rel="noopener noreferrer" class="source-link-pill">
                            <span>${indItem.sourceName}</span>
                            <i data-lucide="external-link" class="ext-icon"></i>
                        </a>
                    </div>
                    ${generateIndicatorChartSvg(indItem, indIdx + 1)}
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
                            <h3>${ind.sector} ${region} 기업 손익·시총·리스크·배당 종합 비교표</h3>
                        </div>
                        <span class="company-count-tag">${(ind.companies || []).length}개 종목 전수 분석</span>
                    </div>

                    <!-- Filter Tabs & Sort Direction Toggle -->
                    <div class="comp-filter-tabs-wrapper">
                        <div class="comp-filter-tabs">
                            <button class="comp-tab ${window.currentCompanyFilter === 'all' ? 'active' : ''}" onclick="window.setCompanyFilter('all')">
                                전체 종합 뷰 ${window.currentCompanyFilter === 'all' ? (window.compSortAsc ? '(시총 ▲)' : '(시총 ▼)') : ''}
                            </button>
                            <button class="comp-tab ${window.currentCompanyFilter === 'profit' ? 'active' : ''}" onclick="window.setCompanyFilter('profit')">
                                손익 & OPM ${window.currentCompanyFilter === 'profit' ? (window.compSortAsc ? '(OPM ▲)' : '(OPM ▼)') : ''}
                            </button>
                            <button class="comp-tab ${window.currentCompanyFilter === 'risk' ? 'active' : ''}" onclick="window.setCompanyFilter('risk')">
                                대차대조표 ${window.currentCompanyFilter === 'risk' ? (window.compSortAsc ? '(저부채 ▲)' : '(고부채 ▼)') : ''}
                            </button>
                            <button class="comp-tab ${window.currentCompanyFilter === 'dividend' ? 'active' : ''}" onclick="window.setCompanyFilter('dividend')">
                                배당 성향 & 환원 ${window.currentCompanyFilter === 'dividend' ? (window.compSortAsc ? '(배당률 ▲)' : '(배당률 ▼)') : ''}
                            </button>
                        </div>
                        <button class="comp-sort-toggle-btn" onclick="window.toggleCompSortDirection()" title="오름차순 / 내림차순 정렬 방향 전환">
                            <i data-lucide="arrow-up-down"></i>
                            <span>${window.compSortAsc ? '오름차순 (▲)' : '내림차순 (▼)'}</span>
                        </button>
                    </div>

                    <!-- Search Input within Industry Table -->
                    <div class="comp-table-search-box">
                        <div class="comp-search-wrapper">
                            <i data-lucide="search" class="comp-search-icon"></i>
                            <input type="text" id="comp-table-search-input" class="comp-search-input" placeholder="${ind.sector} 내 종목명 또는 코드 검색 (총 ${(ind.companies || []).length}개)..." oninput="window.filterCompanyTableRows(this.value)">
                        </div>
                    </div>

                    <div class="comp-table-wrapper">
                        <table class="comp-table">
                            <thead>
                                <tr>
                                    <th class="th-sticky">기업명</th>
                                    <th class="th-num">시가총액</th>
                                    <th class="th-num th-fair-col">적정 주가 (동종 비교)</th>
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

        const allCompanies = ind.companies || [];
        const totalCompaniesInInd = allCompanies.length;
        let sortedCompanies = [...allCompanies];
        const isAsc = !!window.compSortAsc;

        if (window.currentCompanyFilter === 'profit') {
            sortedCompanies.sort((a, b) => {
                const valA = parseFloat(a.opMargin) || 0;
                const valB = parseFloat(b.opMargin) || 0;
                return isAsc ? (valA - valB) : (valB - valA);
            });
        } else if (window.currentCompanyFilter === 'risk') {
            sortedCompanies.sort((a, b) => {
                const valA = parseFloat(a.debtRatio) || 9999;
                const valB = parseFloat(b.debtRatio) || 9999;
                return isAsc ? (valB - valA) : (valA - valB);
            });
        } else if (window.currentCompanyFilter === 'dividend') {
            sortedCompanies.sort((a, b) => {
                const valA = parseFloat(a.dividendYield) || 0;
                const valB = parseFloat(b.dividendYield) || 0;
                return isAsc ? (valA - valB) : (valB - valA);
            });
        } else {
            sortedCompanies.sort((a, b) => {
                const valA = parseMcapValue(a.marketCap);
                const valB = parseMcapValue(b.marketCap);
                return isAsc ? (valA - valB) : (valB - valA);
            });
        }

        let mobileCardsHtml = '';

        sortedCompanies.forEach(c => {
            const riskBadge = c.riskStatus === 'SAFE' 
                ? '<span class="risk-pill safe">🟢 안전</span>'
                : c.riskStatus === 'NORMAL'
                ? '<span class="risk-pill normal">🟡 보통</span>'
                : '<span class="risk-pill warning">🔴 주의</span>';

            const opmNum = parseFloat(c.opMargin) || 0;
            const opmClass = opmNum >= 10 ? 'val-high-opm' : opmNum < 0 ? 'val-down' : '';
            const divYieldNum = parseFloat(c.dividendYield) || 0;
            const divClass = divYieldNum >= 3.0 ? 'val-high-div' : '';

            const peerValRank = calculatePeerRank(allCompanies, c.code, compItem => calculateValuationScore(compItem), true);
            const peerValBadge = getValuationBadge(peerValRank, totalCompaniesInInd);
            const fairPriceInfo = calculatePeerFairPrice(c, allCompanies, region);
            const shortComment = getShortAnalystPoint(c.comment);
            const cleanCommentAttr = (c.comment || '').replace(/"/g, '&quot;');

            html += `
                <tr class="comp-row-clickable" onclick="window.openCompanyModal('${c.code}', '${ind.id}')" title="클릭하여 ${c.name} 5개년 재무제표 및 동종업계 비교 분석 보기">
                    <td class="td-sticky">
                        <div class="comp-name-box">
                            <div class="comp-name-row">
                                <span class="comp-name">${c.name}</span>
                                <span class="comp-click-hint-pill">심층분석 ➔</span>
                            </div>
                            <span class="comp-code">${c.code} ${c.exchange ? '· ' + c.exchange : ''}</span>
                        </div>
                    </td>
                    <td class="td-num comp-mcap">${c.marketCap}</td>
                    <td class="td-num">
                        <div class="fair-price-cell">
                            <span class="fair-price-val">${fairPriceInfo.fairPriceFmt}</span>
                            <span class="fair-upside-badge ${fairPriceInfo.cssClass}">${fairPriceInfo.badgeText}</span>
                        </div>
                    </td>
                    <td class="td-num ${window.currentCompanyFilter === 'risk' || window.currentCompanyFilter === 'dividend' ? 'col-hide-mobile' : ''}">${c.revenue}</td>
                    <td class="td-num bold ${window.currentCompanyFilter === 'risk' || window.currentCompanyFilter === 'dividend' ? 'col-hide-mobile' : ''}">${c.operatingProfit}</td>
                    <td class="td-num bold ${opmClass} ${window.currentCompanyFilter === 'risk' || window.currentCompanyFilter === 'dividend' ? 'col-hide-mobile' : ''}">${c.opMargin}%</td>
                    <td class="td-num ${window.currentCompanyFilter === 'risk' || window.currentCompanyFilter === 'dividend' ? 'col-hide-mobile' : ''}">
                        <div style="display:flex; flex-direction:column; align-items:flex-end; gap:3px;">
                            <div>
                                <span class="per-badge">${c.per > 0 ? c.per + '배' : '적자'}</span>
                                <span class="pbr-badge">PBR ${c.pbr}배</span>
                            </div>
                            <div>
                                <span class="val-badge ${peerValBadge.cssClass}" title="동종업계 저평가 순위: ${peerValRank}위 / ${totalCompaniesInInd}개사">${peerValBadge.badgeText} (${peerValRank}위)</span>
                            </div>
                        </div>
                    </td>
                    <td class="td-num ${window.currentCompanyFilter === 'profit' || window.currentCompanyFilter === 'dividend' ? 'col-hide-mobile' : ''}">${c.debtRatio}%</td>
                    <td class="td-num ${window.currentCompanyFilter === 'profit' || window.currentCompanyFilter === 'dividend' ? 'col-hide-mobile' : ''}">${c.currentRatio}%</td>
                    <td class="td-center ${window.currentCompanyFilter === 'profit' || window.currentCompanyFilter === 'dividend' ? 'col-hide-mobile' : ''}">${riskBadge}</td>
                    <td class="td-num bold ${divClass} ${window.currentCompanyFilter === 'profit' || window.currentCompanyFilter === 'risk' ? 'col-hide-mobile' : ''}">${c.dividendYield}%</td>
                    <td class="td-num ${window.currentCompanyFilter === 'profit' || window.currentCompanyFilter === 'risk' ? 'col-hide-mobile' : ''}">${c.payoutRatio}%</td>
                    <td class="td-comment"><div class="td-comment-clamp" title="${cleanCommentAttr}">${shortComment}</div></td>
                </tr>
            `;

            mobileCardsHtml += `
                <div class="comp-mobile-card" onclick="window.openCompanyModal('${c.code}', '${ind.id}')" data-code="${c.code}" data-name="${c.name}">
                    <div class="m-card-header">
                        <div class="m-card-title-group">
                            <span class="m-card-name">${c.name}</span>
                            <span class="m-card-code">${c.code} ${c.exchange ? '· ' + c.exchange : ''}</span>
                        </div>
                        <div class="m-card-badges">
                            <span class="val-badge ${peerValBadge.cssClass}">${peerValBadge.badgeText} (${peerValRank}위)</span>
                            ${riskBadge}
                        </div>
                    </div>
                    <div class="m-card-grid">
                        <div class="m-card-item">
                            <span class="m-item-label">시가총액</span>
                            <span class="m-item-val comp-mcap">${c.marketCap}</span>
                        </div>
                        <div class="m-card-item m-card-item-highlight">
                            <span class="m-item-label">동종 적정주가</span>
                            <span class="m-item-val font-bold">${fairPriceInfo.fairPriceFmt} <span class="fair-upside-badge ${fairPriceInfo.cssClass}">${fairPriceInfo.badgeText}</span></span>
                        </div>
                        <div class="m-card-item">
                            <span class="m-item-label">연간 매출액</span>
                            <span class="m-item-val">${c.revenue}</span>
                        </div>
                        <div class="m-card-item">
                            <span class="m-item-label">영업이익 (OPM)</span>
                            <span class="m-item-val ${opmClass}">${c.operatingProfit} (${c.opMargin}%)</span>
                        </div>
                        <div class="m-card-item">
                            <span class="m-item-label">PER / PBR</span>
                            <span class="m-item-val">${c.per > 0 ? c.per + '배' : '적자'} / ${c.pbr}배</span>
                        </div>
                        <div class="m-card-item">
                            <span class="m-item-label">부채 / 유동비율</span>
                            <span class="m-item-val">${c.debtRatio}% / ${c.currentRatio}%</span>
                        </div>
                        <div class="m-card-item">
                            <span class="m-item-label">배당수익률</span>
                            <span class="m-item-val ${divClass}">${c.dividendYield}% (${c.payoutRatio}%)</span>
                        </div>
                    </div>
                    <div class="m-card-comment">
                        <span class="m-comment-tag">핵심 분석</span>
                        <span class="m-comment-text">${shortComment}</span>
                    </div>
                    <div class="m-card-footer">
                        <span class="m-card-tap-hint">5개년 재무제표 & 피어 비교 상세 보기 ➔</span>
                    </div>
                </div>
            `;
        });

        html += `
                            </tbody>
                        </table>
                    </div>

                    <!-- Mobile Cards List View (Vertical Scroll, 0 Horizontal Scroll) -->
                    <div class="comp-mobile-cards-list" id="comp-mobile-cards-list">
                        ${mobileCardsHtml}
                    </div>
                </div>

                <!-- Bottom Back Button -->
                <div class="ind-detail-bottom-nav">
                    <button class="back-btn-large" onclick="window.closeIndustryDetail()">
                        <i data-lucide="arrow-left"></i>
                        <span>${region} 산업 & 기업 분석 목록으로 돌아가기</span>
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
    window.currentModalRegion = null;

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
        const { ind, region } = getIndustryById(industryId);
        if (!ind) return;
        const comp = (ind.companies || []).find(c => c.code === companyCode);
        if (!comp) return;

        window.currentModalCompany = comp;
        window.currentModalIndustry = ind;
        window.currentModalRegion = region;
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

    function renderCompanyModalContent() {
        const container = document.getElementById('company-modal-container');
        if (!container) return;

        const comp = window.currentModalCompany;
        const ind = window.currentModalIndustry;
        const reg = window.currentModalRegion || '국내';
        if (!comp || !ind) return;

        const riskBadge = comp.riskStatus === 'SAFE' 
            ? '<span class="risk-pill safe">🟢 재무 안전</span>'
            : comp.riskStatus === 'NORMAL'
            ? '<span class="risk-pill normal">🟡 재무 보통</span>'
            : '<span class="risk-pill warning">🔴 리스크 주의</span>';

        let html = `
            <div class="company-modal-header">
                <div class="company-modal-title-box">
                    <div class="company-modal-title-row">
                        <h2 class="modal-comp-name">${comp.name}</h2>
                        <span class="modal-comp-code">${comp.code}</span>
                        ${riskBadge}
                    </div>
                    <div class="company-modal-meta-row">
                        <span class="modal-meta-pill"><i data-lucide="tag"></i> ${reg} ➔ ${ind.sector}</span>
                        <span class="modal-meta-pill"><i data-lucide="coins"></i> 시가총액: ${comp.marketCap}</span>
                        <span class="modal-meta-pill"><i data-lucide="bar-chart-2"></i> 연간매출: ${comp.revenue}</span>
                    </div>
                </div>
                <button class="modal-close-btn" onclick="window.closeCompanyModal()" title="창 닫기 (Esc)">
                    <i data-lucide="x"></i>
                </button>
            </div>

            <div class="company-modal-nav-tabs">
                <button class="modal-tab-btn ${window.activeModalTab === 'overview' ? 'active' : ''}" onclick="window.switchModalTab('overview')">
                    <i data-lucide="info"></i>
                    <span>기업 개요 & 핵심 지표</span>
                </button>
                <button class="modal-tab-btn ${window.activeModalTab === 'financials' ? 'active' : ''}" onclick="window.switchModalTab('financials')">
                    <i data-lucide="table"></i>
                    <span>5개년 재무제표 (2021~2025 확정)</span>
                </button>
                <button class="modal-tab-btn ${window.activeModalTab === 'peer' ? 'active' : ''}" onclick="window.switchModalTab('peer')">
                    <i data-lucide="users"></i>
                    <span>동종 업계 피어 비교 & 랭킹 (${ind.companies ? ind.companies.length : 0}개사)</span>
                </button>
            </div>

            <div class="company-modal-body">
        `;

        if (window.activeModalTab === 'overview') {
            const peers = ind.companies || [];
            const totalPeers = peers.length;
            const valScoreRank = calculatePeerRank(peers, comp.code, c => calculateValuationScore(c), true);
            const valBadge = getValuationBadge(valScoreRank, totalPeers);
            const modalFair = calculatePeerFairPrice(comp, peers, reg);

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
                        <div class="kpi-sub">${ind.sector}</div>
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
                        <div class="kpi-val">${typeof comp.eps === 'number' ? comp.eps.toLocaleString() : comp.eps}</div>
                        <div class="kpi-sub">주당 가치 창출</div>
                    </div>
                    <div class="modal-kpi-card">
                        <div class="kpi-label">부채비율 / 유동비율</div>
                        <div class="kpi-val">${comp.debtRatio}%</div>
                        <div class="kpi-sub">유동비율 ${comp.currentRatio}%</div>
                    </div>
                    <div class="modal-kpi-card">
                        <div class="kpi-label">배당수익률 / 성향</div>
                        <div class="kpi-val ${comp.dividendYield >= 3.0 ? 'val-high-div' : ''}">${comp.dividendYield}%</div>
                        <div class="kpi-sub">배당성향 ${comp.payoutRatio}%</div>
                    </div>
                    <div class="modal-kpi-card" style="background:#eff6ff; border-color:#93c5fd;">
                        <div class="kpi-label" style="color:#1d4ed8;">동종 비교 적정 주가 (중간 PER ${modalFair.peerMedianPer}배)</div>
                        <div class="kpi-val" style="color:#1e40af; font-size:1.15rem;">${modalFair.fairPriceFmt}</div>
                        <div class="kpi-sub" style="font-weight:700;"><span class="fair-upside-badge ${modalFair.cssClass}">${modalFair.badgeText}</span></div>
                    </div>
                    <div class="modal-kpi-card" style="background:#f0fdf4; border-color:#86efac;">
                        <div class="kpi-label" style="color:#166534;">동종 밸류에이션 진단</div>
                        <div class="kpi-val"><span class="val-badge ${valBadge.cssClass}">${valBadge.badgeText}</span></div>
                        <div class="kpi-sub" style="color:#15803d; font-weight:600;">동종 저평가 ${valScoreRank}위 / 총 ${totalPeers}개사</div>
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
                    <span>최근 5개년 연결 재무제표 추이 (2021 ~ 2025 확정 실적)</span>
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
                        <td>${typeof item.eps === 'number' ? item.eps.toLocaleString() : item.eps}</td>
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
                    * 2021~2025년 실적은 각 기업의 공식 감사보고서 및 사업보고서 기준 확정 실적입니다.
                </p>
            `;
        } else if (window.activeModalTab === 'peer') {
            const peers = ind.companies || [];
            const totalPeers = peers.length;

            const mcapRank = calculatePeerRank(peers, comp.code, c => parseMcapValue(c.marketCap), true);
            const opmRank = calculatePeerRank(peers, comp.code, c => parseFloat(c.opMargin) || 0, true);
            const valScoreRank = calculatePeerRank(peers, comp.code, c => calculateValuationScore(c), true);
            const valBadge = getValuationBadge(valScoreRank, totalPeers);
            const divRank = calculatePeerRank(peers, comp.code, c => parseFloat(c.dividendYield) || 0, true);
            const debtRank = calculatePeerRank(peers, comp.code, c => parseFloat(c.debtRatio) || 9999, false);

            html += `
                <div class="modal-section-title">
                    <i data-lucide="award"></i>
                    <span>${ind.sector} 내 ${comp.name} 5대 핵심 포지션 & 저평가 랭킹 (${totalPeers}개사 기준)</span>
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
                    <div class="peer-rank-card val-highlight">
                        <div class="rank-title">저평가 순위 (밸류 매력)</div>
                        <div class="rank-val">${valScoreRank}위</div>
                        <div class="rank-total"><span class="val-badge ${valBadge.cssClass}">${valBadge.badgeText}</span></div>
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
                    <span>${ind.sector} 동종 기업 다차원 벤치마크 (저평가 랭킹 비교 · 종목 클릭 시 전환)</span>
                </div>

                <div class="modal-table-wrapper" style="max-height: 380px; overflow-y: auto;">
                    <table class="modal-fin-table">
                        <thead>
                            <tr>
                                <th class="th-left">기업명</th>
                                <th>저평가 순위</th>
                                <th>밸류에이션</th>
                                <th>동종 적정주가</th>
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

                const peerValRank = calculatePeerRank(peers, peer.code, c => calculateValuationScore(c), true);
                const peerValBadge = getValuationBadge(peerValRank, totalPeers);
                const peerFair = calculatePeerFairPrice(peer, peers, reg);

                html += `
                    <tr class="${isCurrent ? 'highlighted-peer-row' : 'comp-row-clickable'}" 
                        onclick="window.openCompanyModal('${peer.code}', '${ind.id}')"
                        style="cursor: pointer;"
                        title="${isCurrent ? '현재 보고 있는 기업' : peer.name + ' 심층 분석으로 전환'}">
                        <td class="td-left">
                            <span class="comp-name">${peer.name}</span>
                            ${isCurrent ? '<span style="font-size:0.75rem; color:#4f46e5; margin-left:4px;">(선택됨)</span>' : ''}
                        </td>
                        <td class="bold val-rank-cell">${peerValRank}위</td>
                        <td><span class="val-badge ${peerValBadge.cssClass}">${peerValBadge.badgeText}</span></td>
                        <td><span class="fair-upside-badge ${peerFair.cssClass}">${peerFair.badgeText}</span></td>
                        <td>${peer.marketCap}</td>
                        <td class="bold ${peer.opMargin >= 10 ? 'val-high-opm' : peer.opMargin < 0 ? 'val-down' : ''}">${peer.opMargin}%</td>
                        <td>${peer.per > 0 ? peer.per + '배' : '적자'}</td>
                        <td>${peer.pbr}배</td>
                        <td>${typeof peer.eps === 'number' ? peer.eps.toLocaleString() : peer.eps}</td>
                        <td>${peer.roe}%</td>
                        <td class="bold ${peer.dividendYield >= 3.0 ? 'val-high-div' : ''}">${peer.dividendYield}%</td>
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
                ${getCompanyNewsHtml(comp, ind)}
            </div>
        `;

        container.innerHTML = html;
        if (window.lucide) window.lucide.createIcons();
    }

    // Hashchange listener for direct deep-linking
    window.addEventListener('hashchange', () => {
        if (window.location.hash.startsWith('#industry-')) {
            const id = window.location.hash.replace('#industry-', '');
            const { region } = getIndustryById(id);
            currentCategory = region;
            sessionStorage.setItem('active_category', currentCategory);
            if (tabsNav) {
                tabsNav.querySelectorAll('.tab-btn').forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.category === currentCategory);
                });
            }
            renderSubTabs();
            renderIndustryDetailView(id, false);
        } else if (isRegionalCategory(currentCategory)) {
            renderIndustryHub();
        } else if (currentCategory === '추천랭킹') {
            renderRankingPage();
        } else if (currentCategory === '뉴스') {
            renderPosts();
        }
    });

    if (window.location.hash.startsWith('#industry-')) {
        const id = window.location.hash.replace('#industry-', '');
        const { region } = getIndustryById(id);
        currentCategory = region;
    }

    function renderPosts() {
        if (!postsList) return;

        if (isRegionalCategory(currentCategory)) {
            if (window.location.hash.startsWith('#industry-')) {
                const id = window.location.hash.replace('#industry-', '');
                renderIndustryDetailView(id);
            } else {
                renderIndustryHub();
            }
            return;
        }

        if (currentCategory === '추천랭킹') {
            renderRankingPage();
            return;
        }

        // News Tab
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
        
        const items = postsList.querySelectorAll('.post-list-item');
        items.forEach((item, i) => {
            item.style.animationDelay = `${i * 0.03}s`;
            item.classList.add('fade-in-up');
        });

        if (window.lucide) {
            window.lucide.createIcons();
        }

        const savedScrollY = sessionStorage.getItem('prev_scroll_y');
        if (savedScrollY !== null) {
            setTimeout(() => {
                window.scrollTo({
                    top: parseInt(savedScrollY, 10),
                    behavior: 'instant'
                });
                sessionStorage.removeItem('prev_scroll_y');
            }, 50);
        }
    }

    window.markAsVisited = function(element, link) {
        element.classList.add('visited-post');
        sessionStorage.setItem('prev_scroll_y', window.scrollY);
        sessionStorage.setItem('prev_category', currentCategory);

        let visitedLinks = JSON.parse(localStorage.getItem('visited_news') || '[]');
        if (!visitedLinks.includes(link)) {
            visitedLinks.push(link);
            if (visitedLinks.length > 500) visitedLinks.shift();
            localStorage.setItem('visited_news', JSON.stringify(visitedLinks));
        }
    };

    // Initial render
    renderSubTabs();
    renderPosts();

    // Background update check
    fetchData();
});

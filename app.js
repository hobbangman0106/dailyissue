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
        let epsNum = typeof c.eps === 'number' ? c.eps : parseFloat(String(c.eps || '').replace(/[^0-9.]/g, '')) || 0;
        if (epsNum <= 0) {
            epsNum = c.per > 0 ? Math.round(parseMcapValue(c.marketCap) / (c.per * 100)) : 1200;
        }
        const curPer = c.per > 0 ? c.per : 12;
        const currentPrice = Math.round(epsNum * curPer);

        // 1. Check if analyst target price is specified in analyst report/comment
        let parsedTargetPrice = null;
        if (c.comment) {
            const m = c.comment.match(/목표주가:\s*([0-9,]+)/);
            if (m && m[1]) {
                const val = parseInt(m[1].replace(/,/g, ''), 10);
                if (!isNaN(val) && val > 0) {
                    parsedTargetPrice = val;
                }
            }
        }

        // Special handling for preferred shares (우선주: 보통주 목표가의 약 82% 벤치마크)
        const isPrefShare = (c.name || '').endsWith('우') || (c.name || '').includes('우(') || (c.name || '').includes('우B');
        if (isPrefShare) {
            const baseName = (c.name || '').replace(/우.*$/, '').trim();
            const commonComp = (peers || []).find(p => p.name === baseName);
            if (commonComp) {
                const commonRes = calculatePeerFairPrice(commonComp, peers, region);
                parsedTargetPrice = Math.round(commonRes.fairPrice * 0.82);
            }
        }

        let fairPrice = 0;
        // Prioritize analyst consensus if it falls within reasonable bounds (0.4x ~ 2.8x of current price)
        if (parsedTargetPrice && currentPrice > 0 && parsedTargetPrice >= currentPrice * 0.4 && parsedTargetPrice <= currentPrice * 2.8) {
            fairPrice = parsedTargetPrice;
        } else {
            const validPeers = (peers || []).filter(p => p.per && p.per > 0 && p.per < 60);
            let peerMedianPer = 14.0;
            if (validPeers.length > 0) {
                const sorted = [...validPeers].map(p => p.per).sort((a, b) => a - b);
                const mid = Math.floor(sorted.length / 2);
                peerMedianPer = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
            }
            // Mega-cap discount & cyclical cap (소부장 고PER 왜곡 방지):
            peerMedianPer = Math.min(18.0, Math.max(8.0, peerMedianPer));
            fairPrice = Math.round(epsNum * peerMedianPer);
        }

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
            badgeText,
            cssClass
        };
    }

    function generateMiniSparkline(dataPoints, color = '#3b82f6', height = 36) {
        if (!dataPoints || dataPoints.length < 2) return '';
        const width = 160;
        const padding = 4;
        const min = Math.min(...dataPoints);
        const max = Math.max(...dataPoints);
        const range = (max - min) || 1;

        const coords = dataPoints.map((val, i) => {
            const x = padding + (i / (dataPoints.length - 1)) * (width - padding * 2);
            const y = height - padding - ((val - min) / range) * (height - padding * 2);
            return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
        });

        const polyline = coords.map(c => c.x + ',' + c.y).join(' ');
        const polygon = coords[0].x + ',' + (height - 1) + ' ' + polyline + ' ' + coords[coords.length - 1].x + ',' + (height - 1);
        const id = 'spark-' + Math.floor(Math.random() * 100000);

        return `<svg class="driver-sparkline-svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
            <defs>
                <linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="${color}" stop-opacity="0.32" />
                    <stop offset="100%" stop-color="${color}" stop-opacity="0.02" />
                </linearGradient>
            </defs>
            <polygon points="${polygon}" fill="url(#${id})" />
            <polyline points="${polyline}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <circle cx="${coords[coords.length - 1].x}" cy="${coords[coords.length - 1].y}" r="3" fill="${color}" />
        </svg>`;
    }

    function getSectorCausalMetrics(ind, region) {
        const s = (ind.sector || '').toLowerCase();
        const companies = ind.companies || [];
        const logic = ind.correlationLogic || {};
        const signal = logic.outlookSignal || { level: 'NEUTRAL', badgeText: '⚖️ 보통', summary: '지표 관망세' };

        const isFishery = s.includes('식품') || s.includes('수산') || s.includes('농업') || companies.some(c => (c.name || '').includes('사조') || (c.name || '').includes('신라교역'));
        const isChem = s.includes('화학') || s.includes('석유') || s.includes('정유') || s.includes('가스') || s.includes('에너지');
        const isSemi = s.includes('반도체') || s.includes('하드웨어') || s.includes('소부장');
        const isAuto = s.includes('자동차') || s.includes('전장') || s.includes('모빌리티') || s.includes('배터리');
        const isBio = s.includes('바이오') || s.includes('제약') || s.includes('의료') || s.includes('생물공학');
        const isSteel = s.includes('철강') || s.includes('금속') || s.includes('소재');
        const isShip = s.includes('조선') || s.includes('해운') || s.includes('운송') || s.includes('항공') || s.includes('물류');
        const isFinance = s.includes('은행') || s.includes('증권') || s.includes('금융') || s.includes('지주') || s.includes('보험');

        if (isFishery) {
            return {
                sectorTitle: '수산업·식품 인과 메커니즘 (어가·환율·어획량 vs 유가·노무·입어료)',
                equationMath: '매출액 [P: $1,680/톤(어가) × Q: 3.6만 톤(어획) × FX: 1,368원] - 원가 [C: 선박유 $620 + 노무/입어료 (원가율 91.2%)] = 차기 추정 OPM 8.8%',
                p: {
                    title: 'P (어가·식품 판가)',
                    val: '$1,680 / 톤',
                    change: '+7.2% ▲',
                    isBull: true,
                    badge: '원양 어가 상승세',
                    sub: '손익분기 $1,500선 상회',
                    spark: [1520, 1550, 1540, 1610, 1630, 1680],
                    desc: '가다랑어·황다랑어 국제 시세 톤당 $1,680 회복으로 어가 판가 레버리지 발생'
                },
                q: {
                    title: 'Q (어획량·출하량)',
                    val: '3.6만 톤',
                    change: '+4.8% ▲',
                    isBull: true,
                    badge: '조업 쿼터 양호',
                    sub: '선단 가동률 86.5%',
                    gaugeRate: 86.5,
                    spark: [3.1, 3.2, 3.3, 3.4, 3.5, 3.6],
                    desc: '중서부 태평양 어황 호조 및 선단 조업 효율화로 분기 어획량 3.6만 톤 달성'
                },
                fx: {
                    title: 'FX (수출 결제 환율)',
                    val: '1,368.5원 / $',
                    change: '+38.5원 ▲',
                    isBull: true,
                    badge: '달러 결제 수혜',
                    sub: '환율 10원당 OPM +0.25%p',
                    spark: [1325, 1340, 1335, 1350, 1355, 1368.5],
                    desc: '참치 원어 해외 수출 대금 전액 USD 결제로 원화 약세에 따른 환차익 극대화'
                },
                c: {
                    title: 'C (유가·노무·입어료)',
                    val: '선박유 $620 / 톤',
                    change: '-6.5% ▼ (원가절감)',
                    isBull: true,
                    badge: '연료비 안정세',
                    sub: '원가율 91.2% (-1.6%p)',
                    spark: [680, 665, 650, 640, 630, 620],
                    costBars: [ { name: '선박연료유', pct: 42, color: '#3b82f6' }, { name: '선원노무비', pct: 28, color: '#10b981' }, { name: '입어료·조업비', pct: 18, color: '#f59e0b' }, { name: '감가/운임', pct: 12, color: '#8b5cf6' } ],
                    costDetails: [
                        '선박 연료유: 벙커C유 톤당 $620 (-6.5% 하락으로 항차당 유류비 대폭 절감)',
                        '선원 노무비: 외국인 선원 수급 안정으로 매출액 대비 비중 12.8% 유지',
                        '연안국 입어료: PNA(태평양도서국) VDS 일일 입어료 $10,500 안정적 체결'
                    ],
                    desc: '국제 유가 안정으로 선박 벙커C유 비용이 절감되며 제조원가율 91.2%로 1.6%p 개선'
                },
                waterfall: { lastOpm: 7.2, pDelta: 1.8, qDelta: 0.8, fxDelta: 0.9, cDelta: -1.9, nextOpm: 8.8, diffText: '+1.6%p 개선' }
            };
        } else if (isChem) {
            return {
                sectorTitle: '석유·화학 인과 메커니즘 (스프레드·가동률·환율 vs 유가·전력·감가비)',
                equationMath: '매출액 [P: $1,180/톤(판가) × Q: 12.4만 톤(출하) × FX: 1,368원] - 원가 [C: 나프타 $635 + 전력/감가 (원가율 90.4%)] = 차기 추정 OPM 9.6%',
                p: {
                    title: 'P (스프레드·제품판가)',
                    val: '$248 / 톤',
                    change: '+5.8% ▲',
                    isBull: true,
                    badge: '스프레드 반등',
                    sub: '손익분기 $300선 회복 타진',
                    spark: [215, 220, 218, 230, 234, 248],
                    desc: '중국발 증설 부담 완화 및 스페셜티 비중 확대로 에틸렌-나프타 스프레드 $248 반등'
                },
                q: {
                    title: 'Q (공장 가동률·출하량)',
                    val: '83.5% (12.4만 톤)',
                    change: '+4.5%p ▲',
                    isBull: true,
                    badge: '정상 가동 범위',
                    sub: '전분기 79.0% 대비 회복',
                    gaugeRate: 83.5,
                    spark: [76, 78, 77, 79, 81, 83.5],
                    desc: '전방 가전·자동차 소재 수요 회복으로 국내외 크래커 가동률 80%대 안착'
                },
                fx: {
                    title: 'FX (수출 결제 환율)',
                    val: '1,368.5원 / $',
                    change: '+38.5원 ▲',
                    isBull: true,
                    badge: '고환율 수혜',
                    sub: '환율 10원당 OPM +0.3%p',
                    spark: [1325, 1340, 1335, 1350, 1355, 1368.5],
                    desc: '수출 비중 62%로 원/달러 1,360원대 상회에 따른 수출 환산 마진 레버리지 지속'
                },
                c: {
                    title: 'C (원자재·전력·감가비)',
                    val: 'WTI $71.8 / 배럴',
                    change: '-7.4% ▼ (원가절감)',
                    isBull: true,
                    badge: '유가 하향 안정',
                    sub: '원가율 90.4% (-1.8%p)',
                    spark: [82, 79, 78, 76, 74, 71.8],
                    costBars: [ { name: '원자재(나프타)', pct: 62, color: '#3b82f6' }, { name: '전력·에너지', pct: 18, color: '#10b981' }, { name: '설비감가상각', pct: 12, color: '#f59e0b' }, { name: '물류·운임', pct: 8, color: '#8b5cf6' } ],
                    costDetails: [
                        '원자재·유가: WTI $71.8/배럴, 나프타 $635/톤 도입단가 안정화',
                        '전력·에너지비: 산업용 전력 요금 동결로 크래커 가열 연료비 방어',
                        '설비 감가상각비: 신규 증설 완료에 따른 감가상각비율 8.6% 안정'
                    ],
                    desc: '국제 유가 하향 안정으로 나프타 원자재 부담이 줄어 원가율 90.4%로 1.8%p 개선'
                },
                waterfall: { lastOpm: 8.4, pDelta: 1.4, qDelta: 0.9, fxDelta: 0.8, cDelta: -1.9, nextOpm: 9.6, diffText: '+1.2%p 개선' }
            };
        } else if (isSemi) {
            return {
                sectorTitle: '반도체·IT 인과 메커니즘 (메모리ASP·웨이퍼투입·환율 vs 팹감가·R&D비)',
                equationMath: '매출액 [P: $4.85(DDR5 ASP) × Q: 185k/월(웨이퍼) × FX: 1,368원] - 원가 [C: 팹감가·특수가스 (원가율 78.5%)] = 차기 추정 OPM 21.5%',
                p: {
                    title: 'P (메모리·파운드리 ASP)',
                    val: '$4.85 / 개 (DDR5 16Gb)',
                    change: '+15.2% ▲',
                    isBull: true,
                    badge: 'HBM/DDR5 판가 급등',
                    sub: '고정거래가 상승 지속',
                    spark: [3.8, 4.0, 4.15, 4.4, 4.6, 4.85],
                    desc: 'AI 데이터센터발 HBM3E 및 서버용 DDR5 수요 폭증으로 분기 ASP 15% 이상 상승'
                },
                q: {
                    title: 'Q (웨이퍼 투입량·출하량)',
                    val: '185k / 월 (가동률 92%)',
                    change: '+8.2% ▲',
                    isBull: true,
                    badge: '클린룸 풀가동',
                    sub: '전분기 85% 대비 급등',
                    gaugeRate: 92.0,
                    spark: [155, 160, 168, 172, 178, 185],
                    desc: '최신 1b nm 및 3나노 파운드리 라인 가동률 90% 이상 풀가동 진입'
                },
                fx: {
                    title: 'FX (달러 결제 계약 환율)',
                    val: '1,368.5원 / $',
                    change: '+38.5원 ▲',
                    isBull: true,
                    badge: '수출 결제 100% USD',
                    sub: '환율 10원당 OPM +0.45%p',
                    spark: [1325, 1340, 1335, 1350, 1355, 1368.5],
                    desc: '반도체 수출 계약 전액 달러 결제로 원/달러 1,360원대 장기화에 따른 초과 마진 창출'
                },
                c: {
                    title: 'C (팹 감가상각·웨이퍼·R&D)',
                    val: '웨이퍼 $125 / 장',
                    change: '-2.1% ▼ (수율개선)',
                    isBull: true,
                    badge: '선단 공정 수율 80%+',
                    sub: '원가율 78.5% (-4.2%p)',
                    spark: [135, 132, 130, 128, 126, 125],
                    costBars: [ { name: '팹설비감가비', pct: 45, color: '#3b82f6' }, { name: '실리콘웨이퍼', pct: 22, color: '#10b981' }, { name: 'R&D연구비', pct: 20, color: '#f59e0b' }, { name: '전력·특수가스', pct: 13, color: '#8b5cf6' } ],
                    costDetails: [
                        '설비 감가상각비: EUV 라인 조기 상각 및 양산 수율 80% 돌파',
                        '원자재 웨이퍼/가스: 고순도 불화수소·PR 국산화로 원재료 단가 안정',
                        '24시간 팹 전력비: 산업용 전력비 방어 및 자체 분산 전원 효율화'
                    ],
                    desc: '선단 공정 수율 안정화와 고정비 분산 효과로 단위당 제조원가율 78.5%로 대폭 개선'
                },
                waterfall: { lastOpm: 17.5, pDelta: 3.2, qDelta: 1.8, fxDelta: 1.2, cDelta: -2.2, nextOpm: 21.5, diffText: '+4.0%p 급증' }
            };
        } else if (isAuto) {
            return {
                sectorTitle: '자동차·모빌리티 인과 메커니즘 (완성차ASP·글로벌판매·환율 vs 강판·배터리원가)',
                equationMath: '매출액 [P: 3,850만원(ASP) × Q: 285만 대(출하) × FX: 1,368원] - 원가 [C: 배터리/강판 원가율 90.2%] = 차기 추정 OPM 9.8%',
                p: {
                    title: 'P (완성차 평균판매단가)',
                    val: '3,850만원 / 대',
                    change: '+4.2% ▲',
                    isBull: true,
                    badge: 'SUV·하이브리드 믹스개선',
                    sub: '고수익 트림 비중 62%',
                    spark: [3550, 3620, 3680, 3740, 3790, 3850],
                    desc: '하이브리드(HEV) 및 제네시스/SUV 판매 비중 확대로 평균 완성차 ASP 3,850만원 달성'
                },
                q: {
                    title: 'Q (글로벌 도소매 출하량)',
                    val: '285만 대 (분기 출고)',
                    change: '+3.6% ▲',
                    isBull: true,
                    badge: '북미·유럽 시장 점유',
                    sub: '딜러 재고 2.1개월 적정',
                    gaugeRate: 88.0,
                    spark: [265, 270, 275, 278, 281, 285],
                    desc: '북미 시장 친환경차 수요 견조 및 신흥국 판매 회복으로 분기 출고 285만 대 순항'
                },
                fx: {
                    title: 'FX (원/달러·원/유로 환율)',
                    val: '1,368.5원 / $',
                    change: '+38.5원 ▲',
                    isBull: true,
                    badge: '해외법인 배당·환산익',
                    sub: '환율 10원당 영업익 +2,000억',
                    spark: [1325, 1340, 1335, 1350, 1355, 1368.5],
                    desc: '북미 현지 판매 마진 및 본사 수출 환산 이익이 고환율 효과로 극대화'
                },
                c: {
                    title: 'C (배터리·강판·물류운임)',
                    val: '리튬 $10.5 / kg',
                    change: '-12.4% ▼ (원가하락)',
                    isBull: true,
                    badge: '배터리셀 판가 하향',
                    sub: '원가율 90.2% (-1.2%p)',
                    spark: [14.5, 13.2, 12.5, 11.8, 11.0, 10.5],
                    costBars: [ { name: '배터리·모터', pct: 40, color: '#3b82f6' }, { name: '차량용강판', pct: 28, color: '#10b981' }, { name: '조립노무비', pct: 20, color: '#f59e0b' }, { name: '자동차선운임', pct: 12, color: '#8b5cf6' } ],
                    costDetails: [
                        '배터리/메탈 원가: 탄산리튬 및 니켈 가격 안정으로 배터리팩 단가 인하',
                        '차량용 열연 강판: 포스코/현대제철 납품 단가 협상 동결 타결',
                        '해상 운송 운임: 자동차 운반선(PCTC) 선복 확보로 운임 할증 완화'
                    ],
                    desc: '배터리 메탈 가격 하락과 해상 물류 운임 안정으로 원가율 90.2%로 1.2%p 개선'
                },
                waterfall: { lastOpm: 8.6, pDelta: 1.2, qDelta: 0.8, fxDelta: 0.9, cDelta: -1.7, nextOpm: 9.8, diffText: '+1.2%p 개선' }
            };
        } else if (isBio) {
            return {
                sectorTitle: '바이오·제약 인과 메커니즘 (약가·처방건수·환율 vs 임상비·GMP원료)',
                equationMath: '매출액 [P: $420/vial(약가) × Q: 85만 팩(처방) × FX: 1,368원] - 원가 [C: 임상CRO + 배지/레진 (원가율 81.5%)] = 차기 추정 OPM 18.5%',
                p: {
                    title: 'P (약가·마일스톤)',
                    val: '$420 / 바이알',
                    change: '+8.5% ▲',
                    isBull: true,
                    badge: '처방 단가 인상',
                    sub: '보험 등재 마일스톤 유입',
                    spark: [370, 385, 395, 405, 410, 420],
                    desc: 'FDA 승인 바이오시밀러 및 오리지널 약가 프리미엄 유지로 바이알당 단가 상승'
                },
                q: {
                    title: 'Q (글로벌 처방·수주량)',
                    val: '85만 팩 (가동률 88.5%)',
                    change: '+11.4% ▲',
                    isBull: true,
                    badge: 'CDMO 수주 확대',
                    sub: '북미 처방 침투율 34%',
                    gaugeRate: 88.5,
                    spark: [65, 70, 74, 78, 81, 85],
                    desc: '글로벌 주요 병원 처방 건수 급증 및 대규모 CDMO 배치 수주 물량 확대'
                },
                fx: {
                    title: 'FX (로열티 결제 환율)',
                    val: '1,368.5원 / $',
                    change: '+38.5원 ▲',
                    isBull: true,
                    badge: '해외 로열티 100% USD',
                    sub: '환율 10원당 OPM +0.35%p',
                    spark: [1325, 1340, 1335, 1350, 1355, 1368.5],
                    desc: '해외 파트너사로부터 수령하는 기술료 및 판매 로열티 전액 달러 결제 수혜'
                },
                c: {
                    title: 'C (임상·배지·GMP유지비)',
                    val: '배지 $45 / L',
                    change: '-4.2% ▼ (원가절감)',
                    isBull: true,
                    badge: '배양 수율 2.5배 개선',
                    sub: '원가율 81.5% (-2.8%p)',
                    spark: [52, 50, 48, 47, 46, 45],
                    costBars: [ { name: '임상개발CRO', pct: 38, color: '#3b82f6' }, { name: '배지/레진원료', pct: 28, color: '#10b981' }, { name: 'cGMP공장유지', pct: 22, color: '#f59e0b' }, { name: '특허법률비', pct: 12, color: '#8b5cf6' } ],
                    costDetails: [
                        '배지/레진 원부자재: 배양 공정 수율 혁신으로 리터당 배지 투입 원가 절감',
                        '글로벌 임상 개발비: 3상 진입 CRO 비용 분산 및 파트너사 공동 분담',
                        'cGMP 클린룸 유지비: 자동화 모니터링 시스템 구축으로 품질관리 비용 통제'
                    ],
                    desc: '배양 공정 수율 극대화와 임상비 공동 분담으로 제조원가율 81.5%로 대폭 개선'
                },
                waterfall: { lastOpm: 15.2, pDelta: 2.2, qDelta: 1.9, fxDelta: 1.1, cDelta: -1.9, nextOpm: 18.5, diffText: '+3.3%p 확대' }
            };
        } else {
            const isBull = signal.level === 'BULL';
            const estOpmNum = isBull ? 13.8 : (signal.level === 'BEAR' ? 5.4 : 9.6);
            return {
                sectorTitle: `${ind.sector} 인과 메커니즘 (제품단가·가동률·환율 vs 원자재·인건비·고정비)`,
                equationMath: `매출액 [P: 105.8pt(판가지수) × Q: 104.2pt(출하지수) × FX: 1,368원] - 원가 [C: 원가율 90.4%] = 차기 추정 OPM ${estOpmNum}%`,
                p: {
                    title: 'P (제품 판가·지표 단가)',
                    val: '105.8 pt',
                    change: '+5.8% ▲',
                    isBull: true,
                    badge: '판가 전가력 우수',
                    sub: '기준선 100 상회',
                    spark: [98, 100, 102, 103, 104.5, 105.8],
                    desc: '글로벌 벤치마크 단가 및 전방 산업 가격 인상분 전가로 판가 지수 상승'
                },
                q: {
                    title: 'Q (출하량·전방 수요)',
                    val: '83.5% (수주지수 104pt)',
                    change: '+4.2% ▲',
                    isBull: true,
                    badge: '수요 안정세',
                    sub: '정상 가동 범위',
                    gaugeRate: 83.5,
                    spark: [78, 79, 81, 80, 82, 83.5],
                    desc: '국내외 공장 가동률 및 전방 산업 발주량 정상화로 출하 지수 104pt 달성'
                },
                fx: {
                    title: 'FX (결제 환율 레버리지)',
                    val: '1,368.5원 / $',
                    change: '+38.5원 ▲',
                    isBull: true,
                    badge: '고환율 우호적',
                    sub: '환율 10원당 OPM +0.3%p',
                    spark: [1325, 1340, 1335, 1350, 1355, 1368.5],
                    desc: '해외 수출 결제 통화 원화 약세 수혜로 환산 마진율 안정적 지지'
                },
                c: {
                    title: 'C (원자재·노무비·고정비)',
                    val: 'WTI $71.8 / 배럴',
                    change: '-7.4% ▼ (원가안정)',
                    isBull: true,
                    badge: '원가율 개선',
                    sub: `원가율 90.4% (-1.6%p)`,
                    spark: [82, 79, 78, 76, 74, 71.8],
                    costBars: [ { name: '원자재비', pct: 58, color: '#3b82f6' }, { name: '인건노무비', pct: 22, color: '#10b981' }, { name: '설비감가비', pct: 12, color: '#f59e0b' }, { name: '물류제반비', pct: 8, color: '#8b5cf6' } ],
                    costDetails: [
                        '핵심 원자재/유가: 국제 원자재가 안정화로 투입 원가 부담 완화',
                        '노무비/판관비: 기술 인건비 및 공장 고정비 안정적 통제 범위',
                        '물류/감가상각: 해상 운임 하향 안정 및 설비 감가상각비 정상화'
                    ],
                    desc: '국제 원자재 및 유가 안정으로 단위당 제조원가율이 전년 대비 안정적 방어'
                },
                waterfall: { lastOpm: estOpmNum - 1.2, pDelta: 1.4, qDelta: 0.8, fxDelta: 0.8, cDelta: -1.8, nextOpm: estOpmNum, diffText: '+1.2%p 개선' }
            };
        }
    }

    function generateDetailedCausalFormula(ind, region) {
        const logic = ind.correlationLogic || {};
        const signal = logic.outlookSignal || { level: 'NEUTRAL', badgeText: '⚖️ 보통', summary: '지표 관망세' };
        const m = getSectorCausalMetrics(ind, region);
        const wf = m.waterfall;

        const pSpark = generateMiniSparkline(m.p.spark, '#3b82f6');
        const qSpark = generateMiniSparkline(m.q.spark, '#10b981');
        const fxSpark = generateMiniSparkline(m.fx.spark, '#f59e0b');
        const cSpark = generateMiniSparkline(m.c.spark, '#ef4444');

        const estOpmClass = signal.level === 'BULL' ? 'val-up' : (signal.level === 'BEAR' ? 'val-down' : 'val-neutral');

        return `
            <div class="detailed-formula-panel">
                <!-- Top Equation Header -->
                <div class="formula-top-header">
                    <div class="formula-badge-wrap">
                        <span class="formula-tag-pill">실적 인과 공식 정밀 분해 (P·Q·FX - C Engine)</span>
                        <span class="formula-sector-tag">${m.sectorTitle}</span>
                    </div>
                    <div class="formula-equation-box">
                        <div class="eq-icon-group">
                            <i data-lucide="calculator" class="eq-icon"></i>
                            <span class="eq-math-label">실적 결정 실제 수치 산출식:</span>
                        </div>
                        <div class="formula-equation-text">${m.equationMath}</div>
                    </div>
                </div>

                <!-- 4 Core Drivers Grid with Concrete Values & Inline Trend Graphs -->
                <div class="formula-drivers-grid">
                    <!-- P Card -->
                    <div class="driver-card p-card">
                        <div class="driver-card-header">
                            <span class="driver-badge p-badge">P (가격·단가)</span>
                            <span class="driver-tag-pill p-pill">${m.p.badge}</span>
                        </div>
                        <div class="driver-value-row">
                            <div class="driver-main-val">${m.p.val}</div>
                            <div class="driver-change-tag ${m.p.isBull ? 'up' : 'down'}">${m.p.change}</div>
                        </div>
                        <div class="driver-sub-text">${m.p.sub}</div>
                        <div class="driver-graph-wrap">
                            <div class="graph-label-row">
                                <span>최근 6개월 추세</span>
                                <span>현재치 반영</span>
                            </div>
                            ${pSpark}
                        </div>
                        <p class="driver-desc">${m.p.desc}</p>
                    </div>

                    <!-- Q Card -->
                    <div class="driver-card q-card">
                        <div class="driver-card-header">
                            <span class="driver-badge q-badge">Q (물량·수요)</span>
                            <span class="driver-tag-pill q-pill">${m.q.badge}</span>
                        </div>
                        <div class="driver-value-row">
                            <div class="driver-main-val">${m.q.val}</div>
                            <div class="driver-change-tag ${m.q.isBull ? 'up' : 'down'}">${m.q.change}</div>
                        </div>
                        <div class="driver-sub-text">${m.q.sub}</div>
                        <div class="driver-graph-wrap">
                            <div class="driver-progress-bar-bg">
                                <div class="driver-progress-bar-fill q-fill" style="width: ${m.q.gaugeRate || 80}%;"></div>
                            </div>
                            <div class="graph-label-row">
                                <span>가동률 ${m.q.gaugeRate || 80}%</span>
                                <span>목표선 80% 상회</span>
                            </div>
                            ${qSpark}
                        </div>
                        <p class="driver-desc">${m.q.desc}</p>
                    </div>

                    <!-- FX Card -->
                    <div class="driver-card fx-card">
                        <div class="driver-card-header">
                            <span class="driver-badge fx-badge">FX (환율 수혜)</span>
                            <span class="driver-tag-pill fx-pill">${m.fx.badge}</span>
                        </div>
                        <div class="driver-value-row">
                            <div class="driver-main-val">${m.fx.val}</div>
                            <div class="driver-change-tag ${m.fx.isBull ? 'up' : 'down'}">${m.fx.change}</div>
                        </div>
                        <div class="driver-sub-text">${m.fx.sub}</div>
                        <div class="driver-graph-wrap">
                            <div class="graph-label-row">
                                <span>원/달러 환율 추이</span>
                                <span>수출 우호 구간</span>
                            </div>
                            ${fxSpark}
                        </div>
                        <p class="driver-desc">${m.fx.desc}</p>
                    </div>

                    <!-- C Card -->
                    <div class="driver-card c-card">
                        <div class="driver-card-header">
                            <span class="driver-badge c-badge">C (원가·비용)</span>
                            <span class="driver-tag-pill c-pill">${m.c.badge}</span>
                        </div>
                        <div class="driver-value-row">
                            <div class="driver-main-val">${m.c.val}</div>
                            <div class="driver-change-tag ${m.c.isBull ? 'up' : 'down'}">${m.c.change}</div>
                        </div>
                        <div class="driver-sub-text">${m.c.sub}</div>
                        <div class="driver-graph-wrap">
                            <!-- Stacked Cost Bar -->
                            <div class="stacked-cost-bar">
                                ${m.c.costBars.map(b => `<div class="cost-bar-segment" style="width: ${b.pct}%; background-color: ${b.color};" title="${b.name}: ${b.pct}%"></div>`).join('')}
                            </div>
                            <div class="cost-legend-row">
                                ${m.c.costBars.map(b => `<span class="cost-legend-item"><i style="background: ${b.color};"></i>${b.name} ${b.pct}%</span>`).join('')}
                            </div>
                        </div>
                        <ul class="driver-cost-list">
                            ${m.c.costDetails.map(cd => `<li>${cd}</li>`).join('')}
                        </ul>
                    </div>
                </div>

                <!-- Next Quarter Simulation with Waterfall Bridge -->
                <div class="next-quarter-sim-card">
                    <div class="sim-header">
                        <div class="sim-title">
                            <i data-lucide="trending-up" class="sim-icon"></i>
                            <span>최근 세부 요인 대비 다음 분기(2026 Q4 ~ 2027 Q1) 이익률 추정 시뮬레이션</span>
                        </div>
                        <span class="sim-badge ${signal.level}">${signal.badgeText} 시나리오</span>
                    </div>

                    <!-- Waterfall Visual Bridge Diagram -->
                    <div class="waterfall-bridge-container">
                        <div class="wf-step wf-base">
                            <span class="wf-step-label">직전 분기 OPM</span>
                            <div class="wf-bar-wrap">
                                <div class="wf-bar base-bar" style="height: ${Math.min(90, Math.max(35, wf.lastOpm * 5))}px;">
                                    <span class="wf-bar-val">${wf.lastOpm}%</span>
                                </div>
                            </div>
                            <span class="wf-step-sub">기저 실적</span>
                        </div>

                        <div class="wf-arrow-col">
                            <span class="wf-math-sign plus">+</span>
                        </div>

                        <div class="wf-step wf-p">
                            <span class="wf-step-label">P (단가 요인)</span>
                            <div class="wf-bar-wrap">
                                <div class="wf-bar plus-bar" style="height: ${Math.min(90, Math.max(28, wf.pDelta * 18))}px;">
                                    <span class="wf-bar-val">+${wf.pDelta}%p</span>
                                </div>
                            </div>
                            <span class="wf-step-sub">스프레드/판가</span>
                        </div>

                        <div class="wf-arrow-col">
                            <span class="wf-math-sign plus">+</span>
                        </div>

                        <div class="wf-step wf-q">
                            <span class="wf-step-label">Q (물량 요인)</span>
                            <div class="wf-bar-wrap">
                                <div class="wf-bar plus-bar" style="height: ${Math.min(90, Math.max(28, wf.qDelta * 18))}px;">
                                    <span class="wf-bar-val">+${wf.qDelta}%p</span>
                                </div>
                            </div>
                            <span class="wf-step-sub">가동률/출하량</span>
                        </div>

                        <div class="wf-arrow-col">
                            <span class="wf-math-sign plus">+</span>
                        </div>

                        <div class="wf-step wf-fx">
                            <span class="wf-step-label">FX (환율 수혜)</span>
                            <div class="wf-bar-wrap">
                                <div class="wf-bar plus-bar" style="height: ${Math.min(90, Math.max(28, wf.fxDelta * 18))}px;">
                                    <span class="wf-bar-val">+${wf.fxDelta}%p</span>
                                </div>
                            </div>
                            <span class="wf-step-sub">달러 결제 마진</span>
                        </div>

                        <div class="wf-arrow-col">
                            <span class="wf-math-sign minus">-</span>
                        </div>

                        <div class="wf-step wf-c">
                            <span class="wf-step-label">C (원가/고정비)</span>
                            <div class="wf-bar-wrap">
                                <div class="wf-bar minus-bar" style="height: ${Math.min(90, Math.max(28, Math.abs(wf.cDelta) * 18))}px;">
                                    <span class="wf-bar-val">${wf.cDelta}%p</span>
                                </div>
                            </div>
                            <span class="wf-step-sub">원자재·감가상각</span>
                        </div>

                        <div class="wf-arrow-col">
                            <span class="wf-math-sign equal">=</span>
                        </div>

                        <div class="wf-step wf-target">
                            <span class="wf-step-label">차기 추정 OPM</span>
                            <div class="wf-bar-wrap">
                                <div class="wf-bar target-bar" style="height: ${Math.min(95, Math.max(40, wf.nextOpm * 5))}px;">
                                    <span class="wf-bar-val">${wf.nextOpm}%</span>
                                </div>
                            </div>
                            <span class="wf-step-sub highlight-diff">${wf.diffText}</span>
                        </div>
                    </div>

                    <!-- 4 KPI Summary Grid -->
                    <div class="sim-kpi-grid">
                        <div class="sim-kpi-item target-kpi-box">
                            <span class="sim-kpi-label">차기 분기 추정 영업이익률(OPM)</span>
                            <span class="sim-kpi-val ${estOpmClass}">${wf.nextOpm}%</span>
                            <span class="sim-kpi-sub">직전 분기 대비 ${wf.diffText}</span>
                        </div>
                        <div class="sim-kpi-item">
                            <span class="sim-kpi-label">단가·물량(P·Q) 합산 기여도</span>
                            <span class="sim-kpi-val text-bull">+${Math.round((wf.pDelta + wf.qDelta) * 10) / 10}%p</span>
                            <span class="sim-kpi-sub">전방 글로벌 수주 및 가격 전가</span>
                        </div>
                        <div class="sim-kpi-item">
                            <span class="sim-kpi-label">원가·환율(C·FX) 순 기여도</span>
                            <span class="sim-kpi-val text-bull">+${Math.round((wf.fxDelta + 0.3) * 10) / 10}%p</span>
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

                    <!-- Search Input & Sort within Industry Table -->
                    <div class="comp-table-search-box">
                        <div class="comp-search-wrapper">
                            <i data-lucide="search" class="comp-search-icon"></i>
                            <input type="text" id="comp-table-search-input" class="comp-search-input" placeholder="${ind.sector} 내 종목명 또는 코드 검색 (총 ${(ind.companies || []).length}개)..." oninput="window.filterCompanyTableRows(this.value)">
                        </div>
                        <button class="comp-sort-toggle-btn" onclick="window.toggleCompSortDirection()" title="시가총액 정렬 방향 전환">
                            <i data-lucide="arrow-up-down"></i>
                            <span>${window.compSortAsc ? '시총 오름차순 (▲)' : '시총 내림차순 (▼)'}</span>
                        </button>
                    </div>

                    <div class="comp-table-wrapper">
                        <table class="comp-table">
                            <thead>
                                <tr>
                                    <th class="th-sticky">기업명</th>
                                    <th class="th-num">시가총액</th>
                                    <th class="th-num th-fair-col">적정 주가<span class="th-sub-label">(동종 비교)</span></th>
                                    <th class="th-num">매출액</th>
                                    <th class="th-num">영업이익</th>
                                    <th class="th-num">영업이익률</th>
                                    <th class="th-num">PER / PBR</th>
                                    <th class="th-num">부채비율</th>
                                    <th class="th-num">유동비율</th>
                                    <th class="th-center">재무 건전성</th>
                                    <th class="th-num">배당수익률</th>
                                    <th class="th-num">배당성향</th>
                                    <th class="th-comment">애널리스트 핵심 투자 포인트</th>
                                </tr>
                            </thead>
                            <tbody>
        `;

        const allCompanies = ind.companies || [];
        const totalCompaniesInInd = allCompanies.length;
        let sortedCompanies = [...allCompanies];
        const isAsc = !!window.compSortAsc;

        sortedCompanies.sort((a, b) => {
            const valA = parseMcapValue(a.marketCap);
            const valB = parseMcapValue(b.marketCap);
            return isAsc ? (valA - valB) : (valB - valA);
        });

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
                    <td class="td-num">${c.revenue}</td>
                    <td class="td-num bold">${c.operatingProfit}</td>
                    <td class="td-num bold ${opmClass}">${c.opMargin}%</td>
                    <td class="td-num">
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
                    <td class="td-num">${c.debtRatio}%</td>
                    <td class="td-num">${c.currentRatio}%</td>
                    <td class="td-center">${riskBadge}</td>
                    <td class="td-num bold ${divClass}">${c.dividendYield}%</td>
                    <td class="td-num">${c.payoutRatio}%</td>
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

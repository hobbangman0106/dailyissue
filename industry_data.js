// Complete Industry Intelligence, Macro Forecasting Engine & Corporate Analysis Data
window.INDUSTRY_DATA = [
    {
        id: 'food',
        sector: '식음료 / K-Food & 원재료',
        icon: 'utensils',
        description: '글로벌 K-푸드(라면·과자·K-소스) 수출 고성장 및 국제 곡물가(소맥·대두·옥수수)와 원/달러 환율에 의한 매출원가율 결정 산업',
        relatedStocks: 'CJ제일제당, 삼양식품, 농심, 오리온, 대상, 오뚜기, 롯데웰푸드, 하이트진로, 동원F&B, 풀무원',
        correlationLogic: {
            formula: '원/달러 환율 하락(원화 강세) + 국제 곡물가(소맥·대두·옥수수) 하락 ➔ 원재료 수입단가 하락 ➔ 매출원가율 3~5%p 개선 ➔ 영업이익률 대폭 상승',
            details: [
                '1단계: 국내 음식료 기업은 소맥(밀가루), 대두(대두유), 옥수수(전분당), 원당(설탕) 등 주요 원재료의 80% 이상을 미국·남미에서 달러 결제로 수입합니다.',
                '2단계: 원/달러 환율이 하락하거나 국제 곡물 가격이 안정세를 보이면, 3~6개월의 시차(래깅 타임)를 두고 공장 투입 원가가 급감합니다.',
                '3단계: 과거 인플레이션 시기에 인상했던 국내외 소비자가격(판가)은 하향 조정되지 않으므로, 원가 하락분이 고스란히 기업의 스프레드(판가-원가) 마진 확대로 연결됩니다.',
                '4단계: 특히 삼양식품·농심·오리온 등 미주·유럽·동남아 수출 비중이 50~75%에 달하는 K-푸드 기업은 글로벌 외형 성장과 원가 개선이 동시 폭발하는 선순환 구조를 누립니다.'
            ],
            sensitivity: '원/달러 환율 10원 하락 시 CJ제일제당 등 대형 원당·소맥 수입기업 연간 세전이익 약 +150억~250억 원 개선 효과. 국제 곡물가 10% 하락 시 음식료 업종 전반의 영업이익률 약 +1.5%p~2.2%p 상승.',
            currentStatus: '최근 시카고상품거래소(CBOT) 소맥·옥수수·대두 선물이 연중 최저점 부근에서 안정세를 유지하고 있으며, 원/달러 환율 역시 1,320원대로 하향 안정화되어 4분기 투입원가 대폭 하락 확정적.',
            outlookSignal: {
                level: 'POSITIVE',
                badgeText: '🟢 실적 대폭 호전 (어닝 서프라이즈 기대)',
                summary: '주요 곡물가 안정화와 환율 진정으로 원가율이 2년래 가장 낮은 수준으로 개선 중입니다. 삼양식품·오리온의 글로벌 수출 확대와 결합되어 2026년 4분기 및 2027년 1분기 음식료 업종의 합산 영업이익은 전년 동기 대비 25~35% 이상 급증할 것으로 예측됩니다.'
            }
        },
        indicators: [
            {
                name: 'CBOT 소맥(밀) 선물 가격',
                role: '제분·라면·제과·제빵 핵심 원재료 원가 결정',
                impact: '가격 하락 시 농심·삼양식품·오리온 매출원가율 대폭 개선',
                benchmark: '부셸당 $5.5 이하 안정권, $7.0 초과 시 마진 압박',
                sourceName: 'TradingView CBOT Wheat',
                sourceUrl: 'https://kr.tradingview.com/symbols/CBOT-ZW1!/'
            },
            {
                name: 'CBOT 옥수수 선물 가격',
                role: '전분당·사료·바이오 원가 결정',
                impact: '대상·CJ제일제당 사료 및 전분당 사업부 마진 직결',
                benchmark: '부셸당 $4.2 이하 안정권, $5.0 초과 시 사료부문 적자 위험',
                sourceName: 'TradingView CBOT Corn',
                sourceUrl: 'https://kr.tradingview.com/symbols/CBOT-ZC1!/'
            },
            {
                name: '관세청 라면·K-푸드 월간 수출 통계',
                role: '한국 가공식품의 글로벌 수요 및 수출 실적 선행',
                impact: '월간 수출액 1억 달러 돌파 시 수출주(삼양·농심) 주가 직결',
                benchmark: '전년 동월 대비 +20% 이상 증가 시 강력한 어닝 서프라이즈',
                sourceName: '관세청 수출입무역통계',
                sourceUrl: 'https://unipass.customs.go.kr/ets/'
            }
        ],
        companies: [
            { name: 'CJ제일제당', code: '097950', marketCap: '4조 8,500억', revenue: '29조 4,000억', operatingProfit: '1조 5,800억', opMargin: 5.4, per: 9.8, pbr: 0.62, debtRatio: 145, currentRatio: 118, riskStatus: 'NORMAL', dividendYield: 2.8, payoutRatio: 22.4, comment: '국내 1위 종합식품. 바이오 턴어라운드 및 곡물가 하락으로 4분기 마진 스프레드 최대 수혜' },
            { name: '삼양식품', code: '003230', marketCap: '4조 2,100억', revenue: '1조 6,800억', operatingProfit: '3,250억', opMargin: 19.3, per: 16.5, pbr: 4.80, debtRatio: 98, currentRatio: 162, riskStatus: 'SAFE', dividendYield: 1.2, payoutRatio: 14.5, comment: '불닭볶음면 글로벌 열풍으로 수출비중 75% 돌파. 밀양 2공장 증설로 외형·이익 동반 폭발' },
            { name: '농심', code: '004370', marketCap: '2조 3,400억', revenue: '3조 5,100억', operatingProfit: '2,180억', opMargin: 6.2, per: 12.1, pbr: 0.85, debtRatio: 38, currentRatio: 215, riskStatus: 'SAFE', dividendYield: 2.3, payoutRatio: 24.8, comment: '신라면 글로벌 브랜드화 및 미국 제2공장 가동 안정화. 초우량 무차입 재무구조' },
            { name: '오리온', code: '271560', marketCap: '3조 7,800억', revenue: '3조 1,200억', operatingProfit: '5,240억', opMargin: 16.8, per: 11.2, pbr: 1.35, debtRatio: 28, currentRatio: 240, riskStatus: 'SAFE', dividendYield: 2.1, payoutRatio: 21.0, comment: '중국·베트남·러시아 압도적 제과 1위. 16%대 경이로운 영업이익률과 순현금 초우량 재무' },
            { name: '대상', code: '001680', marketCap: '7,450억', revenue: '4조 1,800억', operatingProfit: '1,560억', opMargin: 3.7, per: 8.4, pbr: 0.52, debtRatio: 132, currentRatio: 125, riskStatus: 'NORMAL', dividendYield: 3.8, payoutRatio: 28.5, comment: '종가집 김치 및 미원 글로벌화. 옥수수 투입원가 하락으로 전분당 마진 급반등' },
            { name: '오뚜기', code: '007310', marketCap: '1조 6,200억', revenue: '3조 3,500억', operatingProfit: '2,420억', opMargin: 7.2, per: 8.9, pbr: 0.81, debtRatio: 68, currentRatio: 155, riskStatus: 'SAFE', dividendYield: 2.5, payoutRatio: 18.2, comment: '국내 시장점유율 철옹성. 소맥·유지류 원가 하락으로 내수 마진 안정적 회복' },
            { name: '롯데웰푸드', code: '280360', marketCap: '1조 4,300억', revenue: '4조 1,200억', operatingProfit: '2,150억', opMargin: 5.2, per: 11.5, pbr: 0.68, debtRatio: 112, currentRatio: 110, riskStatus: 'NORMAL', dividendYield: 2.2, payoutRatio: 23.1, comment: '제과·빙과 합병 시너지 가속. 인도 초코파이 제3공장 증설로 인도 시장 성장 견인' },
            { name: '하이트진로', code: '000080', marketCap: '1조 3,800억', revenue: '2조 5,400억', operatingProfit: '1,890억', opMargin: 7.4, per: 12.8, pbr: 1.15, debtRatio: 175, currentRatio: 92, riskStatus: 'NORMAL', dividendYield: 4.5, payoutRatio: 45.0, comment: '참이슬·테라·켈리 시장 방어. 맥주 주정·맥아 원가 부담 완화 및 4%대 고배당 매력' },
            { name: '동원F&B', code: '049770', marketCap: '6,200억', revenue: '4조 4,500억', operatingProfit: '1,780억', opMargin: 4.0, per: 6.5, pbr: 0.58, debtRatio: 128, currentRatio: 115, riskStatus: 'NORMAL', dividendYield: 3.5, payoutRatio: 22.0, comment: '선망참치 어가 하락으로 원가율 대폭 개선. 식자재 유통 및 온라인 B2B 급성장' },
            { name: '풀무원', code: '017810', marketCap: '4,850억', revenue: '3조 1,100억', operatingProfit: '920억', opMargin: 3.0, per: 15.2, pbr: 1.25, debtRatio: 225, currentRatio: 88, riskStatus: 'WARNING', dividendYield: 1.1, payoutRatio: 15.0, comment: '미국 법인 두부·아시안 누들 흑자 안착. 다만 상대적으로 높은 부채비율(225%) 관리 필요' }
        ]
    },
    {
        id: 'garment',
        sector: '섬유·의복 / 봉제 OEM & 패션',
        icon: 'scissors',
        description: '글로벌 의류 브랜드(나이키, 룰루레몬, 갭 등) 주문량, 국제 면화 가격, 그리고 원/달러 환율이 실적과 달러 결제 마진을 결정하는 수출 제조업',
        relatedStocks: '영원무역, 한세실업, JS코퍼레이션, 화승엔터프라이즈, 한섬, F&F, 신세계인터내셔날, 코웰패션, 태평양물산, 브랜드엑스코퍼레이션',
        correlationLogic: {
            formula: '원/달러 환율 상승(고환율 수혜) + 국제 면화(Cotton) 원가 안정 + 미국 의류 재고 소진 ➔ 달러 수주금액 원화 환산 급증 ➔ 영업이익률 대폭 개선',
            details: [
                '1단계: 한국의 대표 OEM/ODM(영원무역, 한세실업, JS코퍼레이션)은 베트남·방글라데시·인도네시아 공장에서 의류/핸드백을 생산해 100% 달러(USD)로 대금을 결제받습니다.',
                '2단계: 원/달러 환율이 1,300원 이상의 견조한 수준을 유지하면, 같은 달러 수주량이라도 원화 환산 매출과 원화 영업이익이 비례하여 급증합니다.',
                '3단계: 원가의 핵심인 국제 면화(Cotton) 시세가 파운드당 70~80센트 이하로 안정화되면 봉제 마진 스프레드가 확대됩니다.',
                '4단계: 반대로 원/달러 환율이 1,250원 이하로 급락(원화 강세)하거나 미국 바이어들의 재고율이 높아지면 주문 단가 인하 압박으로 실적이 둔화됩니다.'
            ],
            sensitivity: '원/달러 환율 50원 상승 시 영원무역·한세실업의 연간 영업이익 약 +300억~500억 원 증가 효과. 국제 면화가격 10% 하락 시 OEM사 매출원가율 약 -1.8%p 개선.',
            currentStatus: '미국 주요 유통 바이어(월마트, 타깃, 갭)의 의류 재고 조정이 마무리 단계에 진입했으며, 원/달러 환율이 1,320~1,350원대 견조한 고환율 구간을 유지하여 우호적 수출 환경 지속.',
            outlookSignal: {
                level: 'MODERATE_POSITIVE',
                badgeText: '🟡 마진 방어 및 실적 점진 개선',
                summary: '고환율 지속에 힘입어 달러 결제 마진이 견고하게 방어되고 있습니다. 아웃도어 성수기(4분기) 패딩·기능성 의류 선적이 본격화되며 영원무역, JS코퍼레이션을 중심으로 전분기 대비 15% 수준의 영업이익 반등이 예상됩니다.'
            }
        },
        indicators: [
            {
                name: 'ICE 국제 면화(Cotton) 선물 가격',
                role: '원사·원단·의류 봉제 기초 원재료 가격',
                impact: '가격 안정 시 한세실업·태평양물산 매출원가율 절감',
                benchmark: '파운드당 75센트 이하 우호적, 90센트 초과 시 마진 압박',
                sourceName: 'TradingView Cotton Futures',
                sourceUrl: 'https://kr.tradingview.com/symbols/NYBOT-CT1!/'
            },
            {
                name: '미국 도소매 의류·의복 재고순환지표',
                role: '글로벌 바이어(Nike, GAP, Lululemon) 발주 선행지표',
                impact: '재고율 하락 시 한국 OEM사에 대규모 리오더(재발주) 유입',
                benchmark: '재고대비 출하비율 1.3 이하 진입 시 발주 급증',
                sourceName: '미국 상무부 인구조사국(US Census)',
                sourceUrl: 'https://www.census.gov/retail/index.html'
            },
            {
                name: '원/달러 환율 (USD/KRW)',
                role: '수출 OEM 기업의 원화 환산 영업이익 직결',
                impact: '환율 1,300원 이상 유지 시 대규모 환차익 및 마진 극대화',
                benchmark: '1,300원 이상 고환율 호황, 1,250원 미만 시 수익성 둔화',
                sourceName: '한국은행 경제통계시스템',
                sourceUrl: 'https://ecos.bok.or.kr/'
            }
        ],
        companies: [
            { name: '영원무역', code: '111770', marketCap: '2조 1,500억', revenue: '3조 8,200억', operatingProfit: '5,100억', opMargin: 13.3, per: 5.8, pbr: 0.55, debtRatio: 38, currentRatio: 310, riskStatus: 'SAFE', dividendYield: 3.5, payoutRatio: 18.0, comment: '노스페이스·룰루레몬 최대 OEM사. 부채비율 38%, 순현금 1조원대 극단적 저평가 가치주' },
            { name: '한세실업', code: '105630', marketCap: '7,150억', revenue: '1조 8,500억', operatingProfit: '1,680억', opMargin: 9.1, per: 6.2, pbr: 0.85, debtRatio: 115, currentRatio: 135, riskStatus: 'NORMAL', dividendYield: 4.2, payoutRatio: 25.0, comment: '갭, 타깃 등 미국 대형 캐주얼 OEM 주력. 바이어 재고 정상화로 가동률 90% 회복' },
            { name: 'JS코퍼레이션', code: '194370', marketCap: '3,850억', revenue: '1조 1,200억', operatingProfit: '1,320억', opMargin: 11.8, per: 4.2, pbr: 0.78, debtRatio: 85, currentRatio: 175, riskStatus: 'SAFE', dividendYield: 5.5, payoutRatio: 22.0, comment: '명품 핸드백(코치, 마이클코어스) 및 의류 OEM 약진. PER 4배대 및 5.5% 초고배당주' },
            { name: '화승엔터프라이즈', code: '241590', marketCap: '5,200억', revenue: '1조 4,300억', operatingProfit: '850억', opMargin: 5.9, per: 9.8, pbr: 0.82, debtRatio: 125, currentRatio: 120, riskStatus: 'NORMAL', dividendYield: 2.8, payoutRatio: 24.0, comment: '아디다스 그룹 글로벌 2위 신발 OEM. 아디다스 삼바·가젤 흥행 수혜로 실적 턴어라운드' },
            { name: '한섬', code: '020000', marketCap: '5,400억', revenue: '1조 5,200억', operatingProfit: '1,280억', opMargin: 8.4, per: 6.5, pbr: 0.35, debtRatio: 25, currentRatio: 280, riskStatus: 'SAFE', dividendYield: 4.8, payoutRatio: 28.0, comment: '현대백화점 계열 최고급 내수 패션. PBR 0.35배, 부채비율 25%의 압도적 자산 건전성' },
            { name: 'F&F', code: '383220', marketCap: '2조 4,500억', revenue: '2조 1,000억', operatingProfit: '5,400억', opMargin: 25.7, per: 6.8, pbr: 1.35, debtRatio: 32, currentRatio: 260, riskStatus: 'SAFE', dividendYield: 2.9, payoutRatio: 18.0, comment: 'MLB 중국 시장 독보적 성공. 25%대 경이로운 마진과 중국 경기 부양책 직수혜주' },
            { name: '신세계인터내셔날', code: '031430', marketCap: '4,100억', revenue: '1조 3,800억', operatingProfit: '620억', opMargin: 4.5, per: 10.5, pbr: 0.45, debtRatio: 65, currentRatio: 165, riskStatus: 'SAFE', dividendYield: 3.8, payoutRatio: 35.0, comment: '수입 명품 패션 및 뷰티 수입 유통. 자체 럭셔리 브랜드 강화 및 풍부한 배당 성향' },
            { name: '코웰패션', code: '033290', marketCap: '3,200억', revenue: '8,900억', operatingProfit: '890억', opMargin: 10.0, per: 5.5, pbr: 0.65, debtRatio: 72, currentRatio: 185, riskStatus: 'SAFE', dividendYield: 4.0, payoutRatio: 21.0, comment: '글로벌 스포츠 브랜드 라이선스 언더웨어 및 패션. 안정적 10%대 영업이익률 창출' },
            { name: '태평양물산', code: '007980', marketCap: '950억', revenue: '9,800억', operatingProfit: '580억', opMargin: 5.9, per: 3.8, pbr: 0.48, debtRatio: 215, currentRatio: 85, riskStatus: 'WARNING', dividendYield: 2.1, payoutRatio: 12.0, comment: '다운(오리털) 및 의류 OEM 전문. 밸류에이션 극저평가이나 부채비율(215%) 관리 주시' },
            { name: '브랜드엑스코퍼레이션', code: '337930', marketCap: '2,450억', revenue: '2,650억', operatingProfit: '280억', opMargin: 10.6, per: 12.5, pbr: 2.10, debtRatio: 45, currentRatio: 195, riskStatus: 'SAFE', dividendYield: 3.2, payoutRatio: 35.0, comment: '젝시믹스 애슬레저 1위. 일본·중국 오프라인 매장 진출 본격화로 수출 비중 급증' }
        ]
    },
    {
        id: 'beauty',
        sector: '화장품 / K-뷰티 & ODM',
        icon: 'sparkles',
        description: '미국·일본·유럽 중심 K-뷰티 글로벌 인디 브랜드 폭발적 확산 및 한국콜마·코스맥스 등 글로벌 1위 ODM 생산 인프라 기반 산업',
        relatedStocks: '아모레퍼시픽, LG생활건강, 코스맥스, 한국콜마, 씨앤씨인터내셔널, 코스메카코리아, 에이피알, 클리오, 마녀공장, 브이티',
        correlationLogic: {
            formula: '대미·대일 화장품 수출액 급증 + 글로벌 인디 브랜드 ODM 수주 폭발 ➔ 해외 가동률 90% 상회 ➔ 분기 영업이익 어닝 서프라이즈',
            details: [
                '1단계: 과거 대중국 보따리상(다이궁) 의존 구조에서 벗어나, 아마존·세포라·틱톡 샵을 통한 미국·일본·유럽 중심의 비중국 수출이 폭발하고 있습니다.',
                '2단계: 전 세계 소셜 인디 브랜드들이 K-뷰티를 벤치마킹하여 한국콜마, 코스맥스, 씨앤씨인터내셔널, 코스메카코리아에 초단기 ODM 생산을 위탁합니다.',
                '3단계: 생산 주문량이 공장 Capa를 넘어서면서 공장 가동률이 95% 이상으로 상승하고, 고정비 레버리지 효과로 영업이익률이 10~15% 수준으로 급증합니다.',
                '4단계: 에이피알(메디큐브 뷰티 디바이스), 브이티(리들샷), 마녀공장 등 독자 메가히트 제품 보유 기업은 마진율 20%를 돌파합니다.'
            ],
            sensitivity: '관세청 화장품 대미 수출액 1,000만 달러 증가 시 코스맥스·한국콜마 분기 영업이익 약 +40억~70억 원 직결. 방한 외국인 관광객 10% 증가 시 올리브영 입점 브랜드 매출 +8~12% 상승.',
            currentStatus: '관세청 기준 2026년 대미·대일 화장품 수출액이 사상 최대치를 연속 경신 중이며, 미국 세포라 및 아마존 프라임데이에서 한국 스킨케어 카테고리가 1~3위를 싹쓸이하는 슈퍼 호황기 진입.',
            outlookSignal: {
                level: 'POSITIVE',
                badgeText: '🟢 실적 대폭 호전 (K-뷰티 역사상 최대 분기 실적)',
                summary: '중국 리스크를 완전히 털어내고 북미·유럽·동남아 수출이 역사적 최고치를 돌파하고 있습니다. 코스맥스, 한국콜마의 수주잔고 포화 및 에이피알, 브이티의 해외 직수출 마진 폭발로 4분기 사상 최대 실적 달성이 확실시됩니다.'
            }
        },
        indicators: [
            {
                name: '관세청 화장품(HS코드 3304) 월간 대미 수출액',
                role: 'K-뷰티 글로벌 침투율 및 성장 속도 선행',
                impact: '대미 수출액 증가 시 ODM 및 인디 브랜드 주가 직결',
                benchmark: '월 1.2억 달러 이상 유지 시 강력한 분기 서프라이즈',
                sourceName: '관세청 무역통계정보포털(TRASS)',
                sourceUrl: 'https://www.trass.korea.kr/'
            },
            {
                name: '아마존 뷰티 & 퍼스널케어 실시간 베스트셀러 순위',
                role: '미국 현지 소비자 실시간 K-스킨케어 선호도 확인',
                impact: '조선미녀, 아누아, 코스알엑스, 브이티 순위 랭킹 직결',
                benchmark: 'Top 10 내 한국 브랜드 3개 이상 점유 시 독점적 흥행',
                sourceName: 'Amazon Beauty Best Sellers',
                sourceUrl: 'https://www.amazon.com/Best-Sellers-Beauty/zgbs/beauty'
            },
            {
                name: '한국관광공사 월간 방한 외래관광객 수',
                role: '올리브영 명동·홍대 매장 인바운드 소비 규모 선행',
                impact: '클리오, 마녀공장 등 올리브영 상위 입점사 매출 직결',
                benchmark: '월 150만 명 이상 입국 시 인바운드 면세·로드샵 특수',
                sourceName: '한국관광데이터랩',
                sourceUrl: 'https://datalab.visitkorea.or.kr/'
            }
        ],
        companies: [
            { name: '아모레퍼시픽', code: '090430', marketCap: '8조 2,000억', revenue: '4조 2,500억', operatingProfit: '3,850억', opMargin: 9.1, per: 24.5, pbr: 1.85, debtRatio: 25, currentRatio: 260, riskStatus: 'SAFE', dividendYield: 1.8, payoutRatio: 35.0, comment: '코스알엑스(COSRX) 인수 효과 대폭발로 북미 매출 비중 급증. 무차입에 가까운 초우량 재무' },
            { name: 'LG생활건강', code: '051900', marketCap: '5조 4,000억', revenue: '6조 8,000억', operatingProfit: '4,800억', opMargin: 7.1, per: 15.8, pbr: 1.05, debtRatio: 35, currentRatio: 210, riskStatus: 'SAFE', dividendYield: 2.4, payoutRatio: 30.0, comment: '더후 리브랜딩 및 북미·온라인 채널 재편. 부채비율 35% 초건전 자산주로 밸류에이션 바닥 탈출' },
            { name: '코스맥스', code: '192820', marketCap: '1조 6,800억', revenue: '2조 1,500억', operatingProfit: '1,820억', opMargin: 8.5, per: 12.8, pbr: 2.45, debtRatio: 185, currentRatio: 105, riskStatus: 'NORMAL', dividendYield: 1.5, payoutRatio: 18.0, comment: '글로벌 1위 화장품 연구개발 생산(ODM). 미국·한국 공장 가동률 100% 포화로 분기 최대 실적' },
            { name: '한국콜마', code: '161890', marketCap: '1조 5,200억', revenue: '2조 4,800억', operatingProfit: '2,100억', opMargin: 8.5, per: 13.5, pbr: 2.10, debtRatio: 135, currentRatio: 115, riskStatus: 'NORMAL', dividendYield: 1.4, payoutRatio: 16.0, comment: '선크림 제형 전 세계 독점적 1위 기술력. 미국 인디 브랜드 수주 폭주 및 미국 2공장 가동' },
            { name: '에이피알', code: '278470', marketCap: '2조 1,000억', revenue: '7,200억', operatingProfit: '1,540억', opMargin: 21.4, per: 16.5, pbr: 4.80, debtRatio: 32, currentRatio: 245, riskStatus: 'SAFE', dividendYield: 1.8, payoutRatio: 25.0, comment: '메디큐브 뷰티 디바이스 글로벌 대흥행. 21%대 독보적 영업마진과 미국·일본 직판 급성장' },
            { name: '씨앤씨인터내셔널', code: '352480', marketCap: '7,400억', revenue: '3,400억', operatingProfit: '520억', opMargin: 15.3, per: 16.2, pbr: 3.85, debtRatio: 48, currentRatio: 190, riskStatus: 'SAFE', dividendYield: 1.6, payoutRatio: 22.0, comment: '포뮬러 립/아이 포인트 메이크업 글로벌 1위 ODM. 입생로랑·세포라 브랜드 수주로 마진 15%' },
            { name: '코스메카코리아', code: '241710', marketCap: '9,800억', revenue: '5,800억', operatingProfit: '680억', opMargin: 11.7, per: 17.5, pbr: 3.20, debtRatio: 78, currentRatio: 165, riskStatus: 'SAFE', dividendYield: 1.2, payoutRatio: 15.0, comment: '미국 자회사 잉글우드랩 시너지. 북미 인디 브랜드 기초·선케어 수주 쇄도로 사상 최대 호황' },
            { name: '브이티', code: '018290', marketCap: '1조 1,500억', revenue: '4,200억', operatingProfit: '1,050억', opMargin: 25.0, per: 14.5, pbr: 5.20, debtRatio: 65, currentRatio: 180, riskStatus: 'SAFE', dividendYield: 1.5, payoutRatio: 20.0, comment: '리들샷(Riddle Shot) 전 세계 메가히트. 마진율 25%의 기적을 쓰며 일본 이어 미국 세포라 입점' },
            { name: '클리오', code: '237880', marketCap: '4,650억', revenue: '3,800억', operatingProfit: '420억', opMargin: 11.1, per: 13.8, pbr: 1.85, debtRatio: 38, currentRatio: 240, riskStatus: 'SAFE', dividendYield: 2.2, payoutRatio: 28.0, comment: '올리브영 1위 색조 브랜드. 미국·일본 오프라인 입점 가속 및 부채비율 38%의 탄탄한 재무' },
            { name: '마녀공장', code: '439090', marketCap: '3,200억', revenue: '1,350억', operatingProfit: '260억', opMargin: 19.3, per: 14.2, pbr: 2.65, debtRatio: 18, currentRatio: 450, riskStatus: 'SAFE', dividendYield: 2.0, payoutRatio: 25.0, comment: '퓨어 클렌징 오일 글로벌 1위. 미국 코스트코 매장 전역 입점 및 유동비율 450% 무차입 경영' }
        ]
    },
    {
        id: 'defense',
        sector: '방위산업 / K-방산 & 항공우주',
        icon: 'shield',
        description: '지정학적 리스크 지속 속 글로벌 국방예산 증액 및 K-9 자주포, 천궁, K-2 전차, FA-50 등 가성비와 납기 신뢰성을 무기로 100조 수주잔고를 확보한 국가 전략 수출 산업',
        relatedStocks: '한화에어로스페이스, 현대로템, LIG넥스원, 한국항공우주(KAI), 풍산, 한화시스템, 현대위아, SNT모티브, 쎄트렉아이, 퍼스텍',
        correlationLogic: {
            formula: '지정학적 분쟁 지속 + 글로벌 국방예산 증액 ➔ 수주잔고(Backlog) 100조 돌파 ➔ 양산 매출 본격화 ➔ 영업이익률 10%대 안착 및 실적 레벨업',
            details: [
                '1단계: 동유럽·중동·아시아태평양 등 글로벌 안보 위기로 각국 정부가 GDP 대비 국방비 비중을 2% 이상으로 긴급 증액하고 있습니다.',
                '2단계: 미국·유럽 방산기업은 긴 납기(3~5년)와 높은 가격 문제가 있는 반면, 한국 방산은 1년 내 신속 공급(빠른 납기)과 검증된 가성비로 글로벌 수주를 독점합니다.',
                '3단계: 계약 후 1~2년의 준비 기간을 거쳐 본격적인 인도(납품) 사이클이 시작되면 마진율 높은 수출 실적이 분기 매출로 직결됩니다.',
                '4단계: 납품 이후 30년간 이어지는 탄약, 후속 MRO(유지보수), 부품 공급 계약은 불황 없는 장기 고수익 캐시카우가 됩니다.'
            ],
            sensitivity: '수출 계약 1조 원 수주 시 향후 3~4년간 연평균 영업이익 약 +300억~450억 원 고정 기여. 방산 수출 비중 10%p 상승 시 업종 평균 OPM 약 +2.5%p 개선.',
            currentStatus: '폴란드 2차 실행계약, 루마니아 K-9 자주포, 중동 천궁-II 수주가 잇따라 실적에 반영되기 시작하며 한화에어로스페이스와 현대로템의 분기 영업이익이 사상 최고치 경신 중.',
            outlookSignal: {
                level: 'POSITIVE',
                badgeText: '🟢 실적 대폭 호전 (수출 양산기 진입으로 어닝 서프라이즈)',
                summary: '수주잔고가 매출로 본격 전환되는 골든 사이클에 진입했습니다. 한화에어로스페이스의 폴란드 K9/천무 인도 확대와 현대로템의 K2 전차 납품으로 2026년 하반기 실적은 창사 이래 최대치를 기록할 전망입니다.'
            }
        },
        indicators: [
            {
                name: 'K-방산 4사(한화·로템·LIG·KAI) 합산 수주잔고',
                role: '향후 5~7년간의 방산 매출 및 이익을 사전 보장하는 절대 지표',
                impact: '수주잔고 100조 돌파 시 장기 밸류에이션 리레이팅 직결',
                benchmark: '수주잔고 80조 이상 시 강력한 실적 방어력 확보',
                sourceName: 'DAPA 방위사업청 통계',
                sourceUrl: 'https://www.dapa.go.kr/'
            },
            {
                name: 'NATO 회원국 국방비 GDP 대비 지출 비중',
                role: '유럽 및 중동 국가들의 무기체계 신규 도입 예산 규모',
                impact: '지출 비중 2.0% 돌파 시 한국산 무기체계 조기 발주',
                benchmark: '2.5% 상향 논의 확산 시 K-2, 천무 추가 계약 가능성',
                sourceName: 'NATO Defence Expenditure Reports',
                sourceUrl: 'https://www.nato.int/cps/en/natohq/topics_49198.htm'
            },
            {
                name: 'LME 구리(Copper) 및 특수강 가격',
                role: '탄약(풍산) 및 포신·장갑차 차체 제작 원가',
                impact: '원자재가 안정 시 방산 탄약 수출 마진 극대화',
                benchmark: '구리 톤당 $9,500 이하 안정적, 탄약 판매가격 연동제 적용',
                sourceName: 'LME 공식 시세',
                sourceUrl: 'https://www.lme.com/'
            }
        ],
        companies: [
            { name: '한화에어로스페이스', code: '012450', marketCap: '17조 8,000억', revenue: '12조 5,000억', operatingProfit: '1조 2,800억', opMargin: 10.2, per: 18.5, pbr: 3.40, debtRatio: 185, currentRatio: 120, riskStatus: 'NORMAL', dividendYield: 1.1, payoutRatio: 15.0, comment: '대한민국 대표 방산 총괄. K9 자주포, 천무 다련장 로켓 수출 폭발로 사상 첫 영업익 1조 돌파' },
            { name: '현대로템', code: '064350', marketCap: '6조 4,000억', revenue: '4조 6,000억', operatingProfit: '4,850억', opMargin: 10.5, per: 15.2, pbr: 2.80, debtRatio: 145, currentRatio: 130, riskStatus: 'NORMAL', dividendYield: 1.2, payoutRatio: 16.0, comment: 'K2 흑표 전차 폴란드·루마니아 수출 본격 인도. 영업이익률 10% 돌파하며 실적 레벨업' },
            { name: 'LIG넥스원', code: '079550', marketCap: '4조 8,000억', revenue: '2조 9,500억', operatingProfit: '2,650억', opMargin: 9.0, per: 19.8, pbr: 3.85, debtRatio: 165, currentRatio: 125, riskStatus: 'NORMAL', dividendYield: 1.5, payoutRatio: 22.0, comment: '천궁-II UAE·사우디·이라크 조단위 수출 싹쓸이. 미국 고스트로보틱스 인수로 로봇 방산 선도' },
            { name: '한국항공우주', code: '047810', marketCap: '5조 2,000억', revenue: '3조 8,000억', operatingProfit: '2,800억', opMargin: 7.4, per: 21.0, pbr: 2.95, debtRatio: 210, currentRatio: 105, riskStatus: 'WARNING', dividendYield: 1.3, payoutRatio: 20.0, comment: 'FA-50 경공격기 폴란드·말레이시아 수출 및 KF-21 양산 개시. 부채비율 210% 수준 주시' },
            { name: '풍산', code: '103140', marketCap: '1조 8,500억', revenue: '4조 5,000억', operatingProfit: '3,200억', opMargin: 7.1, per: 7.5, pbr: 0.85, debtRatio: 78, currentRatio: 175, riskStatus: 'SAFE', dividendYield: 3.2, payoutRatio: 24.0, comment: '글로벌 탄약 쇼티지 최대 수혜. 155mm 포탄 수출 단가 급등 및 신동 사업부 안정적 현금 창출' },
            { name: '한화시스템', code: '272210', marketCap: '3조 8,000억', revenue: '2조 7,000억', operatingProfit: '1,750억', opMargin: 6.5, per: 22.0, pbr: 1.65, debtRatio: 85, currentRatio: 165, riskStatus: 'SAFE', dividendYield: 1.4, payoutRatio: 25.0, comment: 'AESA 레이더, 전술통신 등 방산 전자 두뇌 독점. 저궤도 위성 통신 신사업으로 우주 밸류에이션' },
            { name: '현대위아', code: '011210', marketCap: '1조 6,500억', revenue: '8조 5,000억', operatingProfit: '2,600억', opMargin: 3.1, per: 9.8, pbr: 0.42, debtRatio: 110, currentRatio: 125, riskStatus: 'NORMAL', dividendYield: 2.8, payoutRatio: 22.0, comment: 'K2 전차 및 K9 자주포 주포·포신 독점 공급. 자동차 부품 안정화 및 PBR 0.42배 자산주' },
            { name: 'SNT모티브', code: '064960', marketCap: '4,500억', revenue: '1조 1,000억', operatingProfit: '1,120억', opMargin: 10.2, per: 6.2, pbr: 0.58, debtRatio: 32, currentRatio: 290, riskStatus: 'SAFE', dividendYield: 4.8, payoutRatio: 28.0, comment: '국군 K시리즈 소구경 화기(K15, K16) 독점. 현대차 EV 모터 사업 병행하며 4.8% 고배당' },
            { name: '쎄트렉아이', code: '099320', marketCap: '4,200억', revenue: '1,650억', operatingProfit: '180억', opMargin: 10.9, per: 28.0, pbr: 2.80, debtRatio: 42, currentRatio: 240, riskStatus: 'SAFE', dividendYield: 0.8, payoutRatio: 15.0, comment: '국내 최고해상도 초고해상도 지구관측 위성 제작. 한화에어로스페이스 자회사 편입 시너지' },
            { name: '퍼스텍', code: '010820', marketCap: '1,500억', revenue: '1,800억', operatingProfit: '95억', opMargin: 5.3, per: 18.5, pbr: 1.65, debtRatio: 135, currentRatio: 115, riskStatus: 'NORMAL', dividendYield: 1.2, payoutRatio: 18.0, comment: '유도무기 구동장치 및 사격통제장치 전문. K-방산 수출 확대에 따른 부품 납품 수혜' }
        ]
    },
    {
        id: 'semi',
        sector: '반도체 / IT 하드웨어',
        icon: 'cpu',
        description: '글로벌 AI 데이터센터 투자 사이클, HBM(고대역폭메모리) 수요 폭발, DRAM/NAND 고정거래가격 상승이 실적을 견인하는 대한민국 시가총액 1위 핵심 산업',
        relatedStocks: '삼성전자, SK하이닉스, 한미반도체, 원익IPS, 리노공업, 동진쎄미켐, HPSP, 솔브레인, 주성엔지니어링, ISC',
        correlationLogic: {
            formula: 'DRAM/NAND 고정거래가격 상승 + 빅테크 AI CapEx 증액(HBM 수주 완판) ➔ 비트 그로스(출하량 증가) 및 ASP(판가) 동반 급등 ➔ 영업이익률 30~45% 달성',
            details: [
                '1단계: 마이크로소프트, 구글, 메타, 아마존 등 글로벌 빅테크 기업들이 AI 가속기 및 AI 데이터센터 투자를 매년 수백억 달러 규모로 증액합니다.',
                '2단계: 엔비디아의 차세대 GPU에 장착되는 HBM3E, HBM4를 독점 공급하는 SK하이닉스와 삼성전자의 프리미엄 메모리 수주잔고가 1년치 이상 완판됩니다.',
                '3단계: 레거시 범용 메모리(DDR5, 엔터프라이즈 SSD) 역시 공급사들의 감산 및 AI 수요 전이로 고정거래가격이 분기마다 10~20%씩 급등합니다.',
                '4단계: 판가(ASP) 상승은 추가 비용이 거의 들지 않으므로, 가격 상승분의 70~80%가 고스란히 영업이익으로 전환되어 분기 조단위 흑자 폭증으로 이어집니다.'
            ],
            sensitivity: 'DRAM 고정거래가격 10% 상승 시 SK하이닉스 분기 영업이익 약 +1.2조~1.5조 원 증가. 삼성전자 반도체(DS) 부문 연간 영업이익 약 +8조~10조 원 레버리지.',
            currentStatus: 'HBM3E 8단/12단 물량이 2026년까지 완판된 상태이며, 서버용 eSSD 수요 폭증으로 NAND 가격까지 가파르게 반등하며 메모리 슈퍼사이클 정점 유지.',
            outlookSignal: {
                level: 'POSITIVE',
                badgeText: '🟢 실적 대폭 호전 (AI 메모리 슈퍼사이클)',
                summary: 'SK하이닉스의 분기 7조원대 영업이익 및 삼성전자 DS부문 턴어라운드가 가속화되고 있습니다. 한미반도체 등 TC본더 밸류체인 장비주들의 실적 또한 4분기 사상 최대치를 경신할 전망입니다.'
            }
        },
        indicators: [
            {
                name: 'DRAMeXchange PC DRAM D畫 8Gb 고정거래가',
                role: '글로벌 메모리 반도체 공급-수요 균형 및 가격 선행',
                impact: '가격 상승 시 삼성전자·SK하이닉스 영업이익 직결',
                benchmark: '$2.0 이상 완연한 호황, $1.5 이하 불황',
                sourceName: 'TrendForce DRAMeXchange',
                sourceUrl: 'https://www.trendforce.com/price/dram'
            },
            {
                name: '필라델피아 반도체 지수 (SOX)',
                role: '글로벌 반도체 밸류체인 센티먼트 및 주가 선행',
                impact: '지수 상승 시 외인 수급 집중 및 소부장 랠리 유발',
                benchmark: '5,000pt 돌파 시 글로벌 AI 반도체 투자 슈퍼사이클',
                sourceName: 'TradingView SOX Index',
                sourceUrl: 'https://kr.tradingview.com/symbols/NASDAQ-SOX/'
            },
            {
                name: 'TSMC 월간 매출액 동향 (Monthly Revenue)',
                role: '전 세계 파운드리 및 AI 가속기 실물 칩 출하 선행',
                impact: '매출 전년비 +30% 이상 성장 시 글로벌 반도체 호황 확인',
                benchmark: '월 매출 2,500억 대만달러 돌파 시 강력 호황',
                sourceName: 'TSMC Investor Relations',
                sourceUrl: 'https://investor.tsmc.com/english/monthly-revenue'
            }
        ],
        companies: [
            { name: '삼성전자', code: '005930', marketCap: '412조 원', revenue: '310조 원', operatingProfit: '38조 원', opMargin: 12.3, per: 13.5, pbr: 1.15, debtRatio: 26, currentRatio: 275, riskStatus: 'SAFE', dividendYield: 2.8, payoutRatio: 32.0, comment: '글로벌 메모리·파운드리·스마트폰 1위. 100조 원 이상 순현금 보유한 대한민국 절대 대장주' },
            { name: 'SK하이닉스', code: '000660', marketCap: '138조 원', revenue: '66조 원', operatingProfit: '24조 원', opMargin: 36.4, per: 7.2, pbr: 1.95, debtRatio: 48, currentRatio: 185, riskStatus: 'SAFE', dividendYield: 1.5, payoutRatio: 20.0, comment: 'HBM 세계 독점적 1위 공급자. 36%대 압도적 영업마진율과 분기 7조원 영업익 신기록 달성' },
            { name: '한미반도체', code: '042700', marketCap: '11조 5,000억', revenue: '5,800억', operatingProfit: '2,450억', opMargin: 42.2, per: 45.0, pbr: 12.5, debtRatio: 18, currentRatio: 420, riskStatus: 'SAFE', dividendYield: 0.8, payoutRatio: 15.0, comment: 'HBM 제조 필수 장비인 듀얼 TC본더 글로벌 독점. 42%의 경이로운 마진과 글로벌 빅테크 러브콜' },
            { name: '원익IPS', code: '240810', marketCap: '1조 6,500억', revenue: '9,200억', operatingProfit: '850억', opMargin: 9.2, per: 18.5, pbr: 1.35, debtRatio: 35, currentRatio: 240, riskStatus: 'SAFE', dividendYield: 1.4, payoutRatio: 22.0, comment: '국내 전공정 증착(ALD/CVD) 1위 장비사. 삼성전자·SK하이닉스 메모리 전환 투자 재개 수혜' },
            { name: '리노공업', code: '058470', marketCap: '3조 4,000억', revenue: '3,200억', operatingProfit: '1,420억', opMargin: 44.4, per: 24.0, pbr: 5.50, debtRatio: 12, currentRatio: 650, riskStatus: 'SAFE', dividendYield: 2.1, payoutRatio: 40.0, comment: '반도체 테스트 소켓·핀 글로벌 독점력. 영업이익률 44%, 유동비율 650%의 무차입 글로벌 히든챔피언' },
            { name: '동진쎄미켐', code: '005290', marketCap: '2조 1,000억', revenue: '1조 4,500억', operatingProfit: '1,950억', opMargin: 13.4, per: 12.2, pbr: 1.95, debtRatio: 65, currentRatio: 175, riskStatus: 'SAFE', dividendYield: 1.5, payoutRatio: 18.0, comment: 'EUV/KrF 감광액(PR) 국산화 1위. 3D V-NAND 단수 증가에 따른 소재 사용량 급증 수혜' },
            { name: 'HPSP', code: '403870', marketCap: '3조 2,000억', revenue: '2,100억', operatingProfit: '1,150억', opMargin: 54.8, per: 28.5, pbr: 8.50, debtRatio: 15, currentRatio: 580, riskStatus: 'SAFE', dividendYield: 0.9, payoutRatio: 16.0, comment: '고압 수소 어닐링 장비 세계 독점. 경이로운 54% 영업이익률과 첨단 파운드리·메모리 필수 장비' },
            { name: '솔브레인', code: '357780', marketCap: '1조 8,500억', revenue: '9,800억', operatingProfit: '1,720억', opMargin: 17.6, per: 11.5, pbr: 1.65, debtRatio: 22, currentRatio: 380, riskStatus: 'SAFE', dividendYield: 2.2, payoutRatio: 24.0, comment: '반도체 식각액(고순도 불산) 및 화학소재 대표주. 메모리 가동률 100% 회복에 따른 소모품 특수' },
            { name: '주성엔지니어링', code: '036930', marketCap: '1조 7,000억', revenue: '4,500억', operatingProfit: '1,280억', opMargin: 28.4, per: 14.2, pbr: 3.40, debtRatio: 28, currentRatio: 290, riskStatus: 'SAFE', dividendYield: 1.8, payoutRatio: 20.0, comment: '원자층증착(ALD) 세계 최고 기술력. 북미 글로벌 파운드리 고객사 다변화로 이익 급증' },
            { name: 'ISC', code: '095340', marketCap: '1조 2,500억', revenue: '2,400억', operatingProfit: '720억', opMargin: 30.0, per: 22.0, pbr: 3.10, debtRatio: 35, currentRatio: 260, riskStatus: 'SAFE', dividendYield: 1.0, payoutRatio: 15.0, comment: 'SK그룹 계열 실리콘 러버 테스트 소켓 세계 1위. AI 반도체 패키징 테스트 수주 독점' }
        ]
    },
    {
        id: 'battery',
        sector: '2차전지 / 배터리 소재',
        icon: 'battery-charging',
        description: '글로벌 전기차(EV) 캐즘(일시적 수요 둔화) 극복 여부, 탄산리튬·수산화리튬 시세 반등, 미국 IRA 보조금(AMPC) 및 ESS(에너지저장장치) 배터리 성장이 실적 핵심',
        relatedStocks: 'LG에너지솔루션, 삼성SDI, POSCO홀딩스, 포스코퓨처엠, 에코프로비엠, 엘앤에프, 에코프로, SK이노베이션, 코스모신소재, 대주전자재료',
        correlationLogic: {
            formula: '리튬·니켈 메탈가격 바닥 통과 + 판가 연동 하락 멈춤 + 미국 ESS 수주 급증 ➔ 재고평가손실 환입 및 AMPC 보조금 확대 ➔ 실적 턴어라운드',
            details: [
                '1단계: 2차전지 양극재와 셀 가격은 원자재(리튬, 니켈, 코발트) 가격에 연동(패스스루)되는 구조입니다.',
                '2단계: 리튬 가격이 급락하면 과거 고가에 사둔 원재료로 만든 배터리를 싼값에 팔아야 하므로 대규모 재고평가손실(역래깅 효과)이 발생합니다.',
                '3단계: 리튬 가격이 바닥을 치고 안정화되면 역래깅이 소멸되고, 정상적인 가공 마진(양극재 6~8%, 셀 8~10%)이 회복됩니다.',
                '4단계: 최근 AI 데이터센터 증설에 따른 대규모 전력망 ESS(에너지저장장치) 배터리 수주가 폭증하며 EV 캐즘을 빠르게 상쇄하고 있습니다.'
            ],
            sensitivity: '수산화리튬 가격 kg당 $5 상승 시 에코프로비엠·포스코퓨처엠 분기 영업이익 약 +300억~500억 원 재고평가손실 환입 효과 발생.',
            currentStatus: '탄산리튬 시세가 톤당 7만~8만 위안선에서 바닥 다지기를 진행 중이며, 미국 IRA AMPC 보조금과 대형 전력망 ESS 수주로 최악의 국면 통과 중.',
            outlookSignal: {
                level: 'NEUTRAL',
                badgeText: '⚪ 바닥 통과 및 점진적 턴어라운드',
                summary: '전기차 수요 둔화 우려는 주가와 실적에 대부분 선반영되었습니다. 리튬가 하락 멈춤과 미국 전력망 ESS 배터리 납품 확대로 4분기부터 재고손실이 소멸되며 완만한 턴어라운드가 시작될 전망입니다.'
            }
        },
        indicators: [
            {
                name: '탄산리튬(Lithium Carbonate) 선물 시세',
                role: '양극재 판가 및 배터리 셀 제조원가 결정 핵심',
                impact: '가격 반등 시 에코프로비엠·엘앤에프 재고평가손익 환입',
                benchmark: '톤당 10만 위안 이상 회복 시 본격 호황 재진입',
                sourceName: '광물자원공사 한국자원정보서비스(KOMIS)',
                sourceUrl: 'https://www.komis.or.kr/'
            },
            {
                name: 'LME 니켈(Nickel) 공식 선물 가격',
                role: '하이니켈(NCM, NCMA) 양극재 제조원가 결정',
                impact: '가격 안정 시 포스코퓨처엠·LG에너지솔루션 마진 방어',
                benchmark: '톤당 $18,000 이상 시 하이니켈 수익성 극대화',
                sourceName: 'LME Nickel Official',
                sourceUrl: 'https://www.lme.com/en/metals/non-ferrous/lme-nickel'
            },
            {
                name: '미국 IRA AMPC(첨단제조생산세액공제) 수령액',
                role: '미국 현지 배터리 셀 생산 시 kWh당 $35 현금 지원',
                impact: 'LG에너지솔루션 분기 영업이익의 40~60% 이상 차지',
                benchmark: '분기당 3,000억 원 이상 수령 시 실적 견인',
                sourceName: '미국 국세청(IRS) IRA 가이드라인',
                sourceUrl: 'https://www.irs.gov/clean-vehicle-credits'
            }
        ],
        companies: [
            { name: 'LG에너지솔루션', code: '373220', marketCap: '92조 원', revenue: '31조 원', operatingProfit: '1조 6,800억', opMargin: 5.4, per: 65.0, pbr: 4.10, debtRatio: 82, currentRatio: 145, riskStatus: 'SAFE', dividendYield: 0.0, payoutRatio: 0.0, comment: '글로벌 배터리 1위(중국 제외). 미국 공장 가동 확대 및 AI 전력망 ESS 배터리 수주 폭발' },
            { name: '삼성SDI', code: '006400', marketCap: '24조 5,000억', revenue: '21조 원', operatingProfit: '1조 2,500억', opMargin: 6.0, per: 18.2, pbr: 1.25, debtRatio: 75, currentRatio: 160, riskStatus: 'SAFE', dividendYield: 1.2, payoutRatio: 15.0, comment: '프리미엄 각형 배터리 및 전고체 배터리(ASB) 선도. 부채비율 75%의 가장 건전한 배터리사' },
            { name: 'POSCO홀딩스', code: '005490', marketCap: '29조 원', revenue: '74조 원', operatingProfit: '3조 2,000억', opMargin: 4.3, per: 14.5, pbr: 0.52, debtRatio: 62, currentRatio: 195, riskStatus: 'SAFE', dividendYield: 3.2, payoutRatio: 30.0, comment: '철강 캐시카우 기반 아르헨티나 리튬 염호 등 풀 밸류체인 구축. PBR 0.52배 극저평가 가치주' },
            { name: '포스코퓨처엠', code: '003670', marketCap: '17조 8,000억', revenue: '4조 5,000억', operatingProfit: '1,450억', opMargin: 3.2, per: 85.0, pbr: 5.20, debtRatio: 165, currentRatio: 125, riskStatus: 'NORMAL', dividendYield: 0.3, payoutRatio: 15.0, comment: '양극재·음극재 동시 생산 국내 유일. GM·얼티엄셀즈 장기 공급 계약으로 수주잔고 탄탄' },
            { name: '에코프로비엠', code: '247540', marketCap: '16조 5,000억', revenue: '3조 8,000억', operatingProfit: '1,120억', opMargin: 2.9, per: 95.0, pbr: 6.80, debtRatio: 145, currentRatio: 135, riskStatus: 'NORMAL', dividendYield: 0.4, payoutRatio: 10.0, comment: '하이니켈 양극재 글로벌 1위. 리튬가 안정화로 재고손실 소멸 및 헝가리 유럽 신공장 가동' },
            { name: '엘앤에프', code: '066970', marketCap: '3조 8,000억', revenue: '2조 8,000억', operatingProfit: '-850억', opMargin: -3.0, per: -1, pbr: 2.10, debtRatio: 195, currentRatio: 98, riskStatus: 'NORMAL', dividendYield: 0.0, payoutRatio: 0.0, comment: '테슬라 직납 하이니켈 NCMA 양극재 공급사. 4분기 LFP 및 신제품 라인업 확대로 적자 탈출' },
            { name: '에코프로', code: '086520', marketCap: '22조 원', revenue: '4조 2,000억', operatingProfit: '1,350억', opMargin: 3.2, per: 110.0, pbr: 7.20, debtRatio: 125, currentRatio: 140, riskStatus: 'NORMAL', dividendYield: 0.3, payoutRatio: 8.0, comment: '에코프로 그룹 지주사. 수산화리튬 가공(이노베이션), 폐배터리 리사이클(씨엔지) 수직계열화' },
            { name: 'SK이노베이션', code: '096770', marketCap: '11조 2,000억', revenue: '76조 원', operatingProfit: '1조 8,500억', opMargin: 2.4, per: 12.0, pbr: 0.48, debtRatio: 188, currentRatio: 110, riskStatus: 'NORMAL', dividendYield: 2.5, payoutRatio: 25.0, comment: 'SK E&S와의 합병으로 연 2조원대 세전이익(EBITDA) 창출 기반 완성. SK온 재무부담 해소' },
            { name: '코스모신소재', code: '005070', marketCap: '3조 6,000억', revenue: '6,200억', operatingProfit: '480억', opMargin: 7.7, per: 68.0, pbr: 5.50, debtRatio: 85, currentRatio: 185, riskStatus: 'SAFE', dividendYield: 0.2, payoutRatio: 10.0, comment: 'LG화학·삼성SDI 밸류체인 진입 및 NCM 양극재 대규모 증설. OPM 7%대의 탄탄한 수익성' },
            { name: '대주전자재료', code: '078600', marketCap: '1조 7,500억', revenue: '2,600억', operatingProfit: '320억', opMargin: 12.3, per: 55.0, pbr: 8.20, debtRatio: 135, currentRatio: 125, riskStatus: 'NORMAL', dividendYield: 0.3, payoutRatio: 10.0, comment: '실리콘 음극재 세계 유일 양산 상용화. 포르쉐에 이어 글로벌 완성차 EV 채택 폭발' }
        ]
    },
    {
        id: 'auto',
        sector: '자동차 / 완성차 & 핵심부품',
        icon: 'car',
        description: '하이브리드(HEV) 차량 폭발적 인기, 제네시스/SUV 고수익 믹스 개선, 미국·인도 시장 점유율 확대 및 원/달러 고환율 수혜로 역대급 현금을 창출하는 밸류업 대표 산업',
        relatedStocks: '현대차, 기아, 현대모비스, 한온시스템, HL만도, 현대위아, SL, 서연이화, 화신, 성우하이텍',
        correlationLogic: {
            formula: '고수익 SUV·하이브리드 판매 비중 70% 돌파 + 원/달러 고환율(1,320원대) 유지 ➔ 평균판매단가(ASP) 상승 ➔ 연간 합산 영업익 28조 원 신기록',
            details: [
                '1단계: 순수 전기차(EV) 둔화 국면에서 현대차·기아는 압도적 연비의 하이브리드(HEV) 풀 라인업으로 글로벌 수요를 완벽히 흡수했습니다.',
                '2단계: 북미 시장에서 제네시스 및 투싼·스포티지·팰리세이드 등 고마진 SUV 판매 비중이 70%를 상회하며 대당 판매단가(ASP)가 사상 최고치를 경신했습니다.',
                '3단계: 원/달러 환율이 1,300원 이상의 우호적 구간을 유지하여 대규모 환산 이익이 발생하고, 낮은 인센티브(할인폭)로 마진을 방어합니다.',
                '4단계: 현대모비스, HL만도, SL 등 부품 계열사 역시 전장화(ADAS, 자율주행, LED헤드램프) 부품 비중 확대로 이익 동반 성장을 구가합니다.'
            ],
            sensitivity: '원/달러 환율 10원 상승 시 현대차·기아 합산 연간 영업이익 약 +2,500억~3,000억 원 증가 효과. 하이브리드 판매 비중 1%p 상승 시 OPM 약 +0.3%p 기여.',
            currentStatus: '미국 시장 역대 최다 판매 기록 경신 및 인도 법인(HMI) 초대형 IPO 성공으로 4조원 이상의 신규 현금 유입 확정.',
            outlookSignal: {
                level: 'POSITIVE',
                badgeText: '🟢 실적 대폭 호전 및 밸류업 극대화',
                summary: '하이브리드 판매 호조와 1,300원대 고환율이 실적을 든든하게 받쳐주고 있습니다. 2026년 연간 합산 영업이익 28조 원 돌파와 더불어 자사주 소각, 배당성향 35% 상향 등 코리아 디스카운트 해소의 중심에 설 전망입니다.'
            }
        },
        indicators: [
            {
                name: '미국 신차 연간판매속도 (TOTAL SAAR)',
                role: '세계 최대 고수익 자동차 시장인 미국 내 소비 체력',
                impact: '1,550만 대 이상 유지 시 현대차·기아 분기 실적 보장',
                benchmark: '연간 1,600만 대 이상 호황 국면',
                sourceName: 'FRED 미국 세인트루이스 연준',
                sourceUrl: 'https://fred.stlouisfed.org/series/TOTALSAAR'
            },
            {
                name: 'KAMA 자동차 월간 수출 통계',
                role: '한국 완성차 및 자동차 부품의 전 세계 수출 물량/금액 선행',
                impact: '월간 수출액 60억 달러 상회 시 완성차 및 부품사 어닝 서프라이즈',
                benchmark: '하이브리드 수출 증가율 전년비 +40% 이상 유지',
                sourceName: '한국자동차모빌리티산업협회(KAMA)',
                sourceUrl: 'https://www.kama.or.kr/'
            },
            {
                name: '원/달러 환율 (USD/KRW)',
                role: '완성차 수출 마진 및 북미 매출 환산 손익 결정',
                impact: '환율 1,300원 이상 유지 시 대규모 영업이익 레버리지',
                benchmark: '1,300원 초과 시 강력한 실적 서포트',
                sourceName: '한국은행 ECOS',
                sourceUrl: 'https://ecos.bok.or.kr/'
            }
        ],
        companies: [
            { name: '현대차', code: '005380', marketCap: '52조 원', revenue: '172조 원', operatingProfit: '15조 4,000억', opMargin: 9.0, per: 5.2, pbr: 0.65, debtRatio: 175, currentRatio: 135, riskStatus: 'NORMAL', dividendYield: 5.5, payoutRatio: 30.0, comment: '글로벌 완성차 3위. 연간 15조원 영업익, 인도법인 4조 현금 유입, 5.5% 고배당 및 자사주 매입' },
            { name: '기아', code: '000270', marketCap: '41조 원', revenue: '108조 원', operatingProfit: '12조 8,000억', opMargin: 11.9, per: 4.5, pbr: 0.85, debtRatio: 65, currentRatio: 190, riskStatus: 'SAFE', dividendYield: 6.2, payoutRatio: 32.0, comment: '영업이익률 11.9%로 글로벌 완성차 최고 수준. 부채비율 65%의 초건전 재무와 6%대 초고배당' },
            { name: '현대모비스', code: '012330', marketCap: '23조 원', revenue: '58조 원', operatingProfit: '2조 7,500억', opMargin: 4.7, per: 6.8, pbr: 0.48, debtRatio: 45, currentRatio: 220, riskStatus: 'SAFE', dividendYield: 2.8, payoutRatio: 20.0, comment: '핵심 전장부품 및 AS 부품 캐시카우. PBR 0.48배 극저평가 해소를 위한 지배구조 개편 기대주' },
            { name: '한온시스템', code: '018880', marketCap: '2조 4,000억', revenue: '9조 8,000억', operatingProfit: '3,800억', opMargin: 3.9, per: 15.0, pbr: 1.15, debtRatio: 285, currentRatio: 88, riskStatus: 'WARNING', dividendYield: 4.5, payoutRatio: 65.0, comment: '한국타이어 그룹 인수 완료로 재무 리스크 완화 중. 글로벌 2위 차량용 열관리 시스템 전문' },
            { name: 'HL만도', code: '204320', marketCap: '1조 9,500억', revenue: '8조 8,000억', operatingProfit: '3,550억', opMargin: 4.0, per: 8.5, pbr: 0.75, debtRatio: 155, currentRatio: 115, riskStatus: 'NORMAL', dividendYield: 2.5, payoutRatio: 22.0, comment: '자율주행 섀시(제동·조향) 및 테슬라·인도 완성차 공급사. 북미 EV 및 인도 시장 동반 급성장' },
            { name: '현대위아', code: '011210', marketCap: '1조 6,500억', revenue: '8조 5,000억', operatingProfit: '2,600억', opMargin: 3.1, per: 9.8, pbr: 0.42, debtRatio: 110, currentRatio: 125, riskStatus: 'NORMAL', dividendYield: 2.8, payoutRatio: 22.0, comment: '4륜구동(AWD) 구동축 및 열관리 모듈 양산 본격화. 방산 부문 수주 확대 시너지' },
            { name: 'SL', code: '005850', marketCap: '1조 8,200억', revenue: '5조 1,000억', operatingProfit: '4,100억', opMargin: 8.0, per: 5.2, pbr: 0.88, debtRatio: 52, currentRatio: 195, riskStatus: 'SAFE', dividendYield: 3.8, payoutRatio: 20.0, comment: '차량용 지능형 헤드램프(LED) 글로벌 탑티어. GM·현대차향 고마진 램프 확대로 8%대 OPM 달성' },
            { name: '서연이화', code: '200880', marketCap: '4,800억', revenue: '3조 5,000억', operatingProfit: '2,100억', opMargin: 6.0, per: 3.2, pbr: 0.48, debtRatio: 135, currentRatio: 110, riskStatus: 'NORMAL', dividendYield: 3.5, payoutRatio: 15.0, comment: '차량용 내장재(도어트림, 콘솔) 1위. 현대차 미국 조지아 신공장 동반 진출로 PER 3배대 저평가' },
            { name: '화신', code: '010690', marketCap: '4,200억', revenue: '1조 8,500억', operatingProfit: '1,250억', opMargin: 6.8, per: 4.2, pbr: 0.62, debtRatio: 140, currentRatio: 115, riskStatus: 'NORMAL', dividendYield: 3.2, payoutRatio: 18.0, comment: '차량용 섀시 프레임 및 배터리 팩 케이스 전문. 고마진 경량화 신소재 납품으로 마진 안정' },
            { name: '성우하이텍', code: '015750', marketCap: '6,200억', revenue: '4조 2,000억', operatingProfit: '2,400억', opMargin: 5.7, per: 3.8, pbr: 0.38, debtRatio: 145, currentRatio: 110, riskStatus: 'NORMAL', dividendYield: 3.0, payoutRatio: 15.0, comment: '차체 범퍼 레일 및 전기차 배터리 보호 케이스 1위. PBR 0.38배 극저평가 자산주' }
        ]
    },
    {
        id: 'ship',
        sector: '조선 / 해양 플랜트 & 기자재',
        icon: 'anchor',
        description: '글로벌 친환경 LNG/암모니아선 고선가 선박 선별 수주, 3.5년치 도크 완판, 신조선가 지수 189pt 사상 최고치 및 후판가 하락에 따른 구조적 어닝 서프라이즈 슈퍼사이클',
        relatedStocks: 'HD한국조선해양, HD현대중공업, 한화오션, 삼성중공업, HD현대미포, HD현대마린솔루션, 한국카본, 동성화인텍, 세진중공업, HSD엔진',
        correlationLogic: {
            formula: '클락슨 신조선가 지수 사상 최고치(189pt+) + 2021~2023년 고가 수주물량 본격 매출 인식 + 조선용 후판(철판) 가격 하락 ➔ 조선 3사 13년 만의 동반 조단위 흑자 폭발',
            details: [
                '1단계: 전 세계 탈탄소 규제(IMO 2050)로 노후 선박 폐선과 친환경 LNG·메탄올·암모니아 추진선 교체 발주가 쏟아지고 있습니다.',
                '2단계: 한국 조선소의 도크(건조공간)는 2028년까지 3.5년치가 가득 차 있어, 선주들에게 가장 비싼 가격(고선가)을 부르는 선별 수주를 진행합니다.',
                '3단계: 조선업은 수주 후 2~3년 뒤 건조하며 매출을 인식(헤비테일 방식)하므로, 2022~2024년 고선가 수주 물량이 2026년부터 본격 실적으로 쏟아집니다.',
                '4단계: 제조원가의 20%를 차지하는 조선용 후판(두꺼운 철판) 가격이 중국산 저가 공세로 톤당 90만원대에서 70만원대로 급락해 원가 절감까지 가세합니다.'
            ],
            sensitivity: '신조선가 지수 5pt 상승 시 조선 3사 연간 영업이익 약 +8,000억 원 이상 증익 효과. 후판 가격 톤당 5만원 하락 시 대형 조선소당 연간 +500억~700억 원 원가 환입.',
            currentStatus: '신조선가 지수가 189.5pt로 2008년 조선 대호황기 역사적 최고점(191pt) 턱밑까지 상승했으며, HD현대 3사 및 삼성중공업의 분기 흑자 폭이 가파르게 확대 중.',
            outlookSignal: {
                level: 'POSITIVE',
                badgeText: '🟢 실적 대폭 호전 (13년 만의 슈퍼사이클)',
                summary: '고선가 선박 건조 비중이 85%를 돌파하며 3분기, 4분기 연속 조 단위 합산 영업이익 달성이 확실시됩니다. 인력 수급 안정과 후판가 하락이 맞물려 2027년까지 실적 피크아웃 없는 초호황이 지속될 전망입니다.'
            }
        },
        indicators: [
            {
                name: '클락슨 신조선가 지수 (Newbuilding Price Index)',
                role: '전 세계 신조선 가격의 절대적 벤치마크 (조선사 수익성 선행)',
                impact: '지수 185pt 돌파 시 건조 마진율 10~15% 이상 보장',
                benchmark: '189pt 수준으로 2008년 역사적 대호황 최고치 근접',
                sourceName: 'Clarksons Research Shipping Intelligence',
                sourceUrl: 'https://www.clarksons.com/'
            },
            {
                name: '조선용 후판(Thick Plate) 유통 가격',
                role: '선박 건조 원가의 20~25%를 차지하는 핵심 재료비',
                impact: '후판가 하락 시 기설정 공사손실충당금 대규모 환입',
                benchmark: '톤당 80만원 이하 안정적, 100만원 초과 시 마진 압박',
                sourceName: '스틸데일리 철강통계',
                sourceUrl: 'https://www.steeldaily.co.kr/'
            },
            {
                name: '원/달러 환율 (USD/KRW)',
                role: '선박 대금 100% 달러 결제에 따른 환차익 결정',
                impact: '환율 1,300원 이상 유지 시 대규모 영업이익 레버리지',
                benchmark: '1,300원 이상 고환율 지속 시 마진 극대화',
                sourceName: '한국은행 ECOS',
                sourceUrl: 'https://ecos.bok.or.kr/'
            }
        ],
        companies: [
            { name: 'HD한국조선해양', code: '009540', marketCap: '14조 5,000억', revenue: '25조 5,000억', operatingProfit: '1조 6,500억', opMargin: 6.5, per: 11.2, pbr: 1.25, debtRatio: 115, currentRatio: 125, riskStatus: 'NORMAL', dividendYield: 1.5, payoutRatio: 20.0, comment: 'HD현대 조선 중간지주사. HD현대중공업·삼호·미포를 거느린 압도적 글로벌 1위 조선 제국' },
            { name: 'HD현대중공업', code: '329180', marketCap: '18조 2,000억', revenue: '14조 8,000억', operatingProfit: '9,800억', opMargin: 6.6, per: 24.5, pbr: 3.20, debtRatio: 185, currentRatio: 110, riskStatus: 'NORMAL', dividendYield: 1.2, payoutRatio: 25.0, comment: '세계 최대 조선소이자 엔진 기계 독점. 미 해군 함정 MRO 사업 진출로 방산 가치 부각' },
            { name: '삼성중공업', code: '010140', marketCap: '9조 1,000억', revenue: '10조 2,000억', operatingProfit: '5,100억', opMargin: 5.0, per: 22.0, pbr: 2.15, debtRatio: 265, currentRatio: 98, riskStatus: 'WARNING', dividendYield: 0.0, payoutRatio: 0.0, comment: 'FLNG(부유식 LNG 생산설비) 해양 플랜트 독보적 1위. 10년 만의 배당 재개 기대' },
            { name: '한화오션', code: '042660', marketCap: '8조 8,000억', revenue: '10조 8,000억', operatingProfit: '4,200억', opMargin: 3.9, per: 26.5, pbr: 2.20, debtRatio: 245, currentRatio: 105, riskStatus: 'WARNING', dividendYield: 0.0, payoutRatio: 0.0, comment: '한화그룹 편입 후 특수선(잠수함, 호위함) 및 미국 필리조선소 인수로 글로벌 방산 조선 진화' },
            { name: 'HD현대미포', code: '010620', marketCap: '4조 2,000억', revenue: '4조 4,000억', operatingProfit: '1,850억', opMargin: 4.2, per: 28.0, pbr: 1.85, debtRatio: 125, currentRatio: 135, riskStatus: 'NORMAL', dividendYield: 1.0, payoutRatio: 20.0, comment: '중형 PC선 및 석유화학제품운반선 세계 시장점유율 50% 독점. 4분기 흑자전환 가속' },
            { name: 'HD현대마린솔루션', code: '443060', marketCap: '6조 2,000억', revenue: '1조 6,500억', operatingProfit: '2,400억', opMargin: 14.5, per: 32.0, pbr: 5.20, debtRatio: 45, currentRatio: 260, riskStatus: 'SAFE', dividendYield: 2.5, payoutRatio: 50.0, comment: '선박 평생 MRO 서비스 독점 및 친환경 선박 개조. 15%대 고마진과 50% 배당성향 주주환원' },
            { name: '한국카본', code: '017960', marketCap: '6,400억', revenue: '6,200억', operatingProfit: '650억', opMargin: 10.5, per: 11.5, pbr: 1.45, debtRatio: 55, currentRatio: 210, riskStatus: 'SAFE', dividendYield: 2.2, payoutRatio: 25.0, comment: 'LNG 운반선 화물창 보온단열재 글로벌 양강. LNG선 건조 폭증에 따른 장기 수주잔고 확보' },
            { name: '동성화인텍', code: '033500', marketCap: '4,200억', revenue: '5,800억', operatingProfit: '580억', opMargin: 10.0, per: 8.5, pbr: 1.65, debtRatio: 115, currentRatio: 130, riskStatus: 'NORMAL', dividendYield: 3.2, payoutRatio: 25.0, comment: '초저온 보온재(LNG 멤브레인) 1위. 3년치 일감 완판으로 OPM 10%대 안정적 현금 창출' },
            { name: '세진중공업', code: '075580', marketCap: '4,500억', revenue: '4,100억', operatingProfit: '420억', opMargin: 10.2, per: 12.0, pbr: 1.75, debtRatio: 125, currentRatio: 120, riskStatus: 'NORMAL', dividendYield: 2.8, payoutRatio: 30.0, comment: '선박 데크하우스(조타실) 및 대형 LPG/암모니아 탱크 세계 1위. 친환경 탱크 독점 수혜' },
            { name: 'HSD엔진', code: '082740', marketCap: '9,800억', revenue: '1조 1,500억', operatingProfit: '1,100억', opMargin: 9.6, per: 11.5, pbr: 2.45, debtRatio: 175, currentRatio: 105, riskStatus: 'NORMAL', dividendYield: 1.5, payoutRatio: 18.0, comment: '한화엔진으로 사명 변경. 대형 선박용 디젤 및 이중연료(DF) 친환경 선박 엔진 2위' }
        ]
    },
    {
        id: 'shipping',
        sector: '해운 / 물류 & 항공화물',
        icon: 'ship',
        description: '글로벌 해운 운임지수(SCFI, BDI), 홍해 사태 등 지정학적 우회 항로 발생에 따른 톤-마일 증가, 그리고 유류비 원가가 해운사의 천문학적 영업이익을 좌우하는 산업',
        relatedStocks: 'HMM, 팬오션, 대한해운, 대한항공, 아시아나항공, 현대글로비스, CJ대한통운, 흥아해운, 한진, KSS해운',
        correlationLogic: {
            formula: '컨테이너 운임(SCFI) 급등 + 홍해 희망봉 우회 항로 장기화 ➔ 선박 공급 부족 및 운임 급상승 ➔ 분기 영업이익 조 단위 폭증',
            details: [
                '1단계: 수에즈 운하(홍해) 통항 중단 사태로 전 세계 컨테이너 선박들이 아프리카 희망봉으로 10~14일씩 우회 운항하며 선박 공급이 부족해집니다.',
                '2단계: 상하이 컨테이너 운임지수(SCFI)가 팬데믹 이후 최고 수준인 2,500~3,500pt 수준으로 급등합니다.',
                '3단계: 해운사는 유류비 등 선박 운항 고정비가 일정하므로, 운임 상승분이 거의 그대로 영업이익으로 전환되는 고정비 레버리지가 폭발합니다.',
                '4단계: 단, 글로벌 신조 컨테이너선 대규모 인도(선복량 증가) 시 운임 하락 압력이 발생하므로 SCFI 지수 추이가 핵심 선행지표입니다.'
            ],
            sensitivity: 'SCFI 500pt 상승 시 HMM 연간 영업이익 약 +1조~1.5조 원 증가. 싱가포르 선박유(VLSFO) 톤당 $50 하락 시 연간 유류비 약 -600억 원 절감.',
            currentStatus: '홍해 지정학적 리스크 장기화로 미주·유럽 노선 운임이 높은 수준을 유지하고 있으며, HMM의 2026년 연간 영업이익이 3조원 이상으로 급증 확정.',
            outlookSignal: {
                level: 'POSITIVE',
                badgeText: '🟢 실적 대폭 호전 (고운임 유지로 어닝 서프라이즈)',
                summary: '글로벌 공급망 우회로 컨테이너 운임이 장기 호황을 누리고 있습니다. HMM의 3분기, 4분기 연속 조 단위 흑자 달성과 14조원에 달하는 순현금 유보금이 실적과 주가를 견인하고 있습니다.'
            }
        },
        indicators: [
            {
                name: '상하이 컨테이너 운임지수 (SCFI)',
                role: '글로벌 원양 컨테이너선 정기선 운임의 절대적 표준',
                impact: 'SCFI 상승 시 HMM 영업이익 수천억 원 단위 급증',
                benchmark: '1,500pt 이상 호황, 2,500pt 이상 슈퍼 어닝 시즌',
                sourceName: '상하이항운교역소(SSE)',
                sourceUrl: 'https://en.sse.net.cn/'
            },
            {
                name: '발틱 건화물 운임지수 (BDI)',
                role: '철광석·석탄·곡물 벌크선 운임 벤치마크',
                impact: 'BDI 상승 시 팬오션·대한해운 영업이익 직결',
                benchmark: '1,500pt 이상 안정적 흑자권',
                sourceName: 'Baltic Exchange Official',
                sourceUrl: 'https://www.balticexchange.com/'
            },
            {
                name: '글로벌 선박 연료유(VLSFO) 싱가포르 시세',
                role: '해운사 매출원가의 25~30%를 차지하는 유류비',
                impact: '유가 하락 시 해운사 운항 원가 대폭 절감',
                benchmark: '톤당 $600 이하 시 우호적 마진 환경',
                sourceName: 'Ship & Bunker 싱가포르 벙커유',
                sourceUrl: 'https://shipandbunker.com/prices/apac/sea/sg-sin-singapore'
            }
        ],
        companies: [
            { name: 'HMM', code: '011200', marketCap: '14조 2,000억', revenue: '11조 5,000억', operatingProfit: '3조 2,500억', opMargin: 28.3, per: 4.8, pbr: 0.58, debtRatio: 28, currentRatio: 380, riskStatus: 'SAFE', dividendYield: 4.2, payoutRatio: 25.0, comment: '국내 1위 국적 원양선사. 14조원 압도적 순현금 보유, 부채비율 28%, OPM 28%의 현금성 자산주' },
            { name: '팬오션', code: '028670', marketCap: '2조 1,500억', revenue: '4조 8,000억', operatingProfit: '4,800억', opMargin: 10.0, per: 6.8, pbr: 0.45, debtRatio: 75, currentRatio: 165, riskStatus: 'SAFE', dividendYield: 3.5, payoutRatio: 22.0, comment: '국내 1위 벌크선사. 하림그룹의 HMM 인수 무산으로 자금 리스크 소멸 및 PBR 0.45배 자산주' },
            { name: '대한항공', code: '003490', marketCap: '8조 5,000억', revenue: '16조 8,000억', operatingProfit: '2조 1,500억', opMargin: 12.8, per: 6.2, pbr: 0.85, debtRatio: 195, currentRatio: 110, riskStatus: 'NORMAL', dividendYield: 3.2, payoutRatio: 25.0, comment: '아시아나항공 합병 임박 메가 캐리어. 항공화물(전자상거래·반도체) 초호황 및 여객 마진 견고' },
            { name: '현대글로비스', code: '086280', marketCap: '8조 2,000억', revenue: '26조 5,000억', operatingProfit: '1조 6,800억', opMargin: 6.3, per: 6.5, pbr: 0.95, debtRatio: 72, currentRatio: 175, riskStatus: 'SAFE', dividendYield: 3.8, payoutRatio: 28.0, comment: '완성차 해상운송(PCTC) 선복 부족 수혜로 운임 재계약 폭등. 1:1 무상증자 및 주주환원 강화' },
            { name: 'CJ대한통운', code: '000120', marketCap: '2조 4,000억', revenue: '12조 2,000억', operatingProfit: '5,200억', opMargin: 4.3, per: 9.8, pbr: 0.65, debtRatio: 125, currentRatio: 115, riskStatus: 'NORMAL', dividendYield: 1.8, payoutRatio: 20.0, comment: '알리·테무 직구 및 주7일 매일배송 선언으로 택배 물동량 급증. 풀필먼트 마진 대폭 개선' },
            { name: '대한해운', code: '005880', marketCap: '5,800억', revenue: '1조 6,500억', operatingProfit: '2,900억', opMargin: 17.6, per: 3.8, pbr: 0.35, debtRatio: 145, currentRatio: 120, riskStatus: 'NORMAL', dividendYield: 0.0, payoutRatio: 0.0, comment: '포스코·한국가스공사 장기 전용선 계약 위주로 불황 없는 안정적 17% 영업이익률 창출' },
            { name: 'KSS해운', code: '044450', marketCap: '2,400억', revenue: '4,800억', operatingProfit: '850억', opMargin: 17.7, per: 4.5, pbr: 0.48, debtRatio: 215, currentRatio: 95, riskStatus: 'WARNING', dividendYield: 3.8, payoutRatio: 20.0, comment: 'LPG 및 암모니아 해상운송 국내 1위. 장기 대선 계약 중심이나 높은 부채비율(215%) 주시' },
            { name: '한진', code: '002320', marketCap: '3,200억', revenue: '2조 9,000억', operatingProfit: '1,250억', opMargin: 4.3, per: 6.2, pbr: 0.28, debtRatio: 155, currentRatio: 105, riskStatus: 'NORMAL', dividendYield: 2.8, payoutRatio: 20.0, comment: '대전 메가허브 터미널 가동으로 원가율 개선. PBR 0.28배의 극단적 저평가 자산 가치주' },
            { name: '아시아나항공', code: '020560', marketCap: '1조 8,000억', revenue: '7조 4,000억', operatingProfit: '5,400억', opMargin: 7.3, per: 8.5, pbr: 2.80, debtRatio: 1450, currentRatio: 45, riskStatus: 'WARNING', dividendYield: 0.0, payoutRatio: 0.0, comment: '대한항공 합병 절차 최종 단계. 화물사업부 매각 완료 시 부채비율 정상화 기대' },
            { name: '흥아해운', code: '003280', marketCap: '4,500억', revenue: '1,800억', operatingProfit: '280억', opMargin: 15.6, per: 14.5, pbr: 2.45, debtRatio: 85, currentRatio: 165, riskStatus: 'SAFE', dividendYield: 0.0, payoutRatio: 0.0, comment: '아시아 역내 케미컬 탱커선 전문 선사. 액체 석유화학제품 운임 안정으로 두자릿수 마진' }
        ]
    },
    {
        id: 'refinery',
        sector: '정유 / 에너지 & 가스',
        icon: 'flame',
        description: '싱가포르 복합 정제마진(GRM), 국제 유가(WTI·두바이유) 시세 및 원유 도입 환율에 따라 분기 조단위 이익과 조단위 적자를 오가는 대표적 시클리컬(경기민감) 산업',
        relatedStocks: 'S-Oil, SK이노베이션, GS, HD현대, 한국가스공사, 한국전력, 지역난방공사, E1, 대성에너지, 삼천리',
        correlationLogic: {
            formula: '싱가포르 복합 정제마진 배럴당 $7 이상 유지 + 국제 유가 완만한 상승 ➔ 재고평가이익 발생 및 크랙 마진 급증 ➔ 분기 영업익 1조 돌파',
            details: [
                '1단계: 정유사는 원유를 수입해 휘발유, 경유, 등유, 항공유로 정제해 판매하며, 최종 석유제품 가격에서 원유 가격과 수송비를 뺀 것이 정제마진(GRM)입니다.',
                '2단계: 정제마진의 손익분기점(BEP)은 배럴당 $4.5~$5.0 수준이며, $7를 넘어서면 대규모 흑자 구간으로 진입합니다.',
                '3단계: 또한 수입 원유가 선박으로 들어오는 1~2달 동안 유가가 상승하면 저가 원유로 고가 제품을 팔게 되어 대규모 재고평가이익이 추가됩니다.',
                '4단계: 단, 유가가 급락하거나 글로벌 경기 둔화로 정제마진이 $3 이하로 떨어지면 대규모 재고평가손실로 급격한 적자 전환이 일어납니다.'
            ],
            sensitivity: '복합 정제마진 배럴당 $1 변동 시 S-Oil 연간 영업이익 약 +3,500억~4,000억 원 직결. 국제유가 배럴당 $10 변동 시 재고평가손익 약 +2,000억 원 영향.',
            currentStatus: '글로벌 정유설비 증설 둔화 속 동절기 난방유 수요가 도래하며 정제마진이 배럴당 $6~8 수준으로 회복세 진입.',
            outlookSignal: {
                level: 'MODERATE_POSITIVE',
                badgeText: '🟡 마진 점진 개선 및 배당 매력 회복',
                summary: '유가 급락세가 진정되고 난방유 성수기 진입으로 정제마진이 반등하고 있습니다. S-Oil 등 대형 정유사를 중심으로 재고손실이 소멸되며 4분기 흑자 폭 확대 및 연말 고배당 지급이 예상됩니다.'
            }
        },
        indicators: [
            {
                name: '싱가포르 복합 정제마진 (GRM)',
                role: '아시아 정유사 실적의 절대적 가늠자',
                impact: '배럴당 $7 이상 시 대규모 흑자, $4.5 이하 시 적자 경고',
                benchmark: '배럴당 $5.0 손익분기점(BEP)',
                sourceName: 'TradingView Singapore Refining Margin',
                sourceUrl: 'https://kr.tradingview.com/symbols/SPREAD-GRM/'
            },
            {
                name: 'WTI 및 두바이유(Dubai) 원유 시세',
                role: '국내 정유사 원유 도입 단가 및 재고평가손익 결정',
                impact: '유가 상승 시 재고이익 급증, 급락 시 재고손실 반영',
                benchmark: '배럴당 $75~$85 완만한 박스권이 가장 이상적',
                sourceName: '한국석유공사 페트로넷(Petronet)',
                sourceUrl: 'https://www.petronet.co.kr/'
            },
            {
                name: '국제 천연가스 선물 (Henry Hub)',
                role: '한국가스공사 도입단가 및 글로벌 에너지 인플레 선행',
                impact: '가스비 인상 및 가스공사 미수금 회수 직결',
                benchmark: 'MMBtu당 $2.5~$3.5 안정권',
                sourceName: 'TradingView Natural Gas',
                sourceUrl: 'https://kr.tradingview.com/symbols/NYMEX-NG1!/'
            }
        ],
        companies: [
            { name: 'S-Oil', code: '010950', marketCap: '7조 4,000억', revenue: '36조 원', operatingProfit: '1조 4,500억', opMargin: 4.0, per: 8.5, pbr: 0.85, debtRatio: 145, currentRatio: 125, riskStatus: 'NORMAL', dividendYield: 4.8, payoutRatio: 35.0, comment: '사우디 아람코 자회사로 아시아 최고 수준 정제 고도화율. 샤힌 프로젝트(9조원 투자)로 석화 도약' },
            { name: 'SK이노베이션', code: '096770', marketCap: '11조 2,000억', revenue: '76조 원', operatingProfit: '1조 8,500억', opMargin: 2.4, per: 12.0, pbr: 0.48, debtRatio: 188, currentRatio: 110, riskStatus: 'NORMAL', dividendYield: 2.5, payoutRatio: 25.0, comment: 'SK E&S와의 초대형 합병으로 연 2조원 안정적 유틸리티 현금 창출. 정유+배터리+LNG 종합 에너지' },
            { name: 'GS', code: '078930', marketCap: '4조 2,000억', revenue: '26조 원', operatingProfit: '3조 4,000억', opMargin: 13.1, per: 3.5, pbr: 0.32, debtRatio: 72, currentRatio: 175, riskStatus: 'SAFE', dividendYield: 5.8, payoutRatio: 22.0, comment: 'GS칼텍스 실적 호조 및 발전 자회사 현금 창출. PBR 0.32배, PER 3배대의 극단적 저평가 6% 고배당주' },
            { name: 'HD현대', code: '267250', marketCap: '6조 1,000억', revenue: '62조 원', operatingProfit: '2조 8,500억', opMargin: 4.6, per: 6.2, pbr: 0.58, debtRatio: 165, currentRatio: 115, riskStatus: 'NORMAL', dividendYield: 5.2, payoutRatio: 35.0, comment: 'HD현대오일뱅크와 HD현대 조선 부문을 아우르는 지주사. 배당수익률 5% 이상의 고배당 지주' },
            { name: '한국가스공사', code: '036460', marketCap: '3조 8,000억', revenue: '44조 원', operatingProfit: '1조 9,500억', opMargin: 4.4, per: 4.8, pbr: 0.38, debtRatio: 480, currentRatio: 72, riskStatus: 'WARNING', dividendYield: 4.0, payoutRatio: 30.0, comment: '도시가스 요금 인상으로 14조 원 미수금 점진 회수. PBR 0.38배이나 부채비율 480% 관리 필수' },
            { name: '한국전력', code: '015760', marketCap: '14조 5,000억', revenue: '88조 원', operatingProfit: '6조 8,000억', opMargin: 7.7, per: 4.2, pbr: 0.35, debtRatio: 550, currentRatio: 65, riskStatus: 'WARNING', dividendYield: 0.0, payoutRatio: 0.0, comment: '산업용 전기요금 연속 인상 및 석탄·LNG 도입단가 하락으로 연간 6조원대 대규모 흑자 전환' },
            { name: 'E1', code: '017940', marketCap: '4,800억', revenue: '7조 8,000억', operatingProfit: '2,400억', opMargin: 3.1, per: 3.2, pbr: 0.28, debtRatio: 145, currentRatio: 120, riskStatus: 'NORMAL', dividendYield: 6.5, payoutRatio: 24.0, comment: '국내 LPG 수입 유통 과점사. PBR 0.28배, PER 3배대의 절대적 자산 가치주이자 6.5% 초고배당' },
            { name: '지역난방공사', code: '071320', marketCap: '4,500억', revenue: '4조 1,000억', operatingProfit: '2,900억', opMargin: 7.1, per: 3.8, pbr: 0.31, debtRatio: 320, currentRatio: 85, riskStatus: 'WARNING', dividendYield: 5.5, payoutRatio: 30.0, comment: '열요금 인상 및 LNG 연료비 하락으로 흑자 폭증. 배당 재개 및 주주환원 확대 기대' },
            { name: '대성에너지', code: '085910', marketCap: '2,500억', revenue: '1조 1,000억', operatingProfit: '280억', opMargin: 2.5, per: 9.8, pbr: 0.55, debtRatio: 85, currentRatio: 165, riskStatus: 'SAFE', dividendYield: 3.5, payoutRatio: 32.0, comment: '대구 지역 도시가스 독점 공급사. 안정적 경기방어주 및 85% 건전한 부채비율' },
            { name: '삼천리', code: '004690', marketCap: '4,200억', revenue: '5조 2,000억', operatingProfit: '1,350억', opMargin: 2.6, per: 5.5, pbr: 0.25, debtRatio: 135, currentRatio: 110, riskStatus: 'NORMAL', dividendYield: 3.2, payoutRatio: 20.0, comment: '경인지역 최대 도시가스 공급 및 발전 사업. PBR 0.25배의 극단적 저평가 자산주' }
        ]
    },
    {
        id: 'chem',
        sector: '석유화학 / 화학 소재',
        icon: 'flask-conical',
        description: '에틸렌-나프타 스프레드, 중국 내 대규모 석유화학 증설 물량 소화 여부 및 2차전지/반도체용 첨단 스페셜티 소재 전환이 생존과 턴어라운드를 가르는 산업',
        relatedStocks: 'LG화학, 롯데케미칼, 금호석유, 대한유화, 한화솔루션, 효성첨단소재, 효성티앤씨, 코오롱인더, 이수화학, SK케미칼',
        correlationLogic: {
            formula: '에틸렌-나프타 스프레드 톤당 $300 돌파 + 중국 경기 부양책에 따른 석화 수요 회복 ➔ 크래커(NCC) 가동률 정상화 ➔ 흑자 전환',
            details: [
                '1단계: 나프타 분해설비(NCC)를 통해 원유 부산물인 나프타를 열분해하여 에틸렌, 프로필렌 등 기초유분을 생산합니다.',
                '2단계: 에틸렌 판매가에서 원료인 나프타 가격을 뺀 에틸렌-나프타 스프레드의 손익분기점(BEP)은 톤당 $250~$300선입니다.',
                '3단계: 최근 몇 년간 중국의 공격적인 자급률 제고 증설로 스프레드가 $180~$220선에 머무르며 범용 석화사들의 적자가 지속되었습니다.',
                '4단계: 중국 정부의 대규모 경기부양책과 한계 설비 구조조정이 진행되면 스프레드가 $300를 회복하며 강력한 어닝 턴어라운드가 발생합니다.'
            ],
            sensitivity: '에틸렌-나프타 스프레드 톤당 $50 개선 시 롯데케미칼·대한유화 연간 영업이익 약 +2,000억~3,500억 원 적자 축소 및 흑자 반등.',
            currentStatus: '중국 경기 부양책 발표 이후 화학제품 바닥 확인 심리가 확산되고 있으며, 금호석유(합성고무) 등 차별화된 스페셜티 업종부터 마진 회복 시작.',
            outlookSignal: {
                level: 'NEUTRAL',
                badgeText: '⚪ 바닥 다지기 및 구조조정 국면',
                summary: '중국의 설비 증설 부담이 여전하지만 중국 금리인하와 인프라 부양책으로 최악의 다운사이클은 통과했습니다. 범용 플라스틱보다는 금호석유, 효성티앤씨 등 고부가 스페셜티 기업의 흑자 지속이 돋보입니다.'
            }
        },
        indicators: [
            {
                name: '에틸렌 - 나프타 스프레드 (Ethylene-Naphtha)',
                role: '석유화학의 쌀이라 불리는 기초유분 마진 벤치마크',
                impact: '스프레드 $300 돌파 시 롯데케미칼·대한유화 흑자 전환',
                benchmark: '톤당 $250 손익분기점(BEP), $300 이상 호황',
                sourceName: '산업통상자원부 원자재 가격동향',
                sourceUrl: 'https://www.motie.go.kr/'
            },
            {
                name: '부타디엔(BD) - NB라텍스 스프레드',
                role: '의료용 고무장갑 핵심 소재 마진',
                impact: '금호석유 합성고무 사업부 영업이익 직결',
                benchmark: '톤당 $400 이상 시 금호석유 분기 호실적 보장',
                sourceName: 'Chemical Prices Weekly',
                sourceUrl: 'https://kr.investing.com/'
            },
            {
                name: '스판덱스(Spandex) 글로벌 시세',
                role: '레깅스·신축성 의류 필수 섬유 소재',
                impact: '가격 반등 시 세계 1위 효성티앤씨 실적 폭등',
                benchmark: 'kg당 $5.5 이상 시 효성티앤씨 OPM 10% 회복',
                sourceName: '중국 화섬정보넷(CCFGroup)',
                sourceUrl: 'https://www.ccfgroup.com/'
            }
        ],
        companies: [
            { name: 'LG화학', code: '051910', marketCap: '23조 원', revenue: '52조 원', operatingProfit: '2조 2,000억', opMargin: 4.2, per: 16.5, pbr: 0.72, debtRatio: 88, currentRatio: 160, riskStatus: 'SAFE', dividendYield: 2.5, payoutRatio: 30.0, comment: 'LG에너지솔루션 모회사이자 양극재·친환경 스페셜티 1위. 석유화학 바닥 통과 및 배터리 소재 도약' },
            { name: '롯데케미칼', code: '011170', marketCap: '3조 5,000억', revenue: '20조 원', operatingProfit: '-2,500억', opMargin: -1.2, per: -1, pbr: 0.28, debtRatio: 125, currentRatio: 145, riskStatus: 'NORMAL', dividendYield: 3.5, payoutRatio: 35.0, comment: '국내 대표 범용 NCC 석화사. PBR 0.28배 역사적 바닥 수준으로 에틸렌 스프레드 반등 시 탄력' },
            { name: '금호석유', code: '011780', marketCap: '3조 4,000억', revenue: '7조 2,000억', operatingProfit: '4,200억', opMargin: 5.8, per: 9.2, pbr: 0.65, debtRatio: 35, currentRatio: 260, riskStatus: 'SAFE', dividendYield: 4.5, payoutRatio: 30.0, comment: '합성고무(타이어) 및 NB라텍스 세계 1위. 부채비율 35%의 탄탄한 재무와 4.5% 배당, 자사주 소각' },
            { name: '대한유화', code: '006650', marketCap: '7,800억', revenue: '2조 6,000억', operatingProfit: '-450억', opMargin: -1.7, per: -1, pbr: 0.35, debtRatio: 45, currentRatio: 220, riskStatus: 'SAFE', dividendYield: 2.8, payoutRatio: 25.0, comment: '온산 NCC 단일 공장 최고 효율. 2차전지 분리막용 폴리머 독점력 및 부채비율 45% 초우량' },
            { name: '한화솔루션', code: '009830', marketCap: '4조 1,000억', revenue: '12조 5,000억', operatingProfit: '2,800억', opMargin: 2.2, per: 18.5, pbr: 0.58, debtRatio: 185, currentRatio: 110, riskStatus: 'NORMAL', dividendYield: 0.0, payoutRatio: 0.0, comment: '케미칼 부문(PVC, 가성소다) 안정적 방어 및 미국 카터스빌 큐셀 태양광 모듈 신공장 가동' },
            { name: '효성첨단소재', code: '298050', marketCap: '1조 6,500억', revenue: '3조 4,000억', operatingProfit: '2,400억', opMargin: 7.1, per: 10.5, pbr: 1.85, debtRatio: 195, currentRatio: 105, riskStatus: 'NORMAL', dividendYield: 2.5, payoutRatio: 22.0, comment: '타이어코드 글로벌 1위 및 우주항공·수소탱크용 탄소섬유 독점. 고마진 스페셜티 소재사' },
            { name: '효성티앤씨', code: '298020', marketCap: '1조 4,200억', revenue: '7조 6,000억', operatingProfit: '3,100억', opMargin: 4.1, per: 7.8, pbr: 0.95, debtRatio: 185, currentRatio: 98, riskStatus: 'NORMAL', dividendYield: 4.0, payoutRatio: 25.0, comment: '글로벌 스판덱스 시장점유율 33% 압도적 1위. 인도·베트남 공장 가동률 회복으로 이익 급반등' },
            { name: '코오롱인더', code: '120110', marketCap: '9,800억', revenue: '4조 9,000억', operatingProfit: '1,850억', opMargin: 3.8, per: 8.5, pbr: 0.42, debtRatio: 140, currentRatio: 120, riskStatus: 'NORMAL', dividendYield: 4.2, payoutRatio: 30.0, comment: '아라미드(헤라크론) 증설 효과 본격화 및 타이어코드 회복. PBR 0.42배 저평가 고배당주' },
            { name: '이수화학', code: '005950', marketCap: '4,200억', revenue: '1조 8,000억', operatingProfit: '480억', opMargin: 2.7, per: 12.0, pbr: 0.85, debtRatio: 115, currentRatio: 135, riskStatus: 'NORMAL', dividendYield: 2.5, payoutRatio: 20.0, comment: '세탁세제 원료(연성알킬벤젠 LAB) 국내 독점. 전고체 배터리용 황화리튬 신소재 개발' },
            { name: 'SK케미칼', code: '285130', marketCap: '1조 1,000억', revenue: '1조 7,500억', operatingProfit: '1,150억', opMargin: 6.6, per: 11.5, pbr: 0.58, debtRatio: 65, currentRatio: 195, riskStatus: 'SAFE', dividendYield: 3.5, payoutRatio: 30.0, comment: '코폴리에스터(친환경 고투명 플라스틱) 세계 2위. 부채비율 65% 및 안정적 제약 바이오 사업' }
        ]
    },
    {
        id: 'steel',
        sector: '철강 / 산업 금속',
        icon: 'hammer',
        description: '국제 철광석(Iron Ore) 수입가, 중국의 조강 생산량 감산 정책, 열연/후판 유통가격 및 LME 비철금속(구리, 아연) 시세가 마진을 결정하는 기간 제조업',
        relatedStocks: 'POSCO홀딩스, 현대제철, 동국제강, 고려아연, 세아베스틸지주, 풍산, 세아제강, 대한제강, 한국철강, 휴스틸',
        correlationLogic: {
            formula: '중국 부동산 부양책 + 철강 감산 규제 ➔ 저가 중국산 밀어내기 수출 차단 ➔ 열연·후판 롤마진(판가-원가) 확대 ➔ 영업이익 턴어라운드',
            details: [
                '1단계: 철광석과 원료탄(석탄)을 고로에 넣어 쇳물을 뽑아내며, 원재료비와 열연강판 판매가의 차이를 롤마진(Roll Margin)이라고 합니다.',
                '2단계: 중국 철강사들의 부동산 불황에 따른 저가 덤핑 수출이 줄어들어야 국내 철강사들의 판가 방어가 가능해집니다.',
                '3단계: 중국 정부가 탄소배출 감축을 위해 철강 감산 명령을 내리거나 반덤핑 제재가 시행되면 철강 가격이 급반등합니다.',
                '4단계: 고려아연, 풍산 등 비철금속 기업은 AI 데이터센터 전력망 확충에 따른 LME 전기동(구리) 가격 급등의 직접적 수혜를 누립니다.'
            ],
            sensitivity: '철광석 가격 톤당 $10 하락 및 열연 판가 톤당 3만원 인상 시 현대제철 연간 영업이익 약 +2,800억 원 증가 효과.',
            currentStatus: '중국의 대규모 지급준비율 인하 등 경기부양책으로 철광석 가격이 톤당 $100선을 회복했으며, LME 구리 시세가 톤당 $9,800선 고공행진 지속.',
            outlookSignal: {
                level: 'MODERATE_POSITIVE',
                badgeText: '🟡 중국 부양책 효과 및 마진 저점 통과',
                summary: '중국의 잇따른 부동산 부양책과 경기 부양 패키지로 철강 가격이 바닥을 탈출하고 있습니다. 풍산, 고려아연 등 비철금속의 사상 최고가 랠리와 현대제철의 PBR 0.2배 극저평가가 부각되는 시점입니다.'
            }
        },
        indicators: [
            {
                name: '국제 철광석 (Iron Ore 62% Fe) 중국 수입가',
                role: '포스코·현대제철 고로 제철 원가의 50% 이상 차지',
                impact: '가격 안정 시 원가 부담 완화 및 롤마진 방어',
                benchmark: '톤당 $90~$110 안정적, $140 초과 시 마진 압박',
                sourceName: 'Mining.com 철광석 시세',
                sourceUrl: 'https://www.mining.com/markets/commodity/iron-ore/'
            },
            {
                name: 'LME 전기동(구리, Copper) 선물 공식가',
                role: '닥터 코퍼(Doctor Copper)라 불리는 글로벌 실물경기 선행지표',
                impact: '구리값 상승 시 풍산·LS·고려아연 영업이익 폭증',
                benchmark: '톤당 $9,500 이상 AI 데이터센터 전력망 슈퍼사이클',
                sourceName: 'LME Copper Official',
                sourceUrl: 'https://www.lme.com/en/metals/non-ferrous/lme-copper'
            },
            {
                name: '국내 열연강판(Hot-Rolled Steel) 유통가',
                role: '자동차·가전·강관용 기초 철강재 판매가격',
                impact: '톤당 가격 인상 시 현대제철·포스코 영업이익 직결',
                benchmark: '톤당 85만원 이상 유지 시 건전한 마진 창출',
                sourceName: '스틸데일리 철강통계',
                sourceUrl: 'https://www.steeldaily.co.kr/'
            }
        ],
        companies: [
            { name: 'POSCO홀딩스', code: '005490', marketCap: '29조 원', revenue: '74조 원', operatingProfit: '3조 2,000억', opMargin: 4.3, per: 14.5, pbr: 0.52, debtRatio: 62, currentRatio: 195, riskStatus: 'SAFE', dividendYield: 3.2, payoutRatio: 30.0, comment: '대한민국 철강 1위 및 2차전지 소재 지주사. PBR 0.52배 극저평가와 3조원대 안정적 현금 창출' },
            { name: '현대제철', code: '004020', marketCap: '3조 8,000억', revenue: '24조 5,000억', operatingProfit: '8,200억', opMargin: 3.3, per: 7.2, pbr: 0.21, debtRatio: 85, currentRatio: 185, riskStatus: 'SAFE', dividendYield: 4.0, payoutRatio: 25.0, comment: '현대차그룹 완성차향 차강판 독점 공급. PBR 0.21배의 극단적 저평가 상태로 반등 잠재력' },
            { name: '고려아연', code: '010130', marketCap: '17조 5,000억', revenue: '10조 8,000억', operatingProfit: '9,500억', opMargin: 8.8, per: 22.0, pbr: 1.85, debtRatio: 35, currentRatio: 290, riskStatus: 'SAFE', dividendYield: 2.8, payoutRatio: 40.0, comment: '아연·연·금·은·동 비철금속 세계 1위. 경영권 분쟁 속 무차입에 가까운 초우량 자산 가치' },
            { name: '동국제강', code: '460860', marketCap: '8,500억', revenue: '4조 2,000억', operatingProfit: '2,400억', opMargin: 5.7, per: 4.5, pbr: 0.45, debtRatio: 95, currentRatio: 165, riskStatus: 'SAFE', dividendYield: 5.2, payoutRatio: 28.0, comment: '건축용 봉형강(철근) 및 컬러강판 1위. 부채비율 95%의 건전한 재무와 5%대 고배당 매력' },
            { name: '풍산', code: '103140', marketCap: '1조 8,500억', revenue: '4조 5,000억', operatingProfit: '3,200억', opMargin: 7.1, per: 7.5, pbr: 0.85, debtRatio: 78, currentRatio: 175, riskStatus: 'SAFE', dividendYield: 3.2, payoutRatio: 24.0, comment: '신동(구리 가공) 및 K-방산 탄약 수출 쌍두마차. LME 구리가격 상승과 탄약 쇼티지 수혜' },
            { name: '세아베스틸지주', code: '001430', marketCap: '8,200억', revenue: '4조 1,000억', operatingProfit: '1,950억', opMargin: 4.8, per: 5.8, pbr: 0.38, debtRatio: 72, currentRatio: 185, riskStatus: 'SAFE', dividendYield: 5.5, payoutRatio: 30.0, comment: '자동차·기계용 특수강봉강 1위 및 Cask(원전 폐연료봉 저장용기) 전문. 5.5% 초고배당주' },
            { name: '세아제강', code: '306200', marketCap: '3,800억', revenue: '1조 8,500억', operatingProfit: '1,800억', opMargin: 9.7, per: 3.2, pbr: 0.42, debtRatio: 48, currentRatio: 220, riskStatus: 'SAFE', dividendYield: 5.0, payoutRatio: 20.0, comment: '북미 오일·가스 채굴용 강관(OCTG) 및 해상풍력 하부구조물 수출. PER 3배대의 압도적 저평가' },
            { name: '대한제강', code: '084010', marketCap: '3,200억', revenue: '1조 2,000억', operatingProfit: '950억', opMargin: 7.9, per: 4.2, pbr: 0.45, debtRatio: 28, currentRatio: 320, riskStatus: 'SAFE', dividendYield: 5.8, payoutRatio: 30.0, comment: '철근 제조 및 가공 1위. 부채비율 28%, 순현금 2,000억 원 보유한 무차입 알짜 가치주' },
            { name: '한국철강', code: '104700', marketCap: '2,900억', revenue: '8,500억', operatingProfit: '780억', opMargin: 9.2, per: 4.8, pbr: 0.38, debtRatio: 15, currentRatio: 520, riskStatus: 'SAFE', dividendYield: 5.2, payoutRatio: 35.0, comment: '철근 단일 품목 최강자. 부채비율 15%, 유동비율 520%의 극단적 현금 부자 기업' },
            { name: '휴스틸', code: '005010', marketCap: '2,400억', revenue: '7,800억', operatingProfit: '820억', opMargin: 10.5, per: 3.5, pbr: 0.28, debtRatio: 42, currentRatio: 260, riskStatus: 'SAFE', dividendYield: 5.5, payoutRatio: 22.0, comment: '미국향 유정용 강관 수출 전문. 미국 현지 신공장 완공 및 PBR 0.28배의 초저평가 5% 고배당' }
        ]
    },
    {
        id: 'construct',
        sector: '건설 / 부동산 & 인프라',
        icon: 'building-2',
        description: 'PF(프로젝트 파이낸싱) 구조조정, 한국은행 기준금리 인하, 수도권 아파트 분양가 상승 및 사우디 네옴시티/원전 등 해외 플랜트 수주가 실적 회복의 열쇠인 산업',
        relatedStocks: '현대건설, 대우건설, GS건설, DL이앤씨, HDC현대산업개발, 쌍용C&E, 한샘, 삼성물산, 코오롱글로벌, KCC',
        correlationLogic: {
            formula: '한국은행 기준금리 인하 + 수도권 청약 열기 지속 + 부실 PF 정리 ➔ 미분양 해소 및 착공 재개 ➔ 주택사업부 원가율 정상화 및 영업익 급반등',
            details: [
                '1단계: 시멘트·철근 등 원자재가 급등으로 2022~2024년 착공한 현장들의 원가율이 95% 이상으로 치솟으며 건설사 영업이익이 급감했습니다.',
                '2단계: 한국은행이 기준금리 인하 사이클에 진입하면 주택담보대출 금리가 내려가며 수도권 미분양 물량이 빠르게 소진됩니다.',
                '3단계: 과거 고원가 현장이 준공(2025~2026년)되어 털려 나가고, 인상된 분양가로 신규 착공하는 양질의 현장 매출 비중이 늘어납니다.',
                '4단계: 체코 원전(현대·대우), 사우디 플랜트 등 해외 고마진 인프라 수주 물량이 본격 착공에 들어가며 해외 부문 이익 기여도가 높아집니다.'
            ],
            sensitivity: '기준금리 0.25%p 인하 시 대형 건설사 연간 이자비용 약 -150억~250억 원 절감 및 주택 청약 수요 회복 기여.',
            currentStatus: '한국은행의 기준금리 인하 개시 및 수도권 신축 아파트 신고가 행진으로 주택경기 바닥 탈출 조짐. 체코 원전 수주로 해외 모멘텀 장착.',
            outlookSignal: {
                level: 'NEUTRAL',
                badgeText: '⚪ 금리 인하 수혜 및 최악 국면 통과',
                summary: '고원가 현장 준공 완료와 기준금리 인하로 건설업 최악의 빙하기는 지나갔습니다. PF 부실 우려가 없는 DL이앤씨, HDC현대산업개발, 현대건설을 중심으로 4분기 원가율 개선과 흑자 기조 안착이 예상됩니다.'
            }
        },
        indicators: [
            {
                name: '국토교통부 전국 미분양 주택 현황',
                role: '국내 부동산 분양시장 침체 및 PF 리스크 척도',
                impact: '미분양 6만호 이하 감소 시 건설사 유동성 위기 소멸',
                benchmark: '준공 후 미분양(악성) 1.5만호 이하 안정권',
                sourceName: '국토교통부 통계누리',
                sourceUrl: 'https://stat.molit.go.kr/'
            },
            {
                name: '한국은행 기준금리 (Base Rate)',
                role: '부동산 PF 조달금리 및 주택 구매력 결정 핵심',
                impact: '금리 인하 시 건설사 금융비용 절감 및 분양 활성화',
                benchmark: '3.0% 이하 인하 시 부동산 경기 턴어라운드',
                sourceName: '한국은행 ECOS',
                sourceUrl: 'https://ecos.bok.or.kr/'
            },
            {
                name: '국내 시멘트(Cement) 출하 고시가격',
                role: '골조 공사 원가의 핵심을 차지하는 건축자재비',
                impact: '시멘트가 안정 시 건설사 주택 원가율 90% 이하 안정화',
                benchmark: '톤당 11만원 이하 안정권',
                sourceName: '한국시멘트협회',
                sourceUrl: 'https://www.cement.or.kr/'
            }
        ],
        companies: [
            { name: '현대건설', code: '000720', marketCap: '3조 7,000억', revenue: '32조 원', operatingProfit: '8,500억', opMargin: 2.7, per: 8.5, pbr: 0.42, debtRatio: 175, currentRatio: 145, riskStatus: 'NORMAL', dividendYield: 2.1, payoutRatio: 20.0, comment: '국내 시공능력평가 2위 및 체코 원전 주계약자. 사우디 아미랄 등 해외 대형 플랜트 견인' },
            { name: '삼성물산', code: '028260', marketCap: '26조 원', revenue: '42조 원', operatingProfit: '2조 9,500억', opMargin: 7.0, per: 10.5, pbr: 0.72, debtRatio: 65, currentRatio: 185, riskStatus: 'SAFE', dividendYield: 2.8, payoutRatio: 35.0, comment: '삼성그룹 지주사격. 하이테크 반도체 공장 건설 독점과 삼성바이오로직스 지분 가치 보유' },
            { name: 'DL이앤씨', code: '375500', marketCap: '1조 4,500억', revenue: '8조 2,000억', operatingProfit: '4,100억', opMargin: 5.0, per: 5.2, pbr: 0.29, debtRatio: 98, currentRatio: 175, riskStatus: 'SAFE', dividendYield: 3.5, payoutRatio: 22.0, comment: 'e편한세상. 부채비율 98%, 순현금 1조원 보유로 건설사 중 가장 압도적인 재무 건전성 보유' },
            { name: 'HDC현대산업개발', code: '294870', marketCap: '1조 6,200억', revenue: '4조 4,000억', operatingProfit: '2,800억', opMargin: 6.4, per: 5.5, pbr: 0.52, debtRatio: 135, currentRatio: 155, riskStatus: 'NORMAL', dividendYield: 3.2, payoutRatio: 25.0, comment: '광운대역세권 등 4.5조 초대형 자체 개발사업 본격 착공. 서울 개발 수혜로 실적 급성장' },
            { name: '대우건설', code: '047040', marketCap: '1조 5,800억', revenue: '10조 8,000억', operatingProfit: '5,800억', opMargin: 5.4, per: 4.8, pbr: 0.38, debtRatio: 185, currentRatio: 125, riskStatus: 'NORMAL', dividendYield: 0.0, payoutRatio: 0.0, comment: '푸르지오 및 체코 원전 시공사. 리비아·나이지리아 등 해외 고마진 토목·플랜트 역량' },
            { name: 'GS건설', code: '006360', marketCap: '1조 5,200억', revenue: '12조 8,000억', operatingProfit: '3,800억', opMargin: 3.0, per: 7.2, pbr: 0.32, debtRatio: 245, currentRatio: 110, riskStatus: 'WARNING', dividendYield: 0.0, payoutRatio: 0.0, comment: '자이(Xi) 브랜드 쇄신 및 GS이니마 수처리 자회사 지분 매각 추진으로 유동성 확보 가속' },
            { name: '쌍용C&E', code: '003410', marketCap: '3조 5,000억', revenue: '1조 9,500억', operatingProfit: '2,200억', opMargin: 11.3, per: 15.0, pbr: 1.85, debtRatio: 125, currentRatio: 115, riskStatus: 'NORMAL', dividendYield: 5.5, payoutRatio: 75.0, comment: '국내 1위 시멘트사. 유연탄 가격 하락으로 OPM 11% 돌파 및 5%대 안정적 고배당주' },
            { name: '한샘', code: '009240', marketCap: '1조 2,500억', revenue: '2조 1,000억', operatingProfit: '850억', opMargin: 4.0, per: 18.0, pbr: 2.10, debtRatio: 95, currentRatio: 145, riskStatus: 'SAFE', dividendYield: 4.5, payoutRatio: 65.0, comment: '아파트 입주 및 인테리어·리모델링 1위. 주택 거래량 회복 및 원가 절감으로 흑자 전환' },
            { name: 'KCC', code: '002380', marketCap: '2조 4,000억', revenue: '6조 5,000억', operatingProfit: '4,500억', opMargin: 6.9, per: 8.5, pbr: 0.45, debtRatio: 135, currentRatio: 125, riskStatus: 'NORMAL', dividendYield: 3.8, payoutRatio: 25.0, comment: '건축용 도료·유리 및 글로벌 실리콘(모멘티브) 1위. 삼성물산 등 막대한 보유 지분 가치' },
            { name: '코오롱글로벌', code: '003070', marketCap: '2,600억', revenue: '2조 6,000억', operatingProfit: '420억', opMargin: 1.6, per: 9.5, pbr: 0.35, debtRatio: 320, currentRatio: 85, riskStatus: 'WARNING', dividendYield: 2.5, payoutRatio: 20.0, comment: '하늘채 및 풍력발전 인프라 전문. PF 우발채무 관리 및 육상풍력 신사업 추진' }
        ]
    }
];

console.log('INDUSTRY_DATA loaded successfully with 13 industries.');

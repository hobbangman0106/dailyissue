// ==============================================================================
// 대한민국 7대 핵심 산업 & 40개 세부 업종 정밀 실적 예측 엔진 데이터
// 2026/2027 최신 거시 지표(환율, 유가, 금리, 곡물, 메탈가, 운임) 기반 인과관계 로직 탑재
// ==============================================================================

window.CHAPTERS = [
    {
        "id": 1,
        "name": "1. IT·반도체·전자",
        "short": "IT·반도체",
        "count": 5
    },
    {
        "id": 2,
        "name": "2. 자동차·모빌리티·2차전지",
        "short": "자동차·배터리",
        "count": 4
    },
    {
        "id": 3,
        "name": "3. 조선·중공업·방산·철강·건설",
        "short": "중공업·방산·건설",
        "count": 4
    },
    {
        "id": 4,
        "name": "4. 정유·화학·에너지",
        "short": "정유·화학·에너지",
        "count": 5
    },
    {
        "id": 5,
        "name": "5. 바이오·제약·헬스케어",
        "short": "바이오·제약",
        "count": 4
    },
    {
        "id": 6,
        "name": "6. 소비재·유통·식품",
        "short": "소비재·유통·식품",
        "count": 8
    },
    {
        "id": 7,
        "name": "7. 금융·운송·엔터",
        "short": "금융·운송·엔터",
        "count": 10
    }
];

window.INDUSTRY_DATA = [
    {
        "id": "semi",
        "chapterId": 1,
        "chapterName": "1. IT·반도체·전자",
        "sector": "반도체 (메모리 D램·HBM & 파운드리)",
        "subTitle": "빅테크 AI 데이터센터 투자 확대 및 HBM3E/DDR5 공급 부족 슈퍼사이클",
        "icon": "cpu",
        "description": "생성형 AI 서버용 고대역폭메모리(HBM3E/HBM4), 고용량 서버용 DDR5, 엔터프라이즈 SSD(eSSD) 및 첨단 패키징을 아우르는 대한민국 수출 1위 국가 핵심 기간 산업.",
        "relatedStocks": "SK하이닉스, 삼성전자, 한미반도체, 리노공업, 이오테크닉스, ISC",
        "correlationLogic": {
            "formula": "빅테크 AI CAPEX 증액 ➔ HBM3E/HBM4 생산 쏠림으로 일반 D램 공급 축소 ➔ 서버 D램/eSSD 고정가 분기당 10~20% 급등 ➔ 영업이익률 35~45% 폭발",
            "details": [
                "1단계: 마이크로소프트, 구글, 메타, 아마존 등 글로벌 빅테크의 AI 인프라 자본지출(CAPEX)이 연간 250조 원 이상으로 사상 최대치를 경신하고 있습니다.",
                "2단계: 엔비디아 AI 가속기에 필수적인 HBM(고대역폭 메모리)은 일반 D램 대비 웨이퍼 소모량이 3배에 달해 전 세계 메모리 공급 여력을 구조적으로 잠식합니다.",
                "3단계: 이에 따라 일반 서버용 DDR5와 기업용 eSSD 공급 부족이 심화되며 메모리 판가(ASP)가 연속 상승하는 슈퍼사이클이 전개됩니다.",
                "4단계: SK하이닉스 및 첨단 TC 본더 장비 1위 한미반도체 등 생태계 기업의 분기 실적이 사상 최고치를 경신합니다."
            ],
            "sensitivity": "DRAM 고정거래가격 10% 상승 시 SK하이닉스 분기 영업이익 약 +1조 2,000억 원 증가. HBM 매출 비중 10%p 상승 시 전사 OPM 약 +4.2%p 개선.",
            "currentStatus": "엔비디아향 HBM3E 공급 독점력 유지와 HBM4 조기 양산 체제 돌입, 일반 D램 고정가 강세로 4분기 사상 최대 실적 경신 확정적.",
            "outlookSignal": {
                "level": "POSITIVE",
                "badgeText": "🟢 강력 호전 (HBM 슈퍼사이클)",
                "summary": "AI 데이터센터용 HBM3E 및 eSSD 수요 폭증으로 판가 상승과 OPM 35% 돌파가 이어지고 있습니다. SK하이닉스를 필두로 사상 최대 연간 영업이익 달성 전망."
            }
        },
        "indicators": [
            {
                "name": "DRAMeXchange D램/낸드 고정거래가격",
                "role": "글로벌 메모리 반도체 공급 계약 공식 기준 가격",
                "impact": "월간 고정가 변동이 메모리 제조사 분기 매출액에 100% 직결",
                "sourceName": "TrendForce",
                "sourceUrl": "https://www.trendforce.com/"
            },
            {
                "name": "산업통상자원부 월별 반도체 수출 통계",
                "role": "대한민국 월간 반도체 수출 금액 및 증가율",
                "impact": "수출 증가율 두 자릿수 유지 시 반도체 대형주 수급 지속 유입",
                "sourceName": "산업통상자원부",
                "sourceUrl": "https://www.motie.go.kr/"
            }
        ],
        "companies": [
            {
                "name": "SK하이닉스",
                "code": "000660",
                "marketCap": "135조 원",
                "revenue": "66조 원",
                "operatingProfit": "23조 원",
                "opMargin": 34.8,
                "per": 6.8,
                "pbr": 1.85,
                "debtRatio": 45,
                "currentRatio": 160,
                "riskStatus": "SAFE",
                "dividendYield": 1.5,
                "payoutRatio": 15,
                "comment": "엔비디아 HBM3E 독점 메인 벤더. 서버용 eSSD 판매 호조와 35%에 육박하는 경이로운 OPM 달성으로 글로벌 AI 메모리 1위 등극"
            },
            {
                "name": "삼성전자",
                "code": "005930",
                "marketCap": "360조 원",
                "revenue": "310조 원",
                "operatingProfit": "36조 원",
                "opMargin": 11.6,
                "per": 11.5,
                "pbr": 1.05,
                "debtRatio": 26,
                "currentRatio": 255,
                "riskStatus": "SAFE",
                "dividendYield": 2.6,
                "payoutRatio": 30,
                "comment": "HBM3E 엔비디아 공급 확대 및 HBM4 커스텀 파운드리 융합. 순현금 100조 원 이상 보유 및 10조 원 자사주 매입 카드 가동"
            },
            {
                "name": "한미반도체",
                "code": "042700",
                "marketCap": "10조 5,000억",
                "revenue": "6,200억",
                "operatingProfit": "2,800억",
                "opMargin": 45.1,
                "per": 32,
                "pbr": 9.5,
                "debtRatio": 18,
                "currentRatio": 320,
                "riskStatus": "SAFE",
                "dividendYield": 0.8,
                "payoutRatio": 20,
                "comment": "HBM 필수 장비인 듀얼 TC 본더 글로벌 1위 독점. SK하이닉스 및 마이크론 수주 싹쓸이로 OPM 45% 초고수익 장비사"
            },
            {
                "name": "리노공업",
                "code": "058470",
                "marketCap": "3조 4,000억",
                "revenue": "3,100억",
                "operatingProfit": "1,350억",
                "opMargin": 43.5,
                "per": 24,
                "pbr": 5.2,
                "debtRatio": 8,
                "currentRatio": 850,
                "riskStatus": "SAFE",
                "dividendYield": 1.6,
                "payoutRatio": 35,
                "comment": "반도체 테스트 소켓(리노핀) 글로벌 최강자. 무차입 경영 부채비율 8%와 OPM 43%의 압도적 기술 해자 보유"
            }
        ]
    },
    {
        "id": "display",
        "chapterId": 1,
        "chapterName": "1. IT·반도체·전자",
        "sector": "디스플레이 (OLED & 패널소재)",
        "subTitle": "중국 LCD 공세 탈피, 태블릿·노트북 탠덤 OLED 및 차량용 전장 OLED 급성장",
        "icon": "monitor",
        "description": "저가 중국 LCD에서 완전 철수하고, 애플 아이패드·맥북 등 IT용 탠덤 OLED와 프리미엄 완성차용 전장 디스플레이로 사업 구조를 재편한 첨단 패널 및 유기소재 산업.",
        "relatedStocks": "LG디스플레이, 덕산네오룩스, PI첨단소재, 솔루스첨단소재",
        "correlationLogic": {
            "formula": "애플 IT 기기 OLED 탑재율 확대 + 탠덤 OLED(발광층 2개) 채용 ➔ 패널 판가(ASP) 2배 상승 + 유기소재 투입량 100% 증가 ➔ 흑자 전환",
            "details": [
                "1단계: 애플이 아이패드 프로에 이어 맥북, 아이패드 에어로 OLED 탑재를 전면 확대하며 IT용 중소형 패널 수요가 급증합니다.",
                "2단계: 탠덤 OLED 기술은 유기 발광층을 2개 층으로 쌓아 수명과 밝기를 2배 이상 높인 프리미엄 기술로 소재 투입량이 2배로 증가합니다.",
                "3단계: LG디스플레이는 광저우 LCD 공장 매각을 통해 2조 원대 유동성을 확보하고 모바일/IT OLED 풀가동으로 오랜 적자를 탈출했습니다."
            ],
            "sensitivity": "애플향 IT OLED 공급 100만 대 증가 시 LG디스플레이 영업이익 약 +600억 원 개선. 탠덤 OLED 비중 10%p 상승 시 덕산네오룩스 매출 +15% 증가.",
            "currentStatus": "광저우 공장 매각 대금 유입으로 재무구조가 대폭 개선되었으며, 아이폰 16 프로 패널 공급 점유율 확대로 4분기 영업이익 흑자 안착.",
            "outlookSignal": {
                "level": "POSITIVE",
                "badgeText": "🟢 턴어라운드 (OLED 침투 확대)",
                "summary": "LCD 완전 철수와 중국 공장 매각으로 재무 부담을 털어냈으며, 애플 모바일/IT OLED 공급 점유율 확대로 4분기 실적 턴어라운드가 가시화되었습니다."
            }
        },
        "indicators": [
            {
                "name": "글로벌 디스플레이 패널 가격 (TrendForce WitsView)",
                "role": "IT 및 모바일용 패널 월별 가격 동향",
                "impact": "OLED 패널 판가 유지 시 분기 마진율 방어",
                "sourceName": "TrendForce",
                "sourceUrl": "https://www.trendforce.com/"
            },
            {
                "name": "Omdia 글로벌 IT OLED 출하량 전망 통계",
                "role": "태블릿/노트북의 OLED 침투율 및 출하 대수",
                "impact": "IT OLED 출하량 연평균 40% 고성장 수혜",
                "sourceName": "Omdia Display",
                "sourceUrl": "https://omdia.tech.informa.com/"
            }
        ],
        "companies": [
            {
                "name": "LG디스플레이",
                "code": "034220",
                "marketCap": "5조 2,000억",
                "revenue": "26조 5,000억",
                "operatingProfit": "4,200억",
                "opMargin": 1.6,
                "per": 15,
                "pbr": 0.65,
                "debtRatio": 265,
                "currentRatio": 85,
                "riskStatus": "NORMAL",
                "dividendYield": 0,
                "payoutRatio": 0,
                "comment": "광저우 LCD 공장 2조 원 매각 완료로 유동성 확보. 애플향 모바일 OLED 점유율 30%대 돌파 및 흑자 전환"
            },
            {
                "name": "덕산네오룩스",
                "code": "213420",
                "marketCap": "8,500억",
                "revenue": "2,100억",
                "operatingProfit": "480억",
                "opMargin": 22.9,
                "per": 18.5,
                "pbr": 2.2,
                "debtRatio": 18,
                "currentRatio": 380,
                "riskStatus": "SAFE",
                "dividendYield": 1,
                "payoutRatio": 15,
                "comment": "OLED 핵심 유기물 소재(HTL, Red Host) 글로벌 최강자. 탠덤 OLED 확대로 유기소재 소모량 2배 증가 수혜"
            }
        ]
    },
    {
        "id": "smartphone",
        "chapterId": 1,
        "chapterName": "1. IT·반도체·전자",
        "sector": "스마트폰·IT부품 (온디바이스 AI, 카메라모듈, 힌지)",
        "subTitle": "온디바이스 AI 폰 교체 수요와 폴더블 슬림 힌지 및 폴디드줌 카메라 ASP 상승",
        "icon": "smartphone",
        "description": "갤럭시 AI 및 애플 인텔리전스 탑재로 교체 주기가 도래한 글로벌 스마트폰 세트와 고배율 잠망경(폴디드줌) 카메라, 초박형 힌지 등 핵심 부품 산업.",
        "relatedStocks": "LG이노텍, 자화전자, KH바텍, 파트론, 인터플렉스",
        "correlationLogic": {
            "formula": "온디바이스 AI 탑재율 증가 ➔ 교체 주기 4년 ➔ 3년 단축 + 고사양 폴디드줌 채용 ➔ 부품 납품단가(ASP) 25% 상승으로 OPM 개선",
            "details": [
                "1단계: 온디바이스 AI 기능 지원을 위해 고성능 NPU와 고화소 카메라 모듈, 고용량 기판 탑재가 필수가 되었습니다.",
                "2단계: 애플 아이폰 상위 프로 라인업에 폴디드줌 카메라 모듈이 독점 공급되며 LG이노텍 광학솔루션 매출이 분기 사상 최대치를 경신합니다.",
                "3단계: 원/달러 환율이 1,300원대 중후반의 고환율을 유지함에 따라 달러 결제 수출 부품사의 환산 마진이 극대화됩니다."
            ],
            "sensitivity": "글로벌 프리미엄 스마트폰 출하 1,000만 대 증가 시 LG이노텍 영업이익 약 +800억 원 증가. 원/달러 10원 상승 시 수출 마진 약 +0.5%p 개선.",
            "currentStatus": "글로벌 스마트폰 출하량이 3년 만에 완만한 플러스 성장세로 전환되었으며, 온디바이스 AI 프리미엄 폰 수요 집중으로 부품주 실적 탄력 확대.",
            "outlookSignal": {
                "level": "POSITIVE",
                "badgeText": "🟢 점진적 개선 (AI 폰 교체 수요)",
                "summary": "온디바이스 AI 확산으로 고부가 폴디드줌 카메라 모듈과 기판, 힌지 부품사의 ASP가 동반 상승하고 있습니다. 애플·삼성 공급망 실적 호전 전망."
            }
        },
        "indicators": [
            {
                "name": "IDC 글로벌 스마트폰 분기 출하량 통계",
                "role": "전 세계 스마트폰 출하량 및 제조사(삼성, 애플)별 점유율",
                "impact": "출하량 증가 시 부품 공급사 가동률 즉각 연동",
                "sourceName": "IDC Research",
                "sourceUrl": "https://www.idc.com/"
            },
            {
                "name": "원/달러 환율 추이 (한국은행 ECOS)",
                "role": "IT 부품 수출 기업 원화 환산 매출 마진 결정",
                "impact": "원/달러 1,350원 이상 유지 시 수출 호실적 견인",
                "sourceName": "한국은행 ECOS",
                "sourceUrl": "https://ecos.bok.or.kr/"
            }
        ],
        "companies": [
            {
                "name": "LG이노텍",
                "code": "011070",
                "marketCap": "5조 4,000억",
                "revenue": "21조 원",
                "operatingProfit": "1조 1,000억",
                "opMargin": 5.2,
                "per": 7.8,
                "pbr": 0.95,
                "debtRatio": 125,
                "currentRatio": 115,
                "riskStatus": "SAFE",
                "dividendYield": 2.2,
                "payoutRatio": 18,
                "comment": "애플 아이폰 프리미엄 카메라 모듈(폴디드줌) 독점 메인 공급. AI 스마트폰 교체 주기 진입 수혜"
            },
            {
                "name": "자화전자",
                "code": "033240",
                "marketCap": "5,800억",
                "revenue": "6,200억",
                "operatingProfit": "480억",
                "opMargin": 7.7,
                "per": 9.5,
                "pbr": 1.1,
                "debtRatio": 95,
                "currentRatio": 135,
                "riskStatus": "SAFE",
                "dividendYield": 1.5,
                "payoutRatio": 15,
                "comment": "구미 신공장 가동으로 애플향 OIS(손떨림보정액추에이터) 공급 본격화. 폴디드줌 핵심 액추에이터 글로벌 선도"
            },
            {
                "name": "KH바텍",
                "code": "060720",
                "marketCap": "3,200억",
                "revenue": "3,800억",
                "operatingProfit": "320억",
                "opMargin": 8.4,
                "per": 8.5,
                "pbr": 0.95,
                "debtRatio": 30,
                "currentRatio": 210,
                "riskStatus": "SAFE",
                "dividendYield": 3.2,
                "payoutRatio": 25,
                "comment": "삼성전자 폴더블폰 물방울 힌지 메인 벤더. 초슬림 폴더블폰 출시에 따른 고사양 힌지 독점 공급 지속"
            }
        ]
    },
    {
        "id": "platform",
        "chapterId": 1,
        "chapterName": "1. IT·반도체·전자",
        "sector": "인터넷·플랫폼 (검색, 커머스, 초거대 AI)",
        "subTitle": "AI 기반 정밀 타깃팅 광고 단가 상승 및 풀필먼트 커머스 구독 수익화",
        "icon": "globe",
        "description": "검색포털, 메신저, 이커머스 등 강력한 네트워크 효과 플랫폼을 기반으로 AI 솔루션, 클라우드 B2B, 디지털 광고, 핀테크로 영토를 확장하는 고부가가치 플랫폼 산업.",
        "relatedStocks": "NAVER, 카카오, SOOP(아프리카TV), 원티드랩",
        "correlationLogic": {
            "formula": "소비심리지수(CCSI) 반등 + 초개인화 AI 광고 솔루션 도입 ➔ 광고 단가(CPM/CPC) 상승 ➔ 고정비 레버리지로 OPM 18~22% 달성",
            "details": [
                "1단계: 인터넷 플랫폼은 서버·인건비 등 고정비 비중이 높아 매출이 일정 임계치를 넘으면 추가 매출의 대부분이 영업이익으로 직결됩니다.",
                "2단계: 네이버 서치플랫폼에 생성형 AI가 적용되어 검색 광고 효율이 20% 이상 향상되었으며, 쇼핑 도착보장 풀필먼트 수수료가 안정적으로 유입됩니다.",
                "3단계: 카카오는 톡비즈 광고 슬롯 개편과 비핵심 자회사 매각을 통해 거버넌스 할인과 규제 리스크를 축소하고 있습니다."
            ],
            "sensitivity": "디지털 광고 매출 5% 증가 시 네이버 영업이익 약 +1,200억 원 증가. 생성형 AI 클라우드 엔터프라이즈 수주당 수백억 원 추가.",
            "currentStatus": "네이버의 서치플랫폼 AI 적용으로 역대 최대 분기 영업이익을 경신 중이며, 밸류에이션(PER 18배) 역시 역사적 바닥권 탈출 중.",
            "outlookSignal": {
                "level": "POSITIVE",
                "badgeText": "🟢 실적 호조 (AI & 광고 반등)",
                "summary": "네이버의 서치플랫폼 AI 적용으로 광고 효율이 급상승하며 역대 최대 분기 영업이익을 경신 중입니다. 사우디 디지털트윈 등 해외 수주 가시화."
            }
        },
        "indicators": [
            {
                "name": "한국은행 소비자심리지수 (CCSI)",
                "role": "내수 소비 및 전자상거래 거래액 선행 지표",
                "impact": "소비심리 개선 시 이커머스 거래액 및 광고 집행 확대",
                "sourceName": "한국은행 ECOS",
                "sourceUrl": "https://ecos.bok.or.kr/"
            },
            {
                "name": "통계청 온라인 쇼핑 동향 통계",
                "role": "모바일/온라인 커머스 거래액 및 카테고리별 증감률",
                "impact": "거래액 증가 시 네이버페이/카카오페이 결제 수수료 직결",
                "sourceName": "통계청 KOSIS",
                "sourceUrl": "https://kosis.kr/"
            }
        ],
        "companies": [
            {
                "name": "NAVER",
                "code": "035420",
                "marketCap": "31조 원",
                "revenue": "10조 8,000억",
                "operatingProfit": "1조 9,500억",
                "opMargin": 18.1,
                "per": 18.5,
                "pbr": 1.15,
                "debtRatio": 45,
                "currentRatio": 165,
                "riskStatus": "SAFE",
                "dividendYield": 1.2,
                "payoutRatio": 20,
                "comment": "국내 1위 검색 포털. 하이퍼클로바X AI B2B 수주 및 사우디 디지털트윈 수출. 자사주 소각 지속"
            },
            {
                "name": "카카오",
                "code": "035720",
                "marketCap": "17조 5,000억",
                "revenue": "8조 2,000억",
                "operatingProfit": "5,800억",
                "opMargin": 7.1,
                "per": 35,
                "pbr": 1.35,
                "debtRatio": 65,
                "currentRatio": 135,
                "riskStatus": "NORMAL",
                "dividendYield": 0.6,
                "payoutRatio": 15,
                "comment": "국민 메신저 카카오톡 기반 톡비즈 회복세. 카카오엔터 등 지배구조 개편 및 경영 효율화 추진"
            },
            {
                "name": "SOOP(아프리카TV)",
                "code": "067160",
                "marketCap": "1조 2,000억",
                "revenue": "4,200억",
                "operatingProfit": "1,150억",
                "opMargin": 27.4,
                "per": 12.5,
                "pbr": 2.8,
                "debtRatio": 35,
                "currentRatio": 190,
                "riskStatus": "SAFE",
                "dividendYield": 3,
                "payoutRatio": 30,
                "comment": "글로벌 라이브 스트리밍 SOOP 론칭. 트위치 철수 수혜로 스트리머 락인, OPM 27%의 막강한 현금창출력"
            }
        ]
    },
    {
        "id": "telecom",
        "chapterId": 1,
        "chapterName": "1. IT·반도체·전자",
        "sector": "통신·AIDC (이동통신, AI 데이터센터, 고배당)",
        "subTitle": "5G CAPEX 정점 통과로 감가상각비 축소 및 AI 데이터센터(AIDC) 신사업 성장",
        "icon": "radio",
        "description": "보급률 100%를 초과한 국내 통신 시장의 안정적인 현금흐름을 바탕으로 엔비디아 GPU 기반 AI 데이터센터, 클라우드, B2B로 확장하는 고배당(6~7%) 가치주 산업.",
        "relatedStocks": "SK텔레콤, KT, LG유플러스",
        "correlationLogic": {
            "formula": "5G CAPEX 설비투자 축소 ➔ 감가상각비 감소 + AI 데이터센터(AIDC) 매출 고성장 ➔ 잉여현금흐름(FCF) 극대화로 배당성향 50~60% 달성",
            "details": [
                "1단계: 5G 전국망 구축이 완료되면서 연간 수조 원에 달하던 무선 네트워크 CAPEX 투자가 정점을 지나 축소 국면에 진입했습니다.",
                "2단계: 과거 과잉 투자분의 감가상각비 내용연수가 종료되며 영업이익률이 방어되고 순현금 유입이 증가합니다.",
                "3단계: AI 데이터센터(AIDC) 및 기업용 클라우드 서비스 매출이 매년 15% 이상 성장하며 통신 본업의 정체를 완벽히 상쇄합니다.",
                "4단계: 기준금리 인하기에는 연 6~7% 수준의 안정적인 배당수익률과 자사주 소각 정책이 부각되어 방어주로서 기관 수급이 집중됩니다."
            ],
            "sensitivity": "CAPEX 10% 절감 시 통신 3사 세전이익 약 +2,000억 원 개선 효과. 기준금리 25bp 인하 시 통신주 배당 매력 상대 우위로 주가 멀티플 약 +5% 재평가.",
            "currentStatus": "5G 가입자 포화로 무선 ARPU 성장은 정체되었으나, 마케팅 출혈경쟁 자제와 AI 데이터센터 수주 확대로 4분기 합산 영업이익 1조 원대 안착.",
            "outlookSignal": {
                "level": "POSITIVE",
                "badgeText": "🟢 안정적 호전 (고배당 & AIDC)",
                "summary": "CAPEX 절감에 따른 감가상각비 감소와 AI 데이터센터 매출 본격화로 안정적인 이익 성장이 기대됩니다. 주주환원율 50% 이상과 6%대 배당수익률이 주가 하방 지지."
            }
        },
        "indicators": [
            {
                "name": "과기정통부 무선통신서비스 가입회선 통계",
                "role": "통신 3사 점유율 및 5G 가입자 비중 추이",
                "impact": "순증 가입자 수에 따라 무선 매출 및 ARPU 추정",
                "sourceName": "과기정통부 통계",
                "sourceUrl": "https://www.msit.go.kr/"
            },
            {
                "name": "국고채 3년물/10년물 금리 (한국은행 ECOS)",
                "role": "고배당주 배당수익률 대비 매력도 벤치마크",
                "impact": "시장금리 하락 시 통신주 배당 매력 상승",
                "sourceName": "한국은행 ECOS",
                "sourceUrl": "https://ecos.bok.or.kr/"
            }
        ],
        "companies": [
            {
                "name": "SK텔레콤",
                "code": "017670",
                "marketCap": "12조 5,000억",
                "revenue": "17조 8,000억",
                "operatingProfit": "1조 8,500억",
                "opMargin": 10.4,
                "per": 9.8,
                "pbr": 0.98,
                "debtRatio": 135,
                "currentRatio": 110,
                "riskStatus": "SAFE",
                "dividendYield": 6.5,
                "payoutRatio": 62,
                "comment": "국내 이동통신 1위. 글로벌 AI 컴퍼니 전환 및 엔비디아 GPU 기반 AI 데이터센터(AIDC) 사업 본격화. 분기배당 실시"
            },
            {
                "name": "KT",
                "code": "030200",
                "marketCap": "10조 2,000억",
                "revenue": "26조 5,000억",
                "operatingProfit": "1조 7,200억",
                "opMargin": 6.5,
                "per": 8.2,
                "pbr": 0.62,
                "debtRatio": 120,
                "currentRatio": 115,
                "riskStatus": "SAFE",
                "dividendYield": 6,
                "payoutRatio": 50,
                "comment": "마이크로소프트와 4.5조 원 규모 AI·클라우드 파트너십 체결. 부동산 및 BC카드 등 알짜 자회사 가치와 자사주 소각 추진"
            },
            {
                "name": "LG유플러스",
                "code": "032640",
                "marketCap": "4조 3,000억",
                "revenue": "14조 5,000억",
                "operatingProfit": "9,800억",
                "opMargin": 6.8,
                "per": 7.5,
                "pbr": 0.48,
                "debtRatio": 140,
                "currentRatio": 95,
                "riskStatus": "NORMAL",
                "dividendYield": 6.8,
                "payoutRatio": 45,
                "comment": "평촌 메가데이터센터 가동으로 IDC 부문 고성장. 주가 저평가 구간이며 6% 후반대 높은 배당수익률 매력 보유"
            }
        ]
    },
    {
        "id": "auto",
        "chapterId": 2,
        "chapterName": "2. 자동차·모빌리티·2차전지",
        "sector": "완성차 (하이브리드 HEV & 제네시스)",
        "subTitle": "전기차 캐즘 속 고수익 하이브리드(HEV) 및 SUV 판매 믹스 개선과 35% 밸류업 주주환원",
        "icon": "car",
        "description": "순수 전기차 캐즘 국면에서 고수익 하이브리드(HEV) 풀라인업과 제네시스 프리미엄 브랜드, 북미 SUV 판매 믹스를 바탕으로 사상 최대 실적을 질주하는 완성차 산업.",
        "relatedStocks": "현대차, 기아",
        "correlationLogic": {
            "formula": "고마진 하이브리드(HEV) 및 SUV 판매 비중 60% 돌파 + 원/달러 1,350원대 유지 ➔ 대당 평균판매단가(ASP) 상승 ➔ OPM 10~12% 달성 및 자사주 4조 원 매입·소각",
            "details": [
                "1단계: 전기차 일시적 수요 둔화 시기에 마진율이 전기차보다 4~5%p 높은 하이브리드 모델(싼타페, 카니발, 스포티지)을 집중 공급하여 글로벌 점유율을 확대했습니다.",
                "2단계: 북미 시장에서 인센티브(할인 지원금)를 억제하면서도 제네시스와 SUV 판매 비중이 60%를 넘어 대당 마진이 극대화되었습니다.",
                "3단계: 현대차는 3개년간 4조 원 규모 자사주 매입·소각 및 분기배당 확대를 공표하며 글로벌 톱티어 수준의 자본배치 정책을 확립했습니다.",
                "4단계: 현대차 인도 법인의 성공적 IPO로 4.5조 원의 유동성을 확보하여 미래 모빌리티 투자 재원을 완벽히 확보했습니다."
            ],
            "sensitivity": "원/달러 환율 10원 상승 시 현대차·기아 합산 영업이익 약 +2,500억~3,000억 원 증가. 하이브리드 판매 10만 대 증가 시 전사 OPM 약 +0.5%p 개선.",
            "currentStatus": "글로벌 완성차 판매량 3위 공고화 및 연간 합산 영업이익 27조 원 돌파로 역대 최고 실적 행진 지속. PER 4~5배의 극저평가 구간.",
            "outlookSignal": {
                "level": "POSITIVE",
                "badgeText": "🟢 사상 최대 실적 (HEV & 밸류업)",
                "summary": "하이브리드 라인업의 압도적 시장 점유율과 고환율 효과로 분기마다 사상 최대 실적을 경신 중입니다. PER 5배 수준의 극저평가와 35% 주주환원율이 주가를 견인합니다."
            }
        },
        "indicators": [
            {
                "name": "현대차/기아 글로벌 월별 도매 및 소매 판매 통계",
                "role": "전 세계 권역별(북미, 유럽, 인도) 완성차 판매 대수",
                "impact": "월간 60만 대 돌파 시 분기 영업이익 6조 원 상회 보증",
                "sourceName": "현대차 IR 공시",
                "sourceUrl": "https://www.hyundai.com/"
            },
            {
                "name": "원/달러 환율 추이 (한국은행 ECOS)",
                "role": "완성차 수출 마진 및 원화 환산 영업이익 결정",
                "impact": "환율 1,320원 이상 유지 시 수출 마진 극대화",
                "sourceName": "한국은행 ECOS",
                "sourceUrl": "https://ecos.bok.or.kr/"
            }
        ],
        "companies": [
            {
                "name": "현대차",
                "code": "005380",
                "marketCap": "52조 원",
                "revenue": "172조 원",
                "operatingProfit": "15조 5,000억",
                "opMargin": 9,
                "per": 5.2,
                "pbr": 0.65,
                "debtRatio": 165,
                "currentRatio": 125,
                "riskStatus": "SAFE",
                "dividendYield": 5.5,
                "payoutRatio": 35,
                "comment": "글로벌 완성차 3위. 3년간 4조 원 자사주 매입·소각 및 분기배당 실시. 인도 법인 상장 대성공과 하이브리드 전 라인업 확대"
            },
            {
                "name": "기아",
                "code": "000270",
                "marketCap": "39조 원",
                "revenue": "106조 원",
                "operatingProfit": "12조 원",
                "opMargin": 11.3,
                "per": 4.5,
                "pbr": 0.85,
                "debtRatio": 85,
                "currentRatio": 155,
                "riskStatus": "SAFE",
                "dividendYield": 6.2,
                "payoutRatio": 35,
                "comment": "OPM 11.3%의 전 세계 최고 수익성 완성차. 무차입에 가까운 재무구조와 5,000억 규모 자사주 전량 소각"
            }
        ]
    },
    {
        "id": "battery",
        "chapterId": 2,
        "chapterName": "2. 자동차·모빌리티·2차전지",
        "sector": "2차전지 (배터리 셀 & 양극재·ESS)",
        "subTitle": "탄산리튬 메탈가 바닥 확인, 재고평가손실 종료 및 AI 데이터센터 대용량 ESS 배터리 수주 폭증",
        "icon": "battery-charging",
        "description": "전기차 캐즘을 에너지저장장치(ESS) 배터리 수주와 4680 원통형 차세대 셀 양산으로 돌파하며, 리튬·니켈 메탈 가격 안정화로 턴어라운드를 시작한 2차전지 배터리 셀 및 소재 산업.",
        "relatedStocks": "LG에너지솔루션, 삼성SDI, 포스코퓨처엠, 에코프로비엠, 엘앤에프",
        "correlationLogic": {
            "formula": "탄산리튬 판가 하락 멈춤 + AI 데이터센터용 ESS 배터리 수주 급증 ➔ 판가-원가 역래깅 손실 종료 ➔ 가동률 회복 및 분기 흑자 안착",
            "details": [
                "1단계: 2차전지 셀과 양극재 기업은 수입 원자재(탄산리튬, 수산화리튬) 가격과 배터리 판매 가격이 3~6개월 연동되어 있어, 2년간의 메탈가 폭락으로 거액의 재고평가손실을 겪었습니다.",
                "2단계: 탄산리튬 가격이 톤당 7만 위안대에서 바닥을 다지며 역래깅 손실이 완전히 종료되고 평가이익 환입 구간에 진입했습니다.",
                "3단계: AI 데이터센터 전력망 백업을 위한 대용량 ESS 배터리 수요가 전기차 수요 둔화를 상쇄하며 신규 수주 잔고를 견인하고 있습니다.",
                "4단계: 미국 IRA 생산세액공제(AMPC) 보조금이 연간 수조 원대 현금으로 유입되며 현금흐름을 방어합니다."
            ],
            "sensitivity": "탄산리튬 가격 10% 반등 시 양극재 기업 분기 재고자산평가익 수백억 원 환입. 북미 ESS 수주 1GWh당 매출 약 +1,500억 원 추가.",
            "currentStatus": "메탈가 바닥 통과와 함께 북미 ESS 배터리 수주 랠리가 시작되었으며, 4680 원통형 배터리 양산 출하로 턴어라운드 조짐.",
            "outlookSignal": {
                "level": "POSITIVE",
                "badgeText": "🟢 바닥 탈출 (ESS 폭증 & 턴어라운드)",
                "summary": "리튬 가격 하락세가 멈추며 2년간 이어진 역래깅 손실이 끝났습니다. AI 데이터센터용 ESS 수주 급증과 차세대 4680 배터리 출하로 실적 반등 시작."
            }
        },
        "indicators": [
            {
                "name": "한국자원정보서비스(KOMIS) 탄산리튬/수산화리튬 시세",
                "role": "양극재 판가 및 2차전지 재고자산평가손익 결정의 절대 지표",
                "impact": "리튬 가격 반등 시 배터리 및 양극재 영업이익 V자 반등",
                "sourceName": "KOMIS 한국자원정보서비스",
                "sourceUrl": "https://www.kores.net/"
            },
            {
                "name": "글로벌 ESS 배터리 분기 출하량 및 수주 잔고 (SNE리서치)",
                "role": "AI 데이터센터 및 신재생 전력망용 배터리 수요량",
                "impact": "ESS 매출 비중 20% 돌파 시 EV 캐즘 완벽 상쇄",
                "sourceName": "SNE Research",
                "sourceUrl": "https://www.sneresearch.com/"
            }
        ],
        "companies": [
            {
                "name": "LG에너지솔루션",
                "code": "373220",
                "marketCap": "95조 원",
                "revenue": "31조 원",
                "operatingProfit": "1조 8,500억",
                "opMargin": 6,
                "per": 45,
                "pbr": 4.2,
                "debtRatio": 85,
                "currentRatio": 165,
                "riskStatus": "SAFE",
                "dividendYield": 0,
                "payoutRatio": 0,
                "comment": "글로벌 1위 배터리 셀 제조사(중국 제외). 북미 GM, 현대차 합작공장 및 AI 데이터센터용 LFP ESS 수주 주도"
            },
            {
                "name": "삼성SDI",
                "code": "006400",
                "marketCap": "24조 원",
                "revenue": "21조 원",
                "operatingProfit": "1조 2,000억",
                "opMargin": 5.7,
                "per": 15,
                "pbr": 1.15,
                "debtRatio": 75,
                "currentRatio": 145,
                "riskStatus": "SAFE",
                "dividendYield": 1.2,
                "payoutRatio": 10,
                "comment": "각형 배터리 및 전고체 배터리(2027년 상용화) 글로벌 선도. 보수적 증설로 탄탄한 재무구조와 PBR 1.1배 밸류에이션 매력"
            },
            {
                "name": "포스코퓨처엠",
                "code": "003670",
                "marketCap": "18조 원",
                "revenue": "4조 5,000억",
                "operatingProfit": "1,650억",
                "opMargin": 3.7,
                "per": 55,
                "pbr": 4.8,
                "debtRatio": 135,
                "currentRatio": 125,
                "riskStatus": "SAFE",
                "dividendYield": 0.5,
                "payoutRatio": 15,
                "comment": "양극재·음극재 풀밸류체인. 광양 전구체 및 아르헨티나 리튬 연계 원가 경쟁력 확보"
            }
        ]
    },
    {
        "id": "tire",
        "chapterId": 2,
        "chapterName": "2. 자동차·모빌리티·2차전지",
        "sector": "타이어 (고인치·전기차 전용 타이어 호황)",
        "subTitle": "천연고무·합성고무 원가 하향 안정화 및 고마진 18인치 이상 고인치·EV 전용 타이어 OPM 16% 달성",
        "icon": "disc",
        "description": "원재료(천연/합성고무) 및 해상 운임 안정화 속에서 마진율이 일반 타이어 대비 2배 높은 18인치 이상 고인치 및 전기차 전용(EV) 교체용(RE) 타이어로 사상 최대 실적을 구가하는 타이어 산업.",
        "relatedStocks": "한국타이어앤테크놀로지, 금호타이어, 넥센타이어",
        "correlationLogic": {
            "formula": "천연고무 가격 및 해상 운임 안정 + 18인치 이상 고인치 비중 45% 돌파 ➔ 원가율 8%p 하락 ➔ OPM 15~18% 사상 최대 실적 폭발",
            "details": [
                "1단계: 타이어 제조 원가의 50%를 차지하는 천연고무(TSR20) 및 합성고무(SBR/BR) 가격이 안정세를 보이며 제조원가율이 대폭 하락했습니다.",
                "2단계: 수출 물류비에 영향을 주는 해상 컨테이너선 운임이 안정화되며 분기 수백억 원의 물류비 절감 효과가 발생합니다.",
                "3단계: 차량 대형화와 전기차 보급으로 18인치 이상 고인치 타이어와 전기차 전용 타이어(한국타이어 아이온 등) 판매 비중이 45%를 넘어서며 대당 판가(ASP)가 급등했습니다."
            ],
            "sensitivity": "고인치 타이어 비중 1%p 상승 시 전사 OPM 약 +0.4%p 개선. 천연고무 가격 10% 하락 시 연간 원가 약 +600억 원 절감.",
            "currentStatus": "유럽·북미 교체용(RE) 타이어 수요 호조와 베트남 등 해외 공장 가동률 100%로 3사 모두 역대 최고 영업이익 기록 지속.",
            "outlookSignal": {
                "level": "POSITIVE",
                "badgeText": "🟢 사상 최대 호황 (OPM 16% & EV타이어)",
                "summary": "고무 원가 안정과 고마진 전기차 전용(아이온) 타이어 판매 호조로 OPM 15%대의 경이로운 수익성을 구가하고 있습니다. PER 6배 수준 저평가 매력."
            }
        },
        "indicators": [
            {
                "name": "싱가포르거래소(SGX) 천연고무 TSR20 선물 가격",
                "role": "타이어 제조원가의 30%를 차지하는 핵심 원자재 가격",
                "impact": "고무 가격 안정 시 타이어 제조원가율 하락 및 마진 개선",
                "sourceName": "SGX Commodities",
                "sourceUrl": "https://www.sgx.com/"
            },
            {
                "name": "대한타이어산업협회 타이어 생산 및 수출 통계",
                "role": "국내외 타이어 출하량 및 18인치 이상 고인치 비중",
                "impact": "고인치 비중 45% 돌파 시 영업이익률 15% 이상 보증",
                "sourceName": "대한타이어산업협회",
                "sourceUrl": "https://www.kotma.or.kr/"
            }
        ],
        "companies": [
            {
                "name": "한국타이어앤테크놀로지",
                "code": "161390",
                "marketCap": "6조 8,000억",
                "revenue": "9조 2,000억",
                "operatingProfit": "1조 4,500억",
                "opMargin": 15.8,
                "per": 6.2,
                "pbr": 0.78,
                "debtRatio": 45,
                "currentRatio": 220,
                "riskStatus": "SAFE",
                "dividendYield": 3.5,
                "payoutRatio": 20,
                "comment": "글로벌 EV 전용 타이어(아이온) 독점적 1위 및 고인치 비중 45% 돌파. OPM 16%에 달하는 경이로운 수익성 달성"
            },
            {
                "name": "금호타이어",
                "code": "073240",
                "marketCap": "1조 6,500억",
                "revenue": "4조 5,000억",
                "operatingProfit": "4,800억",
                "opMargin": 10.7,
                "per": 5.5,
                "pbr": 0.95,
                "debtRatio": 165,
                "currentRatio": 115,
                "riskStatus": "SAFE",
                "dividendYield": 2.8,
                "payoutRatio": 15,
                "comment": "베트남 공장 증설 효과 및 북미·유럽 신차용(OE) 타이어 공급 확대로 10년 만에 역대 최대 영업이익 흑자 달성"
            },
            {
                "name": "넥센타이어",
                "code": "002350",
                "marketCap": "8,500억",
                "revenue": "2조 8,000억",
                "operatingProfit": "2,200억",
                "opMargin": 7.9,
                "per": 6.8,
                "pbr": 0.52,
                "debtRatio": 135,
                "currentRatio": 125,
                "riskStatus": "SAFE",
                "dividendYield": 2.5,
                "payoutRatio": 18,
                "comment": "유럽 체코 공장 2단계 증설 가동으로 유럽 로컬 완성차(포르쉐 등) 공급 본격화"
            }
        ]
    },
    {
        "id": "auto_parts",
        "chapterId": 2,
        "chapterName": "2. 자동차·모빌리티·2차전지",
        "sector": "자동차 부품·전장 (조향·제동 전장화 & SDV)",
        "subTitle": "소프트웨어 중심 자동차(SDV) 전장화, 전자식 조향·제동 시스템 탑재 및 현대차그룹 조지아 공장 가동 수혜",
        "icon": "cog",
        "description": "자율주행 레벨 3, 전자식 조향(Steer-by-Wire) 및 제동(Brake-by-Wire), 고마진 A/S 순정부품과 북미 신공장 가동으로 완성차를 뛰어넘는 성장을 도모하는 자동차 부품 산업.",
        "relatedStocks": "현대모비스, HL만도, 현대위아, 에스엘, 서연이화",
        "correlationLogic": {
            "formula": "완성차 전장화율 50% 돌파 + 현대차 북미 메타플랜트 가동 ➔ 고마진 전자식 섀시 부품 공급 단가(ASP) 30% 상승 ➔ OPM 5~8% 안착",
            "details": [
                "1단계: 자동차가 기계 장치에서 소프트웨어 중심 자동차(SDV)로 진화하면서 전장 부품 원가 비중이 차량 가격의 45~50%까지 확대되었습니다.",
                "2단계: HL만도의 전자식 조향(SbW)과 통합 제동(IDB) 시스템은 테슬라, 폭스바겐, GM 등 글로벌 완성차향으로 수주가 다변화되었습니다.",
                "3단계: 현대모비스의 모듈 제조 외에 고마진 순정부품(A/S) 사업부는 글로벌 운행차량수(UIO) 증가로 매년 1.5조 원 이상의 확정적 영업이익을 창출합니다."
            ],
            "sensitivity": "완성차 글로벌 생산 10만 대 증가 시 현대모비스 모듈 매출 약 +4,000억 원 증가. 전장 수주 1조 원 증가 시 연간 영업이익 약 +500억 원 증가.",
            "currentStatus": "현대차그룹의 미국 조지아 전기차 메타플랜트(HMGMA) 가동으로 동반 진출한 국내 부품사들의 북미 공장 가동률 본격 상승.",
            "outlookSignal": {
                "level": "POSITIVE",
                "badgeText": "🟢 구조적 성장 (전장화 & 북미 증설)",
                "summary": "완성차의 안정적인 생산 호조와 전장 부품 ASP 상승, 북미 메타플랜트 가동 효과로 현대모비스·HL만도의 중장기 마진 개선이 유력합니다."
            }
        },
        "indicators": [
            {
                "name": "글로벌 완성차 및 전기차 전장화 부품 시장 규모",
                "role": "차량 1대당 전장 부품 탑재 비중 및 시장 성장률",
                "impact": "전장화율 50% 돌파 시 부품사 밸류에이션 리레이팅",
                "sourceName": "S&P Global Mobility",
                "sourceUrl": "https://www.spglobal.com/mobility/"
            },
            {
                "name": "현대차그룹 글로벌 운행 차량 수 (UIO, Units in Operation)",
                "role": "현대모비스 A/S 순정부품의 고정 수요 규모",
                "impact": "UIO 매년 4% 성장 시 A/S 부문 현금창출원 영속 보장",
                "sourceName": "현대모비스 IR",
                "sourceUrl": "https://www.mobis.co.kr/"
            }
        ],
        "companies": [
            {
                "name": "현대모비스",
                "code": "012330",
                "marketCap": "23조 원",
                "revenue": "58조 원",
                "operatingProfit": "2조 7,000억",
                "opMargin": 4.7,
                "per": 6.5,
                "pbr": 0.48,
                "debtRatio": 45,
                "currentRatio": 210,
                "riskStatus": "SAFE",
                "dividendYield": 2.8,
                "payoutRatio": 20,
                "comment": "현대차그룹 지배구조 최상단. 전장 부품 및 A/S 고마진 부품의 글로벌 논캡티브(폭스바겐 등) 수주 폭증"
            },
            {
                "name": "HL만도",
                "code": "204320",
                "marketCap": "1조 8,500억",
                "revenue": "8조 8,000억",
                "operatingProfit": "3,800억",
                "opMargin": 4.3,
                "per": 8.5,
                "pbr": 0.75,
                "debtRatio": 155,
                "currentRatio": 115,
                "riskStatus": "SAFE",
                "dividendYield": 2.5,
                "payoutRatio": 20,
                "comment": "자율주행 및 전자식 조향/제동(By-Wire) 선도. 테슬라 및 인도 로컬 완성차향 수주 확대로 고객사 다변화"
            },
            {
                "name": "현대위아",
                "code": "011210",
                "marketCap": "1조 4,500억",
                "revenue": "8조 5,000억",
                "operatingProfit": "2,400억",
                "opMargin": 2.8,
                "per": 8,
                "pbr": 0.38,
                "debtRatio": 110,
                "currentRatio": 135,
                "riskStatus": "SAFE",
                "dividendYield": 1.8,
                "payoutRatio": 15,
                "comment": "차량 구동축(등속조인트) 및 통합열관리시스템(TMS) 공급. 방산 부문 K9 화포 제작 호조"
            }
        ]
    },
    {
        "id": "ship",
        "chapterId": 3,
        "chapterName": "3. 조선·중공업·방산·철강·건설",
        "sector": "조선·해양 (LNG선 & 신조선가 슈퍼사이클)",
        "subTitle": "클락슨 신조선가지수 190p 사상 최고치 및 3.5년치 고가 LNG/친환경 컨테이너선 건조 매출 집중",
        "icon": "anchor",
        "description": "친환경 LNG/암모니아 운반선, 초대형 컨테이너선 시장을 장악하고 3.5년치 일감(도크)을 선점하여 과거 저가 수주 물량을 털어내고 고수익 사이클에 진입한 글로벌 1위 조선 산업.",
        "relatedStocks": "HD한국조선해양, HD현대중공업, 삼성중공업, 한화오션, HD현대미포",
        "correlationLogic": {
            "formula": "신조선가지수 190p 돌파 + 고가 수주 선박 매출 반영 ➔ 조선용 후판 가격 하향 안정 ➔ 영업이익률 8~12% 퀀텀점프",
            "details": [
                "1단계: 조선사는 선박 수주 후 인도까지 3년의 건조 기간(헤비테일 계약)이 소요되어, 2022~2024년 고가에 수주한 선박의 건조 매출 비중이 85%를 돌파했습니다.",
                "2단계: 카타르 2차 LNG 프로젝트 및 IMO 탄소 배출 규제로 노후 선박의 친환경 이중연료 추진선 교체 발주가 지속되고 있습니다.",
                "3단계: 선박 건조 원가의 20%를 차지하는 조선용 후판 가격이 중국산 수입재 유입으로 톤당 80만 원대로 하향 안정화되어 공사손실충당금 환입이 발생합니다."
            ],
            "sensitivity": "신조선가지수 5포인트 상승 시 신규 수주 마진율 약 +2.0%p 개선. 후판 가격 톤당 5만 원 하락 시 조선 3사 영업이익 약 +1,500억 원 개선.",
            "currentStatus": "3.5년치 이상의 도크 일감을 채운 상태에서 선가 협상력을 쥐고 선별 수주를 지속 중이며, 3사 모두 분기 영업이익 수천억 원대 흑자 안착.",
            "outlookSignal": {
                "level": "POSITIVE",
                "badgeText": "🟢 강력 호전 (조선 슈퍼사이클)",
                "summary": "신조선가지수가 사상 최고치 부근을 유지하는 가운데, 2025~2027년 인도되는 고선가 물량 매출 비중이 80%를 돌파하여 사상 최대 실적 랠리가 지속됩니다."
            }
        },
        "indicators": [
            {
                "name": "클락슨 신조선가지수 (Clarksons Newbuilding Index)",
                "role": "전 세계 신규 선박 건조 가격 공식 지표",
                "impact": "지수 185p 상회 시 조선사 영업이익률 두 자릿수 달성 보증",
                "sourceName": "Clarksons Research",
                "sourceUrl": "https://www.crsl.com/"
            },
            {
                "name": "국내 조선용 후판 공급 가격 (포스코-조선사 협상가)",
                "role": "선박 건조 원가(매출원가율)의 핵심 결정 요인",
                "impact": "후판가 하락 시 조선사 공사손실충당금 대규모 환입",
                "sourceName": "스틸데일리/철강협회",
                "sourceUrl": "https://www.kosa.or.kr/"
            }
        ],
        "companies": [
            {
                "name": "HD한국조선해양",
                "code": "009540",
                "marketCap": "14조 5,000억",
                "revenue": "25조 5,000억",
                "operatingProfit": "1조 6,800억",
                "opMargin": 6.6,
                "per": 11.5,
                "pbr": 1.25,
                "debtRatio": 95,
                "currentRatio": 135,
                "riskStatus": "SAFE",
                "dividendYield": 1.5,
                "payoutRatio": 20,
                "comment": "HD현대 조선 중간지주사. HD현대중공업, 현대삼호, 현대미포를 거느린 압도적 글로벌 1위 조선 그룹"
            },
            {
                "name": "삼성중공업",
                "code": "010140",
                "marketCap": "9조 2,000억",
                "revenue": "10조 2,000억",
                "operatingProfit": "5,200억",
                "opMargin": 5.1,
                "per": 15,
                "pbr": 2.1,
                "debtRatio": 260,
                "currentRatio": 95,
                "riskStatus": "SAFE",
                "dividendYield": 0,
                "payoutRatio": 0,
                "comment": "FLNG(부유식 LNG 생산설비) 글로벌 독점 최강자. 해양플랜트 추가 수주 및 LNG선 건조 물량 집중으로 흑자 확대"
            },
            {
                "name": "한화오션",
                "code": "042660",
                "marketCap": "8조 8,000억",
                "revenue": "9조 5,000억",
                "operatingProfit": "3,800억",
                "opMargin": 4,
                "per": 18,
                "pbr": 1.85,
                "debtRatio": 240,
                "currentRatio": 110,
                "riskStatus": "SAFE",
                "dividendYield": 0,
                "payoutRatio": 0,
                "comment": "한화그룹 인수 후 특수선(잠수함, 군함) 및 미국 필리조선소 인수를 통한 미 해군 MRO(함정 유지보수) 사업 본격 진출"
            }
        ]
    },
    {
        "id": "defense",
        "chapterId": 3,
        "chapterName": "3. 조선·중공업·방산·철강·건설",
        "sector": "방위산업 (K-방산 수출 & 유도무기·지상화력)",
        "subTitle": "폴란드·루마니아·중동 2차 수출 실행 및 100조 원 수주 잔고의 본격적 납품 매출화",
        "icon": "shield-alert",
        "description": "K2 전차, K9 자주포, 천궁-II 요격미사일, 다연장로켓 천무의 유럽·중동 대규모 수출 계약이 공장 양산 출하와 함께 폭발적인 매출과 고마진 영업이익으로 전환되는 K-방산 산업.",
        "relatedStocks": "한화에어로스페이스, 현대로템, LIG넥스원, 한국항공우주(KAI)",
        "correlationLogic": {
            "formula": "글로벌 안보 위기 및 NATO 국방비 증액 ➔ K2/K9/천궁 수출 수주 잔고 100조 돌파 ➔ 양산 납품 개시로 수출 마진율 15~20% 폭발",
            "details": [
                "1단계: 러시아-우크라이나 및 중동 분쟁으로 나토(NATO) 회원국 및 중동 국가들의 무기 재고 보충 수요가 폭증했습니다.",
                "2단계: 한국 방산 기업은 서방권에서 유일하게 [신속한 납기 능력, 뛰어난 가격 대비 성능, 실전 검증]을 갖추어 폴란드, 루마니아, UAE, 사우디 수주를 독식했습니다.",
                "3단계: 국내 납품용(마진 4~5%)과 달리 해외 수출 물량은 OPM 15~20%대의 초고수익 마진 구조를 가지고 있어 납품이 진행될수록 전사 영업이익이 급증합니다."
            ],
            "sensitivity": "K-방산 수출 수주 1조 원 납품 시 세전이익 약 +1,500억~1,800억 원 증가. K2 전차 루마니아 추가 계약 시 수조 원대 잔고 추가.",
            "currentStatus": "폴란드 2차 실행 계약 및 루마니아 K9 납품이 본격화되며 한화에어로스페이스와 현대로템이 분기 사상 최대 영업이익을 경신 중.",
            "outlookSignal": {
                "level": "POSITIVE",
                "badgeText": "🟢 사상 최대 실적 (K-방산 100조 수주)",
                "summary": "100조 원에 달하는 역대급 수주 잔고가 본격적인 공장 출하 및 매출로 인식되며 영업이익이 전년 대비 100% 이상 폭증하는 황금기에 진입했습니다."
            }
        },
        "indicators": [
            {
                "name": "방위사업청 방산 수출 계약액 및 수주 잔고 통계",
                "role": "대한민국 연간 방산 수출 수주 총액",
                "impact": "연간 방산 수출 200억 달러 돌파 시 방산주 실적 퀀텀점프",
                "sourceName": "방위사업청",
                "sourceUrl": "https://www.dapa.go.kr/"
            },
            {
                "name": "스톡홀름국제평화연구소(SIPRI) 글로벌 군비 지출 보고서",
                "role": "전 세계 국방비 예산 증액 추이 및 무기 수입 동향",
                "impact": "유럽 국방비 GDP 2% 의무화 시 지속 수주 보증",
                "sourceName": "SIPRI Research",
                "sourceUrl": "https://www.sipri.org/"
            }
        ],
        "companies": [
            {
                "name": "한화에어로스페이스",
                "code": "012450",
                "marketCap": "17조 원",
                "revenue": "11조 5,000억",
                "operatingProfit": "1조 2,500억",
                "opMargin": 10.9,
                "per": 15.5,
                "pbr": 3.5,
                "debtRatio": 185,
                "currentRatio": 125,
                "riskStatus": "SAFE",
                "dividendYield": 1,
                "payoutRatio": 15,
                "comment": "국내 1위 방산 기업. K9 자주포 및 다연장로켓 천무 글로벌 수출 싹쓸이. 한화비전/한화정밀기계 인적분할로 순수 방산주 집중"
            },
            {
                "name": "현대로템",
                "code": "064350",
                "marketCap": "6조 8,000억",
                "revenue": "4조 2,000억",
                "operatingProfit": "4,500억",
                "opMargin": 10.7,
                "per": 14,
                "pbr": 3.1,
                "debtRatio": 120,
                "currentRatio": 145,
                "riskStatus": "SAFE",
                "dividendYield": 0.8,
                "payoutRatio": 15,
                "comment": "K2 흑표 전차 제작사. 폴란드 1차분 인도 가속 및 2차 계약, 루마니아 300대 수주 추진으로 방산 영업이익 비중 70% 돌파"
            },
            {
                "name": "LIG넥스원",
                "code": "079550",
                "marketCap": "5조 2,000억",
                "revenue": "3조 1,000억",
                "operatingProfit": "2,600억",
                "opMargin": 8.4,
                "per": 18,
                "pbr": 3.4,
                "debtRatio": 155,
                "currentRatio": 135,
                "riskStatus": "SAFE",
                "dividendYield": 1.2,
                "payoutRatio": 20,
                "comment": "천궁-II 탄도탄 요격미사일 UAE, 사우디, 이라크 조 단위 수출 싹쓸이. 미국 고스트로보틱스 인수로 4족보행 로봇 국방 결합"
            }
        ]
    },
    {
        "id": "steel",
        "chapterId": 3,
        "chapterName": "3. 조선·중공업·방산·철강·건설",
        "sector": "철강·비철금속 (열연 롤마진 회복 & 중국 감산)",
        "subTitle": "중국 부동산 부양책, 저가 덤핑 규제 및 열연·후판 스프레드 반등과 리튬 소재 융합",
        "icon": "anvil",
        "description": "철광석과 원료탄을 제련하여 자동차·조선·건설에 핵심 소재를 공급하며, 중국 감산 정책과 2차전지 리튬·니켈 원자재 밸류체인을 구축한 기간 제조업.",
        "relatedStocks": "POSCO홀딩스, 현대제철, 동국제강, 고려아연",
        "correlationLogic": {
            "formula": "중국 경기부양책 + 수입 철강재 반덤핑 제재 ➔ 열연 스프레드(판가-원가) 톤당 35만 원 회복 ➔ 분기 영업이익 1조 원대 복귀",
            "details": [
                "1단계: 철강사의 이익은 [열연 판가 - (철광석 가격 × 1.6 + 원료탄 가격 × 0.8)]인 롤마진(스프레드)에 의해 결정됩니다.",
                "2단계: 중국 철강사들의 내수 부진에 따른 저가 덤핑 수출이 정부 감산 지침과 글로벌 무역 장벽으로 억제되면서 아시아 철강 가격이 바닥을 쳤습니다.",
                "3단계: POSCO홀딩스는 아르헨티나 염호 리튬 및 광양 수산화리튬 공장의 상업 가동으로 철강과 2차전지 원자재의 복합 기업으로 재평가받고 있습니다."
            ],
            "sensitivity": "열연 스프레드 톤당 1만 원 확대 시 포스코 연간 영업이익 약 +3,500억 원 증가. 중국 철강 감산 1,000만 톤당 아시아 열연가 +3% 반등.",
            "currentStatus": "중국의 대규모 유동성 공급과 감산 기조로 열연 유통가격이 바닥을 탈출했으며, PBR 0.5배 수준의 역사적 저평가 매력 부각.",
            "outlookSignal": {
                "level": "POSITIVE",
                "badgeText": "🟢 바닥 탈출 (중국 감산 & 마진 반등)",
                "summary": "중국 정부의 강력한 부동산 부양책과 경기 회복 패키지에 힘입어 글로벌 철광석 및 열연 가격이 바닥을 치고 반등세로 돌아섰습니다. PBR 0.5배대 저평가."
            }
        },
        "indicators": [
            {
                "name": "플래츠(Platts) 글로벌 철광석 분광 가격 (TSI 62% Fe)",
                "role": "철강 쇳물 생산 핵심 원자재 가격",
                "impact": "철광석 가격 상승 시 제품가 전가로 롤마진 확대 사이클",
                "sourceName": "S&P Global Commodity Insights",
                "sourceUrl": "https://www.spglobal.com/commodityinsights/"
            },
            {
                "name": "스틸데일리 국내 열연 및 철근 유통가격",
                "role": "철강사 최종 제품 출하 가격 및 롤마진 측정 기준",
                "impact": "유통가 톤당 5만 원 상승 시 철강주 주가 랠리",
                "sourceName": "스틸데일리",
                "sourceUrl": "https://www.steeldaily.co.kr/"
            }
        ],
        "companies": [
            {
                "name": "POSCO홀딩스",
                "code": "005490",
                "marketCap": "31조 원",
                "revenue": "74조 원",
                "operatingProfit": "3조 5,000억",
                "opMargin": 4.7,
                "per": 14.5,
                "pbr": 0.58,
                "debtRatio": 65,
                "currentRatio": 195,
                "riskStatus": "SAFE",
                "dividendYield": 3.2,
                "payoutRatio": 30,
                "comment": "국내 1위 철강사. 아르헨티나 염호 리튬 및 광양 리튬공장 상업가동 본격화로 2차전지 소재와 철강 융합"
            },
            {
                "name": "현대제철",
                "code": "004020",
                "marketCap": "3조 6,000억",
                "revenue": "24조 원",
                "operatingProfit": "8,500억",
                "opMargin": 3.5,
                "per": 7.2,
                "pbr": 0.22,
                "debtRatio": 85,
                "currentRatio": 165,
                "riskStatus": "SAFE",
                "dividendYield": 3.8,
                "payoutRatio": 25,
                "comment": "현대차그룹 캡티브 자동차강판 공급. PBR 0.22배의 극단적 저평가 구간 및 전기로 기반 친환경 철강 전환"
            },
            {
                "name": "고려아연",
                "code": "010130",
                "marketCap": "12조 원",
                "revenue": "10조 5,000억",
                "operatingProfit": "9,500억",
                "opMargin": 9,
                "per": 18,
                "pbr": 1.85,
                "debtRatio": 35,
                "currentRatio": 260,
                "riskStatus": "SAFE",
                "dividendYield": 3.5,
                "payoutRatio": 45,
                "comment": "세계 1위 비철금속(아연, 연, 은, 동) 제련사. 무차입 우량 재무구조와 신재생에너지/이차전지 소재 트로이카 드라이브"
            }
        ]
    },
    {
        "id": "construct",
        "chapterId": 3,
        "chapterName": "3. 조선·중공업·방산·철강·건설",
        "sector": "건설·원전 (체코 원전 24조 수주 & 주택 원가율 안정)",
        "subTitle": "체코 신규 원전 24조 원 주계약 체결 및 고금리 도급 현장 준공에 따른 예정원가율 80%대 정상화",
        "icon": "hard-hat",
        "description": "부동산 PF 구조조정과 시멘트·철근 원자재가 안정을 딛고, 체코 원전 및 중동 대형 가스 플랜트 수주로 재도약하는 초대형 인프라 건설 산업.",
        "relatedStocks": "현대건설, 삼성물산, DL이앤씨, HDC현대산업개발, 대우건설",
        "correlationLogic": {
            "formula": "주택 도급공사 예정원가율 90% 이하 안정 + 체코 원전 착공 ➔ 영업이익률 5~7% 회복 및 PF 충당금 리스크 해소",
            "details": [
                "1단계: 과거 원자재 가격 급등기에 착공했던 저마진 아파트 현장들이 2024~2025년 준공되며 원가율이 95% 이상에서 80% 후반대로 하향 안정화됩니다.",
                "2단계: 한국수력원자력-현대건설-대우건설 팀코리아의 체코 두코바니 신규 원전 2기(24조 원) 수주로 향후 10년간 초대형 고마진 일감이 확보되었습니다.",
                "3단계: DL이앤씨, 삼성물산 등 순현금을 보유한 우량 건설사는 PF 부실 우려 없이 안정적인 밸류업 자사주 소각을 추진합니다."
            ],
            "sensitivity": "주택 원가율 1%p 개선 시 대형 건설사 세전이익 약 +800억~1,200억 원 증가. 체코 원전 매출 인식 시 연간 영업이익 수백억 원 추가.",
            "currentStatus": "PF 리스크가 우량 건설사 중심으로 완벽히 차별화되었으며, 서울 재건축·재개발 분양가 상승으로 자체 개발 마진 급증.",
            "outlookSignal": {
                "level": "POSITIVE",
                "badgeText": "🟢 선별적 호전 (원전 수주 & 원가율 개선)",
                "summary": "체코 원전 본계약 체결 및 서울 주택 정비사업 수주 호조로 실적 턴어라운드가 가시화되었습니다. 순현금 우량 건설사(DL이앤씨, 삼성물산) 중심 매력 부각."
            }
        },
        "indicators": [
            {
                "name": "국토교통부 전국 주택 착공 및 분양 실적 통계",
                "role": "향후 2~3년간 건설사 매출 및 주택 공급 물량 선행 지표",
                "impact": "착공 실적 반등 시 건자재 및 건설사 매출 증가",
                "sourceName": "국토교통부 통계누리",
                "sourceUrl": "https://stat.molit.go.kr/"
            },
            {
                "name": "한국물가협회 시멘트 및 레미콘 가격 동향",
                "role": "건설 현장 매출원가율(원자재비) 결정 요인",
                "impact": "원자재가 안정 시 도급 마진율 즉각 개선",
                "sourceName": "한국물가협회",
                "sourceUrl": "https://www.kpr.co.kr/"
            }
        ],
        "companies": [
            {
                "name": "현대건설",
                "code": "000720",
                "marketCap": "3조 8,000억",
                "revenue": "32조 원",
                "operatingProfit": "8,500억",
                "opMargin": 2.7,
                "per": 8.2,
                "pbr": 0.42,
                "debtRatio": 175,
                "currentRatio": 145,
                "riskStatus": "NORMAL",
                "dividendYield": 2.1,
                "payoutRatio": 20,
                "comment": "시공능력 2위이자 체코 원전 주계약자. 사우디 아미랄 석유화학 플랜트 등 해외 랜드마크 수주 주도"
            },
            {
                "name": "삼성물산",
                "code": "028260",
                "marketCap": "26조 원",
                "revenue": "42조 원",
                "operatingProfit": "2조 9,500억",
                "opMargin": 7,
                "per": 10.5,
                "pbr": 0.72,
                "debtRatio": 65,
                "currentRatio": 185,
                "riskStatus": "SAFE",
                "dividendYield": 2.8,
                "payoutRatio": 35,
                "comment": "삼성그룹 지주사격. 하이테크 반도체 공장 건설 독점과 삼성바이오로직스 지분 가치 보유. 3개년 배당 확대 정책"
            },
            {
                "name": "DL이앤씨",
                "code": "375500",
                "marketCap": "1조 4,500억",
                "revenue": "8조 2,000억",
                "operatingProfit": "4,100억",
                "opMargin": 5,
                "per": 5.2,
                "pbr": 0.29,
                "debtRatio": 98,
                "currentRatio": 175,
                "riskStatus": "SAFE",
                "dividendYield": 3.5,
                "payoutRatio": 22,
                "comment": "e편한세상. 부채비율 98% 및 순현금 1조 원 보유로 건설업계 최고 재무 건전성 및 밸류업 자사주 소각 추진"
            }
        ]
    },
    {
        "id": "refinery",
        "chapterId": 4,
        "chapterName": "4. 정유·화학·에너지",
        "sector": "정유 (복합정제마진 & 유가)",
        "subTitle": "싱가포르 복합정제마진 배럴당 7달러 회복 및 글로벌 노후 정제설비 폐쇄에 따른 수급 개선",
        "icon": "droplets",
        "description": "원유를 정제하여 휘발유, 항공유, 경유를 생산하며, 싱가포르 복합정제마진과 유가 변동에 따른 재고평가손익이 분기 실적을 결정하는 기간 에너지 산업.",
        "relatedStocks": "S-Oil, SK이노베이션, GS, HD현대",
        "correlationLogic": {
            "formula": "싱가포르 정제마진 배럴당 7달러 돌파(BEP 상회) + 국제유가 안정 ➔ 정제 마진 흑자 확대 + 재고평가손실 소멸 ➔ 분기 영업이익 수천억 원 회복",
            "details": [
                "1단계: 정유사의 실질 마진은 유가 자체가 아니라 [석유제품 판매가격 - 원유 도입가격 - 정제비용]인 복합정제마진에 의해 좌우됩니다.",
                "2단계: 글로벌 정유공장들의 정기보수와 노후 설비 폐쇄로 항공유와 경유 중심의 타이트한 공급 수급이 이어집니다.",
                "3단계: S-Oil의 9조 원 샤힌 프로젝트처럼 석유화학 원료를 직접 생산하는 고도화 설비를 통해 원가 경쟁력을 극대화합니다."
            ],
            "sensitivity": "싱가포르 정제마진 배럴당 1달러 상승 시 국내 정유 4사 연간 영업이익 약 +1조 원 증가. 유가 10달러 상승 시 재고평가익 수천억 원 발생.",
            "currentStatus": "글로벌 난방유 성수기 진입과 아시아 지역 정제마진 반등으로 4분기 실적 턴어라운드 국면 안착.",
            "outlookSignal": {
                "level": "POSITIVE",
                "badgeText": "🟢 점진적 호전 (정제마진 반등)",
                "summary": "정제마진이 BEP를 웃도는 배럴당 6~7달러 선으로 회복되고 있으며, 정유 4사의 고도화 설비 가동으로 안정적인 배당 수익률(4~5%) 기대."
            }
        },
        "indicators": [
            {
                "name": "싱가포르 복합정제마진 (GRM, 싱가포르 거래소)",
                "role": "아시아 정유사 수익성의 절대적 나침반 (손익분기점 배럴당 4.5달러)",
                "impact": "마진 6달러 돌파 시 대규모 흑자 구간 진입",
                "sourceName": "로이터/블룸버그",
                "sourceUrl": "https://www.reuters.com/"
            },
            {
                "name": "한국석유공사 페트로넷 두바이유 및 WTI 시세",
                "role": "원유 도입 단가 및 재고자산평가손익 산정 기준",
                "impact": "유가 완만한 상승세 시 재고평가익 긍정적 작용",
                "sourceName": "한국석유공사 페트로넷",
                "sourceUrl": "https://www.petronet.co.kr/"
            }
        ],
        "companies": [
            {
                "name": "S-Oil",
                "code": "010950",
                "marketCap": "7조 5,000억",
                "revenue": "36조 원",
                "operatingProfit": "1조 2,000억",
                "opMargin": 3.3,
                "per": 8.5,
                "pbr": 0.85,
                "debtRatio": 145,
                "currentRatio": 115,
                "riskStatus": "SAFE",
                "dividendYield": 4.5,
                "payoutRatio": 30,
                "comment": "아람코 자회사이자 국내 최고 고도화율 정유사. 샤힌 프로젝트를 통한 초대형 석유화학 콤플렉스 완공 기대"
            },
            {
                "name": "SK이노베이션",
                "code": "096770",
                "marketCap": "11조 원",
                "revenue": "78조 원",
                "operatingProfit": "1조 6,500억",
                "opMargin": 2.1,
                "per": 12,
                "pbr": 0.52,
                "debtRatio": 175,
                "currentRatio": 110,
                "riskStatus": "SAFE",
                "dividendYield": 2.5,
                "payoutRatio": 20,
                "comment": "SK E&S와의 합병 완료로 연간 EBITDA 5조 원대 초대형 민간 에너지 공룡 출범. 배터리(SK온) 흑자 전환 추진"
            },
            {
                "name": "GS",
                "code": "078930",
                "marketCap": "4조 2,000억",
                "revenue": "26조 원",
                "operatingProfit": "3조 2,000억",
                "opMargin": 12.3,
                "per": 3.8,
                "pbr": 0.32,
                "debtRatio": 85,
                "currentRatio": 165,
                "riskStatus": "SAFE",
                "dividendYield": 5.8,
                "payoutRatio": 22,
                "comment": "GS칼텍스 모회사. 정유, 발전, 리테일을 아우르는 탄탄한 지주사로 PBR 0.3배대 극저평가 및 5% 후반대 고배당"
            }
        ]
    },
    {
        "id": "chem",
        "chapterId": 4,
        "chapterName": "4. 정유·화학·에너지",
        "sector": "석유화학 (에틸렌 스프레드 & 스페셜티 소재)",
        "subTitle": "중국 증설 피크아웃, 나프타 원가 하향 안정화 및 고수익 스페셜티 합성고무·전지소재 전환",
        "icon": "flask-conical",
        "description": "나프타분해설비(NCC)를 통해 에틸렌을 생산하며, 범용 플라스틱 침체를 의료용 NB라텍스, 엔지니어링 플라스틱 등 고수익 스페셜티로 극복 중인 기초소재 산업.",
        "relatedStocks": "LG화학, 롯데케미칼, 금호석유, 대한유화",
        "correlationLogic": {
            "formula": "중국 NCC 증설 둔화 + 나프타 원료가 하향 ➔ 에틸렌 스프레드 톤당 250달러 회복 ➔ 적자 축소 후 흑자 턴어라운드",
            "details": [
                "1단계: 석유화학의 손익분기점은 [에틸렌 가격 - 나프타 가격]인 에틸렌 스프레드가 톤당 250달러 이상을 유지하느냐에 달려 있습니다.",
                "2단계: 중국의 공급 과잉이 정점을 지나면서 한계 설비 폐쇄와 가동률 축소가 시작되어 공급 압박이 점진적으로 완화됩니다.",
                "3단계: 금호석유의 NB라텍스(의료용 장갑) 및 LG화학의 엔지니어링 플라스틱(EP) 등 고부가 스페셜티 비중이 높은 기업이 실적을 방어합니다."
            ],
            "sensitivity": "에틸렌 스프레드 톤당 50달러 개선 시 롯데케미칼 분기 영업이익 약 +1,200억 원 개선. 나프타 가격 10% 하락 시 원가율 즉각 개선.",
            "currentStatus": "범용 석유화학의 최악 적자 구간을 통과 중이며, 비핵심 자산 매각 및 고부가 스페셜티/전지소재 전환으로 생존 전략 가동.",
            "outlookSignal": {
                "level": "NEUTRAL",
                "badgeText": "🟡 바닥 다지기 (스페셜티 차별화)",
                "summary": "중국 증설 부담으로 범용 에틸렌 스프레드 회복은 더디나, 금호석유 등 스페셜티 및 고무 소재 기업을 중심으로 실적 방어 및 배당 매력 유효."
            }
        },
        "indicators": [
            {
                "name": "ICIS 에틸렌-나프타 스프레드 공시",
                "role": "석유화학 기초유분 마진 지표 (손익분기점 톤당 250달러)",
                "impact": "스프레드 300달러 돌파 시 화학주 주가 랠리 시작",
                "sourceName": "한국석유화학협회",
                "sourceUrl": "https://www.kpia.or.kr/"
            },
            {
                "name": "중국 국가통계국 제조업 PMI 지수",
                "role": "글로벌 화학제품 최대 소비국인 중국의 산업 수요",
                "impact": "PMI 50 상회 시 플라스틱 원료 주문량 증가",
                "sourceName": "중국 국가통계국",
                "sourceUrl": "http://www.stats.gov.cn/"
            }
        ],
        "companies": [
            {
                "name": "LG화학",
                "code": "051910",
                "marketCap": "23조 원",
                "revenue": "54조 원",
                "operatingProfit": "2조 1,000억",
                "opMargin": 3.9,
                "per": 18,
                "pbr": 0.78,
                "debtRatio": 85,
                "currentRatio": 165,
                "riskStatus": "SAFE",
                "dividendYield": 2.5,
                "payoutRatio": 25,
                "comment": "LG에너지솔루션 지분 81% 보유. 석유화학 고도화와 2차전지 양극재 및 바이오 신약(AVEO) 3대 신성장 동력 집중"
            },
            {
                "name": "금호석유",
                "code": "011780",
                "marketCap": "3조 5,000억",
                "revenue": "7조 2,000억",
                "operatingProfit": "4,200억",
                "opMargin": 5.8,
                "per": 9.5,
                "pbr": 0.65,
                "debtRatio": 38,
                "currentRatio": 240,
                "riskStatus": "SAFE",
                "dividendYield": 4.2,
                "payoutRatio": 35,
                "comment": "의료용 NB라텍스 및 타이어용 합성고무 글로벌 1위. 부채비율 38%의 압도적 재무건전성과 자사주 전량 소각 이행"
            },
            {
                "name": "롯데케미칼",
                "code": "011170",
                "marketCap": "3조 2,000억",
                "revenue": "20조 원",
                "operatingProfit": "-2,500억",
                "opMargin": -1.3,
                "per": -1,
                "pbr": 0.25,
                "debtRatio": 75,
                "currentRatio": 155,
                "riskStatus": "NORMAL",
                "dividendYield": 2,
                "payoutRatio": 0,
                "comment": "PBR 0.25배의 극단적 저평가. 파키스탄 자회사 매각 및 인도네시아 라인 프로젝트 재조정 등 자산 다각화 추진"
            }
        ]
    },
    {
        "id": "power_grid",
        "chapterId": 4,
        "chapterName": "4. 정유·화학·에너지",
        "sector": "전력기기·전력망 (변압기 쇼티지 & AI 전력 인프라)",
        "subTitle": "미국 노후 전력망 교체 및 AI 데이터센터 가동 폭증에 따른 초고압 변압기 OPM 20% 폭발",
        "icon": "zap",
        "description": "생성형 AI 데이터센터 가동으로 인한 전력 소비 폭증과 북미 노후 전력망 교체 주기가 맞물려 초고압 변압기, 배전반이 수년치 품귀(쇼티지)를 겪는 초호황 전력기기 산업.",
        "relatedStocks": "HD현대일렉트릭, LS ELECTRIC, 효성중공업, 일진전기",
        "correlationLogic": {
            "formula": "AI 데이터센터 전력 소비 급증 + 북미 초고압 변압기 쇼티지 ➔ 수주 단가(ASP) 분기당 연속 상승 ➔ OPM 18~22% 사상 최대 실적 폭발",
            "details": [
                "1단계: 미국 변압기의 70%가 설치 후 25년 이상 경과된 노후 설비로 대규모 교체 사이클에 직면했습니다.",
                "2단계: 빅테크 기업들의 AI 데이터센터 전력 소모량이 기하급수적으로 늘어나며 전력망 접속 대기 시간이 4~5년으로 늘어났습니다.",
                "3단계: HD현대일렉트릭과 LS ELECTRIC은 2028~2029년 납기 물량까지 수주를 꽉 채우며 판매자 우위 시장(Seller’s Market)에서 최고가 선별 수주를 진행 중입니다."
            ],
            "sensitivity": "변압기 수주 단가 10% 상승 시 전력기기사 OPM 약 +2.5%p 상승. 북미 법인 수주 1,000억 원 증가 시 영업이익 약 +200억 원 증가.",
            "currentStatus": "글로벌 변압기 수주 랠리와 미국 현지 배전 시스템 공급 확대로 분기 영업이익이 전년 대비 100% 이상 급증하는 사상 최대 호황 구가.",
            "outlookSignal": {
                "level": "POSITIVE",
                "badgeText": "🟢 강력 호황 (전력망 슈퍼사이클)",
                "summary": "AI 데이터센터 전력 수요와 북미 전력망 교체로 변압기·전력기기 기업들의 영업이익이 100% 이상 급증하고 있습니다. 4~5년치 수주 잔고 확보."
            }
        },
        "indicators": [
            {
                "name": "미국 노동통계국(BLS) 전력변압기 생산자물가지수(PPI)",
                "role": "글로벌 초고압 변압기 수주 단가 상승세 실시간 측정",
                "impact": "지수 최고치 경신 시 전력기기 기업 OPM 20% 보증",
                "sourceName": "미국 노동통계국 BLS",
                "sourceUrl": "https://www.bls.gov/"
            },
            {
                "name": "미국 에너지정보청(EIA) 월간 전력 데이터 리포트",
                "role": "미국 내 전력 소비량 및 신규 송배전망 투자 규모",
                "impact": "송배전망 투자 증액 시 국내 전력기기 3사 수주 직결",
                "sourceName": "U.S. EIA",
                "sourceUrl": "https://www.eia.gov/"
            }
        ],
        "companies": [
            {
                "name": "HD현대일렉트릭",
                "code": "267260",
                "marketCap": "12조 원",
                "revenue": "3조 8,000억",
                "operatingProfit": "7,500억",
                "opMargin": 19.7,
                "per": 18.5,
                "pbr": 7.2,
                "debtRatio": 135,
                "currentRatio": 145,
                "riskStatus": "SAFE",
                "dividendYield": 1.2,
                "payoutRatio": 20,
                "comment": "글로벌 초고압 변압기 1위. OPM 20%에 육박하는 경이로운 수익성과 울산 및 미국 앨라배마 공장 풀가동"
            },
            {
                "name": "LS ELECTRIC",
                "code": "010120",
                "marketCap": "4조 8,000억",
                "revenue": "4조 5,000억",
                "operatingProfit": "3,800억",
                "opMargin": 8.4,
                "per": 15,
                "pbr": 2.45,
                "debtRatio": 125,
                "currentRatio": 155,
                "riskStatus": "SAFE",
                "dividendYield": 2.2,
                "payoutRatio": 30,
                "comment": "북미 배전반 및 초고압 변압기 증설 효과. K-배터리·반도체 미국 공장 배전 시스템 독점 수주"
            },
            {
                "name": "효성중공업",
                "code": "298040",
                "marketCap": "3조 9,000억",
                "revenue": "4조 8,000억",
                "operatingProfit": "3,900억",
                "opMargin": 8.1,
                "per": 14.5,
                "pbr": 3.1,
                "debtRatio": 220,
                "currentRatio": 110,
                "riskStatus": "SAFE",
                "dividendYield": 1.5,
                "payoutRatio": 20,
                "comment": "미국 테네시 변압기 공장 흑자 전환 및 유럽 스태콤(STATCOM) 등 차세대 송전 시스템 수주 선도"
            }
        ]
    },
    {
        "id": "energy_infra",
        "chapterId": 4,
        "chapterName": "4. 정유·화학·에너지",
        "sector": "전력발전·원자력 (한국전력 흑자 & SMR 소형원전)",
        "subTitle": "산업용 전기요금 정상화에 따른 한전 분기 2조 원대 흑자 및 체코 원전·소형모듈원전(SMR) 수주 랠리",
        "icon": "atom",
        "description": "국제 연료비 하락과 전기요금 인상으로 역대급 흑자 전환에 안착한 한국전력과, 대형 원전 주기기 제작 및 차세대 소형원전(SMR) 파운드리를 주도하는 원자력 에너지 산업.",
        "relatedStocks": "한국전력, 두산에너빌리티, 한전KPS, 한전기술",
        "correlationLogic": {
            "formula": "원자재가(석탄/LNG) 안정 + 전기요금 정상화 ➔ 전력도매가(SMP) 하락으로 한전 분기 2조 원대 흑자 + 원전 수주 24조 원 달성",
            "details": [
                "1단계: 한전이 발전 자회사로부터 사 오는 전력도매가격(SMP)이 kWh당 120원대로 하향 안정화되며 판매마진이 대폭 개선되었습니다.",
                "2단계: 산업용 전기요금 인상 효과로 연간 7조 원 이상의 영업이익을 창출하며 누적 적자를 해소하고 배당 재개 가시성이 열렸습니다.",
                "3단계: 두산에너빌리티는 체코 신규 원전 2기 주기기 독점 제작과 미국 뉴스케일파워, 엑스에너지 등 글로벌 SMR 파운드리 수주를 본격화했습니다."
            ],
            "sensitivity": "전기요금 kWh당 1원 인상 시 한전 연간 매출 및 영업이익 약 +5,500억 원 증가. 원전 주기기 1기 수주 시 두산에너빌리티 매출 약 +1.5조 원 추가.",
            "currentStatus": "한전의 연간 영업이익 7조 원 돌파 흑자 안착과 체코 원전 본계약 체결로 원전 생태계 전반의 수주 랠리 지속.",
            "outlookSignal": {
                "level": "POSITIVE",
                "badgeText": "🟢 강력 흑자 (한전 흑자 & 원전 르네상스)",
                "summary": "한전의 역대급 흑자 전환과 전기요금 정상화로 재무 리스크가 완전히 해소되었으며, 두산에너빌리티의 SMR 파운드리 수주 확대로 원전 르네상스 본격화."
            }
        },
        "indicators": [
            {
                "name": "전력거래소(EPSIS) 계통한계가격(SMP)",
                "role": "한전의 전력 도매 구입 단가 기준 (원/kWh)",
                "impact": "SMP 120원 이하 안정 시 한전 전력 판매 마진 극대화",
                "sourceName": "전력거래소 EPSIS",
                "sourceUrl": "https://epsis.kpx.or.kr/"
            },
            {
                "name": "원자력발전소 가동률 통계 (한국원자력산업협회)",
                "role": "국내 원전 기저발전 비중 및 정비 가동 일수",
                "impact": "원전 가동률 85% 상회 시 발전 원가 대폭 절감",
                "sourceName": "한국원자력산업협회",
                "sourceUrl": "https://www.kaif.or.kr/"
            }
        ],
        "companies": [
            {
                "name": "한국전력",
                "code": "015760",
                "marketCap": "14조 2,000억",
                "revenue": "92조 원",
                "operatingProfit": "7조 5,000억",
                "opMargin": 8.2,
                "per": 3.5,
                "pbr": 0.35,
                "debtRatio": 480,
                "currentRatio": 75,
                "riskStatus": "SAFE",
                "dividendYield": 0,
                "payoutRatio": 0,
                "comment": "산업용 전기요금 인상 및 연료비 하락으로 분기 2조 원대 영업이익 흑자 질주. 누적 적자 해소 후 배당 재개 기대"
            },
            {
                "name": "두산에너빌리티",
                "code": "034020",
                "marketCap": "13조 원",
                "revenue": "17조 원",
                "operatingProfit": "1조 1,000억",
                "opMargin": 6.5,
                "per": 22,
                "pbr": 1.65,
                "debtRatio": 110,
                "currentRatio": 125,
                "riskStatus": "SAFE",
                "dividendYield": 0,
                "payoutRatio": 0,
                "comment": "팀코리아 원전 주기기 독점 제작사. 체코 원전 24조 원 수주 및 미국 뉴스케일파워 SMR 파운드리 수주 본격화"
            },
            {
                "name": "한전KPS",
                "code": "051600",
                "marketCap": "1조 9,500억",
                "revenue": "1조 6,000억",
                "operatingProfit": "2,100억",
                "opMargin": 13.1,
                "per": 11.5,
                "pbr": 1.45,
                "debtRatio": 25,
                "currentRatio": 290,
                "riskStatus": "SAFE",
                "dividendYield": 5.2,
                "payoutRatio": 55,
                "comment": "원전 및 발전설비 정비(MRO) 독점 공기업. 무차입 경영 및 5%대 안정적인 고배당 매력 보유"
            }
        ]
    },
    {
        "id": "gas",
        "chapterId": 4,
        "chapterName": "4. 정유·화학·에너지",
        "sector": "도시가스·가스인프라 (미수금 회수 & 직도입)",
        "subTitle": "민수용 가스요금 현실화에 따른 미수금 회수 개시 및 LNG 직도입 확대와 안정적 5%대 고배당",
        "icon": "flame",
        "description": "한국가스공사의 LNG 도매 공급망과 지역 독점 배관망을 통해 전국에 청정 에너지를 공급하며, 가스요금 정상화로 재무구조가 개선 중인 에너지 인프라 산업.",
        "relatedStocks": "한국가스공사, SK가스, 삼천리, 서울가스",
        "correlationLogic": {
            "formula": "민수용 도시가스 요금 단계적 인상 ➔ 14조 원 미수금 회수 시작 ➔ 차입금 이자비용 감소 및 장부상 순이익 현실화 ➔ 배당 재개",
            "details": [
                "1단계: 도시가스 요금 인상으로 분기당 수천억 원씩 미수금이 회수되며 가스공사의 악성 차입금과 이자비용 부담이 꺾이기 시작했습니다.",
                "2단계: 지역 도시가스 소매사(삼천리 등)는 총괄원가보상제도를 통해 적정 투자보수율을 법적으로 보장받아 안정적인 4~5%대 배당을 지급합니다.",
                "3단계: SK가스는 울산 GPS 세계 최초 LNG·LPG 겸용 발전소를 상업 가동하여 단순 유통사에서 민간 LNG 발전사로 도약했습니다."
            ],
            "sensitivity": "도시가스 요금 MJ당 1원 인상 시 가스공사 연간 미수금 회수액 약 +5,000억 원 증가. 겨울철 기온 1도 하락 시 난방 가스 소비량 7% 증가.",
            "currentStatus": "가스요금 인상 효과로 가스공사 미수금 회수 사이클이 가동되었으며, 동해 심해 가스전 탐사 시추 모멘텀 보유.",
            "outlookSignal": {
                "level": "POSITIVE",
                "badgeText": "🟢 미수금 회수 & 배당 정상화",
                "summary": "도시가스 요금 인상으로 한국가스공사의 미수금 회수가 시작되며 배당 재개 가시성이 높아졌습니다. 삼천리·SK가스의 안정적 현금흐름과 고배당 매력."
            }
        },
        "indicators": [
            {
                "name": "한국가스공사 민수용 미수금 잔액 추이 (공시)",
                "role": "가스공사 재무건전성 및 추가 요금 인상 필요성 판단",
                "impact": "미수금 순감소 확인 시 가스공사 주가 급등",
                "sourceName": "DART 전자공시",
                "sourceUrl": "https://dart.fss.or.kr/"
            },
            {
                "name": "동북아 LNG 스팟 가격 (JKM, Japan Korea Marker)",
                "role": "아시아 LNG 스팟 도입 원가 및 발전용 가스 가격",
                "impact": "JKM 가격 안정 시 가스공사 운전자본 부담 경감",
                "sourceName": "S&P Global Commodity Insights",
                "sourceUrl": "https://www.spglobal.com/"
            }
        ],
        "companies": [
            {
                "name": "한국가스공사",
                "code": "036460",
                "marketCap": "3조 8,000억",
                "revenue": "45조 원",
                "operatingProfit": "2조 2,000억",
                "opMargin": 4.9,
                "per": 5.5,
                "pbr": 0.38,
                "debtRatio": 420,
                "currentRatio": 85,
                "riskStatus": "SAFE",
                "dividendYield": 3.5,
                "payoutRatio": 25,
                "comment": "국내 독점 천연가스 도매 사업자. 요금 정상화에 따른 미수금 회수와 동해 가스전 개발 수혜 및 배당 재개 추진"
            },
            {
                "name": "SK가스",
                "code": "018670",
                "marketCap": "1조 6,500억",
                "revenue": "7조 1,000억",
                "operatingProfit": "3,100억",
                "opMargin": 4.4,
                "per": 6.8,
                "pbr": 0.65,
                "debtRatio": 110,
                "currentRatio": 160,
                "riskStatus": "SAFE",
                "dividendYield": 4.8,
                "payoutRatio": 30,
                "comment": "국내 1위 LPG 유통사. 울산 GPS 세계 최초 LNG·LPG 겸용 가스복합화력발전소 상업 가동으로 LNG 사업자로 대변신"
            },
            {
                "name": "삼천리",
                "code": "004690",
                "marketCap": "4,500억",
                "revenue": "5조 2,000억",
                "operatingProfit": "1,350억",
                "opMargin": 2.6,
                "per": 5.8,
                "pbr": 0.28,
                "debtRatio": 125,
                "currentRatio": 145,
                "riskStatus": "SAFE",
                "dividendYield": 3.5,
                "payoutRatio": 20,
                "comment": "국내 1위 도시가스 소매사(경기 서남부 및 인천 독점). PBR 0.28배 극저평가 및 안정적 배당"
            }
        ]
    },
    {
        "id": "bio_cdmo",
        "chapterId": 5,
        "chapterName": "5. 바이오·제약·헬스케어",
        "sector": "바이오시밀러·CDMO (글로벌 위탁생산 & 미국 직판)",
        "subTitle": "글로벌 1위 항체의약품 생산능력 78만 리터 풀가동 및 미국 짐펜트라 신약 직판 매출 본격화",
        "icon": "test-tube",
        "description": "글로벌 빅파마의 블록버스터 바이오의약품을 대량 위탁생산하는 CDMO 세계 1위와, 고마진 바이오시밀러 및 신약의 미국 시장 직접 판매망을 장악한 첨단 바이오 산업.",
        "relatedStocks": "삼성바이오로직스, 셀트리온, 삼성에피스",
        "correlationLogic": {
            "formula": "글로벌 빅파마 수주 잔고 20조 원 돌파 + 1~4공장 100% 풀가동 ➔ 영업이익률 30~35% 초고수익 달성 및 5공장 증설 가속",
            "details": [
                "1단계: 미국 생물보안법(Biosecure Act) 통과로 중국 우시바이오로직스가 배제되면서 글로벌 빅파마의 신규 CDMO 수주가 삼성바이오로직스로 쏠리고 있습니다.",
                "2단계: 단일 공장 세계 최대인 4공장(24만 리터) 가동률이 100%에 도달하며 분기 매출 1조 원, 영업이익 4,000억 원대 체제가 완성되었습니다.",
                "3단계: 셀트리온은 미국 시장에 출시한 짐펜트라(램시마SC 피하주사 제형)가 3대 PBM(처방약급여관리업체)에 등재되며 미국 직접 판매 매출이 폭발하고 있습니다."
            ],
            "sensitivity": "신규 글로벌 CDMO 수주 1조 원당 삼성바이오로직스 연매출 약 +4,000억 원 추가. 짐펜트라 미국 처방액 1,000억 원 증가 시 셀트리온 OPM 약 +2.5%p 개선.",
            "currentStatus": "삼성바이오로직스의 연간 누적 수주 4조 원 돌파와 셀트리온의 합병 시너지 가시화로 4분기 사상 최대 실적 경신 지속.",
            "outlookSignal": {
                "level": "POSITIVE",
                "badgeText": "🟢 사상 최대 실적 (생물보안법 & 수주 폭증)",
                "summary": "미국 생물보안법 반사이익과 4공장 풀가동으로 삼성바이오로직스가 사상 최대 실적을 달성 중이며, 셀트리온 짐펜트라의 미국 직판 안착으로 K-바이오 황금기 도래."
            }
        },
        "indicators": [
            {
                "name": "미국 FDA 생물학적제제 품목허가(BLA) 승인 현황",
                "role": "국산 바이오시밀러 및 신약의 미국 출시 승인",
                "impact": "승인 시 미국 PBM 등재 및 즉각적인 매출 발생",
                "sourceName": "U.S. FDA Drugs",
                "sourceUrl": "https://www.fda.gov/"
            },
            {
                "name": "삼성바이오로직스 분기 누적 수주 잔고 공시",
                "role": "글로벌 빅파마와의 장기 위탁생산 계약 규모",
                "impact": "수주 잔고 20조 원 돌파 시 5~6공장 조기 증설 확정",
                "sourceName": "DART 전자공시",
                "sourceUrl": "https://dart.fss.or.kr/"
            }
        ],
        "companies": [
            {
                "name": "삼성바이오로직스",
                "code": "207940",
                "marketCap": "71조 원",
                "revenue": "4조 2,000억",
                "operatingProfit": "1조 3,500억",
                "opMargin": 32.1,
                "per": 62,
                "pbr": 6.5,
                "debtRatio": 65,
                "currentRatio": 185,
                "riskStatus": "SAFE",
                "dividendYield": 0,
                "payoutRatio": 0,
                "comment": "글로벌 1위 바이오의약품 CDMO(위탁생산). 4공장 풀가동 및 5공장 증설과 연간 수주액 4조 원 돌파"
            },
            {
                "name": "셀트리온",
                "code": "068270",
                "marketCap": "42조 원",
                "revenue": "3조 5,000억",
                "operatingProfit": "7,800억",
                "opMargin": 22.3,
                "per": 35,
                "pbr": 2.8,
                "debtRatio": 38,
                "currentRatio": 240,
                "riskStatus": "SAFE",
                "dividendYield": 0.8,
                "payoutRatio": 20,
                "comment": "셀트리온헬스케어 합병 완료. 미국 짐펜트라(램시마SC) 신약 직판 본격화 및 고마진 바이오시밀러 신제품 포트폴리오 완성"
            }
        ]
    },
    {
        "id": "bio_innov",
        "chapterId": 5,
        "chapterName": "5. 바이오·제약·헬스케어",
        "sector": "혁신신약·플랫폼기술 (FDA 승인 & SC 제형변경)",
        "subTitle": "유한양행 렉라자 미국 FDA 승인 성공 및 알테오젠 키트루다SC 글로벌 독점 계약 마일스톤",
        "icon": "dna",
        "description": "글로벌 빅파마(머크, 얀센)향 조 단위 기술수출(L/O) 계약을 맺고, 정맥주사(IV)를 5분 만에 맞는 피하주사(SC)로 변환하는 플랫폼 기술과 항체약물접합체(ADC)를 선도하는 바이오 산업.",
        "relatedStocks": "유한양행, 알테오젠, 한미약품, 리가켐바이오, 에이비엘바이오",
        "correlationLogic": {
            "formula": "미국 FDA 국산 항암제 승인 + 피하주사(SC) 독점 상업화 ➔ 순수 기술료 마일스톤 유입 + 매출 로열티 10~15% 수취 ➔ 순이익 퀀텀점프",
            "details": [
                "1단계: 유한양행의 폐암 치료제 렉라자(레이저티닙)가 국산 항암제 최초로 미국 FDA 승인을 획득하여 얀센으로부터 800억 원의 마일스톤을 즉시 수취했습니다.",
                "2단계: 알테오젠의 인간 히알루로니다제(ALT-B4) 기술은 머크의 면역항암제 키트루다(연매출 33조 원) 피하주사(SC) 독점 파트너십을 체결하여 조 단위 로열티를 확보했습니다.",
                "3단계: 제조 원가가 들지 않는 순수 기술료 유입으로 영업이익률이 50% 이상으로 급등하는 고부가가치 바이오텍 모델입니다."
            ],
            "sensitivity": "키트루다SC 미국 판매 시 알테오젠 연간 판매 로열티 수천억 원 순이익 반영. FDA 신규 임상 3상 성공 시 기업가치 조 단위 리레이팅.",
            "currentStatus": "국산 신약의 FDA 본승인과 글로벌 플랫폼 독점 상업화가 결합되어 코스닥 및 바이오 섹터 주도주로 전면 부상.",
            "outlookSignal": {
                "level": "POSITIVE",
                "badgeText": "🟢 사상 최대 성과 (FDA 승인 & 플랫폼 독점)",
                "summary": "유한양행 렉라자의 미국 FDA 승인 성공과 알테오젠의 키트루다SC 독점 계약으로 K-바이오 연구개발의 상업화 결실이 폭발하고 있습니다."
            }
        },
        "indicators": [
            {
                "name": "미국 FDA 신약 허가 승인 목록 (Novel Drug Approvals)",
                "role": "글로벌 최대 의약품 시장 미국 본승인 확정 여부",
                "impact": "FDA 승인 시 조 단위 상업화 로열티 수취 개시",
                "sourceName": "U.S. FDA Drugs",
                "sourceUrl": "https://www.fda.gov/"
            },
            {
                "name": "글로벌 바이오 학회 임상 발표 일정 (ASCO, ESMO)",
                "role": "주요 신약 후보물질 임상 2/3상 유효성 데이터 공개",
                "impact": "임상 서프라이즈 발표 시 글로벌 라이선스 아웃 직결",
                "sourceName": "ASCO/ESMO 공식사이트",
                "sourceUrl": "https://www.asco.org/"
            }
        ],
        "companies": [
            {
                "name": "유한양행",
                "code": "000100",
                "marketCap": "10조 5,000억",
                "revenue": "2조 1,000억",
                "operatingProfit": "1,450억",
                "opMargin": 6.9,
                "per": 45,
                "pbr": 4.8,
                "debtRatio": 35,
                "currentRatio": 260,
                "riskStatus": "SAFE",
                "dividendYield": 0.8,
                "payoutRatio": 25,
                "comment": "국산 항암제 최초 미국 FDA 승인(렉라자). 얀센으로부터 800억 원 마일스톤 수취 및 글로벌 판매 로열티 유입 본격화"
            },
            {
                "name": "알테오젠",
                "code": "196170",
                "marketCap": "21조 원",
                "revenue": "1,200억",
                "operatingProfit": "480억",
                "opMargin": 40,
                "per": 150,
                "pbr": 28,
                "debtRatio": 25,
                "currentRatio": 320,
                "riskStatus": "SAFE",
                "dividendYield": 0,
                "payoutRatio": 0,
                "comment": "코스닥 시총 1위. 정맥주사를 피하주사로 바꾸는 인간 히알루로니다제 플랫폼(ALT-B4) 글로벌 빅파마(머크 등) 독점 계약"
            },
            {
                "name": "리가켐바이오",
                "code": "141080",
                "marketCap": "3조 5,000억",
                "revenue": "650억",
                "operatingProfit": "-220억",
                "opMargin": -33.8,
                "per": -1,
                "pbr": 6.5,
                "debtRatio": 18,
                "currentRatio": 450,
                "riskStatus": "SAFE",
                "dividendYield": 0,
                "payoutRatio": 0,
                "comment": "차세대 항암제 ADC(항체약물접합체) 플랫폼 기술 최강자. 얀센 등 글로벌 빅파마 누적 8.7조 원 기술수출 달성"
            }
        ]
    },
    {
        "id": "pharma",
        "chapterId": 5,
        "chapterName": "5. 바이오·제약·헬스케어",
        "sector": "전통제약·처방의약품 (만성질환 ETC & 원료의약품)",
        "subTitle": "고령화 가속화에 따른 고혈압·당뇨 처방약(ETC) 수요 증가 및 자체 개발 복합제 고마진",
        "icon": "pill",
        "description": "국내 고령 인구 1,000만 명 돌파와 함께 고혈압, 당뇨, 이상지질혈증 등 만성질환 전문의약품(ETC) 복합제 처방액 증가로 안정적인 10%대 영업이익률을 창출하는 전통 제약 산업.",
        "relatedStocks": "한미약품, 종근당, 대웅제약, 보령, GC녹십자",
        "correlationLogic": {
            "formula": "초고령 사회 진입 ➔ 만성질환 2~3제 복합제 원외처방액(UBIST) 사상 최대 ➔ 자체 합성 복합제 판매로 OPM 12~16% 달성",
            "details": [
                "1단계: 한국이 65세 이상 고령 인구 비중 20%를 넘어서는 초고령 사회에 진입함에 따라 평생 복용하는 만성질환 전문의약품(ETC) 처방액이 매년 7%씩 성장합니다.",
                "2단계: 단순 제네릭(복제약)보다 환자의 복용 편의성을 높인 자체 개발 개량신약 복합제(로수젯, 아모잘탄 등) 비중이 커지며 마진율이 상승합니다.",
                "3단계: 대웅제약의 보툴리눔 톡신 나보타(주보)처럼 미국·유럽 시장에 직수출하는 바이오 제제가 전사 영업이익의 성장을 견인합니다."
            ],
            "sensitivity": "원외처방액 5% 증가 시 한미약품/종근당 연간 영업이익 약 +150억~250억 원 증가. 나보타 미국 수출 10% 증가 시 대웅제약 OPM 약 +1.0%p 개선.",
            "currentStatus": "고마진 자체 개발 개량신약 처방액 증가와 나보타 미국 수출 호조로 연간 영업이익 사상 최대치 경신 지속.",
            "outlookSignal": {
                "level": "POSITIVE",
                "badgeText": "🟢 견조한 호전 (고령화 & 개량신약)",
                "summary": "초고령화에 따른 전문의약품(ETC) 처방액 증가와 보툴리눔 톡신 미국 수출 성장으로 안정적인 실적 창출과 12~15%대 영업이익률 유지."
            }
        },
        "indicators": [
            {
                "name": "유비스트(UBIST) 국내 원외처방 조제액 데이터",
                "role": "전국 병의원 의사들의 실제 전문의약품 처방액 통계",
                "impact": "처방액 순위 1~3위 유지 시 연간 1,000억 원대 캐시카우",
                "sourceName": "UBIST 제약통계",
                "sourceUrl": "https://www.ubist.co.kr/"
            },
            {
                "name": "관세청 의약품 및 원료의약품(API) 월별 수출액",
                "role": "국내 제약사 의약품의 글로벌 해외 수출 규모",
                "impact": "의약품 수출 두 자릿수 증가 시 제약주 실적 호조",
                "sourceName": "관세청 수출입무역통계",
                "sourceUrl": "https://unipass.customs.go.kr/"
            }
        ],
        "companies": [
            {
                "name": "한미약품",
                "code": "128940",
                "marketCap": "4조 2,000억",
                "revenue": "1조 6,000억",
                "operatingProfit": "2,400억",
                "opMargin": 15,
                "per": 18,
                "pbr": 3.1,
                "debtRatio": 65,
                "currentRatio": 165,
                "riskStatus": "SAFE",
                "dividendYield": 1.2,
                "payoutRatio": 20,
                "comment": "국내 원외처방액 1위(로수젯, 아모잘탄). 북경한미 소아과 약품 고성장과 MASH(비알코올성지방간염) 혁신신약 임상 파이프라인"
            },
            {
                "name": "대웅제약",
                "code": "069620",
                "marketCap": "1조 6,500억",
                "revenue": "1조 4,000억",
                "operatingProfit": "1,450억",
                "opMargin": 10.4,
                "per": 15,
                "pbr": 2.1,
                "debtRatio": 95,
                "currentRatio": 145,
                "riskStatus": "SAFE",
                "dividendYield": 0.8,
                "payoutRatio": 15,
                "comment": "보툴리눔 톡신 나보타(미국명 주보) 미국 시장 점유율 13% 돌파 및 위식도역류질환 신약 펙수클루 글로벌 수출 확대"
            }
        ]
    },
    {
        "id": "medtech",
        "chapterId": 5,
        "chapterName": "5. 바이오·제약·헬스케어",
        "sector": "의료기기·뷰티테크 (홈 뷰티기기 & 미용의료기기)",
        "subTitle": "에이지알(AGE-R) 홈 뷰티 디바이스 미국·일본 수출 폭증 및 고마진 미용 의료기기 소모품 OPM 25% 달성",
        "icon": "sparkle",
        "description": "피부과 시술용 고주파/초음파 미용의료기기와 가정용 홈 뷰티 디바이스가 미국, 일본, 유럽에서 대흥행하며 소프트웨어에 준하는 고영업이익률을 달성하는 K-의료기기 산업.",
        "relatedStocks": "에이피알, 클래시스, 휴젤, 파마리서치",
        "correlationLogic": {
            "formula": "미국/일본 뷰티 디바이스 수출 급증 + 고마진 카트리지 소모품 반복 매출 ➔ OPM 25~35% 초고수익 달성",
            "details": [
                "1단계: 에이피알은 메디큐브 부스터 프로 등 가정용 홈 뷰티 디바이스를 미국 아마존과 틱톡 마케팅을 통해 수출 대박을 터뜨렸습니다.",
                "2단계: 클래시스(슈링크, 볼뉴머)와 파마리서치(리쥬란)는 기기 판매 후 시술할 때마다 필수 교체되는 일회용 소모품(카트리지/원액) 마진율이 70%에 달해 반복 매출이 발생합니다.",
                "3단계: K-뷰티 브랜드 파워와 결합되어 미국, 유럽, 브라질 등 글로벌 시장으로 판로가 뻗어 나가며 계절성 없는 성장을 누립니다."
            ],
            "sensitivity": "뷰티 디바이스 수출 10만 대 증가 시 에이피알 분기 영업이익 약 +150억 원 증가. 미용 소모품 매출 비중 10%p 상승 시 전사 OPM 약 +3%p 개선.",
            "currentStatus": "미국 블랙프라이데이 및 아마존 뷰티 디바이스 1위 석권과 미용 소모품 수출 호조로 연간 영업이익 50% 이상 급성장 지속.",
            "outlookSignal": {
                "level": "POSITIVE",
                "badgeText": "🟢 폭발적 성장 (홈 뷰티 & 글로벌 수출)",
                "summary": "에이피알의 뷰티 디바이스 북미/일본 침투와 클래시스·파마리서치의 고마진 소모품 반복 매출로 K-의료기기 기업들의 OPM 25~30%대 폭발적 성장 지속."
            }
        },
        "indicators": [
            {
                "name": "관세청 피부미용기기 및 전자기기 월별 수출액",
                "role": "홈 뷰티 디바이스 및 레이저/초음파 미용기기 수출 통계",
                "impact": "미국향 수출 증가율 40% 상회 시 주가 랠리 지속",
                "sourceName": "관세청 수출입무역통계",
                "sourceUrl": "https://unipass.customs.go.kr/"
            },
            {
                "name": "미국 아마존 뷰티 디바이스 베스트셀러 랭킹",
                "role": "메디큐브 등 K-뷰티 디바이스 글로벌 실시간 인기 측정",
                "impact": "랭킹 1위 유지 시 분기 실적 서프라이즈 직결",
                "sourceName": "Amazon Best Sellers",
                "sourceUrl": "https://www.amazon.com/"
            }
        ],
        "companies": [
            {
                "name": "에이피알",
                "code": "278470",
                "marketCap": "2조 2,000억",
                "revenue": "6,800억",
                "operatingProfit": "1,450억",
                "opMargin": 21.3,
                "per": 17.5,
                "pbr": 4.8,
                "debtRatio": 35,
                "currentRatio": 290,
                "riskStatus": "SAFE",
                "dividendYield": 1,
                "payoutRatio": 20,
                "comment": "메디큐브 에이지알(AGE-R) 뷰티 디바이스 글로벌 대흥행. 미국·일본 오프라인 입점 가속화로 글로벌 뷰티테크 1위 등극"
            },
            {
                "name": "클래시스",
                "code": "214150",
                "marketCap": "3조 5,000억",
                "revenue": "2,400억",
                "operatingProfit": "1,250억",
                "opMargin": 52.1,
                "per": 32,
                "pbr": 9.5,
                "debtRatio": 18,
                "currentRatio": 350,
                "riskStatus": "SAFE",
                "dividendYield": 0.8,
                "payoutRatio": 25,
                "comment": "HIFU 리프팅 슈링크 및 볼뉴머 제조사. OPM 52%에 달하는 경이로운 고수익 소모품(카트리지) 비중 55% 돌파"
            },
            {
                "name": "파마리서치",
                "code": "214450",
                "marketCap": "2조 1,000억",
                "revenue": "3,200억",
                "operatingProfit": "1,150억",
                "opMargin": 35.9,
                "per": 24,
                "pbr": 4.5,
                "debtRatio": 20,
                "currentRatio": 420,
                "riskStatus": "SAFE",
                "dividendYield": 1.2,
                "payoutRatio": 25,
                "comment": "연어 DNA 추출 DOT PDRN 기반 리쥬란 힐러 및 콘쥬란 관절강 주사. 동남아 및 일본 외국인 관광객 피부과 필수 시술 안착"
            }
        ]
    },
    {
        "id": "food",
        "chapterId": 6,
        "chapterName": "6. 소비재·유통·식품",
        "sector": "식음료 (K-푸드 수출 & 곡물가 안정)",
        "subTitle": "국제 곡물가(소맥/대두/원당) 하락에 따른 매출원가율 4%p 개선 및 K-라면·스낵 글로벌 수출 폭증",
        "icon": "utensils",
        "description": "소맥·원당·대두 등 수입 원재료 가격 안정과 원/달러 환율 진정에 따른 마진 스프레드 확대 및 불닭볶음면, 냉동김밥 등 전 세계 K-푸드 열풍을 누리는 수출 소비재 산업.",
        "relatedStocks": "CJ제일제당, 삼양식품, 농심, 오리온, 대상, 오뚜기",
        "correlationLogic": {
            "formula": "원/달러 환율 하향 안정 + 국제 곡물가(소맥/대두) 하락 ➔ 원재료 수입단가 급감 ➔ 과거 인상된 판가 유지로 마진 스프레드 극대화 ➔ OPM 15~20% 달성",
            "details": [
                "1단계: 국내 음식료 기업은 소맥(밀가루), 대두(대두유), 옥수수(전분당), 원당(설탕)의 80% 이상을 미국·남미에서 달러 결제로 수입하므로 곡물가 하락 시 3~6개월 후 투입원가가 급감합니다.",
                "2단계: 과거 인플레이션 시기에 인상했던 국내외 소비자가격(판가)은 하향 조정되지 않으므로, 원가 하락분이 고스란히 기업의 스프레드(판가-원가) 마진 확대로 연결됩니다.",
                "3단계: 삼양식품(불닭볶음면)처럼 해외 수출 비중이 75%를 넘어서는 기업은 환율 효과와 글로벌 유통 채널(월마트, 코스트코) 침투로 OPM 20%대를 달성합니다."
            ],
            "sensitivity": "국제 곡물가 10% 하락 시 음식료 업종 전반의 OPM 약 +1.5%p~2.2%p 상승. 삼양식품 해외 매출 10% 증가 시 영업이익 약 +350억 원 증가.",
            "currentStatus": "CBOT 소맥·옥수수 선물이 연중 최저점 부근에서 안정세를 유지하고 있으며, 미국·유럽·동남아 수출액이 매월 역대 최고치를 경신.",
            "outlookSignal": {
                "level": "POSITIVE",
                "badgeText": "🟢 강력 호전 (곡물가 하락 & K-푸드)",
                "summary": "원재료 투입원가 하락에 따른 마진 개선과 불닭볶음면, 냉동김밥 등 K-푸드의 글로벌 수출 폭증이 결합되어 음식료 업종 사상 최대 영업이익 랠리 지속."
            }
        },
        "indicators": [
            {
                "name": "CBOT 시카고상품거래소 소맥/대두/옥수수 선물 가격",
                "role": "음식료 원재료 수입단가의 3~6개월 선행 지표",
                "impact": "곡물가 하락 시 2~3분기 후 투입원가율 급감 확정",
                "sourceName": "CME Group CBOT",
                "sourceUrl": "https://www.cmegroup.com/"
            },
            {
                "name": "관세청 라면 및 과자류 국가별 월별 수출액",
                "role": "K-푸드 수출액 및 국가별(미국, 중국, 유럽) 수출 성장률",
                "impact": "월간 라면 수출 1억 달러 돌파 시 실적 서프라이즈",
                "sourceName": "관세청 수출입무역통계",
                "sourceUrl": "https://unipass.customs.go.kr/"
            }
        ],
        "companies": [
            {
                "name": "삼양식품",
                "code": "003230",
                "marketCap": "4조 5,000억",
                "revenue": "1조 6,500억",
                "operatingProfit": "3,400억",
                "opMargin": 20.6,
                "per": 15,
                "pbr": 4.8,
                "debtRatio": 75,
                "currentRatio": 185,
                "riskStatus": "SAFE",
                "dividendYield": 0.8,
                "payoutRatio": 15,
                "comment": "불닭볶음면 신화. 해외 수출 비중 78% 및 밀양 2공장 증설로 글로벌 수요 대응. OPM 20% 돌파"
            },
            {
                "name": "CJ제일제당",
                "code": "097950",
                "marketCap": "4조 8,000억",
                "revenue": "29조 원",
                "operatingProfit": "1조 5,500억",
                "opMargin": 5.3,
                "per": 8.5,
                "pbr": 0.65,
                "debtRatio": 145,
                "currentRatio": 110,
                "riskStatus": "SAFE",
                "dividendYield": 2.2,
                "payoutRatio": 20,
                "comment": "국내 1위 종합식품사. 비비고 글로벌 만두/K-스트리트푸드 안착과 바이오 아미노산 시황 바닥 반등"
            },
            {
                "name": "오리온",
                "code": "271560",
                "marketCap": "3조 8,000억",
                "revenue": "3조 1,000억",
                "operatingProfit": "5,200억",
                "opMargin": 16.8,
                "per": 10.2,
                "pbr": 1.35,
                "debtRatio": 25,
                "currentRatio": 260,
                "riskStatus": "SAFE",
                "dividendYield": 2.2,
                "payoutRatio": 25,
                "comment": "초코파이 및 파이·스낵 강자. 중국·베트남·러시아 현지 법인의 높은 영업이익률과 순현금 1조 원 보유"
            }
        ]
    },
    {
        "id": "fishery",
        "chapterId": 6,
        "chapterName": "6. 소비재·유통·식품",
        "sector": "원양어업·수산가공 (유가 하락 & 참치 어획량 회복)",
        "subTitle": "국제 유가(선박 벙커C유) 하락에 따른 선박 운항 기름원가 급감 및 태평양 참치 어획량 상승",
        "icon": "fish",
        "description": "태평양 참치 선망선단을 운영하여 횟감 및 통조림용 참치를 어획·가공하며, 선박 벙커C유 유류비 원가와 글로벌 참치 어가(방콕 참치 시세)가 수익성을 결정하는 수산 식품 산업.",
        "relatedStocks": "동원산업, 사조산업, 신라교역, 사조씨푸드",
        "correlationLogic": {
            "formula": "국제 유가 하락 ➔ 원양어선 선박 벙커C유 기름원가 15~20% 급감 + 참치 어획량 회복 ➔ 수산 부문 매출원가율 6%p 개선으로 분기 실적 급증",
            "details": [
                "1단계: 원양어선 운항 원가의 30~40%는 선박용 벙커C유 및 디젤 유류비이므로, 국제유가 하락 시 출어 경비가 즉각적으로 대폭 절감됩니다.",
                "2단계: 엘니뇨/라니냐 기상 여건 안정화로 중서부 태평양 수온이 정상화되며 주력 선망선의 참치(가다랑어) 어획량이 전년 대비 15% 이상 반등합니다.",
                "3단계: 태국 방콕(Bangkok) 참치 통조림 원어 시세가 톤당 1,500~1,700달러 선에서 견고하게 유지되어 판매 단가와 어획량이 동반 상승합니다."
            ],
            "sensitivity": "벙커C유 가격 10% 하락 시 동원산업 연간 선박 유류비 약 +180억~250억 원 절감. 참치 어가 톤당 100달러 상승 시 원양 부문 영업이익 약 +80억 원 증가.",
            "currentStatus": "국제유가 안정세에 따른 유류비 부담 완화와 참치 통조림 글로벌 소비 수요 견조로 4분기 실적 개선 뚜렷.",
            "outlookSignal": {
                "level": "POSITIVE",
                "badgeText": "🟢 실적 개선 (유가 하락 & 어업량 회복)",
                "summary": "원양어선의 최대 원가 항목인 벙커C유 가격 안정화로 출어 원가가 급감하였으며, 참치 어획량 회복과 결합되어 수산·식품 부문 실적 턴어라운드 전망."
            }
        },
        "indicators": [
            {
                "name": "태국 방콕(Bangkok) 가다랑어 참치 시세 (톤당 달러)",
                "role": "글로벌 원양 참치 통조림 원어 기준 가격",
                "impact": "톤당 1,600달러 이상 유지 시 원양어업 부문 마진 극대화",
                "sourceName": "ATFIS 식품산업통계정보",
                "sourceUrl": "https://www.atfis.or.kr/"
            },
            {
                "name": "싱가포르 선박용 벙커C유(IFO380/VLSFO) 가격",
                "role": "원양어선 출어 운항 원가의 35%를 차지하는 핵심 비용",
                "impact": "벙커C유 가격 하락 시 원양사 영업이익 즉각 개선",
                "sourceName": "한국석유공사 페트로넷",
                "sourceUrl": "https://www.petronet.co.kr/"
            }
        ],
        "companies": [
            {
                "name": "동원산업",
                "code": "006040",
                "marketCap": "1조 6,500억",
                "revenue": "9조 1,000억",
                "operatingProfit": "5,200억",
                "opMargin": 5.7,
                "per": 7.2,
                "pbr": 0.62,
                "debtRatio": 135,
                "currentRatio": 110,
                "riskStatus": "SAFE",
                "dividendYield": 3.5,
                "payoutRatio": 25,
                "comment": "동원그룹 지주사이자 세계 최대 원양어업 선단 보유. 동원F&B, 미국 스타키스트(참치캔 1위) 지분 가치 보유"
            },
            {
                "name": "사조산업",
                "code": "007160",
                "marketCap": "3,800억",
                "revenue": "6,500억",
                "operatingProfit": "420억",
                "opMargin": 6.5,
                "per": 6.8,
                "pbr": 0.45,
                "debtRatio": 75,
                "currentRatio": 145,
                "riskStatus": "SAFE",
                "dividendYield": 2.2,
                "payoutRatio": 15,
                "comment": "참치 원양어업 및 수산물 가공 유통사. 유류비 절감 수혜 및 캐슬렉스 골프장 등 막대한 부동산 자산 가치 보유"
            }
        ]
    },
    {
        "id": "garment",
        "chapterId": 6,
        "chapterName": "6. 소비재·유통·식품",
        "sector": "의류·봉제(OEM) (환율 수혜 & 바이어 재고비축)",
        "subTitle": "원/달러 고환율(1,350원대) 수출 마진 극대화 및 미국 패션 바이어 재고 재비축(Restocking) 오더 증가",
        "icon": "shirt",
        "description": "글로벌 유명 스포츠·아웃도어 브랜드(노스페이스, 룰루레몬, 나이키, 갭)의 주문을 받아 방글라데시, 베트남 등 동남아 공장에서 100% 달러 결제로 수출하는 의류 봉제 OEM 산업.",
        "relatedStocks": "영원무역, 한세실업, 제이에스코퍼레이션, 화승엔터프라이즈",
        "correlationLogic": {
            "formula": "원/달러 환율 강세(고환율 유지) + 미국 바이어 의류 재고 정상화 ➔ 달러 결제 수출 마진 상승 + OEM 가동률 95% 회복 ➔ OPM 12~16% 달성",
            "details": [
                "1단계: 의류·봉제 OEM 기업은 수주 대금을 100% 미 달러로 결제받으므로, 원/달러 고환율(1,350원대)이 유지될 때 원화 환산 영업이익이 큰 폭으로 증가합니다.",
                "2단계: 반면 원화 환율이 급격히 강세(원/달러 1,200원대 급락)를 보일 경우 동일한 달러 매출에도 원화 환산 마진이 축소되는 환율 민감도를 지닙니다.",
                "3단계: 미국 의류 소매업체들의 재고 조정이 완료되어 2025~2026년 F/W 신규 발주량이 전년 대비 8% 이상 반등하며 공장 가동률이 풀가동되었습니다."
            ],
            "sensitivity": "원/달러 환율 10원 상승 시 영원무역 연간 영업이익 약 +120억 원 증가. OEM 오더 5% 증가 시 공장 레버리지로 OPM +1.2%p 상승.",
            "currentStatus": "미국 바이어의 재고 재비축(Restocking) 사이클과 원/달러 고환율 수혜로 방글라데시·베트남 공장 가동률 풀가동 호실적 기록.",
            "outlookSignal": {
                "level": "POSITIVE",
                "badgeText": "🟢 강력 호전 (바이어 재고비축 & 고환율)",
                "summary": "미국 고객사의 재고 소진 후 신규 오더 재개와 고환율 수혜로 영원무역, 한세실업의 실적이 크게 호전 중입니다. 순현금 우량 재무구조와 저PBR 매력."
            }
        },
        "indicators": [
            {
                "name": "미국 연준(FRED) 의류 소매업체 재고대비판매 비율",
                "role": "미국 바이어의 의류 재고 소진 및 OEM 추가 발주 판단 기준",
                "impact": "재고비율 2.0 이하 하락 시 대규모 신규 발주 사이클 도래",
                "sourceName": "FRED 세인트루이스 연준",
                "sourceUrl": "https://fred.stlouisfed.org/"
            },
            {
                "name": "원/달러 환율 및 뉴욕 ICE 면화(Cotton) 선물 가격",
                "role": "원단 제조 원가 및 OEM 수주 환산 마진 결정",
                "impact": "원/달러 1,350원 유지 및 면화 가격 안정 시 OEM 마진 극대화",
                "sourceName": "ICE Futures U.S.",
                "sourceUrl": "https://www.theice.com/"
            }
        ],
        "companies": [
            {
                "name": "영원무역",
                "code": "111110",
                "marketCap": "2조 1,000억",
                "revenue": "3조 8,000억",
                "operatingProfit": "5,800억",
                "opMargin": 15.3,
                "per": 4.8,
                "pbr": 0.55,
                "debtRatio": 35,
                "currentRatio": 320,
                "riskStatus": "SAFE",
                "dividendYield": 3.5,
                "payoutRatio": 18,
                "comment": "글로벌 아웃도어 OEM 1위(노스페이스, 룰루레몬). 방글라데시 압도적 원가 경쟁력과 스위스 스캇 자전거 보유. 순현금 1조 원"
            },
            {
                "name": "한세실업",
                "code": "105630",
                "marketCap": "7,800억",
                "revenue": "1조 8,500억",
                "operatingProfit": "1,650억",
                "opMargin": 8.9,
                "per": 5.5,
                "pbr": 0.85,
                "debtRatio": 65,
                "currentRatio": 185,
                "riskStatus": "SAFE",
                "dividendYield": 3.8,
                "payoutRatio": 25,
                "comment": "미국 의류 OEM 강자(갭, 아베크롬비, 타깃). 과테말라 수직계열화 스마트공장 가동으로 납기 단축 및 바이어 점유율 확대"
            },
            {
                "name": "제이에스코퍼레이션",
                "code": "194370",
                "marketCap": "2,600억",
                "revenue": "8,200억",
                "operatingProfit": "950억",
                "opMargin": 11.6,
                "per": 3.8,
                "pbr": 0.75,
                "debtRatio": 45,
                "currentRatio": 210,
                "riskStatus": "SAFE",
                "dividendYield": 5.5,
                "payoutRatio": 25,
                "comment": "글로벌 명품 핸드백(마이클코어스, 코치) 및 의류 OEM. OPM 11%대의 탄탄한 수익성과 5%대 고배당주"
            }
        ]
    },
    {
        "id": "fashion",
        "chapterId": 6,
        "chapterName": "6. 소비재·유통·식품",
        "sector": "패션·브랜드 (라이선스 패션 & 글로벌 매장 확장)",
        "subTitle": "MLB, 디스커버리의 중국 및 동남아 매장 1,100개 출점과 프리미엄 아웃도어 고수익",
        "icon": "tag",
        "description": "글로벌 라이선스 IP(MLB, 디스커버리)를 발굴하여 중국, 동남아 등 아시아 시장으로 직수출하며 패션업계 최고 수준의 영업이익률(20% 이상)을 창출하는 브랜드 패션 산업.",
        "relatedStocks": "F&F, 한섬, LF, 신세계인터내셔날",
        "correlationLogic": {
            "formula": "중국/동남아 오프라인 매장 순증 + 해외 소비심리 회복 ➔ 라이선스 의류 직수출 마진 극대화 ➔ OPM 20~24% 고마진 창출",
            "details": [
                "1단계: F&F는 MLB 브랜드를 중국 본토에 1,100개 이상의 매장으로 대리상 출점시키며 단일 브랜드로 중국에서만 연간 1.5조 원 이상의 리테일 매출을 달성했습니다.",
                "2단계: 내수 패션 시장 침체기에도 탄탄한 해외 캐시카우를 통해 재고 할인율을 엄격히 통제하며 브랜드 가치를 보존합니다.",
                "3단계: 무차입에 가까운 탄탄한 재무구조와 연간 4,000억 원 이상의 영업활동 현금흐름을 바탕으로 신규 글로벌 IP 인수를 추진합니다."
            ],
            "sensitivity": "중국 MLB 매장 100개 순증 시 F&F 연간 영업이익 약 +300억 원 증가. 국내 백화점 의류 판매 5% 증가 시 한섬 OPM 약 +1.0%p 상승.",
            "currentStatus": "중국의 경기 부양책과 동남아(베트남, 태국) 매장 출점 가속화로 글로벌 패션 기업으로서의 현금창출력 유지.",
            "outlookSignal": {
                "level": "POSITIVE",
                "badgeText": "🟢 견조한 호전 (해외 매장 확장 & 고마진)",
                "summary": "MLB의 중국 매장 1,100개 안착과 동남아 시장 확대로 OPM 24%대의 독보적 수익성을 유지하고 있습니다. PER 6배대 저평가 매력."
            }
        },
        "indicators": [
            {
                "name": "산업통상자원부 백화점 패션부문 매출 증감률",
                "role": "국내 고소득층 프리미엄 의류 소비 동향 선행 지표",
                "impact": "명품/여성정장 매출 플러스 반등 시 패션주 마진 개선",
                "sourceName": "산업통상자원부",
                "sourceUrl": "https://www.motie.go.kr/"
            },
            {
                "name": "중국 사회소비품 소매총액 (중국 국가통계국)",
                "role": "중국 내수 패션/소비재 시장 구매력 측정",
                "impact": "중국 소비 증가율 반등 시 F&F 중국 법인 매출 급증",
                "sourceName": "중국 국가통계국",
                "sourceUrl": "http://www.stats.gov.cn/"
            }
        ],
        "companies": [
            {
                "name": "F&F",
                "code": "383220",
                "marketCap": "2조 4,000억",
                "revenue": "2조 원",
                "operatingProfit": "4,800억",
                "opMargin": 24,
                "per": 6.8,
                "pbr": 1.45,
                "debtRatio": 30,
                "currentRatio": 240,
                "riskStatus": "SAFE",
                "dividendYield": 2.5,
                "payoutRatio": 20,
                "comment": "MLB, 디스커버리 라이선스 브랜드 최강자. 중국 내 1,100개 매장 기반 OPM 24%의 경이로운 수익성과 해외 확장"
            },
            {
                "name": "한섬",
                "code": "020000",
                "marketCap": "4,500억",
                "revenue": "1조 5,000억",
                "operatingProfit": "1,100억",
                "opMargin": 7.3,
                "per": 5.5,
                "pbr": 0.32,
                "debtRatio": 25,
                "currentRatio": 310,
                "riskStatus": "SAFE",
                "dividendYield": 4.8,
                "payoutRatio": 30,
                "comment": "현대백화점그룹 프리미엄 여성복(타임, 마인, 시스템). PBR 0.32배 극저평가 및 순현금 5,000억 원 보유"
            }
        ]
    },
    {
        "id": "beauty",
        "chapterId": 6,
        "chapterName": "6. 소비재·유통·식품",
        "sector": "화장품·ODM (미국 아마존 인디 뷰티 & 선크림)",
        "subTitle": "중국 짝사랑 탈피, 미국 아마존 선크림 싹쓸이 및 글로벌 인디 뷰티 ODM 제조 독점",
        "icon": "sparkles",
        "description": "중국 단일 시장 의존도를 벗어나 미국, 유럽, 일본의 글로벌 인디 뷰티(조선미녀, 아누아, 코스알엑스) 열풍과 위탁생산(ODM) 제조를 독점하여 사상 최대 실적을 경신 중인 화장품 산업.",
        "relatedStocks": "한국콜마, 코스맥스, 실리콘투, 아모레퍼시픽, 에이피알",
        "correlationLogic": {
            "formula": "미국/일본 인디 브랜드 선크림·스킨케어 수출 폭증 ➔ ODM(한국콜마/코스맥스) 생산 CAPA 100% 풀가동 + 실리콘투 글로벌 유통 ➔ 영업이익 50~100% 폭발",
            "details": [
                "1단계: K-뷰티의 축이 대기업 브랜드에서 가성비와 클린뷰티를 앞세운 중소형 인디 브랜드로 완전히 교체되었습니다.",
                "2단계: 인디 브랜드들은 자체 공장이 없어 제조의 90% 이상을 한국콜마, 코스맥스 등 글로벌 탑티어 ODM사에 전량 위탁 생산합니다.",
                "3단계: 실리콘투는 K-뷰티 인디 브랜드들을 매입하여 전 세계 150여 개국에 B2B로 독점 유통하며 OPM 22%의 고수익을 달성하고 있습니다."
            ],
            "sensitivity": "미국향 화장품 수출 10% 증가 시 한국콜마/코스맥스 영업이익 약 +250억 원 증가. 실리콘투 유통 브랜드 수 확대 시 분기 매출 30% 레버리지.",
            "currentStatus": "미국 아마존 선크림 카테고리 1~5위를 K-선크림이 싹쓸이하며 글로벌 화장품 수출액 역대 최고치 경신 중.",
            "outlookSignal": {
                "level": "POSITIVE",
                "badgeText": "🟢 폭발적 성장 (미국 인디뷰티 & ODM)",
                "summary": "중국을 벗어나 미국·유럽·일본으로 수출 영토가 완전히 재편되었습니다. 한국콜마, 코스맥스 등 ODM 제조사와 실리콘투의 실적 퀀텀점프 지속."
            }
        },
        "indicators": [
            {
                "name": "관세청 화장품 국가별(미국/일본/유럽) 수출 실적 통계",
                "role": "K-뷰티의 비중국 서구권 수출 비중 및 성장률",
                "impact": "미국향 화장품 수출 증가율 50% 돌파 시 주가 랠리 지속",
                "sourceName": "관세청 수출입무역통계",
                "sourceUrl": "https://unipass.customs.go.kr/"
            },
            {
                "name": "미국 아마존 뷰티 베스트셀러 순위 (Amazon Best Sellers)",
                "role": "조선미녀, 아누아 등 K-뷰티 인디 브랜드의 미국 실시간 흥행 지표",
                "impact": "TOP 10 내 K-뷰티 5개 이상 진입 시 ODM 주문 폭증",
                "sourceName": "Amazon Best Sellers",
                "sourceUrl": "https://www.amazon.com/"
            }
        ],
        "companies": [
            {
                "name": "한국콜마",
                "code": "161890",
                "marketCap": "1조 7,500억",
                "revenue": "2조 5,500억",
                "operatingProfit": "2,100억",
                "opMargin": 8.2,
                "per": 15,
                "pbr": 2.1,
                "debtRatio": 125,
                "currentRatio": 135,
                "riskStatus": "SAFE",
                "dividendYield": 1.2,
                "payoutRatio": 18,
                "comment": "글로벌 선크림 ODM 독점적 1위. 미국 인디 브랜드향 선크림 수주 폭증 및 북미 제2공장 가동 효과로 사상 최대 실적"
            },
            {
                "name": "코스맥스",
                "code": "192820",
                "marketCap": "1조 6,000억",
                "revenue": "2조 2,000억",
                "operatingProfit": "1,800억",
                "opMargin": 8.2,
                "per": 13.5,
                "pbr": 2.45,
                "debtRatio": 175,
                "currentRatio": 110,
                "riskStatus": "SAFE",
                "dividendYield": 1.5,
                "payoutRatio": 20,
                "comment": "세계 1위 화장품 ODM사. 국내 인디 브랜드 글로벌 수출 급증 및 중국·동남아·미국 법인 동반 흑자 달성"
            },
            {
                "name": "실리콘투",
                "code": "257720",
                "marketCap": "2조 8,000억",
                "revenue": "7,500억",
                "operatingProfit": "1,650억",
                "opMargin": 22,
                "per": 18,
                "pbr": 5.5,
                "debtRatio": 25,
                "currentRatio": 380,
                "riskStatus": "SAFE",
                "dividendYield": 0.8,
                "payoutRatio": 15,
                "comment": "K-뷰티 글로벌 B2B 유통 플랫폼(Stylekorean) 1위. 전 세계 풀필먼트 거점을 통해 인디 브랜드를 직수출하며 OPM 22% 달성"
            }
        ]
    },
    {
        "id": "retail_off",
        "chapterId": 6,
        "chapterName": "6. 소비재·유통·식품",
        "sector": "오프라인 유통 (백화점 VIP & 편의점 PB)",
        "subTitle": "스타필드 마켓 그로서리 리뉴얼, 백화점 명품·F&B 집객 및 편의점 PB 디저트 강세",
        "icon": "shopping-bag",
        "description": "이커머스 침투에 맞서 신선식품 체험형 매장으로 체질을 바꾼 대형마트와 상위 1% VIP 명품 매출의 백화점, 1인 가구 필수 거점이 된 편의점을 아우르는 오프라인 유통 산업.",
        "relatedStocks": "이마트, 롯데쇼핑, 현대백화점, BGF리테일, GS리테일",
        "correlationLogic": {
            "formula": "오프라인 점포 그로서리 리뉴얼 + 비핵심 자회사 매각 ➔ 기존점 성장률(SSSG) 플러스 반등 ➔ 고정비 레버리지로 흑자 확대",
            "details": [
                "1단계: 이마트는 공산품 매장을 줄이고 즉석조리 및 신선식품 중심의 [스타필드 마켓]으로 리뉴얼하여 오프라인 매장 방문객 수를 10% 이상 끌어올렸습니다.",
                "2단계: 백화점은 온라인이 대체할 수 없는 VIP 라운지와 팝업스토어, 파인다이닝 F&B를 유치하여 객단가를 방어합니다.",
                "3단계: 편의점(CU, GS25)은 PB 연세우유 크림빵, 픽업 서비스 등 생활 거점 인프라로 불황기에도 안정적인 이익을 창출합니다."
            ],
            "sensitivity": "대형마트 기존점 성장률 1%p 상승 시 연간 영업이익 약 +350억 원 증가. 편의점 신규 점포 1,000개 순증 시 연매출 약 +4,000억 원 추가.",
            "currentStatus": "이마트의 자회사(신세계건설) 부실 리스크 차단과 희망퇴직 완료로 불확실성이 해소되었으며, PBR 0.2배 수준의 극저평가 탈출 조짐.",
            "outlookSignal": {
                "level": "POSITIVE",
                "badgeText": "🟢 구조조정 완료 (그로서리 반등)",
                "summary": "수년간 이어진 오프라인 구조조정과 점포 리뉴얼 효과가 나타나며 기존점 매출이 턴어라운드 중입니다. PBR 0.2~0.3배 극저평가 매력."
            }
        },
        "indicators": [
            {
                "name": "산업통상자원부 주요 유통업체 매출 동향 통계",
                "role": "백화점, 대형마트, 편의점의 월별 매출 증감률",
                "impact": "오프라인 매출 플러스 반등 시 유통주 투자심리 개선",
                "sourceName": "산업통상자원부",
                "sourceUrl": "https://www.motie.go.kr/"
            },
            {
                "name": "통계청 소비자심리지수(CCSI)",
                "role": "내수 소비 및 오프라인 매장 장바구니 구매력 측정",
                "impact": "소비심리 100 상회 시 백화점/대형마트 객단가 상승",
                "sourceName": "통계청 KOSIS",
                "sourceUrl": "https://kosis.kr/"
            }
        ],
        "companies": [
            {
                "name": "이마트",
                "code": "139480",
                "marketCap": "1조 8,500억",
                "revenue": "29조 5,000억",
                "operatingProfit": "1,450억",
                "opMargin": 0.5,
                "per": 15,
                "pbr": 0.18,
                "debtRatio": 145,
                "currentRatio": 75,
                "riskStatus": "SAFE",
                "dividendYield": 3.2,
                "payoutRatio": 30,
                "comment": "국내 1위 대형마트. 신세계건설 자발적 상장폐지로 리스크 완전 차단 및 스타필드 마켓 리뉴얼로 본업 턴어라운드"
            },
            {
                "name": "롯데쇼핑",
                "code": "023530",
                "marketCap": "1조 9,000억",
                "revenue": "14조 2,000억",
                "operatingProfit": "5,500억",
                "opMargin": 3.9,
                "per": 7.5,
                "pbr": 0.22,
                "debtRatio": 165,
                "currentRatio": 85,
                "riskStatus": "SAFE",
                "dividendYield": 5.5,
                "payoutRatio": 40,
                "comment": "백화점, 마트, 슈퍼의 통합 소싱 효과로 OPM 4% 육박. PBR 0.22배 극저평가 및 5%대 안정적 고배당"
            },
            {
                "name": "BGF리테일",
                "code": "282330",
                "marketCap": "2조 원",
                "revenue": "8조 8,000억",
                "operatingProfit": "2,650억",
                "opMargin": 3,
                "per": 11.5,
                "pbr": 1.85,
                "debtRatio": 185,
                "currentRatio": 70,
                "riskStatus": "SAFE",
                "dividendYield": 3.8,
                "payoutRatio": 35,
                "comment": "편의점 CU 운영. PB 연세우유 크림빵 등 메가히트 상품과 몽골·카자흐스탄 등 해외 K-편의점 수출 확장"
            }
        ]
    },
    {
        "id": "ecommerce",
        "chapterId": 6,
        "chapterName": "6. 소비재·유통·식품",
        "sector": "온라인 유통·이커머스 (로켓배송 & 풀필먼트 독점)",
        "subTitle": "티메프 사태 이후 쿠팡 중심 승자독식 가속화 및 로켓와우 멤버십 수익화와 대만 해외 확장",
        "icon": "shopping-cart",
        "description": "전국 100% 익일배송 로켓배송 풀필먼트 네트워크를 완성하여 국내 이커머스 시장을 평정한 쿠팡과 네이버 쇼핑 플랫폼 중심의 디지털 커머스 산업.",
        "relatedStocks": "쿠팡(NYSE: CPNG), NAVER, 카카오스타일, 카페24",
        "correlationLogic": {
            "formula": "로켓와우 멤버십 락인 + 대만 등 해외 풀필먼트 확장 ➔ 활성고객당 매출(ARPU) 상승 ➔ OPM 3~5% 지속 및 연간 잉여현금흐름(FCF) 2조 원 창출",
            "details": [
                "1단계: 수조 원을 투자한 자체 물류센터와 직고용 배송 인력(쿠팡친구)을 통해 전국 100% 당일/익일 로켓배송망을 구축하여 진입장벽을 완성했습니다.",
                "2단계: 티몬·위메프 정산 지연 사태 이후 셀러(판매자)와 소비자가 신뢰할 수 있는 1등 플랫폼으로 수급이 쏠리는 승자독식(Winner-Takes-All)이 가속화되었습니다.",
                "3단계: 로켓프레시(신선식품), 쿠팡이츠(배달앱), 쿠팡플레이(OTT)를 결합한 와우 멤버십 생태계로 고객 이탈률을 제로에 가깝게 유지합니다."
            ],
            "sensitivity": "와우 멤버십 월회비 2,900원 인상 시 쿠팡 연간 추가 영업이익 약 +4,000억 원 증가. 활성고객 100만 명 증가 시 연매출 약 +1.5조 원 추가.",
            "currentStatus": "국내 유통시장 점유율 독점적 확대 및 대만 로켓배송의 폭발적 성장으로 분기 매출 10조 원 및 연간 흑자 구조 완벽 안착.",
            "outlookSignal": {
                "level": "POSITIVE",
                "badgeText": "🟢 독점적 호전 (승자독식 & 흑자)",
                "summary": "티메프 사태 이후 국내 이커머스 시장 지배력이 더욱 견고해졌으며, 멤버십 인상 효과와 대만 시장의 성공적 안착으로 압도적 현금창출력을 증명 중입니다."
            }
        },
        "indicators": [
            {
                "name": "온라인 쇼핑몰 카테고리별 거래액 (통계청 동향)",
                "role": "국내 전체 전자상거래 시장 성장률 및 침투율",
                "impact": "온라인 침투율 40% 도달 시 선두 플랫폼 과점 심화",
                "sourceName": "통계청 KOSIS",
                "sourceUrl": "https://kosis.kr/"
            },
            {
                "name": "쿠팡 분기 활성 고객수(Active Customers) 및 단가",
                "role": "쿠팡 실구매 고객 수 및 고객 1인당 분기 결제 금액",
                "impact": "활성고객 수 2,200만 명 돌파 시 전 국민 로켓생활권 완성",
                "sourceName": "SEC EDGAR Coupang 10-Q",
                "sourceUrl": "https://www.sec.gov/"
            }
        ],
        "companies": [
            {
                "name": "카페24",
                "code": "042000",
                "marketCap": "6,800억",
                "revenue": "3,200억",
                "operatingProfit": "320억",
                "opMargin": 10,
                "per": 24,
                "pbr": 3.5,
                "debtRatio": 45,
                "currentRatio": 180,
                "riskStatus": "SAFE",
                "dividendYield": 0,
                "payoutRatio": 0,
                "comment": "구글이 지분 투자한 글로벌 쇼핑몰 구축 플랫폼. 유튜브 쇼핑 전용 스토어 독점 출시로 GMV 폭발적 성장"
            }
        ]
    },
    {
        "id": "tobacco_liq",
        "chapterId": 6,
        "chapterName": "6. 소비재·유통·식품",
        "sector": "주류·담배 (전자담배 수출 & 판가 전가력)",
        "subTitle": "글로벌 전자담배(NGP) 수출 폭증, 판가 인상에 따른 원가 전가력 및 6%대 고배당과 자사주 소각",
        "icon": "wine",
        "description": "해외 궐련 및 차세대 전자담배(릴) 글로벌 수출 확대와 가격 탄력성이 극히 낮은 주류·담배의 독점적 가격 결정력을 바탕으로 6%대 안정적 배당을 지급하는 방어 소비재 산업.",
        "relatedStocks": "KT&G, 하이트진로, 롯데칠성",
        "correlationLogic": {
            "formula": "해외 전자담배(릴) 수출 급증 + 원자재가 상승분 판가 전가 ➔ OPM 20%대 고마진 유지 ➔ 연간 4,000억 원 자사주 소각 및 6%대 고배당",
            "details": [
                "1단계: 담배와 주류는 소비 가격 탄력성이 극히 낮아 원자재 가격이나 세금 인상분을 판가에 100% 전가할 수 있는 독점적 가격 결정권(Pricing Power)을 보유합니다.",
                "2단계: KT&G는 필립모리스(PMI)와의 15년 글로벌 장기 계약을 통해 차세대 전자담배를 전 세계 30개국 이상에 수출하며 구조적 성장 궤도에 진입했습니다.",
                "3단계: 부동산 개발 이익 및 막대한 순현금을 기반으로 매년 4,000억 원 규모 자사주 매입·소각과 주당배당금(DPS)을 지속 증액합니다."
            ],
            "sensitivity": "해외 담배 매출 10% 증가 시 KT&G 영업이익 약 +600억 원 증가. 소주 판가 10원 인상 시 하이트진로 연간 영업이익 약 +180억 원 증가.",
            "currentStatus": "해외 NGP 수출과 인도네시아·카자흐스탄 신공장 가동 효과로 분기 실적 호조 및 연간 4,000억 원 이상 자사주 소각 확정.",
            "outlookSignal": {
                "level": "POSITIVE",
                "badgeText": "🟢 강력 호전 (수출 성장 & 고배당)",
                "summary": "KT&G의 전자담배 글로벌 수출 호조와 3개년 밸류업 프로그램(자사주 소각 및 6%대 배당수익률)이 주가 상승을 강력히 견인하고 있습니다."
            }
        },
        "indicators": [
            {
                "name": "기획재정부 담배 시장 동향 (궐련 vs 전자담배 비중)",
                "role": "국내 담배 판매량 및 궐련형 전자담배(NGP) 침투율",
                "impact": "전자담배 비중 20% 돌파 시 스틱 마진율 개선",
                "sourceName": "기획재정부 보도자료",
                "sourceUrl": "https://www.moef.go.kr/"
            },
            {
                "name": "주정 및 맥아 수입 가격 (한국주류산업협회)",
                "role": "소주 주정 및 맥주 맥아 원재료 수입 단가",
                "impact": "주정 가격 안정 시 주류사 영업이익률 2%p 개선",
                "sourceName": "한국주류산업협회",
                "sourceUrl": "https://www.kalia.or.kr/"
            }
        ],
        "companies": [
            {
                "name": "KT&G",
                "code": "033780",
                "marketCap": "14조 5,000억",
                "revenue": "6조 1,000억",
                "operatingProfit": "1조 2,800억",
                "opMargin": 21,
                "per": 13.5,
                "pbr": 1.45,
                "debtRatio": 28,
                "currentRatio": 280,
                "riskStatus": "SAFE",
                "dividendYield": 5.5,
                "payoutRatio": 55,
                "comment": "국내 담배 1위. 해외 전자담배(릴) 및 궐련 수출 폭증, KGC인삼공사 보유. 연간 4,000억 원 자사주 소각과 반기배당 실시"
            },
            {
                "name": "하이트진로",
                "code": "000080",
                "marketCap": "1조 4,500억",
                "revenue": "2조 6,000억",
                "operatingProfit": "1,850억",
                "opMargin": 7.1,
                "per": 11,
                "pbr": 1.15,
                "debtRatio": 175,
                "currentRatio": 85,
                "riskStatus": "SAFE",
                "dividendYield": 4.8,
                "payoutRatio": 45,
                "comment": "참이슬 및 테라·켈리 보유. 판가 인상 효과 및 베트남 해외 생산공장 착공으로 글로벌 K-소주 수출 가속"
            }
        ]
    },
    {
        "id": "shipping",
        "chapterId": 7,
        "chapterName": "7. 금융·운송·엔터",
        "sector": "해운·컨테이너·벌크 (홍해 우회 & 고운임)",
        "subTitle": "홍해 지정학적 위기(희망봉 우회) 장기화에 따른 SCFI 2,000p 돌파 및 분기 영업이익 1조 원 회복",
        "icon": "ship",
        "description": "수에즈 운하 지정학적 리스크로 인한 희망봉 우회 항로 정착으로 글로벌 컨테이너선 공급 부족과 상하이컨테이너운임지수(SCFI) 급등의 수혜를 누리는 해상 운송 산업.",
        "relatedStocks": "HMM, 팬오션, 대한해운, KSS해운",
        "correlationLogic": {
            "formula": "홍해 지정학적 위기(희망봉 우회) + 글로벌 물동량 증가 ➔ SCFI 운임 2,000p 상회 유지 ➔ OPM 30~40% 서프라이즈 및 순현금 14조 원 축적",
            "details": [
                "1단계: 예멘 후티 반군의 상선 공격으로 아시아-유럽 선박들이 수에즈 운하 대신 아프리카 희망봉으로 12일 우회하면서 선복 공급이 15% 이상 감소했습니다.",
                "2단계: 선박 부족과 항만 적체로 컨테이너 해상 운임(SCFI)이 높은 수준을 유지하여 HMM의 분기 영업이익이 1조 원대를 회복했습니다.",
                "3단계: 벌크선사(팬오션)는 중국 철광석 수입량과 남미 곡물 수송 수요에 연동되는 BDI(발틱운임지수) 상승으로 안정적인 전용선 수익을 창출합니다."
            ],
            "sensitivity": "SCFI 100포인트 상승 시 HMM 연간 영업이익 약 +3,000억 원 증가. BDI 500포인트 상승 시 팬오션 분기 영업이익 약 +500억 원 개선.",
            "currentStatus": "홍해 사태 장기화와 글로벌 해운동맹 재편으로 고운임 기조가 지속되며 HMM이 분기 1조 원대 영업이익 안착.",
            "outlookSignal": {
                "level": "POSITIVE",
                "badgeText": "🟢 어닝 서프라이즈 (홍해 우회 & 고운임)",
                "summary": "희망봉 우회 장기화로 글로벌 컨테이너선 공급 부족이 지속되어 운임이 높은 수준을 유지하고 있습니다. HMM의 순현금 14조 원과 압도적 밸류에이션 매력."
            }
        },
        "indicators": [
            {
                "name": "상하이컨테이너운임지수 (SCFI, 상하이해운거래소)",
                "role": "글로벌 컨테이너 정기선 스팟 운임의 절대 벤치마크",
                "impact": "지수 2,000p 상회 시 HMM 분기 영업이익 1조 원 돌파",
                "sourceName": "Shanghai Shipping Exchange",
                "sourceUrl": "https://www.sse.net.cn/"
            },
            {
                "name": "발틱운임지수 (BDI, 런던 발틱해운거래소)",
                "role": "철광석·석탄·곡물 건화물선(벌크선) 글로벌 시황 지표",
                "impact": "지수 2,000p 돌파 시 벌크선사(팬오션) 실적 급증",
                "sourceName": "Baltic Exchange",
                "sourceUrl": "https://www.balticexchange.com/"
            }
        ],
        "companies": [
            {
                "name": "HMM",
                "code": "011200",
                "marketCap": "14조 원",
                "revenue": "11조 5,000억",
                "operatingProfit": "3조 5,000억",
                "opMargin": 30.4,
                "per": 4.5,
                "pbr": 0.65,
                "debtRatio": 22,
                "currentRatio": 350,
                "riskStatus": "SAFE",
                "dividendYield": 4.5,
                "payoutRatio": 25,
                "comment": "국내 1위 국적 원양선사. 부채비율 22% 및 순현금 14조 원 보유. 친환경 2만4천TEU 초대형 컨테이너선 선단 독점"
            },
            {
                "name": "팬오션",
                "code": "028670",
                "marketCap": "2조 1,000억",
                "revenue": "4조 8,000억",
                "operatingProfit": "4,800억",
                "opMargin": 10,
                "per": 6.2,
                "pbr": 0.45,
                "debtRatio": 75,
                "currentRatio": 165,
                "riskStatus": "SAFE",
                "dividendYield": 3.5,
                "payoutRatio": 22,
                "comment": "국내 1위 벌크선사(하림그룹). 포스코, 발레(Vale) 등 장기화물운송계약(CVC) 기반 안정적 마진 및 LNG선대 확대"
            }
        ]
    },
    {
        "id": "airline",
        "chapterId": 7,
        "chapterName": "7. 금융·운송·엔터",
        "sector": "항공 (국제선 여객 만실 & 유가 안정)",
        "subTitle": "국제 유가(항공유) 하락에 따른 연료비 절감 및 탑승률 85% 상회와 아시아나 메가캐리어 합병",
        "icon": "plane-takeoff",
        "description": "국제유가 안정세와 해외여행 여객 수요 폭증, 그리고 대한항공-아시아나항공 합병에 따른 세계 10대 메가 캐리어(Mega Carrier) 출범 수혜를 누리는 항공 운송 산업.",
        "relatedStocks": "대한항공, 진에어, 제주항공, 티웨이항공",
        "correlationLogic": {
            "formula": "싱가포르 항공유 가격 하향 + 여객 탑승률 85% 돌파 ➔ 연료비 20% 절감 + 항공권 ASP 유지 ➔ 분기 영업이익률 12~15% 달성",
            "details": [
                "1단계: 항공사 영업비용의 35%는 항공유(Jet Kerosene) 비용이므로 국제유가 하락 시 가장 직접적인 원가 절감 효과가 발생합니다.",
                "2단계: 해외여행 수요가 폭발하며 미주·유럽 등 장거리 프리미엄 노선 탑승률이 85%를 상회하여 높은 항공권 단가를 유지하고 있습니다.",
                "3단계: 유럽연합(EC) 및 미국 법무부(DOJ) 기업결합 승인 완료로 메가 캐리어 출범 가시화 및 장거리 노선 독점력이 극대화됩니다."
            ],
            "sensitivity": "원유 가격 배럴당 1달러 하락 시 대한항공 연간 유류비 약 +350억 원 절감. 원/달러 10원 하락 시 외화환산이익 약 +400억 원 발생.",
            "currentStatus": "유럽연합 및 미국 승인 완료로 통합 메가 캐리어 출범 초읽기에 진입했으며, 분기 영업이익 5,000억 원대 호실적 지속.",
            "outlookSignal": {
                "level": "POSITIVE",
                "badgeText": "🟢 메가 캐리어 통합 (유가 안정 & 여객 호조)",
                "summary": "아시아나항공과의 메가 캐리어 합병 승인과 유가·환율 안정세에 힘입어 분기 영업이익 5,000억 원대의 견조한 실적과 PBR 0.8배 저평가 매력 부각."
            }
        },
        "indicators": [
            {
                "name": "싱가포르 항공유(Jet Kerosene) 가격 (MOPS)",
                "role": "항공사 연료비 지출의 직접적 단가 기준",
                "impact": "항공유 배럴당 90달러 이하 하향 안정 시 영업이익률 15% 달성",
                "sourceName": "S&P Global Platts",
                "sourceUrl": "https://www.spglobal.com/commodityinsights/"
            },
            {
                "name": "인천국제공항 국제선 여객 및 화물 수송 실적",
                "role": "월별 국제선 여객수(명) 및 화물 톤수(ton)",
                "impact": "월간 여객 수 600만 명 돌파 시 여객 매출 사상 최고치",
                "sourceName": "인천국제공항공사 항공통계",
                "sourceUrl": "https://www.airport.kr/"
            }
        ],
        "companies": [
            {
                "name": "대한항공",
                "code": "003490",
                "marketCap": "8조 5,000억",
                "revenue": "17조 5,000억",
                "operatingProfit": "2조 1,000억",
                "opMargin": 12,
                "per": 6.2,
                "pbr": 0.85,
                "debtRatio": 220,
                "currentRatio": 110,
                "riskStatus": "SAFE",
                "dividendYield": 3.5,
                "payoutRatio": 25,
                "comment": "국내 1위 플래그 캐리어. 아시아나항공 합병으로 세계 10위권 메가 캐리어 도약. 방산 및 항공우주 사업 보유"
            },
            {
                "name": "진에어",
                "code": "272450",
                "marketCap": "5,800억",
                "revenue": "1조 4,500억",
                "operatingProfit": "1,850억",
                "opMargin": 12.8,
                "per": 4.8,
                "pbr": 1.65,
                "debtRatio": 280,
                "currentRatio": 95,
                "riskStatus": "SAFE",
                "dividendYield": 4.5,
                "payoutRatio": 25,
                "comment": "LCC 3사(진에어, 에어부산, 에어서울) 통합 주체. 인천공항 및 김해공항 골든 슬롯 장악으로 통합 LCC 최강자 등극"
            }
        ]
    },
    {
        "id": "express",
        "chapterId": 7,
        "chapterName": "7. 금융·운송·엔터",
        "sector": "육운·택배물류 (알리/테무 직구 통관 & 주7일 배송)",
        "subTitle": "알리익스프레스·테무 등 C-커머스 국내 직구 물량 통관 독점 및 주 7일 배송(매일 오네) 런칭",
        "icon": "truck",
        "description": "중국 직구 물동량 급증과 곤지암 메가허브터미널 등 휠소터 자동화 인프라를 바탕으로 쿠팡에 맞서 주 7일 배송 체제를 구축한 국내 1위 종합 물류 산업.",
        "relatedStocks": "CJ대한통운, 현대글로비스, 한진",
        "correlationLogic": {
            "formula": "알리/테무 직구 통관 물량 급증 + 주 7일 배송 풀필먼트 가동 ➔ 박스당 처리 원가 절감 ➔ 택배 부문 OPM 5~7% 진입",
            "details": [
                "1단계: 알리익스프레스, 테무 등 중국 해외직구 물동량의 대부분을 CJ대한통운이 독점적으로 통관 및 배송하여 신규 이커머스 매출을 흡수했습니다.",
                "2단계: 곤지암 메가허브 등 풀필먼트 센터의 자동화율이 90%에 달해 택배 물동량이 증가할수록 고정비가 분산되는 규모의 경제가 발생합니다.",
                "3단계: 주 7일 배송(매일 오네) 도입으로 네이버 쇼핑 등 이커머스 셀러를 대거 락인하여 쿠팡과의 양강 체제를 확립했습니다."
            ],
            "sensitivity": "택배 평균 박스당 단가 50원 인상 시 CJ대한통운 연간 영업이익 약 +850억 원 증가. 택배 물동량 5% 증가 시 공장 고정비 커버 마진 급상승.",
            "currentStatus": "C-커머스 물량 증대와 주 7일 배송 체제 구축으로 택배 시장 점유율 1위를 공고히 하며 분기 사상 최대 영업이익 달성.",
            "outlookSignal": {
                "level": "POSITIVE",
                "badgeText": "🟢 구조적 호전 (C-커머스 & 주7일 배송)",
                "summary": "알리익스프레스 직구 물량 통관 독점과 2025년 주 7일 배송 도입으로 택배 부문 수익성이 극대화되고 있습니다. 현대글로비스의 사상 최대 실적 및 주주환원."
            }
        },
        "indicators": [
            {
                "name": "한국통합물류협회 국내 택배 물동량 통계",
                "role": "대한민국 연간 총 택배 상자 수 및 상자당 평균 수수료",
                "impact": "박스 단가 반등 시 택배사 영업이익 두 자릿수 레버리지",
                "sourceName": "한국통합물류협회 물류통계",
                "sourceUrl": "https://www.koila.or.kr/"
            },
            {
                "name": "관세청 전자상거래 해외직구 통관 건수 통계",
                "role": "중국(알리, 테무) 및 미국 직구 통관 물동량",
                "impact": "직구 물량 급증 시 전담 택배사 물동량 즉시 증대",
                "sourceName": "관세청 수출입무역통계",
                "sourceUrl": "https://unipass.customs.go.kr/"
            }
        ],
        "companies": [
            {
                "name": "CJ대한통운",
                "code": "000120",
                "marketCap": "2조 1,000억",
                "revenue": "12조 원",
                "operatingProfit": "5,200억",
                "opMargin": 4.3,
                "per": 8.5,
                "pbr": 0.58,
                "debtRatio": 125,
                "currentRatio": 110,
                "riskStatus": "SAFE",
                "dividendYield": 1.8,
                "payoutRatio": 15,
                "comment": "국내 1위 종합물류사. 알리익스프레스 통관 전담 및 주 7일 배송 체제 런칭으로 쿠팡과 양강 구도 확립"
            },
            {
                "name": "현대글로비스",
                "code": "086280",
                "marketCap": "8조 2,000억",
                "revenue": "26조 5,000억",
                "operatingProfit": "1조 6,800억",
                "opMargin": 6.3,
                "per": 6.5,
                "pbr": 0.95,
                "debtRatio": 85,
                "currentRatio": 165,
                "riskStatus": "SAFE",
                "dividendYield": 3.8,
                "payoutRatio": 25,
                "comment": "현대차그룹 완성차 해상 운송 및 물류 독점. 1:1 무상증자 완료와 사상 최대 실적 및 주주환원 확대 정책"
            }
        ]
    },
    {
        "id": "trading",
        "chapterId": 7,
        "chapterName": "7. 금융·운송·엔터",
        "sector": "상사·자원개발 (호주 가스전 증산 & E&P)",
        "subTitle": "미얀마 및 호주 세넥스 천연가스전 3배 증산과 친환경 전기차 구동모터코어 글로벌 1위",
        "icon": "briefcase",
        "description": "단순 무역 중개를 넘어 호주, 미얀마, 북미 등 해외 가스전·광산 개발(E&P) 지분 수익과 전기차 구동모터코어 등 친환경 밸류체인을 장악한 종합 사업 지주 산업.",
        "relatedStocks": "포스코인터내셔널, LX인터내셔널, 삼성물산(상사)",
        "correlationLogic": {
            "formula": "호주 세넥스 가스전 생산량 3배 확대 + LNG 직도입 마진 ➔ 자원개발(E&P) 영업이익 급증 ➔ 연간 영업이익 1조 2천억 원 달성",
            "details": [
                "1단계: 상사 기업 영업이익의 70%는 단순 트레이딩이 아니라 직접 지분을 보유한 해외 석유·가스전 생산 이익에서 발생합니다.",
                "2단계: 포스코인터내셔널은 호주 세넥스에너지(Senex) 증산 프로젝트를 완료하여 2025~2026년 천연가스 생산량을 3배로 늘렸습니다.",
                "3단계: 동해 심해 유전·가스전(대왕고래) 탐사 시추 참여 모멘텀과 전기차 구동모터코어 글로벌 1위 공급 역량을 보유했습니다."
            ],
            "sensitivity": "천연가스 도입 가격 10% 상승 시 포스코인터 E&P 영업이익 약 +500억 원 증가. 유연탄/구리 가격 10% 상승 시 LX인터 자원이익 약 +300억 원 증가.",
            "currentStatus": "호주 세넥스에너지 3배 증산 가시화와 동해 심해 유전·가스전 개발 참여 모멘텀으로 친환경 종합 사업회사로 재평가 진행.",
            "outlookSignal": {
                "level": "POSITIVE",
                "badgeText": "🟢 강력 호전 (가스전 증산 & 자원개발)",
                "summary": "해외 가스전 E&P 이익과 구동모터코어 고성장으로 연간 영업이익 1조 원 이상을 안정적으로 창출하고 있습니다. 동해 가스전 개발 수혜주."
            }
        },
        "indicators": [
            {
                "name": "S&P GSCI 글로벌 원자재 종합 지수",
                "role": "글로벌 에너지, 비철금속, 농산물 가격 지표",
                "impact": "원자재 가격 강세 시 상사업체 자원개발 지분 이익 극대화",
                "sourceName": "S&P Dow Jones Indices",
                "sourceUrl": "https://www.spglobal.com/"
            },
            {
                "name": "호주 세넥스에너지 천연가스 생산량 (포스코인터내셔널 IR)",
                "role": "호주 동부 가스 생산량 및 LNG 수출 판매액",
                "impact": "가스 생산량 3배 확대 시 연간 영업이익 수천억 원 증액",
                "sourceName": "Senex Energy IR",
                "sourceUrl": "https://www.senexenergy.com.au/"
            }
        ],
        "companies": [
            {
                "name": "포스코인터내셔널",
                "code": "047050",
                "marketCap": "9조 2,000억",
                "revenue": "34조 원",
                "operatingProfit": "1조 1,800억",
                "opMargin": 3.5,
                "per": 11.5,
                "pbr": 1.55,
                "debtRatio": 135,
                "currentRatio": 125,
                "riskStatus": "SAFE",
                "dividendYield": 2.5,
                "payoutRatio": 25,
                "comment": "포스코그룹 친환경 에너지 대표사. 미얀마·호주 가스전 E&P 독점 및 친환경 전기차 구동모터코어 글로벌 1위 공급사"
            },
            {
                "name": "LX인터내셔널",
                "code": "001120",
                "marketCap": "1조 1,000억",
                "revenue": "16조 원",
                "operatingProfit": "4,500억",
                "opMargin": 2.8,
                "per": 4.2,
                "pbr": 0.38,
                "debtRatio": 115,
                "currentRatio": 165,
                "riskStatus": "SAFE",
                "dividendYield": 5.2,
                "payoutRatio": 22,
                "comment": "인도네시아 니켈 광산 및 팜유 농장 보유. 자회사 LX판토스(물류 1위) 보유 및 PBR 0.38배, 5%대 고배당주"
            }
        ]
    },
    {
        "id": "entertain",
        "chapterId": 7,
        "chapterName": "7. 금융·운송·엔터",
        "sector": "엔터테인먼트 (글로벌 스타디움 투어 & 팬덤 MD)",
        "subTitle": "BTS 완전체 복귀 모멘텀 및 저연차 아티스트 북미·유럽 스타디움 투어와 위버스 수익화",
        "icon": "music",
        "description": "K-POP 아티스트의 글로벌 스타디움 월드투어, 팬덤 플랫폼(위버스) 구독료 및 고마진 MD(기획상품)와 라이선싱으로 확장되는 K-엔터테인먼트 산업.",
        "relatedStocks": "하이브, JYP Ent., 에스엠, 와이지엔터테인먼트",
        "correlationLogic": {
            "formula": "BTS 전원 군복무 완료 컴백 + 월드투어 모객 200만 명 ➔ 티켓 + 현장 MD 매출 폭발 ➔ 영업이익률 15~18% 퀀텀점프",
            "details": [
                "1단계: 2026년 BTS 멤버 전원 군 복무가 완료되어 완전체 컴백 및 초대형 글로벌 스타디움 월드투어가 예정되어 있습니다.",
                "2단계: 스타디움급(회당 5만 명 이상) 콘서트는 티켓뿐 아니라 인당 5~10만 원의 고마진 굿즈(응원봉, 의류) 매출이 폭발합니다.",
                "3단계: 위버스 유료 멤버십 도입과 디지털 포토카드 등 고마진 간접 매출 비중이 확대되어 구조적 수익성이 개선됩니다."
            ],
            "sensitivity": "글로벌 월드투어 관객 100만 명 증가 시 하이브 영업이익 약 +400억 원 증가. 스트레이키즈 북미 스타디움 추가 매진 시 JYP OPM +2%p 개선.",
            "currentStatus": "내홍 사태 수습과 저연차 그룹(투모로우바이투게더, 엔하이픈, 스트레이키즈)의 북미 스타디움 안착으로 실적 턴어라운드 진입.",
            "outlookSignal": {
                "level": "POSITIVE",
                "badgeText": "🟢 강력 호전 (BTS 컴백 & 스타디움 투어)",
                "summary": "BTS 완전체 컴백과 스트레이키즈, 에스파의 글로벌 스타디움 투어 확대로 2025~2026년 K-엔터테인먼트 사상 최대 영업이익 달성 유력."
            }
        },
        "indicators": [
            {
                "name": "써클차트(Circle Chart) K-POP 음반 국가별 수출 통계",
                "role": "K-POP 피지컬 앨범 전 세계 판매량 및 수출 성장률",
                "impact": "미국/유럽 앨범 판매 증가 시 글로벌 코어 팬덤 확대 입증",
                "sourceName": "써클차트",
                "sourceUrl": "https://circlechart.kr/"
            },
            {
                "name": "빌보드 박스스코어(Billboard Boxscore) 글로벌 콘서트 매출",
                "role": "K-POP 아티스트의 스타디움 투어 관객 수 및 티켓 매출액",
                "impact": "스타디움 투어 회당 매출 50억 돌파 시 어닝 서프라이즈",
                "sourceName": "Billboard Boxscore",
                "sourceUrl": "https://www.billboard.com/"
            }
        ],
        "companies": [
            {
                "name": "하이브",
                "code": "352820",
                "marketCap": "8조 5,000억",
                "revenue": "2조 3,500억",
                "operatingProfit": "2,900억",
                "opMargin": 12.3,
                "per": 24,
                "pbr": 2.3,
                "debtRatio": 55,
                "currentRatio": 185,
                "riskStatus": "SAFE",
                "dividendYield": 0.8,
                "payoutRatio": 15,
                "comment": "글로벌 1위 엔터 기업. BTS 완전체 컴백 모멘텀과 세븐틴, 투모로우바이투게더, 엔하이픈, 르세라핌 등 막강한 멀티레이블 및 위버스 플랫폼 독점"
            },
            {
                "name": "JYP Ent.",
                "code": "035900",
                "marketCap": "2조 2,000억",
                "revenue": "5,800억",
                "operatingProfit": "1,350억",
                "opMargin": 23.3,
                "per": 17.5,
                "pbr": 4.1,
                "debtRatio": 25,
                "currentRatio": 240,
                "riskStatus": "SAFE",
                "dividendYield": 1.8,
                "payoutRatio": 30,
                "comment": "스트레이키즈 글로벌 스타디움 투어 및 트와이스 롱런. OPM 23%에 달하는 업계 최고 수준의 수익성과 투명한 거버넌스"
            }
        ]
    },
    {
        "id": "game",
        "chapterId": 7,
        "chapterName": "7. 금융·운송·엔터",
        "sector": "게임 (글로벌 메가 IP & PC/콘솔 라이브서비스)",
        "subTitle": "배틀그라운드 글로벌 트래픽 사상 최대 경신 및 한계비용 0의 OPM 45% 고수익 창출",
        "icon": "gamepad-2",
        "description": "글로벌 메가 IP를 기반으로 PC 스팀, 모바일, 콘솔로 플랫폼을 확장하여 인게임 아이템 과금과 라이브 서비스를 통해 압도적 영업이익률을 창출하는 소프트웨어 산업.",
        "relatedStocks": "크래프톤, 넥슨게임즈, 넷마블, 엔씨소프트",
        "correlationLogic": {
            "formula": "글로벌 PC/모바일 동시접속자수 사상 최고 경신 ➔ 인게임 결제(ARPPU) 확대 ➔ 한계비용 0 구조로 OPM 45~50% 폭발",
            "details": [
                "1단계: 게임 소프트웨어는 초기 개발비 상각 후 서버 비용 외에 추가 원가가 들지 않아 트래픽 증가 시 막대한 영업레버리지가 발생합니다.",
                "2단계: 크래프톤의 배틀그라운드는 출시 7년 차에도 인도, 중국, 중동 등 글로벌 일간활성이용자(DAU)가 사상 최고치를 경신 중입니다.",
                "3단계: 자체 개발 콘솔 대작(스팀 플랫폼)을 통해 북미·유럽 시장으로 유료 패키지를 수출하며 단일 게임 의존도를 분산하고 있습니다."
            ],
            "sensitivity": "배틀그라운드 글로벌 동접자 10% 증가 시 분기 영업이익 약 +500억 원 증가. 스팀 신작 밀리언셀러 달성 시 OPM +10%p 개선.",
            "currentStatus": "크래프톤의 연간 영업이익 1조 2천억 원 돌파 독주와 넥슨게임즈의 라이브 서비스 호조로 탄탄한 현금흐름 유지.",
            "outlookSignal": {
                "level": "POSITIVE",
                "badgeText": "🟢 사상 최대 실적 (배그 독주 & 글로벌 IP)",
                "summary": "크래프톤을 중심으로 글로벌 PC/모바일 트래픽이 사상 최고치를 경신하며 분기마다 어닝 서프라이즈를 기록하고 있습니다. 순현금 3조 원 우량 재무구조."
            }
        },
        "indicators": [
            {
                "name": "스팀(Steam) 글로벌 최고 동시접속자 순위",
                "role": "PC/콘솔 게임의 글로벌 흥행 여부 및 전 세계 트래픽 실시간 측정",
                "impact": "동접자 1~3위 유지 시 분기 실적 급증 보증",
                "sourceName": "SteamDB",
                "sourceUrl": "https://steamdb.info/"
            },
            {
                "name": "인도 및 북미 구글 플레이스토어 게임 매출 순위",
                "role": "크래프톤 BGMI(배틀그라운드 인도) 일매출 측정",
                "impact": "인도 앱스토어 1위 독점 시 연간 3,000억 원 순익 기여",
                "sourceName": "모바일인덱스/센서타워",
                "sourceUrl": "https://sensortower.com/"
            }
        ],
        "companies": [
            {
                "name": "크래프톤",
                "code": "259960",
                "marketCap": "16조 원",
                "revenue": "2조 6,000억",
                "operatingProfit": "1조 2,500억",
                "opMargin": 48.1,
                "per": 14.5,
                "pbr": 2.8,
                "debtRatio": 18,
                "currentRatio": 380,
                "riskStatus": "SAFE",
                "dividendYield": 0,
                "payoutRatio": 0,
                "comment": "배틀그라운드 IP 글로벌 대흥행. 인도 모바일 시장 1위 독점 및 OPM 48%의 압도적 수익성. 순현금 3조 원 이상 보유"
            },
            {
                "name": "넥슨게임즈",
                "code": "225570",
                "marketCap": "1조 1,000억",
                "revenue": "2,400억",
                "operatingProfit": "450억",
                "opMargin": 18.8,
                "per": 20,
                "pbr": 3.2,
                "debtRatio": 20,
                "currentRatio": 310,
                "riskStatus": "SAFE",
                "dividendYield": 0,
                "payoutRatio": 0,
                "comment": "블루아카이브 일본/글로벌 서브컬처 팬덤 롱런 및 퍼스트 디센던트 스팀 글로벌 흥행 성공"
            }
        ]
    },
    {
        "id": "bank",
        "chapterId": 7,
        "chapterName": "7. 금융·운송·엔터",
        "sector": "은행·금융지주 (순이자마진 NIM & 밸류업 자사주 소각)",
        "subTitle": "순이자마진(NIM) 방어, 대손충당금 안정 및 보통주자본비율(CET1) 13.5% 초과 전액 자사주 소각 밸류업",
        "icon": "landmark",
        "description": "안정적인 예대마진과 비이자이익(수수료, 유가증권 운용)을 바탕으로, 연간 수조 원대 자사주 매입·소각과 분기 균등 배당을 실천하는 정부 밸류업 프로그램의 대표 수혜 산업.",
        "relatedStocks": "KB금융, 신한지주, 하나금융지주, 우리금융지주",
        "correlationLogic": {
            "formula": "시장 기준금리 안정 + 대출 잔액 완만한 성장 ➔ 순이자마진(NIM) 방어 ➔ 충당금 감소로 당기순이익 사상 최대 ➔ 주주환원율 40~50% 달성",
            "details": [
                "1단계: 은행의 이익은 순이자마진(NIM)과 원화대출금 성장률의 곱으로 결정되는 순이자이익에 의해 좌우됩니다.",
                "2단계: 급격한 금리 변동이 잦아들고 부동산 PF 구조조정이 일단락되면서 대손충당금 적립 부담이 대폭 축소되었습니다.",
                "3단계: 보통주자본비율(CET1) 13.0~13.5%를 초과하는 자본을 전액 자사주 매입·소각에 투입하는 선진국형 주주환원 모델이 확립되었습니다."
            ],
            "sensitivity": "NIM 5bp 개선 시 4대 금융지주 합산 순이자이익 약 +8,500억 원 증가. CET1 비율 10bp 개선 시 자사주 소각 여력 약 +3,000억 원 확대.",
            "currentStatus": "4대 금융지주 연간 합산 당기순이익 16조 원 돌파 페이스 및 PBR 0.5~0.6배 수준의 저평가 해소 국면 지속.",
            "outlookSignal": {
                "level": "POSITIVE",
                "badgeText": "🟢 강력 호전 (밸류업 & 고배당)",
                "summary": "안정적인 이자이익과 CET1 비율 13.5% 기반의 대규모 자사주 매입·소각이 이어지고 있습니다. PBR 0.5~0.6배 수준의 극심한 저평가 해소 국면."
            }
        },
        "indicators": [
            {
                "name": "한국은행 금융기관 가중평균금리 (잔액 및 신규 NIM)",
                "role": "은행권 예금 및 대출 금리차(예대마진) 측정 기준",
                "impact": "NIM 안정 시 은행 연간 순이자이익 방어 보증",
                "sourceName": "한국은행 ECOS",
                "sourceUrl": "https://ecos.bok.or.kr/"
            },
            {
                "name": "금융감독원 금융지주 보통주자본비율(CET1 비율)",
                "role": "은행 건전성 및 자사주 소각·주주환원 여력 측정 기준",
                "impact": "CET1 13% 초과 자본 전액 주주환원 실행 연동",
                "sourceName": "금융감독원 금융통계정보",
                "sourceUrl": "https://fisis.fss.or.kr/"
            }
        ],
        "companies": [
            {
                "name": "KB금융",
                "code": "105560",
                "marketCap": "36조 원",
                "revenue": "68조 원",
                "operatingProfit": "6조 8,000억",
                "opMargin": 10,
                "per": 6.8,
                "pbr": 0.62,
                "debtRatio": 1100,
                "currentRatio": 120,
                "riskStatus": "SAFE",
                "dividendYield": 4.8,
                "payoutRatio": 38,
                "comment": "국내 리딩뱅크. CET1 13.8%로 은행권 최고 건전성 보유. 연간 1조 원 이상 자사주 매입·소각 진행"
            },
            {
                "name": "신한지주",
                "code": "055550",
                "marketCap": "28조 원",
                "revenue": "62조 원",
                "operatingProfit": "6조 2,000억",
                "opMargin": 10,
                "per": 6.2,
                "pbr": 0.55,
                "debtRatio": 1150,
                "currentRatio": 118,
                "riskStatus": "SAFE",
                "dividendYield": 5.2,
                "payoutRatio": 36,
                "comment": "균형 잡힌 비은행 포트폴리오(신한카드, 신한투자증권, 신한라이프). 분기 균등 배당 및 자사주 소각 확대"
            },
            {
                "name": "하나금융지주",
                "code": "086790",
                "marketCap": "17조 8,000억",
                "revenue": "55조 원",
                "operatingProfit": "4조 9,000억",
                "opMargin": 8.9,
                "per": 5.2,
                "pbr": 0.45,
                "debtRatio": 1200,
                "currentRatio": 115,
                "riskStatus": "SAFE",
                "dividendYield": 5.8,
                "payoutRatio": 34,
                "comment": "외환·기업금융 강자. 2027년까지 주주환원율 50% 달성 목표 공표 및 3,000억 규모 자사주 소각 진행"
            }
        ]
    },
    {
        "id": "reits",
        "chapterId": 7,
        "chapterName": "7. 금융·운송·엔터",
        "sector": "리츠 (금리인하 수혜 & 7~8% 배당수익률)",
        "subTitle": "기준금리 인하 사이클 진입에 따른 담보대출 리파이낸싱 이자비용 절감 및 프라임 오피스 무공실",
        "icon": "building-2",
        "description": "서울 핵심 도심(CBD, GBD) 프라임 오피스와 대형 물류센터, 주유소 등 우량 실물자산에 투자하여 임대료 수익의 90% 이상을 분기마다 배당하는 부동산 간접투자 산업.",
        "relatedStocks": "SK리츠, 신한알파리츠, ESR켄달스퀘어리츠, 롯데리츠",
        "correlationLogic": {
            "formula": "기준금리 인하 ➔ 부동산 담보대출 차환 리파이낸싱 금리 70bp 하락 ➔ 이자비용 절감 ➔ 주당배당금(DPS) 상승 및 배당수익률 7~8% 부각",
            "details": [
                "1단계: 리츠는 자산 매입 시 50~60%를 담보대출로 조달하므로, 시장금리 인하 시 만기 차환(리파이낸싱) 이자비용이 크게 감소합니다.",
                "2단계: 서울 주요 도심 프라임 오피스의 공실률이 2%대의 무공실 상태를 유지하며 임대료가 물가상승률 이상으로 인상되고 있습니다.",
                "3단계: 자산 매각 시 발생하는 매각 차익 특별배당과 결합되어 연 환산 배당수익률이 7~8% 수준으로 올라서며 주가 리레이팅이 전개됩니다."
            ],
            "sensitivity": "담보대출 금리 50bp 하락 시 리츠별 연간 당기순이익 약 +50억~120억 원 증가. 오피스 임대료 5% 인상 시 연간 배당금 약 +7% 상향.",
            "currentStatus": "글로벌 및 국내 금리 인하 사이클 본격화로 리파이낸싱 우려가 해소되며 주가 바닥권 탈출 및 7% 중후반대 고배당 매력 급부상.",
            "outlookSignal": {
                "level": "POSITIVE",
                "badgeText": "🟢 강력 호전 (금리인하 최대 수혜)",
                "summary": "기준금리 인하로 부동산 담보대출 이자 부담이 줄어들며 배당 여력이 커지고 있습니다. 서울 프라임 오피스 무공실 상태와 결합되어 7~8%대 배당수익률 유망."
            }
        },
        "indicators": [
            {
                "name": "젠스타메이트 서울 프라임 오피스 공실률 및 NOC",
                "role": "서울 도심 오피스 리츠 임대수익성 및 수급 상황",
                "impact": "공실률 3% 하회 시 임대료 인상 레버리지 극대화",
                "sourceName": "젠스타메이트 리포트",
                "sourceUrl": "https://www.genstarmate.com/"
            },
            {
                "name": "국고채 3년물/5년물 금리 (한국은행 ECOS)",
                "role": "리츠의 자산 매입 및 만기 차환 이자비용 산정 기준",
                "impact": "대출금리 하락 시 주당배당금(DPS) 직결 상향",
                "sourceName": "한국은행 ECOS",
                "sourceUrl": "https://ecos.bok.or.kr/"
            }
        ],
        "companies": [
            {
                "name": "SK리츠",
                "code": "395400",
                "marketCap": "1조 1,500억",
                "revenue": "1,450억",
                "operatingProfit": "980억",
                "opMargin": 67.6,
                "per": 13,
                "pbr": 0.95,
                "debtRatio": 185,
                "currentRatio": 110,
                "riskStatus": "SAFE",
                "dividendYield": 7.2,
                "payoutRatio": 95,
                "comment": "SK그룹 본사 사옥(서린빌딩) 및 종로타워, SK에너지 주유소 편입. SK그룹 장기 책임임차로 분기배당 7%대 안정성 보장"
            },
            {
                "name": "신한알파리츠",
                "code": "293940",
                "marketCap": "6,800억",
                "revenue": "820억",
                "operatingProfit": "560억",
                "opMargin": 68.3,
                "per": 14.5,
                "pbr": 1.1,
                "debtRatio": 165,
                "currentRatio": 115,
                "riskStatus": "SAFE",
                "dividendYield": 6.8,
                "payoutRatio": 95,
                "comment": "판교 크래프톤타워, 용산 더프라임 등 핵심 프라임 오피스 자산 보유. 자산 매각 차익 특별배당 실적 우수"
            },
            {
                "name": "ESR켄달스퀘어리츠",
                "code": "365550",
                "marketCap": "9,800억",
                "revenue": "1,200억",
                "operatingProfit": "850억",
                "opMargin": 70.8,
                "per": 13.5,
                "pbr": 0.9,
                "debtRatio": 175,
                "currentRatio": 105,
                "riskStatus": "SAFE",
                "dividendYield": 7,
                "payoutRatio": 95,
                "comment": "국내 최대 물류센터 전문 리츠. 쿠팡 등 이커머스 기업 100% 임차로 안정적 현금흐름 및 자산 재평가 수혜"
            }
        ]
    },
    {
        "id": "securities",
        "chapterId": 7,
        "chapterName": "7. 금융·운송·엔터",
        "sector": "증권 (해외주식 거래대금 & 브로커리지)",
        "subTitle": "서학개미 미국 주식 거래대금 사상 최대 경신 및 기준금리 인하에 따른 채권운용(S&T) 평가익 확대",
        "icon": "trending-up",
        "description": "국내외 주식 위탁매매(브로커리지), 기업금융(IB, IPO), 고마진 자산관리(WM), 트레이딩을 영위하며 증시 거래대금과 해외주식 수수료에 민감한 고수익 금융 산업.",
        "relatedStocks": "미래에셋증권, 한국금융지주, 삼성증권, 키움증권, NH투자증권",
        "correlationLogic": {
            "formula": "미국/국내 증시 일평균 거래대금 급증 ➔ 해외주식 환전 및 위탁매매 수수료 폭발 + 신용융자 이자수익 ➔ 순이익 30~50% 퀀텀점프",
            "details": [
                "1단계: 서학개미(해외주식 투자) 열풍으로 미국 주식 일평균 거래대금이 사상 최대치를 기록하며 외환 환전 수수료와 브로커리지 수수료가 폭증했습니다.",
                "2단계: 부동산 PF 관련 충당금 적립이 일단락되면서 IB 부문의 잠재 부실 리스크가 크게 완화되었습니다.",
                "3단계: 금리 인하 국면에서 보유 채권의 평가이익(Trading 수익)이 대규모로 유입되며 분기 실적 서프라이즈를 견인합니다."
            ],
            "sensitivity": "증시 일평균 거래대금 1조 원 증가 시 주요 증권사 연간 수탁수수료 약 +400억~600억 원 증가. 금리 25bp 인하 시 채권평가익 수백억 원 유입.",
            "currentStatus": "국내 및 미국 주식 합산 거래대금 호조와 해외주식 수수료 점유율 안정화로 분기 순이익 1조 원 클럽 복귀 유력.",
            "outlookSignal": {
                "level": "POSITIVE",
                "badgeText": "🟢 실적 호조 (해외주식 & 거래대금)",
                "summary": "미국 증시 호황에 따른 해외주식 위탁매매 수수료 폭증과 채권운용 수익 개선으로 실적이 크게 호전되고 있습니다. 배당수익률 5~6%대 유지."
            }
        },
        "indicators": [
            {
                "name": "한국거래소(KRX) 일평균 주식 거래대금",
                "role": "증권사 브로커리지 수탁수수료 수익의 직접적 결정 변수",
                "impact": "거래대금 10% 증가 시 위탁매매 영업이익 15% 레버리지",
                "sourceName": "KRX 정보데이터시스템",
                "sourceUrl": "http://data.krx.co.kr/"
            },
            {
                "name": "금융투자협회 고객예탁금 및 신용융자 잔고",
                "role": "개인 투자자 증시 대기자금 및 고마진 신용공여 이자수익",
                "impact": "신용잔고 증가 시 증권사 이자수익 직결",
                "sourceName": "금융투자협회 프리시스",
                "sourceUrl": "https://freesis.kofia.or.kr/"
            }
        ],
        "companies": [
            {
                "name": "미래에셋증권",
                "code": "006800",
                "marketCap": "5조 8,000억",
                "revenue": "21조 원",
                "operatingProfit": "9,800억",
                "opMargin": 4.7,
                "per": 8.5,
                "pbr": 0.52,
                "debtRatio": 650,
                "currentRatio": 125,
                "riskStatus": "SAFE",
                "dividendYield": 4.5,
                "payoutRatio": 35,
                "comment": "자기자본 11조 원 압도적 1위. 해외주식 수탁 잔고 30조 돌파 및 글로벌 법인 수익 다변화. 보통주·우선주 지속 소각"
            },
            {
                "name": "한국금융지주",
                "code": "071050",
                "marketCap": "4조 2,000억",
                "revenue": "23조 원",
                "operatingProfit": "1조 1,500억",
                "opMargin": 5,
                "per": 5.2,
                "pbr": 0.48,
                "debtRatio": 720,
                "currentRatio": 120,
                "riskStatus": "SAFE",
                "dividendYield": 5,
                "payoutRatio": 25,
                "comment": "한국투자증권 모회사. 카카오뱅크 지분 가치 보유 및 브로커리지·IB·트레이딩 전 부문 업계 최상위 수익성"
            },
            {
                "name": "키움증권",
                "code": "039490",
                "marketCap": "3조 5,000억",
                "revenue": "9조 5,000억",
                "operatingProfit": "1조 500억",
                "opMargin": 11.1,
                "per": 4.8,
                "pbr": 0.65,
                "debtRatio": 520,
                "currentRatio": 130,
                "riskStatus": "SAFE",
                "dividendYield": 4.8,
                "payoutRatio": 30,
                "comment": "국내 개인 주식 점유율 1위(영웅문). 영웅문 글로벌 기반 해외주식 수수료 급증과 자사주 소각 3개년 계획 이행 중"
            }
        ]
    },
    {
        "id": "insurance",
        "chapterId": 7,
        "chapterName": "7. 금융·운송·엔터",
        "sector": "보험 (IFRS17 CSM 상각 & 보장성 건강보험)",
        "subTitle": "보험계약마진(CSM) 잔액 14조 원 기반의 안정적 당기순이익 상각 및 K-ICS 비율 200% 상회",
        "icon": "shield",
        "description": "새 회계제도(IFRS17) 도입으로 보험계약마진(CSM) 상각액과 지급여력비율(K-ICS)이 장기 실적과 5%대 안정적 배당 여력을 결정하는 대형 금융 산업.",
        "relatedStocks": "삼성화재, DB손해보험, 삼성생명, 현대해상",
        "correlationLogic": {
            "formula": "보장성 인보험 판매 확대 ➔ CSM 잔액 14조 돌파 ➔ 연간 수조 원대 보험계약마진 안정적 상각으로 순이익 2조 클럽 안착",
            "details": [
                "1단계: IFRS17 회계기준 하에서 보험사의 미래 이익은 부채 내 CSM(보험계약마진)으로 적립된 후 매 분기 일정 비율로 상각되어 당기순이익으로 인식됩니다.",
                "2단계: 저축성 보험보다 마진율이 월등히 높은 무해지/저해지 건강보험·암보험 등 보장성 인보험 신계약 확보가 핵심 경쟁력입니다.",
                "3단계: 자산부채종합관리(ALM) 강화를 통해 시장금리 하락기에도 자본 변동성을 억제하고 안정적인 K-ICS(지급여력비율) 200% 이상을 유지합니다."
            ],
            "sensitivity": "신계약 CSM 1조 원 증가 시 향후 수년간 연간 상각 이익 약 +1,000억 원 지속 유입. 장기 위험손해율 1%p 개선 시 보험손익 약 +500억 원 개선.",
            "currentStatus": "삼성화재와 DB손해보험을 중심으로 CSM 잔액이 13조~14조 원을 돌파하며 역대 최대 보험이익 달성 및 주주환원 확대 지속.",
            "outlookSignal": {
                "level": "POSITIVE",
                "badgeText": "🟢 안정적 호전 (CSM 상각 & 고배당)",
                "summary": "손해보험사를 중심으로 보장성 보험 판매 호조와 CSM 잔액 성장이 견고합니다. 자본건전성(K-ICS 200% 초과) 기반 5~6%대 배당수익률 유망."
            }
        },
        "indicators": [
            {
                "name": "금융감독원 보험사 K-ICS(신지급여력비율)",
                "role": "보험사 재무건전성 및 배당 가능 여부의 법적 기준선(권고치 150%)",
                "impact": "K-ICS 200% 상회 시 안정적 배당 확대 승인",
                "sourceName": "금융감독원 금융통계정보",
                "sourceUrl": "https://fisis.fss.or.kr/"
            },
            {
                "name": "손해보험협회 자동차 및 장기보험 손해율 공시",
                "role": "손해보험사의 단기 보험영업 이익 결정",
                "impact": "손해율 80% 하회 시 대규모 흑자 기여",
                "sourceName": "손해보험협회 공시",
                "sourceUrl": "https://www.knia.or.kr/"
            }
        ],
        "companies": [
            {
                "name": "삼성화재",
                "code": "000810",
                "marketCap": "17조 원",
                "revenue": "22조 원",
                "operatingProfit": "2조 4,000억",
                "opMargin": 10.9,
                "per": 7.8,
                "pbr": 0.95,
                "debtRatio": 450,
                "currentRatio": 130,
                "riskStatus": "SAFE",
                "dividendYield": 4.8,
                "payoutRatio": 38,
                "comment": "손해보험 1위. CSM 잔액 14조 원 육박 및 K-ICS 비율 270%대의 압도적 자본력 보유. 밸류업 선도주"
            },
            {
                "name": "DB손해보험",
                "code": "005830",
                "marketCap": "7조 2,000억",
                "revenue": "18조 원",
                "operatingProfit": "2조 1,000억",
                "opMargin": 11.7,
                "per": 4.8,
                "pbr": 0.72,
                "debtRatio": 520,
                "currentRatio": 125,
                "riskStatus": "SAFE",
                "dividendYield": 5.5,
                "payoutRatio": 28,
                "comment": "업계 최고 수준의 OPM 11% 및 운용자산이익률. 보장성 인보험 판매력과 손해율 관리 역량 탁월"
            },
            {
                "name": "삼성생명",
                "code": "032830",
                "marketCap": "19조 원",
                "revenue": "32조 원",
                "operatingProfit": "2조 2,000억",
                "opMargin": 6.9,
                "per": 9.5,
                "pbr": 0.45,
                "debtRatio": 650,
                "currentRatio": 120,
                "riskStatus": "SAFE",
                "dividendYield": 4.2,
                "payoutRatio": 35,
                "comment": "생명보험 1위. 삼성전자 지분 8.51%(약 30조 원)를 보유한 자산 가치주이자 삼성그룹 지배구조 핵심축"
            }
        ]
    }
];

console.log('INDUSTRY_DATA loaded successfully with ' + window.CHAPTERS.length + ' Chapters and ' + window.INDUSTRY_DATA.length + ' Industries.');

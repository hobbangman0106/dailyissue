// Initial fallback data for local file access (CORS bypass)
const FALLBACK_DATA = {
    "lastUpdated": "2026-05-24T20:45:00+09:00",
    "FM Korea": [
        {"Title": "3년 전에 은폐된 예비군 사망 사건", "Link": "https://www.fmkorea.com/9828247185", "Comments": "342", "Votes": "1520", "Time": "1시간 전"},
        {"Title": "연예계 최고의 미스테리.jpg", "Link": "https://www.fmkorea.com/9827587814", "Comments": "156", "Votes": "890", "Time": "2시간 전"},
        {"Title": "이번 챔스 결승 라인업 예상 ㄷㄷ", "Link": "https://www.fmkorea.com/9827456123", "Comments": "94", "Votes": "620", "Time": "3시간 전"},
        {"Title": "요즘 유행한다는 새로운 성격유형 검사", "Link": "https://www.fmkorea.com/9827345210", "Comments": "180", "Votes": "950", "Time": "4시간 전"},
        {"Title": "백종원 유튜브에 나온 시장 상인들 최근 반응", "Link": "https://www.fmkorea.com/9827234198", "Comments": "210", "Votes": "1130", "Time": "5시간 전"},
        {"Title": "미국에서 화제라는 한식 밀키트 제품군", "Link": "https://www.fmkorea.com/9827123087", "Comments": "85", "Votes": "420", "Time": "6시간 전"},
        {"Title": "한국 아파트 주차장 레전드 빌런 등장", "Link": "https://www.fmkorea.com/9827012976", "Comments": "452", "Votes": "1980", "Time": "7시간 전"},
        {"Title": "과거 동네 문방구에서 팔던 추억의 불량식품들", "Link": "https://www.fmkorea.com/9826901865", "Comments": "120", "Votes": "760", "Time": "8시간 전"},
        {"Title": "손흥민 주말 경기 평점 모음", "Link": "https://www.fmkorea.com/9826800754", "Comments": "150", "Votes": "820", "Time": "9시간 전"},
        {"Title": "일본 여행 중 먹어봐야 할 숨겨진 라멘 맛집", "Link": "https://www.fmkorea.com/9826700643", "Comments": "64", "Votes": "390", "Time": "10시간 전"},
        {"Title": "세계적인 팝스타의 내한 공연 실시간 현장", "Link": "https://www.fmkorea.com/9826600532", "Comments": "199", "Votes": "1420", "Time": "11시간 전"},
        {"Title": "넷플릭스 신작 예고편 공개 반응 ㄷㄷ", "Link": "https://www.fmkorea.com/9826500421", "Comments": "110", "Votes": "580", "Time": "12시간 전"},
        {"Title": "가성비 갑이라는 다이소 꿀템 리스트", "Link": "https://www.fmkorea.com/9826400310", "Comments": "75", "Votes": "480", "Time": "13시간 전"},
        {"Title": "고속도로 터널 안 교통사고 극적인 대처", "Link": "https://www.fmkorea.com/9826300201", "Comments": "260", "Votes": "1650", "Time": "14시간 전"},
        {"Title": "인류 역사상 가장 미스터리한 실종 사건", "Link": "https://www.fmkorea.com/9826200190", "Comments": "310", "Votes": "1210", "Time": "15시간 전"}
    ],
    "Ruliweb": [
        {"Title": "한국인은 20억 무슬림을 존중하지 않는다는 여자", "Link": "https://bbs.ruliweb.com/best/board/300143/read/66085521", "Views": "45200", "Comments": "234", "Time": "20:15"},
        {"Title": "자영업하려고 5년차 경찰공무원 때려친 유튜버", "Link": "https://bbs.ruliweb.com/best/board/300143/read/66084478", "Views": "31200", "Comments": "145", "Time": "19:30"},
        {"Title": "켄이치) 켄이치가 등신처럼 지면 생기는 일", "Link": "https://bbs.ruliweb.com/best/board/300143/read/66084479", "Views": "28100", "Comments": "89", "Time": "19:10"},
        {"Title": "사육난이도 극악이라는 어느 동물.jpg", "Link": "https://bbs.ruliweb.com/best/board/300143/read/66084480", "Views": "34200", "Comments": "112", "Time": "18:50"},
        {"Title": "디지몬) 레오몬 근황 ㄷㄷ", "Link": "https://bbs.ruliweb.com/best/board/300143/read/66084481", "Views": "19800", "Comments": "45", "Time": "18:40"},
        {"Title": "한국인에게 공포감을 느끼는 일본 트위터 유저들", "Link": "https://bbs.ruliweb.com/best/board/300143/read/66084482", "Views": "41200", "Comments": "167", "Time": "18:25"},
        {"Title": "결국 모기 활용법을 발명한 인간들.jpg", "Link": "https://bbs.ruliweb.com/best/board/300143/read/66084483", "Views": "29500", "Comments": "98", "Time": "18:10"},
        {"Title": "왕녀의 반란덕분에 3년간 면세를 받아낸 정치의 신", "Link": "https://bbs.ruliweb.com/best/board/300143/read/66084484", "Views": "32100", "Comments": "142", "Time": "17:55"},
        {"Title": "인도 육군 사단장, 추락한 헬기에서 셀카 찍은 사연", "Link": "https://bbs.ruliweb.com/best/board/300143/read/66084485", "Views": "21400", "Comments": "64", "Time": "17:40"},
        {"Title": "중국 붕괴론자들의 최근 근황", "Link": "https://bbs.ruliweb.com/best/board/300143/read/66084486", "Views": "38900", "Comments": "120", "Time": "17:20"},
        {"Title": "스마트폰 가격이 점점 비싸지는 핵심적인 이유", "Link": "https://bbs.ruliweb.com/best/board/300143/read/66084487", "Views": "18000", "Comments": "55", "Time": "17:00"},
        {"Title": "야겜 업계의 나쁜 문화와 폐단", "Link": "https://bbs.ruliweb.com/best/board/300143/read/66084488", "Views": "44200", "Comments": "188", "Time": "16:45"},
        {"Title": "현대차 vs BYD 캐삭빵 최종 결론.jpg", "Link": "https://bbs.ruliweb.com/best/board/300143/read/66084489", "Views": "51200", "Comments": "299", "Time": "16:30"},
        {"Title": "켄이치 작가가 독자에게 던진 엄청난 충격의 메시지", "Link": "https://bbs.ruliweb.com/best/board/300143/read/66084490", "Views": "27000", "Comments": "82", "Time": "16:15"},
        {"Title": "일본인들이 한국 와서 감동받고 우는 진짜 이유", "Link": "https://bbs.ruliweb.com/best/board/300143/read/66084491", "Views": "33400", "Comments": "105", "Time": "15:55"}
    ],
    "Theqoo": [
        {"Title": "“쓰레기 줍기는 아동학대”라며 학교 고소...", "Link": "https://theqoo.net/hot/3231456789", "Views": "15600", "Comments": "432", "Time": "20:05"},
        {"Title": "뉴진스 카피 관련 민희진 인터뷰 내용", "Link": "https://theqoo.net/hot/3231467890", "Views": "89000", "Comments": "1200", "Time": "19:20"},
        {"Title": "스타벅스 프리퀀시 대란 최근 현황", "Link": "https://theqoo.net/hot/3231478901", "Views": "34000", "Comments": "510", "Time": "18:40"},
        {"Title": "일본 방구석 예능 방송보다 깜짝 놀란 사연", "Link": "https://theqoo.net/hot/3231489012", "Views": "22000", "Comments": "180", "Time": "18:15"},
        {"Title": "요즘 10대들 사이에서 난리 났다는 신상 디저트", "Link": "https://theqoo.net/hot/3231490123", "Views": "41000", "Comments": "720", "Time": "17:50"},
        {"Title": "연예인 공항 출국길 직찍 모음", "Link": "https://theqoo.net/hot/3231501234", "Views": "29000", "Comments": "350", "Time": "17:25"},
        {"Title": "아이폰 신기능 업데이트 해외 리뷰 요약", "Link": "https://theqoo.net/hot/3231512345", "Views": "18000", "Comments": "120", "Time": "17:00"},
        {"Title": "독서실 총무가 빌런 참교육한 후기.txt", "Link": "https://theqoo.net/hot/3231523456", "Views": "53000", "Comments": "890", "Time": "16:40"},
        {"Title": "유튜브 알고리즘에 지배당한 한국인들", "Link": "https://theqoo.net/hot/3231534567", "Views": "67000", "Comments": "940", "Time": "16:15"},
        {"Title": "편의점 알바 중 마주친 귀여운 강아지", "Link": "https://theqoo.net/hot/3231545678", "Views": "25000", "Comments": "210", "Time": "15:50"},
        {"Title": "런닝맨 시청률 반등 비결 리포트", "Link": "https://theqoo.net/hot/3231556789", "Views": "16000", "Comments": "95", "Time": "15:30"},
        {"Title": "외국인들이 뽑은 가장 아름다운 서울 야경 스팟", "Link": "https://theqoo.net/hot/3231667890", "Views": "38000", "Comments": "280", "Time": "15:05"},
        {"Title": "다이어트 도시락 3주 동안 먹은 솔직 후기", "Link": "https://theqoo.net/hot/3231778901", "Views": "21000", "Comments": "175", "Time": "14:40"},
        {"Title": "인기 한강 피크닉 텐트 대여 꿀팁", "Link": "https://theqoo.net/hot/3231889012", "Views": "19000", "Comments": "86", "Time": "14:15"},
        {"Title": "오늘 자 트위터 실시간 트렌드 분석", "Link": "https://theqoo.net/hot/3231990123", "Views": "49000", "Comments": "640", "Time": "13:50"}
    ],
    "Bobae Dream": [
        {"Title": "오늘 대구 찾은 이재명 대통령", "Link": "https://www.bobaedream.co.kr/view?code=best&No=712345", "Comments": "890", "Votes": "2300", "Time": "1시간 전"},
        {"Title": "아파트 주차 통로 막아버린 역대급 외제차", "Link": "https://www.bobaedream.co.kr/view?code=best&No=712346", "Comments": "450", "Votes": "1200", "Time": "2시간 전"},
        {"Title": "고속도로 2차로 음주운전 사고 목격자 블랙박스", "Link": "https://www.bobaedream.co.kr/view?code=best&No=712347", "Comments": "150", "Votes": "800", "Time": "3시간 전"},
        {"Title": "강남 한복판 꼬리물기 참교육한 버스 기사님", "Link": "https://www.bobaedream.co.kr/view?code=best&No=712348", "Comments": "320", "Votes": "1750", "Time": "4시간 전"},
        {"Title": "500원짜리 동전으로 고속도로 통행료 내는 양심불량", "Link": "https://www.bobaedream.co.kr/view?code=best&No=712349", "Comments": "95", "Votes": "420", "Time": "5시간 전"},
        {"Title": "중고차 매장 허위매물 사기꾼 경찰 현장 체포", "Link": "https://www.bobaedream.co.kr/view?code=best&No=712350", "Comments": "610", "Votes": "3200", "Time": "6시간 전"},
        {"Title": "최근 출시된 패밀리 SUV 시승 소감 요약", "Link": "https://www.bobaedream.co.kr/view?code=best&No=712351", "Comments": "84", "Votes": "310", "Time": "7시간 전"},
        {"Title": "운전 중 덤프트럭 낙하물 피한 레전드 반사신경", "Link": "https://www.bobaedream.co.kr/view?code=best&No=712352", "Comments": "175", "Votes": "980", "Time": "8시간 전"},
        {"Title": "경차 자리에 주차한 고급 대형 세단 빌런", "Link": "https://www.bobaedream.co.kr/view?code=best&No=712353", "Comments": "220", "Votes": "1040", "Time": "9시간 전"},
        {"Title": "요즘 유행한다는 셀프 세차장 야간 번개 모임", "Link": "https://www.bobaedream.co.kr/view?code=best&No=712354", "Comments": "50", "Votes": "180", "Time": "10시간 전"},
        {"Title": "도로 위에서 시비 거는 오토바이 참교육 블랙박스", "Link": "https://www.bobaedream.co.kr/view?code=best&No=712355", "Comments": "430", "Votes": "2100", "Time": "11시간 전"},
        {"Title": "주유소 셀프 결제기에 현금 두고 간 사람 찾은 알바생", "Link": "https://www.bobaedream.co.kr/view?code=best&No=712356", "Comments": "75", "Votes": "620", "Time": "12시간 전"},
        {"Title": "전기차 충전 구역 장기 불법 방치 참교육 완료", "Link": "https://www.bobaedream.co.kr/view?code=best&No=712357", "Comments": "190", "Votes": "1350", "Time": "13시간 전"},
        {"Title": "골목길 스쿨존 어린이 튀어나온 급제동 레전드", "Link": "https://www.bobaedream.co.kr/view?code=best&No=712358", "Comments": "140", "Votes": "870", "Time": "14시간 전"},
        {"Title": "동네 주민들이 연합해 찾아낸 뺑소니 용의 차량", "Link": "https://www.bobaedream.co.kr/view?code=best&No=712359", "Comments": "280", "Votes": "1560", "Time": "15시간 전"}
    ],
    "DC Inside": [
        {"Title": "[실베] 오늘자 실베 레전드 ㅋㅋㅋㅋ", "Link": "https://gall.dcinside.com/board/view/?id=dcbest&no=123456", "Comments": "567", "Views": "42000", "Votes": "320", "Time": "20:45"},
        {"Title": "[싱글벙글] 한국 야구장 먹거리 최신 동향.jpg", "Link": "https://gall.dcinside.com/board/view/?id=dcbest&no=123457", "Comments": "120", "Views": "28000", "Votes": "150", "Time": "19:55"},
        {"Title": "[주갤] 당첨된 임대아파트 취소해버린 여시", "Link": "https://gall.dcinside.com/board/view/?id=dcbest&no=123458", "Comments": "890", "Views": "73000", "Votes": "1200", "Time": "19:15"},
        {"Title": "[야갤] 역대 최고 투수 투표 결과 ㄷㄷ", "Link": "https://gall.dcinside.com/board/view/?id=dcbest&no=123459", "Comments": "342", "Views": "31000", "Votes": "280", "Time": "18:40"},
        {"Title": "[새갤] [지선특집] 영국의 지방선거", "Link": "https://gall.dcinside.com/board/view/?id=dcbest&no=123460", "Comments": "86", "Views": "15000", "Votes": "95", "Time": "17:50"},
        {"Title": "[군갤] 전기는 까다로운 존재이다", "Link": "https://gall.dcinside.com/board/view/?id=dcbest&no=123461", "Comments": "190", "Views": "22000", "Votes": "170", "Time": "17:10"},
        {"Title": "[초개념] 요즘 초등학생들 노는 법 레전드", "Link": "https://gall.dcinside.com/board/view/?id=dcbest&no=123462", "Comments": "240", "Views": "38000", "Votes": "410", "Time": "16:30"},
        {"Title": "[수능갤] 올해 수능 난이도 여론조사 ㄷㄷ", "Link": "https://gall.dcinside.com/board/view/?id=dcbest&no=123463", "Comments": "512", "Views": "49000", "Votes": "620", "Time": "15:45"},
        {"Title": "[일러갤] AI가 그린 지하철 풍경 퀄리티", "Link": "https://gall.dcinside.com/board/view/?id=dcbest&no=123464", "Comments": "94", "Views": "19000", "Votes": "84", "Time": "15:10"},
        {"Title": "[컴갤] 견적 짜다 뇌절 온 대학생의 슬픔", "Link": "https://gall.dcinside.com/board/view/?id=dcbest&no=123465", "Comments": "130", "Views": "21000", "Votes": "115", "Time": "14:40"},
        {"Title": "[편갤] 편의점 폐기 음식 모아서 요리함", "Link": "https://gall.dcinside.com/board/view/?id=dcbest&no=123466", "Comments": "75", "Views": "16000", "Votes": "90", "Time": "14:15"},
        {"Title": "[영화갤] 역대 한국 영화 관객수 TOP 10", "Link": "https://gall.dcinside.com/board/view/?id=dcbest&no=123467", "Comments": "180", "Views": "27000", "Votes": "210", "Time": "13:50"},
        {"Title": "[식물갤] 베란다에서 키운 대왕 상추 수확", "Link": "https://gall.dcinside.com/board/view/?id=dcbest&no=123468", "Comments": "45", "Views": "11000", "Votes": "320", "Time": "13:10"},
        {"Title": "[연갤] 이번 신작 드라마 캐스팅 라인업 비하인드", "Link": "https://gall.dcinside.com/board/view/?id=dcbest&no=123469", "Comments": "95", "Views": "14000", "Votes": "64", "Time": "12:50"},
        {"Title": "[음식갤] 3시간 끓인 수제 돈코츠 라멘", "Link": "https://gall.dcinside.com/board/view/?id=dcbest&no=123470", "Comments": "165", "Views": "23000", "Votes": "199", "Time": "12:20"}
    ],
    "Clien": [
        {"Title": "LCK DNS는 정말 못하는군요.", "Link": "https://www.clien.net/service/board/park/18745612", "Comments": "56", "Time": "20:40"},
        {"Title": "한동훈 지지 자원봉사 쉼터 선관위 조사 중", "Link": "https://www.clien.net/service/board/park/18745613", "Comments": "124", "Time": "19:50"},
        {"Title": "아이패드 프로 M4 모델 사용 후기", "Link": "https://www.clien.net/service/board/park/18745614", "Comments": "42", "Time": "19:10"},
        {"Title": "독일 출장 중 마주친 현대 아이오닉 5", "Link": "https://www.clien.net/service/board/park/18745615", "Comments": "18", "Time": "18:30"},
        {"Title": "ChatGPT 4o 실생활 적용 예시 모음", "Link": "https://www.clien.net/service/board/park/18745616", "Comments": "64", "Time": "17:45"},
        {"Title": "최근 논란되는 아파트 헬스장 비매너 회원", "Link": "https://www.clien.net/service/board/park/18745617", "Comments": "89", "Time": "17:15"},
        {"Title": "스타벅스 리유저블 컵 품질 이슈 ㄷㄷ", "Link": "https://www.clien.net/service/board/park/18745618", "Comments": "35", "Time": "16:40"},
        {"Title": "쿠팡 로켓와우 해지 버튼 찾기 여정", "Link": "https://www.clien.net/service/board/park/18745619", "Comments": "50", "Time": "15:50"},
        {"Title": "주말 가족들과 함께 다녀온 남산 둘레길 코스", "Link": "https://www.clien.net/service/board/park/18745620", "Comments": "12", "Time": "15:20"},
        {"Title": "테슬라 모델 Y RWD 6개월 운행 전기세 정산", "Link": "https://www.clien.net/service/board/park/18745621", "Comments": "110", "Time": "14:40"},
        {"Title": "코로나 확진 격리 생활 생존 팁 방출", "Link": "https://www.clien.net/service/board/park/18745622", "Comments": "29", "Time": "14:15"},
        {"Title": "알리 천원마트에서 건진 가성비 드라이버 세트", "Link": "https://www.clien.net/service/board/park/18745623", "Comments": "45", "Time": "13:30"},
        {"Title": "넷기어 공유기 펌웨어 수동 업데이트 방법", "Link": "https://www.clien.net/service/board/park/18745624", "Comments": "15", "Time": "12:55"},
        {"Title": "서울 시내 괜찮은 수제버거집 리스트 공유", "Link": "https://www.clien.net/service/board/park/18745625", "Comments": "38", "Time": "12:15"},
        {"Title": "카카오톡 멀티프로필 악용 방지 건의", "Link": "https://www.clien.net/service/board/park/18745626", "Comments": "72", "Time": "11:40"}
    ],
    "Ppomppu": [
        {"Title": "[알리] 꽁돈대첩 역대급 할인 행사 모음", "Link": "https://www.ppomppu.co.kr/zboard/view.php?id=ppomppu&no=123456", "Comments": "156", "Time": "20:10"},
        {"Title": "[11번가] 아웃백 1만원 디지털 상품권 45% 할인", "Link": "https://www.ppomppu.co.kr/zboard/view.php?id=ppomppu&no=123457", "Comments": "210", "Time": "19:25"},
        {"Title": "[티몬] 삼다수 2L 12병 7,900원 무료배송", "Link": "https://www.ppomppu.co.kr/zboard/view.php?id=ppomppu&no=123458", "Comments": "422", "Time": "18:50"},
        {"Title": "[쿠팡] Apple 아이패드 에어 5세대 카드 할인 정보", "Link": "https://www.ppomppu.co.kr/zboard/view.php?id=ppomppu&no=123459", "Comments": "89", "Time": "18:15"},
        {"Title": "[네이버] 동원 마일드참치 100g 10캔 골라담기", "Link": "https://www.ppomppu.co.kr/zboard/view.php?id=ppomppu&no=123460", "Comments": "104", "Time": "17:40"},
        {"Title": "[G마켓] 스마일클럽 전용 스타벅스 쿠폰 대란", "Link": "https://www.ppomppu.co.kr/zboard/view.php?id=ppomppu&no=123461", "Comments": "188", "Time": "17:05"},
        {"Title": "[옥션] 크리넥스 안심 3겹 데코 화장지 30롤", "Link": "https://www.ppomppu.co.kr/zboard/view.php?id=ppomppu&no=123462", "Comments": "95", "Time": "16:25"},
        {"Title": "[위메프] 배스킨라빈스 패밀리 기프티콘 20% 세일", "Link": "https://www.ppomppu.co.kr/zboard/view.php?id=ppomppu&no=123463", "Comments": "74", "Time": "15:45"},
        {"Title": "[SSG] 신세계푸드 올반 꿔바로우 1.2kg 가성비 딜", "Link": "https://www.ppomppu.co.kr/zboard/view.php?id=ppomppu&no=123464", "Comments": "62", "Time": "15:10"},
        {"Title": "[하이마트] 삼성 무풍 에어컨 벽걸이 단품 최저가", "Link": "https://www.ppomppu.co.kr/zboard/view.php?id=ppomppu&no=123465", "Comments": "118", "Time": "14:35"},
        {"Title": "[GS SHOP] 동국제약 마데카 크림 홈쇼핑 구성 패키지", "Link": "https://www.ppomppu.co.kr/zboard/view.php?id=ppomppu&no=123466", "Comments": "50", "Time": "13:55"},
        {"Title": "[CJ온스타일] 비비고 만두 왕교자 1.05kg 4봉 묶음", "Link": "https://www.ppomppu.co.kr/zboard/view.php?id=ppomppu&no=123467", "Comments": "132", "Time": "13:15"},
        {"Title": "[AK몰] 블랙야크 아웃도어 바람막이 이월 특가", "Link": "https://www.ppomppu.co.kr/zboard/view.php?id=ppomppu&no=123468", "Comments": "48", "Time": "12:45"},
        {"Title": "[인터파크] 제주항공 편도 항공권 주말 노선 세일", "Link": "https://www.ppomppu.co.kr/zboard/view.php?id=ppomppu&no=123469", "Comments": "96", "Time": "12:10"},
        {"Title": "[LF몰] 닥스 남성 가죽 벨트 선물 포장 패키지", "Link": "https://www.ppomppu.co.kr/zboard/view.php?id=ppomppu&no=123470", "Comments": "27", "Time": "11:35"}
    ],
    "MLB Park": [
        {"Title": "오늘자 코스피 8000 돌파 ㄷㄷ", "Link": "https://mlbpark.donga.com/mp/b.php?b=bullpen&id=20260515001", "Views": "12000", "Time": "20:00"},
        {"Title": "메이저리그 류현진 완봉승 실시간 반응", "Link": "https://mlbpark.donga.com/mp/b.php?b=bullpen&id=20260515002", "Views": "34000", "Time": "19:15"},
        {"Title": "일본 성수동 핫플 관광객 인산인해 이유", "Link": "https://mlbpark.donga.com/mp/b.php?b=bullpen&id=20260515003", "Views": "19000", "Time": "18:40"},
        {"Title": "과거 선동열 감독의 전성기 시절 구속 체감", "Link": "https://mlbpark.donga.com/mp/b.php?b=bullpen&id=20260515004", "Views": "21000", "Time": "17:55"},
        {"Title": "대기업 신입사원 연봉 실수령액 실수 썰", "Link": "https://mlbpark.donga.com/mp/b.php?b=bullpen&id=20260515005", "Views": "45000", "Time": "17:10"},
        {"Title": "최근 넷플릭스 흑백요리사 셰프들 예약 폭주", "Link": "https://mlbpark.donga.com/mp/b.php?b=bullpen&id=20260515006", "Views": "28000", "Time": "16:30"},
        {"Title": "아파트 단지 내 비눗방울 놀이 예절 논란", "Link": "https://mlbpark.donga.com/mp/b.php?b=bullpen&id=20260515007", "Views": "16000", "Time": "15:50"},
        {"Title": "오타니 쇼헤이 연타석 홈런 실시간 하이라이트", "Link": "https://mlbpark.donga.com/mp/b.php?b=bullpen&id=20260515008", "Views": "51000", "Time": "15:10"},
        {"Title": "부모님 효도 관광지로 추천하는 온천 여행지", "Link": "https://mlbpark.donga.com/mp/b.php?b=bullpen&id=20260515009", "Views": "11000", "Time": "14:40"},
        {"Title": "국산 준중형 하이브리드 세단 1년 주행기", "Link": "https://mlbpark.donga.com/mp/b.php?b=bullpen&id=20260515010", "Views": "23000", "Time": "13:55"},
        {"Title": "이정후 메이저리그 3루타 현지 중계진 극찬", "Link": "https://mlbpark.donga.com/mp/b.php?b=bullpen&id=20260515011", "Views": "41000", "Time": "13:15"},
        {"Title": "최근 유행이라는 레트로 턴테이블 구매 완료", "Link": "https://mlbpark.donga.com/mp/b.php?b=bullpen&id=20260515012", "Views": "8000", "Time": "12:50"},
        {"Title": "주말 아침 한강 러닝 모임 10km 완주 후기", "Link": "https://mlbpark.donga.com/mp/b.php?b=bullpen&id=20260515013", "Views": "9500", "Time": "12:15"},
        {"Title": "스타벅스 이재명 대통령 언급 관련 추가 해프닝", "Link": "https://mlbpark.donga.com/mp/b.php?b=bullpen&id=20260515014", "Views": "64000", "Time": "11:40"},
        {"Title": "캠핑 입문자를 위한 필수 장비 체크리스트", "Link": "https://mlbpark.donga.com/mp/b.php?b=bullpen&id=20260515015", "Views": "13000", "Time": "11:00"}
    ],
    "Instiz": [
        {"Title": "일베 폐쇄 이준석 대표 반응 ㄷㄷ", "Link": "https://www.instiz.net/pt/7853964?green=1", "Comments": "179", "Views": "49305", "Time": "13:18"},
        {"Title": "간호사 머리 스타일 지적하는 직장 상사 꼽", "Link": "https://www.instiz.net/pt/7853941?green=1", "Comments": "100", "Views": "59222", "Time": "11:17"},
        {"Title": "카페에서 5800원짜리 시켰는데 내가 진상이야?", "Link": "https://www.instiz.net/pt/7853979?green=1", "Comments": "73", "Views": "47559", "Time": "14:34"},
        {"Title": "1인가구 살면서 이런 특성 있으면 축복임", "Link": "https://www.instiz.net/pt/7853987?green=1", "Comments": "68", "Views": "50303", "Time": "15:48"},
        {"Title": "최근 방탄 진이랑 분위기 닮았다는 배우 사진", "Link": "https://www.instiz.net/pt/7853986?green=1", "Comments": "59", "Views": "35159", "Time": "15:40"},
        {"Title": "아이돌 팬사인회 역대급 감동 일화", "Link": "https://www.instiz.net/pt/7853988?green=1", "Comments": "120", "Views": "28000", "Time": "16:05"},
        {"Title": "대학 축제 라인업 섭외 1순위 가수 단가", "Link": "https://www.instiz.net/pt/7853989?green=1", "Comments": "310", "Views": "82000", "Time": "16:20"},
        {"Title": "카카오톡 단톡방 몰래 나가기 기능 만족도", "Link": "https://www.instiz.net/pt/7853990?green=1", "Comments": "45", "Views": "19000", "Time": "16:45"},
        {"Title": "올해 올리브영 세일에서 꼭 쟁여야 할 템", "Link": "https://www.instiz.net/pt/7853991?green=1", "Comments": "86", "Views": "34000", "Time": "17:10"},
        {"Title": "친구 결혼식 축의금 액수 조율 기준 여론", "Link": "https://www.instiz.net/pt/7853992?green=1", "Comments": "250", "Views": "61000", "Time": "17:35"},
        {"Title": "집에서 만드는 스타벅스 돌체라떼 레시피", "Link": "https://www.instiz.net/pt/7853993?green=1", "Comments": "54", "Views": "23000", "Time": "18:00"},
        {"Title": "요즘 인스타 돋보기 도배되는 릴스 댄스 챌린지", "Link": "https://www.instiz.net/pt/7853994?green=1", "Comments": "92", "Views": "41000", "Time": "18:25"},
        {"Title": "룸메이트가 맨날 양말 뒤집어놓는 거 어떻게 해결해?", "Link": "https://www.instiz.net/pt/7853995?green=1", "Comments": "115", "Views": "39000", "Time": "18:50"},
        {"Title": "런던 여행가서 소매치기 잡은 한국인 용자 후기", "Link": "https://www.instiz.net/pt/7853996?green=1", "Comments": "130", "Views": "45000", "Time": "19:15"},
        {"Title": "가을 웜톤 착붙 립스틱 신상 발색 샷", "Link": "https://www.instiz.net/pt/7853997?green=1", "Comments": "38", "Views": "17000", "Time": "19:40"}
    ],
    "Inven": [
        {"Title": "가방 뒤적이던 손님 나가자 우르르 뛰쳐나간 장병들", "Link": "https://www.inven.co.kr/board/webzine/2097/2667193?my=chuchu", "Comments": "56", "Views": "28000", "Votes": "120", "Time": "20:30"},
        {"Title": "다시 한번 스타벅스 비판하는 이재명 대통령", "Link": "https://www.inven.co.kr/board/webzine/2097/2667152?my=chuchu", "Comments": "210", "Views": "45000", "Votes": "320", "Time": "19:45"},
        {"Title": "봉하마을까지 침투한 일베충들 만행", "Link": "https://www.inven.co.kr/board/webzine/2097/2667084?my=chuchu", "Comments": "189", "Views": "32000", "Votes": "210", "Time": "19:10"},
        {"Title": "군인아저씨 반갑다 손 흔들다 총 맞은 어린이 실화", "Link": "https://www.inven.co.kr/board/webzine/2097/2667034?my=chuchu", "Comments": "94", "Views": "19000", "Votes": "84", "Time": "18:40"},
        {"Title": "노무현 대통령 최고의 명문 운동회 축사", "Link": "https://www.inven.co.kr/board/webzine/2097/2666934?my=chuchu", "Comments": "104", "Views": "23000", "Votes": "410", "Time": "17:50"},
        {"Title": "이재명 대통령 故노무현 서거 17주기 추도사 전문", "Link": "https://www.inven.co.kr/board/webzine/2097/2666933?my=chuchu", "Comments": "350", "Views": "54000", "Votes": "890", "Time": "17:45"},
        {"Title": "광주 스타벅스 앞 1인 시위녀 정체 ㄷㄷ", "Link": "https://www.inven.co.kr/board/webzine/2097/2666914?my=chuchu", "Comments": "142", "Views": "29000", "Votes": "180", "Time": "17:15"},
        {"Title": "한동훈 비대위원장에 대해 꼭 잊지 말아야 할 역사", "Link": "https://www.inven.co.kr/board/webzine/2097/2666880?my=chuchu", "Comments": "288", "Views": "41000", "Votes": "530", "Time": "16:40"},
        {"Title": "에펨코리아 포텐 터짐 게시판 실시간 근황", "Link": "https://www.inven.co.kr/board/webzine/2097/2666873?my=chuchu", "Comments": "75", "Views": "16000", "Votes": "95", "Time": "16:30"},
        {"Title": "전국 초등학교 교사 커뮤니티 분노 폭발 상황", "Link": "https://www.inven.co.kr/board/webzine/2097/2666798?my=chuchu", "Comments": "165", "Views": "25000", "Votes": "310", "Time": "15:55"},
        {"Title": "LOL 롤 챔스 티원 젠지 결승전 해외 전문가 예측", "Link": "https://www.inven.co.kr/board/webzine/2097/2666600?my=chuchu", "Comments": "48", "Views": "13000", "Votes": "52", "Time": "15:20"},
        {"Title": "디아블로 4 신규 확장팩 직업 유출 반응", "Link": "https://www.inven.co.kr/board/webzine/2097/2666500?my=chuchu", "Comments": "96", "Views": "21000", "Votes": "76", "Time": "14:40"},
        {"Title": "가성비 게이밍 마우스 종결자 로지텍 G102 후기", "Link": "https://www.inven.co.kr/board/webzine/2097/2666400?my=chuchu", "Comments": "25", "Views": "9800", "Votes": "34", "Time": "14:15"},
        {"Title": "그래픽카드 RTX 4070 SUPER 타스 파스 벤치마크", "Link": "https://www.inven.co.kr/board/webzine/2097/2666300?my=chuchu", "Comments": "84", "Views": "17000", "Votes": "90", "Time": "13:30"},
        {"Title": "이름 모를 인디 명작 스팀 게임 추천 5선", "Link": "https://www.inven.co.kr/board/webzine/2097/2666200?my=chuchu", "Comments": "37", "Views": "11000", "Votes": "45", "Time": "12:50"}
    ],
    "HumorUniv": [
        {"Title": "아 진짜 좋은소식있음", "Link": "http://web.humoruniv.com/board/humor/read.html?table=pds&st=day&pg=0&number=1411274", "Comments": "103", "Views": "54222", "Votes": "1660", "Time": "12시간 전"},
        {"Title": "당연하지 게임 첫판부터 지게 만드는 법", "Link": "http://web.humoruniv.com/board/humor/read.html?table=pds&st=day&pg=0&number=1411265", "Comments": "39", "Views": "46573", "Votes": "804", "Time": "15시간 전"},
        {"Title": "오늘 자 웃대인들 카톡방 단합 레전드", "Link": "http://web.humoruniv.com/board/humor/read.html?table=pds&st=day&pg=0&number=1411280", "Comments": "52", "Views": "31000", "Votes": "520", "Time": "16시간 전"},
        {"Title": "한국 드라마 특징 완벽 요약한 짤.jpg", "Link": "http://web.humoruniv.com/board/humor/read.html?table=pds&st=day&pg=0&number=1411281", "Comments": "75", "Views": "28000", "Votes": "460", "Time": "17시간 전"},
        {"Title": "집에 혼자 있는데 초인종 소리 났을 때 대처", "Link": "http://web.humoruniv.com/board/humor/read.html?table=pds&st=day&pg=0&number=1411282", "Comments": "120", "Views": "42000", "Votes": "790", "Time": "18시간 전"},
        {"Title": "소개팅 나가서 분위기 곱창 낸 썰.txt", "Link": "http://web.humoruniv.com/board/humor/read.html?table=pds&st=day&pg=0&number=1411283", "Comments": "94", "Views": "25000", "Votes": "380", "Time": "19시간 전"},
        {"Title": "요즘 마트 푸드코트 근황 퀄리티 ㄷㄷ", "Link": "http://web.humoruniv.com/board/humor/read.html?table=pds&st=day&pg=0&number=1411284", "Comments": "41", "Views": "19000", "Votes": "310", "Time": "20시간 전"},
        {"Title": "피자 배달 왔는데 배달원이 한 감동의 행동", "Link": "http://web.humoruniv.com/board/humor/read.html?table=pds&st=day&pg=0&number=1411285", "Comments": "86", "Views": "34000", "Votes": "980", "Time": "21시간 전"},
        {"Title": "아재들이 환장한다는 고속도로 휴게소 꿀맛 메뉴", "Link": "http://web.humoruniv.com/board/humor/read.html?table=pds&st=day&pg=0&number=1411286", "Comments": "130", "Views": "39000", "Votes": "840", "Time": "22시간 전"},
        {"Title": "과거 90년대 문방구 뽑기 1등 상품의 위엄", "Link": "http://web.humoruniv.com/board/humor/read.html?table=pds&st=day&pg=0&number=1411287", "Comments": "27", "Views": "12000", "Votes": "150", "Time": "23시간 전"},
        {"Title": "여동생 몰래 치킨 다 먹었다가 당한 보복", "Link": "http://web.humoruniv.com/board/humor/read.html?table=pds&st=day&pg=0&number=1411288", "Comments": "115", "Views": "29000", "Votes": "610", "Time": "1일 전"},
        {"Title": "외국어 공부 3달 만에 마스터하는 기적의 암기법", "Link": "http://web.humoruniv.com/board/humor/read.html?table=pds&st=day&pg=0&number=1411289", "Comments": "80", "Views": "22000", "Votes": "420", "Time": "1일 전"},
        {"Title": "군대 행군 도중 먹은 오이 맛을 잊지 못하는 이유", "Link": "http://web.humoruniv.com/board/humor/read.html?table=pds&st=day&pg=0&number=1411290", "Comments": "64", "Views": "17000", "Votes": "380", "Time": "1일 전"},
        {"Title": "스마트폰 블루라이트 차단 필름의 실체 요약", "Link": "http://web.humoruniv.com/board/humor/read.html?table=pds&st=day&pg=0&number=1411291", "Comments": "45", "Views": "15000", "Votes": "210", "Time": "2일 전"},
        {"Title": "동네 길고양이들이 나를 집사로 간택한 과정", "Link": "http://web.humoruniv.com/board/humor/read.html?table=pds&st=day&pg=0&number=1411292", "Comments": "199", "Views": "48000", "Votes": "1250", "Time": "2일 전"}
    ],
    "TodayHumor": [
        {"Title": "스타벅스 냅킨에 그림그리는걸로 유명하던 작가 근황", "Link": "http://www.todayhumor.co.kr/board/view.php?table=bestofbest&no=482947&s_no=482947&page=1", "Comments": "2", "Views": "3995", "Votes": "93", "Time": "13시간 전"},
        {"Title": "스벅 골수들이라..", "Link": "http://www.todayhumor.co.kr/board/view.php?table=bestofbest&no=482946&s_no=482946&page=1", "Comments": "13", "Views": "3707", "Votes": "92", "Time": "16시간 전"},
        {"Title": "댕댕이 발바닥 꼬순내 유발 물질 정체 밝혀짐", "Link": "http://www.todayhumor.co.kr/board/view.php?table=bestofbest&no=482945&s_no=482945&page=1", "Comments": "5", "Views": "4200", "Votes": "87", "Time": "17시간 전"},
        {"Title": "우리가 껌을 씹을 때 발생하는 뇌파의 놀라운 변화", "Link": "http://www.todayhumor.co.kr/board/view.php?table=bestofbest&no=482944&s_no=482944&page=1", "Comments": "12", "Views": "2800", "Votes": "64", "Time": "18시간 전"},
        {"Title": "역대급 폭소 터지는 트위터 번역 드립 모음", "Link": "http://www.todayhumor.co.kr/board/view.php?table=bestofbest&no=482943&s_no=482943&page=1", "Comments": "18", "Views": "3100", "Votes": "75", "Time": "19시간 전"},
        {"Title": "스웨덴 사람들이 Fika 피카 타임을 중요시하는 이유", "Link": "http://www.todayhumor.co.kr/board/view.php?table=bestofbest&no=482942&s_no=482942&page=1", "Comments": "7", "Views": "1900", "Votes": "41", "Time": "20시간 전"},
        {"Title": "과거 한국 만화 대여점 대홍수 시절 추억 여행", "Link": "http://www.todayhumor.co.kr/board/view.php?table=bestofbest&no=482941&s_no=482941&page=1", "Comments": "24", "Views": "5400", "Votes": "120", "Time": "21시간 전"},
        {"Title": "컴퓨터에 커피 쏟았을 때 진짜 살려내는 방법", "Link": "http://www.todayhumor.co.kr/board/view.php?table=bestofbest&no=482940&s_no=482940&page=1", "Comments": "35", "Views": "6700", "Votes": "188", "Time": "22시간 전"},
        {"Title": "시골 할머니 댁 앞마당에 출몰한 대형 멧돼지 소동", "Link": "http://www.todayhumor.co.kr/board/view.php?table=bestofbest&no=482939&s_no=482939&page=1", "Comments": "14", "Views": "2300", "Votes": "80", "Time": "23시간 전"},
        {"Title": "외국 마트에서 한국 컵라면을 고르는 현지인들 직찍", "Link": "http://www.todayhumor.co.kr/board/view.php?table=bestofbest&no=482938&s_no=482938&page=1", "Comments": "9", "Views": "1600", "Votes": "52", "Time": "1일 전"},
        {"Title": "해외 직구 피규어 세관 통과 1주일 동안 대기 썰", "Link": "http://www.todayhumor.co.kr/board/view.php?table=bestofbest&no=482937&s_no=482937&page=1", "Comments": "11", "Views": "2900", "Votes": "73", "Time": "1일 전"},
        {"Title": "고대 로마 시대의 미라 발굴단 다큐 요약 정리", "Link": "http://www.todayhumor.co.kr/board/view.php?table=bestofbest&no=482936&s_no=482936&page=1", "Comments": "31", "Views": "4900", "Votes": "165", "Time": "1일 전"},
        {"Title": "세계적인 건축 거장이 설계한 초호화 리조트 풍경", "Link": "http://www.todayhumor.co.kr/board/view.php?table=bestofbest&no=482935&s_no=482935&page=1", "Comments": "3", "Views": "1500", "Votes": "45", "Time": "1일 전"},
        {"Title": "집단 지성으로 해결한 자취방 곰팡이 퇴치 대작전", "Link": "http://www.todayhumor.co.kr/board/view.php?table=bestofbest&no=482934&s_no=482934&page=1", "Comments": "19", "Views": "3800", "Votes": "104", "Time": "2일 전"},
        {"Title": "어느 고양이 집사의 처절한 발톱 깎기 현장 보고", "Link": "http://www.todayhumor.co.kr/board/view.php?table=bestofbest&no=482933&s_no=482933&page=1", "Comments": "45", "Views": "8000", "Votes": "320", "Time": "2일 전"}
    ],
    "Wygosu": [
        {"Title": "개숭용 나가 (2일차SSG 감독 경질론)", "Link": "https://ygosu.com/board/real_article/baseball/211539/?type=group0", "Comments": "13", "Views": "1012", "Votes": "6", "Time": "11:39"},
        {"Title": "그분이 저를 헬스장에서 자꾸 따라하는 이유.txt", "Link": "https://ygosu.com/board/real_article/sports/112826/?type=group0", "Comments": "17", "Views": "1843", "Votes": "8", "Time": "11:15"},
        {"Title": "미장 미국 주식 투자해놓은거 한 두달째 안보는 중", "Link": "https://ygosu.com/board/real_article/stock/69451/?type=group0", "Comments": "4", "Views": "3774", "Votes": "6", "Time": "09:17"},
        {"Title": "미장 초 단타 그저께 먹은거 다 개아내고 Howoo", "Link": "https://ygosu.com/board/real_article/stock/69450/?type=group0", "Comments": "5", "Views": "1692", "Votes": "4", "Time": "09:17"},
        {"Title": "11년생 남자의 도발을 받아치는 엔믹스 오해원", "Link": "https://ygosu.com/board/real_article/stars/202824/?type=group0", "Comments": "2", "Views": "3648", "Votes": "6", "Time": "09:14"},
        {"Title": "유튜브에 뜬 3대 500 치는 헬스 할아버지 피지컬", "Link": "https://ygosu.com/board/real_article/sports/112827/?type=group0", "Comments": "25", "Views": "5422", "Votes": "19", "Time": "08:50"},
        {"Title": "서울 근교 드라이브 코스로 좋은 백운호수 근황", "Link": "https://ygosu.com/board/real_article/travel/45612/?type=group0", "Comments": "6", "Views": "2100", "Votes": "5", "Time": "08:15"},
        {"Title": "넷플릭스 삼체 원작 소설과 드라마 비교 분석", "Link": "https://ygosu.com/board/real_article/movie/12456/?type=group0", "Comments": "31", "Views": "4200", "Votes": "15", "Time": "07:40"},
        {"Title": "가을 맞이 방 정리하다가 발견한 고전 닌텐도 칩", "Link": "https://ygosu.com/board/real_article/game/184512/?type=group0", "Comments": "19", "Views": "3100", "Votes": "11", "Time": "07:05"},
        {"Title": "동네 맛집 탕수육 바삭하게 튀기는 비밀 알아냄", "Link": "https://ygosu.com/board/real_article/food/89456/?type=group0", "Comments": "42", "Views": "6700", "Votes": "28", "Time": "06:30"},
        {"Title": "토트넘 홋스퍼 경기 후 포스테코글루 감독 인터뷰", "Link": "https://ygosu.com/board/real_article/soccer/984512/?type=group0", "Comments": "89", "Views": "12000", "Votes": "45", "Time": "05:55"},
        {"Title": "오늘 자 코스닥 코스피 주가 변동 요약 정리", "Link": "https://ygosu.com/board/real_article/stock/69452/?type=group0", "Comments": "7", "Views": "2800", "Votes": "9", "Time": "05:10"},
        {"Title": "가성비 무선 이어폰 QCY 신작 한달 사용기", "Link": "https://ygosu.com/board/real_article/it/15612/?type=group0", "Comments": "11", "Views": "1900", "Votes": "7", "Time": "04:35"},
        {"Title": "고양이 장난감 마따따비 가루 취했을 때 리얼 반응", "Link": "https://ygosu.com/board/real_article/animal/56123/?type=group0", "Comments": "15", "Views": "3800", "Votes": "22", "Time": "03:50"},
        {"Title": "스마트스토어 첫 매출 발생한 직장인 기쁨의 춤", "Link": "https://ygosu.com/board/real_article/free/1545612/?type=group0", "Comments": "64", "Views": "9500", "Votes": "37", "Time": "03:10"}
    ],
    "82Cook": [
        {"Title": "명동에 사람 엄청 많네요 관광객 인산인해", "Link": "https://www.82cook.com/enterview.php?g_id=none&g_target=top&no=982525", "Views": "2045", "Time": "20:55"},
        {"Title": "기대를 저버리지 않는 자식놈의 반항 썰", "Link": "https://www.82cook.com/enterview.php?g_id=none&g_target=top&no=982524", "Views": "2077", "Time": "20:51"},
        {"Title": "5.18 민주화운동 가짜뉴스 대처하는 부모들의 자세", "Link": "https://www.82cook.com/enterview.php?g_id=none&g_target=top&no=982522", "Views": "1277", "Time": "20:49"},
        {"Title": "대기업 프랜차이즈 빵집 골목상권 침해 논란", "Link": "https://www.82cook.com/enterview.php?g_id=none&g_target=top&no=982526", "Views": "606", "Time": "20:47"},
        {"Title": "최근 남편 직장 상사 집들이 다녀와서 느낀 점", "Link": "https://www.82cook.com/enterview.php?g_id=none&g_target=top&no=982523", "Views": "1011", "Time": "20:46"},
        {"Title": "우리 딸 사춘기 극복하게 도와준 상담 일지", "Link": "https://www.82cook.com/enterview.php?g_id=none&g_target=top&no=982527", "Views": "2788", "Time": "20:40"},
        {"Title": "최근 홈쇼핑에서 지른 압력솥 밥맛 후기", "Link": "https://www.82cook.com/enterview.php?g_id=none&g_target=top&no=982528", "Views": "1840", "Time": "20:35"},
        {"Title": "강아지 사료 바꿨더니 눈물자국 없어졌어요", "Link": "https://www.82cook.com/enterview.php?g_id=none&g_target=top&no=982529", "Views": "1505", "Time": "20:30"},
        {"Title": "시댁 추석 명절 음식 준비 분담 어떻게 하세요?", "Link": "https://www.82cook.com/enterview.php?g_id=none&g_target=top&no=982530", "Views": "2805", "Time": "20:25"},
        {"Title": "고등학교 동창 모임 나갔다가 현타 온 후기", "Link": "https://www.82cook.com/enterview.php?g_id=none&g_target=top&no=982531", "Views": "1972", "Time": "20:20"},
        {"Title": "백화점 문화센터 요리 강좌 가을학기 수강생 모집", "Link": "https://www.82cook.com/enterview.php?g_id=none&g_target=top&no=982532", "Views": "2323", "Time": "20:15"},
        {"Title": "자취하는 아들 반찬 배달 추천 메뉴 목록", "Link": "https://www.82cook.com/enterview.php?g_id=none&g_target=top&no=982533", "Views": "1969", "Time": "20:10"},
        {"Title": "요즘 젊은 엄마들 사이에서 도는 조기교육 트렌드", "Link": "https://www.82cook.com/enterview.php?g_id=none&g_target=top&no=982534", "Views": "1716", "Time": "20:05"},
        {"Title": "오래된 아파트 리모델링 욕실 공사 견적 후기", "Link": "https://www.82cook.com/enterview.php?g_id=none&g_target=top&no=982535", "Views": "1159", "Time": "20:00"},
        {"Title": "가을 맞이 베란다 정리 다육이 화분들 정비", "Link": "https://www.82cook.com/enterview.php?g_id=none&g_target=top&no=982536", "Views": "2035", "Time": "19:55"}
    ],
    "Etoland": [
        {"Title": "정용진 신세계 부회장, 대국민 사과문 전격 발표", "Link": "https://etoland.co.kr/hit/etohumor07/view/%EC%A0%95%EC%9A%A9%EC%A7%84-26%EC%9D%BC-%EB%8C%80%EA%B5%AD%EB%AF%BC-%EC%82%AC%EA%B3%BC%EB%AC%B8-%EB%B0%9C%ED%91%9C-9064411", "Comments": "35", "Votes": "38", "Views": "2045", "Time": "44분 전"},
        {"Title": "이지원 치어리더 대기실 직캠 오빠들 다 내꺼", "Link": "https://etoland.co.kr/hit/infl/view/%EC%9D%B4%EC%A7%80%EC%9B%90-%EC%B9%98%EC%96%B4%EB%A6%AC%EB%8D%94-%EC%98%A4%EB%B9%A0%EB%93%A4-%EB%8B%A4-%EB%82%B4%EA%BA%BC%EB%A1%9C-%EB%A7%8C%EB%93%A4%EA%BA%BC%EC%95%BC-9062098", "Comments": "14", "Votes": "20", "Views": "1972", "Time": "1시간 전"},
        {"Title": "대통령이 일베 사이트에 직접 칼을 빼 들었다", "Link": "https://etoland.co.kr/hit/sisabbs01/view/%EB%8C%80%ED%86%B5%EB%A0%B9%EC%9D%B4-%EC%9D%BC%EB%B2%A0%EC%97%90-%EC%B9%BC%EC%9D%84-%EB%B9%BC-%EB%93%A4%EC%97%88%EA%B5%B0%EC%9A%94-9064049", "Comments": "17", "Votes": "57", "Views": "1277", "Time": "55분 전"},
        {"Title": "리큐 실내건조 세탁세제 2L 4개 핫딜 떳다", "Link": "https://etoland.co.kr/hit/hotdeal/view/%EB%A6%AC%ED%81%90-%EC%8B%A4%EB%82%B4%EA%B1%B4%EC%A1%B0-%EC%84%B8%ED%83%81%EC%84%B8%EC%A0%9C-2l-4%EA%B0%9C-9061717", "Comments": "37", "Votes": "34", "Views": "606", "Time": "56분 전"},
        {"Title": "민주당 김용남 윤리감찰 조국혁신당에 맹비난", "Link": "https://etoland.co.kr/hit/sisabbs01/view/%EB%AF%BC%EC%A3%BC%EB%8B%B9-9064247", "Comments": "13", "Votes": "32", "Views": "1011", "Time": "1시간 전"},
        {"Title": "취사병 전설이 되다 네이버 웹툰 최근 기대 히로인", "Link": "https://etoland.co.kr/hit/etohumor07/view/%EC%B7%A8%EC%82%AC%EB%B3%91-%EC%A0%84%EC%84%A4%EC%9D%B4-%EB%90%98%EB%8B%A4-9062089", "Comments": "7", "Votes": "16", "Views": "2788", "Time": "1시간 전"},
        {"Title": "1열 쌩눈으로 직접 본 에스파 카리나 미모", "Link": "https://etoland.co.kr/hit/star02/view/1%EC%97%B4-9064106", "Comments": "11", "Votes": "21", "Views": "1840", "Time": "1시간 전"},
        {"Title": "비단잉어 먹이 뺏어 먹는 새끼 백조 커여움.gif", "Link": "https://etoland.co.kr/hit/etohumor07/view/%EB%B9%84%EB%8B%A8%EC%9E%89%EC%96%B4-9062477", "Comments": "14", "Votes": "27", "Views": "1505", "Time": "1시간 전"},
        {"Title": "산후조리원 새로운 맘충의 탄생 썰 ㄷㄷ", "Link": "https://etoland.co.kr/hit/etohumor07/view/%EC%83%88%EB%A1%9C%EC%9A%B4-9064344", "Comments": "29", "Votes": "33", "Views": "2805", "Time": "1시간 전"},
        {"Title": "점심 급식 배식 준비하는 고등학교 급식실", "Link": "https://etoland.co.kr/hit/etohumor07/view/%EC%A0%90%EC%8B%AC-9061610", "Comments": "12", "Votes": "37", "Views": "2323", "Time": "1시간 전"},
        {"Title": "파멸적인 섹시함 치파오 서나앙 밑캠 직캠", "Link": "https://etoland.co.kr/hit/infl/view/%ED%8C%A8%EB%A9%B8-9061171", "Comments": "7", "Votes": "23", "Views": "1969", "Time": "1시간 전"},
        {"Title": "오늘 자 프로야구 정규 시즌 실시간 순위 리스트", "Link": "https://etoland.co.kr/hit/freebbs/view/%EC%98%A4%EB%8A%98-9064366", "Comments": "18", "Votes": "24", "Views": "1716", "Time": "1시간 전"},
        {"Title": "요즘 젊은이들이 꼰대 조언 듣기 극도로 혐오하는 이유", "Link": "https://etoland.co.kr/hit/freebbs/view/%EC%9A%94%EC%A6%98-9064419", "Comments": "38", "Votes": "31", "Views": "1675", "Time": "1시간 전"},
        {"Title": "청소년들이 타투 하고 나서 100% 뼈저리게 후회하는 부위", "Link": "https://etoland.co.kr/hit/etohumor07/view/%EC%B2%AD%EC%86%8C%EB%85%84-9064343", "Comments": "20", "Votes": "19", "Views": "4050", "Time": "1시간 전"},
        {"Title": "스타벅스 정용진 사과 논란 익명 게시판 여론", "Link": "https://etoland.co.kr/hit/anony1/view/%EC%9D%B4-9061878", "Comments": "12", "Votes": "11", "Views": "1238", "Time": "1시간 전"}
    ],
    "Reddit": [
        {"Title": "[Korea] What are the best hidden gems to visit in Seoul?", "Link": "https://www.reddit.com/r/korea/comments/1d34567/what_are_the_best_hidden_gems_to_visit_in_seoul/", "Comments": "142", "Votes": "890", "Time": "2026-05-24"},
        {"Title": "[Finance] Korean Kospi index sets record highs", "Link": "https://www.reddit.com/r/korea/comments/1d34568/korean_kospi_index_sets_record_highs/", "Comments": "50", "Votes": "420", "Time": "2026-05-24"},
        {"Title": "[Culture] Understanding the modern Cafe Culture in South Korea", "Link": "https://www.reddit.com/r/korea/comments/1d34569/understanding_the_modern_cafe_culture_in_south_korea/", "Comments": "86", "Votes": "310", "Time": "2026-05-24"},
        {"Title": "[Tech] Samsung announces new AI-powered household devices", "Link": "https://www.reddit.com/r/korea/comments/1d34570/samsung_announces_new_aipowered_household_devices/", "Comments": "94", "Votes": "520", "Time": "2026-05-24"},
        {"Title": "[Travel] Beautiful fall foliage spots in Seoraksan National Park", "Link": "https://www.reddit.com/r/korea/comments/1d34571/beautiful_fall_foliage_spots_in_seoraksan_national_park/", "Comments": "35", "Votes": "210", "Time": "2026-05-24"},
        {"Title": "[K-Pop] NewJeans achieves perfect all-kill on charts with new album", "Link": "https://www.reddit.com/r/korea/comments/1d34572/newjeans_achieves_perfect_allkill_on_charts_with_new_album/", "Comments": "310", "Votes": "1560", "Time": "2026-05-24"},
        {"Title": "[News] South Korea extends temporary visa-free entry for transit tourists", "Link": "https://www.reddit.com/r/korea/comments/1d34573/south_korea_extends_temporary_visafree_entry_for_transit_tourists/", "Comments": "75", "Votes": "280", "Time": "2026-05-24"},
        {"Title": "[Food] Best Korean street food stalls in Gwangjang Market", "Link": "https://www.reddit.com/r/korea/comments/1d34574/best_korean_street_food_stalls_in_gwangjang_market/", "Comments": "115", "Votes": "620", "Time": "2026-05-24"},
        {"Title": "[Education] The intense pressure of the college entrance exam (Suneung)", "Link": "https://www.reddit.com/r/korea/comments/1d34575/the_intense_pressure_of_the_college_entrance_exam_suneung/", "Comments": "220", "Votes": "1040", "Time": "2026-05-24"},
        {"Title": "[Life] Hiking Bukhansan: A guide for expats in Seoul", "Link": "https://www.reddit.com/r/korea/comments/1d34576/hiking_bukhansan_a_guide_for_expats_in_seoul/", "Comments": "48", "Votes": "199", "Time": "2026-05-24"},
        {"Title": "[Policy] Seoul Metropolitan Government launches new river bus service", "Link": "https://www.reddit.com/r/korea/comments/1d34577/seoul_metropolitan_government_launches_new_river_bus_service/", "Comments": "64", "Votes": "150", "Time": "2026-05-24"},
        {"Title": "[History] Tracing the ancient walls of Hanyangdoseong in autumn", "Link": "https://www.reddit.com/r/korea/comments/1d34578/tracing_the_ancient_walls_of_hanyangdoseong_in_autumn/", "Comments": "19", "Votes": "180", "Time": "2026-05-24"},
        {"Title": "[Economy] Hyundai Motor Group breaks sales records in American market", "Link": "https://www.reddit.com/r/korea/comments/1d34579/hyundai_motor_group_breaks_sales_records_in_american_market/", "Comments": "130", "Votes": "870", "Time": "2026-05-24"},
        {"Title": "[Culture] Traditional Hanok village stay: expectations vs reality", "Link": "https://www.reddit.com/r/korea/comments/1d34580/traditional_hanok_village_stay_expectations_vs_reality/", "Comments": "92", "Votes": "430", "Time": "2026-05-24"},
        {"Title": "[Design] DDP Dongdaemun Design Plaza hosts new lighting festival", "Link": "https://www.reddit.com/r/korea/comments/1d34581/ddp_dongdaemun_design_plaza_hosts_new_lighting_festival/", "Comments": "27", "Votes": "120", "Time": "2026-05-24"}
    ],
    "Naver News": [
        {"Title": "한국은행, 기준금리 0.25%p 인하 전격 결정", "Link": "https://news.naver.com/", "Views": "54200", "Comments": "1230", "Time": "1시간 전"},
        {"Title": "삼성전자, 6세대 HBM 양산 본격화 선언", "Link": "https://news.naver.com/", "Views": "42100", "Comments": "850", "Time": "2시간 전"}
    ],
    "Daum News": [
        {"Title": "카카오모빌리티, 자율주행 택시 시범 서비스 확대", "Link": "https://news.daum.net/", "Views": "38000", "Comments": "540", "Time": "1시간 전"},
        {"Title": "여의도 불꽃축제, 100만 인파 운집 예상", "Link": "https://news.daum.net/", "Views": "29000", "Comments": "420", "Time": "2시간 전"}
    ],
    "Nate News": [
        {"Title": "손흥민, 토트넘 재계약 협상 돌입 현지 보도", "Link": "https://news.nate.com/", "Views": "45000", "Comments": "670", "Time": "3시간 전"},
        {"Title": "환절기 독감 주의보... 예방접종 서둘러야", "Link": "https://news.nate.com/", "Views": "12000", "Comments": "110", "Time": "4시간 전"}
    ],
    "Yahoo US": [
        {"Title": "Federal Reserve signals potential rate cuts later this year", "Link": "https://news.yahoo.com/", "Views": "85000", "Comments": "2300", "Time": "1 hr ago"},
        {"Title": "Tech stocks rally as AI sector continues to surge", "Link": "https://news.yahoo.com/", "Views": "62000", "Comments": "1540", "Time": "2 hrs ago"}
    ],
    "Naver Blog": [
        {"Title": "오늘부터 1일! 100일 위젯 미션 도전합니다", "Link": "https://blog.naver.com/", "Views": "2050", "Comments": "45", "Time": "1시간 전"},
        {"Title": "주간 일기 챌린지 - 벌써 5월 마지막 주라니요", "Link": "https://blog.naver.com/", "Views": "1500", "Comments": "32", "Time": "2시간 전"},
        {"Title": "내돈내산 명동 한우 맛집 솔직 후기 대방출", "Link": "https://blog.naver.com/", "Views": "4200", "Comments": "18", "Time": "3시간 전"}
    ],
    "Google Blog": [
        {"Title": "Blogger updates: Custom themes and templates guide", "Link": "https://buzz.blogger.com/", "Views": "890", "Comments": "12", "Time": "2시간 전"},
        {"Title": "Top 10 travel hacks for digital nomads in 2026", "Link": "https://buzz.blogger.com/", "Views": "1200", "Comments": "25", "Time": "4시간 전"}
    ],
    "Tistory": [
        {"Title": "초보 개발자를 위한 Git 핵심 명령어 요약 정리집", "Link": "https://www.tistory.com/", "Views": "6800", "Comments": "89", "Time": "1시간 전"},
        {"Title": "제주도 서귀포 감성 숙소 베스트 3 추천", "Link": "https://www.tistory.com/", "Views": "3400", "Comments": "15", "Time": "2시간 전"}
    ]
};

const COMMUNITY_COLORS = {
    "FM Korea": "#5d7ad3",
    "Ruliweb": "#0054a6",
    "Theqoo": "#3b4a5d",
    "Bobae Dream": "#0068b7",
    "Clien": "#3b3b5c",
    "Ppomppu": "#9e9e9e",
    "DC Inside": "#29b6f6",
    "MLB Park": "#ff6d00",
    "Instiz": "#00c73c",
    "Inven": "#8bc34a",
    "HumorUniv": "#e91e63",
    "TodayHumor": "#546e7a",
    "Wygosu": "#424242",
    "82Cook": "#2e7d32",
    "Etoland": "#4caf50",
    "Naver News": "#03c75a",
    "Daum News": "#fee500",
    "Nate News": "#f04452",
    "Yahoo US": "#410093",
    "Naver Blog": "#03c75a",
    "Google Blog": "#ff5722",
    "Tistory": "#fc4c02"
};

const COMMUNITY_NAMES_MAP = {
    "FM Korea": "펨코",
    "Ruliweb": "루리",
    "Theqoo": "더쿠",
    "Bobae Dream": "보배",
    "Clien": "클량",
    "Ppomppu": "뽐뿌",
    "DC Inside": "디시",
    "MLB Park": "엠팍",
    "Instiz": "인티",
    "Inven": "인벤",
    "HumorUniv": "웃대",
    "TodayHumor": "오유",
    "Wygosu": "와고",
    "82Cook": "82쿡",
    "Etoland": "이토",
    "Reddit": "레딧",
    "Naver News": "네이버",
    "Daum News": "다음",
    "Nate News": "네이트",
    "Yahoo US": "야후",
    "Naver Blog": "N블로그",
    "Google Blog": "G블로그",
    "Tistory": "티스토리"
};

document.addEventListener('DOMContentLoaded', () => {
    // List of active unified community and news names
    const baseCommunities = [
        "DC Inside", "Ruliweb", "Theqoo", "Bobae Dream", 
        "Clien", "Ppomppu", "MLB Park", "Instiz", "Inven", 
        "HumorUniv", "TodayHumor", "Wygosu", "82Cook", "Etoland", "Reddit",
        "Naver News", "Daum News", "Nate News", "Yahoo US",
        "Naver Blog", "Google Blog", "Tistory"
    ];

    // Shuffle baseCommunities once per visit
    const randomizedCommunities = [...baseCommunities];
    for (let i = randomizedCommunities.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = randomizedCommunities[i];
        randomizedCommunities[i] = randomizedCommunities[j];
        randomizedCommunities[j] = temp;
    }

    // Rearrange top community tab buttons in DOM to match the randomized order and implement folding
    const communityTabsNav = document.getElementById('community-tabs');
    if (communityTabsNav) {
        const allBtn = communityTabsNav.querySelector('.tab-btn[data-community="all"]');
        let refNode = allBtn;
        randomizedCommunities.forEach(comm => {
            const btn = communityTabsNav.querySelector(`.tab-btn[data-community="${comm}"]`);
            if (btn && refNode) {
                refNode.after(btn);
                refNode = btn;
            }
        });

        // Add the "더보기" (More) button at the very end
        const moreBtn = document.createElement('button');
        moreBtn.className = 'tab-btn more-btn';
        moreBtn.id = 'tabs-more-btn';
        moreBtn.innerHTML = `더보기 <i data-lucide="chevron-down" style="width:12px; height:12px; display:inline-block; vertical-align:middle; margin-left:2px;"></i>`;
        
        moreBtn.style.backgroundColor = '#4a5568'; // Slate grey for distinct high-contrast look
        moreBtn.style.color = '#ffffff';
        moreBtn.style.borderColor = '#4a5568';
        moreBtn.style.opacity = '1';
        moreBtn.style.fontWeight = 'bold';
        
        communityTabsNav.appendChild(moreBtn);

        const allSiteBtns = Array.from(communityTabsNav.querySelectorAll('.tab-btn:not(#tabs-more-btn):not([data-community="all"])'));
        
        function collapseTabs() {
            allSiteBtns.forEach((btn, idx) => {
                // If it is the currently active tab, keep it visible!
                if (btn.classList.contains('active')) {
                    btn.style.display = 'inline-block';
                } else if (idx >= 8) { // Only show first 8 community buttons (plus "all" makes 9)
                    btn.style.display = 'none';
                } else {
                    btn.style.display = 'inline-block';
                }
            });
            moreBtn.innerHTML = `더보기 <i data-lucide="chevron-down" style="width:12px; height:12px; display:inline-block; vertical-align:middle; margin-left:2px;"></i>`;
            lucide.createIcons();
        }

        function expandTabs() {
            allSiteBtns.forEach(btn => {
                btn.style.display = 'inline-block';
            });
            moreBtn.innerHTML = `접기 <i data-lucide="chevron-up" style="width:12px; height:12px; display:inline-block; vertical-align:middle; margin-left:2px;"></i>`;
            lucide.createIcons();
        }

        let isExpanded = false;
        collapseTabs(); // Start collapsed

        moreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (isExpanded) {
                collapseTabs();
                isExpanded = false;
            } else {
                expandTabs();
                isExpanded = true;
            }
        });
    }

    let allPosts = [];
    let mixedPosts = [];
    let currentCommunity = 'all';
    let searchQuery = '';
    let visibleCount = 10;
    let currentViewMode = 'timeline';

    const postsList = document.getElementById('posts-list');
    const tabBtns = document.querySelectorAll('.tab-btn:not(#tabs-more-btn)');
    const categoryBtns = document.querySelectorAll('.category-btn');
    const searchInput = document.getElementById('post-search');

    // Apply community brand colors to mobile site tab buttons dynamically
    tabBtns.forEach(btn => {
        const comm = btn.dataset.community;
        let color = '#2b7de9'; // default blue
        if (comm === 'all') {
            color = '#38b2ac'; // beautiful teal for "전체"
        } else {
            color = COMMUNITY_COLORS[comm] || '#2b7de9';
        }
        
        btn.style.backgroundColor = color;
        btn.style.color = '#ffffff';
        btn.style.borderColor = color;
        
        if (btn.classList.contains('active')) {
            btn.style.opacity = '1';
            btn.style.transform = 'scale(1.03)';
            btn.style.boxShadow = '0 2px 6px rgba(0,0,0,0.15)';
        } else {
            btn.style.opacity = '0.55'; // dimmed for inactive
        }
    });
    const syncIcon = document.getElementById('sync-icon');
    const updateTimer = document.getElementById('update-timer');

    // Initialize Lucide icons
    lucide.createIcons();

    // Fetch Data
    async function fetchData() {
        if (syncIcon) syncIcon.classList.add('spin-icon');
        try {
            // Append timestamp to prevent caching so we get fresh data every 10 mins
            const response = await fetch('data.json?t=' + new Date().getTime());
            if (!response.ok) throw new Error('CORS or Network Error');
            const data = await response.json();
            processData(data);
        } catch (error) {
            console.warn('Fetch failed, using local data fallback.');
            if (window.LOCAL_DATA) {
                processData(window.LOCAL_DATA);
            } else {
                const localFallback = {
                    ...FALLBACK_DATA,
                    lastUpdated: new Date().toISOString()
                };
                processData(localFallback);
            }
        } finally {
            if (syncIcon) syncIcon.classList.remove('spin-icon');
        }
    }

    function parseTime(timeStr) {
        if (!timeStr) return 0;
        const now = new Date();
        
        // 1. "분 전", "분전", "mins ago", "min ago" 처리
        const minMatch = timeStr.match(/(\d+)\s*(?:분|min)/);
        if (minMatch) {
            const mins = parseInt(minMatch[1]) || 0;
            return now.getTime() - mins * 60000;
        }
        
        // 2. "시간 전", "시간전", "hrs ago", "hr ago" 처리
        const hourMatch = timeStr.match(/(\d+)\s*(?:시간|hr)/);
        if (hourMatch) {
            const hours = parseInt(hourMatch[1]) || 0;
            return now.getTime() - hours * 3600000;
        }

        // 3. "일 전", "일전", "days ago", "day ago" 처리
        const dayMatch = timeStr.match(/(\d+)\s*(?:일|day)/);
        if (dayMatch) {
            const days = parseInt(dayMatch[1]) || 0;
            return now.getTime() - days * 86400000;
        }
        
        // 4. "12:34" 형식 (오늘 또는 어제 시간)
        if (/^\d{1,2}:\d{2}/.test(timeStr)) {
            const parts = timeStr.match(/(\d{1,2}):(\d{2})/);
            if (parts) {
                const date = new Date();
                date.setHours(parseInt(parts[1]), parseInt(parts[2]), 0, 0);
                if (date > now) date.setDate(date.getDate() - 1);
                return date.getTime();
            }
        }
        
        // 5. 일반 날짜 형식 처리 (예: "2026-05-25", "2026.05.25")
        const d = new Date(timeStr.replace(/\./g, '-').replace(/\//g, '-'));
        if (!isNaN(d.getTime())) return d.getTime();
        
        return 0;
    }


    function groupAndShufflePosts(posts) {
        const now = Date.now();
        const blockLimits = [
            2 * 3600000,  // 0 - 2 hours
            6 * 3600000,  // 2 - 6 hours
            12 * 3600000, // 6 - 12 hours
            24 * 3600000, // 12 - 24 hours
            Infinity      // 24+ hours
        ];
        
        const blocks = Array.from({ length: blockLimits.length }, () => []);
        
        posts.forEach(post => {
            const timeMs = parseTime(post.Time);
            if (timeMs === 0) {
                blocks[blocks.length - 1].push(post);
                return;
            }
            
            const ageMs = now - timeMs;
            let placed = false;
            for (let i = 0; i < blockLimits.length; i++) {
                if (ageMs <= blockLimits[i]) {
                    blocks[i].push(post);
                    placed = true;
                    break;
                }
            }
            if (!placed) {
                blocks[blocks.length - 1].push(post);
            }
        });
        
        // Fisher-Yates Shuffle helper
        function shuffle(array) {
            const arr = [...array];
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                const temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
            return arr;
        }
        
        let mixed = [];
        blocks.forEach(block => {
            mixed = mixed.concat(shuffle(block));
        });
        
        return mixed;
    }

    function processData(data) {
        allPosts = [];
        let activeCount = 0;
        
        Object.keys(data).forEach(key => {
            if (key !== 'lastUpdated') {
                const communityPosts = data[key].map(post => ({
                    ...post,
                    Community: key
                }));
                allPosts = [...allPosts, ...communityPosts];
                
                if (Array.isArray(data[key]) && data[key].length > 0) {
                    activeCount++;
                }
            }
        });

        // 시간순 정렬 (최신순)
        allPosts.sort((a, b) => parseTime(b.Time) - parseTime(a.Time));

        // 2안: 시간대 그룹별 무작위 셔플링 피드 생성
        mixedPosts = groupAndShufflePosts(allPosts);

        // Update portal stats
        const activeCommunitiesEl = document.getElementById('stats-active-communities');
        const totalPostsEl = document.getElementById('stats-total-posts');
        if (activeCommunitiesEl) activeCommunitiesEl.textContent = `${activeCount}개`;
        if (totalPostsEl) totalPostsEl.textContent = `${allPosts.length}개`;

        renderPosts();
    }

    // Render Posts
    function renderPosts() {
        // Determine if we are on a merged view ("전체")
        const isMergedView = currentCommunity === 'all';

        // 2안: 전체 뷰이면서 검색어가 없을 때는 시간대별 셔플 처리된 mixedPosts 사용, 그 외에는 정렬된 allPosts 사용
        let filtered = (isMergedView && !searchQuery) ? mixedPosts : allPosts;

        // 1. Show or hide the view mode switcher based on whether it is a merged view
        const vmContainer = document.getElementById('view-mode-container');
        if (vmContainer) {
            if (isMergedView) {
                vmContainer.style.display = 'flex';
                // Update title text
                const titleText = document.getElementById('view-mode-title-text');
                if (titleText) {
                    titleText.textContent = '통합 모아보기';
                }
            } else {
                vmContainer.style.display = 'none';
            }
        }

        // 2. Filter posts
        if (currentCommunity !== 'all') {
            filtered = filtered.filter(post => post.Community === currentCommunity);
        }

        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            filtered = filtered.filter(post => 
                post.Title.toLowerCase().includes(q) || 
                post.Community.toLowerCase().includes(q)
            );
        }

        if (filtered.length === 0) {
            postsList.innerHTML = `
                <div style="text-align:center; padding:60px 20px; color:var(--text-secondary);">
                    <i data-lucide="inbox" style="width:48px; height:48px; margin-bottom:16px; opacity:0.5;"></i>
                    <p>검색 결과가 없습니다.</p>
                </div>
            `;
            lucide.createIcons();
            return;
        }

        // 3. Render Dashboard Grid View or Standard Timeline View
        if (isMergedView && currentViewMode === 'dashboard') {
            // Group filtered posts by their community
            const postsByCommunity = {};
            filtered.forEach(post => {
                if (!postsByCommunity[post.Community]) {
                    postsByCommunity[post.Community] = [];
                }
                postsByCommunity[post.Community].push(post);
            });

            // We want to render a grid of cards
            let cardsHtml = '';
            
            // Define order of communities to display
            let communityOrder = [];
            if (currentCommunity === 'all') {
                communityOrder = randomizedCommunities;
            } else {
                communityOrder = ["Naver News", "Daum News", "Nate News", "Yahoo US"];
            }

            cardsHtml += `<div class="dashboard-grid">`;

            communityOrder.forEach(comm => {
                const commPosts = postsByCommunity[comm] || [];
                if (commPosts.length === 0) return; // Skip if no posts scraped

                const color = COMMUNITY_COLORS[comm] || 'var(--accent-color)';
                
                // Show top 5 posts inside this card
                const topPosts = commPosts.slice(0, 5);

                cardsHtml += `
                    <div class="dashboard-card">
                        <div class="dashboard-card-header" style="background: ${color};" data-comm-click="${comm}">
                            <div class="dashboard-card-title">
                                <span>${comm}</span>
                            </div>
                            <div class="dashboard-card-more">
                                <span>더보기</span>
                                <i data-lucide="chevron-right"></i>
                            </div>
                        </div>
                        <div class="dashboard-card-body">
                `;

                topPosts.forEach((post, idx) => {
                    cardsHtml += `
                        <a href="${post.Link}" target="_blank" class="dashboard-row">
                            <span class="dashboard-row-rank" style="color: ${color};">${idx + 1}</span>
                            <span class="dashboard-row-main">
                                ${post.Title}
                                ${post.Comments && post.Comments !== '0' ? `<span class="dashboard-row-comments">[${post.Comments}]</span>` : ''}
                            </span>
                            <span class="dashboard-row-meta">${post.Time || ''}</span>
                        </a>
                    `;
                });

                cardsHtml += `
                        </div>
                    </div>
                `;
            });

            cardsHtml += `</div>`;

            postsList.innerHTML = cardsHtml;

            // Bind click handlers to dashboard card headers so they act as portal links!
            const headers = postsList.querySelectorAll('.dashboard-card-header');
            headers.forEach(header => {
                header.addEventListener('click', () => {
                    const targetComm = header.getAttribute('data-comm-click');
                    
                    // Click on the corresponding tab button to switch to that site
                    const tabBtn = Array.from(tabBtns).find(b => b.dataset.community === targetComm);
                    if (tabBtn) {
                        tabBtn.click();
                    }
                });
            });

            lucide.createIcons();
            return;
        }

        // Otherwise: Standard Timeline View
        // Apply slice pagination for "더보기" (Show More)
        const displayed = filtered.slice(0, visibleCount);

        let postsHtml = displayed.map((post, index) => {
            const color = COMMUNITY_COLORS[post.Community] || 'var(--accent-color)';
            const shortName = COMMUNITY_NAMES_MAP[post.Community] || post.Community.substring(0, 2);
            return `
                <a href="${post.Link}" target="_blank" class="post-card">
                    <div class="post-left-meta" style="background: ${color};">
                        <div class="post-rank">${index + 1}</div>
                        <span class="community-tag">${shortName}</span>
                    </div>
                    <div class="post-main">
                        <div class="post-title">
                            ${post.Title}
                            <span class="comment-count">${post.Comments && post.Comments !== '0' ? `[${post.Comments}]` : ''}</span>
                        </div>
                        <div class="post-bottom">
                            <span class="community-name" style="color: ${color}">${post.Community}</span>
                            <div class="post-stats">
                                ${post.Views && post.Views !== '0' ? `<span class="stat-item"><i data-lucide="eye"></i>${post.Views}</span>` : ''}
                                ${post.Votes && post.Votes !== '0' ? `<span class="stat-item"><i data-lucide="thumbs-up"></i>${post.Votes}</span>` : ''}
                                <span class="post-time">${post.Time || ''}</span>
                            </div>
                        </div>
                    </div>
                </a>
            `;
        }).join('');

        // Append Show More button if there are more posts to display
        if (filtered.length > visibleCount) {
            postsHtml += `
                <button id="show-more-btn" class="show-more-btn">
                    <span>더 보기</span>
                    <i data-lucide="chevron-down"></i>
                </button>
            `;
        }

        postsList.innerHTML = postsHtml;

        // Bind click event to Show More button
        const showMoreBtn = document.getElementById('show-more-btn');
        if (showMoreBtn) {
            showMoreBtn.addEventListener('click', () => {
                visibleCount += 10;
                renderPosts();
            });
        }

        lucide.createIcons();
    }



    // Tab Event Listeners
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => {
                b.classList.remove('active');
                b.style.opacity = '0.55';
                b.style.transform = 'none';
                b.style.boxShadow = 'none';
            });
            btn.classList.add('active');
            btn.style.opacity = '1';
            btn.style.transform = 'scale(1.03)';
            btn.style.boxShadow = '0 2px 6px rgba(0,0,0,0.15)';
            
            currentCommunity = btn.dataset.community;
            visibleCount = 10; // Reset pagination!
            
            // Update grid cell active class in portal view
            const cells = document.querySelectorAll('.grid-cell[data-community]');
            cells.forEach(c => {
                if (c.dataset.community === currentCommunity) {
                    c.classList.add('active');
                } else {
                    c.classList.remove('active');
                }
            });
            
            renderPosts();
            
            // Scroll tab into view if needed
            btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        });
    });

    // Search Event Listener (Mobile Google Search)
    const mobileSearchBtn = document.getElementById('mobile-search-btn');
    function performMobileSearch() {
        const query = searchInput.value.trim();
        if (query) {
            window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
        }
    }
    
    if (searchInput) {
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                performMobileSearch();
            }
        });
    }
    
    if (mobileSearchBtn) {
        mobileSearchBtn.addEventListener('click', performMobileSearch);
    }

    // View Mode Switcher Event Listeners
    const btnTimeline = document.getElementById('view-mode-timeline');
    const btnDashboard = document.getElementById('view-mode-dashboard');
    
    if (btnTimeline && btnDashboard) {
        btnTimeline.addEventListener('click', () => {
            btnTimeline.classList.add('active');
            btnDashboard.classList.remove('active');
            currentViewMode = 'timeline';
            renderPosts();
        });
        
        btnDashboard.addEventListener('click', () => {
            btnDashboard.classList.add('active');
            btnTimeline.classList.remove('active');
            currentViewMode = 'dashboard';
            renderPosts();
        });
    }



    function renderCommunityGrid() {
        const gridEl = document.getElementById('community-grid');
        if (!gridEl) return;

        let gridHtml = '';

        // Render all 19 communities and news sites together
        const keysToRender = randomizedCommunities;

        keysToRender.forEach(key => {
            const shortName = COMMUNITY_NAMES_MAP[key];
            const color = COMMUNITY_COLORS[key] || 'var(--accent-color)';
            const initial = key.substring(0, 2);
            
            gridHtml += `
                <div class="grid-cell" data-community="${key}" id="grid-cell-${key.replace(/\s+/g, '')}">
                    <span class="grid-brand-icon" style="background: ${color};">${initial}</span>
                    <span class="grid-brand-name">${shortName}</span>
                </div>
            `;
        });

        // Render 2 elegant mock slots to complete 24 slots (6x4 grid)
        gridHtml += `
            <div class="grid-cell" style="cursor: default; background: #fafafa;">
                <span class="grid-brand-name" style="color: var(--text-secondary); font-size: 0.75rem; font-weight: 700;">Dailyissue</span>
                <span style="font-size: 0.65rem; color: #a1a1a1;">공식 서비스</span>
            </div>
            <div class="grid-cell" style="cursor: default; background: #fafafa;">
                <span class="grid-brand-name" style="color: var(--text-secondary); font-size: 0.75rem; font-weight: 700;">스마트 피드</span>
                <span style="font-size: 0.65rem; color: #a1a1a1;">실시간 갱신</span>
            </div>
        `;

        gridEl.innerHTML = gridHtml;

        const allCells = Array.from(gridEl.querySelectorAll('.grid-cell'));
        let gridExpanded = false;

        function updateGridDisplay() {
            allCells.forEach((cell, idx) => {
                if (!gridExpanded && idx >= 12) {
                    cell.style.display = 'none';
                } else {
                    cell.style.display = 'flex'; // cell uses flex layout
                }
            });
        }
        updateGridDisplay();

        const container = document.querySelector('.community-grid-container');
        let toggleBtn = document.getElementById('grid-toggle-btn');
        if (!toggleBtn && container) {
            toggleBtn = document.createElement('div');
            toggleBtn.id = 'grid-toggle-btn';
            toggleBtn.className = 'grid-toggle-btn';
            toggleBtn.innerHTML = '더보기 <i data-lucide="chevron-down"></i>';
            container.appendChild(toggleBtn);

            toggleBtn.addEventListener('click', () => {
                gridExpanded = !gridExpanded;
                updateGridDisplay();
                toggleBtn.innerHTML = gridExpanded ? 
                    '접기 <i data-lucide="chevron-up"></i>' : 
                    '더보기 <i data-lucide="chevron-down"></i>';
                lucide.createIcons();
            });
            lucide.createIcons();
        }

        const cells = gridEl.querySelectorAll('.grid-cell[data-community]');
        cells.forEach(cell => {
            cell.addEventListener('click', () => {
                const targetCommunity = cell.dataset.community;
                
                cells.forEach(c => c.classList.remove('active'));

                const targetTab = Array.from(tabBtns).find(btn => btn.dataset.community === targetCommunity);
                if (targetTab) {
                    targetTab.click();
                    cell.classList.add('active');
                }
            });
        });
    }

    // Portal Google Search Logic
    const portalSearchInput = document.getElementById('portal-search-input');
    const portalSearchSubmit = document.getElementById('portal-search-submit');

    if (portalSearchInput) {
        function performPortalSearch() {
            const query = portalSearchInput.value.trim();
            if (!query) return;
            window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
        }

        if (portalSearchSubmit) {
            portalSearchSubmit.addEventListener('click', performPortalSearch);
        }
        portalSearchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                performPortalSearch();
            }
        });
    }



    // Initialize portal elements
    // Initialize portal elements
    renderCommunityGrid();





    // Initial Fetch
    fetchData();

    // Manual Refresh
    if (updateTimer) {
        updateTimer.addEventListener('click', fetchData);
    }

    // Auto Refresh every 10 minutes (600000 ms) - Removed per user request
});

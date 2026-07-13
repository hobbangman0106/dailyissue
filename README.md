# Daily issue

주요 커뮤니티의 실시간 베스트 글을 광고 없이 한눈에 확인할 수 있는 프리미엄 애그리게이터입니다.

## 주요 기능
- **광고 없는 클린 UI**: 각 커뮤니티의 광고를 제거하고 본문 베스트 리스트만 발췌
- **실시간 갱신**: 매시간 자동으로 데이터를 수집하여 최신 이슈 제공
- **반응형 디자인**: PC와 모바일 모두에 최적화된 프리미엄 다크 모드 디자인
- **멀티 커뮤니티 지원**: 펨코, 루리웹, 더쿠 등 주요 사이트 통합

## 설치 및 실행 방법

### 1. 로컬 실행
1. 이 폴더의 `index.html`을 브라우저로 엽니다.
2. (선택사항) 데이터를 직접 갱신하려면 Node.js를 설치한 후 다음을 실행하세요:
   ```bash
   npm install axios cheerio
   node scraper.js
   ```

### 2. 자동화 (GitHub Actions 추천)
매시간 자동으로 데이터를 갱신하려면 GitHub Actions를 사용하는 것이 가장 좋습니다.
1. 이 프로젝트를 GitHub 저장소에 올립니다.
2. `.github/workflows/update.yml` 파일을 만들어 `scraper.js`가 매시간 실행되고 커밋되도록 설정합니다.
3. GitHub Pages를 통해 배포하면 PC와 휴대폰에서 동일한 주소로 접속 가능합니다.

## 기술 스택
- **Frontend**: HTML5, Vanilla CSS3 (Modern Glassmorphism), Vanilla JS
- **Scraper**: Node.js, Axios, Cheerio
- **Icons**: Lucide Icons
- **Fonts**: Inter, Noto Sans KR

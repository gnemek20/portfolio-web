# portfolio-web

권민석의 개인 포트폴리오 웹사이트입니다.

## Tech Stack

- **Framework**: Next.js 14.2 (Pages Router)
- **Language**: TypeScript (strict mode)
- **Styling**: CSS Modules (kebab-case)
- **Font**: Pretendard Variable (CDN)
- **Utility**: clsx

## Structure

```
components/   → Header, Hero, Profile, Projects, ProjectDialog, Optimizations, Contact
data/         → projects.ts (프로젝트 데이터 + 최적화 코드)
hooks/        → useInView (IntersectionObserver)
pages/        → index.tsx, _app.tsx, _document.tsx
styles/       → globals.css, index.module.css
```

## Features

- **시네마틱 히어로** — animation-play-state 상태 머신 기반 8단계 인트로 시퀀스
- **프로젝트 다이얼로그** — 키워드 하이라이팅, Before/After 최적화 코드 토글
- **최적화 토글** — ON/OFF 전환 시 기법 목록 ↔ 경고 지표 애니메이션
- **스크롤 내비게이션** — sticky 헤더 + IntersectionObserver 활성 섹션 추적
- **반응형** — 모바일 640px 브레이크포인트, word-break: keep-all

## Performance

| Metric | Value |
|--------|-------|
| First Load JS | 90.3 KB (gzip) |
| Page JS | 12.3 KB |
| CSS | 4.08 KB |
| Rendering | SSG (Static) |

## Getting Started

```bash
npm install
npm run dev     # http://localhost:80
npm run build   # 프로덕션 빌드
```

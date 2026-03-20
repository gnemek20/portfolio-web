export interface Optimization {
  label: string;
  technique: string;
  before: string;
  after: string;
}

export interface ContentBlock {
  type: "text" | "image" | "stats";
  value: string;
  alt?: string;
  caption?: string;
}

export interface AccordionTab {
  title: string;
  blocks: ContentBlock[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: "개인" | "외주" | "팀";
  period?: string;
  description: string;
  tags: string[];
  highlights: string[];
  architecture?: string;
  optimizations?: Optimization[];
  accordions?: AccordionTab[];
  links: { github?: string; live?: string };
}

export const projects: Project[] = [
  {
    id: "core-helper",
    title: "Core Helper",
    subtitle: "MapleStory 코어 강화 시뮬레이터",
    category: "개인",
    description: [
      "메이플스토리 5차 전직 이후 코어 강화 스킬 시스템의 편의성을 위한 유틸리티 사이트입니다.",
      "",
      "C로 작성한 160줄 이상의 WASM 솔버가 Web Worker 내에서 DFS 백트래킹 + Prefix Sum 최적화로 NP-hard 집합 커버 조합 문제를 실시간으로 풀어, 60개 이상 직업군의 최적 코어 강화 조합을 도출합니다.",
      "",
      "500개 이상의 스킬 에셋과 직업별 타입 정의로 방대한 게임 데이터를 체계적으로 관리하며, Screen Capture API를 활용한 화면 인식 기능도 구현했습니다.",
      "",
      "2025년 5월부터 12월까지 약 8개월간 실 유저 서비스를 운영하며 Google AdSense와 후원으로 수익화에 성공했고, 메이플스토리 코어 강화 시스템 개편으로 서비스를 종료했습니다.",
    ].join("\n"),
    tags: ["Next.js 15", "React 19", "WebAssembly", "C", "Web Workers", "FastAPI", "OpenCV"],
    highlights: [
      "C → WASM → Web Worker → React 3-Layer 컴퓨트 파이프라인",
      "DFS 백트래킹 + Prefix Sum O(1) 후보 접근 최적화 (NP-hard 집합 커버)",
      "WebAssembly.Memory 수동 메모리 관리 — malloc/free/Int32Array views",
      "Ephemeral Worker 패턴 — 연산마다 Worker 생성 → 결과 반환 → terminate",
      "Screen Capture API — getDisplayMedia → Canvas → Blob → 백엔드 OCR",
      "60개 직업군 × 15~20 스킬 = 500+ PNG 에셋 + 타입 정의 관리",
      "8개월 실서비스 운영 + Google AdSense 수익화",
    ],
    architecture:
      "front/ → Next.js 15 (Pages Router) + WASM + Web Workers\nback/ → FastAPI + OpenCV + NumPy (이미지 기반 스킬 매칭)",
    accordions: [
      {
        title: "이용 흐름",
        blocks: [
          {
            type: "text",
            value: "사용자는 직업군과 직업을 선택한 뒤, 강화할 스킬과 중첩 수를 설정합니다. 이후 화면 공유·캡처 또는 파일 첨부로 코어 강화 테이블 이미지를 삽입하면, 서버가 이미지를 분석해 보유 코어 목록을 추출합니다.",
          },
          {
            type: "image",
            value: "/references/core-helper/코강도우미 화면 구조.webp",
            alt: "Core Helper 메인 화면 구조",
            caption: "직업 선택 → 스킬 설정 → 이미지 삽입까지의 메인 인터페이스",
          },
          {
            type: "text",
            value: "서버 분석이 완료되면 코어 데이터를 메인 스킬 기준으로 그룹화하고, 경험치 효율이 높은 순으로 인덱싱하여 WebAssembly 기반 DFS 솔버에 전달합니다. 솔버는 적은 수의 코어를 우선하되, 동일 조건이면 가장 높은 레벨의 코어를 선택하는 방식으로 최적의 조합을 산출합니다.",
          },
          {
            type: "image",
            value: "/references/core-helper/코강도우미 결과.webp",
            alt: "Core Helper 분석 결과",
            caption: "최적 코어 조합이 메인 스킬 기준으로 정렬된 결과 화면",
          },
          {
            type: "text",
            value: "아래는 다양한 직업군과 조건에서의 실행 예시입니다. 직업·스킬 수·보유 코어에 따라 결과가 달라지며, 대부분의 케이스에서 수 초 이내에 최적 조합을 도출합니다.",
          },
          {
            type: "image",
            value: "/references/core-helper/실행예시1.webp",
            alt: "실행 예시 1",
          },
          {
            type: "image",
            value: "/references/core-helper/실행예시2.webp",
            alt: "실행 예시 2",
          },
          {
            type: "image",
            value: "/references/core-helper/실행예시3.webp",
            alt: "실행 예시 3",
          },
          {
            type: "image",
            value: "/references/core-helper/실행예시4.webp",
            alt: "실행 예시 4",
          },
          {
            type: "image",
            value: "/references/core-helper/실행예시5.webp",
            alt: "실행 예시 5",
          },
        ],
      },
      {
        title: "핵심 기술",
        blocks: [
          {
            type: "text",
            value: "서버는 사용자가 첨부한 코어 강화 테이블 이미지를 OpenCV와 NumPy로 분석합니다. 먼저 HSV 색공간 변환과 bilateralFilter로 노이즈를 제거한 뒤, 마스킹과 윤곽선 검출(findContours)로 개별 코어 영역을 정사각형으로 크롭합니다.",
          },
          {
            type: "image",
            value: "/references/core-helper/백엔드 디스플레이 분석.webp",
            alt: "백엔드 디스플레이 분석 과정",
            caption: "HSV 마스킹 → 윤곽선 검출 → 코어 영역 크롭까지의 분석 파이프라인",
          },
          {
            type: "text",
            value: "크롭된 코어 아이콘은 좌측 사다리꼴·중앙 삼각형·우측 사다리꼴의 3파트로 분할됩니다. 각 파트를 사용자가 선택한 직업에 해당하는 스킬 템플릿과 matchTemplate(TM_CCOEFF_NORMED)으로 대조하여 유사도 0.625 이상인 스킬을 매칭합니다. 직업별로 필요한 템플릿만 로드하여 불필요한 비교를 제거했으며, 마스크 기반 매칭으로 배경 간섭을 차단하고 3파트 합산 검증으로 오탐을 최소화합니다.",
          },
          {
            type: "image",
            value: "/references/core-helper/백엔드 코어 분석.webp",
            alt: "백엔드 코어 스킬 분석 과정",
            caption: "코어 아이콘 3파트 분할 → 템플릿 매칭으로 스킬 구조 식별",
          },
          {
            type: "text",
            value: "클라이언트에서는 서버가 반환한 코어 목록을 받아, 메인 스킬 기준으로 그룹화하고 레벨 순으로 정렬합니다. 이후 C로 작성된 WebAssembly 모듈이 Web Worker 내에서 DFS 백트래킹을 수행합니다.\n\ncandidates는 메인 스킬이 중복되지 않는 코어의 인덱스 배열입니다. 각 배열에서 하나씩 요소를 추출하고, 해당 조합이 유효한지 검사하여 유효 조합을 즉시 반환합니다. 사람이 직접 계산하면 최소 15분 이상 걸리는 NP-hard 집합 커버 문제를, WebAssembly + 정수 매핑 + flat array 구조로 평균 수 ms ~ 3초 내에 해결합니다.",
          },
          {
            type: "stats",
            value: "서비스 최적화 히스토리",
            caption: [
              "이미지 분석 — 초기 matchTemplate 전수 탐색 시 최종 분석까지 최장 5분 소요\n→ YOLOv8n AI 모델 도입으로 2~5초까지 단축했으나, 무료 리소스 환경에서 메모리 덤프와 cold start 로드 비용 8초가 병목\n→ 최종적으로 grayscale 2채널 + 마스킹·윤곽선·정사각형 보정 로직으로 matchTemplate을 최소화하여 평균 5~15초, 최장 25초로 안정화 (초기 대비 92% 단축)",
              "조합 연산 — 초기 서버 측 DFS 연산으로 서버 응답 30초 이상\n→ 클라이언트 JS 전환 시 평균 20초, 예외 케이스 5분\n→ 인덱싱 조건 최적화 + C → WebAssembly 전환으로 평균 ms~3초, 최장 10초 이내 산출 (초기 대비 99% 단축)",
              "배포 인프라 — CloudType 배포 시 서버 연결 300ms\n→ Fly.io(nrt 리전) 전환으로 20~25ms로 단축 (92% 감소)\n→ VM cpu/memory 최적 할당 + Docker worker 튜닝으로 여름 피크 트래픽(일 5,700회) 시에도 안정적 서비스 유지",
            ].join("\n"),
          },
        ],
      },
    ],
    links: {
      github: "https://github.com/teacher-sora/core-helper-front",
      live: "https://www.core-helper.site/",
    },
  },
  {
    id: "rnjs",
    title: "rnjs",
    subtitle: "개인 포트폴리오 사이트",
    category: "개인",
    description: [
      "Next.js 14와 TypeScript strict 모드로 제작한 이전 세대 개인 포트폴리오 사이트입니다.",
      "Vercel 자동 배포를 통해 운영하였으며, 현재는 본 포트폴리오로 대체되었습니다.",
    ].join("\n"),
    tags: ["Next.js 14", "TypeScript", "React 18"],
    highlights: [
      "Next.js 14 Pages Router 기반 정적 사이트",
      "TypeScript strict mode 적용",
      "Vercel 자동 배포 연동",
    ],
    links: {
      github: "https://github.com/gnemek20/rnjs",
      live: "https://rnjs.vercel.app/",
    },
  },
  {
    id: "hyunwoo-ai",
    title: "Hyunwoo AI",
    subtitle: "3D 지식 온톨로지 시각화 플랫폼",
    category: "팀",
    description: [
      "Three.js의 3D 객체 탐색을 통해 사용자의 생각을 우주 공간에서 살펴볼 수 있는 사이트입니다. 관리자는 어드민 페이지에서 데이터를 관리하거나, knowledge-ontology-engine 레포지토리에 main push로 데이터를 관리할 수 있습니다.",
      "",
      "React Three Fiber 없이 Raw Three.js로 약 2,200줄 이상의 커스텀 씬 그래프 엔진을 직접 구축했으며, 4개의 커스텀 모델 로더(Brain, Human, Milkyway, Star)와 BufferGeometry 기반 동적 Vertex Coloring 시스템을 구현했습니다.",
      "",
      "이진 공간 분할(좌반구/우반구)에 따라 정점 색상을 차등 적용하는 방식으로, D3나 Cytoscape 없이 O(n) 복잡도의 자체 TreeLayout 알고리즘으로 계층적 노드 배치를 처리합니다.",
      "",
      "특히 Ontology 데이터는 부모-자식 관계의 깊이를 예측할 수 없는 재귀적 구조입니다. DB의 플랫한 Ontology 레코드를 재귀적으로 탐색하여 Tree 구조로 변환하고, Tree의 노드 조작을 다시 Ontology 포맷으로 역변환하는 양방향 변환 로직을 구현했습니다. 이를 통해 3D 시각화와 데이터 영속성을 동시에 달성했습니다.",
    ].join("\n"),
    tags: ["Next.js 14", "Three.js 0.180", "TypeScript", "FastAPI", "PostgreSQL"],
    highlights: [
      "Raw Three.js 커스텀 씬 그래프 엔진 (2,200+ LOC, R3F 미사용)",
      "4개 커스텀 모델 로더 — Brain·Human·Milkyway·Star",
      "BufferGeometry Vertex Coloring + 이진 공간 분할 (좌·우 반구 차등 색상)",
      "O(n) TreeLayout 알고리즘 (D3/Cytoscape 미사용, 레벨당 80px 간격)",
      "Ontology ↔ Tree 양방향 재귀 변환 — 깊이 미예측 데이터 구조 실시간 변환",
      "Dual Renderer — WebGLRenderer + CSS3DRenderer 동시 운용",
      "프랙탈 줌 — 로그 보간(logarithmic interpolation) 카메라 네비게이션",
      "Git-as-Database — Markdown → GitHub Actions → DB 동기화 파이프라인",
    ],
    architecture:
      "front/ → Next.js 14 (Pages Router) + Raw Three.js + TreeContext\nback/ → FastAPI + asyncpg (PostgreSQL)\nknowledge-ontology-engine/ → Markdown 지식 그래프 (GitHub Actions CI/CD)",
    optimizations: [
      {
        label: "매 프레임 Vector3 할당 제거",
        technique: "Module-scope 객체 재사용",
        before: `const updateMeshScale = (mesh, camera) => {
  const s = new THREE.Vector3();
  mesh.getWorldPosition(s);
  const dist = camera.position.distanceTo(s);
  mesh.scale.setScalar(dist * 0.01);
}`,
        after: `const _scaleVec = new THREE.Vector3();

const updateMeshScale = (mesh, camera) => {
  mesh.getWorldPosition(_scaleVec);
  const dist = camera.position.distanceTo(_scaleVec);
  mesh.scale.setScalar(dist * 0.01);
}`,
      },
      {
        label: "Three.js 리소스 메모리 누수 방지",
        technique: "useEffect cleanup에서 전수 dispose",
        before: `useEffect(() => {
  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer();
  // ... 씬 구성

  return () => {
    // 정리 코드 없음 → GPU 메모리 누수
  };
}, []);`,
        after: `useEffect(() => {
  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer();
  // ... 씬 구성

  return () => {
    scene.traverse((obj) => {
      obj.geometry?.dispose();
      if (Array.isArray(obj.material))
        obj.material.forEach(m => { m.map?.dispose(); m.dispose(); });
      else if (obj.material)
        { obj.material.map?.dispose(); obj.material.dispose(); }
    });
    renderer.dispose();
  };
}, []);`,
      },
    ],
    links: {
      live: "https://www.hyunwoo.ai/",
    },
  },
  {
    id: "daeyang-ing",
    title: "DaeyangING",
    subtitle: "패션 부자재 기업 소개 홈페이지",
    category: "외주",
    period: "2024. 06 — 2025. 01",
    description: [
      "지퍼·풀러 전문 패션 부자재 기업 대양 ING의 공식 홈페이지입니다. 초안을 완성하였으나 의뢰처의 사정으로 무산된 프로젝트입니다.",
      "",
      "외부 애니메이션 라이브러리를 일절 사용하지 않고 순수 CSS만으로 약 10초 분량의 시네마틱 인트로 애니메이션을 구현했습니다. 10개의 명명된 @keyframes와 animation-play-state 패턴으로, JavaScript 카운터가 단계별로 상태 머신을 전환하며 지퍼 등장 → 슬라이더 이동 → 텍스트 fade → 배경 반전 → 날개 효과 → 타이핑 → 로고까지 이어지는 복합 시퀀스를 선언적으로 관리합니다.",
      "",
      "모든 transform은 translateY/X, scaleX로 GPU 합성 레이어를 활용하여 60fps 성능을 확보했습니다. IntersectionObserver 커스텀 훅(observeElement)으로 once 모드 스크롤 인터랙션을 처리하며, 6개 랜딩 페이지와 Naver Maps API를 통합했습니다.",
    ].join("\n"),
    tags: ["Next.js 15", "React 19", "CSS Animations", "TypeScript", "Naver Maps"],
    highlights: [
      "제로 의존성 ~10초 시네마틱 CSS 애니메이션 (10개 @keyframes)",
      "animation-play-state 상태 머신 — JS 카운터 기반 단계적 시퀀스 전환",
      "GPU 합성 레이어 활용 — translateY/X, scaleX만 사용하여 60fps 확보",
      "IntersectionObserver 커스텀 훅 (once 모드 + 가변 threshold)",
      "반응형 Nav — sticky top (데스크톱) / fixed bottom (모바일)",
      "SEO 최적화 — Open Graph, @media (hover:hover), svh 단위",
      "6개 랜딩 페이지 + Naver Maps API 통합",
    ],
    architecture:
      "front/ → Next.js 15 (Pages Router) + CSS-only Animations\nback/ → Express + Nodemailer (Vercel Serverless)",
    optimizations: [
      {
        label: "무거운 애니메이션 컴포넌트 코드 스플리팅",
        technique: "Dynamic Import (ssr: false)",
        before: `import { WelcomeAnimation } from "@/components";

// 초기 번들에 전체 애니메이션 코드 포함
// JS 파싱 시간 증가 → LCP 지연`,
        after: `import dynamic from "next/dynamic";

const WelcomeAnimation = dynamic(
  () => import("@/components/welcomeAnimation"),
  { ssr: false }
);
// 클라이언트에서만 지연 로딩 → 초기 번들 축소`,
      },
      {
        label: "Stale closure 버그 방지 + 의존성 최소화",
        technique: "Functional setState 패턴",
        before: `const changeFiles = (e) => {
  const fileList = [...e.target.files];
  setFiles([...files, ...fileList]);
  // files가 stale closure일 수 있음
};`,
        after: `const changeFiles = useCallback((e) => {
  const fileList = [...e.target.files];
  setFiles(prev => [...prev, ...fileList]);
  // 항상 최신 state 참조, 의존성 [] 최소화
}, []);`,
      },
    ],
    links: {
      live: "https://www.daeyanging.com/",
    },
  },
  {
    id: "waat",
    title: "WAAT",
    subtitle: "AI 데이터 전처리 자동화 도구",
    category: "외주",
    period: "2022. 06 — 2023. 08",
    description: [
      "한양대학교 컴퓨테이셔널사회과학연구센터의 요청으로 제작된 데이터 전처리 자동화 도구입니다.",
      "",
      "인공지능 프로젝트에 사용되는 이미지 데이터 전처리 및 어노테이션 툴로, YOLOv5 자동 탐지와 수동 바운딩 박스 어노테이션을 하나의 워크벤치에서 결합했습니다. Express 서버에서 python-shell을 통해 Python 기반 YOLOv5(yolov5s.pt) 추론을 직접 실행하는 하이브리드 런타임 구조입니다.",
      "",
      "전통적인 데이터베이스 대신 Google Drive API를 활용하여 파일 기반으로 데이터를 관리합니다. 어노테이션 결과는 Pascal VOC 포맷으로 내보내집니다. 내부 연구용 도구이므로 외부 공개는 불가합니다.",
    ].join("\n"),
    tags: ["Vue 2", "Vuex", "Express", "YOLOv5", "Google Drive API", "Python"],
    highlights: [
      "하이브리드 런타임 — Express ↔ python-shell → YOLOv5 추론 직접 실행",
      "Google Drive-as-Database 패턴 (전통 DB 미사용, 파일 기반 관리)",
      "바운딩 박스 어노테이션 워크벤치 + Pascal VOC 포맷 내보내기",
      "YOLOv5 모델(yolov5s.pt) 내장 자동 탐지 파이프라인",
      "Vue 2 Options API + Vuex 상태 관리 + Vue Router",
    ],
    architecture:
      "front/ → Vue 2.6 (Options API) + Vuex + Vue Router\nback/ → Express + python-shell + Google Drive API + YOLOv5",
    links: {},
  },
  {
    id: "haire",
    title: "Haire",
    subtitle: "AI 에이전트 마켓플레이스",
    category: "팀",
    description: [
      "AI 에이전트를 사고 팔 수 있는 중개 마켓플레이스로, 대회 출전용으로 제작된 팀 프로젝트입니다. 저는 프론트엔드 전체를 담당했습니다.",
      "",
      "5가지 이벤트 타입(output, input_request, result, error, done)의 WebSocket 프로토콜로 에이전트와 실시간 스트리밍 통신하는 UI를 구현했습니다. SessionStorage 기반 JWT + Google OAuth 인증 플로우, 에이전트/채팅 공유 페이지, KaTeX 수식 + rehype-sanitize XSS 방지 마크다운 렌더링 등 프론트엔드 기능을 개발했습니다.",
      "",
      "백엔드의 DooD(Docker-outside-of-Docker) 아키텍처와 pgvector 시맨틱 검색은 팀원이 구현했으며, 저는 이를 연동하는 클라이언트 측 인터페이스를 설계했습니다.",
    ].join("\n"),
    tags: ["Next.js 14", "FastAPI", "Docker", "Supabase", "pgvector", "WebSocket"],
    highlights: [
      "WebSocket 5-이벤트 프로토콜 UI 구현 (output/input_request/result/error/done)",
      "SessionStorage JWT + Google OAuth 인증 플로우 구축",
      "KaTeX + rehype-sanitize 마크다운 렌더링 (XSS 방지)",
      "에이전트/채팅 공유 페이지(share) 구현",
      "Agent Manifest Guide 문서 체계 — 에이전트 등록 규격 정의",
      "pgvector 시맨틱 검색 연동 UI 구현",
    ],
    architecture:
      "front/ → Next.js 14 (Pages Router) + WebSocket + UserContext\nback/ → FastAPI + Docker SDK + Supabase (pgvector)",
    links: {
      github: "https://github.com/SurhommeAI/haire-frontend",
      live: "https://hairefront.vercel.app/",
    },
  },
  {
    id: "dictector",
    title: "Dictector",
    subtitle: "YouTube 영어 받아쓰기 학습 플랫폼",
    category: "팀",
    description: [
      "YouTube 영상 링크를 붙여넣고 원하는 구간을 설정하여 영어 받아쓰기(dictation) 학습을 할 수 있는 사이트입니다. 현재 개발 중입니다.",
      "",
      "learning.tsx 단일 파일 500줄 이상 규모의 학습 엔진이 4가지 학습 모드(Shadowing, Dictation, Dictation+, Direct Translation)를 구현합니다. 토큰 단위 실시간 정답 추적, 문자 정규화를 통한 입력 검증, CEFR 레벨 및 품사 태깅 결과 요약 등 고도화된 학습 플로우를 제공합니다.",
      "",
      "백엔드는 클린 레이어드 아키텍처(endpoints → services → repository → models)로 구성하고, Celery + Redis로 yt-dlp + ffmpeg + Soniox API 트랜스크립션 파이프라인을 비동기 처리합니다. Supabase Realtime 채널로 트랜스크립션 진행률을 실시간 폴링합니다.",
    ].join("\n"),
    tags: ["Next.js 14", "FastAPI", "Supabase", "Celery", "Redis", "yt-dlp"],
    highlights: [
      "4가지 학습 모드 — Shadowing / Dictation / Dictation+ / Direct Translation",
      "토큰 단위 실시간 정답 추적 + 문자 정규화 입력 검증",
      "CEFR 레벨 + 품사(POS) 태깅 학습 결과 요약",
      "클린 레이어드 아키텍처 — endpoints → services → repository → models",
      "Celery + Redis 비동기 트랜스크립션 파이프라인",
      "yt-dlp + ffmpeg + Soniox API 음성 인식 체인",
      "Supabase Realtime 채널 진행률 실시간 폴링",
    ],
    architecture:
      "front/ → Next.js 14 (Pages Router) + Supabase Auth + Realtime\nback/ → FastAPI + Supabase + Celery + Redis + yt-dlp + ffmpeg",
    links: {
      github: "https://github.com/SurhommeAI/dictector-web",
      live: "https://dictector-test.vercel.app/",
    },
  },
];

export const allOptimizations: Optimization[] = projects.flatMap(
  (p) => p.optimizations ?? [],
);

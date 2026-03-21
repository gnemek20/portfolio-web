export interface ContentBlock {
  type: "text" | "image" | "stats" | "gif" | "table";
  value: string;
  alt?: string;
  caption?: string;
  tables?: {
    title: string;
    headers: string[];
    rows: string[][];
  }[];
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
  accordions?: AccordionTab[];
  links: { github?: string; live?: string; notice?: string };
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
            value: "아래는 다른 직업에서 화면 공유 기능이나 저화질 이미지를 사용해도 정상적으로 분석·연산되는 것을 보여주는 실행 예시입니다.",
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
              "이미지 분석 — 초기에는 모든 스킬 템플릿을 matchTemplate으로 전수 비교하여, 최종 분석까지 최장 5분이 소요\n→ YOLOv8n 모델을 도입해 2~5초로 크게 단축했으나, 무료 플랜의 제한된 메모리에서 덤프가 반복되고 cold start 시 모델 로드에만 8초가 소요되는 문제 발생\n→ grayscale 2채널 변환 + 마스킹·윤곽선·정사각형 보정 파이프라인으로 matchTemplate 호출을 최소화한 결과, 평균 5~15초·최장 25초로 안정화 — 92% 단축",
              "조합 연산 — 초기에는 백엔드에서 DFS 조합 연산까지 처리하여, 서버 응답이 30초 이상 소요\n→ 연산을 클라이언트 JavaScript로 이관하여 평균 20초로 개선했으나, 연산량이 많은 예외 케이스에서 5분까지 지연\n→ 인덱싱 조건 최적화 및 C로 작성한 WebAssembly 전환으로 평균 ms~3초, 최장 10초 이내로 산출 — 99% 단축",
              "배포 인프라 — 초기 CloudType 배포 환경에서 서버 연결에 300ms 소요\n→ Fly.io 도쿄(nrt) 리전으로 이전하여 20~25ms로 단축 — 92% 감소\n→ VM CPU·메모리 최적 할당 + Docker worker 튜닝으로 여름 피크 트래픽(일 5,700회 이용) 환경에서도 안정적으로 서비스 유지",
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
    accordions: [
      {
        title: "이용 흐름",
        blocks: [
          {
            type: "text",
            value: "데스크톱 좌측의 아이콘을 클릭하면 커스텀 창이 열립니다. 각 창은 Windows처럼 모서리를 드래그하여 크기를 조절하거나, 상단 막대를 드래그하여 위치를 이동할 수 있습니다.",
          },
          {
            type: "image",
            value: "/references/rnjs/권 화면 구조1.webp",
            alt: "rnjs 메인 화면 구조",
            caption: "Windows 스타일의 데스크톱 UI — 아이콘, 작업 표시줄, 커스텀 창",
          },
          {
            type: "text",
            value: "각 창은 고유의 z-index를 가지며, 하단 작업 표시줄에서 원하는 창을 클릭하거나 해당 창을 직접 포커스하면 최상단 레이어로 전환됩니다. Alt + W 단축키로 현재 포커스된 창을 닫을 수도 있습니다.",
          },
          {
            type: "image",
            value: "/references/rnjs/권 화면 구조2.webp",
            alt: "프로필 검색 기능",
            caption: "프로필 창의 검색 기능 — 영문·한글·공백 모두 자동 변환",
          },
        ],
      },
      {
        title: "핵심 기술",
        blocks: [
          {
            type: "text",
            value: "커스텀 창(Web 컴포넌트)은 8방향 리사이즈 핸들(상·하·좌·우·네 꼭짓점)을 구현합니다. mousedown 시점의 좌표 기준으로 mousemove delta를 계산하고, 방향에 따라 width·height·top·left를 동시에 갱신합니다. mouseup에는 { once: true } 옵션으로 리스너를 자동 해제하여 메모리 누수를 방지합니다.",
          },
          {
            type: "text",
            value: "검색 기능은 Inko 라이브러리를 활용해 한글 입력을 영문 키 배열로 자동 변환합니다. 공백을 제거한 뒤 ko2en 변환을 거치며, 쉼표(,)로 다중 검색어를 분리하여 각각 매칭합니다. 입력마다 200ms debounce를 적용해 불필요한 연산을 차단합니다.",
          },
          {
            type: "text",
            value: "키보드 단축키는 Compose Key 패턴으로 구현했습니다. Alt keydown 시점에 keydown 리스너를 해제하고 keyup 리스너를 등록한 뒤, W가 감지되면 현재 포커스된 창을 닫습니다. Alt keyup 시 다시 원래 리스너로 복원하는 상태 전환 방식입니다.",
          },
        ],
      },
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
    accordions: [
      {
        title: "이용 흐름",
        blocks: [
          {
            type: "text",
            value: "최초 로드 시 상단 카탈로그 패널을 닫으면 3D 공간을 탐색할 수 있습니다. 사람 → 뇌 → 노드 → 하위 노드 순으로 점진적으로 깊이 들어가며, 각 단계 전환 시 opacity 보간으로 부드럽게 페이드됩니다. 뇌 단계에서는 카메라 방향에 따라 좌뇌와 우뇌가 각각 다른 카테고리의 데이터를 표시합니다.",
          },
          {
            type: "image",
            value: "/references/hyunwoo-ai/Hyunwoo AI 화면 구조1.webp",
            alt: "Hyunwoo AI 3D 공간 탐색",
            caption: "사람 모델에서 뇌 모델, 그리고 지식 노드로 이어지는 3D 공간 구조",
          },
          {
            type: "text",
            value: "각 노드는 마우스 클릭으로 직접 선택하거나, 좌측 네비게이터에서 자식 노드 목록을 통해 이동할 수 있습니다. 우측 하단의 미니맵에서는 전체 트리 구조를 SVG로 시각화하여 현재 위치를 확인할 수 있습니다.",
          },
          {
            type: "image",
            value: "/references/hyunwoo-ai/Hyunwoo AI 화면 구조2.webp",
            alt: "Hyunwoo AI 노드 탐색 UI",
            caption: "좌뇌의 노드가 페이드 인되며 로드되는 장면 — 좌측 네비게이터와 우측 하단 미니맵 UI",
          },
          {
            type: "image",
            value: "/references/hyunwoo-ai/지도.webp",
            alt: "미니맵",
            caption: "SVG 기반 미니맵 — 레벨별 80px 간격의 트리 레이아웃으로 전체 구조를 시각화",
          },
          {
            type: "text",
            value: "한 섹션 내에서 같은 태그를 가진 노드들은 흰색 선으로 서로 연결되어 관련성을 시각적으로 표현합니다. 상단 카탈로그 패널에서는 태그 필터를 통해 관련 노드들의 마크다운 설명을 확인할 수 있습니다. 자식이 있는 노드는 울퉁불퉁한 모양(TetrahedronGeometry), 끝 노드는 매끄러운 원(SphereGeometry)으로 구분됩니다.",
          },
          {
            type: "image",
            value: "/references/hyunwoo-ai/카탈로그.webp",
            alt: "카탈로그 패널",
            caption: "태그 필터 → 노드 선택 → 마크다운 설명 확인이 가능한 카탈로그 패널",
          },
          {
            type: "image",
            value: "/references/hyunwoo-ai/Hyunwoo AI 화면 구조3.webp",
            alt: "Hyunwoo AI 노드 내부",
            caption: "노드 내부로 진입한 모습 — 하위 노드들이 3D 공간에 배치됨",
          },
          {
            type: "text",
            value: "어드민 페이지에서는 로그인 후 JWT 토큰을 발급받아 온톨로지를 트리 형태로 관리할 수 있습니다. 노드의 추가·수정·제거 변경 사항은 Status 패널에서 색상별로 확인할 수 있으며, Ctrl+S 또는 Save 버튼으로 Fly.io에 배포된 PostgreSQL 데이터베이스에 영속화합니다.",
          },
          {
            type: "image",
            value: "/references/hyunwoo-ai/어드민 화면 구조1.webp",
            alt: "어드민 트리 에디터",
            caption: "온톨로지 트리 에디터 — 노드의 부모·자식·태그를 자유롭게 관리",
          },
          {
            type: "image",
            value: "/references/hyunwoo-ai/어드민 화면 구조2.webp",
            alt: "어드민 Status 패널",
            caption: "Status 패널 — 추가(초록)·수정(노랑)·제거(빨강) 변경 사항 확인 및 취소 가능",
          },
          {
            type: "image",
            value: "/references/hyunwoo-ai/저장 메시지.webp",
            alt: "저장 성공 메시지",
            caption: "Ctrl+S 또는 Save 버튼으로 데이터베이스에 온톨로지 저장 시 확인 메시지",
          },
        ],
      },
      {
        title: "핵심 기술",
        blocks: [
          {
            type: "text",
            value: "3D 공간의 카메라는 구면 좌표계(theta, phi) 기반의 커스텀 컨트롤러로 제어됩니다. 마우스 드래그로 회전하고, 휠 줌은 로그 스케일(Math.exp) 기반 프랙탈 줌을 적용하여 어떤 배율에서도 일정한 속도감을 유지합니다. 모든 변화는 매 프레임 lerp 보간으로 부드럽게 전환됩니다.",
          },
          {
            type: "text",
            value: "WebGLRenderer는 3D 모델과 노드 메쉬를 렌더링하고, CSS3DRenderer는 항상 카메라를 향해 바라보는 텍스트 레이블을 처리합니다. Dual Renderer를 동시 운용하여 텍스트는 어떤 시점에서도 가독성을 유지합니다.",
          },
          {
            type: "text",
            value: "뇌 모델의 각 정점(vertex) 위치를 모델 중심점(center) 기준으로 계산하여 좌뇌와 우뇌에 서로 다른 vertex color를 할당합니다. 카메라의 theta 각도로 현재 바라보는 반구를 판별하고, 좌뇌와 우뇌가 각각 다른 카테고리의 데이터를 로드하여 표시합니다.",
          },
          {
            type: "text",
            value: "노드 배치는 Poisson 유사 구면 분포 알고리즘을 사용합니다. 구면 좌표로 랜덤 위치를 생성한 뒤 Math.cbrt로 균일 분포를 보정하고, 최소 간격 조건을 만족할 때까지 최대 50회 재시도(rejection sampling)하여 겹침 없이 배치합니다.",
          },
          {
            type: "text",
            value: "Ontology 데이터는 부모-자식 관계의 깊이를 예측할 수 없는 재귀적 구조입니다. Fly.io에 배포된 PostgreSQL에 온톨로지 포맷으로 저장된 플랫한 레코드를 재귀적으로 탐색하여 Tree 구조로 변환하고, Tree의 노드 조작을 다시 Ontology 포맷으로 역변환하는 양방향 변환 로직을 구현했습니다. 어드민에서 변경 사항을 저장하면 기존 온톨로지와의 diff를 산출하여 inserted·deleted·updated 단위로 데이터베이스에 영속화합니다.",
          },
          {
            type: "table",
            value: "",
            tables: [
              {
                title: "nodes",
                headers: ["id", "name", "description", "tags"],
                rows: [
                  ["2358139b...", "NeoVim", "### Prerequisites\n* Neovim v0.10.0~\n* Nerd Font ...", "{neovim,lua,AI,Tools}"],
                  ["ee2f9cae...", "Tools", "- NeoVim", "{}"],
                  ["630e48ec...", "Triton server", "", "{Serving}"],
                  ["94d303f1...", "vLLM", "", "{Serving,LLM}"],
                  ["25cabb8b...", "Normalizing Flows", "Paper: Real NVP", "{}"],
                ],
              },
              {
                title: "relations",
                headers: ["from_", "to_", "type", ""],
                rows: [
                  ["ee2f9cae...", "2358139b...", "parent", "Tools \u2192 NeoVim"],
                  ["idLeft", "ee2f9cae...", "parent", "root \u2192 Tools"],
                  ["54edd916...", "630e48ec...", "parent", ""],
                  ["54edd916...", "94d303f1...", "parent", ""],
                  ["54edd916...", "25cabb8b...", "parent", ""],
                ],
              },
            ],
            caption: "nodes 테이블에 마크다운 기반 description과 태그를 저장하고, relations 테이블로 부모-자식 온톨로지를 표현",
          },
          {
            type: "text",
            value: "3D 페이지에서는 데이터베이스의 전체 노드를 초기에 가져오되, 모든 섹션을 한 번에 생성하지 않습니다. 사용자가 노드 내부에 접근할 때 해당 깊이의 섹션을 동적으로 생성(lazy section creation)하여, 예측할 수 없는 깊이의 재귀적 데이터에 대응하면서도 초기 로드 성능을 유지합니다. 줌 레벨이 일정 범위에 도달하면 다음 섹션을 생성하고 opacity 보간으로 전환합니다.",
          },
          {
            type: "text",
            value: "깊이를 예측할 수 없는 노드 탐색에 대비해 카메라 위치를 이동하는 줌 대신, 모든 3D 객체를 하나의 그룹으로 묶어 scale을 조절하는 방식으로 무한대 확대를 구현했습니다. 이를 통해 카메라의 near/far 클리핑 제한 없이 어떤 깊이의 노드든 자연스럽게 진입할 수 있습니다.",
          },
          {
            type: "text",
            value: "knowledge-ontology-engine 레포지토리에 마크다운 파일을 추가하고 main에 push하면, GitHub Actions 워크플로우가 데이터를 checkout한 뒤 백엔드 엔드포인트를 실행하여 데이터베이스에 자동 동기화합니다. 이를 통해 데이터 관리를 AI 에이전트에게 일임할 수도 있습니다.",
          },
        ],
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
    accordions: [
      {
        title: "이용 흐름",
        blocks: [
          {
            type: "text",
            value: "일반적인 회사 소개 페이지처럼 대양 ING의 사업 분야, 제품군, 오시는 길 등을 탐색할 수 있습니다. 접속 시 약 10초 분량의 시네마틱 인트로 애니메이션이 재생되며, 스크롤에 따라 각 섹션이 순차적으로 등장합니다.",
          },
          {
            type: "gif",
            value: "/references/daeyang-ing/대양ING 애니메이션.mp4",
            alt: "DaeyangING 시네마틱 인트로 애니메이션",
            caption: "순수 CSS @keyframes + animation-play-state로 구현한 ~10초 인트로 시퀀스",
          },
          {
            type: "text",
            value: "상담 문의 페이지에서는 성함, 연락처, 제품 종류(지퍼·풀러), 제목, 요청 사항, 첨부파일을 작성하여 제출할 수 있습니다. 제출된 내용은 Nodemailer를 통해 회사 계정으로 이메일이 발송됩니다.",
          },
          {
            type: "image",
            value: "/references/daeyang-ing/대양ING 요청 양식.webp",
            alt: "DaeyangING 상담 문의 양식",
            caption: "성함·연락처·제품 종류·제목·요청 사항·첨부파일을 입력하는 상담 문의 폼",
          },
          {
            type: "image",
            value: "/references/daeyang-ing/대양ING 요청 수신.webp",
            alt: "DaeyangING 요청 수신 메일",
            caption: "문의 양식 제출 시 회사 계정으로 수신되는 이메일 — HTML 본문 + 첨부파일 포함",
          },
        ],
      },
      {
        title: "핵심 기술",
        blocks: [
          {
            type: "text",
            value: "인트로 애니메이션은 외부 라이브러리 없이 순수 CSS만으로 구현했습니다. 10개의 명명된 @keyframes를 정의하고, 모든 애니메이션에 animation-play-state: paused를 기본 적용합니다. JavaScript의 animationCounter(0~11) 상태 머신이 setTimeout 체인으로 단계를 전환하며, 해당 단계에 도달한 요소에만 playAnimation 클래스를 부여하여 animation-play-state: running으로 전환합니다.",
          },
          {
            type: "text",
            value: "IntersectionObserver 커스텀 훅(observeElement)은 once 모드와 가변 threshold를 지원합니다. 대상 요소가 뷰포트에 진입하면 observed 상태를 true로 전환하고 unobserve하여, 스크롤 인터랙션에 따른 등장 애니메이션을 한 번만 실행합니다. 각 페이지에서 이 훅을 사용해 hr, 이미지, 텍스트 블록의 reveal 타이밍을 제어합니다.",
          },
          {
            type: "text",
            value: "상담 문의는 Express 서버에서 Nodemailer로 처리합니다. 클라이언트가 첨부파일을 FileReader로 Base64 변환한 뒤 JSON으로 POST하면, 서버가 HTML 메일 본문(성함·종류·연락처·요청 사항)과 첨부파일 목록을 구성하여 Gmail SMTP(App Password)로 발송합니다. Naver Maps API로 실제 회사 위치를 지도에 표시하며, 마커와 주변 교통 안내를 함께 제공합니다.",
          },
        ],
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
    tags: ["Next.js 14", "FastAPI", "Supabase", "WebSocket"],
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
    accordions: [
      {
        title: "이용 흐름",
        blocks: [
          {
            type: "text",
            value: "AI 에이전트를 검색하고, 구독한 뒤, 채팅 형태로 실행하는 마켓플레이스입니다. 현재 스크린샷은 목업 데이터 환경에서 촬영되었습니다.",
          },
          {
            type: "image",
            value: "/references/haire/haire 화면 구조1.webp",
            alt: "Haire 랜딩 페이지",
            caption: "랜딩 페이지 — AI 에이전트 추천 및 탐색",
          },
          {
            type: "image",
            value: "/references/haire/에이전트 추천.webp",
            alt: "에이전트 추천 결과",
            caption: "검색어를 입력하면 시맨틱 검색으로 적합한 에이전트를 추천",
          },
          {
            type: "image",
            value: "/references/haire/haire 화면 구조2.webp",
            alt: "에이전트 상세 페이지",
            caption: "에이전트 상세 — 소개 · 사용 중인 AI · 필요한 인증 · 입력 항목을 확인하고 구독 및 사용하기",
          },
          {
            type: "text",
            value: "에이전트에 Verification이 필요한 경우 Google OAuth 등의 인증을 거친 뒤 쿼리를 보냅니다. 에이전트의 응답은 WebSocket 스트리밍으로 실시간 수신됩니다.",
          },
          {
            type: "image",
            value: "/references/haire/OAuth 인증 예시.webp",
            alt: "OAuth 인증 예시",
            caption: "에이전트가 요구하는 OAuth 인증 플로우",
          },
          {
            type: "image",
            value: "/references/haire/에이전트 채팅 예시.webp",
            alt: "에이전트 채팅",
            caption: "WebSocket 스트리밍으로 에이전트 응답을 실시간 수신하는 채팅 화면",
          },
          {
            type: "text",
            value: "개발자는 Share Agent 페이지에서 에이전트가 담긴 ZIP 파일을 업로드합니다. YAML Generator를 사용해 haire.yaml을 자동 생성하고, 수정한 뒤 ZIP에 포함하여 배포할 수 있습니다.",
          },
          {
            type: "image",
            value: "/references/haire/haire 화면 구조3.webp",
            alt: "Share Agent 페이지",
            caption: "Share Agent 페이지 — ZIP 업로드 · YAML Generator · My Agents 목록",
          },
          {
            type: "image",
            value: "/references/haire/haire yaml 생성.webp",
            alt: "YAML 자동 생성",
            caption: "업로드한 코드를 AI가 분석하여 haire.yaml 매니페스트를 자동 생성",
          },
          {
            type: "image",
            value: "/references/haire/haire yaml 수정.webp",
            alt: "YAML 수정",
            caption: "생성된 YAML을 직접 수정한 뒤 ZIP에 포함하여 최종 배포",
          },
          {
            type: "image",
            value: "/references/haire/에이전트 업로드 예시.webp",
            alt: "에이전트 배포 완료",
            caption: "에이전트 배포 완료 — My Agents에 등록된 에이전트와 배포 성공 알림",
          },
        ],
      },
      {
        title: "핵심 기술",
        blocks: [
          {
            type: "text",
            value: "이 프로젝트는 hAIre_Back(유저 인증 서버)과 haire_backend(에이전트 관리 서버) 두 개의 백엔드로 운영됩니다. hAIre_Back은 JWT 발급 · Google OAuth · 구독 관리를, haire_backend는 에이전트 CRUD · Docker 빌드 · WebSocket 실행 · 시맨틱 검색을 담당합니다.",
          },
          {
            type: "text",
            value: "에이전트 검색은 사용자의 쿼리를 LLM이 시맨틱 검색에 적합하도록 재작성한 뒤, OpenAI 임베딩으로 변환하여 Supabase pgvector에서 코사인 유사도 기반으로 상위 에이전트를 반환합니다. 프론트엔드에서는 이 결과를 카드 UI로 렌더링합니다.",
          },
          {
            type: "text",
            value: "채팅 화면은 WebSocket으로 5가지 이벤트 타입(output, input_request, result, error, done)을 처리합니다. output은 스트리밍 텍스트, input_request는 에이전트가 추가 입력을 요구할 때, result는 최종 결과, error와 done은 종료 처리에 사용됩니다. 에이전트 응답은 react-markdown + KaTeX + rehype-sanitize로 수식 지원과 XSS 방지를 동시에 처리하여 렌더링합니다.",
          },
          {
            type: "text",
            value: "개발자가 업로드한 ZIP 파일 또는 GitHub URL을 AI가 분석하여 haire.yaml 매니페스트를 자동 생성합니다. YAML에는 에이전트 이름, 설명, 입력 스키마, 인증 요구사항 등이 포함되며, 프론트엔드의 YAML Generator 페이지에서 직접 수정할 수 있습니다.",
          },
          {
            type: "text",
            value: "인증이 필요한 에이전트는 OAuth 플로우를 거칩니다. 프론트엔드에서 인증 제공자(Google, GitHub 등)의 인증 코드를 받고, 백엔드가 이를 액세스 토큰으로 교환하여 에이전트 실행 시 주입합니다. 인증 상태는 SessionStorage 기반 JWT로 관리됩니다.",
          },
          {
            type: "stats",
            value: "추후 개발 예정",
            caption: [
              "보안 강화 — iptables로 에이전트의 API 실행을 제한하여 OAuth 코드 악용 방지",
              "수익 모델 — 구독 방식에서 토큰 사용 방식으로 변경하여, 매달 에이전트 비용이 개발자에게 정산되는 기능 추가",
              "멀티 플랫폼 — 에이전트 사용을 웹 뿐만 아닌, 다른 플랫폼에서도 사용할 수 있도록 업데이트",
            ].join("\n"),
          },
        ],
      },
    ],
    links: {
      live: "https://hairefront.vercel.app/",
      notice: "Dictector 개발에 의해 ngrok 서버가 종료되어 정상적인 이용이 불가능합니다.",
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
      "Soniox API로 전사된 결과를 Supabase에 캐시하고, 이미 전사된 구간은 제외하여 필요한 범위만 전사 요청하는 비용 절감 로직을 적용했습니다. Supabase Realtime 채널로 전사 진행률을 실시간 폴링합니다.",
    ].join("\n"),
    tags: ["Next.js 14", "FastAPI", "Supabase", "Soniox API"],
    highlights: [
      "4가지 학습 모드 — Shadowing / Dictation / Dictation+ / Direct Translation",
      "토큰 단위 실시간 정답 추적 + 문자 정규화 입력 검증",
      "CEFR 레벨 + 품사(POS) 태깅 학습 결과 요약",
      "전사 비용 절감 — 캐시 구간 제외 후 미전사 범위만 요청",
      "Supabase Realtime 채널 진행률 실시간 폴링",
      "WER(Word Error Rate) DP 알고리즘 기반 채점",
      "문자 교집합 기반 번역 유사도 측정",
    ],
    architecture:
      "front/ → Next.js 14 (Pages Router) + Supabase Auth + Realtime\nback/ → FastAPI + Supabase + Soniox API",
    accordions: [
      {
        title: "이용 흐름",
        blocks: [
          {
            type: "text",
            value: "학습하고자 하는 YouTube 영상 URL을 붙여넣고, 전사 범위를 지정하여 학습 자료 준비를 요청합니다. 전사가 완료될 때까지 진행률을 실시간으로 확인할 수 있습니다.",
          },
          {
            type: "image",
            value: "/references/dictector/dictector 화면 구조1.webp",
            alt: "Dictector 메인 화면",
            caption: "YouTube URL을 붙여넣고 전사 범위를 설정하는 메인 화면",
          },
          {
            type: "image",
            value: "/references/dictector/dictector 화면 구조2.webp",
            alt: "Dictector 영상 상세",
            caption: "전사 상태 확인 및 학습 모드 선택 화면",
          },
          {
            type: "image",
            value: "/references/dictector/전사 완료 스크립트.webp",
            alt: "전사 완료 스크립트",
            caption: "전사 완료 후 스크립트 목록 — 각 세그먼트별 타임스탬프와 영어 텍스트 확인",
          },
          {
            type: "text",
            value: "전사가 완료되면 쉐도잉, 딕테이션, 딕테이션+, 직접 번역 중 하나의 모드를 선택하여 학습을 시작합니다. 1단계에서는 화면에 표시된 Vocab을 보고 아는지 모르는지 응답하며, 이후 단계에서 영상 패널을 통해 지정 구간을 반복 재생하며 학습합니다.",
          },
          {
            type: "image",
            value: "/references/dictector/dictector 학습 모드.webp",
            alt: "Dictector 학습 모드 선택",
            caption: "Shadowing / Dictation / Dictation+ / Direct Translation 4가지 모드",
          },
          {
            type: "image",
            value: "/references/dictector/dictector 학습 1단계.webp",
            alt: "Dictector 학습 1단계",
            caption: "1단계: 어휘 확인 — 화면에 표시된 Vocab을 보고 아는지 모르는지 응답",
          },
          {
            type: "image",
            value: "/references/dictector/dictector 학습 2단계.webp",
            alt: "Dictector 학습 2단계",
            caption: "2단계: 들은 내용을 입력하고 토큰 단위로 실시간 채점",
          },
          {
            type: "image",
            value: "/references/dictector/dictector 학습 3단계.webp",
            alt: "Dictector 학습 3단계",
            caption: "3단계: 채점 결과 확인 — WER 기반 정확도와 틀린 단어 표시",
          },
          {
            type: "image",
            value: "/references/dictector/dictector 학습 완료.webp",
            alt: "Dictector 학습 완료",
            caption: "학습 완료 — CEFR 레벨, 품사 태깅, 정확도 등 학습 결과 요약",
          },
          {
            type: "text",
            value: "Dictation+ 모드에서는 받아쓰기 완료 후 한국어 번역 단계가 추가됩니다. 입력한 번역과 기준 번역의 유사도를 측정하여 피드백을 제공합니다.",
          },
          {
            type: "image",
            value: "/references/dictector/번역 예시.webp",
            alt: "번역 유사도 측정 예시",
            caption: "문자 교집합 기반 유사도 측정 — 80% 이상이면 정답 처리",
          },
          {
            type: "text",
            value: "대시보드에서는 학습 통계, 주간 분석, 최근 영상, 복습 항목 등을 확인할 수 있습니다.",
          },
          {
            type: "image",
            value: "/references/dictector/대시보드.webp",
            alt: "Dictector 대시보드",
            caption: "학습 통계 · 주간 분석 · 최근 영상 · 복습 항목을 한 눈에 관리하는 대시보드",
          },
        ],
      },
      {
        title: "핵심 기술",
        blocks: [
          {
            type: "text",
            value: "YouTube 영상 URL을 가공하여 필요한 정보(videoId, duration 등)만 추출한 뒤 학습에 사용합니다. 영상 패널은 YouTube iFrame postMessage 프로토콜로 제어하며, 화질을 144p(tiny)로 낮춰 대역폭을 절감합니다. requestAnimationFrame으로 YouTube 업데이트 사이를 60fps 보간하여 부드러운 타임라인 프로그레스를 표시합니다.",
          },
          {
            type: "text",
            value: "전사 비용을 절감하기 위해, 이미 전사된 구간은 Supabase에 캐시하여 재사용합니다. 예를 들어 0:00~2:00 전사 요청 시 데이터베이스에 1:00~1:20 기록이 있으면, 해당 구간의 앞뒤 토큰 3개씩을 잘라 순수 데이터 구간을 제외한 나머지만 Soniox API에 전사를 요청한 후 둘을 합성합니다.",
          },
          {
            type: "text",
            value: "채점은 WER(Word Error Rate) DP 알고리즘을 사용합니다. 사용자 입력과 정답을 토큰 단위로 비교하여, 정확히 일치하면 1점, 편집 거리 1~2의 유사 단어는 0.5점으로 부분점을 부여합니다. 총점/정답 단어 수 × 100으로 점수를 산출하며, 90% 이상이면 정답 처리됩니다. Shadowing 모드에서는 Web Speech Recognition API로 음성을 인식한 뒤 동일한 WER 알고리즘으로 채점합니다.",
          },
          {
            type: "text",
            value: "번역 유사도 측정은 문자 교집합 방식을 사용합니다. 사용자의 번역을 문자 단위로 분해하고, 기준 번역의 문자 집합과 교집합을 구한 뒤 (교집합 수 / 기준 문자 수) × 100으로 점수를 산출합니다. 80% 이상이면 정답, 50~80%는 핵심 의미 일치, 50% 미만은 완전 오답 처리됩니다. 기준 번역은 MyMemory API를 활용하며, 한 번 조회한 번역은 useRef로 캐시하여 반복 요청을 방지합니다.",
          },
          {
            type: "text",
            value: "영상 패널은 YouTube iFrame의 infoDelivery 이벤트로 currentTime을 받아 지정 구간의 시작점(0.25초 버퍼)으로 seek하고, 종료 시점에 도달하면 자동 일시정지합니다. 이를 통해 학습자가 정해진 구간만 반복하며 학습할 수 있도록 제한합니다.",
          },
        ],
      },
    ],
    links: {
      live: "https://dictector-test.vercel.app/",
    },
  },
];



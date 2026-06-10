# 카드뉴스 공장 🏭

> 주제 한 줄 → 한국어 카드뉴스 캐러셀 PNG 자동 제작

Claude Code 스킬입니다. 주제만 입력하면 Claude가 타깃·장수·톤을 함께 정하고,
**1080x1350 (4:5) PNG 슬라이드**를 인스타그램·스레드·링크드인에 바로 올릴 수 있는 수준으로 만들어줍니다.

- 페르소나·브랜드(로고, 컬러, @핸들)를 **한 번만 등록**하면 계속 기억합니다
- 슬라이드 문구 초안을 먼저 보여주고 확인받은 뒤 제작합니다
- 수정은 말로: "1장 훅 더 날카롭게", "여백 더 넓게"
- 원하면 PNG 대신 **Canva 디자인**으로도 받을 수 있습니다 (선택)

---

## 설치 방법

### 0. 필요한 것

| 항목 | 용도 | 확인 방법 |
|---|---|---|
| Claude 구독 (Pro 이상) | 스킬 실행 | [claude.ai](https://claude.ai) 로그인 |
| Node.js 18+ | Claude Code 설치, PNG 추출 | 터미널에서 `node -v` |

Node.js가 없다면 [nodejs.org](https://nodejs.org)에서 LTS 버전을 설치하세요.

### 1. Claude Code 설치 (이미 쓰고 있다면 건너뛰기)

터미널(맥: 터미널 앱, 윈도우: PowerShell)을 열고:

```bash
npm install -g @anthropic-ai/claude-code
```

설치 후 처음 실행하면 브라우저로 로그인 안내가 뜹니다:

```bash
claude
```

### 2. 스킬 설치

Claude Code 화면 안에서 아래 두 줄을 차례로 입력합니다:

```
/plugin marketplace add kojh0111/socialmedia-cardnews
/plugin install cardnews@socialmedia-cardnews
```

`Successfully installed` 메시지가 나오면 끝. 이제 어느 폴더에서든 `/cardnews`를 쓸 수 있습니다.

> **다른 설치 방법 (개발자용)**: 저장소를 클론해서 그 폴더 안에서만 쓸 수도 있습니다.
> ```bash
> git clone https://github.com/kojh0111/socialmedia-cardnews.git
> cd socialmedia-cardnews && claude
> ```

### 3. 첫 실행

결과물을 모아둘 폴더를 만들고 그 안에서 Claude Code를 실행합니다:

```bash
mkdir my-cardnews && cd my-cardnews && claude
```

첫 카드뉴스를 요청하면:

```
/cardnews 주제: AI로 인스타 콘텐츠 만드는 법
```

**최초 1회 온보딩**이 자동으로 시작됩니다:

1. 타깃이 누구인지 (그 사람의 고민, 원하는 것)
2. 브랜드가 있는지 — 있다면 브랜드명, @핸들, 컬러, 톤
3. 로고가 있다면 폴더에 `assets/logo.png`로 넣기 (색을 분석해 디자인에 반영)

답변은 `cardnews.config.json`에 저장되고 **다시 묻지 않습니다.**
이어서 장수(6/8/10장)를 고르고, 문구 초안을 확인하면 제작이 시작됩니다.
중간에 Playwright(PNG 추출 도구) 설치를 물어보면 승인하세요 — 최초 1회만입니다.

### 4. 결과물 확인

`output/주제명/` 폴더에 저장됩니다:

```
output/ai-instagram-content/
├── cards.html      # 디자인 원본 (브라우저에서 미리보기)
├── slide-01.png    # 1080x1350, 바로 업로드 가능
├── ...
└── slide-10.png
```

---

## 일상 사용법

설치 후에는 주제만 입력하면 됩니다 (회당 1~2분):

```
/cardnews 주제: 프리랜서가 가격을 낮추면 안 되는 이유
```

더 정확한 결과를 원하면 자세히:

```
/cardnews
주제: AI 카드뉴스 자동화
타깃: 인스타그램 콘텐츠를 만드는 1인 크리에이터
목표: Claude 프로젝트 기능을 써보고 싶게 만들기
슬라이드 수: 8장
CTA: 댓글에 "카드뉴스" 남기면 지침 보내주기
```

질문 없이 바로 받고 싶으면 `묻지 말고 바로 만들어줘`를 붙이세요.

**수정 요청 예시:**

- `1장 훅을 더 날카롭게 다시 써줘`
- `텍스트를 줄이고 여백을 더 넓게`
- `9장을 체크리스트로 더 강하게 구성해줘`
- `이전과 다른 컬러·레이아웃으로 다시 만들어줘`

**설정 변경:** `cardnews.config.json`을 직접 수정하거나 "페르소나 바꿔줘"라고 말하면 됩니다.

---

## Canva 연동 (선택)

PNG 대신 **Canva에서 직접 수정 가능한 디자인**으로 받고 싶을 때. 최초 1회만:

1. 제작 중 "Canva로 만들어줘"라고 말하기 → 연결이 없으면 **Claude가 등록 명령을 대신 실행**
   (직접 하려면: `claude mcp add canva -- npx -y mcp-remote@latest https://mcp.canva.com/mcp`)
2. Claude Code 재시작 (`exit` 후 다시 `claude`)
3. `/mcp` 입력 → canva 선택 → 브라우저에서 Canva 계정 로그인
4. 끝 — 이후엔 "Canva로 만들어줘" 한마디면 됩니다

| | 로컬 PNG 모드 (기본) | Canva 모드 |
|---|---|---|
| 레이아웃 제어 | 픽셀 단위 정밀 제어 | Canva AI가 생성 (제어 약함) |
| 결과물 수정 | Claude에게 말로 요청 | Canva 편집기에서 직접 |
| 추가 세팅 | 없음 | Canva 로그인 1회 |

---

## 자주 묻는 것

- **스킬 업데이트**: `/plugin marketplace update socialmedia-cardnews`
- **PNG가 안 나와요**: Node.js가 설치돼 있는지 확인 (`node -v`). Claude가 Playwright 설치를 물어보면 승인하세요
- **매번 같은 스타일로 나오게 하고 싶어요**: 온보딩 때 브랜드 컬러·톤을 등록하거나 `cardnews.config.json`에 추가하세요
- **참여형 콘텐츠 팁**: 마지막 장 CTA에 댓글 키워드를 넣으면 자동 DM 자료 배포와 연결하기 좋습니다

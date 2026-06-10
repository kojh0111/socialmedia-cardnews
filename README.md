# 카드뉴스 공장 (Claude Code 스킬)

주제만 입력하면 Claude가 장수·톤·출력 방식을 함께 정하고, 한국어 N장 카드뉴스 캐러셀을
**1080x1350 PNG**(로컬 제작) 또는 **Canva 디자인**(Canva 연동 시)으로 만들어주는 Claude Code 스킬입니다.

## 처음 쓰는 사람용 — A to Z

### 준비 (최초 1회, 약 10분)

1. **Claude 구독** — Claude Pro 이상 필요 (스킬은 무료, 실행은 본인 계정)
2. **Node.js 설치** — [nodejs.org](https://nodejs.org)에서 LTS 버전 (PNG 추출에 필요)
3. **Claude Code 설치** — 터미널에서:
   ```bash
   npm install -g @anthropic-ai/claude-code
   ```
4. **첫 실행 + 로그인** — `claude` 입력하면 브라우저로 로그인 안내가 뜹니다
5. **스킬 설치** — Claude Code 안에서 두 줄:
   ```
   /plugin marketplace add kojh0111/socialmedia-cardnews
   /plugin install cardnews@socialmedia-cardnews
   ```

### 첫 사용 (최초 1회, 약 5분)

6. **작업 폴더 만들고 실행**:
   ```bash
   mkdir my-cardnews && cd my-cardnews && claude
   ```
7. **첫 카드뉴스 요청**: `/cardnews 주제: 원하는 주제`
8. **페르소나 온보딩 (자동 시작)** — 타깃이 누구인지, 브랜드가 있는지(브랜드명·@핸들·컬러·톤) 물어봅니다. 로고가 있으면 `assets/logo.png`로 넣어주세요 — 색까지 분석해 반영합니다. 답변은 `cardnews.config.json`에 저장되고 다시 묻지 않습니다.
9. **장수·톤 선택 → 문구 초안 확인 → 제작** — 중간에 Playwright 설치를 물어보면 승인 (최초 1회만)
10. **결과물 수령** — `output/주제명/` 폴더에 `slide-01.png` ~ `slide-N.png`

### 이후 일상 사용 (회당 1~2분)

주제만 입력하면 끝:
```
/cardnews 주제: 프리랜서가 가격을 낮추면 안 되는 이유
```
수정도 말로: "1장 훅 더 날카롭게", "여백 더 넓게"

---

## 설치

### 방법 A — 플러그인 설치 (추천, 모든 프로젝트에서 사용 가능)

Claude Code 안에서 두 명령이면 끝납니다:

```
/plugin marketplace add kojh0111/socialmedia-cardnews
/plugin install cardnews@socialmedia-cardnews
```

### 방법 B — 저장소 클론 (이 프로젝트 안에서만 사용)

```bash
git clone https://github.com/kojh0111/socialmedia-cardnews.git
cd socialmedia-cardnews
claude
```

어느 방법이든 PNG 자동 추출에 Playwright가 필요합니다. Claude가 필요할 때 직접 설치해 주지만, 미리 해두려면:

```bash
npm install playwright
npx playwright install chromium
```

## 사용법

Claude Code 안에서:

```
/cardnews 주제: AI로 인스타 콘텐츠 만드는 법
```

**최초 1회**는 Claude가 타깃 페르소나와 브랜드 정보(브랜드명, 로고, 컬러, 핸들, 톤)를 물어보고
`cardnews.config.json`에 저장합니다. 로고가 있다면 `assets/` 폴더에 넣어주세요.
그 다음부터는 주제만 입력하면 저장된 페르소나·브랜드 기준으로 바로 제작됩니다.
설정을 바꾸고 싶으면 `cardnews.config.json`을 직접 수정하거나 Claude에게 "페르소나 바꿔줘"라고 하면 됩니다.
(스키마 예시: `cardnews.config.example.json`)

Claude가 장수(6/8/10장 등)와 출력 방식, 톤을 물어본 뒤, 콘셉트와 슬라이드별 문구 초안을 먼저 보여주고
확인을 받아 제작합니다. 더 정확한 결과를 원하면 처음부터 자세히 입력하세요:

```
/cardnews
주제: AI 카드뉴스 자동화
타깃: 인스타그램 콘텐츠를 만드는 1인 크리에이터
목표: Claude 프로젝트 기능을 써보고 싶게 만들기
톤: 실용적이고 세련된 카드뉴스
슬라이드 수: 8장
CTA: 댓글에 "카드뉴스" 남기면 지침 보내주기
```

질문 없이 바로 받고 싶으면 "묻지 말고 바로 만들어줘"를 붙이면 됩니다.

결과물은 `output/<주제>/` 폴더에 저장됩니다:

```
output/ai-instagram-content/
├── cards.html      # 디자인 원본 (브라우저에서 미리보기 가능)
├── slide-01.png
├── ...
└── slide-10.png
```

## Canva 연동 (선택)

결과물을 HTML/PNG 대신 **수정 가능한 Canva 디자인**으로 받고 싶을 때. 활성화 절차 (최초 1회):

1. 카드뉴스 제작 중 출력 방식에서 "Canva"를 선택하거나, 그냥 "Canva로 만들어줘"라고 말하기
2. 연결이 안 돼 있으면 **Claude가 등록 명령을 대신 실행**해줍니다 (직접 하려면 아래):
   ```bash
   claude mcp add canva -- npx -y mcp-remote@latest https://mcp.canva.com/mcp
   ```
3. Claude Code 재시작 (`exit` 후 다시 `claude`)
4. `/mcp` 입력 → canva 선택 → 브라우저에서 Canva 계정 로그인
5. 끝 — 이후에는 "Canva로 만들어줘" 한마디면 됩니다 (연결은 계속 유지)

- **로컬 PNG 모드**: 레이아웃을 픽셀 단위로 정밀 제어, MCP 불필요 (기본·추천)
- **Canva 모드**: 결과물을 Canva에서 직접 수정 가능, 세부 레이아웃 제어는 상대적으로 약함

## 수정 요청 예시

- `1장 훅을 더 날카롭게 다시 써줘`
- `텍스트를 줄이고 여백을 더 넓게`
- `9장을 체크리스트로 더 강하게 구성해줘`
- `이전과 다른 컬러·레이아웃으로 다시 만들어줘`

## 운영 팁

- 매번 같은 스타일을 원하면 `.claude/skills/cardnews/SKILL.md`에 선호 컬러나 브랜드 톤을 추가하세요.
- 정보형 주제는 체크리스트 장을 강하게, 참여형 콘텐츠는 마지막 CTA에 댓글 키워드를 넣으면 좋습니다.

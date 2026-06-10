# 카드뉴스 공장 (Claude Code 스킬)

주제만 입력하면 Claude가 장수·톤·출력 방식을 함께 정하고, 한국어 N장 카드뉴스 캐러셀을
**1080x1350 PNG**(로컬 제작) 또는 **Canva 디자인**(Canva 연동 시)으로 만들어주는 Claude Code 스킬입니다.

## 준비물

- [Claude Code](https://claude.com/claude-code) 설치
- Node.js 18 이상 (PNG 자동 추출용)

## 설치

이 폴더를 통째로 받은 뒤, 폴더 안에서 Claude Code를 실행하면 끝입니다.

```bash
cd loveomom
claude
```

PNG 자동 추출을 위해 최초 1회만 Playwright를 설치합니다 (Claude가 필요 시 직접 설치해 주기도 합니다):

```bash
npm install
npx playwright install chromium
```

다른 프로젝트에서도 쓰고 싶다면 `.claude/skills/cardnews` 폴더를
`~/.claude/skills/cardnews`로 복사하면 모든 프로젝트에서 사용할 수 있습니다.

## 사용법

Claude Code 안에서:

```
/cardnews 주제: AI로 인스타 콘텐츠 만드는 법
```

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

결과물을 HTML/PNG 대신 **수정 가능한 Canva 디자인**으로 받고 싶다면 Canva MCP를 연결하세요:

```bash
claude mcp add canva -- npx -y mcp-remote@latest https://mcp.canva.com/mcp
```

연결 후 Claude Code를 재시작하고 `/mcp`에서 Canva 로그인을 완료하면,
카드뉴스 제작 시 "Canva 디자인 생성"을 선택할 수 있습니다.

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

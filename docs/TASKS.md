# AZNP Home — 히어로 & 멀티체인 에이전트 인프라 작업 체크리스트 (docs/TASKS.md)

> 이 문서는 **`docs/` 디렉터리**의 작업 체크리스트입니다.
> 루트 `TASKS.md`가 기존 aznp-home 수정 체크리스트라면, 본 문서는 **"멀티체인 에이전트 인프라" 톤 전환 작업** 전용입니다.
> 각 작업 완료 후 체크박스를 `[x]`로 갱신하세요.

## 목표

- 히어로 문구를 **특정 체인 한정 → AI Agents 범용**으로 변경
  (`Ultra-Lightweight Context & Token Optimization Edge Proxy for Autonomous AI Agents`)
- **Supported Ecosystems** 섹션 신설 — Solana(현재 지원) + Base/EVM(확장 예정) 직관 표시
- 기존 `aznp-home` Cloudflare Pages 프로젝트 배포 관련 부분 **제거** (새 Pages 프로젝트로 전환 예정)

## 현재 상태 (aznp-home `main` 기준, 2026-09-11)

- [x] 용어 변경: Solana-first 카피(기존 TASKS.md)는 유지하되, 히어로 톤을 "멀티체인 에이전트 인프라"로 확장
- [x] 배포 방식: `npm run deploy`(aznp-home Pages) 폐기 — 새 Pages 프로젝트로 전환

---

## 1. 히어로 섹션 문구 변경 — `src/i18n/dictionaries.ts`

- [x] `en.hero.titleLine1`: "AI Agents Deserve" → **"Ultra-Lightweight Context & Token Optimization"**
- [x] `en.hero.titleLine2`: "Zero-Noise Context" → **"Edge Proxy for Autonomous AI Agents"**
- [x] `ko.hero.titleLine1`: "AI 에이전트의 눈에는" → **"초경량 컨텍스트 & 토큰 최적화"**
- [x] `ko.hero.titleLine2`: "노이즈가 없어야 합니다" → **"자율 AI 에이전트를 위한 엣지 프록시"**
- [x] (검토) `hero.subtitle` / `subtitleHighlight` — 기존 값 유지 (이미 "ultra-lightweight Markdown"·토큰 절감과 정합)

## 2. Supported Ecosystems 섹션 신설

- [x] `src/i18n/dictionaries.ts` — `en.supportedEcosystems` 객체 추가
  - **Solana (Live)**: Ed25519 Wallet Signature · Solana USDC Micropayments · Solana Agent Kit
  - **Base / EVM (Coming Soon)**: EIP-712 / EIP-191 Signature · Base USDC Micropayments · Coinbase Agent Kit (Integration 배지)
- [x] `src/i18n/dictionaries.ts` — `ko.supportedEcosystems` 객체 추가 (한국어 번역)
- [x] `src/components/SupportedEcosystems.tsx` — 새 컴포넌트 생성
  - 기존 `glass-card`·`badge`(indigo/purple/cyan) 스타일 재사용, 2열 그리드 + 모바일 1열 반응형
- [x] `src/app/page.tsx` — `SupportedEcosystems` import 및 `<Features />` 다음 `<BotDemo />` 앞에 배치

## 3. 기존 배포(aznp-home Pages) 부분 제거

- [x] `package.json` — `deploy` 스크립트 제거 (`--project-name=aznp-home` 하드코딩)
- [x] `README.md` — 기술 스택의 `Deployment: Cloudflare Pages (GitHub 저장소 자동 연동 배포)` 줄 제거
- [x] `README.md` — `## ☁️ Cloudflare Pages 배포` 섹션 제거 (기존 프로젝트명·`npm run deploy` 참조)
- [x] 루트 `TASKS.md` — 목표의 "배포는 사용자 승인 후 수행" 문구 제거
- [x] 루트 `TASKS.md` — 검증의 "배포는 사용자 승인 후" 항목 제거

## 5. 홈화면 결제·신원 체인 Solana → Base(EVM) 전환

- [x] `src/i18n/dictionaries.ts` (en/ko) — `hero.terminalCommentIdentity` · `howItWorks.tier3Badge` · `features.f4Title/f4Desc` · `supportedEcosystems`(Base Live / Solana Compatibility, 서브타이틀) · `pricing`(badge/subtitle/FAQ/agentAutoPay)를 Base(EVM) EIP-191·EIP-712로 전환
- [x] `src/components/Hero.tsx` — 선택 신원 curl 예시를 Base(EVM) 주소 + EIP-191 서명 + `x-chain: base` 헤더로 교체
- [x] `src/components/PricingPreview.tsx` — Pro 기능 "Base (EVM) EIP-191 Stateless Auth", 하단 "Base(EVM) 수신 지갑 가이드" 링크 문구 교체
- [x] `src/components/SupportedEcosystems.tsx` — Base(EVM) 카드를 앞에 배치(Live), Solana는 호환성 배지
- [x] `src/app/page.tsx` · `src/app/layout.tsx` — 메타데이터·키워드를 Solana → Base(EVM) 서명으로 갱신
- [x] `src/app/pricing/page.tsx` — Pro/Enterprise 카드의 "Solana Ed25519 Auth" → "Base (EVM) EIP-191 Auth"

## 6. "Out of grant scope — kept for compatibility" 라벨 일괄 제거

- [x] `src/components/PricingPreview.tsx` — Pro/Enterprise `outOfScope` 배지(2곳)·속성 제거
- [x] `src/app/pricing/page.tsx` — `grantBanner` 배너 제거, Free 카드의 "(out of grant scope)" 노트 → "Pro"
- [x] `src/app/docs/page.tsx` — `outOfScopeNote` 안내 제거
- [x] `src/app/docs/api/page.tsx` — `topupScope` 배지 제거, queryParams·402 설명에서 "out of grant scope" 표현 정리
- [x] `src/i18n/dictionaries.ts` (en/ko) — `outOfScope`, `grantBanner`, `outOfScopeNote`, `topupScope` 키 제거, pricing subtitle 정리
- [x] `README.md` — "Out of grant scope" 섹션 및 "그랜트 범위 밖" 표현 정리
- [x] `public/llms.txt` · `public/llms-full.txt` · `public/openapi.json` — grant 표기 제거
- [x] `src/components/SupportedEcosystems.tsx` · `src/i18n/dictionaries.ts` — Solana 카드·키 제거, Base(EVM) 카드 단일화 (1열 그리드)

## 7. 검증

- [x] `npm run build` PASS
- [x] `git diff`로 변경 파일 목록 최종 확인
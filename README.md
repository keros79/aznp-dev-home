# AZNP Home (Agentic Zero-Noise Proxy 랜딩페이지)

> AI 에이전트를 위한 **Zero-Noise Markdown 프록시** — 공개 무료(public good).
> 웹페이지를 초경량 Clean Markdown으로 변환해 LLM 토큰 비용을 75~90% 절감합니다.
> 지갑·API Key 없이 누구나 호출할 수 있으며, Solana Ed25519 서명은 **신원(identity)** 용도로 선택 사용합니다.

AZNP(Agentic Zero-Noise Proxy) 공식 랜딩페이지 및 문서 사이트입니다.
Next.js 15 App Router + Tailwind CSS v4 + Zustand + TanStack Query로 구축되었습니다.

## 🚀 기술 스택

- **Framework**: Next.js 15 (App Router, Static Export `output: 'export'`)
- **Styling**: Tailwind CSS v4 (`@theme` 기반 디자인 토큰)
- **Localization**: i18n (English `en` 기본, 한국어 `ko` 지원, 🌐 언어 스위처 제공)
- **State Management**: Zustand (`i18nStore`, `demoStore`)
- **Data Fetching**: TanStack Query v5

---

## 💡 핵심 특징

- **무료 convert**: `GET /?url=...` — 로그인·API Key·크레딧 없이 바로 200. `markdown` / `json` / `toml` / `yaml` / `json-ld` 전 포맷 지원
- **`max_tokens`**: 출력을 토큰 예산 안에서 절단 (무료)
- **75~90% 토큰 절감**: 지저분한 HTML(광고, 네비게이션, CSS/JS 등)을 제거해 LLM 비용 절감
- **Solana Ed25519 무상태 인증 (선택)**: 본인 지갑 키페어가 곧 계정 ID. 가입·API Key 불필요 (요청 신원용)
- **AI 표준 규격 노출**: `/llms.txt` · `/llms-full.txt` · `/openapi.json` — 인증 없이 200
- **3-Tier Cascading Engine**: Tier 1 (Cloudflare Native) → Tier 2 (자체 변환) → Tier 3 (Browser Rendering `render=true`)
- **다층 에지 캐시**: Cache API (L1) + Cloudflare KV (L2) 이중 캐싱

---

## 🚀 사용법 — 무료 즉시 시작 (인증 불필요)

```bash
# 기본 Markdown
curl "https://aznp-proxy.kerberos79.workers.dev/?url=https://news.ycombinator.com"

# 구조화 JSON (무료)
curl "https://aznp-proxy.kerberos79.workers.dev/?url=https://example.com&format=json"

# 토큰 예산 (무료)
curl "https://aznp-proxy.kerberos79.workers.dev/?url=https://example.com&max_tokens=2000"
```

### 파라미터 요약

| 파라미터 | 기본값 | 설명 |
|----------|--------|------|
| `url` | 필수 | 대상 웹페이지 URL |
| `format` | `markdown` | `markdown` / `json` / `toml` / `yaml` / `json-ld` — **전 포맷 무료** |
| `max_tokens` | `0` | 최대 토큰 제한 (**무료**) |
| `images` | `1` | `0` → 이미지 제외 |
| `mode` | `auto` | `auto` / `summary` (summary는 Pro) |
| `render` | `false` | `true` → JS 렌더링 강제 (Pro) |
| `fresh` | `0` | `1` → 캐시 우회 |

### Solana Ed25519 서명 (선택 — 신원)

지갑 키페어로 `x402:{timestamp}` 메시지를 Ed25519 서명해 헤더로 보내면 요청 신원을 확인하고 상위 Rate Limit을 적용합니다.

```bash
curl "https://aznp-proxy.kerberos79.workers.dev/?url=https://news.ycombinator.com" \
  -H "x-wallet-address: 7xKX..." \
  -H "x-timestamp: 1786249000" \
  -H "x-signature: 3mZ..."
```

---

## 📦 File Bypass 동작

PDF·이미지·영상 등 HTML이 아닌 파일 URL은 **변환 없이 원본 응답을 그대로 투명 프록시** 처리합니다.

- URL 확장자 기반 판별: `.pdf`, `.png`, `.mp4`, `.zip`, `.docx` 등
- Content-Type 기반 판별: `image/*`, `video/*`, `audio/*`, `application/pdf` 등
- Bypass 응답 헤더: `X-AZNP-Bypass: true`, `X-AZNP-Cache: BYPASS`

---

## 🤖 AI 에이전트 전용 표준 규격 (Machine-Readable Specs)

- **[`/llms.txt`](https://aznp-home.pages.dev/llms.txt)**: AI 에이전트 탐색용 요약 가이드 (무료 convert, Solana 서명)
- **[`/llms-full.txt`](https://aznp-home.pages.dev/llms-full.txt)**: 전체 API 파라미터·헤더·에러 코드·예시
- **[`/openapi.json`](https://aznp-home.pages.dev/openapi.json)**: OpenAPI 3.0.3 명세 (Custom GPT / LangChain 연동용)

---

## 💳 유료 크레딧 — 온체인 충전 (`POST /v1/topup`)

### 유료 크레딧 — 온체인 충전 (`POST /v1/topup`)

| 티어 | 최소 충전액 | 부여 크레딧 (요청 횟수) | 건당 단가 |
|------|------------|------------------------|-----------|
| **Pro Agent** | **$20 USDC** | **12,000회** | **$0.00166** |
| **Enterprise** | **$100 USDC** | **80,000회** | **$0.00125** |

- 충전 엔드포인트: `POST /v1/topup` (`{ "wallet": "...", "tx_hash": "...", "chain": "base" }`)
- 인증 헤더: `x-wallet-address`, `x-timestamp`, `x-signature`, `x-chain`
- Lemon Squeezy / 수동 Pro API Key(`X-API-Key: aznp_pro_...`)도 지원합니다.

### Base (EVM L2) 멀티체인

Base 지갑(EIP-191 / EIP-712) 인증·Base native USDC 충전·`networks[]`의 base 객체를 지원합니다.

### Browser Rendering (Pro Tier 3)

`render=true` 시 JS 렌더링 폴백 경로(Tier 3 Pro)를 제공합니다.

---

## 🛠️ 개발 및 테스트

```bash
# 개발 서버 실행 (http://localhost:3000)
npm run dev

# 정적 빌드 테스트 (output: 'export' → /out)
npm run build

# 로컬 Cloudflare Pages 에뮬레이션
npm run preview
```
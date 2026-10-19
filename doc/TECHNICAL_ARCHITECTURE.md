# TECHNICAL ARCHITECTURE

## 1. Stack
| Layer | Choice |
|---|---|
| Mobile | React Native + Expo (SDK latest), TypeScript strict, Expo Router |
| State | Zustand (client/draft), TanStack Query (server cache) |
| Forms | React Hook Form + Zod |
| Storage | AsyncStorage / expo-secure-store (tokens) |
| Backend | Node.js + Express (or NestJS) — alt: FastAPI |
| DB | PostgreSQL (Supabase managed) |
| Auth | Supabase Auth or JWT (email + guest sessions) |
| Payments | Simulated provider (`MockPaymentProvider`) |
| AI/Voice | `AIService` interface: real (expo-speech-recognition / LLM API) or demo stub |
| Media | expo-image-picker, expo-image; Supabase Storage |
| Build | EAS Build → Android APK (`preview` profile) |

## 2. Architecture Overview
```
Expo App ──▶ Service Layer (api client) ──▶ REST API ──▶ PostgreSQL
   │                 │                          │
   │        Mock adapters (offline demo)        ├─ Auth/RBAC middleware
   ▼                                            ├─ Zod validation
Zustand + Query cache                           └─ Lifecycle state machine
```
**Key principle:** the app talks only to a `services/` interface. Two adapters exist: `remote` (real API) and `mock` (seeded local data). Toggle via `EXPO_PUBLIC_DATA_MODE=mock|remote`. This guarantees a working APK even if the backend is down.

## 3. Folder Structure
```
app/                       # Expo Router
  (tabs)/ index, explore, create, activity, profile
  campaign/[id].tsx
  back/[id]/ amount, review, pay, result
  create/ index, basics, story, visuals, reach, submit, done, voice
  dashboard/ index, [id], report/[id]
  pages/ about, how-it-works, faq, help, contact, terms, privacy, guidelines, partners
src/
  components/ ui/, campaign/, forms/, feedback/
  features/ home, explore, creation, detail, backing, dashboard, activity, profile
  services/ api.ts, campaigns.ts, drafts.ts, contributions.ts, activity.ts, ai.ts, payments.ts
  store/ draftStore.ts, authStore.ts, savedStore.ts
  config/ assumptions.ts, constants.ts, categories.ts
  lib/ validation/, format.ts, reach.ts, fees.ts
  data/ seed/
  theme/ tokens.ts
  types/
server/ (src/routes, controllers, services, middleware, db/migrations, seed)
```

## 4. Core Modules
- **reach.ts:** `estimateReach(amountUsd)` and `estimateReachAtGoal(goal)` from `assumptions.ts`; always returns `{ low, high }` range, never a single guaranteed value.
- **fees.ts:** `calcFees(amount)` → `{ amount, platformFee, processingFee, total, adBudget }`.
- **lifecycle.ts:** pure transition map + guard functions shared by client and server.
- **draftStore:** persists the entire creation form, `currentStep`, `lastSavedAt`; debounced autosave (800 ms) to local storage and API.
- **AIService:** `suggestBasics(text)`, `transcribe(audio)`, `generateStory(prompt)`; each returns suggestions as editable proposals; failure → fallback banner + manual path.
- **PaymentProvider:** `createIntent(amount, campaignId)` → status `pending|succeeded|failed|rejected|cancelled`; simulated test-trigger amounts (e.g., $13 fails) documented in-app for demo.

## 5. API Surface (summary; full list in `DATA_MODEL_AND_API.md`)
`/auth`, `/campaigns`, `/drafts`, `/contributions`, `/activity`, `/reports`, `/me`, `/dev/review` (optional).

## 6. Data Flow Examples
**Creation:** field change → draftStore → debounce → PATCH `/drafts/:id` → "Saved just now". Submit → POST `/drafts/:id/submit` → server validates → state `submitted` → notification created.
**Backing:** amount → `fees.ts` preview → POST `/contributions` (`pending`) → mock provider → webhook-like callback → `succeeded` → update `raised` transactionally → notification + receipt.

## 7. Error & State Handling
Standard `AsyncState<T>` wrapper; shared `<ScreenState>` component handles skeleton/empty/error/retry. Network errors surface toasts + inline retry. Optimistic UI only for save/follow.

## 8. Performance
FlashList for feeds, image caching/placeholder blurhash, memoized cards, pagination (page size 10), skeleton loaders.

## 9. Testing
Jest unit tests (fees, reach, lifecycle, validation); React Native Testing Library for forms; manual E2E checklist in `QA_AND_ACCEPTANCE_CHECKLIST.md`.

## 10. Build & Release
`eas build -p android --profile preview` → APK. Env via EAS secrets. iOS TestFlight only if requested.

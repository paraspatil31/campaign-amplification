# DATA MODEL AND API

## Entities (PostgreSQL)
- **users**(id, email, name, role[user|reviewer|admin], created_at)
- **campaigns**(id, creator_id, status, title≤60, category, creator_name, creator_type, summary, cover_url, story_json, ad_headline, ad_description, cta_text, ad_assets_json, target_json(geo, interests, channels, budget_alloc), duration_days, funding_goal_cents, goal_set_by, est_reach_low, est_reach_high, raised_cents, backer_count, published_at, funding_ends_at, created_at, updated_at)
- **drafts**(id, user_id, campaign_id?, step, data_json, last_saved_at)
- **sources**(id, campaign_id, title, url, position)
- **contributions**(id, campaign_id, user_id?, guest_email?, amount_cents, platform_fee_cents, processing_fee_cents, total_cents, status[pending|succeeded|failed|rejected|cancelled|refund_pending|refunded], public_name_opt_in, provider_ref, created_at)
- **receipts**(id, contribution_id, number, issued_at)
- **review_decisions / moderation_events**(id, campaign_id, actor_id, action, reason, diff_json, created_at) — append-only audit log
- **campaign_updates**(id, campaign_id, title, body, created_at)
- **notifications**(id, user_id, type, campaign_id?, title, body, read_at, created_at)
- **notification_prefs**(user_id, category, in_app, push, email)
- **follows / saved_campaigns**(user_id, campaign_id)
- **feedback**(id, campaign_id, visuals_continue[no|somewhat|yes], changed_mind[no|somewhat|yes], created_at)
- **reports**(id, campaign_id, funds_raised, ad_budget, ad_spend, impressions, clicks, est_reach, measured_reach, generated_at)

## API (REST, JSON, `/api/v1`)
| Method | Path | Auth | Purpose |
|---|---|---|---|
| POST | /auth/signup, /auth/login, /auth/guest | – | sessions |
| GET | /campaigns?q&category&sort&status&minFunded&page | public | list |
| GET | /campaigns/:id | public | detail incl. sources |
| POST | /campaigns/:id/feedback | public | No/Somewhat/Yes |
| POST/DELETE | /campaigns/:id/save, /follow | user | save/follow |
| GET/POST | /drafts | user | list/create |
| PATCH | /drafts/:id | owner | autosave |
| DELETE | /drafts/:id | owner | delete |
| POST | /drafts/:id/submit | owner | validate + submit |
| GET | /me/campaigns?status | user | dashboard |
| POST | /campaigns/:id/updates | owner | post update |
| POST | /campaigns/:id/respond | owner | reply to change request |
| POST | /contributions | public/guest | create intent |
| POST | /contributions/:id/confirm | system/mock | settle status |
| GET | /contributions/:id/receipt | payer | receipt |
| GET | /me/contributions | user | history |
| GET | /campaigns/:id/report | public/owner | final report |
| GET | /activity, PATCH /activity/:id/read, PATCH /activity/read-all | user | notifications |
| GET/PUT | /me/notification-prefs | user | prefs |
| POST | /ai/suggest, /ai/transcribe | user | AI assist (rate-limited) |
| POST | /dev/review/:id/(approve|changes|reject) | reviewer, flag | demo only |

## Error Format
`{ "error": { "code": "VALIDATION_FAILED", "message": "...", "fields": { "title": "Max 60 characters" } } }` — 400 validation, 401, 403, 404, 409 (illegal transition), 429.

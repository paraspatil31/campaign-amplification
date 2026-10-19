# CAMPAIGN LIFECYCLE

```
Draft → Submitted for Review → { Changes Requested ↔ (edit → resubmit) | Approved }
Approved → Available for Funding → { Funding Goal Reached | Funding Period Ends }
→ Distribution Preparation → Promoting → Completed
Exceptional: Rejected · Cancelled · Refund Pending · Failed
```

## Transition Table
| From | To | Actor | Guard |
|---|---|---|---|
| draft | submitted | creator | all required fields valid, goal set by creator, rules confirmed |
| submitted | changes_requested | reviewer | reason required |
| submitted | approved | reviewer | checklist complete |
| submitted | rejected | reviewer | reason required |
| changes_requested | submitted | creator | edits made |
| approved | available_for_funding | system | approval complete |
| available_for_funding | goal_reached / funding_ended | system | goal met or deadline passed |
| goal_reached / funding_ended | distribution_preparation | system | funds ≥ minimum viable budget |
| funding_ended | refund_pending | system | goal unmet and policy requires refund |
| distribution_preparation | promoting | reviewer/system | approval ✔ + payments settled ✔ + budget ✔ + ad setup ✔ |
| promoting | completed | system | duration ended / budget spent; report generated |
| any pre-promoting | cancelled | creator/reviewer | reason |
| refund_pending | failed/cancelled(refunded) | system | refunds issued |

## Rules
1. Funding completion ≠ promotion started.
2. No public publish or ad distribution before required approvals.
3. Material edits after publish → re-review before ads updated.
4. Each transition writes `moderation_events` and may create notifications.

## Status → UI Mapping
| Status | Chip | Dashboard tab | Public detail |
|---|---|---|---|
| draft | Draft | Drafts | hidden |
| submitted | Under Review | Under Review | hidden |
| changes_requested | Changes Requested | Requires Action | hidden |
| approved/available_for_funding | Funding | Published/Funding | visible + Back |
| goal_reached/funding_ended/distribution_preparation | Preparing | Published/Funding | visible, Back disabled |
| promoting | Promoting | Promoting | visible + live progress |
| completed | Completed | Completed | report link |
| rejected/cancelled/failed/refund_pending | respective | Requires Action | hidden/banner |

## Notifications per Transition
Submission received · approved/rejected/changes · available for backing · milestones 25/50/75/100% · deadline approaching (72h/24h) · promotion begins · distribution progress (≥ 50% spend) · completed · report available.

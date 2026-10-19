import { ActivityItem } from '../../types';

export const SEED_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act-001',
    userId: 'usr-demo-me',
    type: 'milestone',
    campaignId: 'camp-001',
    title: 'Clean River Initiative reached 75% funding!',
    body: 'Thanks to 42 community backers, the campaign is on track to unlock ad distribution next week.',
    readAt: undefined, // unread
    createdAt: '2026-03-12T08:30:00Z',
  },
  {
    id: 'act-002',
    userId: 'usr-demo-me',
    type: 'contribution_success',
    campaignId: 'camp-002',
    title: 'Your $25 contribution was confirmed',
    body: 'Receipt #RCP-94821 issued. Estimated to deliver 1,875–2,930 informative ad views to families in need.',
    readAt: '2026-03-11T14:20:00Z',
    createdAt: '2026-03-11T14:15:00Z',
  },
  {
    id: 'act-003',
    userId: 'usr-demo-me',
    type: 'promotion_progress',
    campaignId: 'camp-011',
    title: 'Pediatric Asthma Alert: 50% ad budget delivered',
    body: 'Over 16,400 verified impressions served to school zone mobile devices following morning air spikes.',
    readAt: undefined, // unread
    createdAt: '2026-03-10T17:00:00Z',
  },
  {
    id: 'act-004',
    userId: 'usr-demo-me',
    type: 'report_available',
    campaignId: 'camp-012',
    title: 'Final Distribution Report is live for Solar Schools',
    body: 'View verified impressions, click-through rates, and post-campaign referendum voting outcomes.',
    readAt: '2026-03-05T10:00:00Z',
    createdAt: '2026-03-05T09:30:00Z',
  },
  {
    id: 'act-005',
    userId: 'usr-demo-me',
    type: 'submission_received',
    campaignId: 'camp-013',
    title: 'Campaign submitted for review',
    body: 'Our review team will verify sources and advertising compliance within 24–48 hours.',
    readAt: '2026-03-11T14:05:00Z',
    createdAt: '2026-03-11T14:00:00Z',
  },
];

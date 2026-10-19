import { DistributionReport } from '../../types';

export const SEED_REPORTS: DistributionReport[] = [
  {
    id: 'rep-001',
    campaignId: 'camp-012',
    campaignTitle: 'Solar Schools Initiative: Clean Power for 50 Classrooms',
    fundsRaisedCents: 200000, // $2,000.00
    adBudgetCents: 173600, // $1,736.00 net ad spend
    adSpendCents: 173600, // 100% deployed
    impressions: 217000, // Verified gross ad impressions
    clicks: 6510,
    ctr: 0.03, // 3.0% CTR
    estReachLow: 13020,
    estReachHigh: 20340,
    measuredReach: 18450, // Measured unique individuals reached
    generatedAt: '2026-02-05T12:00:00Z',
  },
];

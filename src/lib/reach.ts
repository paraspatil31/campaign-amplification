import { ASSUMPTIONS } from '../config/assumptions';
import { calcFees } from './fees';

export interface ReachEstimate {
  low: number;
  high: number;
  grossImpressions: number;
  formatted: string;
  disclaimer: string;
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return num.toLocaleString();
}

/**
 * Calculates estimated unique audience reach for a given contribution amount in USD.
 * Always returns a range [low, high] and explicit estimate copy. Never a single guaranteed number.
 */
export function estimateReach(amountUsd: number): ReachEstimate {
  const fees = calcFees(amountUsd);
  const adBudgetUsd = fees.adBudgetCents / 100;

  if (adBudgetUsd <= 0) {
    return {
      low: 0,
      high: 0,
      grossImpressions: 0,
      formatted: '≈ 0 people (Estimate)',
      disclaimer: ASSUMPTIONS.REACH_DISCLAIMER,
    };
  }

  // Gross impressions based on configured CPM
  const grossImpressions = Math.round((adBudgetUsd / ASSUMPTIONS.CPM_USD) * 1000);

  // Baseline unique reach scaled by unique factor
  const baselineUnique = grossImpressions * ASSUMPTIONS.UNIQUE_REACH_FACTOR;

  // Bracket reach into realistic range (±20-25%)
  const low = Math.max(1, Math.floor(baselineUnique * 0.8));
  const high = Math.max(low + 1, Math.ceil(baselineUnique * 1.25));

  return {
    low,
    high,
    grossImpressions,
    formatted: `≈ ${formatNumber(low)}–${formatNumber(high)} people`,
    disclaimer: ASSUMPTIONS.REACH_DISCLAIMER,
  };
}

/**
 * Calculates estimated unique audience reach for a campaign's total funding goal (in cents).
 */
export function estimateReachAtGoal(goalCents: number): ReachEstimate {
  const goalUsd = goalCents / 100;
  return estimateReach(goalUsd);
}

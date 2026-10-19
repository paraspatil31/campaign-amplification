export const ASSUMPTIONS = {
  // Advertising assumptions (demo defaults per PRD §7)
  CPM_USD: 8.0, // Cost per 1,000 impressions in USD
  UNIQUE_REACH_FACTOR: 0.6, // Ratio of unique people reached per gross impression

  // Fee structure
  PLATFORM_FEE_RATE: 0.1, // 10% platform fee
  PROCESSING_FEE_RATE: 0.029, // 2.9% payment processing fee
  PROCESSING_FEE_FIXED_USD: 0.3, // $0.30 fixed payment processing fee

  // Contribution limits & presets
  MIN_CONTRIBUTION_USD: 5,
  MAX_CONTRIBUTION_USD: 5000,
  PRESET_AMOUNTS_USD: [5, 10, 25, 50, 100],

  // Campaign goal bounds
  MIN_GOAL_USD: 100,
  MAX_GOAL_USD: 100000,
  DEFAULT_DURATION_DAYS: 30,

  // Disclaimers
  REACH_DISCLAIMER: 'Estimate based on projected ad distribution costs. Not a guaranteed outcome.',
  NOT_A_DONATION_NOTICE:
    'Contributions fund advertising distribution of this message, not the cause, person, or organization directly.',
};

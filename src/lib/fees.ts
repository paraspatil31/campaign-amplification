import { ASSUMPTIONS } from '../config/assumptions';

export interface FeeBreakdown {
  amountCents: number;
  platformFeeCents: number;
  processingFeeCents: number;
  adBudgetCents: number;
  totalCents: number;
  // Formatted USD strings for display
  amountFormatted: string;
  platformFeeFormatted: string;
  processingFeeFormatted: string;
  adBudgetFormatted: string;
  totalFormatted: string;
  adBudgetPercentage: number;
}

export function calcFees(amountUsd: number): FeeBreakdown {
  const safeAmount = Math.max(0, Number.isFinite(amountUsd) ? amountUsd : 0);
  const amountCents = Math.round(safeAmount * 100);

  // Platform fee: 10%
  const platformFeeCents = Math.round(amountCents * ASSUMPTIONS.PLATFORM_FEE_RATE);

  // Processing fee: 2.9% + $0.30 fixed
  const processingFeeCents =
    amountCents > 0
      ? Math.round(
          amountCents * ASSUMPTIONS.PROCESSING_FEE_RATE +
            ASSUMPTIONS.PROCESSING_FEE_FIXED_USD * 100
        )
      : 0;

  // Remainder is dedicated advertising budget
  const adBudgetCents = Math.max(
    0,
    amountCents - platformFeeCents - processingFeeCents
  );

  const adBudgetPercentage =
    amountCents > 0 ? Math.round((adBudgetCents / amountCents) * 100) : 0;

  const formatCents = (cents: number): string => `$${(cents / 100).toFixed(2)}`;

  return {
    amountCents,
    platformFeeCents,
    processingFeeCents,
    adBudgetCents,
    totalCents: amountCents,
    amountFormatted: formatCents(amountCents),
    platformFeeFormatted: formatCents(platformFeeCents),
    processingFeeFormatted: formatCents(processingFeeCents),
    adBudgetFormatted: formatCents(adBudgetCents),
    totalFormatted: formatCents(amountCents),
    adBudgetPercentage,
  };
}

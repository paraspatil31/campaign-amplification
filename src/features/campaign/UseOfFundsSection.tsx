import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, typography, spacing, radius } from '@/theme/tokens';
import { Campaign } from '@/types';
import { calcFees } from '@/lib/fees';
import { Accordion } from '@/components/ui/Accordion';
import { ASSUMPTIONS } from '@/config/assumptions';

interface UseOfFundsSectionProps {
  campaign: Campaign;
}

export function UseOfFundsSection({ campaign }: UseOfFundsSectionProps) {
  const goalUsd = campaign.fundingGoalCents / 100;
  const fees = calcFees(goalUsd);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>Use of Funds & Disclosures</Text>

      {/* Mandatory AGENT.md §3 rule 2 Banner */}
      <View style={styles.noticeCard}>
        <Feather name="shield" size={18} color={colors.primary} style={styles.noticeIcon} />
        <View style={styles.noticeContent}>
          <Text style={styles.noticeTitle}>Not Direct Cause Support</Text>
          <Text style={styles.noticeText}>
            {ASSUMPTIONS.NOT_A_DONATION_NOTICE} Contributions are exclusively pooled to buy media placements and run distribution campaigns.
          </Text>
        </View>
      </View>

      <Accordion title="Budget Allocation Breakdown" defaultExpanded={true}>
        <View style={styles.breakdownContainer}>
          <Text style={styles.breakdownIntro}>
            Based on the creator's goal of {fees.amountFormatted}:
          </Text>

          <View style={styles.feeRow}>
            <View style={styles.feeLabelCol}>
              <View style={[styles.colorDot, { backgroundColor: colors.accent }]} />
              <Text style={styles.feeLabel}>Ad Distribution Placements ({fees.adBudgetPercentage}%)</Text>
            </View>
            <Text style={styles.feeAmount}>{fees.adBudgetFormatted}</Text>
          </View>
          <Text style={styles.feeExplainer}>
            Direct digital media ad spend (feed ads, display networks, targeted search).
          </Text>

          <View style={styles.feeRow}>
            <View style={styles.feeLabelCol}>
              <View style={[styles.colorDot, { backgroundColor: colors.primary }]} />
              <Text style={styles.feeLabel}>Platform & Verification Fee</Text>
            </View>
            <Text style={styles.feeAmount}>{fees.platformFeeFormatted}</Text>
          </View>
          <Text style={styles.feeExplainer}>
            Covers compliance, moderation review, source verification, and ad ops management.
          </Text>

          <View style={styles.feeRow}>
            <View style={styles.feeLabelCol}>
              <View style={[styles.colorDot, { backgroundColor: colors.inkMuted }]} />
              <Text style={styles.feeLabel}>Payment Processing (Stripe / Bank)</Text>
            </View>
            <Text style={styles.feeAmount}>{fees.processingFeeFormatted}</Text>
          </View>
          <Text style={styles.feeExplainer}>
            Third-party credit card gateway fees (2.9% + $0.30 standard rate).
          </Text>
        </View>
      </Accordion>

      <Accordion title="Refunds & Protection Policy">
        <View style={styles.policyBody}>
          <Text style={styles.policyText}>
            • If a campaign fails to reach its funding target by the deadline, or if it fails moderation checks, backers receive automatic refunds to their original payment method.
          </Text>
          <Text style={styles.policyText}>
            • No creator receives liquid cash payouts. All ad funds are managed and disbursed directly to verified advertising networks by the platform.
          </Text>
        </View>
      </Accordion>

      <Accordion title="Unspent Funds Policy">
        <View style={styles.policyBody}>
          <Text style={styles.policyText}>
            If digital advertising networks do not consume the entire ad budget within the scheduled campaign window (e.g. high bid efficiency or audience saturation), unspent amounts are credited back or carried forward to an extended amplification flight upon creator request.
          </Text>
        </View>
      </Accordion>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.md,
  },
  sectionHeader: {
    ...typography.h3,
    color: colors.ink,
    marginBottom: spacing.sm,
  },
  noticeCard: {
    flexDirection: 'row',
    backgroundColor: colors.primaryLight,
    padding: spacing.md,
    borderRadius: radius.card,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(31, 79, 216, 0.15)',
  },
  noticeIcon: {
    marginRight: spacing.sm,
    marginTop: 2,
  },
  noticeContent: {
    flex: 1,
  },
  noticeTitle: {
    ...typography.captionMedium,
    fontWeight: '700',
    color: colors.primaryDark,
    marginBottom: 2,
  },
  noticeText: {
    ...typography.caption,
    color: colors.ink,
    lineHeight: 18,
  },
  breakdownContainer: {
    paddingVertical: spacing.xs,
  },
  breakdownIntro: {
    ...typography.caption,
    color: colors.inkMuted,
    marginBottom: spacing.sm,
  },
  feeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  feeLabelCol: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  feeLabel: {
    ...typography.captionMedium,
    fontWeight: '700',
    color: colors.ink,
  },
  feeAmount: {
    ...typography.captionMedium,
    fontWeight: '700',
    color: colors.ink,
  },
  feeExplainer: {
    ...typography.caption,
    color: colors.inkSubtle,
    fontSize: 11,
    marginBottom: spacing.xs,
    marginLeft: 14,
  },
  policyBody: {
    paddingVertical: spacing.xs,
    gap: spacing.xs,
  },
  policyText: {
    ...typography.caption,
    color: colors.inkMuted,
    lineHeight: 18,
  },
});

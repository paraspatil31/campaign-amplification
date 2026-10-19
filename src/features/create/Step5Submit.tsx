import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, typography, spacing, radius } from '@/theme/tokens';
import { Campaign } from '@/types';
import { ASSUMPTIONS } from '@/config/assumptions';
import { calcFees } from '@/lib/fees';
import { estimateReach } from '@/lib/reach';
import { formatCurrency } from '@/lib/format';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface Step5SubmitProps {
  data: Partial<Campaign>;
  onChange: (fields: Partial<Campaign>) => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
  errors?: Record<string, string>;
}

const PRESET_GOALS = [500, 1000, 2500, 5000];

export function Step5Submit({
  data,
  onChange,
  onSubmit,
  isSubmitting = false,
  errors = {},
}: Step5SubmitProps) {
  const [customGoal, setCustomGoal] = useState<string>(
    data.fundingGoalCents ? String(data.fundingGoalCents / 100) : '1000'
  );

  const [confirmAccurate, setConfirmAccurate] = useState(false);
  const [confirmAdUse, setConfirmAdUse] = useState(false);
  const [confirmPolicies, setConfirmPolicies] = useState(false);

  const goalUsd = parseFloat(customGoal) || 0;
  const fees = calcFees(goalUsd);
  const reach = estimateReach(goalUsd);

  const handleSelectGoalPreset = (amount: number) => {
    setCustomGoal(String(amount));
    onChange({ fundingGoalCents: amount * 100, goalSetBy: 'creator' });
  };

  const handleCustomGoalChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    setCustomGoal(cleaned);
    const num = parseInt(cleaned, 10);
    if (!isNaN(num)) {
      onChange({ fundingGoalCents: num * 100, goalSetBy: 'creator' });
    }
  };

  const isGoalValid =
    goalUsd >= ASSUMPTIONS.MIN_GOAL_USD && goalUsd <= ASSUMPTIONS.MAX_GOAL_USD;

  const canSubmit =
    isGoalValid && confirmAccurate && confirmAdUse && confirmPolicies && !isSubmitting;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Final Review & Funding Goal</Text>
      <Text style={styles.subheading}>
        Set your distribution goal, review platform policies, and submit your campaign to our editorial moderation queue.
      </Text>

      {/* Goal Setting Section - Strict rule: set by creator at submit */}
      <View style={styles.goalCard}>
        <View style={styles.goalHeader}>
          <Text style={styles.goalHeaderTitle}>Set Funding Goal ($ USD) *</Text>
          <View style={styles.creatorTag}>
            <Text style={styles.creatorTagText}>CREATOR-DEFINED GOAL</Text>
          </View>
        </View>
        <Text style={styles.goalHelpText}>
          Total advertising distribution budget to be pooled by community backers.
        </Text>

        <View style={styles.presetsRow}>
          {PRESET_GOALS.map((amt) => {
            const isSelected = goalUsd === amt;
            return (
              <TouchableOpacity
                key={amt}
                style={[styles.presetCard, isSelected && styles.presetCardSelected]}
                onPress={() => handleSelectGoalPreset(amt)}
              >
                <Text style={[styles.presetText, isSelected && styles.presetTextSelected]}>
                  ${amt}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Input
          placeholder="Enter goal amount (e.g. 1000)"
          value={customGoal}
          onChangeText={handleCustomGoalChange}
          keyboardType="numeric"
          error={!isGoalValid ? `Goal must be between $${ASSUMPTIONS.MIN_GOAL_USD} and $${ASSUMPTIONS.MAX_GOAL_USD.toLocaleString()}` : undefined}
          helperText={`Min $${ASSUMPTIONS.MIN_GOAL_USD} · Max $${ASSUMPTIONS.MAX_GOAL_USD.toLocaleString()}`}
        />

        {/* Live calculated reach at this goal */}
        <View style={styles.reachResultBox}>
          <Feather name="trending-up" size={18} color={colors.accent} style={{ marginRight: 8 }} />
          <View style={{ flex: 1 }}>
            <Text style={styles.reachResultTitle}>
              Estimated Audience Reach at Goal: {reach.formatted}
            </Text>
            <Text style={styles.reachResultDisclaimer}>*{reach.disclaimer}</Text>
          </View>
        </View>
      </View>

      {/* Fee Transparency Breakdown */}
      <View style={styles.feeCard}>
        <Text style={styles.cardTitle}>Use of Funds Breakdown</Text>
        <View style={styles.feeRow}>
          <Text style={styles.feeLabel}>Net Ad Distribution Budget (87.1%)</Text>
          <Text style={styles.feeValue}>{formatCurrency(fees.adBudgetCents)}</Text>
        </View>
        <View style={styles.feeRow}>
          <Text style={styles.feeLabel}>Platform Verification & Infrastructure (10%)</Text>
          <Text style={styles.feeValue}>{formatCurrency(fees.platformFeeCents)}</Text>
        </View>
        <View style={styles.feeRow}>
          <Text style={styles.feeLabel}>Payment Processing (2.9% + $0.30)</Text>
          <Text style={styles.feeValue}>{formatCurrency(fees.processingFeeCents)}</Text>
        </View>
        <View style={[styles.feeRow, styles.feeTotalRow]}>
          <Text style={styles.feeTotalLabel}>Total Backer Target</Text>
          <Text style={styles.feeTotalValue}>{formatCurrency(fees.totalCents)}</Text>
        </View>
      </View>

      {/* Campaign Summary Recap */}
      <View style={styles.recapCard}>
        <Text style={styles.cardTitle}>Campaign Summary Recap</Text>
        <View style={styles.recapItem}>
          <Text style={styles.recapLabel}>Title:</Text>
          <Text style={styles.recapVal}>{data.title || 'Untitled'}</Text>
        </View>
        <View style={styles.recapItem}>
          <Text style={styles.recapLabel}>Category:</Text>
          <Text style={styles.recapVal}>{data.category || 'Environment'}</Text>
        </View>
        <View style={styles.recapItem}>
          <Text style={styles.recapLabel}>Creator:</Text>
          <Text style={styles.recapVal}>
            {data.creatorName} ({data.creatorType || 'Individual'})
          </Text>
        </View>
        <View style={styles.recapItem}>
          <Text style={styles.recapLabel}>Sources:</Text>
          <Text style={styles.recapVal}>{data.sources?.length || 0} verifiable sources attached</Text>
        </View>
        <View style={styles.recapItem}>
          <Text style={styles.recapLabel}>Flight Duration:</Text>
          <Text style={styles.recapVal}>{data.durationDays || 30} days</Text>
        </View>
      </View>

      {/* Non-negotiable Policy Acknowledgements */}
      <View style={styles.confirmationsSection}>
        <Text style={styles.cardTitle}>Required Declarations</Text>

        <TouchableOpacity
          style={styles.checkboxRow}
          onPress={() => setConfirmAccurate((prev) => !prev)}
        >
          <View style={[styles.checkbox, confirmAccurate && styles.checkboxActive]}>
            {confirmAccurate && <Feather name="check" size={14} color={colors.surface} />}
          </View>
          <Text style={styles.checkboxLabel}>
            I certify that the information, claims, and cited public sources are factual, credible, and verifiable.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.checkboxRow}
          onPress={() => setConfirmAdUse((prev) => !prev)}
        >
          <View style={[styles.checkbox, confirmAdUse && styles.checkboxActive]}>
            {confirmAdUse && <Feather name="check" size={14} color={colors.surface} />}
          </View>
          <Text style={styles.checkboxLabel}>
            I understand that funds pooled by backers pay exclusively for digital advertising distribution, not direct cash donations.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.checkboxRow}
          onPress={() => setConfirmPolicies((prev) => !prev)}
        >
          <View style={[styles.checkbox, confirmPolicies && styles.checkboxActive]}>
            {confirmPolicies && <Feather name="check" size={14} color={colors.surface} />}
          </View>
          <Text style={styles.checkboxLabel}>
            I agree to platform Advertising Integrity Rules, including transparent sponsor labels on all published ad creatives.
          </Text>
        </TouchableOpacity>
      </View>

      {/* Submission Button */}
      <Button
        title={isSubmitting ? 'Submitting Campaign...' : 'Submit for Moderation'}
        onPress={onSubmit}
        disabled={!canSubmit}
        loading={isSubmitting}
        size="lg"
        style={{ marginTop: spacing.xl }}
        icon="send"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.md,
  },
  heading: {
    ...typography.h3,
    color: colors.ink,
    marginBottom: spacing.xs,
  },
  subheading: {
    ...typography.caption,
    color: colors.inkMuted,
    lineHeight: 18,
    marginBottom: spacing.lg,
  },
  goalCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  goalHeaderTitle: {
    ...typography.bodySemibold,
    color: colors.ink,
  },
  creatorTag: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.pill,
  },
  creatorTagText: {
    ...typography.caption,
    fontSize: 10,
    fontWeight: '700',
    color: colors.primary,
  },
  goalHelpText: {
    ...typography.caption,
    color: colors.inkMuted,
    marginBottom: spacing.md,
  },
  presetsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  presetCard: {
    flex: 1,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surfaceSubtle,
    borderRadius: radius.input,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  presetCardSelected: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  presetText: {
    ...typography.captionMedium,
    color: colors.ink,
  },
  presetTextSelected: {
    color: colors.primary,
    fontWeight: '700',
  },
  reachResultBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accentLight,
    padding: spacing.md,
    borderRadius: radius.input,
    marginTop: spacing.sm,
  },
  reachResultTitle: {
    ...typography.captionMedium,
    color: colors.ink,
    fontWeight: '700',
  },
  reachResultDisclaimer: {
    ...typography.caption,
    color: colors.inkMuted,
    fontSize: 11,
  },
  feeCard: {
    backgroundColor: colors.surfaceSubtle,
    borderRadius: radius.card,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  cardTitle: {
    ...typography.bodySemibold,
    color: colors.ink,
    marginBottom: spacing.sm,
  },
  feeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  feeLabel: {
    ...typography.caption,
    color: colors.inkMuted,
  },
  feeValue: {
    ...typography.captionMedium,
    color: colors.ink,
  },
  feeTotalRow: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: 6,
    paddingTop: 8,
  },
  feeTotalLabel: {
    ...typography.captionMedium,
    fontWeight: '700',
    color: colors.ink,
  },
  feeTotalValue: {
    ...typography.captionMedium,
    fontWeight: '700',
    color: colors.primary,
  },
  recapCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  recapItem: {
    flexDirection: 'row',
    paddingVertical: 4,
  },
  recapLabel: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.inkMuted,
    width: 90,
  },
  recapVal: {
    ...typography.caption,
    color: colors.ink,
    flex: 1,
  },
  confirmationsSection: {
    backgroundColor: colors.surfaceSubtle,
    borderRadius: radius.card,
    padding: spacing.md,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.borderDark,
    marginRight: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkboxLabel: {
    ...typography.caption,
    color: colors.ink,
    flex: 1,
    lineHeight: 18,
  },
});

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Share,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, typography, spacing, radius, shadows } from '@/theme/tokens';
import { Campaign } from '@/types';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { formatCurrency, formatPercent } from '@/lib/format';
import { estimateReach } from '@/lib/reach';
import { ASSUMPTIONS } from '@/config/assumptions';
import { useToast } from '@/components/feedback/Toast';

interface StickyFundingBarProps {
  campaign: Campaign;
  onBackPress: () => void;
  bottomInset?: number;
}

export function StickyFundingBar({
  campaign,
  onBackPress,
  bottomInset = 0,
}: StickyFundingBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { showToast } = useToast();

  const isFundingActive =
    campaign.status === 'available_for_funding' ||
    campaign.status === 'goal_reached';

  const fundedPct = formatPercent(campaign.raisedCents, campaign.fundingGoalCents);
  const reach = estimateReach(campaign.fundingGoalCents / 100);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Amplify this message: ${campaign.title} on Campaign Amplification Platform`,
        title: campaign.title,
      });
    } catch {
      showToast('Unable to share campaign', 'error');
    }
  };

  return (
    <View style={[styles.wrapper, { paddingBottom: Math.max(bottomInset, spacing.sm) }]}>
      {/* Expandable Info Panel */}
      {isExpanded && (
        <View style={styles.expandedPanel}>
          <View style={styles.expandedHeader}>
            <Text style={styles.expandedTitle}>Funding & Reach Overview</Text>
            <TouchableOpacity
              onPress={() => setIsExpanded(false)}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Feather name="chevron-down" size={20} color={colors.inkMuted} />
            </TouchableOpacity>
          </View>

          <View style={styles.expandedStatsGrid}>
            <View style={styles.statBox}>
              <Text style={styles.statBoxLabel}>Goal</Text>
              <Text style={styles.statBoxValue}>
                {formatCurrency(campaign.fundingGoalCents, true)}
              </Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statBoxLabel}>Backers</Text>
              <Text style={styles.statBoxValue}>{campaign.backerCount || 0}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statBoxLabel}>Est. Reach at Goal</Text>
              <Text style={styles.statBoxValue}>{reach.formatted}</Text>
            </View>
          </View>

          <View style={styles.disclaimerBox}>
            <Feather name="info" size={14} color={colors.primary} style={{ marginRight: 6 }} />
            <Text style={styles.disclaimerText}>
              {ASSUMPTIONS.NOT_A_DONATION_NOTICE}
            </Text>
          </View>

          <View style={styles.shareRow}>
            <Button
              title="Share Campaign"
              variant="secondary"
              size="sm"
              icon="share-2"
              onPress={handleShare}
              style={{ flex: 1 }}
            />
          </View>
        </View>
      )}

      {/* Main Bar */}
      <View style={styles.bar}>
        <TouchableOpacity
          style={styles.summarySection}
          onPress={() => setIsExpanded(!isExpanded)}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Toggle funding overview details"
        >
          <View style={styles.summaryTopRow}>
            <Text style={styles.raisedText}>
              {formatCurrency(campaign.raisedCents, true)}{' '}
              <Text style={styles.goalText}>
                / {formatCurrency(campaign.fundingGoalCents, true)}
              </Text>
            </Text>
            <View style={styles.percentBadge}>
              <Text style={styles.percentText}>{fundedPct}</Text>
              <Feather
                name={isExpanded ? 'chevron-down' : 'chevron-up'}
                size={14}
                color={colors.inkMuted}
                style={{ marginLeft: 2 }}
              />
            </View>
          </View>

          <ProgressBar
            progress={campaign.raisedCents / campaign.fundingGoalCents}
            style={styles.progressBar}
          />

          <Text style={styles.subtext}>
            {campaign.durationDays} days duration · {campaign.backerCount || 0} backers
          </Text>
        </TouchableOpacity>

        {/* Back Action Button */}
        <View style={styles.actionContainer}>
          {isFundingActive ? (
            <Button
              title="Back"
              variant="primary"
              size="md"
              onPress={onBackPress}
              icon="arrow-right"
              style={styles.backButton}
            />
          ) : (
            <Button
              title="Share"
              variant="secondary"
              size="md"
              onPress={handleShare}
              icon="share-2"
              style={styles.backButton}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
    paddingHorizontal: spacing.md,
    ...shadows.sheet,
  },
  expandedPanel: {
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: spacing.xs,
  },
  expandedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  expandedTitle: {
    ...typography.captionMedium,
    fontWeight: '700',
    color: colors.ink,
    fontSize: 13,
  },
  expandedStatsGrid: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  statBox: {
    flex: 1,
    backgroundColor: colors.surfaceSubtle,
    padding: spacing.xs,
    borderRadius: radius.input,
  },
  statBoxLabel: {
    ...typography.caption,
    color: colors.inkMuted,
    fontSize: 11,
  },
  statBoxValue: {
    ...typography.captionMedium,
    fontWeight: '700',
    color: colors.ink,
    fontSize: 13,
    marginTop: 2,
  },
  disclaimerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    padding: spacing.xs,
    borderRadius: radius.input,
    marginBottom: spacing.xs,
  },
  disclaimerText: {
    ...typography.caption,
    color: colors.primary,
    fontSize: 11,
    flex: 1,
    lineHeight: 15,
  },
  shareRow: {
    flexDirection: 'row',
    marginTop: spacing.xs,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  summarySection: {
    flex: 1,
  },
  summaryTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  raisedText: {
    ...typography.bodySemibold,
    color: colors.ink,
    fontSize: 15,
  },
  goalText: {
    ...typography.caption,
    color: colors.inkMuted,
    fontWeight: '400',
  },
  percentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  percentText: {
    ...typography.captionMedium,
    fontWeight: '700',
    color: colors.primary,
    fontSize: 13,
  },
  progressBar: {
    marginVertical: 4,
  },
  subtext: {
    ...typography.caption,
    color: colors.inkSubtle,
    fontSize: 11,
  },
  actionContainer: {
    minWidth: 100,
  },
  backButton: {
    minHeight: 44,
  },
});

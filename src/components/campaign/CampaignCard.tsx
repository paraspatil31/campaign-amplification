import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ViewStyle,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, typography, spacing, radius, shadows } from '@/theme/tokens';
import { Campaign } from '@/types';
import { Badge, StatusChip } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { formatCurrency, formatPercent } from '@/lib/format';
import { estimateReach } from '@/lib/reach';
import { useToast } from '@/components/feedback/Toast';

export interface CampaignCardProps {
  campaign: Campaign;
  style?: ViewStyle;
  onPress?: () => void;
  showBackAction?: boolean;
}

export function CampaignCard({
  campaign,
  style,
  onPress,
  showBackAction = true,
}: CampaignCardProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const [isSaved, setIsSaved] = useState(false);

  const fundedPct = formatPercent(campaign.raisedCents, campaign.fundingGoalCents);
  const reach = estimateReach(campaign.fundingGoalCents / 100);

  const handleCardPress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push(`/campaign/${campaign.id}` as any);
    }
  };

  const handleBookmark = () => {
    setIsSaved((prev) => !prev);
    showToast(
      !isSaved
        ? 'Campaign saved to your bookmarks'
        : 'Campaign removed from bookmarks',
      'info'
    );
  };

  const handleBackCampaign = () => {
    router.push(`/campaign/${campaign.id}` as any);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.88}
      onPress={handleCardPress}
      style={[styles.card, style]}
      accessibilityRole="button"
      accessibilityLabel={`View campaign: ${campaign.title}`}
    >
      {/* Cover Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: campaign.coverUrl }}
          style={styles.coverImage}
          resizeMode="cover"
        />

        {/* Demo data badge */}
        {campaign.isDemoData && (
          <View style={styles.demoBadge}>
            <Text style={styles.demoText}>Demo data</Text>
          </View>
        )}

        {/* Bookmark Button */}
        <TouchableOpacity
          onPress={handleBookmark}
          style={styles.bookmarkButton}
          accessibilityRole="button"
          accessibilityLabel={isSaved ? 'Remove bookmark' : 'Bookmark campaign'}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Feather
            name={isSaved ? 'bookmark' : 'bookmark'}
            size={18}
            color={isSaved ? colors.primary : colors.ink}
            style={isSaved ? { opacity: 1 } : { opacity: 0.8 }}
          />
        </TouchableOpacity>
      </View>

      {/* Card Body */}
      <View style={styles.body}>
        {/* Category & Status */}
        <View style={styles.metaRow}>
          <Badge label={campaign.category} backgroundColor={colors.surfaceSubtle} />
          <StatusChip status={campaign.status} size="sm" />
        </View>

        {/* Title */}
        <Text style={styles.title} numberOfLines={2}>
          {campaign.title}
        </Text>

        {/* Creator */}
        <View style={styles.creatorRow}>
          <Feather name="user" size={12} color={colors.inkMuted} style={styles.creatorIcon} />
          <Text style={styles.creatorText} numberOfLines={1}>
            By {campaign.creatorName} ({campaign.creatorType})
          </Text>
        </View>

        {/* Summary */}
        <Text style={styles.summary} numberOfLines={2}>
          {campaign.summary}
        </Text>

        {/* Funding Progress */}
        <View style={styles.progressContainer}>
          <View style={styles.progressStats}>
            <Text style={styles.raisedAmount}>
              {formatCurrency(campaign.raisedCents, true)}{' '}
              <Text style={styles.goalAmount}>
                raised of {formatCurrency(campaign.fundingGoalCents, true)}
              </Text>
            </Text>
            <Text style={styles.percentageText}>{fundedPct}</Text>
          </View>

          <ProgressBar
            progress={campaign.raisedCents / campaign.fundingGoalCents}
            style={styles.progressBar}
          />

          <View style={styles.reachRow}>
            <Feather name="trending-up" size={12} color={colors.accent} style={{ marginRight: 4 }} />
            <Text style={styles.reachText}>
              Est. reach at goal: {reach.formatted}
            </Text>
          </View>
        </View>

        {/* Bottom CTA */}
        {showBackAction && (
          <Button
            title="Back This Campaign"
            onPress={handleBackCampaign}
            variant="primary"
            size="sm"
            style={styles.backButton}
            icon="arrow-right"
          />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    marginBottom: spacing.lg,
    ...shadows.card,
  },
  imageContainer: {
    width: '100%',
    height: 190,
    position: 'relative',
    backgroundColor: colors.surfaceSubtle,
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  demoBadge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: 'rgba(18, 23, 31, 0.75)',
    borderRadius: radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  demoText: {
    ...typography.caption,
    color: colors.surface,
    fontSize: 11,
    fontWeight: '600',
  },
  bookmarkButton: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.card,
  },
  body: {
    padding: spacing.md,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  title: {
    ...typography.h3,
    color: colors.ink,
    marginBottom: spacing.xs,
    lineHeight: 22,
  },
  creatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  creatorIcon: {
    marginRight: 4,
  },
  creatorText: {
    ...typography.caption,
    color: colors.inkMuted,
  },
  summary: {
    ...typography.caption,
    color: colors.inkMuted,
    lineHeight: 18,
    marginBottom: spacing.md,
  },
  progressContainer: {
    backgroundColor: colors.surfaceSubtle,
    padding: spacing.sm,
    borderRadius: radius.input,
    marginBottom: spacing.md,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  raisedAmount: {
    ...typography.captionMedium,
    color: colors.ink,
    fontWeight: '600',
  },
  goalAmount: {
    ...typography.caption,
    color: colors.inkMuted,
    fontWeight: '400',
  },
  percentageText: {
    ...typography.captionMedium,
    color: colors.primary,
    fontWeight: '600',
  },
  progressBar: {
    marginVertical: 6,
  },
  reachRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reachText: {
    ...typography.caption,
    color: colors.inkMuted,
    fontSize: 11,
  },
  backButton: {
    marginTop: spacing.xs,
  },
});

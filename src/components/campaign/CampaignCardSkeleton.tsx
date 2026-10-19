import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Skeleton } from '@/components/ui/Skeleton';
import { colors, radius, spacing, shadows } from '@/theme/tokens';

export interface CampaignCardSkeletonProps {
  style?: ViewStyle;
}

export function CampaignCardSkeleton({ style }: CampaignCardSkeletonProps) {
  return (
    <View style={[styles.card, style]}>
      {/* Cover Skeleton */}
      <Skeleton width="100%" height={190} borderRadius={0} />

      <View style={styles.body}>
        {/* Category & Status */}
        <View style={styles.metaRow}>
          <Skeleton width={80} height={22} borderRadius={radius.pill} />
          <Skeleton width={70} height={22} borderRadius={radius.pill} />
        </View>

        {/* Title */}
        <Skeleton width="90%" height={20} style={{ marginBottom: 6 }} />
        <Skeleton width="60%" height={20} style={{ marginBottom: spacing.sm }} />

        {/* Creator */}
        <Skeleton width="45%" height={14} style={{ marginBottom: spacing.sm }} />

        {/* Summary */}
        <Skeleton width="100%" height={14} style={{ marginBottom: 4 }} />
        <Skeleton width="80%" height={14} style={{ marginBottom: spacing.md }} />

        {/* Progress box */}
        <View style={styles.progressBox}>
          <View style={styles.metaRow}>
            <Skeleton width="50%" height={14} />
            <Skeleton width={35} height={14} />
          </View>
          <Skeleton width="100%" height={8} borderRadius={4} style={{ marginVertical: 8 }} />
          <Skeleton width="60%" height={12} />
        </View>

        {/* Button */}
        <Skeleton width="100%" height={36} borderRadius={radius.input} />
      </View>
    </View>
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
  body: {
    padding: spacing.md,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  progressBox: {
    backgroundColor: colors.surfaceSubtle,
    padding: spacing.sm,
    borderRadius: radius.input,
    marginBottom: spacing.md,
  },
});

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, typography, spacing, radius } from '@/theme/tokens';
import { Campaign } from '@/types';
import { Accordion } from '@/components/ui/Accordion';
import { Chip } from '@/components/ui/Chip';
import { formatNumber } from '@/lib/format';

interface AudienceSectionProps {
  campaign: Campaign;
}

export function AudienceSection({ campaign }: AudienceSectionProps) {
  const target = campaign.target;
  const allocations = target?.channelAllocations || {};

  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>Audience & Distribution Strategy</Text>

      <Accordion title="Targeting & Placements" defaultExpanded={false}>
        <View style={styles.content}>
          {/* Geographic Targeting */}
          <View style={styles.block}>
            <View style={styles.blockHeader}>
              <Feather name="map-pin" size={14} color={colors.primary} style={{ marginRight: 6 }} />
              <Text style={styles.blockTitle}>Target Regions</Text>
            </View>
            <View style={styles.chipsWrap}>
              {target?.locations && target.locations.length > 0 ? (
                target.locations.map((loc, idx) => (
                  <Chip key={idx} label={loc} style={styles.chip} />
                ))
              ) : (
                <Text style={styles.emptyText}>Nationwide audience</Text>
              )}
            </View>
          </View>

          {/* Interests */}
          <View style={styles.block}>
            <View style={styles.blockHeader}>
              <Feather name="tag" size={14} color={colors.primary} style={{ marginRight: 6 }} />
              <Text style={styles.blockTitle}>Interests & Topics</Text>
            </View>
            <View style={styles.chipsWrap}>
              {target?.interests && target.interests.length > 0 ? (
                target.interests.map((interest, idx) => (
                  <Chip key={idx} label={interest} style={styles.chip} />
                ))
              ) : (
                <Text style={styles.emptyText}>General public interest</Text>
              )}
            </View>
          </View>

          {/* Distribution Channels */}
          <View style={styles.block}>
            <View style={styles.blockHeader}>
              <Feather name="radio" size={14} color={colors.primary} style={{ marginRight: 6 }} />
              <Text style={styles.blockTitle}>Channel Allocation (Planned)</Text>
            </View>
            <View style={styles.channelGrid}>
              {Object.entries(allocations).map(([channel, pct]) => (
                <View key={channel} style={styles.channelCard}>
                  <Text style={styles.channelName}>{channel}</Text>
                  <Text style={styles.channelPct}>{pct}%</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Estimated reach disclaimer */}
          <View style={styles.disclaimerContainer}>
            <Feather name="alert-circle" size={14} color={colors.inkMuted} style={{ marginRight: 6, marginTop: 2 }} />
            <Text style={styles.disclaimerText}>
              Estimated reach ({formatNumber(campaign.estReachLow)} – {formatNumber(campaign.estReachHigh)} people) is a model calculation based on prevailing industry CPMs. Actual impressions delivered are subject to real-time ad auction liquidity and platform compliance reviews.
            </Text>
          </View>
        </View>
      </Accordion>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.sm,
  },
  sectionHeader: {
    ...typography.h3,
    color: colors.ink,
    marginBottom: spacing.sm,
  },
  content: {
    paddingVertical: spacing.xs,
  },
  block: {
    marginBottom: spacing.md,
  },
  blockHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  blockTitle: {
    ...typography.captionMedium,
    fontWeight: '600',
    color: colors.ink,
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  chip: {
    marginRight: 4,
    marginBottom: 4,
  },
  emptyText: {
    ...typography.caption,
    color: colors.inkMuted,
    fontStyle: 'italic',
  },
  channelGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  channelCard: {
    backgroundColor: colors.surfaceSubtle,
    borderRadius: radius.input,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  channelName: {
    ...typography.caption,
    color: colors.ink,
  },
  channelPct: {
    ...typography.captionMedium,
    fontWeight: '700',
    color: colors.primary,
  },
  disclaimerContainer: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceSubtle,
    padding: spacing.sm,
    borderRadius: radius.input,
    marginTop: spacing.xs,
  },
  disclaimerText: {
    ...typography.caption,
    color: colors.inkMuted,
    fontSize: 11,
    lineHeight: 16,
    flex: 1,
  },
});

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, typography, spacing, radius } from '@/theme/tokens';
import { Campaign } from '@/types';
import { Accordion } from '@/components/ui/Accordion';
import { formatDate } from '@/lib/format';

interface UpdatesSectionProps {
  campaign: Campaign;
}

export function UpdatesSection({ campaign }: UpdatesSectionProps) {
  // Derive updates from milestones, status changes, or demo events
  const updates = [
    {
      id: 'upd-1',
      date: campaign.publishedAt || campaign.createdAt,
      title: 'Campaign launched for community amplification',
      body: `Campaign approved and open for community backers to pool distribution budget. Target audience: ${campaign.target.locations.join(', ')}.`,
      author: campaign.creatorName,
    },
    ...(campaign.status === 'goal_reached' || campaign.status === 'promoting' || campaign.status === 'completed'
      ? [
          {
            id: 'upd-2',
            date: campaign.updatedAt,
            title: '100% Funding Goal Reached!',
            body: `Thanks to all ${campaign.backerCount} backers! We hit the ad distribution budget. Our media team has prepared the placement creative assets.`,
            author: 'Platform Ops',
          },
        ]
      : []),
    ...(campaign.status === 'promoting' || campaign.status === 'completed'
      ? [
          {
            id: 'upd-3',
            date: campaign.updatedAt,
            title: 'Digital Distribution Flight Activated',
            body: `Ad assets are now actively serving on ${campaign.target.channels.join(', ')}. Initial reach and impressions are being recorded.`,
            author: 'Distribution Engine',
          },
        ]
      : []),
  ];

  return (
    <View style={styles.container}>
      <Accordion title={`Campaign Updates (${updates.length})`} defaultExpanded={false}>
        <View style={styles.content}>
          {updates.map((update, index) => (
            <View key={update.id} style={styles.updateCard}>
              <View style={styles.timelineIcon}>
                <Feather
                  name={index === 0 ? 'zap' : 'radio'}
                  size={14}
                  color={colors.primary}
                />
              </View>
              <View style={styles.updateDetails}>
                <View style={styles.headerRow}>
                  <Text style={styles.dateText}>{formatDate(update.date)}</Text>
                  <Text style={styles.authorBadge}>{update.author}</Text>
                </View>
                <Text style={styles.updateTitle}>{update.title}</Text>
                <Text style={styles.updateBody}>{update.body}</Text>
              </View>
            </View>
          ))}
        </View>
      </Accordion>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  content: {
    paddingTop: spacing.xs,
  },
  updateCard: {
    flexDirection: 'row',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  timelineIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
    marginTop: 2,
  },
  updateDetails: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  dateText: {
    ...typography.caption,
    color: colors.inkSubtle,
    fontSize: 12,
  },
  authorBadge: {
    ...typography.caption,
    fontSize: 11,
    color: colors.inkMuted,
    backgroundColor: colors.surfaceSubtle,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.pill,
  },
  updateTitle: {
    ...typography.captionMedium,
    color: colors.ink,
    fontWeight: '600',
    marginBottom: 4,
  },
  updateBody: {
    ...typography.caption,
    color: colors.inkMuted,
    lineHeight: 18,
  },
});

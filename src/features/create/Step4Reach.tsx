import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, typography, spacing, radius } from '@/theme/tokens';
import { Campaign, AudienceTarget } from '@/types';
import { estimateReach } from '@/lib/reach';
import { Chip } from '@/components/ui/Chip';

interface Step4ReachProps {
  data: Partial<Campaign>;
  onChange: (fields: Partial<Campaign>) => void;
  errors?: Record<string, string>;
}

const AVAILABLE_LOCATIONS = [
  'National (US)',
  'California & West Coast',
  'Midwest Region',
  'East Coast & Mid-Atlantic',
  'South & Gulf Coast',
  'Major Metropolitan Areas',
];

const AVAILABLE_INTERESTS = [
  'Environmental & Conservation',
  'Public Health & Wellness',
  'Education Reform & Teachers',
  'Civic Accountability & News',
  'Technology & Privacy',
  'Small Business & Local Economy',
];

const AVAILABLE_CHANNELS = [
  { name: 'Social Feed Placements', defaultPct: 50 },
  { name: 'Search & Discovery Ads', defaultPct: 30 },
  { name: 'Independent Publisher Networks', defaultPct: 20 },
];

const DURATION_PRESETS = [15, 30, 45, 60];

export function Step4Reach({ data, onChange, errors = {} }: Step4ReachProps) {
  const currentTarget: AudienceTarget = data.target || {
    locations: ['National (US)'],
    interests: ['Environmental & Conservation'],
    channels: ['Social Feed Placements', 'Search & Discovery Ads', 'Independent Publisher Networks'],
    channelAllocations: {
      'Social Feed Placements': 50,
      'Search & Discovery Ads': 30,
      'Independent Publisher Networks': 20,
    },
    durationDays: data.durationDays || 30,
  };

  const handleToggleLocation = (loc: string) => {
    const existing = currentTarget.locations || [];
    const updated = existing.includes(loc)
      ? existing.filter((l) => l !== loc)
      : [...existing, loc];
    onChange({
      target: { ...currentTarget, locations: updated.length ? updated : [loc] },
    });
  };

  const handleToggleInterest = (interest: string) => {
    const existing = currentTarget.interests || [];
    const updated = existing.includes(interest)
      ? existing.filter((i) => i !== interest)
      : [...existing, interest];
    onChange({
      target: { ...currentTarget, interests: updated.length ? updated : [interest] },
    });
  };

  const handleSelectDuration = (days: number) => {
    onChange({
      durationDays: days,
      target: { ...currentTarget, durationDays: days },
    });
  };

  // Illustrative reach for a sample $1,000 campaign
  const sampleReach = estimateReach(1000);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Target Audience & Distribution</Text>
      <Text style={styles.subheading}>
        Specify who should receive this message. When funded, our automated media-buying engine distributes ad impressions to your selected demographics.
      </Text>

      {/* Distinction notice per AGENT.md / FT-046 */}
      <View style={styles.badgeBanner}>
        <View style={styles.badgeRow}>
          <View style={styles.tagSelected}>
            <Text style={styles.tagSelectedText}>CREATOR-SELECTED PREFERENCE</Text>
          </View>
        </View>
        <Text style={styles.badgeNote}>
          Target parameters chosen here represent your desired reach. Final real-time bid adjustments and audience lookalikes are optimized and finalized by the platform upon full funding.
        </Text>
      </View>

      {/* Target Locations */}
      <Text style={styles.sectionTitle}>Geographic Distribution *</Text>
      <View style={styles.chipsWrap}>
        {AVAILABLE_LOCATIONS.map((loc) => {
          const isSelected = currentTarget.locations.includes(loc);
          return (
            <Chip
              key={loc}
              label={loc}
              selected={isSelected}
              onPress={() => handleToggleLocation(loc)}
            />
          );
        })}
      </View>

      {/* Target Interests */}
      <Text style={[styles.sectionTitle, { marginTop: spacing.lg }]}>Audience Interests *</Text>
      <View style={styles.chipsWrap}>
        {AVAILABLE_INTERESTS.map((interest) => {
          const isSelected = currentTarget.interests.includes(interest);
          return (
            <Chip
              key={interest}
              label={interest}
              selected={isSelected}
              onPress={() => handleToggleInterest(interest)}
            />
          );
        })}
      </View>

      {/* Distribution Channels & Budget Split */}
      <Text style={[styles.sectionTitle, { marginTop: spacing.lg }]}>Channel Distribution Split</Text>
      <View style={styles.channelsCard}>
        {AVAILABLE_CHANNELS.map((ch) => {
          const pct = currentTarget.channelAllocations[ch.name] ?? ch.defaultPct;
          return (
            <View key={ch.name} style={styles.channelRow}>
              <View style={styles.channelInfo}>
                <Feather name="radio" size={14} color={colors.primary} style={{ marginRight: 8 }} />
                <Text style={styles.channelName}>{ch.name}</Text>
              </View>
              <Text style={styles.channelPct}>{pct}% allocation</Text>
            </View>
          );
        })}
      </View>

      {/* Duration Selector */}
      <Text style={[styles.sectionTitle, { marginTop: spacing.lg }]}>Flight Duration</Text>
      <View style={styles.durationRow}>
        {DURATION_PRESETS.map((days) => {
          const isSelected = (data.durationDays || 30) === days;
          return (
            <TouchableOpacity
              key={days}
              style={[styles.durationCard, isSelected && styles.durationCardSelected]}
              onPress={() => handleSelectDuration(days)}
            >
              <Text style={[styles.durationText, isSelected && styles.durationTextSelected]}>
                {days} Days
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Estimated Reach Preview Box */}
      <View style={styles.reachPreviewCard}>
        <View style={styles.reachHeader}>
          <Feather name="trending-up" size={18} color={colors.accent} />
          <Text style={styles.reachTitle}>Projected Delivery at $1,000 Budget</Text>
        </View>
        <Text style={styles.reachFigure}>{sampleReach.formatted}</Text>
        <Text style={styles.reachDisclaimer}>*{sampleReach.disclaimer}</Text>
      </View>
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
  badgeBanner: {
    backgroundColor: colors.surfaceSubtle,
    borderRadius: radius.card,
    padding: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.info,
    marginBottom: spacing.lg,
  },
  badgeRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  tagSelected: {
    backgroundColor: colors.infoLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.pill,
  },
  tagSelectedText: {
    ...typography.caption,
    fontSize: 10,
    fontWeight: '700',
    color: colors.info,
  },
  badgeNote: {
    ...typography.caption,
    color: colors.inkMuted,
    lineHeight: 18,
  },
  sectionTitle: {
    ...typography.bodySemibold,
    color: colors.ink,
    fontSize: 14,
    marginBottom: spacing.xs,
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  channelsCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.input,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  channelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  channelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  channelName: {
    ...typography.captionMedium,
    color: colors.ink,
  },
  channelPct: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },
  durationRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  durationCard: {
    flex: 1,
    paddingVertical: spacing.md,
    backgroundColor: colors.surfaceSubtle,
    borderRadius: radius.input,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  durationCardSelected: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  durationText: {
    ...typography.captionMedium,
    color: colors.ink,
  },
  durationTextSelected: {
    color: colors.primary,
    fontWeight: '700',
  },
  reachPreviewCard: {
    backgroundColor: colors.accentLight,
    borderRadius: radius.card,
    padding: spacing.md,
    marginTop: spacing.xl,
  },
  reachHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: 4,
  },
  reachTitle: {
    ...typography.captionMedium,
    color: colors.ink,
    fontWeight: '600',
  },
  reachFigure: {
    ...typography.h2,
    color: colors.ink,
    marginVertical: 4,
  },
  reachDisclaimer: {
    ...typography.caption,
    color: colors.inkMuted,
    fontSize: 11,
  },
});

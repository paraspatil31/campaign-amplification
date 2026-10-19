import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, typography, spacing, radius, shadows } from '@/theme/tokens';
import { Campaign } from '@/types';
import { CONSTANTS } from '@/config/constants';
import { Input } from '@/components/ui/Input';
import { Chip } from '@/components/ui/Chip';

interface Step3VisualsProps {
  data: Partial<Campaign>;
  onChange: (fields: Partial<Campaign>) => void;
  errors?: Record<string, string>;
}

const CTA_OPTIONS = [
  'Learn More',
  'Read Investigation',
  'View Facts',
  'Read Policy Brief',
  'Explore Research',
];

export function Step3Visuals({ data, onChange, errors = {} }: Step3VisualsProps) {
  const [placementTab, setPlacementTab] = useState<'feed' | 'story' | 'banner'>('feed');

  const headline = data.adHeadline || data.title || '';
  const description = data.adDescription || data.summary || '';
  const cta = data.ctaText || 'Learn More';
  const cover =
    data.coverUrl ||
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80';

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Campaign & Ad Visuals</Text>
      <Text style={styles.subheading}>
        When backers fund this campaign, ads are automatically assembled from these assets and distributed across partner networks.
      </Text>

      {/* Ad Headline */}
      <Input
        label="Ad Headline"
        placeholder="Short headline for social and display placements"
        value={data.adHeadline ?? headline}
        onChangeText={(text) => onChange({ adHeadline: text })}
        maxLength={CONSTANTS.HEADLINE_MAX_LENGTH}
        error={errors.adHeadline}
        helperText="Defaults to your campaign title. Max 80 characters."
      />

      {/* Ad Description */}
      <Input
        label="Ad Body / Caption"
        placeholder="Compelling synopsis tailored for ad readers"
        value={data.adDescription ?? description}
        onChangeText={(text) => onChange({ adDescription: text })}
        maxLength={CONSTANTS.DESCRIPTION_MAX_LENGTH}
        multiline
        error={errors.adDescription}
        helperText="Defaults to your campaign summary. Max 160 characters."
      />

      {/* Call To Action Selector */}
      <Text style={styles.label}>Call to Action (CTA)</Text>
      <View style={styles.ctaChipsRow}>
        {CTA_OPTIONS.map((opt) => (
          <Chip
            key={opt}
            label={opt}
            selected={cta === opt}
            onPress={() => onChange({ ctaText: opt })}
          />
        ))}
      </View>

      {/* Live Placement Previews */}
      <View style={styles.previewSection}>
        <Text style={styles.previewTitle}>Placement Preview</Text>
        <View style={styles.tabsRow}>
          <TouchableOpacity
            style={[styles.tabBtn, placementTab === 'feed' && styles.tabBtnActive]}
            onPress={() => setPlacementTab('feed')}
          >
            <Text style={[styles.tabBtnText, placementTab === 'feed' && styles.tabBtnTextActive]}>
              Social Feed
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabBtn, placementTab === 'story' && styles.tabBtnActive]}
            onPress={() => setPlacementTab('story')}
          >
            <Text style={[styles.tabBtnText, placementTab === 'story' && styles.tabBtnTextActive]}>
              Vertical Story
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabBtn, placementTab === 'banner' && styles.tabBtnActive]}
            onPress={() => setPlacementTab('banner')}
          >
            <Text style={[styles.tabBtnText, placementTab === 'banner' && styles.tabBtnTextActive]}>
              Native Banner
            </Text>
          </TouchableOpacity>
        </View>

        {/* Feed Card Preview */}
        {placementTab === 'feed' && (
          <View style={styles.feedAdCard}>
            <View style={styles.feedAdHeader}>
              <View style={styles.sponsorBadge}>
                <Text style={styles.sponsorText}>SPONSORED AMPLIFICATION</Text>
              </View>
              <Text style={styles.creatorAttribution}>{data.creatorName || 'Campaign Creator'}</Text>
            </View>
            <Image source={{ uri: cover }} style={styles.feedAdImage} resizeMode="cover" />
            <View style={styles.feedAdBody}>
              <Text style={styles.adHeadlineText}>{headline}</Text>
              <Text style={styles.adDescText} numberOfLines={2}>
                {description}
              </Text>
              <View style={styles.ctaBar}>
                <Text style={styles.ctaBarUrl}>campaign-platform.org</Text>
                <View style={styles.ctaButtonBox}>
                  <Text style={styles.ctaButtonBoxText}>{cta}</Text>
                  <Feather name="arrow-up-right" size={12} color={colors.surface} />
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Story Format Preview */}
        {placementTab === 'story' && (
          <View style={styles.storyAdCard}>
            <Image source={{ uri: cover }} style={styles.storyAdImage} resizeMode="cover" />
            <View style={styles.storyAdOverlay}>
              <View style={styles.sponsorBadgeStory}>
                <Text style={styles.sponsorTextStory}>COMMUNITY SPONSORED</Text>
              </View>
              <Text style={styles.storyHeadlineText}>{headline}</Text>
              <View style={styles.storyCtaPill}>
                <Text style={styles.storyCtaText}>{cta}</Text>
                <Feather name="chevron-up" size={14} color={colors.surface} />
              </View>
            </View>
          </View>
        )}

        {/* Banner Preview */}
        {placementTab === 'banner' && (
          <View style={styles.bannerAdCard}>
            <Image source={{ uri: cover }} style={styles.bannerImg} resizeMode="cover" />
            <View style={styles.bannerBody}>
              <Text style={styles.bannerSponsor}>COMMUNITY-BACKED AD</Text>
              <Text style={styles.bannerHeadline} numberOfLines={2}>
                {headline}
              </Text>
              <Text style={styles.bannerCta}>{cta} →</Text>
            </View>
          </View>
        )}
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
  label: {
    ...typography.bodySemibold,
    color: colors.ink,
    fontSize: 14,
    marginBottom: spacing.xs,
  },
  ctaChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  previewSection: {
    backgroundColor: colors.surfaceSubtle,
    borderRadius: radius.card,
    padding: spacing.md,
    marginTop: spacing.sm,
  },
  previewTitle: {
    ...typography.bodySemibold,
    color: colors.ink,
    marginBottom: spacing.sm,
  },
  tabsRow: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    padding: 3,
    marginBottom: spacing.md,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 6,
    alignItems: 'center',
    borderRadius: radius.pill,
  },
  tabBtnActive: {
    backgroundColor: colors.primary,
  },
  tabBtnText: {
    ...typography.caption,
    color: colors.inkMuted,
    fontWeight: '600',
  },
  tabBtnTextActive: {
    color: colors.surface,
  },
  feedAdCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    ...shadows.card,
  },
  feedAdHeader: {
    padding: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sponsorBadge: {
    backgroundColor: colors.surfaceSubtle,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.pill,
  },
  sponsorText: {
    ...typography.caption,
    fontSize: 10,
    fontWeight: '700',
    color: colors.inkMuted,
  },
  creatorAttribution: {
    ...typography.caption,
    color: colors.ink,
    fontWeight: '600',
  },
  feedAdImage: {
    width: '100%',
    height: 180,
  },
  feedAdBody: {
    padding: spacing.md,
  },
  adHeadlineText: {
    ...typography.bodySemibold,
    color: colors.ink,
    marginBottom: 4,
  },
  adDescText: {
    ...typography.caption,
    color: colors.inkMuted,
    lineHeight: 18,
    marginBottom: spacing.sm,
  },
  ctaBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
  },
  ctaBarUrl: {
    ...typography.caption,
    color: colors.inkSubtle,
    fontSize: 11,
  },
  ctaButtonBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.input,
    gap: 4,
  },
  ctaButtonBoxText: {
    ...typography.caption,
    color: colors.surface,
    fontWeight: '700',
  },
  storyAdCard: {
    height: 280,
    borderRadius: radius.card,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: colors.ink,
  },
  storyAdImage: {
    width: '100%',
    height: '100%',
    opacity: 0.85,
  },
  storyAdOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.lg,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sponsorBadgeStory: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.pill,
    marginBottom: spacing.xs,
  },
  sponsorTextStory: {
    ...typography.caption,
    color: colors.surface,
    fontSize: 10,
    fontWeight: '700',
  },
  storyHeadlineText: {
    ...typography.h3,
    color: colors.surface,
    marginBottom: spacing.md,
  },
  storyCtaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 8,
    borderRadius: radius.pill,
    gap: 4,
  },
  storyCtaText: {
    ...typography.captionMedium,
    color: colors.surface,
    fontWeight: '700',
  },
  bannerAdCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.input,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    padding: spacing.sm,
    gap: spacing.sm,
    alignItems: 'center',
  },
  bannerImg: {
    width: 60,
    height: 60,
    borderRadius: radius.input,
  },
  bannerBody: {
    flex: 1,
  },
  bannerSponsor: {
    ...typography.caption,
    fontSize: 10,
    color: colors.inkSubtle,
    fontWeight: '700',
  },
  bannerHeadline: {
    ...typography.captionMedium,
    color: colors.ink,
    fontWeight: '600',
  },
  bannerCta: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '700',
    marginTop: 2,
  },
});

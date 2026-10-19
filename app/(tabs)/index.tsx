import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, typography, spacing, radius, shadows } from '@/theme/tokens';
import { ASSUMPTIONS } from '@/config/assumptions';
import { estimateReach } from '@/lib/reach';
import { formatCurrency, formatPercent } from '@/lib/format';
import { getCampaigns } from '@/services/campaigns';
import { Campaign } from '@/types';
import { ScreenState } from '@/components/feedback/ScreenState';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Badge, StatusChip } from '@/components/ui/Badge';
import { CampaignCard } from '@/components/campaign/CampaignCard';
import { CampaignCardSkeleton } from '@/components/campaign/CampaignCardSkeleton';
import { Button } from '@/components/ui/Button';

export default function HomeScreen() {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCampaigns();
      setCampaigns(data);
    } catch (err: any) {
      setError(err?.message || 'Failed to load campaigns');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const sampleReach = estimateReach(25);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <View style={styles.demoPill}>
          <Text style={styles.demoPillText}>Demo data</Text>
        </View>
        <Text style={styles.heroTitle}>
          Help important messages travel further
        </Text>
        <Text style={styles.heroSubtitle}>
          Backers pool funds toward advertising distribution costs. Together we amplify grassroots ideas to high-impact audiences.
        </Text>

        {/* Not a donation notice banner per AGENT.md §3 */}
        <View style={styles.noticeBanner}>
          <Feather name="info" size={16} color={colors.primary} style={styles.noticeIcon} />
          <Text style={styles.noticeText}>
            {ASSUMPTIONS.NOT_A_DONATION_NOTICE}
          </Text>
        </View>

        {/* Illustrative reach chip */}
        <View style={styles.reachChip}>
          <Feather name="trending-up" size={14} color={colors.accent} style={{ marginRight: 6 }} />
          <Text style={styles.reachChipText}>
            A $25 contribution delivers {sampleReach.formatted}
          </Text>
        </View>
        <Text style={styles.reachDisclaimer}>*{sampleReach.disclaimer}</Text>

        <View style={styles.ctaRow}>
          <Button
            title="Explore Campaigns"
            onPress={() => router.push('/(tabs)/explore')}
            style={styles.primaryCta}
            icon="compass"
          />
          <Button
            title="Start Campaign"
            variant="secondary"
            onPress={() => router.push('/(tabs)/create')}
            style={styles.secondaryCta}
            icon="plus"
          />
        </View>
      </View>

      {/* How it Works 3-Step */}
      <View style={styles.howItWorks}>
        <Text style={styles.sectionTitle}>How It Works</Text>
        <View style={styles.stepGrid}>
          <View style={styles.stepCard}>
            <View style={styles.stepNumberBadge}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <Text style={styles.stepHeader}>Create</Text>
            <Text style={styles.stepDesc}>Build your story with verified sources & ad visuals.</Text>
          </View>
          <View style={styles.stepCard}>
            <View style={styles.stepNumberBadge}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <Text style={styles.stepHeader}>Review</Text>
            <Text style={styles.stepDesc}>Platform checks truthfulness and ad suitability.</Text>
          </View>
          <View style={styles.stepCard}>
            <View style={styles.stepNumberBadge}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <Text style={styles.stepHeader}>Amplify</Text>
            <Text style={styles.stepDesc}>Community funds run targeted ads across digital media.</Text>
          </View>
        </View>
      </View>

      {/* Campaign Feed Section */}
      <View style={styles.feedHeader}>
        <Text style={styles.sectionTitle}>Featured Campaigns</Text>
        <TouchableOpacity
          onPress={() => router.push('/(tabs)/explore')}
          accessibilityRole="button"
          accessibilityLabel="View all campaigns"
        >
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.feedContainer}>
        <ScreenState
          isLoading={loading}
          error={error}
          isEmpty={campaigns.length === 0}
          onRetry={loadData}
          customSkeleton={
            <View>
              <CampaignCardSkeleton />
              <CampaignCardSkeleton />
            </View>
          }
        >
          {campaigns.slice(0, 4).map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </ScreenState>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingBottom: 40,
  },
  hero: {
    backgroundColor: colors.surface,
    padding: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  demoPill: {
    backgroundColor: colors.surfaceSubtle,
    borderRadius: radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginBottom: spacing.sm,
  },
  demoPillText: {
    ...typography.caption,
    color: colors.inkMuted,
    fontSize: 11,
  },
  heroTitle: {
    ...typography.display,
    color: colors.ink,
    marginBottom: spacing.sm,
  },
  heroSubtitle: {
    ...typography.body,
    color: colors.inkMuted,
    lineHeight: 22,
    marginBottom: spacing.md,
  },
  noticeBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.primaryLight,
    padding: spacing.md,
    borderRadius: radius.input,
    marginBottom: spacing.md,
  },
  noticeIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  noticeText: {
    ...typography.caption,
    color: colors.primaryDark,
    flex: 1,
    lineHeight: 18,
  },
  reachChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accentLight,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.pill,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  reachChipText: {
    ...typography.captionMedium,
    color: colors.accent,
    fontWeight: '600',
  },
  reachDisclaimer: {
    ...typography.caption,
    color: colors.inkSubtle,
    fontSize: 11,
    marginBottom: spacing.lg,
  },
  ctaRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  primaryCta: {
    flex: 1,
  },
  secondaryCta: {
    flex: 1,
  },
  howItWorks: {
    padding: spacing.xl,
    backgroundColor: colors.surface,
    marginTop: spacing.md,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.ink,
    marginBottom: spacing.md,
  },
  stepGrid: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  stepCard: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  stepNumberBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  stepNumberText: {
    color: colors.surface,
    fontWeight: '700',
    fontSize: 12,
  },
  stepHeader: {
    ...typography.bodySemibold,
    color: colors.ink,
    marginBottom: 2,
  },
  stepDesc: {
    ...typography.caption,
    color: colors.inkMuted,
    lineHeight: 16,
  },
  feedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.sm,
  },
  viewAllText: {
    ...typography.captionMedium,
    color: colors.primary,
    fontWeight: '600',
  },
  feedContainer: {
    paddingHorizontal: spacing.xl,
    marginTop: spacing.sm,
  },
});

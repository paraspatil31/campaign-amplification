import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Share,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { colors, typography, spacing, radius, shadows } from '@/theme/tokens';
import { getCampaignById } from '@/services/campaigns';
import { Campaign } from '@/types';
import { ScreenState } from '@/components/feedback/ScreenState';
import { Badge, StatusChip } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { formatDate } from '@/lib/format';
import { useToast } from '@/components/feedback/Toast';

// Campaign subcomponents
import { StoryRenderer } from '@/features/campaign/StoryRenderer';
import { PublicSources } from '@/features/campaign/PublicSources';
import { UseOfFundsSection } from '@/features/campaign/UseOfFundsSection';
import { AudienceSection } from '@/features/campaign/AudienceSection';
import { TrustAndFeedbackSection } from '@/features/campaign/TrustAndFeedbackSection';
import { StickyFundingBar } from '@/features/campaign/StickyFundingBar';
import { UpdatesSection } from '@/features/campaign/UpdatesSection';
import { BackingModal } from '@/features/backing/BackingModal';

export default function CampaignDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { showToast } = useToast();

  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [backingModalVisible, setBackingModalVisible] = useState(false);

  const fetchCampaign = async () => {
    if (!id) return;
    try {
      setLoading(true);
      setError(null);
      const data = await getCampaignById(id);
      setCampaign(data);
    } catch (err: any) {
      setError(err?.message || 'Campaign not found');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaign();
  }, [id]);

  const handleShare = async () => {
    if (!campaign) return;
    try {
      await Share.share({
        message: `Amplify this message: "${campaign.title}" on Campaign Amplification Platform`,
        title: campaign.title,
      });
    } catch {
      showToast('Unable to share campaign', 'error');
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
    setBackingModalVisible(true);
  };

  if (loading) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.skeletonHeader}>
          <Skeleton width="100%" height={260} borderRadius={0} />
          <View style={styles.skeletonBody}>
            <View style={styles.rowBetween}>
              <Skeleton width={100} height={24} borderRadius={radius.pill} />
              <Skeleton width={80} height={24} borderRadius={radius.pill} />
            </View>
            <Skeleton width="90%" height={26} style={{ marginVertical: spacing.sm }} />
            <Skeleton width="60%" height={26} style={{ marginBottom: spacing.md }} />
            <Skeleton width="40%" height={16} style={{ marginBottom: spacing.lg }} />
            <Skeleton width="100%" height={16} style={{ marginBottom: 8 }} />
            <Skeleton width="95%" height={16} style={{ marginBottom: 8 }} />
            <Skeleton width="70%" height={16} />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScreenState
        isLoading={false}
        error={error}
        isEmpty={!campaign}
        emptyTitle="Campaign Not Found"
        emptyMessage="The requested campaign could not be located."
        emptyActionLabel="Back to Explore"
        onEmptyAction={() => router.replace('/(tabs)/explore')}
        onRetry={fetchCampaign}
      >
        {campaign && (
          <>
            <ScrollView
              style={styles.scroll}
              contentContainerStyle={[
                styles.content,
                { paddingBottom: insets.bottom + 120 },
              ]}
              showsVerticalScrollIndicator={false}
            >
              {/* Cover Image & Floating Actions */}
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: campaign.coverUrl }}
                  style={styles.coverImage}
                  resizeMode="cover"
                />

                {/* Top Nav Buttons Bar */}
                <View style={[styles.topActionsBar, { top: insets.top + spacing.xs }]}>
                  <TouchableOpacity
                    style={styles.circleButton}
                    onPress={() => router.back()}
                    accessibilityRole="button"
                    accessibilityLabel="Go back"
                  >
                    <Feather name="arrow-left" size={20} color={colors.ink} />
                  </TouchableOpacity>

                  <View style={styles.topRightActions}>
                    <TouchableOpacity
                      style={styles.circleButton}
                      onPress={handleBookmark}
                      accessibilityRole="button"
                      accessibilityLabel="Bookmark campaign"
                    >
                      <Feather
                        name={isSaved ? 'bookmark' : 'bookmark'}
                        size={18}
                        color={isSaved ? colors.primary : colors.ink}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.circleButton, { marginLeft: spacing.sm }]}
                      onPress={handleShare}
                      accessibilityRole="button"
                      accessibilityLabel="Share campaign"
                    >
                      <Feather name="share-2" size={18} color={colors.ink} />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Demo Data Tag */}
                {campaign.isDemoData && (
                  <View style={styles.demoTag}>
                    <Text style={styles.demoTagText}>Demo data</Text>
                  </View>
                )}
              </View>

              {/* Main Content Body */}
              <View style={styles.body}>
                {/* Status and Category Meta */}
                <View style={styles.metaRow}>
                  <Badge label={campaign.category} backgroundColor={colors.surfaceSubtle} />
                  <StatusChip status={campaign.status} size="md" />
                </View>

                {/* Campaign Title */}
                <Text style={styles.title}>{campaign.title}</Text>

                {/* Creator Attribution & Published Date */}
                <View style={styles.creatorSection}>
                  <View style={styles.creatorAvatar}>
                    <Feather name="user" size={18} color={colors.primary} />
                  </View>
                  <View style={styles.creatorMeta}>
                    <Text style={styles.creatorName}>
                      {campaign.creatorName}{' '}
                      <Text style={styles.creatorType}>({campaign.creatorType})</Text>
                    </Text>
                    <Text style={styles.dateText}>
                      Published {formatDate(campaign.publishedAt || campaign.createdAt)}
                    </Text>
                  </View>
                </View>

                {/* Status Notice (for non-funding states) */}
                {campaign.status === 'promoting' && (
                  <View style={styles.statusNoticeBanner}>
                    <Feather name="activity" size={18} color={colors.accent} style={{ marginRight: 8 }} />
                    <Text style={styles.statusNoticeText}>
                      Currently amplifying across target digital media placements.
                    </Text>
                  </View>
                )}

                {campaign.status === 'completed' && (
                  <View style={styles.statusNoticeBanner}>
                    <Feather name="check-circle" size={18} color={colors.primary} style={{ marginRight: 8 }} />
                    <Text style={styles.statusNoticeText}>
                      Distribution flight completed. Final performance report available.
                    </Text>
                  </View>
                )}

                {/* Summary / Lead Paragraph */}
                <Text style={styles.summary}>{campaign.summary}</Text>

                {/* Editorial Story Blocks */}
                <StoryRenderer blocks={campaign.storyBlocks} />

                {/* Public Sources & References */}
                <PublicSources sources={campaign.sources} />

                {/* Use of Funds & Fee Breakdown */}
                <UseOfFundsSection campaign={campaign} />

                {/* Audience Targeting */}
                <AudienceSection campaign={campaign} />

                {/* Campaign Updates & Milestones */}
                <UpdatesSection campaign={campaign} />

                {/* Trust, Platform Review & Community Feedback */}
                <TrustAndFeedbackSection campaign={campaign} />
              </View>
            </ScrollView>

            {/* Backing Modal */}
            <BackingModal
              visible={backingModalVisible}
              campaign={campaign}
              onClose={() => setBackingModalVisible(false)}
              onSuccess={() => {
                fetchCampaign();
              }}
            />

            {/* Sticky Funding Footer Bar */}
            <StickyFundingBar
              campaign={campaign}
              onBackPress={handleBackCampaign}
              bottomInset={insets.bottom}
            />
          </>
        )}
      </ScreenState>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingBottom: 40,
  },
  imageContainer: {
    width: '100%',
    height: 280,
    position: 'relative',
    backgroundColor: colors.ink,
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  topActionsBar: {
    position: 'absolute',
    left: spacing.md,
    right: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  topRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.card,
  },
  demoTag: {
    position: 'absolute',
    bottom: spacing.sm,
    left: spacing.md,
    backgroundColor: 'rgba(18, 23, 31, 0.75)',
    borderRadius: radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  demoTagText: {
    ...typography.caption,
    color: colors.surface,
    fontSize: 11,
    fontWeight: '600',
  },
  body: {
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.card,
    borderTopRightRadius: radius.card,
    marginTop: -16,
    ...shadows.card,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.h1,
    color: colors.ink,
    lineHeight: 32,
    marginBottom: spacing.md,
  },
  creatorSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  creatorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  creatorMeta: {
    flex: 1,
  },
  creatorName: {
    ...typography.bodySemibold,
    color: colors.ink,
  },
  creatorType: {
    ...typography.caption,
    color: colors.inkMuted,
    fontWeight: '400',
  },
  dateText: {
    ...typography.caption,
    color: colors.inkSubtle,
    fontSize: 12,
  },
  statusNoticeBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceSubtle,
    padding: spacing.md,
    borderRadius: radius.card,
    marginBottom: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.accent,
  },
  statusNoticeText: {
    ...typography.captionMedium,
    color: colors.ink,
    flex: 1,
  },
  summary: {
    ...typography.body,
    fontSize: 17,
    lineHeight: 26,
    color: colors.inkMuted,
    marginBottom: spacing.md,
    fontStyle: 'italic',
  },
  skeletonHeader: {
    flex: 1,
  },
  skeletonBody: {
    padding: spacing.lg,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

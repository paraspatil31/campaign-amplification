import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, typography, spacing, radius } from '@/theme/tokens';
import { getActivities, markAllActivitiesRead } from '@/services/activity';
import { ActivityItem } from '@/types';
import { ScreenState } from '@/components/feedback/ScreenState';
import { formatRelativeTime } from '@/lib/format';
import { useToast } from '@/components/feedback/Toast';

import { useRouter } from 'expo-router';
import { Chip } from '@/components/ui/Chip';

export default function ActivityScreen() {
  const router = useRouter();
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const { showSuccess } = useToast();

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getActivities();
      setActivities(data);
    } catch (err: any) {
      setError(err?.message || 'Failed to load activities');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleMarkAllRead = async () => {
    await markAllActivitiesRead();
    setActivities((prev) => prev.map((a) => ({ ...a, readAt: new Date().toISOString() })));
    showSuccess('All notifications marked as read');
  };

  const handleActivityPress = (item: ActivityItem) => {
    if (item.campaignId) {
      router.push(`/campaign/${item.campaignId}` as any);
    }
  };

  const filteredActivities = activities.filter((item) => {
    if (filterType === 'all') return true;
    if (filterType === 'contributions') return item.type === 'contribution_success';
    if (filterType === 'milestones') return item.type === 'milestone';
    if (filterType === 'campaigns')
      return ['submission_received', 'status_change', 'promotion_progress', 'report_available'].includes(item.type);
    return true;
  });

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'milestone':
        return { name: 'flag' as const, color: colors.accent, bg: colors.accentLight };
      case 'contribution_success':
        return { name: 'check-circle' as const, color: colors.primary, bg: colors.primaryLight };
      case 'promotion_progress':
        return { name: 'radio' as const, color: colors.purple, bg: colors.purpleLight };
      case 'report_available':
        return { name: 'award' as const, color: colors.teal, bg: colors.tealLight };
      case 'submission_received':
        return { name: 'clock' as const, color: colors.warning, bg: colors.warningLight };
      default:
        return { name: 'bell' as const, color: colors.inkMuted, bg: colors.surfaceSubtle };
    }
  };

  return (
    <View style={styles.container}>
      {/* Header action */}
      <View style={styles.topRow}>
        <Text style={styles.sectionHeader}>Activity & Notifications</Text>
        <TouchableOpacity
          onPress={handleMarkAllRead}
          accessibilityRole="button"
          accessibilityLabel="Mark all notifications as read"
        >
          <Text style={styles.markReadText}>Mark all read</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Chips */}
      <View style={styles.chipsRow}>
        <Chip
          label="All"
          selected={filterType === 'all'}
          onPress={() => setFilterType('all')}
        />
        <Chip
          label="Contributions"
          selected={filterType === 'contributions'}
          onPress={() => setFilterType('contributions')}
        />
        <Chip
          label="Campaign Updates"
          selected={filterType === 'campaigns'}
          onPress={() => setFilterType('campaigns')}
        />
        <Chip
          label="Milestones"
          selected={filterType === 'milestones'}
          onPress={() => setFilterType('milestones')}
        />
      </View>

      <ScreenState
        isLoading={loading}
        error={error}
        isEmpty={filteredActivities.length === 0}
        emptyTitle="No Activity in this Filter"
        emptyMessage="Updates on campaigns you create, follow, or back will appear here."
        onRetry={loadData}
      >
        <FlatList
          data={filteredActivities}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => {
            const iconMeta = getActivityIcon(item.type);
            const isUnread = !item.readAt;

            return (
              <TouchableOpacity
                style={[styles.activityCard, isUnread && styles.unreadCard]}
                onPress={() => handleActivityPress(item)}
                activeOpacity={0.8}
                accessible
                accessibilityRole="button"
                accessibilityLabel={`${item.title}. ${item.body}`}
              >
                <View
                  style={[styles.iconContainer, { backgroundColor: iconMeta.bg }]}
                >
                  <Feather name={iconMeta.name} size={18} color={iconMeta.color} />
                </View>
                <View style={styles.textContainer}>
                  <View style={styles.titleRow}>
                    <Text style={styles.title} numberOfLines={1}>
                      {item.title}
                    </Text>
                    {isUnread && <View style={styles.unreadDot} />}
                  </View>
                  <Text style={styles.body}>{item.body}</Text>
                  <View style={styles.metaRow}>
                    <Text style={styles.timestamp}>
                      {formatRelativeTime(item.createdAt)}
                    </Text>
                    {item.campaignId && (
                      <Text style={styles.viewCampaignLink}>View Campaign →</Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </ScreenState>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  sectionHeader: {
    ...typography.bodySemibold,
    color: colors.ink,
  },
  markReadText: {
    ...typography.captionMedium,
    color: colors.primary,
    fontWeight: '600',
  },
  listContent: {
    padding: spacing.lg,
    paddingBottom: 40,
  },
  activityCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: radius.card,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  unreadCard: {
    borderColor: colors.primary,
    backgroundColor: '#FAFCFF',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  title: {
    ...typography.bodySemibold,
    color: colors.ink,
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginLeft: 6,
  },
  body: {
    ...typography.body,
    fontSize: 14,
    color: colors.inkMuted,
    lineHeight: 20,
    marginBottom: 6,
  },
  timestamp: {
    ...typography.caption,
    color: colors.inkSubtle,
    fontSize: 12,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewCampaignLink: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
    fontSize: 12,
  },
});

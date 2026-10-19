import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, typography, spacing, radius, shadows } from '@/theme/tokens';
import { Campaign, DistributionReport, CampaignStatus } from '@/types';
import { getCampaigns } from '@/services/campaigns';
import { SEED_REPORTS } from '@/data/seed/reports';
import { formatCurrency, formatPercent, formatDate } from '@/lib/format';
import { StatusChip } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface CreatorDashboardModalProps {
  visible: boolean;
  onClose: () => void;
}

type TabType = 'all' | 'drafts' | 'in_review' | 'funding' | 'promoting' | 'completed';

export function CreatorDashboardModal({ visible, onClose }: CreatorDashboardModalProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedReport, setSelectedReport] = useState<DistributionReport | null>(null);

  const loadCreatorCampaigns = async () => {
    const all = await getCampaigns();
    setCampaigns(all);
  };

  useEffect(() => {
    if (visible) {
      loadCreatorCampaigns();
    }
  }, [visible]);

  const filteredCampaigns = campaigns.filter((c) => {
    switch (activeTab) {
      case 'in_review':
        return ['submitted', 'changes_requested'].includes(c.status);
      case 'funding':
        return ['available_for_funding', 'goal_reached'].includes(c.status);
      case 'promoting':
        return c.status === 'promoting';
      case 'completed':
        return c.status === 'completed';
      case 'all':
      default:
        return true;
    }
  });

  const totalRaised = campaigns.reduce((acc, c) => acc + (c.raisedCents || 0), 0);
  const activeCount = campaigns.filter((c) =>
    ['available_for_funding', 'promoting'].includes(c.status)
  ).length;

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheetContainer}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>Creator Dashboard</Text>
              <Text style={styles.headerSubtitle}>
                Campaign management, analytics & distribution reports
              </Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Feather name="x" size={20} color={colors.ink} />
            </TouchableOpacity>
          </View>

          {/* Analytics Snapshot Row */}
          <View style={styles.analyticsRow}>
            <View style={styles.analyticsCard}>
              <Text style={styles.analyticsLabel}>Total Pooled</Text>
              <Text style={styles.analyticsValue}>{formatCurrency(totalRaised)}</Text>
            </View>
            <View style={styles.analyticsCard}>
              <Text style={styles.analyticsLabel}>Active Flights</Text>
              <Text style={[styles.analyticsValue, { color: colors.accent }]}>{activeCount}</Text>
            </View>
            <View style={styles.analyticsCard}>
              <Text style={styles.analyticsLabel}>Total Campaigns</Text>
              <Text style={styles.analyticsValue}>{campaigns.length}</Text>
            </View>
          </View>

          {/* Tabs Row */}
          <View style={styles.tabsWrapper}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScroll}>
              <TouchableOpacity
                style={[styles.tabChip, activeTab === 'all' && styles.tabChipActive]}
                onPress={() => setActiveTab('all')}
              >
                <Text style={[styles.tabChipText, activeTab === 'all' && styles.tabChipTextActive]}>
                  All ({campaigns.length})
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tabChip, activeTab === 'funding' && styles.tabChipActive]}
                onPress={() => setActiveTab('funding')}
              >
                <Text style={[styles.tabChipText, activeTab === 'funding' && styles.tabChipTextActive]}>
                  Funding
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tabChip, activeTab === 'in_review' && styles.tabChipActive]}
                onPress={() => setActiveTab('in_review')}
              >
                <Text style={[styles.tabChipText, activeTab === 'in_review' && styles.tabChipTextActive]}>
                  In Review
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tabChip, activeTab === 'promoting' && styles.tabChipActive]}
                onPress={() => setActiveTab('promoting')}
              >
                <Text style={[styles.tabChipText, activeTab === 'promoting' && styles.tabChipTextActive]}>
                  Promoting
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tabChip, activeTab === 'completed' && styles.tabChipActive]}
                onPress={() => setActiveTab('completed')}
              >
                <Text style={[styles.tabChipText, activeTab === 'completed' && styles.tabChipTextActive]}>
                  Completed
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          {/* Campaign List */}
          <ScrollView style={styles.listContent} contentContainerStyle={{ paddingBottom: 40 }}>
            {filteredCampaigns.map((camp) => {
              const report = SEED_REPORTS.find((r) => r.campaignId === camp.id);
              const pct = formatPercent(camp.raisedCents, camp.fundingGoalCents);

              return (
                <View key={camp.id} style={styles.campaignCard}>
                  <View style={styles.cardHeader}>
                    <View style={{ flex: 1, marginRight: spacing.sm }}>
                      <Text style={styles.campTitle} numberOfLines={2}>
                        {camp.title}
                      </Text>
                      <Text style={styles.campCategory}>
                        {camp.category} · Created {formatDate(camp.createdAt)}
                      </Text>
                    </View>
                    <StatusChip status={camp.status} />
                  </View>

                  <View style={styles.statsRow}>
                    <View style={styles.statItem}>
                      <Text style={styles.statLabel}>Raised</Text>
                      <Text style={styles.statVal}>{formatCurrency(camp.raisedCents)}</Text>
                    </View>
                    <View style={styles.statItem}>
                      <Text style={styles.statLabel}>Goal</Text>
                      <Text style={styles.statVal}>{formatCurrency(camp.fundingGoalCents)}</Text>
                    </View>
                    <View style={styles.statItem}>
                      <Text style={styles.statLabel}>Funded</Text>
                      <Text style={[styles.statVal, { color: colors.primary }]}>{pct}</Text>
                    </View>
                    <View style={styles.statItem}>
                      <Text style={styles.statLabel}>Backers</Text>
                      <Text style={styles.statVal}>{camp.backerCount || 0}</Text>
                    </View>
                  </View>

                  {/* Actions Row */}
                  <View style={styles.cardActions}>
                    <Button
                      title="View Page"
                      size="sm"
                      variant="secondary"
                      onPress={() => {
                        onClose();
                        router.push(`/campaign/${camp.id}` as any);
                      }}
                      icon="external-link"
                    />
                    {report && (
                      <Button
                        title="Distribution Report"
                        size="sm"
                        variant="primary"
                        onPress={() => setSelectedReport(report)}
                        icon="file-text"
                      />
                    )}
                  </View>
                </View>
              );
            })}
          </ScrollView>

          {/* Distribution Report Modal (FT-073) */}
          {selectedReport && (
            <Modal visible={Boolean(selectedReport)} animationType="fade" transparent>
              <View style={styles.reportOverlay}>
                <View style={styles.reportModalCard}>
                  <View style={styles.reportHeader}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.reportBadge}>FINAL DISTRIBUTION REPORT</Text>
                      <Text style={styles.reportTitle}>{selectedReport.campaignTitle}</Text>
                    </View>
                    <TouchableOpacity onPress={() => setSelectedReport(null)}>
                      <Feather name="x" size={20} color={colors.ink} />
                    </TouchableOpacity>
                  </View>

                  <ScrollView style={{ maxHeight: 420 }}>
                    <View style={styles.reportMetricsGrid}>
                      <View style={styles.reportMetricBox}>
                        <Text style={styles.reportMetricLabel}>Total Ad Budget Spent</Text>
                        <Text style={styles.reportMetricVal}>
                          {formatCurrency(selectedReport.adSpendCents)}
                        </Text>
                      </View>
                      <View style={styles.reportMetricBox}>
                        <Text style={styles.reportMetricLabel}>Total Ad Impressions</Text>
                        <Text style={styles.reportMetricVal}>
                          {selectedReport.impressions.toLocaleString()}
                        </Text>
                      </View>
                      <View style={styles.reportMetricBox}>
                        <Text style={styles.reportMetricLabel}>Verified Unique Reach</Text>
                        <Text style={[styles.reportMetricVal, { color: colors.accent }]}>
                          {selectedReport.measuredReach.toLocaleString()} people
                        </Text>
                      </View>
                      <View style={styles.reportMetricBox}>
                        <Text style={styles.reportMetricLabel}>Click-Through Rate (CTR)</Text>
                        <Text style={styles.reportMetricVal}>{selectedReport.ctr}%</Text>
                      </View>
                    </View>

                    <View style={styles.reportNote}>
                      <Feather name="check-circle" size={16} color={colors.accent} style={{ marginRight: 6 }} />
                      <Text style={styles.reportNoteText}>
                        Delivered reach is measured and verified from publisher ad server logs.
                      </Text>
                    </View>
                  </ScrollView>

                  <Button
                    title="Close Report"
                    variant="secondary"
                    onPress={() => setSelectedReport(null)}
                    style={{ marginTop: spacing.md }}
                  />
                </View>
              </View>
            </Modal>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.sheet,
    borderTopRightRadius: radius.sheet,
    maxHeight: '92%',
    paddingBottom: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    ...typography.h3,
    color: colors.ink,
  },
  headerSubtitle: {
    ...typography.caption,
    color: colors.inkMuted,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  analyticsRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.sm,
    backgroundColor: colors.surfaceSubtle,
  },
  analyticsCard: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.input,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  analyticsLabel: {
    ...typography.caption,
    color: colors.inkMuted,
    fontSize: 11,
  },
  analyticsValue: {
    ...typography.h3,
    color: colors.ink,
    marginTop: 2,
  },
  tabsWrapper: {
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: spacing.sm,
  },
  tabsScroll: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  tabChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceSubtle,
  },
  tabChipActive: {
    backgroundColor: colors.primary,
  },
  tabChipText: {
    ...typography.caption,
    color: colors.inkMuted,
    fontWeight: '600',
  },
  tabChipTextActive: {
    color: colors.surface,
  },
  listContent: {
    padding: spacing.lg,
  },
  campaignCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.card,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  campTitle: {
    ...typography.bodySemibold,
    color: colors.ink,
    lineHeight: 20,
  },
  campCategory: {
    ...typography.caption,
    color: colors.inkSubtle,
    fontSize: 11,
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceSubtle,
    borderRadius: radius.input,
    padding: spacing.sm,
    marginVertical: spacing.xs,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    ...typography.caption,
    fontSize: 11,
    color: colors.inkMuted,
  },
  statVal: {
    ...typography.captionMedium,
    color: colors.ink,
    fontWeight: '700',
    marginTop: 2,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  reportOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  reportModalCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: spacing.lg,
    ...shadows.sheet,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: spacing.sm,
  },
  reportBadge: {
    ...typography.caption,
    fontSize: 10,
    fontWeight: '700',
    color: colors.accent,
  },
  reportTitle: {
    ...typography.h3,
    color: colors.ink,
    marginTop: 2,
  },
  reportMetricsGrid: {
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  reportMetricBox: {
    backgroundColor: colors.surfaceSubtle,
    padding: spacing.md,
    borderRadius: radius.input,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reportMetricLabel: {
    ...typography.caption,
    color: colors.inkMuted,
  },
  reportMetricVal: {
    ...typography.bodySemibold,
    color: colors.ink,
  },
  reportNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accentLight,
    padding: spacing.md,
    borderRadius: radius.input,
  },
  reportNoteText: {
    ...typography.caption,
    color: colors.ink,
    flex: 1,
    fontSize: 11,
  },
});

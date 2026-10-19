import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, typography, spacing, radius } from '@/theme/tokens';
import { Campaign, CampaignStatus } from '@/types';
import { getCampaigns } from '@/services/campaigns';
import { mockStore } from '@/services/mock/mockStore';
import { StatusChip } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/feedback/Toast';

interface DevReviewPanelModalProps {
  visible: boolean;
  onClose: () => void;
  onStatusChanged?: () => void;
}

const ALL_STATUSES: CampaignStatus[] = [
  'submitted',
  'approved',
  'available_for_funding',
  'goal_reached',
  'promoting',
  'completed',
  'changes_requested',
  'rejected',
  'refund_pending',
];

export function DevReviewPanelModal({
  visible,
  onClose,
  onStatusChanged,
}: DevReviewPanelModalProps) {
  const { showSuccess, showToast } = useToast();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>('');

  const loadData = async () => {
    const list = await getCampaigns();
    setCampaigns(list);
    if (list.length > 0 && !selectedCampaignId) {
      setSelectedCampaignId(list[0].id);
    }
  };

  useEffect(() => {
    if (visible) {
      loadData();
    }
  }, [visible]);

  const selectedCampaign = campaigns.find((c) => c.id === selectedCampaignId);

  const handleSetStatus = (newStatus: CampaignStatus) => {
    if (!selectedCampaign) return;
    try {
      mockStore.updateCampaignStatus(selectedCampaign.id, newStatus);
      showSuccess(`Status changed to "${newStatus}"`);
      loadData();
      onStatusChanged?.();
    } catch (err: any) {
      showToast(err?.message || 'Failed to update status', 'error');
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View>
              <View style={styles.badgeRow}>
                <View style={styles.devBadge}>
                  <Text style={styles.devBadgeText}>DEMO EVALUATION TOOL</Text>
                </View>
              </View>
              <Text style={styles.title}>Developer Review Panel</Text>
              <Text style={styles.subtitle}>
                Simulate editorial transitions and status advances for demo evaluation
              </Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Feather name="x" size={20} color={colors.ink} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.body} contentContainerStyle={{ paddingBottom: 40 }}>
            {/* Select Campaign Dropdown/List */}
            <Text style={styles.sectionLabel}>Select Campaign to Modify:</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.campaignsScroll}
            >
              {campaigns.map((c) => {
                const isSelected = c.id === selectedCampaignId;
                return (
                  <TouchableOpacity
                    key={c.id}
                    style={[styles.campChip, isSelected && styles.campChipSelected]}
                    onPress={() => setSelectedCampaignId(c.id)}
                  >
                    <Text
                      style={[styles.campChipText, isSelected && styles.campChipTextSelected]}
                      numberOfLines={1}
                    >
                      {c.title}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {selectedCampaign && (
              <View style={styles.controlBox}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoTitle} numberOfLines={2}>
                    {selectedCampaign.title}
                  </Text>
                  <StatusChip status={selectedCampaign.status} />
                </View>

                <Text style={styles.actionsLabel}>Simulate Status Transition:</Text>
                <View style={styles.statusButtonsGrid}>
                  {ALL_STATUSES.map((st) => {
                    const isCurrent = selectedCampaign.status === st;
                    return (
                      <TouchableOpacity
                        key={st}
                        style={[styles.statusBtn, isCurrent && styles.statusBtnCurrent]}
                        onPress={() => handleSetStatus(st)}
                      >
                        <Text
                          style={[
                            styles.statusBtnText,
                            isCurrent && styles.statusBtnTextCurrent,
                          ]}
                        >
                          {st.replace(/_/g, ' ')}
                        </Text>
                        {isCurrent && (
                          <Feather name="check" size={14} color={colors.primary} />
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>

                {/* Quick Shortcuts */}
                <View style={styles.shortcutsBox}>
                  <Text style={styles.shortcutsTitle}>Quick Demo Shortcuts:</Text>
                  <View style={styles.shortcutRow}>
                    <Button
                      title="Approve for Funding"
                      size="sm"
                      variant="secondary"
                      onPress={() => handleSetStatus('available_for_funding')}
                      icon="check"
                      style={{ flex: 1 }}
                    />
                    <Button
                      title="Launch Promoting"
                      size="sm"
                      variant="secondary"
                      onPress={() => handleSetStatus('promoting')}
                      icon="radio"
                      style={{ flex: 1 }}
                    />
                    <Button
                      title="Complete Flight"
                      size="sm"
                      variant="secondary"
                      onPress={() => handleSetStatus('completed')}
                      icon="award"
                      style={{ flex: 1 }}
                    />
                  </View>
                </View>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.sheet,
    borderTopRightRadius: radius.sheet,
    maxHeight: '90%',
    paddingBottom: spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  badgeRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  devBadge: {
    backgroundColor: colors.purpleLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.pill,
  },
  devBadgeText: {
    ...typography.caption,
    fontSize: 10,
    fontWeight: '700',
    color: colors.purple,
  },
  title: {
    ...typography.h3,
    color: colors.ink,
  },
  subtitle: {
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
  body: {
    padding: spacing.lg,
  },
  sectionLabel: {
    ...typography.bodySemibold,
    color: colors.ink,
    marginBottom: spacing.xs,
  },
  campaignsScroll: {
    gap: spacing.sm,
    paddingBottom: spacing.md,
  },
  campChip: {
    maxWidth: 200,
    backgroundColor: colors.surfaceSubtle,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
  },
  campChipSelected: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  campChipText: {
    ...typography.caption,
    color: colors.ink,
  },
  campChipTextSelected: {
    color: colors.primary,
    fontWeight: '700',
  },
  controlBox: {
    backgroundColor: colors.surfaceSubtle,
    borderRadius: radius.card,
    padding: spacing.md,
    marginTop: spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  infoTitle: {
    ...typography.bodySemibold,
    color: colors.ink,
    flex: 1,
    marginRight: spacing.sm,
  },
  actionsLabel: {
    ...typography.captionMedium,
    color: colors.inkMuted,
    marginBottom: spacing.sm,
  },
  statusButtonsGrid: {
    gap: spacing.xs,
  },
  statusBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.input,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statusBtnCurrent: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  statusBtnText: {
    ...typography.captionMedium,
    color: colors.ink,
    textTransform: 'capitalize',
  },
  statusBtnTextCurrent: {
    color: colors.primary,
    fontWeight: '700',
  },
  shortcutsBox: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  shortcutsTitle: {
    ...typography.captionMedium,
    color: colors.ink,
    marginBottom: spacing.xs,
  },
  shortcutRow: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
});

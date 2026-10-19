import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableOpacity,
  Share,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, typography, spacing, radius } from '@/theme/tokens';
import { Receipt } from '@/types';
import { mockStore } from '@/services/mock/mockStore';
import { formatCurrency, formatDate } from '@/lib/format';
import { Button } from '@/components/ui/Button';

interface ReceiptsHistoryModalProps {
  visible: boolean;
  onClose: () => void;
}

export function ReceiptsHistoryModal({ visible, onClose }: ReceiptsHistoryModalProps) {
  const [receipts, setReceipts] = useState<Receipt[]>([]);

  useEffect(() => {
    if (visible) {
      // Get all receipts from mockStore
      const all = mockStore.getReceipts();
      setReceipts(all);
    }
  }, [visible]);

  const handleShareReceipt = async (r: Receipt) => {
    try {
      await Share.share({
        message: `Contribution Receipt #${r.number}: ${formatCurrency(r.totalCents)} pooled for "${r.campaignTitle}".`,
        title: `Receipt #${r.number}`,
      });
    } catch {
      // Ignored
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheetContainer}>
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Payment History & Receipts</Text>
              <Text style={styles.subtitle}>Verified records of your campaign contributions</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Feather name="x" size={20} color={colors.ink} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.body} contentContainerStyle={{ paddingBottom: 40 }}>
            {receipts.length === 0 ? (
              <View style={styles.emptyBox}>
                <Feather name="file-text" size={32} color={colors.inkSubtle} />
                <Text style={styles.emptyTitle}>No Receipts Yet</Text>
                <Text style={styles.emptySubtitle}>
                  When you back campaigns to pool distribution budget, your official receipts will be securely stored here.
                </Text>
              </View>
            ) : (
              receipts.map((r) => (
                <View key={r.id} style={styles.receiptCard}>
                  <View style={styles.cardTop}>
                    <View>
                      <Text style={styles.receiptNum}>Receipt #{r.number}</Text>
                      <Text style={styles.receiptDate}>{formatDate(r.issuedAt)}</Text>
                    </View>
                    <Text style={styles.amountText}>{formatCurrency(r.totalCents)}</Text>
                  </View>

                  <Text style={styles.campaignTitle} numberOfLines={2}>
                    {r.campaignTitle}
                  </Text>

                  <View style={styles.divider} />

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Net Ad Distribution:</Text>
                    <Text style={styles.detailVal}>{formatCurrency(r.adBudgetCents)}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Platform & Processing:</Text>
                    <Text style={styles.detailVal}>
                      {formatCurrency(r.platformFeeCents + r.processingFeeCents)}
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Payment Method:</Text>
                    <Text style={styles.detailVal}>{r.paymentMethodMasked}</Text>
                  </View>

                  <View style={styles.actionRow}>
                    <TouchableOpacity
                      style={styles.shareBtn}
                      onPress={() => handleShareReceipt(r)}
                    >
                      <Feather name="share-2" size={14} color={colors.primary} style={{ marginRight: 4 }} />
                      <Text style={styles.shareBtnText}>Share Receipt</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
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
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.sheet,
    borderTopRightRadius: radius.sheet,
    maxHeight: '90%',
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
  emptyBox: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyTitle: {
    ...typography.h3,
    color: colors.ink,
    marginTop: spacing.md,
  },
  emptySubtitle: {
    ...typography.caption,
    color: colors.inkMuted,
    textAlign: 'center',
    marginTop: spacing.xs,
    paddingHorizontal: spacing.xl,
  },
  receiptCard: {
    backgroundColor: colors.surfaceSubtle,
    borderRadius: radius.card,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
  },
  receiptNum: {
    ...typography.captionMedium,
    fontWeight: '700',
    color: colors.ink,
  },
  receiptDate: {
    ...typography.caption,
    color: colors.inkSubtle,
    fontSize: 11,
  },
  amountText: {
    ...typography.h3,
    color: colors.primary,
  },
  campaignTitle: {
    ...typography.bodySemibold,
    color: colors.ink,
    lineHeight: 20,
    marginBottom: spacing.xs,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.xs,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  detailLabel: {
    ...typography.caption,
    color: colors.inkMuted,
  },
  detailVal: {
    ...typography.caption,
    color: colors.ink,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: spacing.sm,
  },
  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
  },
  shareBtnText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },
});

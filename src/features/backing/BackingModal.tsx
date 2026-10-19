import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Share,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, typography, spacing, radius, shadows } from '@/theme/tokens';
import { Campaign, Receipt } from '@/types';
import { ASSUMPTIONS } from '@/config/assumptions';
import { CONSTANTS } from '@/config/constants';
import { calcFees } from '@/lib/fees';
import { estimateReach } from '@/lib/reach';
import { formatCurrency } from '@/lib/format';
import { createContribution } from '@/services/contributions';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/feedback/Toast';

interface BackingModalProps {
  visible: boolean;
  campaign: Campaign;
  onClose: () => void;
  onSuccess: () => void;
}

const PRESET_AMOUNTS = [10, 25, 50, 100];

export function BackingModal({ visible, campaign, onClose, onSuccess }: BackingModalProps) {
  const { showToast } = useToast();

  // Wizard state: 1: Amount -> 2: Review -> 3: Checkout -> 4: Receipt
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  const [selectedAmount, setSelectedAmount] = useState<number>(25);
  const [customAmountStr, setCustomAmountStr] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);

  const [guestEmail, setGuestEmail] = useState('');
  const [publicNameOptIn, setPublicNameOptIn] = useState(false);
  const [backerName, setBackerName] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'wallet'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [receipt, setReceipt] = useState<Receipt | null>(null);

  const currentAmount = useMemo(() => {
    if (isCustom) {
      const parsed = parseFloat(customAmountStr);
      return isNaN(parsed) ? 0 : parsed;
    }
    return selectedAmount;
  }, [isCustom, customAmountStr, selectedAmount]);

  const fees = useMemo(() => calcFees(currentAmount), [currentAmount]);
  const reach = useMemo(() => estimateReach(currentAmount), [currentAmount]);

  const handleSelectPreset = (amount: number) => {
    setIsCustom(false);
    setSelectedAmount(amount);
  };

  const handleCustomChange = (text: string) => {
    setIsCustom(true);
    setCustomAmountStr(text.replace(/[^0-9.]/g, ''));
  };

  const canProceedToReview = currentAmount >= ASSUMPTIONS.MIN_CONTRIBUTION_USD;

  const handleProcessPayment = async () => {
    if (!termsAgreed) {
      showToast('Please acknowledge terms before proceeding', 'error');
      return;
    }

    try {
      setIsProcessing(true);
      const res = await createContribution(campaign.id, currentAmount, {
        guestEmail: guestEmail.trim() || undefined,
        publicNameOptIn,
        backerName: publicNameOptIn ? backerName.trim() || 'Community Backer' : undefined,
      });
      setReceipt(res.receipt);
      setStep(4);
      onSuccess();
    } catch (err: any) {
      showToast(err?.message || 'Payment simulation failed. Please retry.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `I just backed "${campaign.title}" to amplify its reach on digital media! Join me:`,
        title: campaign.title,
      });
    } catch {
      // Ignored
    }
  };

  const handleClose = () => {
    setStep(1);
    setIsProcessing(false);
    setReceipt(null);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={styles.headerTitle}>
                {step === 4 ? 'Receipt & Confirmation' : 'Back This Campaign'}
              </Text>
              <Text style={styles.headerSubtitle} numberOfLines={1}>
                {campaign.title}
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleClose}
              style={styles.closeButton}
              accessibilityRole="button"
              accessibilityLabel="Close backing modal"
            >
              <Feather name="x" size={20} color={colors.ink} />
            </TouchableOpacity>
          </View>

          {/* Progress Steps Indicator */}
          {step < 4 && (
            <View style={styles.stepIndicator}>
              <View style={[styles.stepDot, step >= 1 && styles.stepDotActive]}>
                <Text style={[styles.stepNum, step >= 1 && styles.stepNumActive]}>1</Text>
              </View>
              <View style={[styles.stepLine, step >= 2 && styles.stepLineActive]} />
              <View style={[styles.stepDot, step >= 2 && styles.stepDotActive]}>
                <Text style={[styles.stepNum, step >= 2 && styles.stepNumActive]}>2</Text>
              </View>
              <View style={[styles.stepLine, step >= 3 && styles.stepLineActive]} />
              <View style={[styles.stepDot, step >= 3 && styles.stepDotActive]}>
                <Text style={[styles.stepNum, step >= 3 && styles.stepNumActive]}>3</Text>
              </View>
            </View>
          )}

          <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
            {/* STEP 1: AMOUNT SELECTION */}
            {step === 1 && (
              <View>
                {/* Non-negotiable Notice */}
                <View style={styles.noticeBox}>
                  <Feather name="info" size={16} color={colors.primary} style={styles.noticeIcon} />
                  <Text style={styles.noticeText}>
                    Contributions fund distribution of the message to target audiences, not direct support for the cause or creator.
                  </Text>
                </View>

                <Text style={styles.label}>Select Contribution Amount</Text>
                <View style={styles.presetsRow}>
                  {PRESET_AMOUNTS.map((amt) => {
                    const isSelected = !isCustom && selectedAmount === amt;
                    return (
                      <TouchableOpacity
                        key={amt}
                        style={[styles.presetCard, isSelected && styles.presetCardSelected]}
                        onPress={() => handleSelectPreset(amt)}
                        accessibilityRole="button"
                        accessibilityLabel={`Select $${amt}`}
                      >
                        <Text style={[styles.presetText, isSelected && styles.presetTextSelected]}>
                          ${amt}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                {/* Custom Amount Field */}
                <Text style={[styles.label, { marginTop: spacing.md }]}>Or enter custom amount ($)</Text>
                <Input
                  placeholder="Min $5"
                  value={customAmountStr}
                  onChangeText={handleCustomChange}
                  keyboardType="numeric"
                />

                {/* Reach Estimation Chip */}
                {canProceedToReview ? (
                  <View style={styles.reachBox}>
                    <Feather name="trending-up" size={18} color={colors.accent} style={{ marginRight: 8 }} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.reachTitle}>
                        Estimated Ad Reach: {reach.formatted}
                      </Text>
                      <Text style={styles.reachDisclaimer}>*{reach.disclaimer}</Text>
                    </View>
                  </View>
                ) : (
                  <Text style={styles.minWarning}>Minimum contribution is ${ASSUMPTIONS.MIN_CONTRIBUTION_USD}</Text>
                )}

                <Button
                  title="Continue to Review"
                  onPress={() => setStep(2)}
                  disabled={!canProceedToReview}
                  style={{ marginTop: spacing.lg }}
                  icon="arrow-right"
                />
              </View>
            )}

            {/* STEP 2: REVIEW & TERMS */}
            {step === 2 && (
              <View>
                <Text style={styles.sectionHeader}>Contribution Summary</Text>

                <View style={styles.summaryCard}>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Contribution Amount</Text>
                    <Text style={styles.summaryValue}>{formatCurrency(fees.amountCents)}</Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Platform Distribution Fee (5%)</Text>
                    <Text style={styles.summaryValue}>{formatCurrency(fees.platformFeeCents)}</Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Payment Processing (2.9% + $0.30)</Text>
                    <Text style={styles.summaryValue}>{formatCurrency(fees.processingFeeCents)}</Text>
                  </View>
                  <View style={[styles.summaryRow, styles.summaryTotalRow]}>
                    <Text style={styles.summaryTotalLabel}>Net Ad Distribution Budget</Text>
                    <Text style={styles.summaryTotalValue}>{formatCurrency(fees.adBudgetCents)}</Text>
                  </View>
                </View>

                {/* Guest Email Input */}
                <Text style={[styles.label, { marginTop: spacing.md }]}>Email for Receipt (Optional for Guests)</Text>
                <Input
                  placeholder="name@example.com"
                  value={guestEmail}
                  onChangeText={setGuestEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                {/* Privacy / Public Name Toggle (OFF by default) */}
                <TouchableOpacity
                  style={styles.checkboxRow}
                  onPress={() => setPublicNameOptIn((prev) => !prev)}
                  activeOpacity={0.8}
                >
                  <View style={[styles.checkbox, publicNameOptIn && styles.checkboxActive]}>
                    {publicNameOptIn && <Feather name="check" size={14} color={colors.surface} />}
                  </View>
                  <Text style={styles.checkboxLabel}>
                    Display my name on the public backer list (Default is private/anonymous)
                  </Text>
                </TouchableOpacity>

                {publicNameOptIn && (
                  <Input
                    placeholder="Enter your public display name"
                    value={backerName}
                    onChangeText={setBackerName}
                    containerStyle={{ marginTop: spacing.xs }}
                  />
                )}

                {/* Terms & Refund Acknowledgment */}
                <TouchableOpacity
                  style={[styles.checkboxRow, { marginTop: spacing.md }]}
                  onPress={() => setTermsAgreed((prev) => !prev)}
                  activeOpacity={0.8}
                >
                  <View style={[styles.checkbox, termsAgreed && styles.checkboxActive]}>
                    {termsAgreed && <Feather name="check" size={14} color={colors.surface} />}
                  </View>
                  <Text style={styles.checkboxLabel}>
                    I understand this contribution funds message distribution, not the cause directly. If minimum flight funding is not reached, funds are held per refund policy.
                  </Text>
                </TouchableOpacity>

                <View style={styles.navButtonsRow}>
                  <Button
                    title="Back"
                    variant="secondary"
                    onPress={() => setStep(1)}
                    style={{ flex: 1, marginRight: spacing.sm }}
                  />
                  <Button
                    title="Proceed to Payment"
                    onPress={() => setStep(3)}
                    disabled={!termsAgreed}
                    style={{ flex: 2 }}
                    icon="lock"
                  />
                </View>
              </View>
            )}

            {/* STEP 3: SIMULATED CHECKOUT */}
            {step === 3 && (
              <View>
                <Text style={styles.sectionHeader}>Simulated Payment</Text>
                <Text style={styles.noticeText}>
                  This is an evaluation prototype with simulated payment processing. No real charges will occur.
                </Text>

                <View style={styles.paymentMethods}>
                  <TouchableOpacity
                    style={[styles.methodCard, paymentMethod === 'card' && styles.methodCardActive]}
                    onPress={() => setPaymentMethod('card')}
                  >
                    <Feather name="credit-card" size={20} color={colors.primary} />
                    <Text style={styles.methodTitle}>Simulated Card (•••• 4242)</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.methodCard, paymentMethod === 'wallet' && styles.methodCardActive]}
                    onPress={() => setPaymentMethod('wallet')}
                  >
                    <Feather name="smartphone" size={20} color={colors.accent} />
                    <Text style={styles.methodTitle}>Digital Wallet (Apple/Google Pay)</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.checkoutSummary}>
                  <Text style={styles.checkoutTotalLabel}>Total to Pay</Text>
                  <Text style={styles.checkoutTotalAmount}>{formatCurrency(fees.totalCents)}</Text>
                </View>

                {isProcessing ? (
                  <View style={styles.processingBox}>
                    <ActivityIndicator size="large" color={colors.primary} />
                    <Text style={styles.processingText}>Processing simulated transaction...</Text>
                  </View>
                ) : (
                  <View style={styles.navButtonsRow}>
                    <Button
                      title="Back"
                      variant="secondary"
                      onPress={() => setStep(2)}
                      style={{ flex: 1, marginRight: spacing.sm }}
                    />
                    <Button
                      title={`Pay ${formatCurrency(fees.totalCents)}`}
                      onPress={handleProcessPayment}
                      style={{ flex: 2 }}
                      icon="check-circle"
                    />
                  </View>
                )}
              </View>
            )}

            {/* STEP 4: RECEIPT & SUCCESS */}
            {step === 4 && receipt && (
              <View style={styles.receiptContainer}>
                <View style={styles.successBadge}>
                  <Feather name="check" size={32} color={colors.surface} />
                </View>
                <Text style={styles.successTitle}>Contribution Successful!</Text>
                <Text style={styles.successSubtitle}>
                  You just pooled {formatCurrency(receipt.totalCents)} toward distributing "{campaign.title}".
                </Text>

                {/* Receipt Card */}
                <View style={styles.receiptCard}>
                  <View style={styles.receiptHeader}>
                    <Text style={styles.receiptNum}>Receipt #{receipt.number}</Text>
                    <Text style={styles.receiptStatus}>{receipt.status}</Text>
                  </View>

                  <View style={styles.receiptDivider} />

                  <View style={styles.receiptRow}>
                    <Text style={styles.receiptLabel}>Net Ad Distribution</Text>
                    <Text style={styles.receiptVal}>{formatCurrency(receipt.adBudgetCents)}</Text>
                  </View>
                  <View style={styles.receiptRow}>
                    <Text style={styles.receiptLabel}>Platform & Processing Fees</Text>
                    <Text style={styles.receiptVal}>
                      {formatCurrency(receipt.platformFeeCents + receipt.processingFeeCents)}
                    </Text>
                  </View>
                  <View style={[styles.receiptRow, { marginTop: 4 }]}>
                    <Text style={styles.receiptTotalLabel}>Total Paid</Text>
                    <Text style={styles.receiptTotalVal}>{formatCurrency(receipt.totalCents)}</Text>
                  </View>
                  <View style={styles.receiptRow}>
                    <Text style={styles.receiptLabel}>Payment Method</Text>
                    <Text style={styles.receiptVal}>{receipt.paymentMethodMasked}</Text>
                  </View>
                </View>

                {/* Share CTA */}
                <Button
                  title="Share Campaign to Amplify More"
                  onPress={handleShare}
                  variant="secondary"
                  icon="share-2"
                  style={{ marginBottom: spacing.sm }}
                />

                <Button
                  title="Done"
                  onPress={handleClose}
                  variant="primary"
                />
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
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
  headerLeft: {
    flex: 1,
    paddingRight: spacing.md,
  },
  headerTitle: {
    ...typography.h3,
    color: colors.ink,
  },
  headerSubtitle: {
    ...typography.caption,
    color: colors.inkMuted,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    backgroundColor: colors.surfaceSubtle,
  },
  stepDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepDotActive: {
    backgroundColor: colors.primary,
  },
  stepNum: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.inkMuted,
  },
  stepNumActive: {
    color: colors.surface,
  },
  stepLine: {
    width: 40,
    height: 2,
    backgroundColor: colors.border,
    marginHorizontal: 4,
  },
  stepLineActive: {
    backgroundColor: colors.primary,
  },
  body: {
    paddingHorizontal: spacing.lg,
  },
  bodyContent: {
    paddingVertical: spacing.lg,
  },
  noticeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.infoLight,
    padding: spacing.md,
    borderRadius: radius.card,
    marginBottom: spacing.md,
  },
  noticeIcon: {
    marginRight: spacing.sm,
  },
  noticeText: {
    ...typography.caption,
    color: colors.ink,
    flex: 1,
    lineHeight: 18,
  },
  label: {
    ...typography.bodySemibold,
    color: colors.ink,
    marginBottom: spacing.xs,
  },
  presetsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  presetCard: {
    flex: 1,
    paddingVertical: spacing.md,
    backgroundColor: colors.surfaceSubtle,
    borderRadius: radius.input,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  presetCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  presetText: {
    ...typography.h3,
    color: colors.ink,
  },
  presetTextSelected: {
    color: colors.primary,
  },
  reachBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accentLight,
    padding: spacing.md,
    borderRadius: radius.input,
    marginTop: spacing.md,
  },
  reachTitle: {
    ...typography.captionMedium,
    color: colors.ink,
    fontWeight: '700',
  },
  reachDisclaimer: {
    ...typography.caption,
    color: colors.inkMuted,
    fontSize: 11,
  },
  minWarning: {
    ...typography.caption,
    color: colors.danger,
    marginTop: spacing.xs,
  },
  sectionHeader: {
    ...typography.h3,
    color: colors.ink,
    marginBottom: spacing.sm,
  },
  summaryCard: {
    backgroundColor: colors.surfaceSubtle,
    borderRadius: radius.card,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  summaryLabel: {
    ...typography.caption,
    color: colors.inkMuted,
  },
  summaryValue: {
    ...typography.captionMedium,
    color: colors.ink,
  },
  summaryTotalRow: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: 6,
    paddingTop: 8,
  },
  summaryTotalLabel: {
    ...typography.captionMedium,
    fontWeight: '700',
    color: colors.ink,
  },
  summaryTotalValue: {
    ...typography.captionMedium,
    fontWeight: '700',
    color: colors.primary,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.borderDark,
    marginRight: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkboxLabel: {
    ...typography.caption,
    color: colors.ink,
    flex: 1,
    lineHeight: 18,
  },
  navButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  paymentMethods: {
    gap: spacing.sm,
    marginVertical: spacing.md,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.surfaceSubtle,
    borderRadius: radius.input,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  methodCardActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  methodTitle: {
    ...typography.bodySemibold,
    color: colors.ink,
  },
  checkoutSummary: {
    backgroundColor: colors.surfaceSubtle,
    padding: spacing.lg,
    borderRadius: radius.card,
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  checkoutTotalLabel: {
    ...typography.caption,
    color: colors.inkMuted,
  },
  checkoutTotalAmount: {
    ...typography.display,
    color: colors.primary,
  },
  processingBox: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  processingText: {
    ...typography.caption,
    color: colors.inkMuted,
    marginTop: spacing.md,
  },
  receiptContainer: {
    alignItems: 'center',
  },
  successBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  successTitle: {
    ...typography.h2,
    color: colors.ink,
    marginBottom: spacing.xs,
  },
  successSubtitle: {
    ...typography.caption,
    color: colors.inkMuted,
    textAlign: 'center',
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  receiptCard: {
    width: '100%',
    backgroundColor: colors.surfaceSubtle,
    borderRadius: radius.card,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
  },
  receiptHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  receiptNum: {
    ...typography.captionMedium,
    fontWeight: '700',
    color: colors.ink,
  },
  receiptStatus: {
    ...typography.caption,
    color: colors.accent,
    fontWeight: '700',
  },
  receiptDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.xs,
  },
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  receiptLabel: {
    ...typography.caption,
    color: colors.inkMuted,
  },
  receiptVal: {
    ...typography.caption,
    color: colors.ink,
  },
  receiptTotalLabel: {
    ...typography.captionMedium,
    fontWeight: '700',
    color: colors.ink,
  },
  receiptTotalVal: {
    ...typography.captionMedium,
    fontWeight: '700',
    color: colors.primary,
  },
});

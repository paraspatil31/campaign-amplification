import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, typography, spacing, radius } from '@/theme/tokens';
import { Campaign, Category } from '@/types';
import { Button } from '@/components/ui/Button';

interface VoiceAssistantModalProps {
  visible: boolean;
  onClose: () => void;
  onApplyProposal: (proposal: Partial<Campaign>) => void;
}

export function VoiceAssistantModal({
  visible,
  onClose,
  onApplyProposal,
}: VoiceAssistantModalProps) {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentPromptIdx, setCurrentPromptIdx] = useState(0);
  const [transcript, setTranscript] = useState('');

  const PROMPTS = [
    'What urgent issue or message do you want to amplify to the public?',
    'Who is the target audience or region that needs to see this?',
    'What public source or investigation backs up this message?',
  ];

  const handleStartListening = () => {
    setIsListening(true);
    setTranscript('');
    // Simulate recording for 2.5s then synthesize output
    setTimeout(() => {
      setIsListening(false);
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setTranscript(
          'We need to hold chemical factories accountable along the Delaware River. A new study shows micro-contaminants at 3x safety limits. We want to run social and news ads to 100,000 residents in surrounding counties.'
        );
      }, 1200);
    }, 2500);
  };

  const handleApplyDraft = () => {
    const generatedProposal: Partial<Campaign> = {
      title: 'Protect Delaware River Basin: Stop Toxic Runoff',
      category: 'Environment' as Category,
      creatorName: 'Delaware Watershed Action',
      creatorType: 'Community Group',
      summary:
        'Water sampling confirmed micro-pollutants exceeding state safety standards across five counties. Community backers are pooling funds to distribute transparent reports and alert 100,000 residents.',
      coverUrl:
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
      adHeadline: 'Delaware River Water Quality Alert for Local Residents',
      adDescription:
        'Independent laboratory testing revealed chemicals above state limits. Review the data and join our community response.',
      ctaText: 'Read Investigation',
      durationDays: 30,
      target: {
        locations: ['East Coast & Mid-Atlantic'],
        interests: ['Environmental & Conservation', 'Public Health & Wellness'],
        channels: ['Social Feed Placements', 'Independent Publisher Networks'],
        channelAllocations: {
          'Social Feed Placements': 60,
          'Independent Publisher Networks': 40,
        },
        durationDays: 30,
      },
      sources: [
        {
          id: 'src-voice-1',
          title: 'River Basin Commission Water Contaminants Survey 2025',
          url: 'https://example.org/delaware-basin-survey-2025',
          position: 1,
        },
      ],
      storyBlocks: [
        {
          id: 'blk-voice-1',
          type: 'heading',
          content: 'The Reality of Our Freshwater Reserves',
        },
        {
          id: 'blk-voice-2',
          type: 'statistic',
          content: 'Laboratory analysis revealed toxic runoff concentrations well above safety limits.',
          statValue: '3.4x',
          statLabel: 'Above State Permitted Discharge Limits',
        },
        {
          id: 'blk-voice-3',
          type: 'paragraph',
          content:
            'Without widespread public awareness and targeted media distribution, municipal oversight boards will continue to operate without accountability. Your contribution ensures these factual findings are broadcast to residents.',
        },
      ],
    };

    onApplyProposal(generatedProposal);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheetContainer}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTitleRow}>
              <View style={styles.aiBadge}>
                <Feather name="mic" size={14} color={colors.purple} />
                <Text style={styles.aiBadgeText}>Voice AI Assistant</Text>
              </View>
              <Text style={styles.title}>Speak Your Campaign</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Feather name="x" size={20} color={colors.ink} />
            </TouchableOpacity>
          </View>

          <View style={styles.body}>
            <Text style={styles.promptLabel}>Guided Question {currentPromptIdx + 1} of 3:</Text>
            <Text style={styles.promptText}>{PROMPTS[currentPromptIdx]}</Text>

            {/* Mic / Waveform Area */}
            <View style={styles.micCenter}>
              <TouchableOpacity
                style={[styles.micCircle, isListening && styles.micCircleListening]}
                onPress={handleStartListening}
                disabled={isListening || isProcessing}
                accessibilityRole="button"
                accessibilityLabel="Tap to speak"
              >
                {isProcessing ? (
                  <ActivityIndicator size="small" color={colors.surface} />
                ) : (
                  <Feather
                    name="mic"
                    size={32}
                    color={isListening ? colors.surface : colors.purple}
                  />
                )}
              </TouchableOpacity>
              <Text style={styles.micStatusText}>
                {isListening
                  ? 'Listening... Speak naturally'
                  : isProcessing
                  ? 'Transcribing and structuring draft...'
                  : 'Tap microphone to speak'}
              </Text>
            </View>

            {/* Transcript / Proposal Box */}
            {transcript !== '' && (
              <View style={styles.transcriptCard}>
                <View style={styles.transcriptHeader}>
                  <Text style={styles.transcriptTitle}>Generated Draft Outline</Text>
                  <View style={styles.readyBadge}>
                    <Text style={styles.readyBadgeText}>Ready to edit</Text>
                  </View>
                </View>
                <Text style={styles.transcriptBody}>{transcript}</Text>
                <Text style={styles.transcriptNote}>
                  Applying will populate your 5-step wizard. You have full editorial control to edit any word.
                </Text>

                <Button
                  title="Apply to Campaign Wizard"
                  onPress={handleApplyDraft}
                  icon="check"
                  style={{ marginTop: spacing.md }}
                />
              </View>
            )}

            {/* Fallback button per PRD §6 (Demo button) */}
            {transcript === '' && !isListening && (
              <Button
                title="Use Demo Voice Input"
                variant="secondary"
                onPress={() => {
                  setTranscript(
                    'We need to hold chemical factories accountable along the Delaware River. A new study shows micro-contaminants at 3x safety limits. We want to run social and news ads to 100,000 residents in surrounding counties.'
                  );
                }}
                icon="play"
                style={{ marginTop: spacing.lg }}
              />
            )}
          </View>
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
  headerTitleRow: {
    flex: 1,
  },
  aiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  aiBadgeText: {
    ...typography.caption,
    color: colors.purple,
    fontWeight: '700',
    fontSize: 11,
  },
  title: {
    ...typography.h3,
    color: colors.ink,
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
  promptLabel: {
    ...typography.caption,
    color: colors.inkMuted,
    marginBottom: 4,
  },
  promptText: {
    ...typography.h3,
    color: colors.ink,
    lineHeight: 24,
    marginBottom: spacing.xl,
  },
  micCenter: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  micCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.purpleLight,
    borderWidth: 2,
    borderColor: colors.purple,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  micCircleListening: {
    backgroundColor: colors.purple,
  },
  micStatusText: {
    ...typography.captionMedium,
    color: colors.inkMuted,
  },
  transcriptCard: {
    backgroundColor: colors.surfaceSubtle,
    borderRadius: radius.card,
    padding: spacing.md,
    marginTop: spacing.md,
  },
  transcriptHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  transcriptTitle: {
    ...typography.captionMedium,
    fontWeight: '700',
    color: colors.ink,
  },
  readyBadge: {
    backgroundColor: colors.accentLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.pill,
  },
  readyBadgeText: {
    ...typography.caption,
    fontSize: 10,
    fontWeight: '700',
    color: colors.accent,
  },
  transcriptBody: {
    ...typography.caption,
    color: colors.ink,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  transcriptNote: {
    ...typography.caption,
    color: colors.inkMuted,
    fontSize: 11,
    marginTop: spacing.xs,
  },
});

import React from 'react';
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
import { Button } from '@/components/ui/Button';

interface SecondaryPageModalProps {
  visible: boolean;
  pageType: 'faqs' | 'partners' | 'terms' | 'privacy' | 'guidelines' | null;
  onClose: () => void;
}

export function SecondaryPageModal({ visible, pageType, onClose }: SecondaryPageModalProps) {
  if (!pageType) return null;

  const getPageContent = () => {
    switch (pageType) {
      case 'faqs':
        return {
          title: 'How It Works & FAQs',
          subtitle: 'Understanding the Campaign Amplification model',
          sections: [
            {
              heading: 'Is this a donation to the cause?',
              text: 'No. Contributions do not go to the creator, organization, or person. Contributions pool strictly toward ad distribution costs across digital channels (social feeds, search, and publisher networks) to help vital messages reach key audiences.',
            },
            {
              heading: 'What happens if a campaign does not reach its goal?',
              text: 'If a campaign does not reach minimum flight threshold within its duration, backers can request a refund or reallocate their pledge to another message per our refund policy.',
            },
            {
              heading: 'How is reach calculated?',
              text: 'Reach displayed on campaign pages is always an estimate based on industry benchmark CPMs. Measured actual impressions and unique people reached are tracked independently and reported in the post-flight distribution report.',
            },
            {
              heading: 'Can anyone create a campaign?',
              text: 'Yes, individuals, journalists, community groups, and non-profits can draft campaigns. However, every campaign must include verifiable public sources and undergo editorial compliance review before it is approved for funding.',
            },
          ],
        };
      case 'partners':
        return {
          title: 'Partners & Review Process',
          subtitle: 'Editorial standards and advertising integrity',
          sections: [
            {
              heading: 'Editorial Source Verification',
              text: 'We mandate that every factual claim is grounded in public documentation (government audits, peer-reviewed research, certified investigative reports, or legal proceedings).',
            },
            {
              heading: 'Advertising Integrity',
              text: 'All distributed creative units are prominently labeled as "Sponsored Amplification" or "Community-Backed Ad" to maintain absolute transparency with audiences.',
            },
          ],
        };
      case 'terms':
        return {
          title: 'Terms of Service',
          subtitle: 'Platform user agreement & flight terms',
          sections: [
            {
              heading: '1. Message Amplification Purpose',
              text: 'Campaign Amplification operates as an advertising distribution platform. By contributing, you authorize the platform to pool funds and purchase media inventory on behalf of the campaign.',
            },
            {
              heading: '2. Fee Structure',
              text: 'Contributions include a 10% platform fee and standard 2.9% + $0.30 payment processing fee. The remaining 87.1% is dedicated exclusively to media inventory purchases.',
            },
          ],
        };
      case 'privacy':
        return {
          title: 'Privacy Policy',
          subtitle: 'How we safeguard your information',
          sections: [
            {
              heading: 'Backer Anonymity by Default',
              text: 'Backer identities remain private by default. Your name is only displayed on the public backer roll if you explicitly check the opt-in box during the backing flow.',
            },
            {
              heading: 'Zero Selling of Personal Data',
              text: 'We never sell backer or creator information to third-party data brokers or commercial advertisers.',
            },
          ],
        };
      case 'guidelines':
      default:
        return {
          title: 'Community Guidelines',
          subtitle: 'Safety, truthfulness, and civil discourse',
          sections: [
            {
              heading: 'Prohibited Content',
              text: 'Hate speech, defamation, voter suppression, unverified conspiracy theories, and deceptive advertising formats are strictly prohibited and immediately rejected.',
            },
            {
              heading: 'Constructive Amplification',
              text: 'We champion grassroots perspectives, local civic reporting, environmental stewardship, and community resilience.',
            },
          ],
        };
    }
  };

  const content = getPageContent();

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={{ flex: 1, paddingRight: spacing.sm }}>
              <Text style={styles.title}>{content.title}</Text>
              <Text style={styles.subtitle}>{content.subtitle}</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Feather name="x" size={20} color={colors.ink} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.body} contentContainerStyle={{ paddingBottom: 40 }}>
            {content.sections.map((sec, idx) => (
              <View key={idx} style={styles.sectionCard}>
                <Text style={styles.sectionHeading}>{sec.heading}</Text>
                <Text style={styles.sectionText}>{sec.text}</Text>
              </View>
            ))}

            <Button
              title="Close"
              variant="secondary"
              onPress={onClose}
              style={{ marginTop: spacing.md }}
            />
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
  sectionCard: {
    backgroundColor: colors.surfaceSubtle,
    padding: spacing.md,
    borderRadius: radius.card,
    marginBottom: spacing.md,
  },
  sectionHeading: {
    ...typography.bodySemibold,
    color: colors.ink,
    marginBottom: 4,
  },
  sectionText: {
    ...typography.body,
    fontSize: 14,
    color: colors.inkMuted,
    lineHeight: 22,
  },
});

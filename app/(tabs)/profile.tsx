import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, typography, spacing, radius, shadows } from '@/theme/tokens';
import { SEED_USERS } from '@/data/seed/users';
import { CreatorDashboardModal } from '@/features/dashboard/CreatorDashboardModal';
import { ReceiptsHistoryModal } from '@/features/profile/ReceiptsHistoryModal';
import { DevReviewPanelModal } from '@/features/dev/DevReviewPanelModal';
import { SecondaryPageModal } from '@/features/profile/SecondaryPageModal';
import { useToast } from '@/components/feedback/Toast';

interface MenuItem {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  count?: number;
  action: () => void;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

export default function ProfileScreen() {
  const router = useRouter();
  const { showToast } = useToast();
  const currentUser = SEED_USERS[3]; // Alex Rivera (Demo User)

  const [dashboardVisible, setDashboardVisible] = useState(false);
  const [receiptsVisible, setReceiptsVisible] = useState(false);
  const [devReviewVisible, setDevReviewVisible] = useState(false);
  const [secondaryPage, setSecondaryPage] = useState<
    'faqs' | 'partners' | 'terms' | 'privacy' | 'guidelines' | null
  >(null);

  const menuSections: MenuSection[] = [
    {
      title: 'Campaign Management',
      items: [
        {
          icon: 'grid',
          label: 'Creator Dashboard',
          count: 3,
          action: () => setDashboardVisible(true),
        },
        {
          icon: 'heart',
          label: 'Backed Campaigns',
          count: 2,
          action: () => setReceiptsVisible(true),
        },
        {
          icon: 'bookmark',
          label: 'Saved Campaigns',
          count: 3,
          action: () => {
            router.push('/(tabs)/explore');
            showToast('Showing your saved campaigns', 'info');
          },
        },
        {
          icon: 'file-text',
          label: 'Payment Receipts & History',
          action: () => setReceiptsVisible(true),
        },
      ],
    },
    {
      title: 'Evaluation Tools',
      items: [
        {
          icon: 'cpu',
          label: 'Developer Review Panel (Advance Statuses)',
          action: () => setDevReviewVisible(true),
        },
      ],
    },
    {
      title: 'Platform & Legal',
      items: [
        {
          icon: 'help-circle',
          label: 'How It Works & FAQs',
          action: () => setSecondaryPage('faqs'),
        },
        {
          icon: 'users',
          label: 'Partners & Review Process',
          action: () => setSecondaryPage('partners'),
        },
        {
          icon: 'file-text',
          label: 'Terms of Service',
          action: () => setSecondaryPage('terms'),
        },
        {
          icon: 'lock',
          label: 'Privacy Policy',
          action: () => setSecondaryPage('privacy'),
        },
        {
          icon: 'check-circle',
          label: 'Community Guidelines',
          action: () => setSecondaryPage('guidelines'),
        },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Profile Header */}
      <View style={styles.headerCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {currentUser.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.userName}>{currentUser.name}</Text>
          <Text style={styles.userEmail}>{currentUser.email}</Text>
          <View style={styles.singleAccountPill}>
            <Text style={styles.singleAccountText}>Audience · Creator · Backer</Text>
          </View>
        </View>
      </View>

      {/* Guest reassurance note per PRD §4 */}
      <View style={styles.guestNote}>
        <Feather name="info" size={14} color={colors.inkMuted} style={{ marginRight: 6 }} />
        <Text style={styles.guestNoteText}>
          Single unified account. You can discover, create, and back campaigns with one profile.
        </Text>
      </View>

      {/* Menu Sections */}
      {menuSections.map((section, idx) => (
        <View key={idx} style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <View style={styles.menuCard}>
            {section.items.map((item, itemIdx) => (
              <TouchableOpacity
                key={itemIdx}
                style={[
                  styles.menuItem,
                  itemIdx < section.items.length - 1 && styles.menuItemBorder,
                ]}
                activeOpacity={0.7}
                onPress={item.action}
                accessibilityRole="button"
                accessibilityLabel={item.label}
              >
                <Feather
                  name={item.icon}
                  size={18}
                  color={item.icon === 'cpu' ? colors.purple : colors.primary}
                  style={styles.menuIcon}
                />
                <Text
                  style={[
                    styles.menuLabel,
                    item.icon === 'cpu' && { color: colors.purple, fontWeight: '700' },
                  ]}
                >
                  {item.label}
                </Text>
                {item.count !== undefined && (
                  <View style={styles.countBadge}>
                    <Text style={styles.countText}>{item.count}</Text>
                  </View>
                )}
                <Feather name="chevron-right" size={18} color={colors.inkMuted} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      {/* App Version / Mode */}
      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>Campaign Amplification v1.0.0 (Demo Mode)</Text>
      </View>

      {/* Modals */}
      <CreatorDashboardModal
        visible={dashboardVisible}
        onClose={() => setDashboardVisible(false)}
      />

      <ReceiptsHistoryModal
        visible={receiptsVisible}
        onClose={() => setReceiptsVisible(false)}
      />

      <DevReviewPanelModal
        visible={devReviewVisible}
        onClose={() => setDevReviewVisible(false)}
      />

      <SecondaryPageModal
        visible={Boolean(secondaryPage)}
        pageType={secondaryPage}
        onClose={() => setSecondaryPage(null)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.xl,
    paddingBottom: 40,
  },
  headerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.lg,
  },
  avatarText: {
    ...typography.h2,
    color: colors.surface,
    fontWeight: '700',
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    ...typography.h3,
    color: colors.ink,
  },
  userEmail: {
    ...typography.caption,
    color: colors.inkMuted,
    marginTop: 2,
  },
  singleAccountPill: {
    backgroundColor: colors.surfaceSubtle,
    borderRadius: radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  singleAccountText: {
    ...typography.caption,
    fontSize: 11,
    color: colors.inkMuted,
  },
  guestNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceSubtle,
    padding: spacing.md,
    borderRadius: radius.input,
    marginBottom: spacing.xl,
  },
  guestNoteText: {
    ...typography.caption,
    color: colors.inkMuted,
    flex: 1,
    lineHeight: 16,
  },
  sectionContainer: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.captionMedium,
    color: colors.inkMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.xs,
    marginLeft: spacing.xs,
  },
  menuCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    minHeight: 48,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuIcon: {
    marginRight: spacing.md,
  },
  menuLabel: {
    ...typography.body,
    color: colors.ink,
    flex: 1,
    fontSize: 15,
  },
  countBadge: {
    backgroundColor: colors.surfaceSubtle,
    borderRadius: radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 8,
  },
  countText: {
    ...typography.caption,
    color: colors.ink,
    fontWeight: '600',
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: spacing.md,
  },
  versionText: {
    ...typography.caption,
    color: colors.inkSubtle,
    fontSize: 12,
  },
});

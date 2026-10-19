import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, typography, spacing, radius, shadows } from '@/theme/tokens';
import { CATEGORIES } from '@/config/categories';
import { getCampaigns } from '@/services/campaigns';
import { Campaign, Category } from '@/types';
import { ScreenState } from '@/components/feedback/ScreenState';
import { Input } from '@/components/ui/Input';
import { Chip } from '@/components/ui/Chip';
import { Badge, StatusChip } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { CampaignCard } from '@/components/campaign/CampaignCard';
import { CampaignCardSkeleton } from '@/components/campaign/CampaignCardSkeleton';

export default function ExploreScreen() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>();
  const [selectedSort, setSelectedSort] = useState<'trending' | 'newest' | 'most_funded'>('trending');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [filterSheetVisible, setFilterSheetVisible] = useState(false);

  const activeFilterCount =
    (selectedCategory ? 1 : 0) +
    (selectedSort !== 'trending' ? 1 : 0) +
    (selectedStatus !== 'all' ? 1 : 0);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCampaigns({
        query: searchQuery,
        category: selectedCategory,
        sortBy: selectedSort,
        status: selectedStatus as any,
      });
      setCampaigns(data);
    } catch (err: any) {
      setError(err?.message || 'Failed to search campaigns');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [searchQuery, selectedCategory, selectedSort, selectedStatus]);

  const handleSelectCategory = (cat: Category) => {
    if (selectedCategory === cat) {
      setSelectedCategory(undefined);
    } else {
      setSelectedCategory(cat);
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory(undefined);
    setSelectedSort('trending');
    setSelectedStatus('all');
  };

  return (
    <View style={styles.container}>
      {/* Search & Filter Bar */}
      <View style={styles.searchBarContainer}>
        <Input
          placeholder="Search campaigns, causes, or creators..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          containerStyle={styles.searchInputContainer}
          style={styles.searchInput}
        />
        <TouchableOpacity
          style={[
            styles.filterButton,
            activeFilterCount > 0 && { borderColor: colors.primary, backgroundColor: colors.primaryLight },
          ]}
          onPress={() => setFilterSheetVisible(true)}
          accessibilityRole="button"
          accessibilityLabel={`Open sort and filter options. ${activeFilterCount} active filters.`}
        >
          <Feather
            name="sliders"
            size={18}
            color={activeFilterCount > 0 ? colors.primary : colors.ink}
          />
          {activeFilterCount > 0 && (
            <View style={styles.badgeCount}>
              <Text style={styles.badgeCountText}>{activeFilterCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Categories Horizontal Carousel */}
      <View style={styles.categoriesWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScroll}
        >
          <Chip
            label="All Categories"
            selected={selectedCategory === undefined}
            onPress={() => setSelectedCategory(undefined)}
          />
          {CATEGORIES.map((cat) => (
            <Chip
              key={cat.id}
              label={cat.label}
              icon={cat.icon as any}
              selected={selectedCategory === cat.id}
              onPress={() => handleSelectCategory(cat.id)}
            />
          ))}
        </ScrollView>
      </View>

      {/* Results List */}
      <ScreenState
        isLoading={loading}
        error={error}
        isEmpty={campaigns.length === 0}
        emptyTitle="No campaigns found"
        emptyMessage={
          searchQuery || selectedCategory || selectedStatus !== 'all'
            ? 'Try clearing your search query or choosing different filters.'
            : 'No campaigns available at the moment.'
        }
        emptyActionLabel={
          searchQuery || selectedCategory || selectedStatus !== 'all' || selectedSort !== 'trending'
            ? 'Reset Filters'
            : undefined
        }
        onEmptyAction={handleResetFilters}
        onRetry={loadData}
        customSkeleton={
          <View style={styles.listContent}>
            <CampaignCardSkeleton />
            <CampaignCardSkeleton />
            <CampaignCardSkeleton />
          </View>
        }
      >
        <FlatList
          data={campaigns}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <CampaignCard campaign={item} />}
        />
      </ScreenState>

      {/* Sort & Filter Sheet */}
      <BottomSheet
        visible={filterSheetVisible}
        onClose={() => setFilterSheetVisible(false)}
        title="Sort & Filter"
      >
        <View style={styles.sheetBody}>
          <Text style={styles.sheetSectionTitle}>Sort By</Text>
          <View style={styles.sortChips}>
            <Chip
              label="Trending"
              selected={selectedSort === 'trending'}
              onPress={() => setSelectedSort('trending')}
            />
            <Chip
              label="Newest"
              selected={selectedSort === 'newest'}
              onPress={() => setSelectedSort('newest')}
            />
            <Chip
              label="Most Funded"
              selected={selectedSort === 'most_funded'}
              onPress={() => setSelectedSort('most_funded')}
            />
          </View>

          <Text style={[styles.sheetSectionTitle, { marginTop: spacing.lg }]}>Campaign Status</Text>
          <View style={styles.sortChips}>
            <Chip
              label="All"
              selected={selectedStatus === 'all'}
              onPress={() => setSelectedStatus('all')}
            />
            <Chip
              label="Active Funding"
              selected={selectedStatus === 'available_for_funding'}
              onPress={() => setSelectedStatus('available_for_funding')}
            />
            <Chip
              label="Goal Reached"
              selected={selectedStatus === 'goal_reached'}
              onPress={() => setSelectedStatus('goal_reached')}
            />
            <Chip
              label="Promoting"
              selected={selectedStatus === 'promoting'}
              onPress={() => setSelectedStatus('promoting')}
            />
            <Chip
              label="Completed"
              selected={selectedStatus === 'completed'}
              onPress={() => setSelectedStatus('completed')}
            />
          </View>

          <View style={styles.sheetButtonRow}>
            <Button
              title="Reset"
              variant="secondary"
              onPress={() => {
                setSelectedSort('trending');
                setSelectedStatus('all');
                setSelectedCategory(undefined);
              }}
              style={{ flex: 1, marginRight: spacing.sm }}
            />
            <Button
              title="Apply Filters"
              onPress={() => setFilterSheetVisible(false)}
              style={{ flex: 2 }}
            />
          </View>
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    backgroundColor: colors.surface,
    gap: spacing.sm,
  },
  searchInputContainer: {
    flex: 1,
    marginBottom: 0,
  },
  searchInput: {
    minHeight: 44,
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: radius.input,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  categoriesWrapper: {
    backgroundColor: colors.surface,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  categoriesScroll: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  listContent: {
    padding: spacing.lg,
    paddingBottom: 40,
  },
  sheetBody: {
    paddingBottom: spacing.lg,
  },
  sheetSectionTitle: {
    ...typography.bodySemibold,
    color: colors.ink,
    marginBottom: spacing.md,
  },
  sortChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  badgeCount: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: colors.primary,
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeCountText: {
    ...typography.caption,
    color: colors.surface,
    fontSize: 10,
    fontWeight: '700',
  },
  sheetButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xl,
  },
});

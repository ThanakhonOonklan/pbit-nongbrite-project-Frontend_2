import { create } from 'zustand';
import { rankService } from '@/services/rank.service';
import { RankUser } from '@/types';

interface RankState {
  // State
  rankings: RankUser[];
  topThree: RankUser[];
  topTen: RankUser[];
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchRanking: (signal?: AbortSignal) => Promise<void>;
}

// Helper to map API items to the RankUser interface used by components
const mapApiToRankUser = (item: any): RankUser => ({
  id: String(item.userId || Math.random()), // fallback for id if not provided
  userId: item.userId,
  rank: item.rank,
  name: item.name || 'Unknown User',
  avatar: item.avatar ? `/icons/icon-Profile/${item.avatar}` : undefined,
  gender: item.gender ?? undefined,
  score: item.totalScore || 0,
  totalScore: item.totalScore,
  totalStars: item.totalStars,
  tier: item.tier,
  tierLabel: item.tierLabel,
  tierIcon: item.tierIcon,
});

export const useRankStore = create<RankState>((set) => ({
  rankings: [],
  topThree: [],
  topTen: [],
  isLoading: false,
  error: null,

  fetchRanking: async (signal?: AbortSignal) => {
    set({ isLoading: true, error: null });
    try {
      const response = await rankService.getRanking();

      if (signal?.aborted) return;

      if (response.success && Array.isArray(response.data)) {
        // Map the raw data to the internal RankUser format
        const mappedRankings = response.data.map(mapApiToRankUser);

        // Ensure sorted by rank, though API usually sorts it
        mappedRankings.sort((a, b) => a.rank - b.rank);

        set({
          rankings: mappedRankings,
          topThree: mappedRankings.slice(0, 3),
          topTen: mappedRankings.slice(0, 10), // Rank 1 to 10
          isLoading: false,
        });
      } else {
        set({
          error: "Failed to load rankings or invalid data format",
          isLoading: false,
        });
      }
    } catch (error: any) {
      if (signal?.aborted) return;

      set({
        error: error.message || "An error occurred while fetching rankings",
        isLoading: false,
      });
    }
  },
}));

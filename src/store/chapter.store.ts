import { create } from "zustand";
import { persist } from "zustand/middleware";
import { 
  chapterService,
  type Chapter,
} from "@/services/chapter.service";

interface ChapterState {
  chapters: Chapter[];
  isLoading: boolean;
  error: string | null;
  lastFetched: number | null; // timestamp for cache invalidation
  
  // Actions
  fetchChapters: () => Promise<void>;
  clearError: () => void;
  setChapters: (chapters: Chapter[]) => void;
}

export const useChapterStore = create<ChapterState>()(
  persist(
    (set) => ({
      chapters: [],
      isLoading: false,
      error: null,
      lastFetched: null,

      fetchChapters: async () => {
        console.log("fetchChapters called!");
        set({ isLoading: true, error: null });
        try {
          console.log("Calling chapterService.getChapters()...");
          const response = await chapterService.getChapters();
          console.log("Response data:", response.data);
          console.log("First chapter:", response.data.chapters[0]);
          console.log("First level:", response.data.chapters[0]?.levels[0]);
          console.log("First level earnedStars:", response.data.chapters[0]?.levels[0]?.earnedStars);
          console.log("First level isUnlocked:", response.data.chapters[0]?.levels[0]?.isUnlocked);
          
          // Log original chapters with their IDs before sorting
          console.log("Original chapters IDs:", response.data.chapters.map(ch => ({ id: ch.id, orderIndex: ch.orderIndex })));
          console.log("Original levels IDs (first chapter):", response.data.chapters[0]?.levels.map(l => ({ id: l.id, number: l.number })));
          
          // FIX: Copy array before sorting to avoid mutating original
          const sortedChapters = [...response.data.chapters].sort(
            (a, b) => a.orderIndex - b.orderIndex
          );
          
          // Debug: Log sorted chapters to verify data structure and IDs
          console.log("Sorted chapters IDs:", sortedChapters.map(ch => ({ id: ch.id, orderIndex: ch.orderIndex })));
          console.log("Sorted chapters:", sortedChapters);
          console.log("First sorted chapter:", sortedChapters[0]);
          console.log("First sorted chapter first level:", sortedChapters[0]?.levels[0]);
          console.log("First sorted chapter levels IDs:", sortedChapters[0]?.levels.map(l => ({ id: l.id, number: l.number })));
          
          set({
            chapters: sortedChapters,
            isLoading: false,
            error: null,
            lastFetched: Date.now(),
          });
          
          // Log after setting to verify
          console.log("Chapters set in store. First chapter ID:", sortedChapters[0]?.id);
        } catch (error: unknown) {
          let errorMessage = "ไม่สามารถโหลดข้อมูลบทเรียนได้";
          
          if (error && typeof error === "object" && "response" in error) {
            const axiosError = error as { 
              response?: { 
                data?: { 
                  message?: string;
                  error?: string;
                } | string;
                status?: number;
              } 
            };
            
            const responseData = axiosError.response?.data;
            const status = axiosError.response?.status;

            if (responseData) {
              if (typeof responseData === 'string') {
                errorMessage = responseData;
              } else if (typeof responseData === 'object') {
                if (responseData.message && responseData.message.trim()) {
                  errorMessage = responseData.message;
                } else if (responseData.error && responseData.error.trim()) {
                  errorMessage = responseData.error;
                }
              }
            }
            
            if (errorMessage === "ไม่สามารถโหลดข้อมูลบทเรียนได้" && status) {
              if (status === 401) {
                // Clear loading state
                // The interceptor will handle redirect, but we need to throw the error
                // so the interceptor can process it properly
                set({
                  isLoading: false,
                  error: null, // Don't show error, let interceptor handle it
                });
                // IMPORTANT: Still throw the error so the interceptor can handle redirect
                throw error;
              } else if (status === 404) {
                errorMessage = "ไม่พบข้อมูลบทเรียน";
              } else if (status === 500) {
                errorMessage = "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์";
              }
            }
          } else if (error instanceof Error) {
            errorMessage = error.message;
          }
          
          console.error("Fetch chapters error:", error);
          
          set({
            isLoading: false,
            error: errorMessage,
          });
          throw error;
        }
      },

      clearError: () => {
        set({ error: null });
      },

      setChapters: (chapters: Chapter[]) => {
        set({ chapters });
      },
    }),
    {
      name: "chapter-storage",
      // FIX: Don't persist chapters - always fetch fresh data for realtime
      partialize: (state) => ({
        // Don't persist chapters or lastFetched - always fetch fresh data
        // This ensures data is always up-to-date with the API
      }),
    }
  )
);


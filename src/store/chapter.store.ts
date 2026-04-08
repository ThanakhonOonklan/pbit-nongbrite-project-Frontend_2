import { create } from "zustand";

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
    (set, get) => ({
      chapters: [],
      isLoading: false,
      error: null,
      lastFetched: null,

      fetchChapters: async () => {
        if (get().isLoading) return;
        set({ isLoading: true, error: null });
        try {
          const response = await chapterService.getChapters();

          // Sort chapters by chapterNo
          const sortedChapters = [...response.data.chapters].sort(
            (a, b) => a.chapterNo - b.chapterNo
          );

          set({
            chapters: sortedChapters,
            isLoading: false,
            error: null,
            lastFetched: Date.now(),
          });
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
    })
);


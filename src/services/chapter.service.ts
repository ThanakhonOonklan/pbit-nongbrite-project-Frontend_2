import apiClient from "@/lib/api-client";

export interface ChapterTitle {
  en: string;
  th: string;
}

export interface ChapterDesc {
  en: string;
  th: string;
}

export interface LevelTitle {
  en: string;
  th: string;
}

export interface Level {
  id: number;
  chapterNo: number;
  levelNo: number;
  title: LevelTitle;
  maxStars: number;
  difficulty: number;
  earnedStars: number;
  isUnlocked: boolean;
}

export interface ChapterImages {
  banner1: string;
  banner2: string;
  banner3: string;
}

export interface Chapter {
  chapterNo: number;
  title: ChapterTitle;
  desc: ChapterDesc;
  images: ChapterImages;
  levels: Level[];
}

export interface ChaptersResponse {
  success: boolean;
  data: {
    chapters: Chapter[];
  };
}

export const chapterService = {
  getChapters: async (): Promise<ChaptersResponse> => {
    const response = await apiClient.get<ChaptersResponse>('/chapters');
    return response.data;
  },
};



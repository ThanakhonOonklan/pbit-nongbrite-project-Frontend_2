import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsState {
  soundOn: boolean;
  setSoundOn: (soundOn: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      soundOn: true,
      setSoundOn: (soundOn) => set({ soundOn }),
    }),
    {
      name: "settings-storage", // localStorage key
    }
  )
);

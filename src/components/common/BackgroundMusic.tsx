"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useSettingsStore } from "@/store";

// Global tracking of active media elements to sync mute state in real-time
const activeElements = new Set<HTMLMediaElement>();

if (typeof window !== "undefined" && window.HTMLMediaElement) {
  const originalPlay = window.HTMLMediaElement.prototype.play;
  window.HTMLMediaElement.prototype.play = function (...args) {
    const { soundOn } = useSettingsStore.getState();
    
    // Add to active elements set
    activeElements.add(this);
    
    // Set initial mute state based on setting
    this.muted = !soundOn;

    // Clean up from the set when playback ends or is paused
    if (!(this as any)._hasSoundMuteListeners) {
      (this as any)._hasSoundMuteListeners = true;
      const cleanup = () => {
        activeElements.delete(this);
      };
      this.addEventListener("ended", cleanup);
      this.addEventListener("pause", cleanup);
    }

    const playPromise = originalPlay.apply(this, args);
    if (playPromise !== undefined) {
      return playPromise.catch((error) => {
        console.warn("Audio playback was blocked or interrupted:", error.message);
      });
    }
    return playPromise;
  };
}

export default function BackgroundMusic() {
  const pathname = usePathname();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const soundOn = useSettingsStore((state) => state.soundOn);

  // Real-time synchronization of all active elements when soundOn changes
  useEffect(() => {
    for (const element of activeElements) {
      element.muted = !soundOn;
    }

    const audio = audioRef.current;
    if (audio) {
      audio.muted = !soundOn;
      // If unmuted, make sure the BGM is playing
      if (soundOn) {
        audio.play().catch(() => {});
      }
    }
  }, [soundOn]);

  useEffect(() => {
    // Create background audio instance pointing to the BGM file
    const audio = new Audio("/audio/sfx/เสียงในเกม.mp3");
    audio.loop = true;
    audio.volume = 0.12; // Start with relaxed volume for courses/home pages
    audio.muted = !useSettingsStore.getState().soundOn;
    audioRef.current = audio;

    // Attain audio play bypassing autoplay browser restrictions
    const startAudio = () => {
      audio.play().then(() => {
        // Clean up listeners once audio successfully starts playing
        window.removeEventListener("click", startAudio);
        window.removeEventListener("touchstart", startAudio);
        window.removeEventListener("pointerdown", startAudio);
      }).catch(() => {
        // Quietly fail if browser block is still active
      });
    };

    // Listen for the first user interaction to trigger BGM safely
    window.addEventListener("click", startAudio);
    window.addEventListener("touchstart", startAudio);
    window.addEventListener("pointerdown", startAudio);

    // Proactively try playing immediately in case browser permissions allow it
    startAudio();

    return () => {
      audio.pause();
      window.removeEventListener("click", startAudio);
      window.removeEventListener("touchstart", startAudio);
      window.removeEventListener("pointerdown", startAudio);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Check if user is currently inside a game session
    // Path patterns usually starts with '/games/'
    const isInGame = pathname?.includes("/games/");

    if (isInGame) {
      // Much quieter background music volume in-game to avoid distracting players
      audio.volume = 0.04;
    } else {
      // Ambient pleasant volume on regular pages like /courses or home
      audio.volume = 0.12;
    }
  }, [pathname]);

  return null;
}

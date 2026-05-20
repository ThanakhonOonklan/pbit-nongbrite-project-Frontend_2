"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function BackgroundMusic() {
  const pathname = usePathname();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create background audio instance pointing to the BGM file
    const audio = new Audio("/audio/sfx/เสียงในเกม.mp3");
    audio.loop = true;
    audio.volume = 0.12; // Start with relaxed volume for courses/home pages
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

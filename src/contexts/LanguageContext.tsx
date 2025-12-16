"use client";

import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from "react";
import locales from "@/locales/locales.json";

type Language = "TH" | "EN";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "app-language";

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Always start with "TH" for both server and client (for hydration consistency)
  const [language, setLanguageState] = useState<Language>("TH");
  const isMountedRef = useRef(false);

  // Load from localStorage after component mounts (client-side only)
  // This is a legitimate use of setState in useEffect for synchronizing with external system (localStorage)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    isMountedRef.current = true;
    const storedLanguage = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (storedLanguage === "TH" || storedLanguage === "EN") {
      setLanguageState(storedLanguage);
    }
    // This effect intentionally runs once on mount to sync with localStorage
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (isMountedRef.current) {
      localStorage.setItem(STORAGE_KEY, lang);
    }
  };

  // Translation function: accepts path like "navbar.navItems.home"
  // Structure: locales.navbar.EN.navItems.home or locales.navbar.TH.navItems.home
  // The path should navigate to the section (navbar), then we select the language (EN/TH), then continue the path
  const t = (path: string): string => {
    const keys = path.split(".");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value: any = locales;

    // First, navigate to the section (e.g., "navbar")
    // Then we need to select the language and continue with the rest of the path
    if (keys.length === 0) {
      return path;
    }

    // Get the section (first key)
    const section = keys[0];
    if (!value[section]) {
      return path;
    }

    // Get the language-specific object
    const languageObject = value[section][language];
    if (!languageObject) {
      return path;
    }

    // Continue navigating through the rest of the path (skip the first key which is the section)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let currentValue: any = languageObject;
    for (let i = 1; i < keys.length; i++) {
      const key = keys[i];
      if (currentValue && typeof currentValue === "object" && key in currentValue) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        currentValue = currentValue[key];
      } else {
        return path;
      }
    }

    // Return the final value
    if (typeof currentValue === "string") {
      return currentValue;
    }

    return path; // Fallback to path if translation not found
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

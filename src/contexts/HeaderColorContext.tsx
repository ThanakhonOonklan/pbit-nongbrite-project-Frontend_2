"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface HeaderColorContextType {
  headerColor: string | undefined;
  setHeaderColor: (color: string | undefined) => void;
}

const HeaderColorContext = createContext<HeaderColorContextType | undefined>(undefined);

export function HeaderColorProvider({ children }: { children: ReactNode }) {
  const [headerColor, setHeaderColor] = useState<string | undefined>(undefined);

  return (
    <HeaderColorContext.Provider value={{ headerColor, setHeaderColor }}>
      {children}
    </HeaderColorContext.Provider>
  );
}

export function useHeaderColor() {
  const context = useContext(HeaderColorContext);
  if (context === undefined) {
    throw new Error("useHeaderColor must be used within a HeaderColorProvider");
  }
  return context;
}


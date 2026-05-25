declare global {
  interface Window {
    __pbitAllowedGameNavigation?: {
      path: string;
      skipUnlockCheck?: boolean;
    };
  }
}

export const createGamePath = (gameId: string, level: number) =>
  `/games/${gameId}/${level}`;

export const markGameNavigation = (
  path: string,
  options: { skipUnlockCheck?: boolean } = {}
) => {
  if (typeof window === "undefined") return;

  window.__pbitAllowedGameNavigation = {
    path,
    skipUnlockCheck: options.skipUnlockCheck,
  };
};

export const hasGameNavigation = (path: string) => {
  if (typeof window === "undefined") return false;

  return window.__pbitAllowedGameNavigation?.path === path;
};

export const getGameNavigation = (path: string) => {
  if (typeof window === "undefined") {
    return {
      hasIntent: false,
      skipUnlockCheck: false,
    };
  }

  const navigation = window.__pbitAllowedGameNavigation;
  const hasIntent = navigation?.path === path;

  return {
    hasIntent,
    skipUnlockCheck: hasIntent && navigation.skipUnlockCheck === true,
  };
};

export const shouldSkipUnlockCheck = (path: string) => {
  if (typeof window === "undefined") return false;

  const navigation = window.__pbitAllowedGameNavigation;
  return navigation?.path === path && navigation.skipUnlockCheck === true;
};

export const clearGameNavigation = () => {
  if (typeof window === "undefined") return;

  window.__pbitAllowedGameNavigation = undefined;
};

export {};

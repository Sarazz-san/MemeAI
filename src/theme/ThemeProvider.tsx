import React, {createContext, useContext, useMemo, useState} from 'react';
import {
  darkColors,
  lightColors,
  type AppColors,
  type ThemeMode,
} from './theme';

type ThemeContextValue = {
  mode: ThemeMode;
  colors: AppColors;
  isDark: boolean;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({children}: {children: React.ReactNode}) {
  const [mode, setMode] = useState<ThemeMode>('dark');

  const value = useMemo(() => {
    const activeColors = mode === 'dark' ? darkColors : lightColors;

    return {
      mode,
      colors: activeColors,
      isDark: mode === 'dark',
      setMode,
      toggleMode: () => setMode(current => (current === 'dark' ? 'light' : 'dark')),
    };
  }, [mode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAppTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useAppTheme must be used inside ThemeProvider');
  }

  return context;
}

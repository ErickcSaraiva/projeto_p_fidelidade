import React, { createContext, useContext, useState, useEffect } from 'react';

// Aqui definimos a estrutura do teu Live-Ops
type Theme = {
  theme: string;
  particles: string;
};

const ThemeContext = createContext({
  theme: 'default',
  setTheme: (t: Theme) => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeConfig, setThemeConfig] = useState<Theme>({ theme: 'default', particles: 'none' });

  // No futuro, chamaremos a tua API aqui:
  // useEffect(() => { fetch('/settings/current-theme').then(...) }, [])

  return (
    <ThemeContext.Provider value={{ theme: themeConfig.theme, setTheme: setThemeConfig }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
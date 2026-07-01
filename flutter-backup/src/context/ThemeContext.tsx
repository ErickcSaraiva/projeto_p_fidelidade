import React, { createContext, useState, useEffect } from 'react';
import { defaultTheme } from '../themes/defaultTheme';
import { AppTheme } from '../themes/types';

// Define o formato do contexto
interface ThemeContextData {
  theme: AppTheme;
  setThemeName: (name: string) => void;
}

export const ThemeContext = createContext({} as ThemeContextData);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<AppTheme>(defaultTheme);

  // Aqui é onde ligaremos ao backend futuramente.
  // Por enquanto, esta função apenas altera o tema localmente.
  const setThemeName = (name: string) => {
    // Exemplo: se (name === 'christmas') setTheme(christmasTheme);
    console.log(`Alterando tema para: ${name}`);
  };

  return (
    <ThemeContext.Provider value={{ theme, setThemeName }}>
      {children}
    </ThemeContext.Provider>
  );
};
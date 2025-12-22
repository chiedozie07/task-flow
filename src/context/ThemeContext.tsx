import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// define the shape of the theme context
type ThemeContextType = {
  dark: boolean;
  toggle: () => void;
};

// key for storing theme preference
const KEY = 'APP_THEME';

// create the context with default values
const ThemeContext = createContext<ThemeContextType>({
  dark: false,
  toggle: () => {},
});

// ThemeProvider component to wrap the app and provide theme context
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(KEY);
        if (stored) setDark(JSON.parse(stored));
      } catch (e) {
        console.log('Failed to load theme preference:', e);
      }
    })();
  }, []);

  // persist theme changes 
  useEffect(() => {
    AsyncStorage.setItem(KEY, JSON.stringify(dark));
  }, [dark]);

  const toggle = () => setDark((v) => !v);
  
  // provide the context value to children
  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

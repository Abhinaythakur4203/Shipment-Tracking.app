import React, { createContext, useContext, useState, useMemo } from 'react';

const StateContext = createContext();

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(null); // Default to null
  const [currentColor, setCurrentColor] = useState('#03C9D7');
  const [currentMode, setCurrentMode] = useState('Light');
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState({ ...initialState }); // Ensure immutability

  const setMode = (e) => {
    if (e?.target?.value) {
      setCurrentMode(e.target.value);
      localStorage.setItem('themeMode', e.target.value);
    }
  };

  const setColor = (color) => {
    if (color) {
      setCurrentColor(color);
      localStorage.setItem('colorMode', color);
    }
  };

  const handleClick = (clicked) => {
    setIsClicked({ ...initialState, [clicked]: true });
  };

  const contextValue = useMemo(
    () => ({
      currentColor,
      currentMode,
      activeMenu,
      screenSize,
      setScreenSize,
      handleClick,
      isClicked,
      initialState,
      setIsClicked,
      setActiveMenu,
      setCurrentColor,
      setCurrentMode,
      setMode,
      setColor,
      themeSettings,
      setThemeSettings,
    }),
    [
      currentColor,
      currentMode,
      activeMenu,
      screenSize,
      isClicked,
      themeSettings,
    ]
  );

  return (
    <StateContext.Provider value={contextValue}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
import React, { createContext, useContext, useState } from 'react';

type ModeContextType = {
  mode: boolean;
  setMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export const ModeProvider: React.FC<{ children: React.ReactNode; }> = ({
  children,
}) => {
  const [mode, setMode] = useState(true);

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = () => {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
};

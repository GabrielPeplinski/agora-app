import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

interface RefreshContextProps {
  needsRefresh: boolean;
  setNeedRefresh: () => void;
  resetNeedRefresh: () => void;
}

const RefreshContext = createContext<RefreshContextProps | null>(null);

export function RefreshContextProvider({ children }: PropsWithChildren) {
  const [needsRefresh, setNeedsRefresh] = useState(false);

  const setNeedRefresh = () => {
    setNeedsRefresh(true);
  };

  const resetNeedRefresh = () => {
    setNeedsRefresh(false);
  };

  return (
    <RefreshContext.Provider value={{ needsRefresh, setNeedRefresh, resetNeedRefresh }}>
      {children}
    </RefreshContext.Provider>
  );
}

export function useRefreshContext() {
  const context = useContext(RefreshContext);

  if (!context) {
    throw new Error('useRefreshContext must be used within a RefreshContextProvider');
  }

  return context;
}
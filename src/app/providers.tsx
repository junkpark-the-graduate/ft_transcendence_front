"use client";

// app/providers.tsx
import React, { ReactNode } from "react";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";

// AppContext code
type AppContextType = {
  isFollowing: boolean;
  setIsFollowing: (value: boolean) => void;
  isBlocking: boolean;
  setIsBlocking: (value: boolean) => void;
};

const AppContext = React.createContext<AppContextType>({
  isFollowing: false,
  setIsFollowing: () => {},
  isBlocking: false,
  setIsBlocking: () => {},
});

export const useAppContext = () => React.useContext(AppContext);

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isFollowing, setIsFollowing] = React.useState(false);
  const [isBlocking, setIsBlocking] = React.useState(false);

  return (
    <AppContext.Provider
      value={{ isFollowing, setIsFollowing, isBlocking, setIsBlocking }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Providers component including the AppContextProvider
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider>
        {/* Include the AppContextProvider here */}
        <AppContextProvider>{children}</AppContextProvider>
      </ChakraProvider>
    </CacheProvider>
  );
}

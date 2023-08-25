"use client";

import React from "react";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { RelationContextProvider } from "@/context/RelationContext";
import { UserDataContextProvider } from "@/context/UserDataContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider>
        <UserDataContextProvider>
          <RelationContextProvider>{children}</RelationContextProvider>
        </UserDataContextProvider>
      </ChakraProvider>
    </CacheProvider>
  );
}

// app/providers.tsx
"use client";
import React from "react";
import { CacheProvider } from "@chakra-ui/next-js";
import {
  ChakraProvider,
  type ThemeConfig,
  extendTheme,
} from "@chakra-ui/react";

const theme: ThemeConfig = extendTheme({
  initialColorMode: "dark",
  useSystemColorMode: false,
  styles: {
    global: () => ({
      body: {
        bg: "",
        color: "",
      },
    }),
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </CacheProvider>
  );
}

export default Providers;

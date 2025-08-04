"use client";

import { WagmiConfig } from "wagmi";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { wagmiConfig } from "@/lib/wagmi";
import '@rainbow-me/rainbowkit/styles.css';
import RainbowKitWithTheme from "./RainbowKitWithTheme";

export function Providers({ children }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitWithTheme>{children}</RainbowKitWithTheme>
      </WagmiConfig>
    </NextThemesProvider>
  );
}

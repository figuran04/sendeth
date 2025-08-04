"use client";

import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import { useMemo } from "react";
import { useTheme } from "next-themes";
import { chains } from "@/lib/wagmi";

export default function RainbowKitWithTheme({ children }) {
  const { resolvedTheme } = useTheme();

  const rainbowTheme = useMemo(() => {
    return resolvedTheme === "dark" ? darkTheme() : lightTheme();
  }, [resolvedTheme]);

  return (
    <RainbowKitProvider chains={chains} theme={rainbowTheme}>
      {children}
    </RainbowKitProvider>
  );
}

"use client";

import "@rainbow-me/rainbowkit/styles.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";

import { config } from "@/lib/wagmi";
import RouteGuard from "@/components/RouteGuard";
import { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          coolMode
          theme={darkTheme({
            accentColor: "#7c3aed",
            accentColorForeground: "white",
            borderRadius: "large",
            fontStack: "system",
            overlayBlur: "small",
          })}
        >
          <RouteGuard>{children}</RouteGuard>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

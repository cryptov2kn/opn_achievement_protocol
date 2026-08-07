"use client";

import { useAccount } from "wagmi";

export function useWallet() {
  const { address, isConnected, status } = useAccount();

  const loadingWallet = status === "connecting" || status === "reconnecting";

  return {
    address,
    isConnected,
    status,
    loadingWallet,
  };
}

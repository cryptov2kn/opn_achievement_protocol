"use client";

import { useWallet } from "@/hooks/useWallet";

export default function WalletInfo() {
  const { address, isConnected } = useWallet();

  if (!isConnected) {
    return <div>Not connected</div>;
  }

  return (
    <div>
      Connected:
      <br />
      {address}
    </div>
  );
}

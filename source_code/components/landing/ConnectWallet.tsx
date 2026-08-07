"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function ConnectWallet() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openConnectModal,
        openAccountModal,
        openChainModal,
        mounted,
        authenticationStatus,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";

        const connected =
          ready &&
          !!account &&
          !!chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        // Chưa mount xong
        if (!ready) {
          return (
            <div className="h-11 w-[150px] animate-pulse rounded-2xl bg-zinc-900/60 md:h-12 md:w-[170px]" />
          );
        }

        // Chưa kết nối
        if (!connected) {
          return (
            <button
              onClick={openConnectModal}
              className="h-11 rounded-xl border border-violet-400/50 bg-violet-600 px-4 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition-all duration-300 hover:scale-105 hover:bg-violet-500 hover:shadow-violet-500/50 md:h-12 md:rounded-2xl md:px-6 md:text-base"
            >
              Connect Wallet
            </button>
          );
        }

        // Sai mạng
        if (chain?.unsupported) {
          return (
            <button
              onClick={openChainModal}
              className="h-11 rounded-xl bg-red-500 px-4 text-sm font-semibold text-white shadow-lg shadow-red-500/30 transition-all duration-300 hover:scale-105 hover:bg-red-400 md:h-12 md:rounded-2xl md:px-6 md:text-base"
            >
              Wrong Network
            </button>
          );
        }

        // Đã kết nối ví
        return (
          <button
            onClick={openAccountModal}
            className="h-11 max-w-[180px] truncate rounded-2xl border border-violet-500/40 bg-black/40 px-4 font-medium text-white shadow-lg shadow-violet-500/20 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-400 hover:bg-violet-500/10 hover:shadow-violet-500/40 md:h-12 md:px-5 lg:max-w-[220px]"
          >
            {account.displayName}
          </button>
        );
      }}
    </ConnectButton.Custom>
  );
}

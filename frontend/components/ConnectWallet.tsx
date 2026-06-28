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
      }) => {
        // Chưa kết nối ví
        if (!account) {
          return (
            <button
              onClick={openConnectModal}
              className="
                h-12
                px-6
                rounded-2xl
                border border-violet-400/50
                bg-violet-600
                hover:bg-violet-500
                hover:scale-105
                text-white
                font-semibold
                shadow-lg shadow-violet-500/30
                hover:shadow-violet-500/50
                transition-all duration-300
              "
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
              className="
                h-12
                px-6
                rounded-2xl
                bg-red-500
                hover:bg-red-400
                hover:scale-105
                text-white
                font-semibold
                shadow-lg shadow-red-500/30
                transition-all duration-300
              "
            >
              Wrong Network
            </button>
          );
        }

        // Đã kết nối ví
        return (
          <button
            onClick={openAccountModal}
            className="
              h-12
              px-5
              rounded-2xl
              border border-violet-500/40
              bg-black/40
              backdrop-blur-md
              text-white
              font-medium
              shadow-lg shadow-violet-500/20
              hover:shadow-violet-500/40
              hover:border-violet-400
              hover:bg-violet-500/10
              hover:scale-105
              transition-all duration-300
            "
          >
            {account.displayName}
          </button>
        );
      }}
    </ConnectButton.Custom>
  );
}

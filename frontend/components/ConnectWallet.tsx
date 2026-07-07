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
            <div
              className="
       h-11
       md:h-12

       w-[150px]
       md:w-[170px]
       rounded-2xl
       bg-zinc-900/60
       animate-pulse
      "
            />
          );
        }

        // Chưa kết nối
        if (!connected) {
          return (
            <button
              onClick={openConnectModal}
              className="
                h-11
                md:h-12

                px-4
                md:px-6

                rounded-xl
                md:rounded-2xl

                text-sm
                md:text-base
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
                h-11
                md:h-12

                px-4
                md:px-6

                rounded-xl
                md:rounded-2xl

                text-sm
                md:text-base
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
              h-11
              md:h-12

              px-4
              md:px-5

              max-w-[180px]
              lg:max-w-[220px]
              truncate
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
              hover:-translate-y-0.5
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

"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Wallet, ChevronDown } from "lucide-react";

const CustomConnectButton = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openChainModal,
        openConnectModal,
        openAccountModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
            className="flex flex-wrap items-center justify-center gap-3 w-full"
          >
            {!connected ? (
              <button
                onClick={openConnectModal}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-white transition rounded-lg bg-indigo-600 hover:bg-indigo-700"
              >
                <Wallet size={18} />
                <span className="truncate">Connect Wallet</span>
              </button>
            ) : (
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <button
                  onClick={openChainModal}
                  className="flex items-center gap-2 justify-center px-3 py-2 text-sm font-medium bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-white hover:ring-2 ring-indigo-400 w-full sm:w-auto"
                >
                  {chain.hasIcon && (
                    <img
                      alt={chain.name ?? "Chain icon"}
                      src={chain.iconUrl}
                      className="w-4 h-4 rounded-full"
                    />
                  )}
                  <span>{chain.name}</span>
                  <ChevronDown size={16} />
                </button>

                <button
                  onClick={openAccountModal}
                  className="flex items-center gap-2 justify-center px-3 py-2 text-sm font-medium bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-white hover:ring-2 ring-indigo-400 w-full sm:w-auto"
                >
                  <span>{account.displayName}</span>
                  <ChevronDown size={16} />
                </button>
              </div>
            )}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default CustomConnectButton;

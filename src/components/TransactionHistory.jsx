"use client";

import { ArrowDownLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { getTxExplorerUrl } from "@/lib/getEtherscanApiUrl";

const TransactionHistory = ({ transactions, wallet, onTxClick }) => {
  if (transactions.length === 0) return null;

  return (
    <div className="w-full max-w-3xl mx-auto mt-8">
      <h2 className="mb-4 text-xl font-bold text-center">📜 Transaction History</h2>
      <ul className="space-y-4">
        {transactions.slice(0, 5).map((tx) => {
          const isSent = tx.from.toLowerCase() === wallet.address.toLowerCase();
          const icon = isSent ? <ArrowUpRight className="w-4 h-4 text-red-500" /> : <ArrowDownLeft className="w-4 h-4 text-green-500" />;
          const label = isSent ? "Send to" : "Received from";
          const txValue = Number(tx.value) / 1e18;

          return (
            <li
              key={tx.hash}
              onClick={() => onTxClick(tx)}
              className={`p-4 bg-white/5 dark:bg-white/5 backdrop-blur-md border rounded-2xl shadow-xl transition cursor-pointer relative overflow-hidden group ${isSent ? "border-red-500/30 dark:border-red-400/20" : "border-green-500/30 dark:border-green-400/20"
                }`}
            >
              {/* Glow effect */}
              <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-600 to-blue-500 opacity-10 blur-2xl group-hover:opacity-20 transition pointer-events-none"></span>

              <div className="relative flex flex-col md:flex-row md:justify-between md:items-center gap-2 z-10">
                <div className="flex items-center gap-2">
                  {icon}
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-white">{label}</p>
                    <p className="font-mono text-sm truncate">{isSent ? tx.to : tx.from}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <p className="font-semibold text-lg text-black dark:text-white">{txValue} {wallet.tokenSymbol}</p>
                  <a
                    href={getTxExplorerUrl(wallet.chain?.id, tx.hash)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-indigo-400 text-sm hover:underline hover:text-indigo-300 transition"
                  >
                    <ExternalLink className="w-4 h-4" /> View on Explorer
                  </a>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TransactionHistory;

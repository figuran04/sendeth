"use client";

import { getTxExplorerUrl } from "@/lib/getEtherscanApiUrl";
import { getTokenSymbol } from "@/lib/getTokenSymbol";
import { X, Wallet, ArrowRightLeft, Building, Copy, FuelIcon } from "lucide-react";
import { formatUnits } from "viem";
import { useClipboard } from "@/hooks/useClipboard";

const TransactionDetailModal = ({ isOpen, onClose, transaction, chain }) => {
  const { copyToClipboard } = useClipboard();

  if (!isOpen || !transaction) return null;

  const gasUsed = transaction?.gasUsed ? BigInt(transaction.gasUsed) : 0n;
  const gasPrice = transaction?.gasPrice ? BigInt(transaction.gasPrice) : 0n;
  const totalGasCost = gasUsed * gasPrice;
  const txValue = transaction?.value ? Number(transaction.value) / 1e18 : 0;
  const gasCostInETH = formatUnits(totalGasCost, 18);
  const tokenSymbol = getTokenSymbol(chain?.id) || "Token";

  const AddressRow = ({ icon: Icon, label, value }) => (
    <div className="flex items-center gap-2">
      <Icon className="w-4 h-4 text-blue-500" />
      <span className="font-medium">{label}:</span>
      <span className="truncate">{value}</span>
      <button
        onClick={() => copyToClipboard(value)}
        className="ml-auto text-gray-400 hover:text-gray-700 dark:hover:text-white"
      >
        <Copy className="w-4 h-4" />
      </button>
    </div>
  );

  const FieldWithIcon = ({ icon: Icon, iconColor, label, value }) => (
    <div className="flex items-center gap-2">
      <Icon className={`w-4 h-4 ${iconColor}`} />
      <span className="font-medium">{label}:</span>
      {value}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50 dark:bg-black/50 backdrop-blur-sm px-4">
      <div className="bg-white/10 dark:bg-black/80 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-2xl p-6 w-full max-w-lg shadow-2xl relative overflow-hidden">
        <span className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-700 to-blue-500 opacity-10 blur-2xl rounded-2xl pointer-events-none"></span>
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <ArrowRightLeft className="w-5 h-5 text-indigo-500" />
          Transaction Details
        </h2>

        <div className="space-y-3 text-sm text-gray-700 dark:text-gray-200">
          <FieldWithIcon
            icon={Building}
            iconColor="text-blue-500"
            label="Network"
            value={chain?.name || "Unknown"}
          />
          <AddressRow icon={Wallet} label="From" value={transaction.from} />
          <AddressRow icon={Wallet} label="To" value={transaction.to} />
          <FieldWithIcon
            icon={ArrowRightLeft}
            iconColor="text-purple-500"
            label="Value"
            value={`${parseFloat(txValue)} ${tokenSymbol}`}
          />
          <FieldWithIcon
            icon={FuelIcon}
            iconColor="text-orange-500"
            label="Gas Used"
            value={`${gasUsed.toString()} units`}
          />
          <FieldWithIcon
            icon={FuelIcon}
            iconColor="text-yellow-500"
            label="Gas Fee"
            value={`${Number(gasCostInETH).toFixed(6)} ${tokenSymbol}`}
          />

          <div className="text-xs mt-4">
            <a
              href={getTxExplorerUrl(chain?.id, transaction.hash)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 hover:underline transition"
            >
              View on Explorer
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h6m0 0v6m0-6L10 16"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailModal;

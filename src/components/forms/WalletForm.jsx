"use client";

import { Copy } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { getTokenSymbol } from "@/lib/getTokenSymbol";

const WalletForm = ({
  wallet,
  formData,
  setFormData,
  sendTransaction,
  txStatus,
}) => {
  const { address, chain, balance } = wallet;
  const { toAddress, amount } = formData;
  const { isLoading, isError, isSuccess, error } = txStatus;

  const parsedAmount = parseFloat(amount);
  const isValidEthAddress = /^0x[a-fA-F0-9]{40}$/.test(toAddress);
  const isValidAmount = !isNaN(parsedAmount) && parsedAmount > 0;
  const isAmountWithinBalance = balance ? parsedAmount <= parseFloat(balance.formatted) : false;
  const isFormValid = isValidEthAddress && isValidAmount && isAmountWithinBalance;
  const tokenSymbol = getTokenSymbol(chain?.id);

  useEffect(() => {
    if (isSuccess) toast.success("Transaction sent!");
    if (isError) toast.error(error?.message || "Transaction failed.");
  }, [isSuccess, isError, error]);

  const handleCopy = () => {
    if (!address || !navigator?.clipboard) return;
    navigator.clipboard
      .writeText(address)
      .then(() => toast.success("Address copied to clipboard!"))
      .catch(() => toast.error("Failed to copy address."));
  };

  return (
    <div className="w-full p-4 text-sm space-y-4 bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 min-w-0">
        <div>
          <p className="text-xs text-gray-400">Wallet</p>
          <div className="flex flex-wrap items-center gap-2 font-mono break-all">
            <span className="cursor-pointer hover:underline" onClick={handleCopy}>
              {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "—"}
            </span>
            {address && (
              <Copy
                size={16}
                className="cursor-pointer hover:text-primary"
                onClick={handleCopy}
              />
            )}
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-400">Network</p>
          <p>{chain ? `${chain.name} (${chain.id})` : "—"}</p>
        </div>

        <div className="sm:col-span-2">
          <p className="text-xs text-gray-400">Balance</p>
          <p>{balance ? `${balance.formatted} ${tokenSymbol}` : "Loading..."}</p>
        </div>
      </div>

      <input
        className="w-full px-3 py-2 mt-4 mb-2 text-sm text-black rounded-md dark:text-white dark:bg-gray-700"
        placeholder="Recipient Address"
        value={toAddress}
        onChange={(e) => setFormData({ ...formData, toAddress: e.target.value })}
        spellCheck={false}
      />
      <input
        className="w-full px-3 py-2 mb-2 text-sm text-black rounded-md dark:text-white dark:bg-gray-700"
        placeholder="Amount in ETH"
        value={amount}
        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        inputMode="decimal"
      />

      <button
        onClick={() => {
          if (!toAddress || !amount) {
            toast.error("Please enter recipient and amount");
            return;
          }
          if (!isValidEthAddress) {
            toast.error("Invalid Ethereum address");
            return;
          }
          if (!isValidAmount) {
            toast.error("Amount must be greater than 0");
            return;
          }
          if (!isAmountWithinBalance) {
            toast.error("Insufficient balance");
            return;
          }
          sendTransaction?.();
        }}
        disabled={isLoading || !sendTransaction || !isFormValid}
        className="w-full px-4 py-2 mt-2 font-medium text-white transition bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50"
      >
        {isLoading ? "Sending..." : `Send ${tokenSymbol}`}
      </button>
    </div>
  );
};

export default WalletForm;

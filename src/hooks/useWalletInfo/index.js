import { useAccount, useNetwork } from "wagmi";
import { getTokenSymbol } from "@/lib/getTokenSymbol";
import { useWalletBalance } from "./useWalletBalance";

export function useWalletInfo() {
  // ✅ Hook selalu dipanggil tanpa kondisi
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();

  const { balance, isLoading, isError, error } = useWalletBalance(address); // tetap dipanggil, meskipun address bisa null

  const tokenSymbol = getTokenSymbol(chain?.id);

  return {
    address,
    isConnected,
    chain,
    balance,
    tokenSymbol,
    balanceLoading: isLoading,
    balanceError: isError ? error : null,
  };
}

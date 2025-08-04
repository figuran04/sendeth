import { useBalance } from "wagmi";

export function useWalletBalance(address) {
  const { data, isLoading, isError, error } = useBalance({
    address,
    enabled: !!address, // ini OK, karena `enabled` hanya mengatur apakah fetch dijalankan, bukan hook-nya
    watch: true,
  });

  return {
    balance: data,
    isLoading,
    isError,
    error,
  };
}

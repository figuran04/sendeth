import { useEffect, useState } from "react";
import { fetchTransactionHistory } from "@/lib/fetchTransactionHistory";

export function useTransactionHistory(address, chainId) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Abort jika tidak ada address atau chainId
    if (!address || !chainId) {
      setTransactions([]);
      return;
    }

    let isCancelled = false; // Untuk menghindari update state setelah unmount
    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const result = await fetchTransactionHistory(address, chainId);
        if (!isCancelled) {
          setTransactions(result);
        }
      } catch (err) {
        console.error("Error fetching transactions:", err);
        if (!isCancelled) {
          setTransactions([]);
          setError(err);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isCancelled = true; // Cleanup flag
    };
  }, [address, chainId]);

  return { transactions, loading, error };
}

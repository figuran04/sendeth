import { getEtherscanApiUrl } from "./getEtherscanApiUrl";

export async function fetchTransactionHistory(address, chainId) {
  const apiUrl = getEtherscanApiUrl(chainId);
  const apiKey = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;

  if (!apiUrl || !apiKey) {
    throw new Error("Etherscan API URL or API key is missing.");
  }

  const url = `${apiUrl}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  // Tangani jika tidak ada transaksi sebagai kasus normal
  if (data.status === "0" && data.message === "No transactions found") {
    return []; // array kosong
  }

  // Tangani error lain
  if (data.status !== "1") {
    throw new Error(data.message || "Failed to fetch transaction history.");
  }

  return data.result;
}

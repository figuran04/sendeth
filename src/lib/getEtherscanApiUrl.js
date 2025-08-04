export function getEtherscanApiUrl(chainId) {
  switch (chainId) {
    case 1:
      return "https://api.etherscan.io/api";
    case 5:
      return "https://api-goerli.etherscan.io/api";
    case 11155111:
      return "https://api-sepolia.etherscan.io/api";
    case 137:
      return "https://api.polygonscan.com/api";
    default:
      console.warn(`Chain ID ${chainId} belum didukung untuk Etherscan API.`);
      return null;
  }
}

export function getTxExplorerUrl(chainId, txHash) {
  switch (chainId) {
    case 1:
      return `https://etherscan.io/tx/${txHash}`;
    case 5:
      return `https://goerli.etherscan.io/tx/${txHash}`;
    case 11155111:
      return `https://sepolia.etherscan.io/tx/${txHash}`;
    default:
      console.warn(`Chain ID ${chainId} belum didukung untuk Explorer URL.`);
      return "#";
  }
}

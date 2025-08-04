export function getTokenSymbol(chainId) {
  const tokens = {
    1: "ETH",
    137: "MATIC",
    56: "BNB",
    43114: "AVAX",
    11155111: "ETH",
    42161: "ETH",
    421613: "ETH",
    80001: "MATIC",
  };

  return tokens[chainId] || "Token";
}

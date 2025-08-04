import { configureChains, createConfig } from "wagmi";
import { mainnet, polygon, arbitrum, sepolia } from "wagmi/chains";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";

if (!process.env.NEXT_PUBLIC_INFURA_PROJECT_ID) {
  throw new Error("Missing Infura Project ID in .env.local");
}

if (!process.env.NEXT_PUBLIC_WC_PROJECT_ID) {
  throw new Error("Missing WalletConnect Project ID in .env.local");
}

export const { chains, publicClient } = configureChains(
  [sepolia, mainnet, polygon, arbitrum],
  [
    infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_PROJECT_ID }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "SendEth",
  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID,
  chains,
});

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

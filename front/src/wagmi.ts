import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import {coinbaseWallet, injected, metaMask, walletConnect} from "wagmi/connectors";


const INFURA_PROJECT_ID = process.env.REACT_APP_INFURA_PROJECT_ID;

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    injected(),
    coinbaseWallet({ appName: 'Create Wagmi' }),
    walletConnect({ projectId: INFURA_PROJECT_ID }),
    metaMask({
      appName: 'Create Wagmi',
    })
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
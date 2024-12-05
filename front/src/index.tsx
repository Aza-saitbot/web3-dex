import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import { WagmiProvider } from 'wagmi';
import { createConfig, http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors';
import {BrowserRouter} from 'react-router-dom';


const INFURA_PROJECT_ID = process.env.REACT_APP_INFURA_PROJECT_ID;

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    injected(),
    coinbaseWallet({ appName: 'Create Wagmi' }),
    walletConnect({ projectId: INFURA_PROJECT_ID }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </BrowserRouter>

);

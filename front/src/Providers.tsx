import React, {ReactNode, useEffect, useState} from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {reconnect} from '@wagmi/core';
import {WagmiProvider} from 'wagmi';
import { config } from "./wagmi";

const Providers = (props: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());
  useEffect(() => {
    setTimeout(() => {
      reconnect(config);
    });
  }, []);
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Providers;
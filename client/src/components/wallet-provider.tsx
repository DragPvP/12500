import React, { ReactNode } from 'react';
import { createAppKit } from '@reown/appkit/react';
import { WagmiProvider } from 'wagmi';
import { mainnet, bsc, tron } from 'viem/chains';
import { QueryClientProvider } from '@tanstack/react-query';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { REOWN_PROJECT_ID, APP_METADATA } from '@/lib/constants';
import { queryClient } from '@/lib/queryClient';

// Note: Only EVM-compatible chains work with Wagmi/WalletConnect
// Bitcoin and Solana require separate wallet adapters
const networks = [mainnet, bsc, tron];

const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId: REOWN_PROJECT_ID,
  ssr: true
});

createAppKit({
  adapters: [wagmiAdapter],
  networks: networks as [typeof mainnet, ...typeof networks],
  projectId: REOWN_PROJECT_ID,
  metadata: APP_METADATA,
  features: {
    analytics: false,
    email: false,
    socials: [],
    emailShowWallets: true,
  },
  themeMode: 'light',
});

interface WalletProviderProps {
  children: ReactNode;
}

export function WalletProvider({ children }: WalletProviderProps) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}

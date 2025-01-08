'use client';

import { WalletKitProvider } from '@mysten/wallet-kit';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WalletKitProvider>
      {children}
    </WalletKitProvider>
  );
} 
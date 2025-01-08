'use client'

import { ConnectButton } from '@mysten/wallet-kit'

export function WalletButton() {
  return (
    <ConnectButton className="bg-[#0891b2] hover:bg-[#0e7490] text-white font-bold py-2 px-4 rounded">
      Connect Wallet
    </ConnectButton>
  )
}


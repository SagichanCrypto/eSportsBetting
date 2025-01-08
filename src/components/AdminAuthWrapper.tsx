'use client'

import { useEffect, useState } from 'react'
import { useWallet } from '@mysten/wallet-kit'

// 承認されたウォレットアドレスのリスト
const AUTHORIZED_WALLETS = ['0x123', '0x456', '0x789']

export function AdminAuthWrapper({ children }: { children: React.ReactNode }) {
  const { isConnected, account, connect } = useWallet()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuthorization = async () => {
      if (isConnected && account) {
        setIsAuthorized(AUTHORIZED_WALLETS.includes(account.address))
      } else {
        setIsAuthorized(false)
      }
      setIsLoading(false)
    }

    checkAuthorization()
  }, [isConnected, account])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center h-screen">
        <button
          onClick={() => connect()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Connect Wallet
        </button>
      </div>
    )
  }

  if (!isAuthorized) {
    return <div>Unauthorized. This wallet is not whitelisted for admin access.</div>
  }

  return <>{children}</>
}


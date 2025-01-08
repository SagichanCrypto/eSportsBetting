'use client'

import Link from 'next/link'
import { useWalletKit } from '@mysten/wallet-kit'

const AUTHORIZED_WALLET = '0x07b46bb15c7bc6f02074838684bf8a65833548a1fe9dfea19bb8efd4aba800b3'

export function AdminLink() {
  const { isConnected, currentAccount } = useWalletKit()

  if (!isConnected || !currentAccount || currentAccount.address !== AUTHORIZED_WALLET) {
    return null
  }

  return (
    <Link href="/admin" className="mr-4 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
      管理者ダッシュボード
    </Link>
  )
}


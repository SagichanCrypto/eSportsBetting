'use client'

import { useState, useCallback } from 'react'
import { useWalletKit } from '@mysten/wallet-kit'
import { TransactionBlock } from '@mysten/sui.js/transactions'
import { formatAmount } from '@mysten/sui.js/utils'
import { CountdownTimer } from './components/CountdownTimer'
import { USDC_TYPE, USDC_DECIMALS, BETTING_CONTRACT } from '@/lib/sui-config'

export default function Home() {
  const { isConnected, connect, signAndExecuteTransactionBlock } = useWalletKit()
  const [betAmount, setBetAmount] = useState<string>('1')
  const [selectedOption, setSelectedOption] = useState<'yes' | 'no' | null>(null)
  const maxBet = 2000

  const handleBet = useCallback(async () => {
    if (!isConnected || !selectedOption) return

    try {
      const tx = new TransactionBlock()
      
      // USDCをベッティングコントラクトに送信
      const [coin] = tx.splitCoins(tx.gas, [
        tx.pure(formatAmount(Number(betAmount), USDC_DECIMALS))
      ])

      // ベッティング関数の呼び出し
      tx.moveCall({
        target: `${BETTING_CONTRACT}::betting::place_bet`,
        arguments: [
          coin,
          tx.pure(selectedOption === 'yes'),
        ],
      })

      const result = await signAndExecuteTransactionBlock({
        transactionBlock: tx,
      })

      console.log('Betting transaction successful:', result)
      // 成功時の処理（例：結果ページへの遷移など）

    } catch (error) {
      console.error('Betting failed:', error)
      // エラー処理
    }
  }, [isConnected, selectedOption, betAmount, signAndExecuteTransactionBlock])

  return (
    <main className="min-h-screen bg-black text-white p-4">
      <div className="max-w-2xl mx-auto">
        <div className="absolute top-4 right-4">
          {!isConnected && (
            <button
              onClick={() => connect()}
              className="bg-[#0891b2] text-white px-4 py-2 rounded-lg hover:bg-[#0e7490]"
            >
              Connect Wallet
            </button>
          )}
        </div>

        <h1 className="text-4xl font-bold text-center mt-8 mb-2">
          e-スポーツベッティング
        </h1>
        <p className="text-center text-gray-400 mb-8">
          デッドバイデイライトの勝敗を予測して、USDCで報酬を手にしよう！
        </p>

        <CountdownTimer />

        <div className="bg-[#1a1b1e] rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">最大ベット額: {maxBet} USDC</span>
            <div className="flex items-center">
              <input
                type="number"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                min="1"
                max={maxBet}
                className="w-24 bg-[#2c2e33] text-right text-2xl px-2 py-1 rounded"
              />
              <span className="ml-2 text-gray-400">USDC</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-4">
          <h2 className="text-xl mb-4">
            5試合中3試合以上で生存者が2名以上残ると思いますか？
          </h2>
          
          <div
            className={`bg-[#1a1b1e] rounded-lg p-4 cursor-pointer hover:bg-[#2c2e33] ${
              selectedOption === 'yes' ? 'ring-2 ring-green-500' : ''
            }`}
            onClick={() => setSelectedOption('yes')}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-green-500 rounded-full mr-3" />
                <span>はい、3試合以上で2名以上生存</span>
              </div>
              <span>50.0%</span>
            </div>
            <div className="mt-2 bg-[#2c2e33] rounded-full">
              <div className="h-2 bg-green-500 rounded-full w-1/2" />
            </div>
          </div>

          <div
            className={`bg-[#1a1b1e] rounded-lg p-4 cursor-pointer hover:bg-[#2c2e33] ${
              selectedOption === 'no' ? 'ring-2 ring-red-500' : ''
            }`}
            onClick={() => setSelectedOption('no')}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-red-500 rounded-full mr-3" />
                <span>いいえ、2試合以下で2名以上生存</span>
              </div>
              <span>50.0%</span>
            </div>
            <div className="mt-2 bg-[#2c2e33] rounded-full">
              <div className="h-2 bg-red-500 rounded-full w-1/2" />
            </div>
          </div>
        </div>

        <button
          onClick={handleBet}
          className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!isConnected || !selectedOption || Number(betAmount) > maxBet}
        >
          ベッティングを開始する
        </button>
        
        {!isConnected && (
          <p className="text-center text-red-500 text-sm mt-2">
            ベッティングを開始するにはウォレットを接続してください。
          </p>
        )}
      </div>
    </main>
  )
}


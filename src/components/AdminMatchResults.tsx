'use client';

import React, { useState, useEffect } from 'react';

interface Match {
  matchNumber: number;
  survivorCount: number;
}

interface AdminMatchResultsProps {}

export default function AdminMatchResults({}: AdminMatchResultsProps) {
  const [matches, setMatches] = useState<Match[]>([]);
  const [bettingStatus, setBettingStatus] = useState<'active' | 'completed' | 'cancelled' | 'draw'>('active');

  useEffect(() => {
    // 初期化: 5試合分の配列を作成
    setMatches(
      Array.from({ length: 5 }, (_, i) => ({
        matchNumber: i + 1,
        survivorCount: 0,
      }))
    );
  }, []);

  const handleSurvivorCountChange = (matchNumber: number, count: number) => {
    setMatches(
      matches.map((match) =>
        match.matchNumber === matchNumber
          ? { ...match, survivorCount: count }
          : match
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 結果を集計
    const successfulMatches = matches.filter((match) => match.survivorCount >= 2);
    
    let newStatus: 'completed' | 'draw';
    if (successfulMatches.length === 3) {
      newStatus = 'completed'; // Yes勝利
    } else if (successfulMatches.length < 3) {
      newStatus = 'completed'; // No勝利
    } else {
      newStatus = 'draw'; // 引き分け
    }
    
    setBettingStatus(newStatus);
    // TODO: スマートコントラクトとの連携処理
  };

  const handleCancel = async () => {
    setBettingStatus('cancelled');
    // TODO: スマートコントラクトとの連携処理
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">試合結果入力</h2>
      <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow">
        {matches.map((match) => (
          <div key={match.matchNumber} className="mb-4">
            <label
              htmlFor={`match-${match.matchNumber}`}
              className="block text-sm font-medium text-gray-700"
            >
              試合 {match.matchNumber} の生存者数
            </label>
            <input
              type="number"
              id={`match-${match.matchNumber}`}
              value={match.survivorCount}
              onChange={(e) =>
                handleSurvivorCountChange(
                  match.matchNumber,
                  parseInt(e.target.value) || 0
                )
              }
              min="0"
              max="4"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        ))}

        <div className="mt-6 space-y-4">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            結果を確定
          </button>
          
          <button
            type="button"
            onClick={handleCancel}
            className="w-full py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            ベッティングを中止
          </button>
        </div>

        {bettingStatus !== 'active' && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <p className="font-bold">
              ステータス: {' '}
              {bettingStatus === 'completed' && '確定済み'}
              {bettingStatus === 'cancelled' && '中止'}
              {bettingStatus === 'draw' && '引き分け'}
            </p>
          </div>
        )}
      </form>
    </div>
  );
} 
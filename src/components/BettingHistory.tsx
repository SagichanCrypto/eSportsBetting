'use client';

import React from 'react';

const BettingHistory: React.FC = () => {
  const mockHistory = [
    {
      id: 1,
      prediction: 'Yes (2+ survivors)',
      amount: '100',
      odds: '1.8',
      status: 'In Progress',
      date: '2024-02-20',
    },
    {
      id: 2,
      prediction: 'No (Less than 3)',
      amount: '200',
      odds: '2.2',
      status: 'Won',
      date: '2024-02-19',
    },
  ];

  return (
    <div className="p-6 bg-gray-900 rounded-lg shadow-lg border border-purple-500 shadow-purple-500/20">
      <h2 className="text-xl font-bold mb-6 text-purple-400 text-center">
        Betting History
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-purple-500">
              <th className="px-4 py-3 text-left text-purple-300">Date</th>
              <th className="px-4 py-3 text-left text-purple-300">Prediction</th>
              <th className="px-4 py-3 text-left text-purple-300">Amount</th>
              <th className="px-4 py-3 text-left text-purple-300">Status</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {mockHistory.map((bet) => (
              <tr key={bet.id} className="border-b border-purple-500/30">
                <td className="px-4 py-3">{bet.date}</td>
                <td className="px-4 py-3">{bet.prediction}</td>
                <td className="px-4 py-3">{bet.amount} SUI</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      bet.status === 'Won'
                        ? 'bg-green-900/50 text-green-400'
                        : 'bg-purple-900/50 text-purple-400'
                    }`}
                  >
                    {bet.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BettingHistory; 
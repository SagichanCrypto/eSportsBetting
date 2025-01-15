'use client';

import React, { useState } from 'react';

const BettingForm: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [prediction, setPrediction] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Betting:', { amount, prediction });
  };

  return (
    <div className="p-6 bg-gray-900 rounded-lg shadow-lg border border-purple-500 shadow-purple-500/20">
      <h2 className="text-xl font-bold mb-6 text-purple-400 text-center">
        Place Your Prediction
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-sm font-medium text-purple-300 mb-2">
            Bet Amount (SUI)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-purple-500 rounded-md text-white focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            required
            min="0"
            step="0.1"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-purple-300 mb-2">
            Your Prediction
          </label>
          <select
            value={prediction}
            onChange={(e) => setPrediction(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-purple-500 rounded-md text-white focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            required
          >
            <option value="">Select your prediction</option>
            <option value="yes">Yes (2+ survivors in 3+ matches)</option>
            <option value="no">No (Less than 3 matches with 2+ survivors)</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-3 px-6 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200 shadow-lg shadow-purple-500/50"
        >
          Place Bet
        </button>
      </form>
    </div>
  );
};

export default BettingForm; 
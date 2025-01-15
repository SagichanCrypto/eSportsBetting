'use client';

import React from 'react';

const BettingStatus: React.FC = () => {
  return (
    <div className="p-6 bg-gray-900 rounded-lg shadow-lg border border-purple-500 shadow-purple-500/20">
      <h2 className="text-xl font-bold mb-6 text-purple-400 text-center">
        Current Stream Status
      </h2>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-gray-800 rounded-lg border border-purple-400">
            <h3 className="font-bold text-purple-300 mb-2">Yes Prediction</h3>
            <p className="text-2xl text-white">1.8x</p>
            <p className="text-sm text-purple-300 mt-1">Total Pool: 500 SUI</p>
          </div>
          <div className="text-center p-4 bg-gray-800 rounded-lg border border-purple-400">
            <h3 className="font-bold text-purple-300 mb-2">No Prediction</h3>
            <p className="text-2xl text-white">2.2x</p>
            <p className="text-sm text-purple-300 mt-1">Total Pool: 400 SUI</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center text-purple-300">
            <span>Matches Completed:</span>
            <span className="text-white font-bold">2/5</span>
          </div>
          <div className="flex justify-between items-center text-purple-300">
            <span>Current Match:</span>
            <span className="text-white font-bold">Match 3</span>
          </div>
          <div className="flex justify-between items-center text-purple-300">
            <span>Matches with 2+ Survivors:</span>
            <span className="text-white font-bold">1</span>
          </div>
          <div className="mt-4 p-3 bg-gray-800 rounded-lg">
            <p className="text-center text-purple-300">
              Stream Status: <span className="text-green-400 font-bold">LIVE</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BettingStatus; 
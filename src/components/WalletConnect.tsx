'use client';

import React from 'react';
import { ConnectButton } from '@suiet/wallet-kit';

const WalletConnect: React.FC = () => {
  return (
    <div className="p-6 bg-gray-900 rounded-lg shadow-lg border border-purple-500 shadow-purple-500/20">
      <h2 className="text-xl font-bold mb-6 text-purple-400 text-center">
        Connect Wallet
      </h2>
      <ConnectButton 
        className="w-full py-3 px-6 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200 shadow-lg shadow-purple-500/50"
      />
    </div>
  );
};

export default WalletConnect; 
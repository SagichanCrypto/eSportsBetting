'use client';

import React from 'react';
import BettingForm from '@/components/BettingForm';
import BettingStatus from '@/components/BettingStatus';
import WalletConnect from '@/components/WalletConnect';
import BettingHistory from '@/components/BettingHistory';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
          Dead by Daylight Betting
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <WalletConnect />
            <BettingForm />
            <BettingHistory />
          </div>
          
          <div className="lg:sticky lg:top-8 h-fit">
            <BettingStatus />
          </div>
        </div>
      </div>
    </div>
  );
} 
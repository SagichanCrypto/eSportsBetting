'use client';

import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate?: Date | string;
  label?: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ 
  targetDate = new Date(Date.now() + 3 * 60 * 60 * 1000), // 3時間後をデフォルトに
  label = 'ベッティング締切まで'
}) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    let target: Date;
    
    try {
      target = targetDate instanceof Date ? targetDate : new Date(targetDate);
      
      if (isNaN(target.getTime())) {
        console.error('Invalid date provided to CountdownTimer');
        target = new Date(Date.now() + 3 * 60 * 60 * 1000);
      }
    } catch (error) {
      console.error('Error processing date:', error);
      target = new Date(Date.now() + 3 * 60 * 60 * 1000);
    }

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = target.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // 2桁の数字にフォーマット
  const formatNumber = (num: number) => String(num).padStart(2, '0');

  return (
    <div className="w-full max-w-2xl mx-auto bg-[#1a1b1e] rounded-lg p-4 mb-4">
      <div className="text-center text-gray-400 mb-2">{label}</div>
      <div className="text-4xl font-mono text-white text-center">
        {formatNumber(timeLeft.hours)}:{formatNumber(timeLeft.minutes)}:{formatNumber(timeLeft.seconds)}
      </div>
    </div>
  );
}; 
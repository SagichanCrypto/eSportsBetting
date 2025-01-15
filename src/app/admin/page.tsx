'use client';

import React, { useState } from 'react';
import AdminBettingForm from '@/components/AdminBettingForm';
import AdminMatchResults from '@/components/AdminMatchResults';

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        管理者ページ
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <AdminBettingForm />
        </div>
        <div>
          <AdminMatchResults />
        </div>
      </div>
    </div>
  );
} 
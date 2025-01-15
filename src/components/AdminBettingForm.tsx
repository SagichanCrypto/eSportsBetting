'use client';

import React, { useState } from 'react';

interface AdminBettingFormProps {}

export default function AdminBettingForm({}: AdminBettingFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [requiredMatches] = useState(5); // 固定値
  const [requiredSurvivors] = useState(2); // 固定値

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: スマートコントラクトとの連携処理
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">新規ベッティング作成</h2>
      <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow">
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            タイトル
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            説明
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={3}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="startTime"
            className="block text-sm font-medium text-gray-700"
          >
            開始時間
          </label>
          <input
            type="datetime-local"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="endTime"
            className="block text-sm font-medium text-gray-700"
          >
            終了時間
          </label>
          <input
            type="datetime-local"
            id="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600">試合数: {requiredMatches}</p>
          <p className="text-sm text-gray-600">必要生存者数: {requiredSurvivors}</p>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          ベッティングを作成
        </button>
      </form>
    </div>
  );
} 
'use client'

import { useState } from 'react'

export function UserList() {
  const [users] = useState([
    { id: 1, wallet: '0x123...abc' },
    { id: 2, wallet: '0x456...def' },
    { id: 3, wallet: '0x789...ghi' },
  ])

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wallet Address</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap">{user.wallet}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="text-indigo-600 hover:text-indigo-900">View Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


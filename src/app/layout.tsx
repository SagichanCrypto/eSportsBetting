import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DBD Betting',
  description: 'Dead by Daylight Survivor Betting Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <main className="min-h-screen bg-gray-100">
          {children}
        </main>
      </body>
    </html>
  )
} 
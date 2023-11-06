import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

// const inter = Inter({ subsets: ['latin'], {"bg-[#FAFAFB]"{} })

export const metadata: Metadata = {
  title: 'DataMind',
  description: 'DataMind an all in one AI tool',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-[#FAFAFB]" >{children}</body>
      </html>
    </ClerkProvider>
  )
}

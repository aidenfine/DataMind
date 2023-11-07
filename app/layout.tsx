import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ModalProvider } from '@/components/modal-provider'

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
        <body className="bg-[#FAFAFB]" >
          <ModalProvider />
          {children}
          </body>
      </html>
    </ClerkProvider>
  )
}

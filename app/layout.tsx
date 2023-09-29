import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import './globals.css'
import { ToastProvider } from '@/components/providers/toaster-provider'
import ThemeSwitch from "@/components/theme-switch";
import ThemeContextProvider from '@/components/providers/theme-provider'
import { ConfettiProvider } from '@/components/providers/confetti-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'KenDev NextJS LMS',
  description: 'Coded by Ken along with Antonio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
        <html lang="en">
          <body className={inter.className}>
            <ThemeContextProvider>
              <ConfettiProvider />
              <ToastProvider />
              {children}
              <ThemeSwitch />
            </ThemeContextProvider>
          </body>
        </html>
    </ClerkProvider>
  )
}

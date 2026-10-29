import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ToastProvider } from '@/context/ToastContext';
import { Web3Provider } from '@/context/Web3Context';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'NexaFi | Trust. Finance. Web3.',
  description:
    'Decentralized financial account and trust-based credit protocol combining digital banking, on-chain identity, trust scoring, and an AI financial copilot.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#080A0F] text-[#F8FAFC]">
        <ToastProvider>
          <Web3Provider>{children}</Web3Provider>
        </ToastProvider>
      </body>
    </html>
  );
}

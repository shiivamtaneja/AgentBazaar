import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AgentBazaar - Curate, Vote & Run AI Agents Together",
  description: 'An open Web3 playground where the community decides which AI agents rise to the top. Discover, interact with, and govern the future of AI through decentralized collaboration.',
  keywords: ['AI agents', 'Web3', 'blockchain', 'decentralized', 'community', 'MCP', 'Monad'],
  openGraph: {
    title: 'AgentBazaar - Decentralized AI Agent Hub',
    description: 'Curate, Vote & Run AI Agents — Together. Join the decentralized AI revolution.',
    type: 'website',
    locale: 'en_US',
    // TODO: add og image
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AgentBazaar - Decentralized AI Agent Hub',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AgentBazaar - Decentralized AI Agent Hub',
    description: 'Curate, Vote & Run AI Agents — Together. Join the decentralized AI revolution.',
    // TODO: add og image
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AgentBazaar - Decentralized AI Agent Hub',
      },
    ],
  },
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-black  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

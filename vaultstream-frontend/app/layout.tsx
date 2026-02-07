import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Web3Provider } from '@/providers/Web3Provider';
import { GridScan } from '@/components/GridScan';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'VaultStream - Privacy-First Invoice Factoring',
  description: 'Secure invoice factoring using iExec confidential computing on Arbitrum.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0a0a1a] text-white min-h-screen relative overflow-x-hidden`}>
        {/* GridScan Background - Fixed positioning */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <GridScan
            linesColor="#4f46e5"
            scanColor="#3b82f6"
            scanOpacity={0.3}
            lineThickness={1.5}
            gridScale={0.15}
            bloomIntensity={0.2}
            noiseIntensity={0.02}
            scanDirection="pingpong"
            scanDuration={3.0}
            scanDelay={1.5}
            enablePost={true}
            enableWebcam={false}
            showPreview={false}
          />
        </div>

        {/* Content Layer */}
        <div className="relative z-10">
          <Web3Provider>
            {children}
          </Web3Provider>
        </div>
      </body>
    </html>
  );
}
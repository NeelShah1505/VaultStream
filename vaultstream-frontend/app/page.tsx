'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ProblemSolution } from '@/components/ProblemSolution';
import { HowItWorks } from '@/components/HowItWorks';
import { Features } from '@/components/Features';
import { SecureUpload } from '@/components/SecureUpload';
import { TEEProcessor } from '@/components/TEEProcessor';
import { PayoutRequest } from '@/components/PayoutRequest';
import { Footer } from '@/components/Footer';

interface InvoiceData {
  invoiceId: string;
  amount: number;
  dueDate: string;
  clientName: string;
  clientTier: string;
}

interface TEEResult {
  invoiceId: string;
  approvedPayout: number;
  riskScore: string;
  timestamp: number;
}

export default function Home() {
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const [teeResult, setTeeResult] = useState<TEEResult | null>(null);

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero - Full viewport */}
      <Hero />

      {/* Problem/Solution - Standard spacing */}
      <section className="section-spacing">
        <ProblemSolution />
      </section>

      {/* How It Works - Standard spacing with ID */}
      <section id="how-it-works" className="section-spacing">
        <HowItWorks />
      </section>

      {/* Demo Section - Standard spacing with ID */}
      <section id="demo" className="section-spacing">
        <div className="max-w-5xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
              Try It Live
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12">
              Upload an invoice and get instant liquidity in 3 simple steps
            </p>

            {/* Step Indicator */}
            <div className="flex items-center justify-center mb-12">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg transition-all ${
                    invoiceData ? 'bg-indigo-600' : 'bg-slate-700'
                  }`}>
                    {invoiceData ? '✓' : '1'}
                  </div>
                  <span className="text-sm text-slate-300 font-medium hidden sm:inline">Upload</span>
                </div>
                
                <div className="w-16 md:w-24 h-1 bg-slate-700 rounded" />
                
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg transition-all ${
                    teeResult ? 'bg-indigo-600' : invoiceData ? 'bg-slate-700' : 'bg-slate-800'
                  }`}>
                    {teeResult ? '✓' : '2'}
                  </div>
                  <span className="text-sm text-slate-300 font-medium hidden sm:inline">Process</span>
                </div>
                
                <div className="w-16 md:w-24 h-1 bg-slate-700 rounded" />
                
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg transition-all ${
                    teeResult ? 'bg-slate-700' : 'bg-slate-800'
                  }`}>
                    3
                  </div>
                  <span className="text-sm text-slate-300 font-medium hidden sm:inline">Payout</span>
                </div>
              </div>
            </div>
          </div>

          {/* Demo Flow */}
          <div className="space-y-8">
            {!invoiceData && <SecureUpload onFileEncrypted={setInvoiceData} />}
            {invoiceData && !teeResult && <TEEProcessor invoiceData={invoiceData} onProcessingComplete={setTeeResult} />}
            {teeResult && <PayoutRequest teeResult={teeResult} />}
          </div>

          {(invoiceData || teeResult) && (
            <div className="mt-12 text-center">
              <button
                onClick={() => {
                  setInvoiceData(null);
                  setTeeResult(null);
                }}
                className="text-sm text-slate-400 hover:text-indigo-400 transition-colors underline"
              >
                ← Start Over
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Features - Standard spacing with ID */}
      <section id="features" className="section-spacing">
        <Features />
      </section>

      <Footer />
    </main>
  );
}

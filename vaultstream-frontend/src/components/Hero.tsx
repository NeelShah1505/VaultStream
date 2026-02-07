'use client';

import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4">
      <div className="relative z-10 max-w-7xl mx-auto text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center space-x-3 px-6 py-3 rounded-full glass-card mb-8"
        >
          <span className="w-2.5 h-2.5 bg-indigo-400 rounded-full animate-pulse" />
          <span className="text-sm text-white font-medium">Powered by iExec TEE on Arbitrum</span>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <span className="block gradient-text mb-3">Transform Invoices</span>
          <span className="block gradient-text">Into Instant Liquidity</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-lg md:text-xl text-white mb-12 max-w-4xl mx-auto leading-relaxed"
        >
          Privacy-first invoice factoring powered by{' '}
          <span className="text-indigo-400 font-semibold">iExec Confidential Computing</span>
          {' '}on Arbitrum L2
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-3 gap-6 md:gap-8 max-w-3xl mx-auto mb-12"
        >
          <div className="glass-card p-6 hover:scale-105 transition-transform duration-300">
            <div className="text-4xl font-bold gradient-text mb-2">{'<'} 15s</div>
            <div className="text-sm text-slate-300">Settlement</div>
          </div>
          <div className="glass-card p-6 hover:scale-105 transition-transform duration-300">
            <div className="text-4xl font-bold gradient-text mb-2">100%</div>
            <div className="text-sm text-slate-300">Private TEE with Encryption</div>
          </div>
          <div className="glass-card p-6 hover:scale-105 transition-transform duration-300">
            <div className="text-4xl font-bold gradient-text mb-2">$0</div>
            <div className="text-sm text-slate-300">Platform Fee</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <a
            href="#demo"
            className="inline-block px-10 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold text-lg 
              shadow-[0_0_40px_rgba(99,102,241,0.6)] hover:shadow-[0_0_60px_rgba(99,102,241,0.8)] 
              hover:scale-105 transition-all duration-300"
          >
            Try Demo →
          </a>
        </motion.div>
      </div>
    </section>
  );
}

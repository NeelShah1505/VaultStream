'use client';

import { motion } from 'framer-motion';
import { FiX, FiCheck } from 'react-icons/fi';

export function ProblemSolution() {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
          Why VaultStream?
        </h2>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
          Traditional invoice factoring is broken. iExec TEE fixes it.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 border-2 border-red-500/30"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
              <FiX className="text-red-400 w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-white">Traditional Factoring</h3>
          </div>

          <div className="space-y-6">
            {[
              { title: '30-90 Days Settlement', desc: 'Wait months for your money' },
              { title: '5-15% Platform Fees', desc: 'High costs eat into profits' },
              { title: 'Public Data Exposure', desc: 'Your sensitive info is visible to everyone' },
              { title: 'Manual Verification', desc: 'Slow paperwork and KYC checks' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <FiX className="text-red-400 w-5 h-5 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white mb-1">{item.title}</p>
                  <p className="text-sm text-slate-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 border-2 border-indigo-500/40 glow-iexec"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center flex-shrink-0">
              <FiCheck className="text-white w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold gradient-text">VaultStream + iExec</h3>
          </div>

          <div className="space-y-6">
            {[
              { title: '< 15 Second Settlement', desc: 'Instant blockchain execution' },
              { title: '$0 Platform Fee', desc: 'Only pay blockchain gas (~$1-2)' },
              { title: '100% Private with iExec TEE', desc: 'Intel SGX ensures data never leaves enclave' },
              { title: 'Automated AI Verification', desc: 'Smart contracts handle everything' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <FiCheck className="text-indigo-400 w-5 h-5 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white mb-1">{item.title}</p>
                  <p className="text-sm text-slate-300">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

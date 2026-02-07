'use client';

import { motion } from 'framer-motion';
import { FiUpload, FiCpu, FiDollarSign } from 'react-icons/fi';

export function HowItWorks() {
  const steps = [
    {
      icon: FiUpload,
      num: 1,
      title: 'Upload Invoice',
      desc: 'Drop your invoice JSON file. Data is encrypted end-to-end with AES-256.',
      color: 'from-purple-600 to-purple-700',
    },
    {
      icon: FiCpu,
      num: 2,
      title: 'TEE Processing',
      desc: 'Intel SGX secure enclave analyzes creditworthiness and calculates risk-adjusted payout.',
      color: 'from-indigo-600 to-indigo-700',
    },
    {
      icon: FiDollarSign,
      num: 3,
      title: 'Instant Payout',
      desc: 'Smart contract releases funds to your wallet in under 15 seconds. No intermediaries.',
      color: 'from-blue-600 to-blue-700',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
          How It Works
        </h2>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
          Three simple steps to unlock your invoice liquidity
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            whileHover={{ y: -8 }}
            className="glass-card p-8 relative"
          >
            <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-xl z-10">
              {step.num}
            </div>

            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 mx-auto`}>
              <step.icon className="text-white w-9 h-9" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-4 text-center">
              {step.title}
            </h3>
            <p className="text-slate-300 text-center leading-relaxed">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

'use client';

import { motion } from 'framer-motion';
import { FiShield, FiZap, FiLock, FiCpu } from 'react-icons/fi';

export function Features() {
  const features = [
    {
      icon: FiShield,
      title: 'iExec Confidential Computing',
      desc: 'Intel SGX Trusted Execution Environment ensures your invoice data is processed in complete isolation.',
      gradient: 'from-purple-600 to-purple-700',
    },
    {
      icon: FiZap,
      title: '< 15s Settlement',
      desc: 'Smart contracts on Arbitrum L2 deliver instant liquidity without intermediaries.',
      gradient: 'from-indigo-600 to-indigo-700',
    },
    {
      icon: FiLock,
      title: 'End-to-End Encryption',
      desc: 'AES-256-GCM encryption with zero-knowledge proofs. Your data never leaves the TEE unencrypted.',
      gradient: 'from-blue-600 to-blue-700',
    },
    {
      icon: FiCpu,
      title: 'Zero Platform Fees',
      desc: 'Decentralized protocol with no middlemen. Only pay minimal gas fees on Arbitrum.',
      gradient: 'from-cyan-600 to-cyan-700',
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
          Built on iExec Technology
        </h2>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
          Enterprise-grade confidential computing meets DeFi efficiency
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -8 }}
            className="glass-card p-8"
          >
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6`}>
              <feature.icon className="text-white w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">
              {feature.title}
            </h3>
            <p className="text-slate-300 leading-relaxed">
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

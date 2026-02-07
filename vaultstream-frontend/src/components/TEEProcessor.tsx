'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCpu, FiShield, FiCheckCircle, FiLock } from 'react-icons/fi';

interface TEEProcessorProps {
  invoiceData: any;
  onProcessingComplete: (result: any) => void;
}

export function TEEProcessor({ invoiceData, onProcessingComplete }: TEEProcessorProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const steps = [
    { icon: FiLock, title: 'Decrypting Invoice', description: 'Opening secure enclave...' },
    { icon: FiShield, title: 'Analyzing Creditworthiness', description: 'Checking client tier and payment history...' },
    { icon: FiCpu, title: 'Calculating Risk Score', description: 'AI model processing data...' },
    { icon: FiCheckCircle, title: 'Generating TEE Proof', description: 'Creating cryptographic attestation...' },
  ];

  useEffect(() => {
    if (currentStep < steps.length) {
      const timer = setTimeout(() => setCurrentStep(prev => prev + 1), 1500);
      return () => clearTimeout(timer);
    } else if (currentStep === steps.length && !isProcessing) {
      setIsProcessing(true);
      setTimeout(() => {
        const result = {
          invoiceId: invoiceData.invoiceId,
          approvedPayout: invoiceData.amount * 0.98, // 2% haircut for risk
          riskScore: invoiceData.clientTier === 'TIER_1' ? 'LOW' : 'MEDIUM',
          timestamp: Date.now(),
        };
        onProcessingComplete(result);
      }, 1000);
    }
  }, [currentStep, invoiceData, onProcessingComplete, isProcessing]);

  const handleStartProcessing = () => {
    setCurrentStep(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-8 border-2 border-purple-500/30 hover:border-purple-500/50 transition-all"
    >
      {/* Header */}
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center">
          <FiCpu className="text-white" size={24} />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-slate-200">TEE Processing</h3>
          <p className="text-sm text-slate-400">Secure computation in Intel SGX enclave</p>
        </div>
      </div>

      {/* Invoice Preview */}
      <div className="glass-card p-6 mb-8 border border-slate-700">
        <h4 className="text-lg font-semibold text-slate-200 mb-4 flex items-center space-x-2">
          <FiShield className="text-cyan-400" size={20} />
          <span>Invoice Details</span>
        </h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-slate-400">Invoice ID</p>
            <p className="text-slate-200 font-mono text-xs">{invoiceData.invoiceId.substring(0, 24)}...</p>
          </div>
          <div>
            <p className="text-slate-400">Amount</p>
            <p className="text-slate-200 font-semibold">${invoiceData.amount.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-slate-400">Client</p>
            <p className="text-slate-200">{invoiceData.clientName}</p>
          </div>
          <div>
            <p className="text-slate-400">Due Date</p>
            <p className="text-slate-200">{invoiceData.dueDate}</p>
          </div>
        </div>
      </div>

      {/* Processing Steps */}
      {currentStep === 0 ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleStartProcessing}
          className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold text-lg
            hover:shadow-[0_0_40px_rgba(139,92,246,0.4)] transition-all duration-300"
        >
          Start TEE Processing →
        </motion.button>
      ) : (
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {steps.map((step, index) => {
              const isActive = index === currentStep - 1;
              const isCompleted = index < currentStep - 1;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: isActive || isCompleted ? 1 : 0.3,
                    x: 0,
                  }}
                  className={`flex items-center space-x-4 p-4 rounded-xl border transition-all
                    ${isActive ? 'border-purple-500/50 bg-purple-500/10' : 
                      isCompleted ? 'border-green-500/50 bg-green-500/10' : 
                      'border-slate-700 bg-slate-800/30'}`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center
                    ${isCompleted ? 'bg-green-500' : isActive ? 'bg-gradient-to-r from-purple-500 to-cyan-500' : 'bg-slate-700'}`}
                  >
                    {isCompleted ? (
                      <FiCheckCircle className="text-white" size={24} />
                    ) : (
                      <step.icon className={`${isActive ? 'text-white animate-pulse' : 'text-slate-400'}`} size={24} />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-200">{step.title}</h4>
                    <p className="text-sm text-slate-400">{step.description}</p>
                  </div>
                  {isActive && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full"
                    />
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>

          {currentStep === steps.length && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 p-6 rounded-xl bg-green-500/10 border border-green-500/30"
            >
              <div className="flex items-center space-x-3 mb-4">
                <FiCheckCircle className="text-green-400" size={32} />
                <div>
                  <h4 className="text-xl font-bold text-green-400">Processing Complete!</h4>
                  <p className="text-sm text-slate-300">Your invoice has been approved for payout</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-400">Approved Payout</p>
                  <p className="text-2xl font-bold text-green-400">${(invoiceData.amount * 0.98).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-slate-400">Risk Assessment</p>
                  <p className="text-lg font-semibold text-cyan-400">
                    {invoiceData.clientTier === 'TIER_1' ? 'LOW RISK' : 'MEDIUM RISK'}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  );
}

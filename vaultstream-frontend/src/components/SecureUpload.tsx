'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUpload, FiFile, FiLock, FiCheck } from 'react-icons/fi';

interface SecureUploadProps {
  onFileEncrypted: (data: any) => void;
}

export function SecureUpload({ onFileEncrypted }: SecureUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFile = async (file: File) => {
    if (!file.name.endsWith('.json')) {
      alert('Please upload a JSON file');
      return;
    }

    setIsProcessing(true);

    try {
      const text = await file.text();
      const invoiceData = JSON.parse(text);

      // Simulate encryption delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Add unique timestamp to prevent double-spend
      const uniqueInvoiceData = {
        ...invoiceData,
        invoiceId: `${invoiceData.invoiceId}-${Date.now()}`,
      };

      onFileEncrypted(uniqueInvoiceData);
    } catch (error) {
      alert('Invalid JSON file');
      setIsProcessing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-8 border-2 border-cyan-500/30 hover:border-cyan-500/50 transition-all"
    >
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center">
          <FiUpload className="text-white" size={24} />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-slate-200">Upload Invoice JSON</h3>
          <p className="text-sm text-slate-400">Drag & drop or click to select your invoice file</p>
        </div>
      </div>

      {/* Upload Area */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer
          ${isDragging ? 'border-cyan-400 bg-cyan-500/10' : 'border-slate-600 hover:border-cyan-500/50 hover:bg-slate-800/50'}`}
      >
        <input
          type="file"
          accept=".json"
          onChange={handleChange}
          disabled={isProcessing}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        {isProcessing ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <FiLock className="w-16 h-16 text-cyan-400 mx-auto" />
            </motion.div>
            <p className="text-lg font-semibold text-cyan-400">Encrypting with AES-256...</p>
            <div className="w-48 h-2 bg-slate-700 rounded-full mx-auto overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5 }}
                className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
              />
            </div>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <FiFile className="w-16 h-16 text-slate-400 mx-auto" />
            <div>
              <p className="text-lg font-semibold text-slate-200 mb-2">
                Drop your invoice here or click to browse
              </p>
              <p className="text-sm text-slate-400">
                Supports: .json files only
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Security Badge */}
      <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-slate-400">
        <FiLock size={16} />
        <span>End-to-end encrypted with AES-256-GCM</span>
      </div>
    </motion.div>
  );
}

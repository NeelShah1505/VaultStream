'use client';

import { useAccount, useWriteContract, useWaitForTransactionReceipt, usePublicClient } from 'wagmi';
import { parseEther, parseGwei, keccak256, toBytes, toHex } from 'viem';
import { motion } from 'framer-motion';
import { FiDollarSign, FiLoader, FiCheckCircle, FiExternalLink } from 'react-icons/fi';
import { CONTRACTS, INVOICE_VAULT_ABI } from '@/config/contracts';

interface PayoutRequestProps {
  teeResult: {
    invoiceId: string;
    approvedPayout: number;
    riskScore: string;
    timestamp: number;
  };
}

export function PayoutRequest({ teeResult }: PayoutRequestProps) {
  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const { writeContract, data: hash, error, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleRequestPayout = async () => {
    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      const uniqueInvoiceString = `${teeResult.invoiceId}-${teeResult.timestamp}-${address}`;
      const invoiceIdHash = keccak256(toBytes(uniqueInvoiceString));
      const payoutInEth = (teeResult.approvedPayout / 1000000).toString();
      const payoutInWei = parseEther(payoutInEth);
      const proofString = `tee-proof-${teeResult.invoiceId}-${teeResult.timestamp}`;
      const mockTeeProof = toHex(toBytes(proofString));

      const block = publicClient ? await publicClient.getBlock() : null;
      const baseFeePerGas = block?.baseFeePerGas || parseGwei('0.1');
      const maxPriorityFeePerGas = baseFeePerGas > parseGwei('0.01') 
        ? baseFeePerGas / 10n 
        : parseGwei('0.001');
      const maxFeePerGas = baseFeePerGas + maxPriorityFeePerGas + (baseFeePerGas / 2n);

      await writeContract({
        address: CONTRACTS.INVOICE_VAULT.address,
        abi: INVOICE_VAULT_ABI,
        functionName: 'requestLiquidity',
        args: [invoiceIdHash, payoutInWei, mockTeeProof],
        maxFeePerGas,
        maxPriorityFeePerGas,
      });

    } catch (err: any) {
      console.error('❌ Payout request failed:', err);
      alert('Failed to request payout: ' + (err?.shortMessage || err?.message || 'Unknown error'));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-8"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 flex items-center justify-center">
          <FiDollarSign className="text-white" size={24} />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white mb-1">
            Request Payout
          </h3>
          <p className="text-sm text-slate-400">
            Execute smart contract transaction
          </p>
        </div>
      </div>

      {!isSuccess ? (
        <>
          {/* Payout Summary */}
          <div className="glass-card p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-400">Approved Amount</span>
              <span className="text-3xl font-bold gradient-text">
                ${teeResult.approvedPayout.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-400">Conversion Rate</span>
              <span className="text-slate-200">$1 = 0.000001 ETH (demo)</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">You will receive</span>
              <span className="text-blue-400 font-semibold">
                {(teeResult.approvedPayout / 1000000).toFixed(6)} ETH
              </span>
            </div>
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleRequestPayout}
            disabled={isPending || isConfirming || !isConnected}
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold text-lg
              hover:shadow-[0_0_40px_rgba(99,102,241,0.6)] transition-all duration-300 
              disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center justify-center gap-3"
          >
            {isPending || isConfirming ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <FiLoader className="w-6 h-6" />
                </motion.div>
                <span>{isPending ? 'Confirm in Wallet...' : 'Processing Transaction...'}</span>
              </>
            ) : (
              <>
                <FiDollarSign className="w-6 h-6" />
                <span>Request Payout (${teeResult.approvedPayout.toLocaleString()})</span>
              </>
            )}
          </motion.button>

          {!isConnected && (
            <p className="mt-4 text-center text-sm text-red-400">
              ⚠️ Please connect your wallet to request payout
            </p>
          )}
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          {/* Success Message */}
          <div className="flex items-center gap-4 p-6 rounded-xl bg-indigo-500/10 border border-indigo-500/30">
            <FiCheckCircle className="w-12 h-12 text-indigo-400 flex-shrink-0" />
            <div>
              <h4 className="text-2xl font-bold text-indigo-400 mb-1">Payout Successful!</h4>
              <p className="text-slate-200">${teeResult.approvedPayout.toLocaleString()} has been transferred to your wallet</p>
            </div>
          </div>

          {/* Transaction Link */}
          <a
            href={`https://sepolia.arbiscan.io/tx/${hash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card flex items-center justify-center gap-2 p-4 hover:border-indigo-500/50 transition-all group"
          >
            <span className="text-indigo-400 font-semibold">View Transaction on Arbiscan</span>
            <FiExternalLink className="text-indigo-400 group-hover:translate-x-1 transition-transform" />
          </a>

          {/* Reset Button */}
          <button
            onClick={() => window.location.reload()}
            className="glass-card w-full py-3 px-6 text-slate-200 hover:text-indigo-400 transition-all"
          >
            Process Another Invoice →
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}

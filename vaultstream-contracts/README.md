cd vaultstream-frontend

cat > README.md << 'EOF'
# 🏦 VaultStream - Confidential Invoice Factoring

Privacy-first invoice factoring powered by iExec TEE on Arbitrum L2.

## 🎯 Problem
SMEs can't use DeFi for invoice factoring because invoices contain sensitive business data (client names, rates, volumes) that would leak on public blockchains.

## ✨ Solution
VaultStream uses **iExec's Intel SGX TEE** to verify invoices and calculate payouts **privately**. Only the final payout amount touches the blockchain.

## 🏗️ Architecture
- **Frontend:** Next.js 14, Tailwind CSS, Framer Motion
- **Privacy:** iExec DataProtector + Intel SGX TEE
- **Blockchain:** Arbitrum Sepolia (Solidity 0.8.20)
- **iApp:** Dockerized Node.js risk engine

## 🚀 Live Demo
- **Video:** [Link to 4min demo]
- **App:** [Vercel deployment link]
- **Contract:** [Arbiscan link]

## 💻 Local Setup

### Prerequisites
- Node.js 18+
- Docker
- Metamask with Arbitrum Sepolia

### Frontend
```bash
cd vaultstream-frontend
npm install
npm run dev
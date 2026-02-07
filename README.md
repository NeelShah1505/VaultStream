# 🏦 VaultStream - Privacy-First Invoice Factoring Protocol

[![Demo Video](https://img.shields.io/badge/▶️_Demo_Video-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtu.be/4zPDj4XeLW8)
[![Smart Contract](https://img.shields.io/badge/Smart_Contract-0x6073...4af7-28a0f0?style=for-the-badge&logo=ethereum&logoColor=white)](https://sepolia.arbiscan.io/address/0x60739a2Db2a11fc32827071791c51043fbcd4af7)
[![iExec](https://img.shields.io/badge/Powered_by-iExec_TEE-4f46e5?style=for-the-badge)](https://iex.ec)
[![Arbitrum](https://img.shields.io/badge/Deployed_on-Arbitrum_L2-28a0f0?style=for-the-badge&logo=arbitrum&logoColor=white)](https://arbitrum.io)

> **Privacy-first invoice factoring powered by Intel SGX Trusted Execution Environments on Arbitrum L2**

Transform unpaid invoices into instant liquidity without exposing sensitive business data to the public blockchain.

---

## 🎯 The Problem

Small-to-medium enterprises (SMEs) face a critical liquidity crisis:

| **Traditional Issue**                                  | **Impact**                                                            |
| ------------------------------------------------------ | --------------------------------------------------------------------- |
| 📅 **30-90 day payment terms**                         | Cash flow paralysis preventing growth                                 |
| 🏦 **Banks reject 50%+ of invoice factoring requests** | No access to working capital                                          |
| 💸 **3-7% factoring fees**                             | Expensive and slow (7-14 days)                                        |
| 🔒 **Can't use DeFi**                                  | Invoices contain sensitive data that would leak on public blockchains |

**Critical Privacy Concern:** Invoices contain:

- Client names and relationships
- Pricing structures and margins
- Business volumes and growth rates
- Competitive intelligence

Putting this data on-chain = **business suicide** 🚨

---

## ✨ The Solution

**VaultStream** uses **iExec's Intel SGX Trusted Execution Environment (TEE)** to verify invoices and calculate payouts **completely privately**. Only the final approved payout amount touches the blockchain.

### Architecture Flow

```mermaid
graph LR
    A[📄 Invoice Upload] -->|AES-256-GCM| B[iExec DataProtector]
    B -->|Encrypted Data| C[🔒 Intel SGX TEE]
    C -->|Private Computation| D[⚙️ Risk Analysis]
    D -->|Approved Amount Only| E[💰 Arbitrum L2]
    E -->|Instant Settlement| F[✅ Payout to Wallet]

    style C fill:#4f46e5,stroke:#818cf8,stroke-width:3px,color:#fff
    style E fill:#28a0f0,stroke:#60a5fa,stroke-width:3px,color:#fff
```

### Key Benefits

| Feature                 | VaultStream                 | Traditional                |
| ----------------------- | --------------------------- | -------------------------- |
| ⚡ **Settlement Speed** | < 15 seconds                | 7-14 days                  |
| 🔒 **Privacy**          | 100% confidential (SGX TEE) | Manual review exposes data |
| 💰 **Cost**             | ~$0 gas on Arbitrum L2      | 3-7% fees                  |
| 🌍 **Access**           | Global, permissionless      | Geographic restrictions    |

---

## 🛠️ Tech Stack

| Layer              | Technology                          | Purpose                                    |
| ------------------ | ----------------------------------- | ------------------------------------------ |
| **Frontend**       | Next.js 15.1.6 + React 19           | Modern app router with server components   |
| **Styling**        | Tailwind CSS v3.4.1 + Framer Motion | Glassmorphism UI with smooth animations    |
| **Web3**           | Wagmi v2 + Viem + RainbowKit        | Type-safe Ethereum interactions            |
| **Privacy**        | iExec DataProtector SDK             | End-to-end encryption (AES-256-GCM)        |
| **TEE Runtime**    | iExec iApp (Intel SGX)              | Confidential computation in secure enclave |
| **Blockchain**     | Arbitrum Sepolia                    | Low-cost L2 with EVM compatibility         |
| **Smart Contract** | Solidity 0.8.20 + Hardhat           | Secure vault with reentrancy protection    |
| **Risk Engine**    | Node.js (Dockerized)                | Invoice verification + payout calculation  |

---

## 🚀 Live Deployment

### Arbitrum Sepolia Testnet

- **Smart Contract:** [`0x60739a2Db2a11fc32827071791c51043fbcd4af7`](https://sepolia.arbiscan.io/address/0x60739a2Db2a11fc32827071791c51043fbcd4af7)
- **Network:** Arbitrum Sepolia (Chain ID: 421614)
- **Frontend:** `npm run dev` at http://localhost:3000
- **Demo Video:** [https://youtu.be/4zPDj4XeLW8](https://youtu.be/4zPDj4XeLW8)

---

## 💻 Local Development

### Prerequisites

- Node.js 18+ & npm
- Docker Desktop
- MetaMask with Arbitrum Sepolia ETH ([Faucet](https://faucet.quicknode.com/arbitrum/sepolia))

### 1️⃣ Frontend Setup

```bash
cd vaultstream-frontend
npm install
npm run dev
```

Visit http://localhost:3000

**Environment Variables:**
Create `.env.local`:

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

Get your WalletConnect Project ID from [WalletConnect Cloud](https://cloud.walletconnect.com/).

### 2️⃣ Smart Contract Setup

```bash
cd vaultstream-contracts
npm install

# Compile contracts
npx hardhat compile

# Deploy to Arbitrum Sepolia
npx hardhat run scripts/deploy.js --network arbitrumSepolia

# Fund the vault
npx hardhat run scripts/fund-vault.js --network arbitrumSepolia
```

**Environment Variables:**
Create `.env`:

```env
ARBITRUM_SEPOLIA_RPC=https://sepolia-rollup.arbitrum.io/rpc
PRIVATE_KEY=your_private_key_here
ARBISCAN_API_KEY=your_arbiscan_key_here  # Optional for verification
```

### 3️⃣ iExec iApp Setup

```bash
cd vaultstream-iapp

# Build Docker image
docker build -t vaultstream-iapp:latest .

# Test locally
docker run -v $(pwd)/iexec_in:/iexec_in -v $(pwd)/iexec_out:/iexec_out vaultstream-iapp:latest

# Deploy to iExec (optional)
iexec app deploy --chain bellecour
```

**Test Invoice:**
See `iexec_in/invoice.json` for sample data format.

---

## 📖 How It Works

### Step 1: Invoice Upload

```typescript
// User uploads invoice via frontend
const invoice = {
  invoiceNumber: "INV-2024-001",
  clientName: "Acme Corp",
  amount: 50000,
  dueDate: "2024-03-15",
  issueDate: "2024-02-15",
};
```

### Step 2: Encryption with iExec DataProtector

```typescript
const { address } = await protectedData.protectData({
  data: invoice,
  name: `Invoice ${invoice.invoiceNumber}`,
});
```

Data is encrypted with **AES-256-GCM** and stored in a decentralized manner.

### Step 3: TEE Processing

The encrypted invoice is sent to an **Intel SGX secure enclave** where:

- Invoice authenticity is verified
- Credit risk is assessed
- Payout amount is calculated (70-90% of invoice value)

**Critical:** Invoice details **never leave the TEE unencrypted**.

### Step 4: Smart Contract Payout

```solidity
function requestPayout(uint256 amount, bytes memory proof) external {
    // Verify TEE attestation
    require(verifyTEEProof(proof), "Invalid TEE proof");

    // Transfer funds
    (bool success, ) = msg.sender.call{value: amount}("");
    require(success, "Transfer failed");
}
```

Only the approved payout amount is visible on-chain.

---

## 🔐 Security & Privacy

### Privacy Guarantees

| Component           | Protection                                                    |
| ------------------- | ------------------------------------------------------------- |
| **Data at Rest**    | AES-256-GCM encryption via iExec DataProtector                |
| **Data in Transit** | TLS 1.3 + end-to-end encryption                               |
| **Data in Use**     | Intel SGX hardware encryption (memory encrypted at CPU level) |
| **Blockchain Data** | Only payout amount visible, no invoice details                |

### TEE Attestation

Every iExec task produces a cryptographic attestation proving:

1. Code executed inside genuine Intel SGX enclave
2. Code hash matches expected version
3. No side-channel data leakage

### Smart Contract Security

- ✅ OpenZeppelin standard contracts
- ✅ ReentrancyGuard on all payouts
- ✅ Ownable access control
- ✅ No upgradeable proxies (immutable logic)

---

## 🏆 iExec Hackathon 2026 Submission

### Criteria Met

✅ **Confidential Computing:** Intel SGX TEE for private invoice processing  
✅ **iExec DataProtector:** End-to-end encrypted data workflow  
✅ **Smart Contract Integration:** On-chain settlement on Arbitrum L2  
✅ **Production-Ready UI:** Next.js frontend with Web3 wallet integration  
✅ **Complete Documentation:** Setup guides, architecture diagrams, demo video  
✅ **Feedback Provided:** See [FEEDBACK.md](./FEEDBACK.md) for $300 RLC hoodie prize 🎁

### Demo Video

Watch the full 4-minute demo: [https://youtu.be/4zPDj4XeLW8](https://youtu.be/4zPDj4XeLW8)

---

## 🗺️ Roadmap

### Phase 1: MVP ✅ (Current)

- [x] Smart contract deployment on Arbitrum Sepolia
- [x] iExec TEE integration for private computation
- [x] Frontend with Web3 wallet connection
- [x] End-to-end demo workflow

### Phase 2: Mainnet Launch 🚧

- [ ] Deploy to Arbitrum One mainnet
- [ ] Integrate Chainlink Price Feeds for dynamic LTV ratios
- [ ] Multi-chain support (Polygon, Base, Optimism)
- [ ] Professional audit (OpenZeppelin)

### Phase 3: Enterprise Features 🔮

- [ ] Batch invoice processing
- [ ] NFT invoice receipts (ERC-721)
- [ ] Secondary market for invoice-backed tokens
- [ ] DAO governance for risk parameters

---

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

---

## 🤝 Contributing

This project was built for the iExec Hackathon 2026. Contributions welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📧 Contact

**Built by:** Neel Shah  
**Email:** neelshah1505@gmail.com 
**Twitter:** @neelshah1505

---

<div align="center">

**⭐ Star this repo if you found it useful! ⭐**

Built with 💜 using [iExec](https://iex.ec) | [Arbitrum](https://arbitrum.io) | [Next.js](https://nextjs.org)

</div>

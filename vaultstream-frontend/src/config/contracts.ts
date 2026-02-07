export const CONTRACTS = {
  INVOICE_VAULT: {
    address: "0x60739a2Db2a11fc32827071791c51043fbcd4af7" as `0x${string}`,
    chainId: 421614, // Arbitrum Sepolia
  },
};

export const INVOICE_VAULT_ABI = [
  {
    inputs: [],
    name: "depositLiquidity",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "invoiceId",
        type: "bytes32"
      },
      {
        internalType: "uint256",
        name: "approvedPayout",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "teeProof",
        type: "bytes"
      }
    ],
    name: "requestLiquidity",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "getVaultBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    name: "processedInvoices",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "lender",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "LiquidityDeposited",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "invoiceId",
        type: "bytes32"
      },
      {
        indexed: true,
        internalType: "address",
        name: "borrower",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "approvedPayout",
        type: "uint256"
      }
    ],
    name: "LiquidityRequested",
    type: "event"
  }
] as const;

const hre = require("hardhat");

async function main() {
  const contractAddress = "0x60739a2Db2a11fc32827071791c51043fbcd4af7";
  
  console.log("🔍 Testing InvoiceVault contract...\n");
  
  // Get the contract instance
  const InvoiceVault = await hre.ethers.getContractFactory("InvoiceVault");
  const vault = InvoiceVault.attach(contractAddress);
  
  const [deployer] = await hre.ethers.getSigners();
  console.log("Testing with account:", deployer.address);
  
  // 1. Deposit liquidity (0.01 ETH)
  console.log("\n📥 Depositing liquidity...");
  const depositAmount = hre.ethers.parseEther("0.01");
  const depositTx = await vault.depositLiquidity({ value: depositAmount });
  await depositTx.wait();
  console.log("✅ Deposited 0.01 ETH");
  
  // 2. Check vault balance
  const balance = await vault.getVaultBalance();
  console.log("💰 Vault balance:", hre.ethers.formatEther(balance), "ETH");
  
  // 3. Test requestLiquidity with mock data
  console.log("\n🧾 Testing invoice payout...");
  const invoiceId = hre.ethers.id("INV-2024-001"); // Creates bytes32 hash
  const approvedPayout = hre.ethers.parseEther("0.0098"); // 9800 wei payout
  const mockTeeProof = hre.ethers.hexlify(hre.ethers.randomBytes(32)); // Mock TEE signature
  
  const requestTx = await vault.requestLiquidity(
    invoiceId,
    approvedPayout,
    mockTeeProof
  );
  await requestTx.wait();
  console.log("✅ Payout processed successfully!");
  
  // 4. Check updated balance
  const newBalance = await vault.getVaultBalance();
  console.log("💰 New vault balance:", hre.ethers.formatEther(newBalance), "ETH");
  
  // 5. Verify invoice is marked as processed
  const isProcessed = await vault.processedInvoices(invoiceId);
  console.log("🔒 Invoice marked as processed:", isProcessed);
  
  console.log("\n✅ Checkpoint Delta Complete!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

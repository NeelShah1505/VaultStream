const hre = require("hardhat");

async function main() {
  const vaultAddress = "0x60739a2Db2a11fc32827071791c51043fbcd4af7";
  const [deployer] = await hre.ethers.getSigners();

  console.log("👤 Testing from:", deployer.address);
  
  const InvoiceVault = await hre.ethers.getContractFactory("InvoiceVault");
  const vault = InvoiceVault.attach(vaultAddress);
  
  // Check vault balance
  const balance = await hre.ethers.provider.getBalance(vaultAddress);
  console.log("💰 Vault balance:", hre.ethers.formatEther(balance), "ETH");
  
  // Test parameters
  const invoiceId = hre.ethers.id("INV-2024-001");
  const approvedPayout = hre.ethers.parseEther("0.0098"); // ~$9,800 in demo
  const teeProof = hre.ethers.toUtf8Bytes("proof-test-123");
  
  console.log("\n📤 Test parameters:");
  console.log("Invoice ID:", invoiceId);
  console.log("Payout:", hre.ethers.formatEther(approvedPayout), "ETH");
  console.log("Proof:", teeProof);
  
  try {
    // Estimate gas first
    const gasEstimate = await vault.requestLiquidity.estimateGas(
      invoiceId,
      approvedPayout,
      teeProof
    );
    console.log("\n⛽ Gas estimate:", gasEstimate.toString());
    
    // Try the transaction
    console.log("\n🚀 Sending transaction...");
    const tx = await vault.requestLiquidity(
      invoiceId,
      approvedPayout,
      teeProof
    );
    
    console.log("⏳ Waiting for confirmation...");
    await tx.wait();
    
    console.log("✅ Success! Tx:", tx.hash);
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

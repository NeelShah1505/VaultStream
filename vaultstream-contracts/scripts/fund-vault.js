const hre = require("hardhat");

async function main() {
  const vaultAddress = "0x60739a2Db2a11fc32827071791c51043fbcd4af7";
  const [deployer] = await hre.ethers.getSigners();

  console.log("💰 Depositing 0.1 ETH into vault...");
  console.log("👤 From:", deployer.address);
  
  // Get contract instance
  const InvoiceVault = await hre.ethers.getContractFactory("InvoiceVault");
  const vault = InvoiceVault.attach(vaultAddress);
  
  // Deposit liquidity using the contract function
  const tx = await vault.depositLiquidity({
    value: hre.ethers.parseEther("0.1")
  });
  
  console.log("⏳ Waiting for confirmation...");
  await tx.wait();
  
  console.log("✅ Vault funded! Tx:", tx.hash);
  
  // Check vault balance
  const balance = await hre.ethers.provider.getBalance(vaultAddress);
  console.log("💰 Vault balance:", hre.ethers.formatEther(balance), "ETH");
  
  const totalLiquidity = await vault.totalLiquidity();
  console.log("📊 Total Liquidity:", hre.ethers.formatEther(totalLiquidity), "ETH");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

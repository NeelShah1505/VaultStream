const hre = require("hardhat");

async function main() {
  console.log("🚀 Deploying InvoiceVault to Arbitrum Sepolia...");

  const InvoiceVault = await hre.ethers.getContractFactory("InvoiceVault");
  const vault = await InvoiceVault.deploy();

  await vault.waitForDeployment();

  const address = await vault.getAddress();
  console.log("✅ InvoiceVault deployed to:", address);
  console.log("📋 Save this address for frontend integration!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

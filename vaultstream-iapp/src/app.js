const fs = require('fs');
const path = require('path');

// Risk calculation logic
function calculatePayout(invoice) {
  const { invoiceId, amount, dueDate, clientName, clientTier } = invoice;
  
  // Discount rates based on tier
  const discountRates = {
    'TIER_1': 0.02,  // 2% discount - lowest risk
    'TIER_2': 0.05,  // 5% discount - medium risk
    'TIER_3': 0.10   // 10% discount - highest risk
  };
  
  const discountRate = discountRates[clientTier] || 0.10;
  const approvedPayout = Math.floor(amount * (1 - discountRate));
  
  // Risk score mapping
  const riskScores = {
    'TIER_1': 'A',
    'TIER_2': 'B',
    'TIER_3': 'C'
  };
  
  return {
    invoiceId,
    approvedPayout,
    riskScore: riskScores[clientTier] || 'C',
    timestamp: Date.now()
  };
}

// Main execution
try {
  const inputPath = process.env.IEXEC_IN || './';
  const outputPath = process.env.IEXEC_OUT || './';
  
  // Read invoice data
  const invoiceData = fs.readFileSync(
    path.join(inputPath, 'invoice.json'),
    'utf8'
  );
  const invoice = JSON.parse(invoiceData);
  
  console.log('Processing invoice:', invoice.invoiceId);
  console.log('Client Tier:', invoice.clientTier);
  
  // Calculate payout (sensitive data stays in TEE)
  const result = calculatePayout(invoice);
  
  console.log('Approved Payout:', result.approvedPayout);
  
  // Write result (NO clientName included)
  fs.writeFileSync(
    path.join(outputPath, 'result.json'),
    JSON.stringify(result, null, 2)
  );
  
  console.log('✅ Result written successfully');
} catch (error) {
  console.error('❌ Error processing invoice:', error.message);
  process.exit(1);
}

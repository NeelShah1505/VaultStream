// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract InvoiceVault is Ownable, ReentrancyGuard {
    // Mapping to track processed invoices (prevent double-spending)
    mapping(bytes32 => bool) public processedInvoices;
    
    // Total liquidity in the vault
    uint256 public totalLiquidity;
    
    // iExec TEE workerpool address (to be set)
    address public teeWorkerpool;
    
    // Events
    event LiquidityDeposited(address indexed lender, uint256 amount);
    event LiquidityRequested(
        bytes32 indexed invoiceId,
        address indexed borrower,
        uint256 approvedPayout
    );
    event TEEWorkerPoolUpdated(address indexed newWorkerpool);
    
    constructor() Ownable(msg.sender) {}
    
    // Deposit liquidity into the vault (for lenders)
    function depositLiquidity() external payable {
        require(msg.value > 0, "Must deposit non-zero amount");
        totalLiquidity += msg.value;
        emit LiquidityDeposited(msg.sender, msg.value);
    }
    
    // Request liquidity based on TEE-verified invoice
    function requestLiquidity(
        bytes32 invoiceId,
        uint256 approvedPayout,
        bytes memory teeProof
    ) external nonReentrant {
        // Check invoice hasn't been processed
        require(!processedInvoices[invoiceId], "Invoice already processed");
        
        // Verify sufficient liquidity
        require(totalLiquidity >= approvedPayout, "Insufficient vault liquidity");
        
        // TODO: Verify TEE signature in teeProof (Checkpoint Delta)
        // For now, basic validation
        require(teeProof.length > 0, "Invalid TEE proof");
        
        // Mark invoice as processed
        processedInvoices[invoiceId] = true;
        
        // Update liquidity
        totalLiquidity -= approvedPayout;
        
        // Transfer funds to borrower
        (bool success, ) = payable(msg.sender).call{value: approvedPayout}("");
        require(success, "Transfer failed");
        
        emit LiquidityRequested(invoiceId, msg.sender, approvedPayout);
    }
    
    // Set TEE workerpool address (owner only)
    function setTEEWorkerpool(address _workerpool) external onlyOwner {
        require(_workerpool != address(0), "Invalid workerpool address");
        teeWorkerpool = _workerpool;
        emit TEEWorkerPoolUpdated(_workerpool);
    }
    
    // Get vault balance
    function getVaultBalance() external view returns (uint256) {
        return totalLiquidity;
    }
    
    // Emergency withdraw (owner only)
    function emergencyWithdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        totalLiquidity = 0;
        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "Withdrawal failed");
    }
}

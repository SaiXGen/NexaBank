// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title ILendingPool
 * @author NexaFi Protocol
 * @notice Interface for decentralized liquidity deposits, utilization pools, and interest curves.
 */
interface ILendingPool {
    event AssetSupplied(address indexed asset, address indexed provider, uint256 amount);
    event AssetWithdrawn(address indexed asset, address indexed provider, uint256 amount);
    event InterestDistributed(address indexed asset, uint256 totalYieldAmount);

    function depositLiquidity(address asset, uint256 amount) external returns (uint256 nexTokensMinted);
    function withdrawLiquidity(address asset, uint256 nexTokensBurned) external returns (uint256 assetAmount);
    function getPoolUtilization(address asset) external view returns (uint256 totalDeposits, uint256 totalBorrowed, uint16 currentAprBps);
    function fundLoanDisbursement(address asset, address borrower, uint256 principal) external;
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title ITrustScore
 * @author NexaFi Protocol
 * @notice Interface for on-chain verifiable trust evaluation & reputational identity.
 */
interface ITrustScore {
    struct TrustFactors {
        uint16 paymentReliability;   // Scaled 0 - 10000 (bps)
        uint16 walletActivity;        // Scaled 0 - 10000
        uint16 financialConsistency; // Scaled 0 - 10000
        uint16 circleReputation;     // Scaled 0 - 10000
        uint16 assetStability;        // Scaled 0 - 10000
        uint256 lastEvaluatedBlock;
    }

    event TrustScoreUpdated(address indexed account, uint16 newScore, string tier);
    event TrustFactorRecorded(address indexed account, bytes32 indexed factorKey, uint16 delta);

    function getTrustScore(address account) external view returns (uint16 score, string memory tier);
    function getTrustFactors(address account) external view returns (TrustFactors memory);
    function isEligibleForUncollateralizedCredit(address account, uint256 requestedAmount) external view returns (bool, uint256 maxCredit);
    function recordRepaymentEvent(address borrower, uint256 amountPaid, bool onTime) external;
}

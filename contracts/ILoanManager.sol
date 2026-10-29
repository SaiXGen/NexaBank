// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title ILoanManager
 * @author NexaFi Protocol
 * @notice Manages loan origination, collateral management, trust factor checks, and loan lifecycle.
 */
interface ILoanManager {
    enum LoanState { None, Active, Repaid, Defaulted }

    struct LoanAgreement {
        bytes32 loanId;
        address borrower;
        address asset;
        uint256 principal;
        uint256 totalDebtDue;
        uint256 totalPaid;
        uint16 aprBps;
        uint32 durationDays;
        uint256 collateralLocked;
        address collateralToken;
        uint256 startTimestamp;
        uint256 dueTimestamp;
        LoanState state;
        bytes32 associatedCircleId;
    }

    event LoanOriginated(bytes32 indexed loanId, address indexed borrower, uint256 principal, uint16 aprBps);
    event LoanInstallmentRepaid(bytes32 indexed loanId, address indexed payer, uint256 amount, uint256 remainingDebt);
    event LoanFullySettled(bytes32 indexed loanId, address indexed borrower);

    function requestTrustLoan(
        address asset,
        uint256 principal,
        uint32 durationDays,
        bytes32 circleId,
        address collateralToken,
        uint256 collateralAmount
    ) external returns (bytes32 loanId);

    function repayInstallment(bytes32 loanId, uint256 amount) external;
    function getLoan(bytes32 loanId) external view returns (LoanAgreement memory);
    function getUserActiveLoans(address borrower) external view returns (bytes32[] memory);
}

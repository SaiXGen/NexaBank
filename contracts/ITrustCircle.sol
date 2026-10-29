// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title ITrustCircle
 * @author NexaFi Protocol
 * @notice Interface for social underwriting circles with pooled risk guarantees.
 */
interface ITrustCircle {
    enum MemberRole { None, Member, Vouched, Founder }

    struct CircleDetails {
        bytes32 circleId;
        string name;
        address founder;
        uint256 totalCapitalPooled;
        uint16 trustRating;
        uint32 activeLoansCount;
        uint16 historicalRepaymentBps;
        uint256 minMemberDeposit;
    }

    event MemberJoined(bytes32 indexed circleId, address indexed member, uint256 stakedGuarantee);
    event GuaranteeVouched(bytes32 indexed circleId, address indexed voucher, address indexed beneficiary, uint256 amount);
    event CircleCreated(bytes32 indexed circleId, string name, address indexed founder);

    function createCircle(string calldata name, uint256 initialStake, uint256 minMemberDeposit) external returns (bytes32 circleId);
    function joinCircle(bytes32 circleId, uint256 stakeAmount) external;
    function vouchForMember(bytes32 circleId, address candidate, uint256 guaranteeAmount) external;
    function getCircle(bytes32 circleId) external view returns (CircleDetails memory);
    function isMember(bytes32 circleId, address account) external view returns (bool);
}

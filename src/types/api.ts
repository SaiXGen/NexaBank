export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  timestamp: string;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    message: string;
    code: string;
    details?: unknown;
  };
  timestamp: string;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

// User
export interface UserProfileDto {
  id: string;
  username: string;
  email?: string;
  ensName: string;
  avatarUrl: string;
  primaryAddress: string;
  createdAt: string;
}

// Wallet
export interface WalletDto {
  address: string;
  network: string;
  totalBalanceUsd: number;
  tokens: {
    symbol: string;
    name: string;
    balance: number;
    priceUsd: number;
    valueUsd: number;
    change24h: number;
    icon: string;
    allocationPct: number;
  }[];
}

// Trust Score
export interface TrustScoreDto {
  score: number;
  paymentReliability: number;
  walletActivity: number;
  financialConsistency: number;
  circleReputation: number;
  assetStability: number;
  ratingTier: string;
  maxCreditLine: number;
  updatedAt: string;
}

// Trust Circle
export interface CreateTrustCircleRequest {
  name: string;
  description: string;
  category: string;
  stakeAmount: number;
}

export interface TrustCircleDto {
  id: string;
  name: string;
  description: string;
  category: string;
  circleTrustScore: number;
  totalCapitalPooled: number;
  activeLoansCount: number;
  historicalRepaymentPct: number;
  membersCount: number;
  userIsMember: boolean;
  userRole: string;
}

// Loans
export interface LoanDto {
  id: string;
  principalAmount: number;
  borrowedAsset: string;
  interestRateApr: number;
  durationDays: number;
  collateralRatio: number;
  collateralAmount: number;
  collateralAsset?: string;
  status: 'ACTIVE' | 'REPAID' | 'PENDING' | 'DEFAULTED';
  purpose: string;
  amountRepaid: number;
  totalDue: number;
  dueDate: string;
  createdAt: string;
}

export interface LoansOverviewDto {
  availableCredit: number;
  currentBorrowed: number;
  repaymentProgress: number;
  activeLoans: LoanDto[];
  historicalLoans: LoanDto[];
}

export interface CreateLoanRequest {
  principalAmount: number;
  durationDays: number;
  purpose: string;
  collateralAmount?: number;
}

export interface RepayLoanRequest {
  amount: number;
}

// AI Copilot
export interface AiChatRequest {
  message: string;
}

export interface AiChatDto {
  id: string;
  sender: 'assistant';
  content: string;
  timestamp: string;
  metrics?: { label: string; value: string }[];
  suggestedActions?: string[];
}

export type NetworkType = 'Ethereum' | 'Arbitrum' | 'Base' | 'Polygon';

export interface TokenBalance {
  symbol: string;
  name: string;
  balance: number;
  price: number;
  valueUsd: number;
  change24h: number;
  icon: string;
  allocationPercent: number;
}

export interface TrustFactor {
  name: string;
  score: number; // 0-100
  weight: string;
  description: string;
  status: 'optimal' | 'good' | 'average' | 'needs_improvement';
}

export interface TrustTimelineItem {
  id: string;
  change: string;
  reason: string;
  timestamp: string;
  category: 'repayment' | 'transaction' | 'circle' | 'deposit';
  positive: boolean;
}

export interface TrustCircleMember {
  id: string;
  address: string;
  ensName?: string;
  name: string;
  avatar: string;
  trustScore: number;
  contribution: number;
  status: 'Active' | 'Vouched' | 'Founder';
  joinedDate: string;
  loansCompleted: number;
}

export interface TrustCircle {
  id: string;
  name: string;
  description: string;
  category: string;
  membersCount: number;
  circleTrust: number; // percentage
  activeLoans: number;
  repaymentRate: number; // percentage
  totalCapitalPooled: number;
  userIsMember?: boolean;
  userRole?: 'Founder' | 'Member' | 'None';
  members: TrustCircleMember[];
}

export interface Loan {
  id: string;
  amount: number;
  borrowedAsset: string;
  interestRate: number; // APR %
  durationDays: number;
  collateralRatio: number; // e.g. 20% or 0% undercollateralized
  collateralAmount: number;
  collateralAsset: string;
  repaymentProgress: number; // percentage 0-100
  amountRepaid: number;
  totalDue: number;
  monthlyPayment: number;
  status: 'active' | 'repaid' | 'pending';
  borrowedDate: string;
  dueDate: string;
  purpose: string;
  lendingPool: string;
}

export type TransactionType =
  | 'loan_repayment'
  | 'usdc_transfer'
  | 'yield_deposit'
  | 'crypto_swap'
  | 'loan_origination'
  | 'circle_contribution'
  | 'fiat_deposit';

export interface Transaction {
  id: string;
  type: TransactionType;
  title: string;
  asset: string;
  amount: number;
  valueUsd: number;
  status: 'Completed' | 'Pending' | 'Failed';
  date: string;
  timestamp: number;
  txHash: string;
  from: string;
  to: string;
  network: NetworkType;
  gasFee: number;
  category: 'Lending' | 'Transfers' | 'DeFi' | 'Trading';
}

export interface PortfolioPoint {
  date: string;
  value: number;
  ethValue: number;
  stableValue: number;
  btcValue: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestedActions?: string[];
  metrics?: { label: string; value: string }[];
}

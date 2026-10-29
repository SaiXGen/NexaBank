'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  NetworkType,
  TokenBalance,
  TrustCircle,
  Loan,
  Transaction,
  TrustFactor,
  TrustTimelineItem,
} from '@/types';
import {
  INITIAL_TOKENS,
  INITIAL_CIRCLES,
  INITIAL_LOANS,
  INITIAL_TRANSACTIONS,
  TRUST_FACTORS,
  TRUST_TIMELINE,
  TRUST_SCORE,
  AVAILABLE_CREDIT,
  CURRENT_BORROWED,
  REPAYMENT_PROGRESS,
} from '@/lib/mockData';
import { useToast } from './ToastContext';
import confetti from 'canvas-confetti';

interface Web3ContextType {
  isConnected: boolean;
  isDemo: boolean;
  address: string;
  ensName: string;
  network: NetworkType;
  tokens: TokenBalance[];
  totalBalance: number;
  trustScore: number;
  trustRating: string;
  availableCredit: number;
  currentBorrowed: number;
  repaymentProgress: number;
  trustFactors: TrustFactor[];
  trustTimeline: TrustTimelineItem[];
  loans: Loan[];
  circles: TrustCircle[];
  transactions: Transaction[];
  connectDemoWallet: () => void;
  connectInjectedWallet: () => Promise<boolean>;
  disconnectWallet: () => void;
  switchNetwork: (net: NetworkType) => void;
  sendTokens: (to: string, amount: number, tokenSymbol: string) => Promise<boolean>;
  swapTokens: (fromSymbol: string, toSymbol: string, fromAmount: number) => Promise<boolean>;
  depositFunds: (amount: number, tokenSymbol: string, method: string) => Promise<boolean>;
  requestLoan: (amount: number, durationDays: number, purpose: string, collateralAmount: number) => Promise<boolean>;
  repayLoan: (loanId: string, amount: number) => Promise<boolean>;
  createTrustCircle: (name: string, description: string, category: string, stake: number) => Promise<boolean>;
  joinTrustCircle: (circleId: string, stake: number) => Promise<boolean>;
  resetToDefaults: () => void;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

const DEMO_ADDRESS = '0x71C83e58b142828bF93F2';
const DEMO_ENS = 'alex.nexafi.eth';

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const { addToast } = useToast();

  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [isDemo, setIsDemo] = useState<boolean>(true);
  const [address, setAddress] = useState<string>(DEMO_ADDRESS);
  const [ensName, setEnsName] = useState<string>(DEMO_ENS);
  const [network, setNetwork] = useState<NetworkType>('Ethereum');

  const [tokens, setTokens] = useState<TokenBalance[]>(INITIAL_TOKENS);
  const [trustScore, setTrustScore] = useState<number>(TRUST_SCORE);
  const [availableCredit, setAvailableCredit] = useState<number>(AVAILABLE_CREDIT);
  const [currentBorrowed, setCurrentBorrowed] = useState<number>(CURRENT_BORROWED);
  const [repaymentProgress, setRepaymentProgress] = useState<number>(REPAYMENT_PROGRESS);
  const [loans, setLoans] = useState<Loan[]>(INITIAL_LOANS);
  const [circles, setCircles] = useState<TrustCircle[]>(INITIAL_CIRCLES);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [trustFactors, setTrustFactors] = useState<TrustFactor[]>(TRUST_FACTORS);
  const [trustTimeline, setTrustTimeline] = useState<TrustTimelineItem[]>(TRUST_TIMELINE);

  // Load persisted demo modifications from localStorage if available
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('nexafi_state_v1');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (parsed.tokens) setTokens(parsed.tokens);
        if (parsed.loans) setLoans(parsed.loans);
        if (parsed.circles) setCircles(parsed.circles);
        if (parsed.transactions) setTransactions(parsed.transactions);
        if (parsed.trustScore !== undefined) setTrustScore(parsed.trustScore);
        if (parsed.availableCredit !== undefined) setAvailableCredit(parsed.availableCredit);
        if (parsed.currentBorrowed !== undefined) setCurrentBorrowed(parsed.currentBorrowed);
        if (parsed.repaymentProgress !== undefined) setRepaymentProgress(parsed.repaymentProgress);
        if (parsed.address) setAddress(parsed.address);
        if (parsed.network) setNetwork(parsed.network);
        if (parsed.isConnected !== undefined) setIsConnected(parsed.isConnected);
        if (parsed.isDemo !== undefined) setIsDemo(parsed.isDemo);
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        'nexafi_state_v1',
        JSON.stringify({
          tokens,
          loans,
          circles,
          transactions,
          trustScore,
          availableCredit,
          currentBorrowed,
          repaymentProgress,
          address,
          network,
          isConnected,
          isDemo,
        })
      );
    } catch {
      // Ignore write errors
    }
  }, [tokens, loans, circles, transactions, trustScore, availableCredit, currentBorrowed, repaymentProgress, address, network, isConnected, isDemo]);

  // Dynamic portfolio value calculation
  const totalBalance = tokens.reduce((sum, t) => sum + t.valueUsd, 0);

  const trustRating = trustScore >= 800 ? 'Excellent' : trustScore >= 700 ? 'Good' : 'Moderate';

  const connectDemoWallet = useCallback(() => {
    setIsConnected(true);
    setIsDemo(true);
    setAddress(DEMO_ADDRESS);
    setEnsName(DEMO_ENS);
    addToast({
      type: 'success',
      title: 'Demo Wallet Connected',
      message: `Signed in as ${DEMO_ENS} with full simulation assets.`,
    });
  }, [addToast]);

  const connectInjectedWallet = useCallback(async (): Promise<boolean> => {
    if (typeof window !== 'undefined' && (window as unknown as { ethereum?: { request: (args: { method: string }) => Promise<string[]> } }).ethereum) {
      try {
        const eth = (window as unknown as { ethereum: { request: (args: { method: string }) => Promise<string[]> } }).ethereum;
        const accounts = await eth.request({ method: 'eth_requestAccounts' });
        if (accounts && accounts[0]) {
          setIsConnected(true);
          setIsDemo(false);
          setAddress(accounts[0]);
          setEnsName(`${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`);
          addToast({
            type: 'success',
            title: 'EVM Wallet Connected',
            message: `Connected to ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
          });
          return true;
        }
      } catch (err: unknown) {
        const error = err as { message?: string };
        addToast({
          type: 'error',
          title: 'Connection Rejected',
          message: error?.message || 'Wallet connection was cancelled.',
        });
        return false;
      }
    }

    // If no provider installed
    addToast({
      type: 'info',
      title: 'No Web3 Provider Found',
      message: 'Switched to Demo Account mode so you can test all features.',
    });
    connectDemoWallet();
    return true;
  }, [addToast, connectDemoWallet]);

  const disconnectWallet = useCallback(() => {
    setIsConnected(false);
    addToast({
      type: 'info',
      title: 'Wallet Disconnected',
      message: 'You have disconnected your account session.',
    });
  }, [addToast]);

  const switchNetwork = useCallback((net: NetworkType) => {
    setNetwork(net);
    addToast({
      type: 'success',
      title: 'Network Switched',
      message: `Active chain changed to ${net}.`,
    });
  }, [addToast]);

  const sendTokens = useCallback(async (to: string, amount: number, tokenSymbol: string): Promise<boolean> => {
    const token = tokens.find((t) => t.symbol === tokenSymbol);
    if (!token || token.balance < amount) {
      addToast({
        type: 'error',
        title: 'Insufficient Balance',
        message: `You do not have enough ${tokenSymbol} to complete this transfer.`,
      });
      return false;
    }

    const txHash = `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`;
    
    // Update token balance
    setTokens((prev) =>
      prev.map((t) => {
        if (t.symbol === tokenSymbol) {
          const newBal = Math.max(0, t.balance - amount);
          return {
            ...t,
            balance: newBal,
            valueUsd: Number((newBal * t.price).toFixed(2)),
          };
        }
        return t;
      })
    );

    // Record transaction
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      type: 'usdc_transfer',
      title: `${tokenSymbol} Transfer`,
      asset: tokenSymbol,
      amount: -amount,
      valueUsd: Number((amount * token.price).toFixed(2)),
      status: 'Completed',
      date: 'Just now',
      timestamp: Date.now(),
      txHash,
      from: address,
      to,
      network,
      gasFee: 0.15,
      category: 'Transfers',
    };

    setTransactions((prev) => [newTx, ...prev]);

    addToast({
      type: 'success',
      title: 'Transfer Completed',
      message: `Sent ${amount} ${tokenSymbol} to ${to.slice(0, 10)}...`,
      txHash,
    });

    return true;
  }, [tokens, address, network, addToast]);

  const swapTokens = useCallback(async (fromSymbol: string, toSymbol: string, fromAmount: number): Promise<boolean> => {
    const fromToken = tokens.find((t) => t.symbol === fromSymbol);
    const toToken = tokens.find((t) => t.symbol === toSymbol);

    if (!fromToken || !toToken || fromToken.balance < fromAmount) {
      addToast({
        type: 'error',
        title: 'Swap Failed',
        message: `Insufficient ${fromSymbol} balance.`,
      });
      return false;
    }

    const receivedAmount = (fromAmount * fromToken.price) / toToken.price;
    const txHash = `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`;

    setTokens((prev) =>
      prev.map((t) => {
        if (t.symbol === fromSymbol) {
          const newBal = t.balance - fromAmount;
          return { ...t, balance: newBal, valueUsd: Number((newBal * t.price).toFixed(2)) };
        }
        if (t.symbol === toSymbol) {
          const newBal = t.balance + receivedAmount;
          return { ...t, balance: newBal, valueUsd: Number((newBal * t.price).toFixed(2)) };
        }
        return t;
      })
    );

    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      type: 'crypto_swap',
      title: `Swap ${fromSymbol} to ${toSymbol}`,
      asset: `${fromSymbol} / ${toSymbol}`,
      amount: fromAmount,
      valueUsd: Number((fromAmount * fromToken.price).toFixed(2)),
      status: 'Completed',
      date: 'Just now',
      timestamp: Date.now(),
      txHash,
      from: address,
      to: 'Uniswap v3 Router',
      network,
      gasFee: 1.25,
      category: 'Trading',
    };

    setTransactions((prev) => [newTx, ...prev]);

    addToast({
      type: 'success',
      title: 'Swap Confirmed',
      message: `Exchanged ${fromAmount} ${fromSymbol} for ${receivedAmount.toFixed(4)} ${toSymbol}`,
      txHash,
    });

    return true;
  }, [tokens, address, network, addToast]);

  const depositFunds = useCallback(async (amount: number, tokenSymbol: string, method: string): Promise<boolean> => {
    const token = tokens.find((t) => t.symbol === tokenSymbol) || { price: 1 };
    const txHash = `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`;

    setTokens((prev) =>
      prev.map((t) => {
        if (t.symbol === tokenSymbol) {
          const newBal = t.balance + amount;
          return { ...t, balance: newBal, valueUsd: Number((newBal * t.price).toFixed(2)) };
        }
        return t;
      })
    );

    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      type: method === 'fiat' ? 'fiat_deposit' : 'yield_deposit',
      title: method === 'fiat' ? 'Fiat On-Ramp Deposit' : `${tokenSymbol} Deposit`,
      asset: tokenSymbol,
      amount,
      valueUsd: Number((amount * token.price).toFixed(2)),
      status: 'Completed',
      date: 'Just now',
      timestamp: Date.now(),
      txHash,
      from: method === 'fiat' ? 'Bank / Card' : 'External Wallet',
      to: address,
      network,
      gasFee: 0.05,
      category: 'Transfers',
    };

    setTransactions((prev) => [newTx, ...prev]);

    addToast({
      type: 'success',
      title: 'Funds Deposited',
      message: `Deposited $${amount.toLocaleString()} ${tokenSymbol} into your account.`,
      txHash,
    });

    return true;
  }, [tokens, address, network, addToast]);

  const requestLoan = useCallback(
    async (amount: number, durationDays: number, purpose: string, collateralAmount: number): Promise<boolean> => {
      if (amount > availableCredit) {
        addToast({
          type: 'error',
          title: 'Credit Limit Exceeded',
          message: `Maximum available uncollateralized credit is $${availableCredit.toLocaleString()}.`,
        });
        return false;
      }

      const txHash = `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`;
      const newLoanId = `LN-${Math.floor(1000 + Math.random() * 9000)}`;
      const interestRate = 4.8;
      const totalDue = Number((amount * (1 + (interestRate / 100) * (durationDays / 365))).toFixed(2));
      const monthlyPayment = Number((totalDue / (durationDays / 30)).toFixed(2));

      const newLoan: Loan = {
        id: newLoanId,
        amount,
        borrowedAsset: 'USDC',
        interestRate,
        durationDays,
        collateralRatio: collateralAmount > 0 ? 15 : 0,
        collateralAmount,
        collateralAsset: 'USDC',
        repaymentProgress: 0,
        amountRepaid: 0,
        totalDue,
        monthlyPayment,
        status: 'active',
        borrowedDate: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + durationDays * 24 * 3600 * 1000).toISOString().split('T')[0],
        purpose: purpose || 'Working capital',
        lendingPool: 'Tech Builders Community Pool',
      };

      setLoans((prev) => [newLoan, ...prev]);
      setCurrentBorrowed((prev) => prev + amount);
      setAvailableCredit((prev) => Math.max(0, prev - amount));

      // Deposit the borrowed USDC directly into the user's balance
      setTokens((prev) =>
        prev.map((t) => {
          if (t.symbol === 'USDC') {
            const newBal = t.balance + amount;
            return { ...t, balance: newBal, valueUsd: Number((newBal * t.price).toFixed(2)) };
          }
          return t;
        })
      );

      // Record transaction
      const newTx: Transaction = {
        id: `tx-${Date.now()}`,
        type: 'loan_origination',
        title: 'Decentralized Loan Disbursed',
        asset: 'USDC',
        amount,
        valueUsd: amount,
        status: 'Completed',
        date: 'Just now',
        timestamp: Date.now(),
        txHash,
        from: 'NexaFi Lending Pool',
        to: address,
        network,
        gasFee: 0.45,
        category: 'Lending',
      };

      setTransactions((prev) => [newTx, ...prev]);

      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#10B981', '#6366F1', '#38BDF8'],
        });
      } catch {
        // Confetti fallback
      }

      addToast({
        type: 'success',
        title: 'Loan Disbursed',
        message: `Successfully received $${amount.toLocaleString()} USDC based on your Trust Score!`,
        txHash,
      });

      return true;
    },
    [availableCredit, address, network, addToast]
  );

  const repayLoan = useCallback(
    async (loanId: string, amount: number): Promise<boolean> => {
      const usdcToken = tokens.find((t) => t.symbol === 'USDC');
      if (!usdcToken || usdcToken.balance < amount) {
        addToast({
          type: 'error',
          title: 'Insufficient Balance',
          message: `You need at least ${amount} USDC to repay this installment.`,
        });
        return false;
      }

      const txHash = `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`;

      // Deduct USDC
      setTokens((prev) =>
        prev.map((t) => {
          if (t.symbol === 'USDC') {
            const newBal = t.balance - amount;
            return { ...t, balance: newBal, valueUsd: Number((newBal * t.price).toFixed(2)) };
          }
          return t;
        })
      );

      // Update loan
      setLoans((prev) =>
        prev.map((l) => {
          if (l.id === loanId) {
            const newPaid = l.amountRepaid + amount;
            const progress = Math.min(100, Math.round((newPaid / l.totalDue) * 100));
            const status = progress >= 100 ? 'repaid' : 'active';
            return {
              ...l,
              amountRepaid: newPaid,
              repaymentProgress: progress,
              status,
            };
          }
          return l;
        })
      );

      setCurrentBorrowed((prev) => Math.max(0, prev - amount));
      setAvailableCredit((prev) => prev + amount);

      // Reward on-time repayment with Trust Score boost!
      setTrustScore((prev) => Math.min(1000, prev + 6));
      setTrustTimeline((prev) => [
        {
          id: `tl-${Date.now()}`,
          change: '+6',
          reason: `On-time loan installment repaid ($${amount} USDC)`,
          timestamp: 'Just now',
          category: 'repayment',
          positive: true,
        },
        ...prev,
      ]);

      const newTx: Transaction = {
        id: `tx-${Date.now()}`,
        type: 'loan_repayment',
        title: 'Loan Repayment',
        asset: 'USDC',
        amount: -amount,
        valueUsd: amount,
        status: 'Completed',
        date: 'Just now',
        timestamp: Date.now(),
        txHash,
        from: address,
        to: 'NexaFi Lending Pool',
        network,
        gasFee: 0.18,
        category: 'Lending',
      };

      setTransactions((prev) => [newTx, ...prev]);

      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10B981', '#34D399', '#6366F1'],
        });
      } catch {
        // Fallback
      }

      addToast({
        type: 'success',
        title: 'Loan Repaid (+6 Trust Score)',
        message: `Repaid $${amount.toLocaleString()} USDC. Your Trust Score increased to ${Math.min(1000, trustScore + 6)}!`,
        txHash,
      });

      return true;
    },
    [tokens, address, network, trustScore, addToast]
  );

  const createTrustCircle = useCallback(
    async (name: string, description: string, category: string, stake: number): Promise<boolean> => {
      const usdc = tokens.find((t) => t.symbol === 'USDC');
      if (!usdc || usdc.balance < stake) {
        addToast({
          type: 'error',
          title: 'Insufficient Deposit',
          message: `Staking ${stake} USDC is required to establish this circle.`,
        });
        return false;
      }

      const txHash = `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`;
      const circleId = `circle-${Date.now()}`;

      // Deduct stake
      setTokens((prev) =>
        prev.map((t) => {
          if (t.symbol === 'USDC') {
            const newBal = t.balance - stake;
            return { ...t, balance: newBal, valueUsd: Number((newBal * t.price).toFixed(2)) };
          }
          return t;
        })
      );

      const newCircle: TrustCircle = {
        id: circleId,
        name,
        description,
        category,
        membersCount: 1,
        circleTrust: 95,
        activeLoans: 0,
        repaymentRate: 100,
        totalCapitalPooled: stake,
        userIsMember: true,
        userRole: 'Founder',
        members: [
          {
            id: `m-${Date.now()}`,
            address,
            ensName,
            name: 'Alex Vance (You)',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
            trustScore,
            contribution: stake,
            status: 'Founder',
            joinedDate: 'Just now',
            loansCompleted: 4,
          },
        ],
      };

      setCircles((prev) => [newCircle, ...prev]);

      // Boost trust score
      setTrustScore((prev) => Math.min(1000, prev + 10));

      const newTx: Transaction = {
        id: `tx-${Date.now()}`,
        type: 'circle_contribution',
        title: `Founded Circle: ${name}`,
        asset: 'USDC',
        amount: -stake,
        valueUsd: stake,
        status: 'Completed',
        date: 'Just now',
        timestamp: Date.now(),
        txHash,
        from: address,
        to: `${name} Vault`,
        network,
        gasFee: 0.35,
        category: 'Lending',
      };

      setTransactions((prev) => [newTx, ...prev]);

      addToast({
        type: 'success',
        title: 'Trust Circle Created',
        message: `Successfully founded "${name}" with ${stake} USDC initial reserve.`,
        txHash,
      });

      return true;
    },
    [tokens, address, ensName, trustScore, network, addToast]
  );

  const joinTrustCircle = useCallback(
    async (circleId: string, stake: number): Promise<boolean> => {
      const usdc = tokens.find((t) => t.symbol === 'USDC');
      if (!usdc || usdc.balance < stake) {
        addToast({
          type: 'error',
          title: 'Insufficient Balance',
          message: `Staking ${stake} USDC is required to join this circle.`,
        });
        return false;
      }

      setTokens((prev) =>
        prev.map((t) => {
          if (t.symbol === 'USDC') {
            const newBal = t.balance - stake;
            return { ...t, balance: newBal, valueUsd: Number((newBal * t.price).toFixed(2)) };
          }
          return t;
        })
      );

      setCircles((prev) =>
        prev.map((c) => {
          if (c.id === circleId) {
            return {
              ...c,
              membersCount: c.membersCount + 1,
              totalCapitalPooled: c.totalCapitalPooled + stake,
              userIsMember: true,
              userRole: 'Member',
            };
          }
          return c;
        })
      );

      setTrustScore((prev) => Math.min(1000, prev + 8));

      addToast({
        type: 'success',
        title: 'Joined Trust Circle',
        message: `Successfully joined circle and staked ${stake} USDC as mutual guarantee.`,
      });

      return true;
    },
    [tokens, addToast]
  );

  const resetToDefaults = useCallback(() => {
    localStorage.removeItem('nexafi_state_v1');
    setTokens(INITIAL_TOKENS);
    setLoans(INITIAL_LOANS);
    setCircles(INITIAL_CIRCLES);
    setTransactions(INITIAL_TRANSACTIONS);
    setTrustScore(TRUST_SCORE);
    setAvailableCredit(AVAILABLE_CREDIT);
    setCurrentBorrowed(CURRENT_BORROWED);
    setRepaymentProgress(REPAYMENT_PROGRESS);
    setAddress(DEMO_ADDRESS);
    setNetwork('Ethereum');
    setIsConnected(true);
    setIsDemo(true);
    addToast({
      type: 'info',
      title: 'State Reset',
      message: 'Restored original demo dataset.',
    });
  }, [addToast]);

  return (
    <Web3Context.Provider
      value={{
        isConnected,
        isDemo,
        address,
        ensName,
        network,
        tokens,
        totalBalance,
        trustScore,
        trustRating,
        availableCredit,
        currentBorrowed,
        repaymentProgress,
        trustFactors,
        trustTimeline,
        loans,
        circles,
        transactions,
        connectDemoWallet,
        connectInjectedWallet,
        disconnectWallet,
        switchNetwork,
        sendTokens,
        swapTokens,
        depositFunds,
        requestLoan,
        repayLoan,
        createTrustCircle,
        joinTrustCircle,
        resetToDefaults,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}

export function useWeb3() {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
}

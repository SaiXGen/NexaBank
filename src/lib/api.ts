import {
  UserProfileDto,
  WalletDto,
  TrustScoreDto,
  TrustCircleDto,
  LoansOverviewDto,
  LoanDto,
  CreateTrustCircleRequest,
  CreateLoanRequest,
  AiChatDto,
  ApiResponse,
} from '@/types/api';

class ApiClient {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const res = await fetch(endpoint, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    const data = await res.json();
    if (!res.ok) {
      const errorMsg = data?.error?.message || 'API request failed';
      throw new Error(errorMsg);
    }

    // Unpack jsonOk envelope if present
    if (data && typeof data === 'object' && 'data' in data && data.success === true) {
      return data.data as T;
    }

    return data as T;
  }

  // 1. User
  user = {
    get: () => this.request<UserProfileDto>('/api/user'),
  };

  // 2. Wallet
  wallet = {
    get: () => this.request<WalletDto>('/api/wallet'),
  };

  // 3. Transactions
  transactions = {
    get: (params?: { category?: string; status?: string; asset?: string }) => {
      const search = new URLSearchParams();
      if (params?.category) search.set('category', params.category);
      if (params?.status) search.set('status', params.status);
      if (params?.asset) search.set('asset', params.asset);
      const query = search.toString();
      return this.request<any[]>(`/api/transactions${query ? `?${query}` : ''}`);
    },
  };

  // 4. Portfolio
  portfolio = {
    get: (timeframe = '30D') =>
      this.request<{
        totalValue: number;
        change24h: number;
        timeframe: string;
        tokens: any[];
        chartData: any[];
      }>(`/api/portfolio?timeframe=${timeframe}`),
  };

  // 5. Trust Score
  trustScore = {
    get: () => this.request<TrustScoreDto>('/api/trust-score'),
  };

  // 6. Trust Circles
  trustCircles = {
    get: () => this.request<TrustCircleDto[]>('/api/trust-circles'),
    create: (data: CreateTrustCircleRequest) =>
      this.request<TrustCircleDto>('/api/trust-circles', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  };

  // 7. Loans
  loans = {
    get: () => this.request<LoansOverviewDto>('/api/loans'),
    create: (data: CreateLoanRequest) =>
      this.request<LoanDto>('/api/loans', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    repay: (loanId: string, amount: number) =>
      this.request<LoanDto>(`/api/loans/${loanId}/repay`, {
        method: 'POST',
        body: JSON.stringify({ amount }),
      }),
  };

  // 8. AI Copilot
  ai = {
    chat: (message: string) =>
      this.request<AiChatDto>('/api/ai', {
        method: 'POST',
        body: JSON.stringify({ message }),
      }),
  };
}

export const api = new ApiClient();

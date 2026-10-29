'use client';

import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';
import { TrustScoreDto } from '@/types/api';

export function useTrustScore() {
  const [trustScore, setTrustScore] = useState<TrustScoreDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchScore = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.trustScore.get();
      setTrustScore(data);
    } catch (err: unknown) {
      const e = err as Error;
      setError(e.message || 'Failed to load trust score metrics');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchScore();
  }, [fetchScore]);

  return {
    trustScore,
    isLoading,
    error,
    refetch: fetchScore,
  };
}

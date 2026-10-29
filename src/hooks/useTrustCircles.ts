'use client';

import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';
import { TrustCircleDto, CreateTrustCircleRequest } from '@/types/api';
import { useToast } from '@/context/ToastContext';

export function useTrustCircles() {
  const { addToast } = useToast();
  const [circles, setCircles] = useState<TrustCircleDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCircles = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.trustCircles.get();
      setCircles(data);
    } catch (err: unknown) {
      const e = err as Error;
      setError(e.message || 'Failed to load trust circles');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCircles();
  }, [fetchCircles]);

  const createCircle = useCallback(
    async (requestData: CreateTrustCircleRequest): Promise<boolean> => {
      setIsSubmitting(true);
      try {
        const newCircle = await api.trustCircles.create(requestData);

        // Update UI state reactively without page reload
        setCircles((prev) => [newCircle, ...prev]);

        addToast({
          type: 'success',
          title: 'Trust Circle Established',
          message: `Successfully founded "${newCircle.name}" with $${newCircle.totalCapitalPooled.toLocaleString()} USDC staked guarantee.`,
        });

        return true;
      } catch (err: unknown) {
        const e = err as Error;
        addToast({
          type: 'error',
          title: 'Failed to Create Circle',
          message: e.message || 'Could not deploy trust circle.',
        });
        return false;
      } finally {
        setIsSubmitting(false);
      }
    },
    [addToast]
  );

  return {
    circles,
    isLoading,
    isSubmitting,
    error,
    createCircle,
    refetch: fetchCircles,
  };
}

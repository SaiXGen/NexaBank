import { z } from 'zod';

// Trust Circle Validation Schema
export const createTrustCircleSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name must not exceed 50 characters'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must not exceed 500 characters'),
  category: z
    .string()
    .min(2, 'Category is required'),
  stakeAmount: z
    .number()
    .min(500, 'Minimum stake amount is 500 USDC')
    .max(1000000, 'Maximum stake amount exceeded'),
});

// Loan Request Validation Schema
export const createLoanSchema = z.object({
  principalAmount: z
    .number()
    .min(100, 'Minimum loan amount is 100 USDC')
    .max(15000, 'Maximum uncollateralized limit is 15,000 USDC'),
  durationDays: z
    .number()
    .refine((val) => [30, 60, 90, 180, 365].includes(val), {
      message: 'Duration must be 30, 60, 90, 180, or 365 days',
    }),
  purpose: z
    .string()
    .min(5, 'Purpose must be at least 5 characters')
    .max(120, 'Purpose must not exceed 120 characters'),
  collateralAmount: z
    .number()
    .min(0, 'Collateral amount cannot be negative')
    .default(0),
});

// Loan Repayment Validation Schema
export const repayLoanSchema = z.object({
  amount: z
    .number()
    .positive('Repayment amount must be greater than zero')
    .max(50000, 'Single repayment amount exceeds maximum limit'),
});

// AI Chat Request Validation Schema
export const aiChatSchema = z.object({
  message: z
    .string()
    .min(1, 'Message cannot be empty')
    .max(1500, 'Message cannot exceed 1500 characters'),
});

import { z } from 'zod';

export const financialAssetSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  symbol: z.string(),
  balance: z.number(),
  valueInBaseCurrency: z.number(),
  type: z.enum(['fiat', 'crypto', 'stock']),
  lastUpdated: z.date(),
});

export type FinancialAsset = z.infer<typeof financialAssetSchema>;

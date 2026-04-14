const randomDelayMs = () => Math.floor(Math.random() * 401) + 200;

const withRandomDelay = <T>(data: T): Promise<T> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(data), randomDelayMs());
  });

export async function fetchBankData() {
  const rawBankAssets = [
    {
      bank_id: '3f7fd59a-66d7-4f80-a130-2d040553b93a',
      asset_name: 'Emergency Savings',
      ticker: 'USD',
      amount: 5400.75,
      value_base: 5400.75,
      category: 'fiat',
      updated_at: new Date('2026-04-14T08:15:00.000Z'),
    },
    {
      bank_id: '8f925a74-e739-4d6d-b8c7-c93dc8cf4d49',
      asset_name: 'Travel Fund',
      ticker: 'EUR',
      amount: 2200.1,
      value_base: 2385.6,
      category: 'fiat',
      updated_at: new Date('2026-04-14T08:18:00.000Z'),
    },
  ];

  return withRandomDelay(rawBankAssets);
}

export async function fetchCryptoData() {
  const rawCryptoAssets = [
    {
      uid: '4a13da00-4f73-4c58-9a0a-6eb8e6ed88b0',
      display_name: 'Bitcoin',
      coin_symbol: 'BTC',
      total_coins: 0.32,
      valuation_in_base: 19750.4,
      asset_class: 'crypto',
      refreshed_on: new Date('2026-04-14T08:19:00.000Z'),
    },
    {
      uid: 'f2f50111-2ce8-46d1-a14f-8f1453f8f786',
      display_name: 'Ethereum',
      coin_symbol: 'ETH',
      total_coins: 2.4,
      valuation_in_base: 7200.15,
      asset_class: 'crypto',
      refreshed_on: new Date('2026-04-14T08:20:00.000Z'),
    },
    {
      uid: 'af03eb95-60ff-42f6-b5c8-c34bfddb732c',
      display_name: 'Solana',
      coin_symbol: 'SOL',
      total_coins: 25,
      valuation_in_base: 3350.0,
      asset_class: 'crypto',
      refreshed_on: new Date('2026-04-14T08:21:00.000Z'),
    },
  ];

  return withRandomDelay(rawCryptoAssets);
}

export async function fetchStockData() {
  const rawStockAssets = [
    {
      external_id: 'b70cf687-f9e6-4e72-9055-9f6be47ca80e',
      company_name: 'Apple Inc.',
      stock_ticker: 'AAPL',
      shares_held: 16,
      market_value_base: 2792.64,
      instrument_type: 'stock',
      last_sync: new Date('2026-04-14T08:22:00.000Z'),
    },
    {
      external_id: 'f11bf910-6cbc-47e0-a044-df0df1ecb09d',
      company_name: 'Microsoft Corp.',
      stock_ticker: 'MSFT',
      shares_held: 9,
      market_value_base: 3573.81,
      instrument_type: 'stock',
      last_sync: new Date('2026-04-14T08:23:00.000Z'),
    },
    {
      external_id: '7f414d0e-0e08-45f9-a073-65f286ff700c',
      company_name: 'NVIDIA Corp.',
      stock_ticker: 'NVDA',
      shares_held: 7,
      market_value_base: 6124.65,
      instrument_type: 'stock',
      last_sync: new Date('2026-04-14T08:24:00.000Z'),
    },
  ];

  return withRandomDelay(rawStockAssets);
}

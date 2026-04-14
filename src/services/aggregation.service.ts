import { fetchBankData, fetchCryptoData, fetchStockData } from '../providers/mockproviders';
import {
  financialAssetSchema as AssetSchema,
  type FinancialAsset,
} from '../core/schemas/asset.schema';

export class AggregationService {
  async getAllAssets(): Promise<FinancialAsset[]> {
    const [bankAssets, cryptoAssets, stockAssets] = await Promise.all([
      this.safeFetch(fetchBankData),
      this.safeFetch(fetchCryptoData),
      this.safeFetch(fetchStockData),
    ]);

    return [...bankAssets, ...cryptoAssets, ...stockAssets]
      .map((rawAsset) => this.normalize(rawAsset))
      .filter((asset): asset is FinancialAsset => asset !== null);
  }

  async getTotalWealth(): Promise<number> {
    const assets = await this.getAllAssets();
    return assets.reduce((total, asset) => total + asset.valueInBaseCurrency, 0);
  }

  private async safeFetch(fetcher: () => Promise<unknown[]>): Promise<unknown[]> {
    try {
      return await fetcher();
    } catch (error) {
      console.error('Provider fetch failed:', error);
      return [];
    }
  }

  private normalize(rawAsset: unknown): FinancialAsset | null {
    if (!rawAsset || typeof rawAsset !== 'object') {
      return null;
    }

    const raw = rawAsset as Record<string, unknown>;
    const normalized = {
      id: raw.bank_id ?? raw.uid ?? raw.external_id,
      name: raw.asset_name ?? raw.display_name ?? raw.company_name,
      symbol: raw.ticker ?? raw.coin_symbol ?? raw.stock_ticker,
      balance: raw.amount ?? raw.total_coins ?? raw.shares_held,
      valueInBaseCurrency:
        raw.value_base ?? raw.valuation_in_base ?? raw.market_value_base,
      type: raw.category ?? raw.asset_class ?? raw.instrument_type,
      lastUpdated: raw.updated_at ?? raw.refreshed_on ?? raw.last_sync,
    };

    try {
      return AssetSchema.parse(normalized);
    } catch (error) {
      console.error('Invalid asset payload skipped:', error);
      return null;
    }
  }
}

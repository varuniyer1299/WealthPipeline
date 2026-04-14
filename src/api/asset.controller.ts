import { Router, type Request, type Response } from "express";
import { AggregationService } from "../services/aggregation.service";

const assetRouter = Router();
const aggregationService = new AggregationService();

assetRouter.get("/assets", async (_req: Request, res: Response) => {
  try {
    const assets = await aggregationService.getAllAssets();
    return res.status(200).json({ assets });
  } catch (error) {
    console.error("Failed to fetch assets:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

assetRouter.get("/summary", async (_req: Request, res: Response) => {
  try {
    const assets = await aggregationService.getAllAssets();
    const totalWealth = assets.reduce(
      (total, asset) => total + asset.valueInBaseCurrency,
      0
    );

    return res.status(200).json({
      totalWealth,
      assetCount: assets.length,
    });
  } catch (error) {
    console.error("Failed to fetch summary:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export { assetRouter };

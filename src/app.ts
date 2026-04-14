import dotenv from "dotenv";
import express, { type Request, type Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { assetRouter } from "./api/asset.controller";

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 3000);

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use("/api", assetRouter);

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    service: "WealthPipeline",
    status: "ok",
    timestamp: new Date().toISOString()
  });
});

app.listen(port, () => {
  console.log(`WealthPipeline API listening on port ${port}`);
});

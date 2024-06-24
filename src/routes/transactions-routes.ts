import { Router } from "express";
import { transfer } from "../http/controllers/transactions-controller";

export const transactionsRoutes = Router();

transactionsRoutes.post("/transfer", transfer);

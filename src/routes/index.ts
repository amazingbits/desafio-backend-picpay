import { Router } from "express";
import { userRoutes } from "./user-routes";
import { transactionsRoutes } from "./transactions-routes";

export const routes = Router();

routes.use("/user", userRoutes);
routes.use("/transactions", transactionsRoutes);

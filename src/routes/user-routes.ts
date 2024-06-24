import { Router } from "express";
import { register } from "../http/controllers/user-controller";

export const userRoutes = Router();

userRoutes.post("/register", register);

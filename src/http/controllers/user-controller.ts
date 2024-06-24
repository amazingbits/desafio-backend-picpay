import { Request, Response } from "express";
import { registerUserFactory } from "../../services/factories/register-user-factory";

export const register = async (req: Request, res: Response) => {
  const registerUser = registerUserFactory();
  await registerUser.execute(req.body);
  return res.status(201).json({
    message: "User created successfully",
  });
};

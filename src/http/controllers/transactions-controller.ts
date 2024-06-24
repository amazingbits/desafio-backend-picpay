import { Request, Response } from "express";
import { makeTransactionFactory } from "../../services/factories/make-transaction-factory";

export const transfer = async (req: Request, res: Response) => {
  const makeTransaction = makeTransactionFactory();
  const transaction = await makeTransaction.execute(req.body);
  return res.json(transaction);
};

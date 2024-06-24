import { PrismaTransactionsRepository } from "../../repositories/prisma/prisma-transactions-repository";
import { PrismaUserRepository } from "../../repositories/prisma/prisma-user-repository";
import { PrismaUserTypeRepository } from "../../repositories/prisma/prisma-user-type-repository";
import { MakeTransactionService } from "../make-transaction-service";

export const makeTransactionFactory = () => {
  const userRepository = new PrismaUserRepository();
  const userTypeRepository = new PrismaUserTypeRepository();
  const transactionsRepository = new PrismaTransactionsRepository();

  const makeTransactionService = new MakeTransactionService(userRepository, userTypeRepository, transactionsRepository);

  return makeTransactionService;
};

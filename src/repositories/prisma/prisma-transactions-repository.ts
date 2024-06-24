import { prisma } from "../../lib/prisma";
import { Prisma, Transactions } from "@prisma/client";
import { TransactionsRepository } from "../transactions-repository";

export class PrismaTransactionsRepository implements TransactionsRepository {
  async create(params: Prisma.TransactionsUncheckedCreateInput): Promise<Transactions> {
    const transaction = await prisma.transactions.create({ data: params });
    return transaction;
  }
}

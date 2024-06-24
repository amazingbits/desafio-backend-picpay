import { Transactions, Prisma } from "@prisma/client";

export interface TransactionsRepository {
  create(params: Prisma.TransactionsUncheckedCreateInput): Promise<Transactions>;
}

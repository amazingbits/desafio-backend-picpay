import { Prisma, User } from "@prisma/client";

export interface UserRepository {
  create(params: Prisma.UserUncheckedCreateInput): Promise<User>;
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByDocumentNumber(documentNumber: string): Promise<User | null>;
  updateBalance(user: User, balance: number): Promise<User | null>;
}

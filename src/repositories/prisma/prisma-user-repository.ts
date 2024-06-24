import { prisma } from "../../lib/prisma";
import { UserRepository } from "../user-repository";
import { Prisma, User } from "@prisma/client";

export class PrismaUserRepository implements UserRepository {
  async create(params: Prisma.UserUncheckedCreateInput): Promise<User> {
    const user = await prisma.user.create({ data: params });
    return user;
  }

  async findById(id: number): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  }

  async findByDocumentNumber(documentNumber: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { document: documentNumber } });
    return user;
  }

  async updateBalance(user: User, balance: number): Promise<User | null> {
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { balance },
    });
    return updatedUser;
  }
}

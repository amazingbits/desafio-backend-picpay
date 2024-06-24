import { prisma } from "../../lib/prisma";
import { UserType } from "@prisma/client";
import { UserTypeRepository } from "../user-type-repository";

export class PrismaUserTypeRepository implements UserTypeRepository {
  async findById(id: number): Promise<UserType> {
    return await prisma.userType.findUnique({
      where: { id },
    });
  }
}

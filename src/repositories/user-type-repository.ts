import { UserType } from "@prisma/client";

export interface UserTypeRepository {
  findById(id: number): Promise<UserType>;
}

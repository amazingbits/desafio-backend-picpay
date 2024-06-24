import { hash } from "bcrypt";
import { UserRepository } from "../repositories/user-repository";
import { RegisterUserRequest, RegisterUserRequestProps } from "../http/requests/register-user-request";
import InvalidRequestParamsError from "./errors/invalid-request-params-error";
import { UserTypeRepository } from "../repositories/user-type-repository";

export class RegisterUserService {
  constructor(private userRepository: UserRepository, private userTypeRepository: UserTypeRepository) {}

  async execute(params: RegisterUserRequestProps) {
    const validate = RegisterUserRequest.validate(params);
    if (!validate) {
      throw new InvalidRequestParamsError({
        context: { errors: RegisterUserRequest.getErrors() },
      });
    }

    const passwordHash = await hash(params.password, 10);
    params.password = passwordHash;

    const userWithSameEmail = await this.userRepository.findByEmail(params.email);
    if (userWithSameEmail) {
      throw new InvalidRequestParamsError({
        context: { errors: ["Email already in use"] },
      });
    }

    const userWithSameDocument = await this.userRepository.findByDocumentNumber(params.document);
    if (userWithSameDocument) {
      throw new InvalidRequestParamsError({
        context: { errors: ["Document number (cpf or cnpj) already in use"] },
      });
    }

    const getUserTypeById = await this.userTypeRepository.findById(params.user_type_id);
    if (!getUserTypeById) {
      throw new InvalidRequestParamsError({
        context: { errors: ["User type not found"] },
      });
    }

    params = { ...params, document: params.document.replace(/[^\d]/g, "") };

    const user = await this.userRepository.create(params);
    return user;
  }
}

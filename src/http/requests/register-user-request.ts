import { HandleRequestRules } from "../../utils/handle-request-rules";
import { getDocumentType } from "../../utils/get-document-type";
import { RequestBase } from "./request-base";

export type RegisterUserRequestProps = {
  name: string;
  document: string;
  email: string;
  password: string;
  user_type_id: number;
  balance?: number;
};

export class RegisterUserRequest extends RequestBase {
  public static validate(request: RegisterUserRequestProps): boolean {
    this.errors = [];
    this.errorCounter = 0;

    const rulesHandler = new HandleRequestRules();

    const name = rulesHandler.setItem(request.name, "name").required().type("string");
    if (!name.validate()) {
      this.errors.push(...this.errors, ...rulesHandler.getErrors());
      this.errorCounter++;
      return false;
    }

    const documentType = getDocumentType(request.document);

    if (documentType === "unknown") {
      this.errors.push("You must enter with a valid CPF or CNPJ in document field");
      this.errorCounter++;
      return false;
    }

    const document = rulesHandler.setItem(request.document, documentType).required().type("string");

    if (documentType === "cpf") {
      document.cpf();
    } else {
      document.cnpj();
    }

    if (!document.validate()) {
      this.errors.push(...this.errors, ...rulesHandler.getErrors());
      this.errorCounter++;
      return false;
    }

    const email = rulesHandler.setItem(request.email, "email").required().type("string").email();
    if (!email.validate()) {
      this.errors.push(...this.errors, ...rulesHandler.getErrors());
      this.errorCounter++;
      return false;
    }

    const password = rulesHandler.setItem(request.password, "password").required().min(5).type("string");
    if (!password.validate()) {
      this.errors.push(...this.errors, ...rulesHandler.getErrors());
      this.errorCounter++;
      return false;
    }

    const userTypeId = rulesHandler.setItem(request.user_type_id, "userTypeId").required().type("number");
    if (!userTypeId.validate()) {
      this.errors.push(...this.errors, ...rulesHandler.getErrors());
      this.errorCounter++;
      return false;
    }

    if (request.balance) {
      const balance = rulesHandler.setItem(request.balance, "balance").required().type("number");
      if (!balance.validate()) {
        this.errors.push(...this.errors, ...rulesHandler.getErrors());
        this.errorCounter++;
        return false;
      }
    }

    return this.errorCounter === 0;
  }
}

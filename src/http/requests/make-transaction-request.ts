import { HandleRequestRules } from "../../utils/handle-request-rules";
import { RequestBase } from "./request-base";

export type MakeTransactionRequestProps = {
  value: number;
  payer: number;
  payee: number;
};

export class MakeTransactionRequest extends RequestBase {
  public static validate(request: MakeTransactionRequestProps): boolean {
    this.errors = [];
    this.errorCounter = 0;

    const rulesHandler = new HandleRequestRules();

    const value = rulesHandler.setItem(request.value, "value").required().type("number");
    if (!value.validate()) {
      this.errors.push(...this.errors, ...rulesHandler.getErrors());
      this.errorCounter++;
      return false;
    }

    const payer = rulesHandler.setItem(request.payer, "payer").required().type("number");
    if (!payer.validate()) {
      this.errors.push(...this.errors, ...rulesHandler.getErrors());
      this.errorCounter++;
      return false;
    }

    const payee = rulesHandler.setItem(request.payee, "payee").required().type("number");
    if (!payee.validate()) {
      this.errors.push(...this.errors, ...rulesHandler.getErrors());
      this.errorCounter++;
      return false;
    }

    return true;
  }
}

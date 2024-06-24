import { MakeTransactionRequest, MakeTransactionRequestProps } from "../http/requests/make-transaction-request";
import { TransactionsRepository } from "../repositories/transactions-repository";
import { UserRepository } from "../repositories/user-repository";
import { UserTypeRepository } from "../repositories/user-type-repository";
import { notifyUser } from "../utils/notify-users";
import { verifyTransferAuthorization } from "../utils/verify-transfer-authorization";
import InvalidRequestParamsError from "./errors/invalid-request-params-error";

export class MakeTransactionService {
  constructor(
    private userRepository: UserRepository,
    private userTypeRepository: UserTypeRepository,
    private transactionsRepository: TransactionsRepository
  ) {}

  async execute(params: MakeTransactionRequestProps) {
    const validate = MakeTransactionRequest.validate(params);
    if (!validate) {
      throw new InvalidRequestParamsError({
        context: { errors: MakeTransactionRequest.getErrors() },
      });
    }

    const payer = await this.userRepository.findById(params.payer);

    if (!payer) {
      throw new InvalidRequestParamsError({
        context: { error: "payer not found" },
      });
    }

    const payee = await this.userRepository.findById(params.payee);
    if (!payee) {
      throw new InvalidRequestParamsError({
        context: { error: "payee not found" },
      });
    }

    const payerType = await this.userTypeRepository.findById(payer.user_type_id);

    if (payerType.description === "shopkeeper") {
      throw new InvalidRequestParamsError({
        context: { error: "shopkeepers cannot make transfers" },
      });
    }

    const payerBalance = Number(payer.balance);

    if (payerBalance < params.value) {
      throw new InvalidRequestParamsError({
        context: { error: "insufficient funds to transfer" },
      });
    }

    const { data } = await verifyTransferAuthorization();
    if (!data.authorization) {
      throw new InvalidRequestParamsError({
        context: { error: "authorization for transfer failed" },
      });
    }

    const notifyUsers = await notifyUser();

    let transaction = null;
    try {
      transaction = await this.transactionsRepository.create({
        value: params.value,
        payer_id: params.payer,
        payee_id: params.payee,
      });

      const payerNewBalance = payer.balance - params.value;
      const payeeNewBalance = payee.balance + params.value;
      await this.userRepository.updateBalance(payer, payerNewBalance);
      await this.userRepository.updateBalance(payee, payeeNewBalance);
    } catch (err) {
      const payerNewBalance = payer.balance + params.value;
      const payeeNewBalance = payee.balance - params.value;
      await this.userRepository.updateBalance(payer, payerNewBalance);
      await this.userRepository.updateBalance(payee, payeeNewBalance);
    }

    return {
      transaction,
      authorization: data,
      notification: notifyUsers,
    };
  }
}

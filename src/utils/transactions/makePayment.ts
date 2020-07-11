import { ColonyClient } from "@colony/colony-js";
import { Interface, BigNumberish } from "ethers/utils";
import { Transaction } from "../../typings";

const makePaymentTxs = (
  colonyClient: ColonyClient,
  permissionDomainId: BigNumberish,
  childSkillIndex: BigNumberish,
  callerPermissionDomainId: BigNumberish,
  callerChildSkillIndex: BigNumberish,
  recipient: string,
  token: string,
  amount: BigNumberish,
  domainId: BigNumberish,
  skillId: BigNumberish,
): Transaction[] => {
  const oneTxPaymentClient = colonyClient.oneTxPaymentClient;
  const oneTxPaymentInterface: Interface = oneTxPaymentClient.interface;

  const txs: Transaction[] = [];

  txs.push({
    data: oneTxPaymentInterface.functions.makePaymentFundedFromDomain.encode([
      permissionDomainId,
      childSkillIndex,
      callerPermissionDomainId,
      callerChildSkillIndex,
      [recipient],
      [token],
      [amount],
      domainId,
      skillId,
    ]),
    to: oneTxPaymentClient.address,
    value: 0,
  });

  return txs;
};

export default makePaymentTxs;

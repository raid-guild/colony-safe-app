import { ColonyClient } from "@colony/colony-js";
import { Interface, BigNumberish } from "ethers/utils";
import { Transaction } from "../../typings";

const addPaymentTxs = (
  colonyClient: ColonyClient,
  permissionDomainId: number,
  childSkillIndex: number,
  token: string,
  amount: BigNumberish,
  domainId: number,
  skillId: number,
): Transaction[] => {
  const colonyInterface: Interface = colonyClient.interface;

  const txs: Transaction[] = [];

  txs.push({
    data: colonyInterface.functions.addPayment.encode([
      permissionDomainId,
      childSkillIndex,
      token,
      amount,
      domainId,
      skillId,
    ]),
    to: colonyClient.address,
    value: 0,
  });

  return txs;
};

export default addPaymentTxs;

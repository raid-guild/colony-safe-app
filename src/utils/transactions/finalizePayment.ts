import { ColonyClient } from "@colony/colony-js";
import { Interface } from "ethers/utils";
import { Transaction } from "../../typings";

const finalizePaymentTxs = (
  colonyClient: ColonyClient,
  permissionDomainId: number,
  childSkillIndex: number,
  paymentId: number,
): Transaction[] => {
  const colonyInterface: Interface = colonyClient.interface;

  const txs: Transaction[] = [];

  txs.push({
    data: colonyInterface.functions.finalizePayment.encode([permissionDomainId, childSkillIndex, paymentId]),
    to: colonyClient.address,
    value: 0,
  });

  return txs;
};

export default finalizePaymentTxs;

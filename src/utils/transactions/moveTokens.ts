import { ColonyClient } from "@colony/colony-js";
import { Interface, BigNumber } from "ethers/utils";
import { Transaction } from "../../typings";

const moveTokenTxs = (
  colonyClient: ColonyClient,
  permissionDomainId: BigNumber,
  fromChildSkillIndex: BigNumber,
  toChildSkillIndex: BigNumber,
  token: string,
  amount: string,
  fromPot: BigNumber,
  toPot: BigNumber,
): Transaction[] => {
  const colonyInterface: Interface = colonyClient.interface;

  const txs: Transaction[] = [];

  txs.push({
    data: colonyInterface.functions.moveFundsBetweenPots.encode([
      permissionDomainId,
      fromChildSkillIndex,
      toChildSkillIndex,
      fromPot,
      toPot,
      amount,
      token,
    ]),
    to: colonyClient.address,
    value: 0,
  });

  return txs;
};

export default moveTokenTxs;

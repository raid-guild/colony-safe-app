import { ColonyClient } from "@colony/colony-js";
import { Interface, BigNumber } from "ethers/utils";
import { Transaction } from "../../typings";

const moveTokenTxs = (
  colonyClient: ColonyClient,
  token: string,
  amount: BigNumber,
  fromPot: number,
  toPot: number,
): Transaction[] => {
  const colonyInterface: Interface = colonyClient.interface;

  const txs: Transaction[] = [];

  txs.push({
    data: colonyInterface.functions.moveFundsBetweenPots.encode([fromPot, toPot, amount, token]),
    to: colonyClient.address,
    value: 0,
  });

  return txs;
};

export default moveTokenTxs;

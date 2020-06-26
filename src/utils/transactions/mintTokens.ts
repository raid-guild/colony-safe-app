import { ColonyClient } from "@colony/colony-js";
import { Interface, BigNumber } from "ethers/utils";
import { Transaction } from "../../typings";

const mintTokenTxs = (colonyClient: ColonyClient, amount: BigNumber): Transaction[] => {
  const colonyInterface: Interface = colonyClient.interface;

  const txs: Transaction[] = [];

  txs.push({
    data: colonyInterface.functions.mintTokens.encode([amount]),
    to: colonyClient.address,
    value: 0,
  });

  return txs;
};

export default mintTokenTxs;

import { ColonyClient } from "@colony/colony-js";
import { Interface, BigNumber } from "ethers/utils";
import { Transaction } from "../../typings";

const setRewardInverseTxs = (colonyClient: ColonyClient, rewardInverse: BigNumber): Transaction[] => {
  const colonyInterface: Interface = colonyClient.interface;

  const txs: Transaction[] = [];

  txs.push({
    data: colonyInterface.functions.setRewardInverse.encode([rewardInverse]),
    to: colonyClient.address,
    value: 0,
  });

  return txs;
};

export default setRewardInverseTxs;

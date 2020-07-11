import { ColonyClient } from "@colony/colony-js";
import { Interface } from "ethers/utils";
import { Transaction } from "../../../typings";
import getReputationProof from "../../colony/getReputationProof";

const startPayoutRoundTxs = async (
  colonyClient: ColonyClient,
  token: string,
  userAddress: string,
): Promise<Transaction[]> => {
  const colonyInterface: Interface = colonyClient.interface;
  const { key, value, branchMask, siblings } = await getReputationProof(colonyClient, userAddress);
  const txs: Transaction[] = [];

  txs.push({
    data: colonyInterface.functions.startNextRewardPayout.encode([token, key, value, branchMask, siblings]),
    to: colonyClient.address,
    value: 0,
  });

  return txs;
};

export default startPayoutRoundTxs;

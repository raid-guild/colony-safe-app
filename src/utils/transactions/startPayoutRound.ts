import { ColonyClient } from "@colony/colony-js";
import { Interface } from "ethers/utils";
import { Transaction } from "../../typings";

const getReputationProof = async (colonyClient: ColonyClient, userAddress: string) => {
  const { skillId } = await colonyClient.getDomain(1);
  return colonyClient.getReputation(skillId, userAddress);
};

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

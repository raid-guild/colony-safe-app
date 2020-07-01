import { ColonyClient } from "@colony/colony-js";
import { Interface } from "ethers/utils";
import { Transaction } from "../../../typings";

const incrementLockCounterToTxs = async (
  colonyClient: ColonyClient,
  token: string,
  lockId: number,
): Promise<Transaction[]> => {
  const tokenLockingClient = await colonyClient.networkClient.getTokenLockingClient();
  const tokenLockingInterface: Interface = tokenLockingClient.interface;

  const txs: Transaction[] = [];

  txs.push({
    data: tokenLockingInterface.functions.incrementLockCounterTo.encode([token, lockId]),
    to: tokenLockingClient.address,
    value: 0,
  });

  return txs;
};

export default incrementLockCounterToTxs;

import { ColonyClient, getTokenClient } from "@colony/colony-js";
import { Interface, BigNumberish } from "ethers/utils";
import { Transaction } from "../../../typings";

const depositTxs = async (colonyClient: ColonyClient, token: string, amount: BigNumberish): Promise<Transaction[]> => {
  const tokenLockingClient = await colonyClient.networkClient.getTokenLockingClient();
  const tokenLockingInterface: Interface = tokenLockingClient.interface;

  const tokenClient = getTokenClient(token, colonyClient.provider);
  const txs: Transaction[] = [];

  txs.push({
    data: tokenClient.interface.functions.approve.encode([tokenLockingClient.address, amount]),
    to: tokenClient.address,
    value: 0,
  });

  txs.push({
    data: tokenLockingInterface.functions.deposit.encode([token, amount]),
    to: tokenLockingClient.address,
    value: 0,
  });

  return txs;
};

export default depositTxs;

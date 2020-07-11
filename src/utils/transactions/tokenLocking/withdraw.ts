import { ColonyClient } from "@colony/colony-js";
import { Interface, BigNumberish } from "ethers/utils";
import { Transaction } from "../../../typings";

const withdrawTxs = async (colonyClient: ColonyClient, token: string, amount: BigNumberish): Promise<Transaction[]> => {
  const tokenLockingClient = await colonyClient.networkClient.getTokenLockingClient();
  const tokenLockingInterface: Interface = tokenLockingClient.interface;

  const txs: Transaction[] = [];

  txs.push({
    data: tokenLockingInterface.functions.withdraw.encode([token, amount]),
    to: tokenLockingClient.address,
    value: 0,
  });

  return txs;
};

export default withdrawTxs;

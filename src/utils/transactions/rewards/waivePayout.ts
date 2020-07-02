import { ColonyClient } from "@colony/colony-js";
import { Transaction, PayoutInfo } from "../../../typings";

const waivePayoutTxs = async (
  colonyClient: ColonyClient,
  userAddress: string,
  payout: PayoutInfo,
): Promise<Transaction[]> => {
  const tokenLockingClient = await colonyClient.networkClient.getTokenLockingClient();
  const { lockCount } = await tokenLockingClient.getUserLock(payout.tokenAddress, userAddress);

  const txs: Transaction[] = [];

  txs.push({
    data: tokenLockingClient.interface.functions.incrementLockCounterTo.encode([payout.tokenAddress, lockCount.add(1)]),
    to: tokenLockingClient.address,
    value: 0,
  });

  return txs;
};

export default waivePayoutTxs;

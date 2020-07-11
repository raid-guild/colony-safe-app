import { ColonyClient } from "@colony/colony-js";
import { Interface, BigNumber } from "ethers/utils";
import { Zero } from "ethers/constants";
import { Transaction, PayoutInfo } from "../../../typings";
import getReputationProof from "../../colony/getReputationProof";

const bnSqrt = (bn: BigNumber, isGreater?: boolean) => {
  let a = bn.add(1).div(2);
  let b = bn;
  while (a.lt(b)) {
    b = a;
    a = bn
      .div(a)
      .add(a)
      .div(2);
  }
  if (isGreater && b.mul(b).lt(bn)) {
    b = b.add(1);
  }
  return b;
};

const calculateSquareRoots = (
  amount: BigNumber,
  balance: BigNumber,
  totalTokens: BigNumber,
  reputationAmount: BigNumber,
  totalReputation: BigNumber,
) => {
  const squareRoots: BigNumber[] = [Zero, Zero, Zero, Zero, Zero, Zero, Zero];
  squareRoots[0] = bnSqrt(reputationAmount);
  squareRoots[1] = bnSqrt(balance);
  squareRoots[2] = bnSqrt(totalReputation, true);
  squareRoots[3] = bnSqrt(totalTokens, true);
  squareRoots[4] = bnSqrt(squareRoots[0].mul(squareRoots[1]));
  squareRoots[5] = bnSqrt(squareRoots[2].mul(squareRoots[3]), true);
  squareRoots[6] = bnSqrt(amount);
  return squareRoots;
};

const claimPayoutTxs = async (
  colonyClient: ColonyClient,
  userAddress: string,
  payout: PayoutInfo,
): Promise<Transaction[]> => {
  const colonyInterface: Interface = colonyClient.interface;
  const { id, amount, totalTokens, colonyWideReputation } = payout;
  const { key, value, branchMask, siblings, reputationAmount } = await getReputationProof(colonyClient, userAddress);

  const tokenLockingClient = await colonyClient.networkClient.getTokenLockingClient();
  const { balance } = await tokenLockingClient.getUserLock(payout.tokenAddress, userAddress);

  const squareRoots = calculateSquareRoots(amount, balance, totalTokens, reputationAmount, colonyWideReputation);

  const txs: Transaction[] = [];

  txs.push({
    data: colonyInterface.functions.claimRewardPayout.encode([id, squareRoots, key, value, branchMask, siblings]),
    to: colonyClient.address,
    value: 0,
  });

  return txs;
};

export default claimPayoutTxs;

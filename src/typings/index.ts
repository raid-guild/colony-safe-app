import { BigNumberish, BigNumber } from "ethers/utils";

export type Token = {
  address: string;
  decimals: number;
  name: string;
  symbol: string;
};

export type Transaction = {
  data: string;
  to: string;
  value: BigNumberish;
};

export type Domain = {
  skillId: BigNumber;
  fundingPotId: BigNumber;
  domainId: BigNumber;
  0: BigNumber;
  1: BigNumber;
  2: BigNumber;
};

export type PayoutInfo = {
  id: BigNumber;
  amount: BigNumber;
  blockTimestamp: BigNumber;
  colonyWideReputation: BigNumber;
  reputationState: string;
  tokenAddress: string;
  totalTokens: BigNumber;
  0: string;
  1: BigNumber;
  2: BigNumber;
  3: BigNumber;
  4: string;
  5: BigNumber;
  6?: BigNumber; // These two parameters are not returned by colonies below V4
  7?: boolean;
  amountRemaining?: BigNumber;
  finalized?: boolean;
};

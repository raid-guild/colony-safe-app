import { BigNumberish, BigNumber } from "ethers/utils";

export type Token = {
  id: number;
  decimals: number;
  name: string;
  symbol: string;
};

export type Transaction = {
  data: string;
  to: string;
  value: BigNumberish;
};

export type Domain = { skillId: BigNumber; fundingPotId: BigNumber; 0: BigNumber; 1: BigNumber };

import { BigNumberish } from "ethers/utils";

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

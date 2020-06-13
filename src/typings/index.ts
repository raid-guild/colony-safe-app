import { BigNumberish } from "@ethersproject/bignumber";

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

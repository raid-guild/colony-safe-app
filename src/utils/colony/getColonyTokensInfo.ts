import { getTokenClient, ColonyClient } from "@colony/colony-js";
import { AddressZero } from "ethers/constants";
import getColonyTokens from "./getColonyTokens";
import { Token } from "../../typings";

const getColonyTokensInfo = async (colonyClient: ColonyClient): Promise<Token[]> => {
  const tokenAddresses = await getColonyTokens(colonyClient);
  const tokens: (Token | undefined)[] = await Promise.all(
    tokenAddresses.map(async (tokenAddress: string) => {
      if (tokenAddress === AddressZero) {
        return {
          address: AddressZero,
          name: "Ether",
          symbol: "ETH",
          decimals: 18,
        };
      }
      try {
        return {
          address: tokenAddress,
          ...(await getTokenClient(tokenAddress, colonyClient.provider).getTokenInfo()),
        };
      } catch (e) {
        console.log(e);
        return undefined;
      }
    }),
  );

  return tokens.filter(token => typeof token !== "undefined") as Token[];
};

export default getColonyTokensInfo;

import { getTokenClient, ColonyClient } from "@colony/colony-js";
import getColonyTokens from "./getColonyTokens";
import { Token } from "../../typings";

const getColonyTokensInfo = async (colonyClient: ColonyClient): Promise<Token[]> => {
  const tokenAddresses = await getColonyTokens(colonyClient);
  return Promise.all(
    tokenAddresses.map(async (tokenAddress: string) => {
      if (tokenAddress === "0x0000000000000000000000000000000000000000") {
        return {
          address: "0x0000000000000000000000000000000000000000",
          name: "Ether",
          symbol: "ETH",
          decimals: 18,
        };
      }
      return {
        address: tokenAddress,
        ...(await getTokenClient(tokenAddress, colonyClient.provider).getTokenInfo()),
      };
    }),
  );
};

export default getColonyTokensInfo;

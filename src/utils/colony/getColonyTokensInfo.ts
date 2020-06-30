import { getTokenClient, ColonyClient } from "@colony/colony-js";
import { AddressZero } from "ethers/constants";
import getColonyTokens from "./getColonyTokens";
import { Token } from "../../typings";

const getColonyTokensInfo = async (colonyClient: ColonyClient): Promise<Token[]> => {
  const tokenAddresses = await getColonyTokens(colonyClient);
  return Promise.all(
    tokenAddresses.map(async (tokenAddress: string) => {
      if (tokenAddress === AddressZero) {
        return {
          address: AddressZero,
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

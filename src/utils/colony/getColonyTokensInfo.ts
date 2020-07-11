import { getTokenClient, ColonyClient } from "@colony/colony-js";
import { AddressZero } from "ethers/constants";
import { Provider } from "ethers/providers";
import getColonyTokens from "./getColonyTokens";
import { Token } from "../../typings";

const getTokenInfo = async (provider: Provider, tokenAddress: string): Promise<Token | undefined> => {
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
      ...(await getTokenClient(tokenAddress, provider).getTokenInfo()),
    };
  } catch (e) {
    return undefined;
  }
};

const getColonyTokensInfo = async (colonyClient: ColonyClient): Promise<Token[]> => {
  const tokenAddresses = await getColonyTokens(colonyClient);
  const tokens: (Token | undefined)[] = await Promise.all(
    tokenAddresses.map(async (tokenAddress: string) => getTokenInfo(colonyClient.provider, tokenAddress)),
  );

  return tokens.filter(token => typeof token !== "undefined") as Token[];
};

export default getColonyTokensInfo;

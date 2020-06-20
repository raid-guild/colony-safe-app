import { useState, useEffect } from "react";
import { TokenItem, getTokenList } from "../config/tokens";
import { useNativeTokenAddress, useNativeTokenInfo } from "../contexts/ColonyContext";

export const useTokens = (): TokenItem[] => {
  const nativeTokenAddress = useNativeTokenAddress();
  const nativeTokenInfo = useNativeTokenInfo();
  const [tokens, setTokens] = useState<TokenItem[]>([]);

  useEffect(() => {
    if (nativeTokenAddress && nativeTokenInfo) {
      const nativeTokenItem: TokenItem = {
        address: nativeTokenAddress,
        decimals: nativeTokenInfo.decimals,
        id: nativeTokenInfo.symbol,
        label: nativeTokenInfo.symbol,
      };
      setTokens([nativeTokenItem, ...getTokenList("mainnet")]);
    }
  }, [nativeTokenAddress, nativeTokenInfo]);

  return tokens;
};

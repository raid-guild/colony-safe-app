import React, { useState, createContext, ReactElement, useContext, useCallback, useEffect, useMemo } from "react";

import {
  getColonyNetworkClient,
  Network,
  ColonyClient,
  NetworkClient,
  ColonyRoles,
  getColonyRoles,
  ColonyRole,
} from "@colony/colony-js";
import { TokenInfo } from "@colony/colony-js/lib/clients/TokenClient";
import { InfuraProvider } from "ethers/providers";
import { BigNumber } from "ethers/utils";
import { Token, Domain } from "../typings";
import userHasDomainRole from "../utils/colony/userHasDomainRole";
import getColonyDomains from "../utils/colony/getColonyDomains";
import getColonyTokensInfo from "../utils/colony/getColonyTokensInfo";

interface Props {
  children: ReactElement | ReactElement[];
}

interface State {
  setColony: Function;
  colonyClient?: ColonyClient;
  colonyDomains: Domain[];
  colonyRoles: ColonyRoles;
  tokens: Token[];
}

export const ColonyContext = createContext({} as State);

export function useColonyContext(): State {
  return useContext(ColonyContext);
}

function ColonyProvider({ children }: Props) {
  /** State Variables **/
  const [colonyClient, setColonyClient] = useState<ColonyClient>();
  const [networkClient, setNetworkClient] = useState<NetworkClient>();
  const [colonyDomains, setColonyDomains] = useState<Domain[]>([]);
  const [colonyRoles, setColonyRoles] = useState<ColonyRoles>([]);
  const [tokens, setTokens] = useState<Token[]>([]);

  const network = "mainnet";
  useEffect(() => {
    const getNetworkClient = async () => {
      const provider = new InfuraProvider(network, process.env.REACT_APP_INFURA_KEY);
      // Get a network client instance
      const newNetworkClient = await getColonyNetworkClient(Network.Mainnet, provider);
      // Check out the logs to see the network address
      console.log("Network Address:", newNetworkClient.address);
      setNetworkClient(newNetworkClient);
    };
    getNetworkClient();
  }, [network]);

  const setColony = useCallback(
    async (colonyEnsName: string): Promise<void> => {
      if (!networkClient) return;

      console.log(`Finding address of ${colonyEnsName}`);
      const provider = new InfuraProvider(network, process.env.REACT_APP_INFURA_KEY);
      const colonyAddress = await provider.resolveName(colonyEnsName);

      console.log(`${colonyEnsName} address: ${colonyAddress}`);

      try {
        const newColonyClient = await networkClient.getColonyClient(colonyAddress);
        console.log("Colony address:", newColonyClient.address);
        setColonyClient(newColonyClient);
      } catch (e) {
        console.warn("Could not find colony", e);
      }
    },
    [networkClient],
  );

  useEffect(() => {
    if (process.env.REACT_APP_COLONY_ENS_NAME) setColony(process.env.REACT_APP_COLONY_ENS_NAME);
  }, [setColony]);

  useEffect(() => {
    if (colonyClient) {
      getColonyDomains(colonyClient).then((newDomains: Domain[]) => setColonyDomains(newDomains));
    } else {
      setColonyDomains([]);
    }
  }, [colonyClient]);

  useEffect(() => {
    if (colonyClient) {
      getColonyRoles(colonyClient).then((newRoles: ColonyRoles) => setColonyRoles(newRoles));
    } else {
      setColonyRoles([]);
    }
  }, [colonyClient]);

  useEffect(() => {
    if (colonyClient) {
      getColonyTokensInfo(colonyClient).then((colonyTokens: Token[]) => setTokens(colonyTokens));
    }
  }, [colonyClient]);

  console.log("tokens", tokens);
  return (
    <ColonyContext.Provider value={{ colonyClient, colonyDomains, colonyRoles, tokens, setColony }}>
      {children}
    </ColonyContext.Provider>
  );
}

export const useColonyClient = (): ColonyClient | undefined => {
  const { colonyClient } = useColonyContext();
  return colonyClient;
};

export const useSetColony = (): Function => {
  const { setColony } = useColonyContext();
  return setColony;
};

export const useColonyRoles = (): ColonyRoles => {
  const { colonyRoles } = useColonyContext();
  return colonyRoles;
};

export const useHasDomainPermission = (
  userAddress: string | undefined,
  domainId: number,
  role: ColonyRole,
): boolean => {
  const colonyRoles = useColonyRoles();

  const hasPermission = useMemo(() => {
    // Check if user has selected role (or root)
    const rootOnDomain = userHasDomainRole(colonyRoles, userAddress, domainId, ColonyRole.Root);
    const roleOnDomain = userHasDomainRole(colonyRoles, userAddress, domainId, role);
    // The user could also inherit this role from the root domain
    const rootOnRoot = userHasDomainRole(colonyRoles, userAddress, 1, ColonyRole.Root);
    const roleOnRoot = userHasDomainRole(colonyRoles, userAddress, 1, role);
    return rootOnDomain || roleOnDomain || rootOnRoot || roleOnRoot;
  }, [colonyRoles, userAddress, domainId, role]);

  return hasPermission;
};

export const useColonyDomains = (): Domain[] => {
  const { colonyDomains } = useColonyContext();

  return colonyDomains;
};

export const useColonyVersion = (): BigNumber => {
  const colonyClient = useColonyClient();
  const [colonyVersion, setColonyVersion] = useState<BigNumber>(new BigNumber(0));

  useEffect(() => {
    if (colonyClient) {
      colonyClient.version().then((version: BigNumber) => setColonyVersion(version));
    }
  }, [colonyClient]);
  return colonyVersion;
};

export const useNativeTokenAddress = () => {
  const colonyClient = useColonyClient();
  const [nativeTokenAddress, setNativeTokenAddress] = useState<string>();

  useEffect(() => {
    if (colonyClient) {
      colonyClient.getToken().then((address: string) => setNativeTokenAddress(address));
    }
  }, [colonyClient]);

  return nativeTokenAddress;
};

export const useNativeTokenInfo = () => {
  const colonyClient = useColonyClient();
  const [tokenInfo, setTokenInfo] = useState<TokenInfo>();

  useEffect(() => {
    if (colonyClient) {
      colonyClient.tokenClient.getTokenInfo().then((info: TokenInfo) => setTokenInfo(info));
    }
  }, [colonyClient]);

  return tokenInfo;
};

export const useTokens = () => {
  const { tokens } = useColonyContext();

  return tokens;
};

export const useRewardInverse = (): BigNumber => {
  const colonyClient = useColonyClient();
  const [rewardInverse, setRewardInverse] = useState<BigNumber>(
    new BigNumber("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"),
  );

  useEffect(() => {
    if (colonyClient) {
      colonyClient.getRewardInverse().then((rewards: BigNumber) => setRewardInverse(rewards));
    }
  }, [colonyClient]);

  return rewardInverse;
};

export default ColonyProvider;

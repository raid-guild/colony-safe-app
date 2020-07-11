import React, { useState, createContext, ReactElement, useContext, useCallback, useEffect } from "react";

import {
  getColonyNetworkClient,
  Network,
  ColonyClient,
  NetworkClient,
  ColonyRoles,
  getColonyRoles,
} from "@colony/colony-js";
import { InfuraProvider } from "ethers/providers";
import { Token, Domain } from "../../typings";
import getColonyDomains from "../../utils/colony/getColonyDomains";
import getColonyTokensInfo from "../../utils/colony/getColonyTokensInfo";

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

const ColonyProvider = ({ children }: Props) => {
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

  return (
    <ColonyContext.Provider value={{ colonyClient, colonyDomains, colonyRoles, tokens, setColony }}>
      {children}
    </ColonyContext.Provider>
  );
};

export default ColonyProvider;

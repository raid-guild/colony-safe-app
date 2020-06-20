import React, { useState, createContext, ReactElement, useContext, useCallback, useEffect } from "react";

import { getColonyNetworkClient, Network, ColonyClient, NetworkClient } from "@colony/colony-js";
import { InfuraProvider } from "ethers/providers";
import { BigNumber } from "ethers/utils";

interface Props {
  children: ReactElement | ReactElement[];
}

interface State {
  setColony: Function;
  colonyClient?: ColonyClient;
}

export const ColonyContext = createContext({} as State);

export function useColonyContext(): State {
  return useContext(ColonyContext);
}

function ColonyProvider({ children }: Props) {
  /** State Variables **/
  const [colonyClient, setColonyClient] = useState<ColonyClient>();
  const [networkClient, setNetworkClient] = useState<NetworkClient>();

  const network = "goerli";
  useEffect(() => {
    const getNetworkClient = async () => {
      const provider = new InfuraProvider(network, process.env.REACT_APP_INFURA_KEY);
      // Get a network client instance
      const newNetworkClient = await getColonyNetworkClient(Network.Goerli, provider);
      // Check out the logs to see the network address
      console.log("Network Address:", newNetworkClient.address);
      setNetworkClient(newNetworkClient);
    };
    getNetworkClient();
  }, [network]);

  const setColony = useCallback(
    async (colonyEnsName: string): Promise<void> => {
      if (!networkClient) return;

      // TODO: resolve an ens name to a colony address. This will then be passed to getColonyClient
      console.log(`Finding address of ${colonyEnsName}`);
      const provider = new InfuraProvider(network, process.env.REACT_APP_INFURA_KEY);
      const colonyAddress = await provider.resolveName(colonyEnsName);

      console.log(`${colonyEnsName} address: ${colonyAddress}`);
      const newColonyClient = await networkClient.getColonyClient(colonyAddress);

      console.log("Colony address:", newColonyClient.address);
      setColonyClient(newColonyClient);
    },
    [networkClient],
  );

  return <ColonyContext.Provider value={{ colonyClient, setColony }}>{children}</ColonyContext.Provider>;
}

export const useColonyClient = (): ColonyClient | undefined => {
  const { colonyClient } = useColonyContext();
  return colonyClient;
};

export const useSetColony = (): Function => {
  const { setColony } = useColonyContext();
  return setColony;
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

export default ColonyProvider;

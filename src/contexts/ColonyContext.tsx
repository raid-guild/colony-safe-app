import React, { useState, createContext, ReactElement, useContext, useCallback, useEffect } from "react";

import { getColonyNetworkClient, Network, ColonyClient, NetworkClient } from "@colony/colony-js";
import { InfuraProvider } from "ethers/providers";

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
    async (newColonyIndex: number): Promise<void> => {
      if (!networkClient) return;

      // TODO: resolve an ens name to a colony address. This will then be passed to getColonyClient

      // console.log(`Finding ${colonyEnsName}.colony.joincolony.eth`);
      // const colonyAddress = await provider.resolveName(`${colonyEnsName}.colony.joincolony.eth`);

      // console.log(`${colonyEnsName} address: ${colonyAddress}`);
      const newColonyClient = await networkClient.getColonyClient(newColonyIndex);

      console.log("Meta Colony address:", newColonyClient.address);
      setColonyClient(newColonyClient);
    },
    [networkClient],
  );

  return <ColonyContext.Provider value={{ colonyClient, setColony }}>{children}</ColonyContext.Provider>;
}

export const useColonyClient = () => {
  const { colonyClient } = useColonyContext();
  return colonyClient;
};

export const useSetColony = () => {
  const { setColony } = useColonyContext();
  return setColony;
};

export default ColonyProvider;

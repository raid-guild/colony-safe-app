import React, { useState, useEffect, createContext, ReactElement, useContext } from "react";

import { getColonyNetworkClient, Network, ColonyClient } from "@colony/colony-js";
import { InfuraProvider } from "ethers/providers";

interface Props {
  children: ReactElement | ReactElement[];
}

interface State {
  colonyClient?: ColonyClient;
}

export const ColonyContext = createContext({} as State);

export function useColonyContext(): State {
  return useContext(ColonyContext);
}

function ColonyProvider({ children }: Props) {
  /** State Variables **/
  const [colonyClient, setColonyClient] = useState<ColonyClient>();

  useEffect(() => {
    const getColonyClient = async () => {
      // if (!safeInfo?.network) return;

      const provider = new InfuraProvider("goerli", process.env.REACT_APP_INFURA_KEY);
      // Get a network client instance
      const networkClient = await getColonyNetworkClient(Network.Goerli, provider);

      // Check out the logs to see the network address
      console.log("Network Address:", networkClient.address);

      // Get the colony client for the Meta Colony
      const newColonyClient = await networkClient.getColonyClient(2);

      console.log("Meta Colony address:", newColonyClient.address);
      setColonyClient(newColonyClient);
    };
    getColonyClient();
  }, []);

  return <ColonyContext.Provider value={{ colonyClient }}>{children}</ColonyContext.Provider>;
}

export const useColonyClient = () => {
  const { colonyClient } = useColonyContext();
  return colonyClient;
};

export default ColonyProvider;

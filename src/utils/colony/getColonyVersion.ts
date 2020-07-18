import getColonyVersionClient from "@colony/colony-js/src/clients/Colony/ColonyVersionClient";
import { ColonyVersion } from "@colony/colony-js/src/constants";
import { Signer } from "ethers";
import { Provider } from "ethers/providers";

const getColonyVersion = async (colonyAddress: string, signerOrProvider: Signer | Provider,): Promise<ColonyVersion> => {
  const colonyVersionClient = await getColonyVersionClient(
    colonyAddress,
    signerOrProvider,
  );
  // This is *kinda* hacky, but I have no better idea ¯\_(ツ)_/¯
  // We have to get the version somehow before instantiating the right contract version
  const versionBN = await colonyVersionClient.version();
  return versionBN.toNumber() as ColonyVersion;
};

export default getColonyVersion;

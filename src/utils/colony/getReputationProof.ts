import { ColonyClient } from "@colony/colony-js";
import { bigNumberify, BigNumberish } from "ethers/utils";
import { ReputationOracleResponse } from "@colony/colony-js/lib/clients/Colony/types";

async function getReputation(
  client: ColonyClient,
  skillId: BigNumberish,
  address: string,
  customRootHash?: string,
): Promise<ReputationOracleResponse> {
  const { network, reputationOracleEndpoint } = client.networkClient;

  const skillIdString = bigNumberify(skillId).toString();

  const rootHash = customRootHash || (await client.networkClient.getReputationRootHash());

  const response = await fetch(
    `${reputationOracleEndpoint}/${network}/${rootHash}/${client.address}/${skillIdString}/${address}`,
  );

  const result = await response.json();

  return {
    ...result,
    reputationAmount: bigNumberify(result.reputationAmount || 0),
  };
}

const getReputationProof = async (
  colonyClient: ColonyClient,
  userAddress: string,
  reputationRootHash?: string,
): Promise<ReputationOracleResponse> => {
  const { skillId } = await colonyClient.getDomain(1);
  return getReputation(colonyClient, skillId, userAddress, reputationRootHash);
};

export default getReputationProof;

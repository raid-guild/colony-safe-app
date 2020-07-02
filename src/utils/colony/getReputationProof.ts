import { ColonyClient } from "@colony/colony-js";

const getReputationProof = async (colonyClient: ColonyClient, userAddress: string) => {
  const { skillId } = await colonyClient.getDomain(1);
  return colonyClient.getReputation(skillId, userAddress);
};

export default getReputationProof;

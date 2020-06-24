import { ColonyClient } from "@colony/colony-js";
import { Domain } from "../../typings";

const getColonyDomains = async (client: ColonyClient): Promise<Domain[]> => {
  const domainCount = await client.getDomainCount();

  // Domains are 1 indexed so we add a shift
  const domainIdArray = Array.from(Array(domainCount.toNumber()), (_, i) => i + 1);
  return Promise.all(domainIdArray.map(domainIndex => client.getDomain(domainIndex)));
};

export default getColonyDomains;

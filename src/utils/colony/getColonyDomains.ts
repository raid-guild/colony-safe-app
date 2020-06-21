import { ColonyClient } from "@colony/colony-js";

const getColonyDomains = async (client: ColonyClient) => {
  const domainCount = await client.getDomainCount();

  // Domains are 1 indexed so we add a shift
  const domainIdArray = Array.from(Array(domainCount.toNumber()), (_, i) => i + 1);
  return Promise.all(domainIdArray.map(domainIndex => client.getDomain(domainIndex + 1)));
};

export default getColonyDomains;

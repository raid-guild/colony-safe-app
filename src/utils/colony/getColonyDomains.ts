import { ColonyClient } from "@colony/colony-js";

const getColonyDomains = async (client: ColonyClient) => {
  const domainCount = client.getDomainCount();

  return Promise.all([...Array(domainCount).keys()].map(domainIndex => client.getDomain(domainIndex)));
};

export default getColonyDomains;

import { ColonyClient } from "@colony/colony-js";
import { BigNumber } from "ethers/utils";
import { Domain } from "../../typings";

const getColonyDomains = async (client: ColonyClient): Promise<Domain[]> => {
  const domainCount = await client.getDomainCount();

  // Domains are 1 indexed so we add a shift
  const domainIdArray = Array.from(Array(domainCount.toNumber()), (_, i) => i + 1);
  return Promise.all(
    domainIdArray.map(
      async (domainId: number): Promise<Domain> => ({
        ...(await client.getDomain(domainId)),
        domainId: new BigNumber(domainId),
        2: new BigNumber(domainId),
      }),
    ),
  );
};

export default getColonyDomains;

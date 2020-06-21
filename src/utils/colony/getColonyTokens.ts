import { ColonyClient, getEvents } from "@colony/colony-js";

const getColonyTokens = async (client: ColonyClient): Promise<string[]> => {
  const filter = {
    address: client.address,
    topics: [client.interface.events.ColonyFundsClaimed.topic],
  };

  // Find events and extract addresses
  const colonyFundsClaimedEvents = await getEvents(client, filter);
  const tokenAddresses = colonyFundsClaimedEvents.map(event => event.values.token);

  // Finally remove any duplicates from the Array
  return [...new Set(tokenAddresses)];
};

export default getColonyTokens;

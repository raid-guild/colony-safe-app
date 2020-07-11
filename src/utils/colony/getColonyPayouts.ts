import { ColonyClient, getEvents } from "@colony/colony-js";
import { BigNumber, LogDescription } from "ethers/utils";
import { PayoutInfo } from "../../typings";

const getStartedPayouts = async (client: ColonyClient): Promise<BigNumber[]> => {
  const filter = {
    address: client.address,
    topics: [client.interface.events.RewardPayoutCycleStarted.topic],
  };

  // Find events and extract payoutIds
  const colonyPayoutsStartedEvents: LogDescription[] = await getEvents(client, filter);
  return colonyPayoutsStartedEvents.map((event): BigNumber => event.values.rewardPayoutId);
};

const getEndedPayouts = async (client: ColonyClient): Promise<BigNumber[]> => {
  const filter = {
    address: client.address,
    topics: [client.interface.events.RewardPayoutCycleEnded.topic],
  };

  // Find events and extract payoutIds
  const colonyPayoutsEndedEvents: LogDescription[] = await getEvents(client, filter);
  return colonyPayoutsEndedEvents.map((event): BigNumber => event.values.rewardPayoutId);
};

const getActivePayouts = async (client: ColonyClient): Promise<PayoutInfo[]> => {
  // Colonies below version 4 can't report whether a payout is finalized.
  // For compatibility we must then filter events manually
  const startedPayouts = await getStartedPayouts(client);
  const endedPayouts = await getEndedPayouts(client);

  const activePayouts = startedPayouts.filter(payoutId => !endedPayouts.includes(payoutId));
  return Promise.all(
    activePayouts.map(async payoutId => ({ id: payoutId, ...(await client.getRewardPayoutInfo(payoutId)) })),
  );
};

export default getActivePayouts;

import { ColonyClient } from "@colony/colony-js";
import { BigNumber, BigNumberish } from "ethers/utils";
import { Zero } from "ethers/constants";
import { Domain } from "../../typings";
import { ALL_DOMAINS_ID, REWARDS_FUNDING_POT_ID } from "../../constants";

/*
 * Get token balance of a domain within the colony.
 * Also supports reading two special cases: the rewards pot and the sum of all non-rewards pots.
 *
 * This is done by passing in the "extended" domain ids of:
 * Rewards pot: 0
 * Sum of all non-rewards pots: -1
 */
const getDomainTokenBalance = (
  colonyClient: ColonyClient,
  domains: Domain[],
  domainId: BigNumberish,
  token: string,
): Promise<BigNumber> => {
  if (domainId.toString() === ALL_DOMAINS_ID.toString()) {
    return colonyClient.getNonRewardPotsTotal(token);
  }
  if (domainId.toString() === REWARDS_FUNDING_POT_ID.toString()) {
    return colonyClient.getFundingPotBalance(REWARDS_FUNDING_POT_ID, token);
  }

  const domainInfo = domains.find((domain: Domain) => domainId.toString() === domain.domainId.toString());
  if (domainInfo) {
    return colonyClient.getFundingPotBalance(domainInfo.fundingPotId, token);
  }
  return new Promise(resolve => resolve(Zero));
};

export default getDomainTokenBalance;

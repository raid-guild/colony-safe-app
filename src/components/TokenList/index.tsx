import React, { useMemo, useState, useEffect } from "react";
import { TableRow, TableCell } from "@material-ui/core";
import { ColonyRole, ColonyClient } from "@colony/colony-js";
import { formatUnits, BigNumber } from "ethers/utils";
import Table from "../common/StyledTable";

import TokenModal from "../Modals/TokenModal";
import { useHasDomainPermission, useColonyClient, useColonyDomains } from "../../contexts/ColonyContext";
import { useSafeInfo } from "../../contexts/SafeContext";
import { Token, Domain } from "../../typings";
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
  domainId: number,
  token: string,
): Promise<BigNumber> => {
  if (domainId === ALL_DOMAINS_ID) {
    return colonyClient.getNonRewardPotsTotal(token);
  }
  if (domainId === REWARDS_FUNDING_POT_ID) {
    return colonyClient.getFundingPotBalance(REWARDS_FUNDING_POT_ID, token);
  }

  const domainInfo = domains.find((domain: Domain) => domainId === domain.domainId.toNumber());
  if (domainInfo) {
    return colonyClient.getFundingPotBalance(domainInfo.fundingPotId, token);
  }
  return new Promise(resolve => resolve(new BigNumber(0)));
};

const TokenRow = ({
  token,
  domainId,
  hasRootRole,
  hasAdministrationRole,
  hasFundingRole,
}: {
  token: Token;
  domainId: number;
  hasRootRole: boolean;
  hasAdministrationRole: boolean;
  hasFundingRole: boolean;
}) => {
  const colonyClient = useColonyClient();
  const colonyDomains = useColonyDomains();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [balance, setBalance] = useState<string>("0");

  useEffect(() => {
    if (colonyClient) {
      getDomainTokenBalance(colonyClient, colonyDomains, domainId, token.address).then(tokenBalance =>
        setBalance(tokenBalance.toString()),
      );
    }
  }, [colonyClient, colonyDomains, domainId, token.address]);

  return (
    <>
      <TokenModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        token={token}
        hasRootRole={hasRootRole}
        hasAdministrationRole={hasAdministrationRole}
        hasFundingRole={hasFundingRole}
      />
      <TableRow onClick={() => setIsOpen(true)}>
        <TableCell>{token.symbol}</TableCell>
        <TableCell align="right">{formatUnits(balance, token.decimals)}</TableCell>
      </TableRow>
    </>
  );
};

const TokenList = ({ tokens, currentDomainId }: { tokens: Token[]; currentDomainId: number }) => {
  const safeInfo = useSafeInfo();
  const hasRootPermission = useHasDomainPermission(safeInfo?.safeAddress, currentDomainId, ColonyRole.Root);
  const hasAdministrationPermission = useHasDomainPermission(
    safeInfo?.safeAddress,
    currentDomainId,
    ColonyRole.Administration,
  );
  const hasFundingPermission = useHasDomainPermission(safeInfo?.safeAddress, currentDomainId, ColonyRole.Funding);

  const tokenList = useMemo(
    () =>
      tokens.map(token => (
        <TokenRow
          token={token}
          domainId={currentDomainId}
          hasRootRole={hasRootPermission}
          hasAdministrationRole={hasAdministrationPermission}
          hasFundingRole={hasFundingPermission}
        />
      )),
    [tokens, currentDomainId, hasRootPermission, hasAdministrationPermission, hasFundingPermission],
  );

  return <Table>{tokenList}</Table>;
};

export default TokenList;

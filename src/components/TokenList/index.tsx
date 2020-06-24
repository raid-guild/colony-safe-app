import React, { useMemo, useState, useEffect } from "react";
import { TableRow, TableCell } from "@material-ui/core";
import { ColonyRole } from "@colony/colony-js";
import { formatUnits } from "ethers/utils";
import Table from "../common/StyledTable";

import TokenModal from "../Modals/TokenModal";
import { useHasDomainPermission, useColonyClient, useColonyDomains } from "../../contexts/ColonyContext";
import { useSafeInfo } from "../../contexts/SafeContext";
import { Token, Domain } from "../../typings";
import { ALL_DOMAINS_ID, REWARDS_FUNDING_POT_ID } from "../../constants";

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
      if (domainId === ALL_DOMAINS_ID) {
        colonyClient.getNonRewardPotsTotal(token.address).then(tokenBalance => setBalance(tokenBalance.toString()));
      } else if (domainId === REWARDS_FUNDING_POT_ID) {
        colonyClient
          .getFundingPotBalance(REWARDS_FUNDING_POT_ID, token.address)
          .then(tokenBalance => setBalance(tokenBalance.toString()));
      } else {
        const domainInfo = colonyDomains.find((domain: Domain) => domainId === domain.domainId.toNumber());
        if (domainInfo) {
          colonyClient
            .getFundingPotBalance(domainInfo.fundingPotId, token.address)
            .then(tokenBalance => setBalance(tokenBalance.toString()));
        }
      }
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

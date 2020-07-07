import React, { useMemo, useState, useEffect } from "react";
import { TableRow, TableCell, TableBody } from "@material-ui/core";

import { ColonyRole, ColonyClient } from "@colony/colony-js";
import { formatUnits, BigNumber, bigNumberify, BigNumberish } from "ethers/utils";
import { Text, Icon } from "@gnosis.pm/safe-react-components";

import { Zero } from "ethers/constants";
import Table from "../common/StyledTable";
import UnderlinedTableRow from "../common/UnderLinedTableRow";
import TokenModal from "../Modals/TokenModal";
import { useColonyClient, useColonyDomains, usePermissionProof } from "../../contexts/ColonyContext";
import { useSafeInfo } from "../../contexts/SafeContext";
import { Token, Domain, PermissionProof } from "../../typings";
import { ALL_DOMAINS_ID, REWARDS_FUNDING_POT_ID } from "../../constants";
import MintModal from "../Modals/MintModal";

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
  return new Promise(resolve => resolve(Zero));
};

const useDomainTokenBalance = (domainId: BigNumberish, token: string): BigNumber => {
  const colonyClient = useColonyClient();
  const colonyDomains = useColonyDomains();
  const [balance, setBalance] = useState<BigNumber>(Zero);

  useEffect(() => {
    if (colonyClient) {
      getDomainTokenBalance(colonyClient, colonyDomains, domainId, token).then(tokenBalance =>
        setBalance(tokenBalance),
      );
    }
  }, [colonyClient, colonyDomains, domainId, token]);

  return balance;
};

const TokenRow = ({
  token,
  domain,
  adminPermissionProof,
  fundingPermissionProof,
}: {
  token: Token;
  domain: Domain;
  adminPermissionProof?: PermissionProof;
  fundingPermissionProof?: PermissionProof;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const balance = useDomainTokenBalance(domain.domainId, token.address);

  return (
    <>
      <TokenModal
        // isOpen={typeof adminPermissionProof !== "undefined" && typeof fundingPermissionProof !== "undefined" && isOpen}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        token={token}
        domain={domain}
        adminPermissionProof={adminPermissionProof}
        fundingPermissionProof={fundingPermissionProof}
      />
      <TableRow onClick={() => setIsOpen(true)}>
        <TableCell>{token.symbol}</TableCell>
        <TableCell align="right">{formatUnits(balance, token.decimals)}</TableCell>
      </TableRow>
    </>
  );
};

const MintTokensRow = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <MintModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <UnderlinedTableRow onClick={() => setIsOpen(true)}>
        <TableCell>
          <Text size="lg">Mint Tokens</Text>
        </TableCell>
        <TableCell align="right">
          <Icon type="add" size="md" />
        </TableCell>
      </UnderlinedTableRow>
    </>
  );
};

const TokenList = ({ tokens, currentDomainId }: { tokens: Token[]; currentDomainId: number }) => {
  const safeInfo = useSafeInfo();
  const client = useColonyClient();

  const [domain, setDomain] = useState<Domain>();

  useEffect(() => {
    if (client)
      client
        .getDomain(currentDomainId)
        .then(currentDomain =>
          setDomain({ domainId: bigNumberify(currentDomainId), 2: bigNumberify(currentDomainId), ...currentDomain }),
        );
  }, [client, currentDomainId]);

  const rootPermissionProof = usePermissionProof(currentDomainId, ColonyRole.Root, safeInfo?.safeAddress || "");
  const adminPermissionProof = usePermissionProof(
    currentDomainId,
    ColonyRole.Administration,
    safeInfo?.safeAddress || "",
  );
  const fundingPermissionProof = usePermissionProof(currentDomainId, ColonyRole.Funding, safeInfo?.safeAddress || "");

  const tokenList = useMemo(
    () =>
      domain &&
      tokens.map(token => (
        <TokenRow
          key={token.address}
          token={token}
          domain={domain}
          adminPermissionProof={adminPermissionProof}
          fundingPermissionProof={fundingPermissionProof}
        />
      )),
    [tokens, domain, adminPermissionProof, fundingPermissionProof],
  );

  return (
    <Table>
      <TableBody>
        {typeof rootPermissionProof !== "undefined" && <MintTokensRow />}
        {tokenList}
      </TableBody>
    </Table>
  );
};

export default TokenList;

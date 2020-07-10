import React, { useMemo, useState, useEffect } from "react";
import { TableRow, TableCell, TableBody } from "@material-ui/core";

import { ColonyRole } from "@colony/colony-js";
import { formatUnits, bigNumberify } from "ethers/utils";

import Table from "../common/StyledTable";
import TokenModal from "../Modals/TokenModal";
import { useColonyClient, usePermissionProof } from "../../contexts/ColonyContext";
import { useSafeInfo } from "../../contexts/SafeContext";
import { Token, Domain, PermissionProof } from "../../typings";
import MintTokensRow from "./MintTokensRow";
import useDomainTokenBalance from "./balance";

const useColonyDomain = (domainId: number) => {
  const client = useColonyClient();
  const [domain, setDomain] = useState<Domain>();

  useEffect(() => {
    if (client && domainId > 0)
      client
        .getDomain(domainId)
        .then(currentDomain =>
          setDomain({ domainId: bigNumberify(domainId), 2: bigNumberify(domainId), ...currentDomain }),
        );
  }, [client, domainId]);

  return domain;
};

const TokenRow = ({
  token,
  currentDomainId,
  adminPermissionProof,
  fundingPermissionProof,
}: {
  token: Token;
  currentDomainId: number;
  adminPermissionProof?: PermissionProof;
  fundingPermissionProof?: PermissionProof;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const domain = useColonyDomain(currentDomainId);
  const balance = useDomainTokenBalance(currentDomainId, token.address);

  return (
    <>
      {typeof domain !== "undefined" && (
        <TokenModal
          // isOpen={typeof adminPermissionProof !== "undefined" && typeof fundingPermissionProof !== "undefined" && isOpen}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          token={token}
          domain={domain}
          adminPermissionProof={adminPermissionProof}
          fundingPermissionProof={fundingPermissionProof}
        />
      )}
      <TableRow onClick={() => setIsOpen(true)}>
        <TableCell>{token.symbol}</TableCell>
        <TableCell align="right">{formatUnits(balance, token.decimals)}</TableCell>
      </TableRow>
    </>
  );
};

const DomainTokenList = ({ tokens, currentDomainId }: { tokens: Token[]; currentDomainId: number }) => {
  const safeInfo = useSafeInfo();

  const adminPermissionProof = usePermissionProof(
    currentDomainId,
    ColonyRole.Administration,
    safeInfo?.safeAddress || "",
  );
  const fundingPermissionProof = usePermissionProof(currentDomainId, ColonyRole.Funding, safeInfo?.safeAddress || "");

  const tokenRows = useMemo(
    () =>
      tokens.map(token => (
        <TokenRow
          key={token.address}
          token={token}
          currentDomainId={currentDomainId}
          adminPermissionProof={adminPermissionProof}
          fundingPermissionProof={fundingPermissionProof}
        />
      )),
    [tokens, currentDomainId, adminPermissionProof, fundingPermissionProof],
  );

  return <>{tokenRows}</>;
};

const TokenTable = ({ tokens, currentDomainId }: { tokens: Token[]; currentDomainId: number }) => {
  const safeInfo = useSafeInfo();

  const rootPermissionProof = usePermissionProof(1, ColonyRole.Root, safeInfo?.safeAddress || "");

  return (
    <Table>
      <TableBody>
        {typeof rootPermissionProof !== "undefined" && <MintTokensRow />}
        <DomainTokenList tokens={tokens} currentDomainId={currentDomainId} />
      </TableBody>
    </Table>
  );
};

export default TokenTable;

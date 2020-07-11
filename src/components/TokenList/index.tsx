import React, { useMemo } from "react";
import { TableBody } from "@material-ui/core";

import { ColonyRole } from "@colony/colony-js";

import Table from "../common/StyledTable";
import { usePermissionProof } from "../../contexts/ColonyContext";
import { useSafeInfo } from "../../contexts/SafeContext";
import { Token } from "../../typings";
import MintTokensRow from "./MintTokensRow";
import TokenRow from "./TokenRow";

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

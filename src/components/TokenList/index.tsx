import React, { useMemo, useState } from "react";
import { Table, TableRow, TableCell } from "@material-ui/core";
import styled from "styled-components";
import { ColonyRole } from "@colony/colony-js";
import TokenModal from "../Modals/TokenModal";
import { useHasDomainPermission } from "../../contexts/ColonyContext";
import { useSafeInfo } from "../../contexts/SafeContext";
import { Token } from "../../typings";

const StyledTable = styled(Table)`
  min-width: 480px;
  box-shadow: 1px 2px 10px 0 rgba(212, 212, 211, 0.59);
`;

const TokenRow = ({ token, hasFundingRole }: { token: Token; hasFundingRole: boolean }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <TokenModal isOpen={isOpen} setIsOpen={setIsOpen} token={token} hasFundingRole={hasFundingRole} />
      <TableRow onClick={() => setIsOpen(true)}>
        <TableCell>{token.symbol}</TableCell>
        <TableCell align="right">0.000</TableCell>
      </TableRow>
    </>
  );
};

const TokenList = ({ tokens }: { tokens: Token[] }) => {
  const safeInfo = useSafeInfo();
  const hasFundingPermission = useHasDomainPermission(safeInfo?.safeAddress, 1, ColonyRole.Funding);

  const tokenList = useMemo(
    () => tokens.map(token => <TokenRow token={token} hasFundingRole={hasFundingPermission} />),
    [tokens, hasFundingPermission],
  );

  return <StyledTable>{tokenList}</StyledTable>;
};

export default TokenList;

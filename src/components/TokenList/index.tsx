import React, { useMemo, useState, useEffect } from "react";
import { Table, TableRow, TableCell } from "@material-ui/core";
import styled from "styled-components";
import { ColonyRole, ColonyClient } from "@colony/colony-js";
import { TokenItem } from "../../config/tokens";
import TokenModal from "../Modals/TokenModal";
import { useColonyClient } from "../../contexts/ColonyContext";
import { useSafeInfo } from "../../contexts/SafeContext";

const StyledTable = styled(Table)`
  min-width: 450px;
  box-shadow: 1px 2px 10px 0 rgba(212, 212, 211, 0.59);
`;

const TokenRow = ({ token, hasFundingRole }: { token: TokenItem; hasFundingRole: boolean }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <TokenModal isOpen={isOpen} setIsOpen={setIsOpen} token={token} hasFundingRole={hasFundingRole} />
      <TableRow onClick={() => setIsOpen(true)}>
        <TableCell>{token.label}</TableCell>
        <TableCell align="right">0.000</TableCell>
      </TableRow>
    </>
  );
};

const hasRoleOrRoot = async (
  colonyClient: ColonyClient,
  userAddress: string,
  domainId: number,
  role: ColonyRole,
): Promise<boolean> => {
  const hasRoot = await colonyClient.hasUserRole(userAddress, domainId, ColonyRole.Root);
  const hasFunding = await colonyClient.hasUserRole(userAddress, domainId, role);
  return hasRoot || hasFunding;
};

const TokenList = ({ tokens }: { tokens: TokenItem[] }) => {
  const safeInfo = useSafeInfo();
  const colonyClient = useColonyClient();
  const [hasFundingRole, setHasFundingRole] = useState<boolean>(false);

  useEffect(() => {
    if (colonyClient && safeInfo?.safeAddress) {
      hasRoleOrRoot(colonyClient, safeInfo?.safeAddress, 1, ColonyRole.Funding).then(roleStatus =>
        setHasFundingRole(roleStatus),
      );
    } else {
      setHasFundingRole(false);
    }
  }, [colonyClient, safeInfo]);

  const tokenList = useMemo(() => tokens.map(token => <TokenRow token={token} hasFundingRole={hasFundingRole} />), [
    tokens,
    hasFundingRole,
  ]);

  return <StyledTable>{tokenList}</StyledTable>;
};

export default TokenList;

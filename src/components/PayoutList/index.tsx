import React, { useMemo, useState } from "react";
import { Table, TableRow, TableCell } from "@material-ui/core";
import styled from "styled-components";
import { TokenItem } from "../../config/tokens";
import PayoutModal from "../Modals/PayoutModal";

const StyledTable = styled(Table)`
  box-shadow: 1px 2px 10px 0 rgba(212, 212, 211, 0.59);
`;

const TokenRow = ({ token }: { token: TokenItem }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <PayoutModal isOpen={isOpen} setIsOpen={setIsOpen} token={token} />
      <TableRow onClick={() => setIsOpen(true)}>
        <TableCell>{token.label}</TableCell>
        <TableCell align="right">0.000</TableCell>
      </TableRow>
    </>
  );
};

const PayoutList = ({ tokens }: { tokens: TokenItem[] }) => {
  const tokenList = useMemo(() => tokens.map(token => <TokenRow token={token} />), [tokens]);

  return <StyledTable>{tokenList}</StyledTable>;
};

export default PayoutList;

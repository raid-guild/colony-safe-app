import React, { useMemo, useState } from "react";
import { Table, TableRow, TableCell } from "@material-ui/core";
import styled from "styled-components";
import PayoutModal from "../Modals/PayoutModal";
import { Token } from "../../typings";

const StyledTable = styled(Table)`
  min-width: 480px;
  box-shadow: 1px 2px 10px 0 rgba(212, 212, 211, 0.59);
`;

const TokenRow = ({ token }: { token: Token }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <PayoutModal isOpen={isOpen} setIsOpen={setIsOpen} token={token} />
      <TableRow onClick={() => setIsOpen(true)}>
        <TableCell>{token.symbol}</TableCell>
        <TableCell align="right">0.000</TableCell>
      </TableRow>
    </>
  );
};

const PayoutList = ({ tokens }: { tokens: Token[] }) => {
  const tokenList = useMemo(() => tokens.map(token => <TokenRow token={token} />), [tokens]);

  return <StyledTable>{tokenList}</StyledTable>;
};

export default PayoutList;

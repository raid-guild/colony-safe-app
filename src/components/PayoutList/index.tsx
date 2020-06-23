import React, { useMemo, useState } from "react";
import { TableRow, TableCell } from "@material-ui/core";
import Table from "../common/StyledTable";
import PayoutModal from "../Modals/PayoutModal";
import { Token } from "../../typings";

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

  return <Table>{tokenList}</Table>;
};

export default PayoutList;

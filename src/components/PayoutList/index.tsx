import React, { useMemo, useState, useEffect } from "react";
import { TableRow, TableCell } from "@material-ui/core";
import { formatUnits } from "ethers/utils";
import Table from "../common/StyledTable";
import PayoutModal from "../Modals/PayoutModal";
import { Token } from "../../typings";
import { useColonyClient } from "../../contexts/ColonyContext";
import { REWARDS_FUNDING_POT_ID } from "../../constants";

const TokenRow = ({ token }: { token: Token }) => {
  const colonyClient = useColonyClient();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [balance, setBalance] = useState<string>("0");

  useEffect(() => {
    if (colonyClient) {
      colonyClient
        .getFundingPotBalance(REWARDS_FUNDING_POT_ID, token.address)
        .then(tokenBalance => setBalance(tokenBalance.toString()));
    }
  }, [colonyClient, token.address]);

  return (
    <>
      <PayoutModal isOpen={isOpen} setIsOpen={setIsOpen} token={token} />
      <TableRow onClick={() => setIsOpen(true)}>
        <TableCell>{token.symbol}</TableCell>
        <TableCell align="right">{formatUnits(balance, token.decimals)}</TableCell>
      </TableRow>
    </>
  );
};

const PayoutList = ({ tokens }: { tokens: Token[] }) => {
  const tokenList = useMemo(() => tokens.map(token => <TokenRow token={token} />), [tokens]);

  return <Table>{tokenList}</Table>;
};

export default PayoutList;

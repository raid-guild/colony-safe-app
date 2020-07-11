import React, { useState } from "react";
import { formatUnits } from "ethers/utils";
import { TableRow, TableCell } from "@material-ui/core";
import PayoutModal from "../Modals/PayoutModal";
import { useTokens } from "../../contexts/ColonyContext";
import { PayoutInfo } from "../../typings";

const PayoutRow = ({ payout }: { payout: PayoutInfo }) => {
  const tokens = useTokens();
  const payoutToken = tokens.find(token => token.address === payout.tokenAddress);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  if (!payoutToken) return null;
  return (
    <>
      <PayoutModal isOpen={isOpen} setIsOpen={setIsOpen} payout={payout} token={payoutToken} />
      <TableRow onClick={() => setIsOpen(true)}>
        <TableCell>{payoutToken?.symbol || payout.tokenAddress}</TableCell>
        <TableCell align="right">{formatUnits(payout.amount, payoutToken?.decimals)}</TableCell>
      </TableRow>
    </>
  );
};

export default PayoutRow;

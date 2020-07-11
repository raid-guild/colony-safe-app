import React, { useState } from "react";
import { formatUnits, BigNumber } from "ethers/utils";
import { TableRow, TableCell } from "@material-ui/core";
import { Zero } from "ethers/constants";
import PayoutModal from "../Modals/PayoutModal";
import { useToken } from "../../contexts/ColonyContext";
import { PayoutInfo } from "../../typings";

const PayoutRow = ({ payouts }: { payouts: PayoutInfo[] }) => {
  const payoutToken = useToken(payouts[0].tokenAddress);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const totalAmount: BigNumber = payouts.reduce((payoutTotal: BigNumber, { amount }) => {
    return payoutTotal.add(amount);
  }, Zero);

  if (payouts.length === 0) return null;
  return (
    <>
      <PayoutModal isOpen={isOpen} setIsOpen={setIsOpen} payouts={payouts} />
      <TableRow onClick={() => setIsOpen(true)}>
        <TableCell>{payoutToken?.symbol || payouts[0].tokenAddress}</TableCell>
        <TableCell align="right">{formatUnits(totalAmount, payoutToken?.decimals)}</TableCell>
      </TableRow>
    </>
  );
};

export default PayoutRow;

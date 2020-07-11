import React, { useMemo, useState, useEffect } from "react";
import { formatUnits } from "ethers/utils";

import { TableRow, TableCell, TableBody } from "@material-ui/core";

import { ColonyRole } from "@colony/colony-js";

import NewPayoutRow from "./NewPayoutRow";
import Table from "../common/StyledTable";
import PayoutModal from "../Modals/PayoutModal";

import { useSafeInfo } from "../../contexts/SafeContext";
import { useColonyClient, useHasDomainPermission, useTokens } from "../../contexts/ColonyContext";

import getActivePayouts from "../../utils/colony/getColonyPayouts";
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

const PayoutList = () => {
  const safeInfo = useSafeInfo();
  const colonyClient = useColonyClient();
  const hasRootPermission = useHasDomainPermission(safeInfo?.safeAddress, 1, ColonyRole.Root);
  const [activePayouts, setActivePayouts] = useState<PayoutInfo[]>([]);

  useEffect(() => {
    if (colonyClient) getActivePayouts(colonyClient).then(setActivePayouts);
  }, [colonyClient]);

  const payoutList = useMemo(
    () => activePayouts.map(payout => <PayoutRow key={payout.blockTimestamp.toString()} payout={payout} />),
    [activePayouts],
  );
  return (
    <Table>
      <TableBody>
        {hasRootPermission && <NewPayoutRow />}
        {payoutList}
      </TableBody>
    </Table>
  );
};

export default PayoutList;

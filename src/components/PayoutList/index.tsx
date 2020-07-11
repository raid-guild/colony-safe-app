import React, { useMemo } from "react";

import { TableBody } from "@material-ui/core";
import { ColonyRole } from "@colony/colony-js";

import PayoutRow from "./PayoutRow";
import NewPayoutRow from "./NewPayoutRow";
import Table from "../common/StyledTable";

import { useSafeInfo } from "../../contexts/SafeContext";
import { useActivePayouts, useHasDomainPermission } from "../../contexts/ColonyContext";

const PayoutList = () => {
  const safeInfo = useSafeInfo();
  const activePayouts = useActivePayouts();
  const hasRootPermission = useHasDomainPermission(safeInfo?.safeAddress, 1, ColonyRole.Root);

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

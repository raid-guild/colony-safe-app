import React, { useMemo, useState, useEffect } from "react";

import { TableBody } from "@material-ui/core";
import { ColonyRole } from "@colony/colony-js";

import PayoutRow from "./PayoutRow";
import NewPayoutRow from "./NewPayoutRow";
import Table from "../common/StyledTable";

import { useSafeInfo } from "../../contexts/SafeContext";
import { useColonyClient, useHasDomainPermission } from "../../contexts/ColonyContext";

import getActivePayouts from "../../utils/colony/getColonyPayouts";
import { PayoutInfo } from "../../typings";

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

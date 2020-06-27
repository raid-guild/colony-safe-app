import React, { useMemo, useState, useEffect } from "react";
import { formatUnits } from "ethers/utils";

import { TableRow, TableCell } from "@material-ui/core";
import { Text, Icon } from "@gnosis.pm/safe-react-components";

import { ColonyRole } from "@colony/colony-js";
import Table from "../common/StyledTable";
import UnderlinedTableRow from "../common/UnderLinedTableRow";

import PayoutModal from "../Modals/PayoutModal";

import { useSafeInfo } from "../../contexts/SafeContext";
import { useColonyClient, useHasDomainPermission } from "../../contexts/ColonyContext";

import { REWARDS_FUNDING_POT_ID } from "../../constants";

import { Token } from "../../typings";
import StartPayoutModal from "../Modals/StartPayoutModal";

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

const NewPayoutRow = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <StartPayoutModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <UnderlinedTableRow onClick={() => setIsOpen(true)}>
        <TableCell>
          <Text size="lg">New Payout</Text>
        </TableCell>
        <TableCell align="right">
          <Icon type="add" size="md" />
        </TableCell>
      </UnderlinedTableRow>
    </>
  );
};

const PayoutList = ({ tokens }: { tokens: Token[] }) => {
  const safeInfo = useSafeInfo();
  const hasRootPermission = useHasDomainPermission(safeInfo?.safeAddress, 1, ColonyRole.Root);

  const tokenList = useMemo(() => tokens.map(token => <TokenRow token={token} />), [tokens]);

  return (
    <Table>
      {hasRootPermission && <NewPayoutRow />}
      {tokenList}
    </Table>
  );
};

export default PayoutList;

import React, { useState } from "react";
import { TableCell } from "@material-ui/core";
import { Text, Icon } from "@gnosis.pm/safe-react-components";
import UnderlinedTableRow from "../common/UnderLinedTableRow";
import StartPayoutModal from "../Modals/StartPayoutModal";

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

export default NewPayoutRow;

import React, { useState } from "react";
import { TableCell } from "@material-ui/core";
import { Text, Icon } from "@gnosis.pm/safe-react-components";

import UnderlinedTableRow from "../common/UnderLinedTableRow";
import MintModal from "../Modals/MintModal";

const MintTokensRow = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <MintModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <UnderlinedTableRow onClick={() => setIsOpen(true)}>
        <TableCell>
          <Text size="lg">Mint Tokens</Text>
        </TableCell>
        <TableCell align="right">
          <Icon type="add" size="md" />
        </TableCell>
      </UnderlinedTableRow>
    </>
  );
};

export default MintTokensRow;

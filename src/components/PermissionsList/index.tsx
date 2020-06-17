import React, { useMemo, useState } from "react";
import { Table, TableRow, TableCell } from "@material-ui/core";
import styled from "styled-components";
import PermissionsModal from "../Modals/PermissionsModal";
import PermissionIcons from "./PermissionIcons";
import Address from "../utils/Address";

const StyledTable = styled(Table)`
  box-shadow: 1px 2px 10px 0 rgba(212, 212, 211, 0.59);
`;

const AddressRow = ({ address }: { address: string }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <PermissionsModal isOpen={isOpen} setIsOpen={setIsOpen} address={address} />
      <TableRow onClick={() => setIsOpen(true)}>
        <TableCell>
          <Address address={address} />
        </TableCell>
        <TableCell align="right">
          <PermissionIcons permissions={[true, false, true, true, false, true]} />
        </TableCell>
      </TableRow>
    </>
  );
};

const PermissionsList = ({ addresses }: { addresses: string[] }) => {
  const addressList = useMemo(() => addresses.map(address => <AddressRow address={address} />), [addresses]);

  return <StyledTable>{addressList}</StyledTable>;
};

export default PermissionsList;

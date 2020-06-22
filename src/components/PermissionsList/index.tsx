import React, { useMemo, useState } from "react";
import { Table, TableRow, TableCell } from "@material-ui/core";
import styled from "styled-components";

import { ColonyRoles, DomainRoles } from "@colony/colony-js";

import { Text, Icon } from "@gnosis.pm/safe-react-components";
import PermissionsModal from "../Modals/PermissionsModal";
import PermissionIcons from "./PermissionIcons";
import Address from "../common/Address";
import { useColonyRoles } from "../../contexts/ColonyContext";

const StyledTable = styled(Table)`
  min-width: 480px;
  box-shadow: 1px 2px 10px 0 rgba(212, 212, 211, 0.59);
`;

const UnderlinedTableRow = styled(TableRow)`
  border-bottom-width: 3px;
  border-bottom-style: solid;
`;

const AddressRow = ({ address, permissions }: { address: string; permissions: DomainRoles }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <PermissionsModal isOpen={isOpen} setIsOpen={setIsOpen} address={address} permissions={permissions.roles} />
      <TableRow onClick={() => setIsOpen(true)}>
        <TableCell>
          <Address address={address} />
        </TableCell>
        <TableCell align="right">
          <PermissionIcons permissions={permissions} />
        </TableCell>
      </TableRow>
    </>
  );
};

const AddAddressRow = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <PermissionsModal isOpen={isOpen} setIsOpen={setIsOpen} address="" permissions={[]} />
      <UnderlinedTableRow onClick={() => setIsOpen(true)}>
        <TableCell>
          <Text size="lg">Add Account</Text>
        </TableCell>
        <TableCell align="right">
          <Icon type="add" size="md" />
        </TableCell>
      </UnderlinedTableRow>
    </>
  );
};

const PermissionsList = () => {
  const roles: ColonyRoles = useColonyRoles();

  const addressList = useMemo(
    () => roles.map(({ address, domains }) => <AddressRow address={address} permissions={domains[0]} />),
    [roles],
  );

  return (
    <StyledTable>
      <AddAddressRow />
      {addressList.length > 0 ? (
        addressList
      ) : (
        <TableRow>
          <TableCell align="center" colSpan={2}>
            No Permissions Found
          </TableCell>
        </TableRow>
      )}
    </StyledTable>
  );
};

export default PermissionsList;

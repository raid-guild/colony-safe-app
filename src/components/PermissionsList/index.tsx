import React, { useMemo, useState, useEffect } from "react";
import { Table, TableRow, TableCell } from "@material-ui/core";
import styled from "styled-components";

import { ColonyRoles, DomainRoles, getColonyRoles } from "@colony/colony-js";

import PermissionsModal from "../Modals/PermissionsModal";
import PermissionIcons from "./PermissionIcons";
import Address from "../utils/Address";
import { useColonyClient } from "../../contexts/ColonyContext";

const StyledTable = styled(Table)`
  box-shadow: 1px 2px 10px 0 rgba(212, 212, 211, 0.59);
`;

const AddressRow = ({ address, permissions }: { address: string; permissions: DomainRoles }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <PermissionsModal isOpen={isOpen} setIsOpen={setIsOpen} address={address} />
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

const PermissionsList = () => {
  const colonyClient = useColonyClient();
  const [roles, setRoles] = useState<ColonyRoles>([]);

  useEffect(() => {
    if (colonyClient) {
      getColonyRoles(colonyClient).then((newRoles: ColonyRoles) => setRoles(newRoles));
    } else {
      setRoles([]);
    }
  }, [colonyClient]);

  const addressList = useMemo(
    () => roles.map(({ address, domains }) => <AddressRow address={address} permissions={domains[0]} />),
    [roles],
  );

  return (
    <StyledTable>
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

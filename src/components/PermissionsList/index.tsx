import React, { useMemo, useState, useCallback } from "react";
import { Table, TableRow, TableCell, Tooltip } from "@material-ui/core";
import styled from "styled-components";

import { ColonyRoles, DomainRoles, ColonyRole } from "@colony/colony-js";

import { Text, Icon } from "@gnosis.pm/safe-react-components";
import PermissionsModal from "../Modals/PermissionsModal";
import PermissionIcons from "./PermissionIcons";
import Address from "../common/Address";
import { useColonyRoles, useHasDomainPermission } from "../../contexts/ColonyContext";
import { useSafeInfo } from "../../contexts/SafeContext";

const StyledTable = styled(Table)`
  min-width: 480px;
  box-shadow: 1px 2px 10px 0 rgba(212, 212, 211, 0.59);
`;

const UnderlinedTableRow = styled(TableRow)`
  border-bottom-width: 3px;
  border-bottom-style: solid;
`;

const AddressRow = ({
  address,
  permissions,
  hasAdminPermission,
}: {
  address: string;
  permissions: DomainRoles;
  hasAdminPermission: boolean;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showToolTip, setShowToolTip] = useState<boolean>(false);

  const handleClick = useCallback(() => {
    if (hasAdminPermission) {
      setIsOpen(true);
    } else {
      setShowToolTip(true);
      setTimeout(() => setShowToolTip(false), 1500);
    }
  }, [hasAdminPermission]);

  return (
    <>
      <PermissionsModal
        isOpen={hasAdminPermission && isOpen}
        setIsOpen={setIsOpen}
        address={address}
        permissions={permissions.roles}
      />
      <Tooltip
        open={showToolTip}
        placement="top"
        title="You don't have the permissions to change this"
        disableFocusListener
        disableHoverListener
        disableTouchListener
      >
        <TableRow onClick={handleClick}>
          <TableCell>
            <Address address={address} />
          </TableCell>
          <TableCell align="right">
            <PermissionIcons permissions={permissions} />
          </TableCell>
        </TableRow>
      </Tooltip>
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
  const safeInfo = useSafeInfo();
  const hasAdminPermission = useHasDomainPermission(safeInfo?.safeAddress, 1, ColonyRole.Administration);
  const roles: ColonyRoles = useColonyRoles();

  const addressList = useMemo(
    () =>
      roles.map(({ address, domains }) => (
        <AddressRow address={address} permissions={domains[0]} hasAdminPermission={hasAdminPermission} />
      )),
    [roles, hasAdminPermission],
  );

  console.log(hasAdminPermission);

  return (
    <StyledTable>
      {hasAdminPermission && <AddAddressRow />}
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

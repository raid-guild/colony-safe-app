import React, { useMemo, useState, useCallback } from "react";
import { TableRow, TableCell, Tooltip, TableBody } from "@material-ui/core";

import { ColonyRoles, DomainRoles, ColonyRole } from "@colony/colony-js";

import { Text, Icon } from "@gnosis.pm/safe-react-components";
import UnderlinedTableRow from "../common/UnderLinedTableRow";
import Table from "../common/StyledTable";
import PermissionsModal from "../Modals/PermissionsModal";
import PermissionIcons from "./PermissionIcons";
import Address from "../common/Address";
import { useColonyRoles, useHasDomainPermission } from "../../contexts/ColonyContext";
import { useSafeInfo } from "../../contexts/SafeContext";

const AddressRow = ({
  address,
  permissions,
  hasRootPermission,
}: {
  address: string;
  permissions: DomainRoles;
  hasRootPermission: boolean;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showToolTip, setShowToolTip] = useState<boolean>(false);

  const handleClick = useCallback(() => {
    if (hasRootPermission) {
      setIsOpen(true);
    } else {
      setShowToolTip(true);
      setTimeout(() => setShowToolTip(false), 1500);
    }
  }, [hasRootPermission]);

  return (
    <>
      <PermissionsModal
        isOpen={hasRootPermission && isOpen}
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

const PermissionsList = ({ currentDomainId }: { currentDomainId: number }) => {
  const safeInfo = useSafeInfo();
  const hasRootPermission = useHasDomainPermission(safeInfo?.safeAddress, currentDomainId, ColonyRole.Root);
  const roles: ColonyRoles = useColonyRoles();

  const addressList = useMemo(
    () =>
      roles.map(({ address, domains }) => (
        <AddressRow
          key={address}
          address={address}
          permissions={
            domains.find(({ domainId }: { domainId: number }) => domainId === currentDomainId) || {
              domainId: currentDomainId,
              roles: [],
            }
          }
          hasRootPermission={hasRootPermission}
        />
      )),
    [roles, hasRootPermission, currentDomainId],
  );

  return (
    <Table>
      <TableBody>
        {hasRootPermission && <AddAddressRow />}
        {addressList.length > 0 ? (
          addressList
        ) : (
          <TableRow>
            <TableCell align="center" colSpan={2}>
              No Permissions Found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default PermissionsList;

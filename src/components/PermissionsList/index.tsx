import React, { useMemo, useState, useCallback, useEffect } from "react";
import { TableRow, TableCell, Tooltip, TableBody } from "@material-ui/core";

import { ColonyRoles, DomainRoles, ColonyRole } from "@colony/colony-js";

import { Text, Icon } from "@gnosis.pm/safe-react-components";
import { BigNumberish } from "ethers/utils";
import { getPermissionProofs } from "@colony/colony-js/lib/clients/Colony/extensions/commonExtensions";
import UnderlinedTableRow from "../common/UnderLinedTableRow";
import Table from "../common/StyledTable";
import PermissionsModal from "../Modals/PermissionsModal";
import PermissionIcons from "./PermissionIcons";
import Address from "../common/Address";
import { useColonyRoles, useColonyClient } from "../../contexts/ColonyContext";
import { useSafeInfo } from "../../contexts/SafeContext";

const AddressRow = ({
  address,
  domain,
  permissions,
  permissionProof,
}: {
  address: string;
  domain: number;
  permissions: DomainRoles;
  permissionProof?: [BigNumberish, BigNumberish];
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showToolTip, setShowToolTip] = useState<boolean>(false);

  const handleClick = useCallback(() => {
    if (typeof permissionProof !== "undefined") {
      setIsOpen(true);
    } else {
      setShowToolTip(true);
      setTimeout(() => setShowToolTip(false), 1500);
    }
  }, [permissionProof]);

  return (
    <>
      {typeof permissionProof !== "undefined" && (
        <PermissionsModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          address={address}
          permissions={permissions.roles}
          domainId={domain}
          permissionDomainId={permissionProof[0]}
          childSkillIndex={permissionProof[1]}
        />
      )}
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
      <PermissionsModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        address=""
        permissions={[]}
        domainId={1}
        permissionDomainId={1}
        childSkillIndex={0}
      />
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

const usePermissionProof = (
  domainId: BigNumberish,
  role: ColonyRole,
  userAddress: string,
): [BigNumberish, BigNumberish] | undefined => {
  const client = useColonyClient();

  const [permissionProof, setPermissionProof] = useState<[BigNumberish, BigNumberish]>();

  useEffect(() => {
    if (client) {
      getPermissionProofs(client, domainId, role, userAddress)
        .then(setPermissionProof)
        .catch(() => setPermissionProof(undefined));
    }
  }, [client, domainId, role, userAddress]);

  return permissionProof;
};

const PermissionsList = ({ currentDomainId }: { currentDomainId: number }) => {
  const safeInfo = useSafeInfo();

  const permissionProof = usePermissionProof(currentDomainId, ColonyRole.Root, safeInfo?.safeAddress || "");

  const roles: ColonyRoles = useColonyRoles();

  const addressList = useMemo(
    () =>
      roles.map(({ address, domains }) => (
        <AddressRow
          key={address}
          address={address}
          domain={currentDomainId}
          permissions={
            domains.find(({ domainId }: { domainId: number }) => domainId === currentDomainId) || {
              domainId: currentDomainId,
              roles: [],
            }
          }
          permissionProof={permissionProof}
        />
      )),
    [roles, permissionProof, currentDomainId],
  );

  return (
    <Table>
      <TableBody>
        {typeof permissionProof !== "undefined" && <AddAddressRow />}
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

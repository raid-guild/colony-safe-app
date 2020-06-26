import React, { useState, useMemo, useCallback } from "react";
import { ColonyRole } from "@colony/colony-js";
import { BigNumberish } from "ethers/utils";
import AdministrationIcon from "../../../assets/permissions/administration.svg";
import ArbitrationIcon from "../../../assets/permissions/arbitration.svg";
import ArchitectureIcon from "../../../assets/permissions/architecture.svg";
import FundingIcon from "../../../assets/permissions/funding.svg";
import RecoveryIcon from "../../../assets/permissions/recovery.svg";
import RootIcon from "../../../assets/permissions/root.svg";

import ManageListModal from "./Modal";
import setPermissions from "../../../utils/transactions/permissions/setPermissions";
import { shortenAddress } from "../../../utils";
import { Permission } from "./types";
import { useColonyClient } from "../../../contexts/ColonyContext";
import { useSafeInfo } from "../../../contexts/SafeContext";
import { PermissionUpdate } from "../../../typings";

const displayPermissions = (permissions: number[]): Permission[] => [
  {
    id: ColonyRole.Root.toString(),
    iconUrl: RootIcon,
    name: "Root",
    description: "",
    checked: permissions.includes(ColonyRole.Root),
    revokeable: true,
  },
  {
    id: ColonyRole.Recovery.toString(),
    iconUrl: RecoveryIcon,
    name: "Recovery",
    description: "",
    checked: permissions.includes(ColonyRole.Recovery),
    revokeable: false,
  },
  {
    id: ColonyRole.Arbitration.toString(),
    iconUrl: ArbitrationIcon,
    name: "Arbitration",
    description: "",
    checked: permissions.includes(ColonyRole.Arbitration),
    revokeable: true,
  },
  {
    id: ColonyRole.Architecture.toString(),
    iconUrl: ArchitectureIcon,
    name: "Architecture",
    description: "",
    checked: permissions.includes(ColonyRole.Architecture),
    revokeable: true,
  },
  {
    id: ColonyRole.Funding.toString(),
    iconUrl: FundingIcon,
    name: "Funding",
    description: "",
    checked: permissions.includes(ColonyRole.Funding),
    revokeable: true,
  },
  {
    id: ColonyRole.Administration.toString(),
    iconUrl: AdministrationIcon,
    name: "Administration",
    description: "",
    checked: permissions.includes(ColonyRole.Administration),
    revokeable: true,
  },
];

const roleChanged = (initialRoles: ColonyRole[], updatedRoles: ColonyRole[], role: ColonyRole) =>
  initialRoles.includes(role) !== updatedRoles.includes(role);

const getRoleUpdates = (initialRoles: ColonyRole[], updatedRoles: ColonyRole[]): PermissionUpdate[] => {
  return Object.values(ColonyRole)
    .filter(el => typeof el !== "string" && roleChanged(initialRoles, updatedRoles, el))
    .map(role => ({ role: role as ColonyRole, setTo: updatedRoles.includes(role as ColonyRole) }));
};

const PermissionsModal = ({
  isOpen,
  setIsOpen,
  address,
  permissions,
  domainId,
  permissionDomainId,
  childSkillIndex,
}: {
  isOpen: boolean;
  setIsOpen: Function;
  address?: string;
  permissions: number[];
  domainId: BigNumberish;
  permissionDomainId: BigNumberish;
  childSkillIndex: BigNumberish;
}) => {
  const safeInfo = useSafeInfo();
  const colonyClient = useColonyClient();
  const [newPermissions, setNewPermissions] = useState(permissions);

  const onItemToggle = (roleId: number, checked: boolean) => {
    const copy = newPermissions.filter(role => role !== roleId);
    if (checked) {
      copy.push(roleId);
    }
    setNewPermissions(copy);
  };

  const updatePermissions = useCallback(() => {
    if (colonyClient && safeInfo) {
      const roleUpdates = getRoleUpdates(permissions, newPermissions);
      setPermissions(colonyClient, safeInfo.safeAddress, roleUpdates, permissionDomainId, domainId, childSkillIndex);
    }
  }, [colonyClient, safeInfo, permissions, newPermissions, domainId, permissionDomainId, childSkillIndex]);

  const items = useMemo(() => displayPermissions(newPermissions), [newPermissions]);
  if (!isOpen) return null;
  return (
    <ManageListModal
      title={address ? shortenAddress(address) : "New Account"}
      defaultIconUrl=""
      permissionsList={items}
      onSubmitForm={() => updatePermissions()}
      onClose={() => setIsOpen(false)}
      onPermissionToggle={onItemToggle}
      newAccount={!address}
    />
  );
};

export default PermissionsModal;

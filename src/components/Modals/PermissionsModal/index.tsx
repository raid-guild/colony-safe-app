import React, { useState, ReactText } from "react";
import { ColonyRole } from "@colony/colony-js";
import AdministrationIcon from "../../../assets/permissions/administration.svg";
import ArbitrationIcon from "../../../assets/permissions/arbitration.svg";
import ArchitectureIcon from "../../../assets/permissions/architecture.svg";
import FundingIcon from "../../../assets/permissions/funding.svg";
import RecoveryIcon from "../../../assets/permissions/recovery.svg";
import RootIcon from "../../../assets/permissions/root.svg";

import ManageListModal from "./Modal";
import { shortenAddress } from "../../../utils";
import { Permission } from "./types";

const setInitialPermissions = (permissions: number[]): Permission[] => [
  {
    id: "1",
    iconUrl: RootIcon,
    name: "Root",
    description: "",
    checked: permissions.includes(ColonyRole.Root),
  },
  {
    id: "2",
    iconUrl: RecoveryIcon,
    name: "Recovery",
    description: "",
    checked: permissions.includes(ColonyRole.Recovery),
  },
  {
    id: "3",
    iconUrl: ArbitrationIcon,
    name: "Arbitration",
    description: "",
    checked: permissions.includes(ColonyRole.Arbitration),
  },
  {
    id: "4",
    iconUrl: ArchitectureIcon,
    name: "Architecture",
    description: "",
    checked: permissions.includes(ColonyRole.Architecture),
  },
  {
    id: "5",
    iconUrl: FundingIcon,
    name: "Funding",
    description: "",
    checked: permissions.includes(ColonyRole.Funding),
  },
  {
    id: "6",
    iconUrl: AdministrationIcon,
    name: "Administration",
    description: "",
    checked: permissions.includes(ColonyRole.Administration),
  },
];

const PermissionsModal = ({
  isOpen,
  setIsOpen,
  address,
  permissions,
}: {
  isOpen: boolean;
  setIsOpen: Function;
  address?: string;
  permissions: number[];
}) => {
  const [items, setItems] = useState(setInitialPermissions(permissions));

  const onItemToggle = (itemId: ReactText, checked: boolean) => {
    const copy = [...items];
    const localItem = copy.find(i => i.id === itemId);
    if (!localItem) {
      return;
    }
    localItem.checked = checked;
    setItems(copy);
  };

  if (!isOpen) return null;
  return (
    <ManageListModal
      title={address ? shortenAddress(address) : "New Account"}
      defaultIconUrl=""
      permissionsList={items}
      onSubmitForm={() => console.log("submitted")}
      onClose={() => setIsOpen(false)}
      onPermissionToggle={onItemToggle}
      newAccount={!address}
    />
  );
};

export default PermissionsModal;

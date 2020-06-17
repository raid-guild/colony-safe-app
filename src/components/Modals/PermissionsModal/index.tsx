import React, { useState, ReactText } from "react";
import AdministrationIcon from "../../../assets/permissions/administration.svg";
import ArbitrationIcon from "../../../assets/permissions/arbitration.svg";
import ArchitectureIcon from "../../../assets/permissions/architecture.svg";
import FundingIcon from "../../../assets/permissions/funding.svg";
import RecoveryIcon from "../../../assets/permissions/recovery.svg";
import RootIcon from "../../../assets/permissions/root.svg";

import ManageListModal from "./Modal";
import { shortenAddress } from "../../../utils";

type Permission = {
  id: string;
  iconUrl: any;
  name: string;
  description: string;
  checked: boolean;
};

const permissions: Permission[] = [
  {
    id: "1",
    iconUrl: RootIcon,
    name: "Root",
    description: "",
    checked: true,
  },
  {
    id: "2",
    iconUrl: RecoveryIcon,
    name: "Recovery",
    description: "",
    checked: true,
  },
  {
    id: "3",
    iconUrl: ArbitrationIcon,
    name: "Arbitration",
    description: "",
    checked: true,
  },
  {
    id: "4",
    iconUrl: ArchitectureIcon,
    name: "Architecture",
    description: "",
    checked: true,
  },
  {
    id: "5",
    iconUrl: AdministrationIcon,
    name: "Administration",
    description: "",
    checked: true,
  },
  {
    id: "6",
    iconUrl: FundingIcon,
    name: "Funding",
    description: "",
    checked: true,
  },
];

const PermissionsModal = ({
  isOpen,
  setIsOpen,
  address,
}: {
  isOpen: boolean;
  setIsOpen: Function;
  address: string;
}) => {
  const [items, setItems] = useState(permissions);

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
      title={shortenAddress(address)}
      defaultIconUrl=""
      itemList={items}
      onSubmitForm={() => console.log("submitted")}
      onClose={() => setIsOpen(false)}
      onItemToggle={onItemToggle}
    />
  );
};

export default PermissionsModal;

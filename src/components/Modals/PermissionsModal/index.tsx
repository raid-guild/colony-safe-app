import React, { useState, ReactText } from "react";
import { Button } from "@gnosis.pm/safe-react-components";
import ManageListModal from "./Modal";

type Permission = {
  id: string;
  iconUrl: string;
  name: string;
  description: string;
  checked: boolean;
};

const permissions: Permission[] = [
  {
    id: "1",
    iconUrl: "someUrl",
    name: "Root",
    description: "",
    checked: true,
  },
  {
    id: "2",
    iconUrl: "someUrl2",
    name: "Recovery",
    description: "",
    checked: true,
  },
  {
    id: "3",
    iconUrl: "someUrl3",
    name: "Arbitration",
    description: "",
    checked: true,
  },
  {
    id: "4",
    iconUrl: "someUrl4",
    name: "Architecture",
    description: "",
    checked: true,
  },
  {
    id: "5",
    iconUrl: "someUrl5",
    name: "Administration",
    description: "",
    checked: true,
  },
  {
    id: "6",
    iconUrl: "someUrl6",
    name: "Funding",
    description: "",
    checked: true,
  },
];

const PermissionsModal = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <>
      <Button size="md" color="primary" onClick={() => setIsOpen(!isOpen)}>
        Toggle modal
      </Button>
      {isOpen && (
        <ManageListModal
          defaultIconUrl=""
          itemList={items}
          onSubmitForm={() => {}}
          onClose={() => setIsOpen(false)}
          onItemToggle={onItemToggle}
        />
      )}
    </>
  );
};

export default PermissionsModal;

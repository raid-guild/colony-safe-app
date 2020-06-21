import React, { ReactElement, useState } from "react";
import { ModalFooterConfirmation, GenericModal } from "@gnosis.pm/safe-react-components";
import { Token } from "../../../typings";
import TokenModalBody from "./TokenModalBody";

const TokenModal = ({
  isOpen,
  setIsOpen,
  token,
  hasRootRole,
  hasAdministrationRole,
  hasFundingRole,
}: {
  isOpen: boolean;
  setIsOpen: Function;
  token: Token;
  hasRootRole: boolean;
  hasAdministrationRole: boolean;
  hasFundingRole: boolean;
}): ReactElement | null => {
  /** State Variables **/
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [amount, setAmount] = useState<string>("");

  const handleChangeAmount = (event: any) => setAmount(event.target.value);
  const handleChangeTab = (_event: any, newValue: number) => setCurrentTab(newValue);

  const modalTitle = `${token.symbol}`;

  const modalFooter = (
    <ModalFooterConfirmation
      okText="Save"
      // okDisabled={false}
      handleCancel={() => setIsOpen(false)}
      handleOk={() => console.log("Clicked ok!")}
    />
  );

  if (!isOpen) return null;
  return (
    <GenericModal
      onClose={() => setIsOpen(false)}
      title={modalTitle}
      body={
        <TokenModalBody
          currentTab={currentTab}
          handleChangeTab={handleChangeTab}
          amount={amount}
          handleChangeAmount={handleChangeAmount}
          token={token}
          hasRootRole={hasRootRole}
          hasAdministrationRole={hasAdministrationRole}
          hasFundingRole={hasFundingRole}
        />
      }
      footer={modalFooter}
    />
  );
};

export default TokenModal;

import React, { ReactElement } from "react";
import { ModalFooterConfirmation, GenericModal } from "@gnosis.pm/safe-react-components";
import { Token } from "../../../typings";

const TokenModal = ({
  isOpen,
  setIsOpen,
  token,
  hasFundingRole,
}: {
  isOpen: boolean;
  setIsOpen: Function;
  token: Token;
  hasFundingRole: boolean;
}): ReactElement | null => {
  const modalTitle = `${token.symbol}`;

  const modalBody = (
    <>{`This is the ${token.symbol} modal ${
      hasFundingRole ? "This user can transfer funds" : "This user can't transfer funds"
    }`}</>
  );

  const modalFooter = (
    <ModalFooterConfirmation
      okText="Save"
      // okDisabled={false}
      handleCancel={() => setIsOpen(false)}
      handleOk={() => console.log("Clicked ok!")}
    />
  );

  if (!isOpen) return null;
  return <GenericModal onClose={() => setIsOpen(false)} title={modalTitle} body={modalBody} footer={modalFooter} />;
};

export default TokenModal;

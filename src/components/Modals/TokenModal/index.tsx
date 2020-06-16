import React, { ReactElement } from "react";
import { ModalFooterConfirmation, GenericModal } from "@gnosis.pm/safe-react-components";
import { TokenItem } from "../../../config/tokens";

const TokenModal = ({
  isOpen,
  setIsOpen,
  token,
}: {
  isOpen: boolean;
  setIsOpen: Function;
  token: TokenItem;
}): ReactElement | null => {
  const modalTitle = `${token.label}`;

  const modalBody = <>{`This is the ${token.label} modal`}</>;

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

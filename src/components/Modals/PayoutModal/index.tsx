import React, { ReactElement } from "react";
import { GenericModal, ModalFooterConfirmation, Text } from "@gnosis.pm/safe-react-components";
import { TokenItem } from "../../../config/tokens";

const PayoutModal = ({
  isOpen,
  setIsOpen,
  token,
}: {
  isOpen: boolean;
  setIsOpen: Function;
  token: TokenItem;
}): ReactElement | null => {
  const modalBody = (
    <>
      <Text size="md"> {`Your share of the 2,000.00 ${token.label} payout is ~359.00 ${token.label}`} </Text>
    </>
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
  return (
    <GenericModal
      onClose={() => setIsOpen(false)}
      title={`${token.label} Payout`}
      body={modalBody}
      footer={modalFooter}
    />
  );
};

export default PayoutModal;

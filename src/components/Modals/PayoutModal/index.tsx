import React, { ReactElement } from "react";
import { GenericModal, ModalFooterConfirmation, Text } from "@gnosis.pm/safe-react-components";
import { Token } from "../../../typings";

const PayoutModal = ({
  isOpen,
  setIsOpen,
  token,
}: {
  isOpen: boolean;
  setIsOpen: Function;
  token: Token;
}): ReactElement | null => {
  const modalBody = (
    <>
      <Text size="md"> {`Your share of the 2,000.00 ${token.symbol} payout is ~359.00 ${token.symbol}`} </Text>
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
      title={`${token.symbol} Payout`}
      body={modalBody}
      footer={modalFooter}
    />
  );
};

export default PayoutModal;

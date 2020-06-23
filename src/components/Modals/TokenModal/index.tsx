import React, { ReactElement } from "react";
import { Text, ModalFooterConfirmation, GenericModal } from "@gnosis.pm/safe-react-components";
import { Token } from "../../../typings";

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
  const modalTitle = `${token.symbol}`;

  const modalBody = (
    <>
      <Text size="lg">{`This is the ${token.symbol} modal`}</Text>
      <Text size="lg">{hasRootRole ? "This user can mint colony tokens" : "This user can't mint colony tokens"}</Text>
      <Text size="lg">
        {hasAdministrationRole ? "This user can initiate payments" : "This user can't initiate payments"}
      </Text>
      <Text size="lg">
        {hasFundingRole ? "This user can transfer funds between pots" : "This user can't transfer funds between pots"}
      </Text>
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
  return <GenericModal onClose={() => setIsOpen(false)} title={modalTitle} body={modalBody} footer={modalFooter} />;
};

export default TokenModal;

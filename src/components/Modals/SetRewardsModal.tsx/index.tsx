import React, { useState } from "react";
import { Button, GenericModal, TextField, ModalFooterConfirmation } from "@gnosis.pm/safe-react-components";

const SetRewardsModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [rewardsPercentage, setRewardsPercentage] = useState<string>("");

  const modalBody = (
    <>
      Amount{" "}
      <TextField
        label="Rewards Percentage"
        value={rewardsPercentage}
        onChange={(e: any): void => setRewardsPercentage(e.target.value)}
      />
    </>
  );

  const modalFooter = (
    <ModalFooterConfirmation
      okText="Save"
      // okDisabled={false}
      handleCancel={() => setIsOpen(false)}
      handleOk={() => console.log("Clicked ok!", rewardsPercentage)}
    />
  );
  return (
    <>
      <Button size="md" color="primary" onClick={() => setIsOpen(!isOpen)}>
        Set Rewards %
      </Button>
      {isOpen && (
        <GenericModal
          onClose={() => setIsOpen(false)}
          title="Set Rewards Percentage"
          body={modalBody}
          footer={modalFooter}
        />
      )}
    </>
  );
};

export default SetRewardsModal;

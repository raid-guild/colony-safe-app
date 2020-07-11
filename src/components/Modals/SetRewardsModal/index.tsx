import React, { useState, ChangeEvent, useCallback } from "react";
import { Button, GenericModal, TextField, ModalFooterConfirmation } from "@gnosis.pm/safe-react-components";
import { bigNumberify } from "ethers/utils";
import { MaxUint256 } from "ethers/constants";
import setRewardInverseTxs from "../../../utils/transactions/rewards/setRewardInverse";
import { useAppsSdk } from "../../../contexts/SafeContext";
import { useColonyClient } from "../../../contexts/ColonyContext";

const SetRewardsModal = ({ disabled }: { disabled?: boolean }) => {
  const appsSdk = useAppsSdk();
  const colonyClient = useColonyClient();

  const [isOpen, setIsOpen] = useState(false);
  const [rewardsPercentage, setRewardsPercentage] = useState<string>("");

  const setRewardsInverse = useCallback(
    (percentage: string) => {
      if (colonyClient) {
        const rewardsInverse = bigNumberify(
          parseFloat(percentage) !== 0 ? 1 / (parseFloat(percentage) / 100) : MaxUint256,
        );
        console.log("setting inverse to", rewardsInverse);
        const txs = setRewardInverseTxs(colonyClient, rewardsInverse);
        appsSdk.sendTransactions(txs);
      }
    },
    [colonyClient, appsSdk],
  );

  const modalBody = (
    <>
      Amount{" "}
      <TextField
        label="Rewards Percentage"
        value={rewardsPercentage}
        onChange={(e: ChangeEvent<HTMLInputElement>): void => setRewardsPercentage(e.target.value)}
      />
    </>
  );

  const modalFooter = (
    <ModalFooterConfirmation
      okText="Save"
      // okDisabled={false}
      handleCancel={() => setIsOpen(false)}
      handleOk={() => setRewardsInverse(rewardsPercentage)}
    />
  );
  return (
    <>
      <Button size="md" color="primary" onClick={() => setIsOpen(!isOpen)} disabled={disabled}>
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

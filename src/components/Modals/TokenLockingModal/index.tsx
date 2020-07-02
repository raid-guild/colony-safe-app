import React, { useState, ChangeEvent, useCallback } from "react";
import { Button, GenericModal, TextField, ModalFooterConfirmation } from "@gnosis.pm/safe-react-components";
import { useAppsSdk } from "../../../contexts/SafeContext";
import { useColonyClient, useNativeTokenAddress } from "../../../contexts/ColonyContext";
import depositTxs from "../../../utils/transactions/tokenLocking/deposit";
import getActivePayouts from "../../../utils/colony/getColonyPayouts";
import withdrawTxs from "../../../utils/transactions/tokenLocking/withdraw";

const TokenLockingModal = ({ lock, disabled }: { lock?: boolean; disabled?: boolean }) => {
  const appsSdk = useAppsSdk();
  const colonyClient = useColonyClient();
  const nativeToken = useNativeTokenAddress() || "";

  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState<string>("");

  const tokenAction = useCallback(
    (lockAmount: string) => {
      if (colonyClient) {
        console.log(`${lock ? "Locking" : "Unlocking"} ${lockAmount} of token ${nativeToken}`);
        if (lock) {
          depositTxs(colonyClient, nativeToken, lockAmount).then(txs => appsSdk.sendTransactions(txs));
        } else {
          withdrawTxs(colonyClient, nativeToken, lockAmount).then(txs => appsSdk.sendTransactions(txs));
        }
      }
    },
    [colonyClient, appsSdk, nativeToken, lock],
  );

  if (colonyClient) getActivePayouts(colonyClient);
  const modalBody = (
    <>
      Amount{" "}
      <TextField
        label="Amount"
        value={amount}
        onChange={(e: ChangeEvent<HTMLInputElement>): void => setAmount(e.target.value)}
      />
    </>
  );

  const modalFooter = (
    <ModalFooterConfirmation
      okText={lock ? "Lock" : "Unlock"}
      // okDisabled={false}
      handleCancel={() => setIsOpen(false)}
      handleOk={() => tokenAction(amount)}
    />
  );
  return (
    <>
      <Button size="md" color="primary" onClick={() => setIsOpen(!isOpen)} disabled={disabled}>
        {lock ? "Lock" : "Unlock"} Tokens
      </Button>
      {isOpen && (
        <GenericModal
          onClose={() => setIsOpen(false)}
          title={lock ? "Lock Tokens" : "Unlock Tokens"}
          body={modalBody}
          footer={modalFooter}
        />
      )}
    </>
  );
};

export default TokenLockingModal;

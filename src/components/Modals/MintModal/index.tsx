import React, { ReactElement, useState, ChangeEvent, useCallback } from "react";
import { ModalFooterConfirmation, GenericModal, Text, TextField } from "@gnosis.pm/safe-react-components";

import styled from "styled-components";
import { parseUnits, BigNumber } from "ethers/utils";
import { useNativeTokenInfo, useColonyClient } from "../../../contexts/ColonyContext";
import mintTokenTxs from "../../../utils/transactions/mintTokens";
import { useAppsSdk } from "../../../contexts/SafeContext";

const StyledItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 24px;
  height: 51px;
`;

const MintModal = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: Function }): ReactElement | null => {
  const appsSdk = useAppsSdk();
  const colonyClient = useColonyClient();
  const nativeTokenInfo = useNativeTokenInfo();
  /** State Variables **/
  const [amount, setAmount] = useState<string>("");

  const mintTokens = useCallback(
    (mintAmount: BigNumber) => {
      if (colonyClient) {
        const txs = mintTokenTxs(colonyClient, mintAmount);
        appsSdk.sendTransactions(txs);
      }
    },
    [colonyClient, appsSdk],
  );

  const modalTitle = `Mint ${nativeTokenInfo?.symbol}`;

  const modalBody = (
    <StyledItem>
      <Text size="lg">{`${nativeTokenInfo?.symbol} Mint Amount:`}</Text>
      <TextField
        style={{ width: "250px" }}
        label="Amount"
        value={amount}
        onChange={(e: ChangeEvent<HTMLInputElement>): void => setAmount(e.target.value)}
      />
    </StyledItem>
  );

  const modalFooter = (
    <ModalFooterConfirmation
      okText="Mint"
      // okDisabled={false}
      handleCancel={() => setIsOpen(false)}
      handleOk={() => {
        console.log(`Minting ${amount} tokens`);
        mintTokens(parseUnits(amount, nativeTokenInfo?.decimals));
      }}
    />
  );

  if (!isOpen) return null;
  return <GenericModal onClose={() => setIsOpen(false)} title={modalTitle} body={modalBody} footer={modalFooter} />;
};

export default MintModal;

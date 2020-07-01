import React, { ReactElement, useCallback, useMemo, useState } from "react";
import { GenericModal, Text, ModalFooterConfirmation, Select } from "@gnosis.pm/safe-react-components";
import { useColonyClient, useNativeTokenAddress, useTokens } from "../../../contexts/ColonyContext";
import startPayoutRoundTxs from "../../../utils/transactions/rewards/startPayoutRound";
import { useSafeInfo, useAppsSdk } from "../../../contexts/SafeContext";
import { Token } from "../../../typings";

const StartPayoutModal = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: Function }): ReactElement | null => {
  const safeInfo = useSafeInfo();
  const appsSdk = useAppsSdk();
  const colonyClient = useColonyClient();
  const tokens = useTokens();
  const nativeTokenAddress = useNativeTokenAddress();
  const payableTokens = useMemo(
    () => tokens.filter(({ address }: { address: string }) => address !== nativeTokenAddress),
    [tokens, nativeTokenAddress],
  );

  const [selectedToken, setSelectedToken] = useState<Token>(payableTokens[0]);

  const modalBody = (
    <>
      <Text size="md"> {`Start a payout of ${selectedToken?.symbol}`} </Text>
      <Select
        items={tokens.map(({ symbol, address }: { symbol: string; address: string }) => ({
          label: symbol,
          id: address,
        }))}
        activeItemId={selectedToken?.address}
        onItemClick={id => {
          const token = tokens.find(({ address }: { address: string }) => id === address);
          if (token) setSelectedToken(token);
        }}
      />
    </>
  );

  const startPayout = useCallback(async () => {
    if (colonyClient && selectedToken?.address && safeInfo?.safeAddress) {
      const txs = await startPayoutRoundTxs(colonyClient, selectedToken.address, safeInfo?.safeAddress);
      appsSdk.sendTransactions(txs);
    }
  }, [colonyClient, selectedToken, safeInfo, appsSdk]);

  const modalFooter = (
    <ModalFooterConfirmation
      okText="Start Payout"
      handleCancel={() => setIsOpen(false)}
      handleOk={() => startPayout()}
    />
  );

  if (!isOpen) return null;
  return (
    <GenericModal
      onClose={() => setIsOpen(false)}
      title={`${selectedToken?.symbol} Payout`}
      body={modalBody}
      footer={modalFooter}
    />
  );
};

export default StartPayoutModal;

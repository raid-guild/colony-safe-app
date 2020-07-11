import React, { ReactElement, useCallback } from "react";
import { GenericModal, Text } from "@gnosis.pm/safe-react-components";
import ModalFooter from "./ModalFooter";
import { Token, PayoutInfo } from "../../../typings";
import { useAppsSdk, useSafeInfo } from "../../../contexts/SafeContext";
import { useColonyClient } from "../../../contexts/ColonyContext";
import claimPayoutTxs from "../../../utils/transactions/rewards/claimPayout";
import waivePayoutTxs from "../../../utils/transactions/rewards/waivePayout";

const PayoutModal = ({
  isOpen,
  setIsOpen,
  payouts,
  token,
}: {
  isOpen: boolean;
  setIsOpen: Function;
  payouts: PayoutInfo[];
  token: Token;
}): ReactElement | null => {
  const safeInfo = useSafeInfo();
  const appsSdk = useAppsSdk();
  const colonyClient = useColonyClient();

  const claimPayout = useCallback(async () => {
    if (colonyClient && safeInfo?.safeAddress) {
      const txs = await Promise.all(payouts.map(payout => claimPayoutTxs(colonyClient, safeInfo.safeAddress, payout)));
      appsSdk.sendTransactions(txs);
    }
  }, [colonyClient, payouts, safeInfo, appsSdk]);

  const waivePayout = useCallback(async () => {
    if (colonyClient && safeInfo?.safeAddress) {
      const txs = await Promise.all(payouts.map(payout => waivePayoutTxs(colonyClient, safeInfo.safeAddress, payout)));
      appsSdk.sendTransactions(txs);
    }
  }, [colonyClient, payouts, safeInfo, appsSdk]);

  const modalBody = (
    <>
      <Text size="md">{`You may claim or waive your share of the ${payouts.length} ${token.symbol} payout(s).`}</Text>
    </>
  );

  const modalFooter = (
    <ModalFooter cancelText="Waive" okText="Claim" handleCancel={() => waivePayout()} handleOk={() => claimPayout()} />
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

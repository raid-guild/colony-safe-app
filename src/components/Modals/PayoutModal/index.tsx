import React, { ReactElement, useCallback } from "react";
import { GenericModal } from "@gnosis.pm/safe-react-components";
import ModalFooter from "./ModalFooter";
import { PayoutInfo } from "../../../typings";
import { useAppsSdk, useSafeInfo } from "../../../contexts/SafeContext";
import { useColonyClient } from "../../../contexts/ColonyContext";
import claimPayoutTxs from "../../../utils/transactions/rewards/claimPayout";
import waivePayoutTxs from "../../../utils/transactions/rewards/waivePayout";
import ModalBody from "./ModalBody";

const PayoutModal = ({
  isOpen,
  setIsOpen,
  payouts,
}: {
  isOpen: boolean;
  setIsOpen: Function;
  payouts: PayoutInfo[];
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

  const modalFooter = (
    <ModalFooter cancelText="Waive" okText="Claim" handleCancel={() => waivePayout()} handleOk={() => claimPayout()} />
  );

  if (!isOpen) return null;
  return (
    <GenericModal
      onClose={() => setIsOpen(false)}
      title="Claim Payouts"
      body={<ModalBody payouts={payouts} />}
      footer={modalFooter}
    />
  );
};

export default PayoutModal;

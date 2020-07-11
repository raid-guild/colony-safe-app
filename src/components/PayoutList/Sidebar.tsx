import React, { useMemo, useState } from "react";
import { ColonyRole } from "@colony/colony-js";
import { Text, Button } from "@gnosis.pm/safe-react-components";
import { BigNumber } from "ethers/utils";
import { useHasDomainPermission, useRewardInverse, useActivePayouts } from "../../contexts/ColonyContext";
import { useSafeInfo } from "../../contexts/SafeContext";
import SetRewardsModal from "../Modals/SetRewardsModal";
import TokenLockingModal from "../Modals/TokenLockingModal";
import PayoutModal from "../Modals/PayoutModal";

const PayoutSidebar = () => {
  const safeInfo = useSafeInfo();
  const rewardsInverse = useRewardInverse();
  const activePayouts = useActivePayouts().sort((a, b) => {
    if (a.tokenAddress === b.tokenAddress) return 0;
    return a.tokenAddress.toUpperCase() > b.tokenAddress.toUpperCase() ? 1 : -1;
  });
  const hasRootPermission = useHasDomainPermission(safeInfo?.safeAddress, 1, ColonyRole.Root);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const rewardsPercentage = useMemo(() => new BigNumber(100).div(rewardsInverse), [rewardsInverse]);

  return (
    <>
      <Text size="md">{`${rewardsPercentage}% of all incoming revenue is contributed to the rewards pot`}</Text>
      <SetRewardsModal disabled={!hasRootPermission} />
      <TokenLockingModal lock />
      <TokenLockingModal />
      <PayoutModal isOpen={isOpen} setIsOpen={setIsOpen} payouts={activePayouts} />
      <Button size="md" color="primary" onClick={() => setIsOpen(!isOpen)} disabled={activePayouts.length === 0}>
        Claim all payouts
      </Button>
    </>
  );
};

export default PayoutSidebar;

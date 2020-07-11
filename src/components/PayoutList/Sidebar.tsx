import React, { useMemo } from "react";
import { ColonyRole } from "@colony/colony-js";
import { Text } from "@gnosis.pm/safe-react-components";
import { BigNumber } from "ethers/utils";
import { useHasDomainPermission, useRewardInverse } from "../../contexts/ColonyContext";
import { useSafeInfo } from "../../contexts/SafeContext";
import SetRewardsModal from "../Modals/SetRewardsModal";
import TokenLockingModal from "../Modals/TokenLockingModal";

const PayoutSidebar = () => {
  const safeInfo = useSafeInfo();
  const rewardsInverse = useRewardInverse();
  const hasRootPermission = useHasDomainPermission(safeInfo?.safeAddress, 1, ColonyRole.Root);

  const rewardsPercentage = useMemo(() => new BigNumber(100).div(rewardsInverse), [rewardsInverse]);

  return (
    <>
      <Text size="md">{`${rewardsPercentage}% of all incoming revenue is contributed to the rewards pot`}</Text>
      <SetRewardsModal disabled={!hasRootPermission} />
      <TokenLockingModal lock />
      <TokenLockingModal />
    </>
  );
};

export default PayoutSidebar;

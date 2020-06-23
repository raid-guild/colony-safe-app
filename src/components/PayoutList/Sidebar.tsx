import React from "react";
import { ColonyRole } from "@colony/colony-js";
import { Button, Text } from "@gnosis.pm/safe-react-components";
import { useHasDomainPermission } from "../../contexts/ColonyContext";
import { useSafeInfo } from "../../contexts/SafeContext";
import SetRewardsModal from "../Modals/SetRewardsModal";

const PayoutSidebar = () => {
  const safeInfo = useSafeInfo();
  const hasRootPermission = useHasDomainPermission(safeInfo?.safeAddress, 1, ColonyRole.Root);

  return (
    <>
      <Text size="md">20% of all incoming revenue is contributed to the rewards pot</Text>
      <SetRewardsModal disabled={!hasRootPermission} />
      <Button size="md" color="primary" onClick={() => console.log("Opening Lock/Unlock Tokens")}>
        Lock/Unlock Tokens
      </Button>
    </>
  );
};

export default PayoutSidebar;

import React, { useState, ReactElement } from "react";
import styled from "styled-components";

// import { SafeInfo, SdkInstance } from "@gnosis.pm/safe-apps-sdk";

// import { useAppsSdk } from "./hooks";
import ColonyTabs from "./components/ColonyTabs";
import { useColonyClient } from "./contexts/ColonyContext";
import SetRewardsModal from "./components/Modals/SetRewardsModal.tsx";
import DomainTree from "./components/ColonyTree/DomainTree";
import ColonyTree from "./components/ColonyTree";

const OuterWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  padding: 16px 24px;
  width: calc(100% - 48px);
`;

const LeftWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;

  :first-child {
    margin-top: 80px;
  }
`;

function ColonyWidget() {
  const colonyClient = useColonyClient();

  /** State Variables **/
  // const [appsSdk, safeInfo]: [SdkInstance, SafeInfo | undefined] = useAppsSdk();
  const [currentTab, setCurrentTab] = useState<number>(0);

  if (!colonyClient) return null;
  const sideBar = (): ReactElement | null => {
    switch (currentTab) {
      case 0:
        return <ColonyTree />;
      case 1:
        return <DomainTree colonyClient={colonyClient} />;
      case 2:
        return <SetRewardsModal />;
      default:
        return null;
    }
  };

  return (
    <OuterWrapper>
      <LeftWrapper>{sideBar()}</LeftWrapper>
      <ColonyTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
    </OuterWrapper>
  );
}

export default ColonyWidget;

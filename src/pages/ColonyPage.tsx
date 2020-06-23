/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, ChangeEvent } from "react";
import { Tabs, Tab } from "@material-ui/core";
import styled from "styled-components";

import { useTokensInfo } from "../contexts/ColonyContext";

import SetRewardsModal from "../components/Modals/SetRewardsModal.tsx";
import DomainTree from "../components/ColonyTree/DomainTree";
import ColonyTree from "../components/ColonyTree";
import TokenList from "../components/TokenList";
import PayoutList from "../components/PayoutList";
import PermissionsList from "../components/PermissionsList";

const OuterWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  padding: 16px 24px;
  width: calc(100% - 48px);
`;

const TabsWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  flex-flow: column nowrap;
`;

const TabContentsWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

const LeftWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;

  min-width: 140px;
`;

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <TabContentsWrapper hidden={value !== index} {...other}>
      {value === index && <>{children}</>}
    </TabContentsWrapper>
  );
}

enum TabsLabels {
  Tokens = 0,
  Permissions,
  Rewards,
}

const ColonyPage = () => {
  const tokens = useTokensInfo();
  /** State Variables **/
  const [currentTab, setCurrentTab] = useState<TabsLabels>(0);

  const handleChange = (_event: ChangeEvent<{}>, newValue: number) => setCurrentTab(newValue);

  return (
    <OuterWrapper>
      <TabsWrapper>
        <Tabs value={currentTab} onChange={handleChange}>
          <Tab label="Tokens" />
          <Tab label="Permissions" />
          <Tab label="Rewards" />
        </Tabs>
        <TabPanel value={currentTab} index={TabsLabels.Tokens}>
          <LeftWrapper>
            <ColonyTree />
          </LeftWrapper>
          <TokenList tokens={tokens} />
        </TabPanel>
        <TabPanel value={currentTab} index={TabsLabels.Permissions}>
          <LeftWrapper>
            <DomainTree />
          </LeftWrapper>
          <PermissionsList />
        </TabPanel>
        <TabPanel value={currentTab} index={TabsLabels.Rewards}>
          <LeftWrapper>
            <SetRewardsModal />
          </LeftWrapper>
          <PayoutList tokens={tokens} />
        </TabPanel>
      </TabsWrapper>
    </OuterWrapper>
  );
};

export default ColonyPage;

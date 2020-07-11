/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, ChangeEvent } from "react";
import { Tabs, Tab } from "@material-ui/core";
import styled from "styled-components";

import { useTokens } from "../contexts/ColonyContext";

import PayoutSidebar from "../components/PayoutList/Sidebar";
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
  align-items: flex-end;
  margin-right: 16px
  width: 140px;
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
  const tokens = useTokens();
  /** State Variables **/
  const [currentTab, setCurrentTab] = useState<TabsLabels>(0);
  const [currentDomainId, setCurrentDomainId] = useState<number>(1);

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
            <ColonyTree currentDomainId={currentDomainId} setCurrentDomainId={setCurrentDomainId} />
          </LeftWrapper>
          <TokenList tokens={tokens} currentDomainId={currentDomainId} />
        </TabPanel>
        <TabPanel value={currentTab} index={TabsLabels.Permissions}>
          <LeftWrapper>
            <DomainTree currentDomainId={currentDomainId} setCurrentDomainId={setCurrentDomainId} />
          </LeftWrapper>
          <PermissionsList currentDomainId={Math.max(currentDomainId, 1)} />
        </TabPanel>
        <TabPanel value={currentTab} index={TabsLabels.Rewards}>
          <LeftWrapper>
            <PayoutSidebar />
          </LeftWrapper>
          <PayoutList />
        </TabPanel>
      </TabsWrapper>
    </OuterWrapper>
  );
};

export default ColonyPage;

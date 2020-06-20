/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import { Tabs, Tab, Box } from "@material-ui/core";
import styled from "styled-components";

import { useTokens } from "../hooks/useTokens";

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

const LeftWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  min-width: 120px;

  :first-child {
    margin-top: 80px;
  }
`;

const TabsWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div hidden={value !== index} {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

const SideBar = ({ currentTab }: { currentTab: number }) => {
  switch (currentTab) {
    case 0:
      return <ColonyTree />;
    case 1:
      return <DomainTree />;
    case 2:
      return <SetRewardsModal />;
    default:
      return null;
  }
};

const ColonyPage = () => {
  const tokens = useTokens();
  /** State Variables **/
  const [currentTab, setCurrentTab] = useState<number>(0);

  const handleChange = (_event: any, newValue: number) => setCurrentTab(newValue);

  return (
    <OuterWrapper>
      <LeftWrapper>
        <SideBar currentTab={currentTab} />
      </LeftWrapper>
      <TabsWrapper>
        <Tabs variant="fullWidth" value={currentTab} onChange={handleChange}>
          <Tab label="Tokens" />
          <Tab label="Permissions" />
          <Tab label="Rewards" />
        </Tabs>
        <TabPanel value={currentTab} index={0}>
          <TokenList tokens={tokens} />
        </TabPanel>
        <TabPanel value={currentTab} index={1}>
          <PermissionsList />
        </TabPanel>
        <TabPanel value={currentTab} index={2}>
          <PayoutList tokens={tokens} />
        </TabPanel>
      </TabsWrapper>
    </OuterWrapper>
  );
};

export default ColonyPage;

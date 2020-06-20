/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from "react";
import { Tabs, Tab, Box } from "@material-ui/core";
import styled from "styled-components";

import { getColonyRoles, ColonyRoles } from "@colony/colony-js";

import TokenList from "../TokenList";
import { getTokenList } from "../../config/tokens";
import PayoutList from "../PayoutList";
import PermissionsList from "../PermissionsList";
import { useColonyClient } from "../../contexts/ColonyContext";

const TabsWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

const ColonyTabs = ({ currentTab, setCurrentTab }: { currentTab: number; setCurrentTab: Function }) => {
  const colonyClient = useColonyClient();

  const [roles, setRoles] = useState<ColonyRoles>([]);

  const handleChange = (event: any, newValue: number) => {
    setCurrentTab(newValue);
  };

  useEffect(() => {
    if (colonyClient) {
      getColonyRoles(colonyClient).then((newRoles: ColonyRoles) => setRoles(newRoles));
    } else {
      setRoles([]);
    }
  }, [colonyClient]);

  return (
    <TabsWrapper>
      <Tabs variant="fullWidth" value={currentTab} onChange={handleChange} aria-label="nav tabs example">
        <Tab label="Tokens" {...a11yProps(0)} />
        <Tab label="Permissions" {...a11yProps(1)} />
        <Tab label="Rewards" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={currentTab} index={0}>
        <TokenList tokens={getTokenList("mainnet")} />
      </TabPanel>
      <TabPanel value={currentTab} index={1}>
        <PermissionsList roles={roles} />
      </TabPanel>
      <TabPanel value={currentTab} index={2}>
        <PayoutList tokens={getTokenList("mainnet")} />
      </TabPanel>
    </TabsWrapper>
  );
};

export default ColonyTabs;

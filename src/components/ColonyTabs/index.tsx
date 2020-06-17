/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Tabs, Tab, Typography, Box } from "@material-ui/core";
import styled from "styled-components";
import TokenList from "../TokenList";
import { getTokenList } from "../../config/tokens";
import PayoutList from "../PayoutList";
import PermissionsList from "../PermissionsList";

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
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const addresses: string[] = [
  "0xb199bc8c72e9ea1b9975847b0288fd8cda3527f6",
  "0xc51adb43cd9f42ea9a42578dca7cb9342791c818",
  "0x7dc04439e397ac3003be272c45e7f3266f9c2c3f",
  "0x8622285accf80eb5b23169eaf7d8d4133dc7255c",
  "0xe6407608209dd8e028803e002cd35cb7af541651",
  "0xddd26c200bf6dbb775a9d91fc24b5ece5be7a45f",
  "0x8a91c9a16cd62693649d80afa85a09dbbdcb8508",
  "0xb199bc8c72e9ea1b9975847b0288fd8cda3527f6",
  "0xb199bc8c72e9ea1b9975847b0288fd8cda3527f6",
];

const ColonyTabs = ({ currentTab, setCurrentTab }: { currentTab: number; setCurrentTab: Function }) => {
  const handleChange = (event: any, newValue: number) => {
    setCurrentTab(newValue);
  };

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
        <PermissionsList addresses={addresses} />
      </TabPanel>
      <TabPanel value={currentTab} index={2}>
        <PayoutList tokens={getTokenList("mainnet")} />
      </TabPanel>
    </TabsWrapper>
  );
};

export default ColonyTabs;

import React, { ReactElement } from "react";
import { Text, TextField } from "@gnosis.pm/safe-react-components";
import { Tabs, Tab, Box } from "@material-ui/core";
import { Token } from "../../../typings";

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div hidden={value !== index} {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

const TokenModalBody = ({
  token,
  hasRootRole,
  hasAdministrationRole,
  hasFundingRole,
  currentTab,
  handleChangeTab,
  amount,
  handleChangeAmount,
}: {
  token: Token;
  hasRootRole: boolean;
  hasAdministrationRole: boolean;
  hasFundingRole: boolean;
  currentTab: number;
  handleChangeTab: (_event: any, newValue: number) => void;
  amount: string;
  handleChangeAmount: (_event: any) => void;
}): ReactElement => (
  <>
    <Text size="lg">{`This is the ${token.symbol} modal`}</Text>
    <Text size="lg">{hasRootRole ? "This user can mint colony tokens" : "This user can't mint colony tokens"}</Text>
    <Text size="lg">
      {hasAdministrationRole ? "This user can initiate payments" : "This user can't initiate payments"}
    </Text>
    <Text size="lg">
      {hasFundingRole ? "This user can transfer funds between pots" : "This user can't transfer funds between pots"}
    </Text>
    <Tabs variant="fullWidth" value={currentTab} onChange={handleChangeTab}>
      <Tab label="Move" />
      <Tab label="Send" />
      <Tab label="Mint" />
    </Tabs>
    <TabPanel value={currentTab} index={0}>
      Move
    </TabPanel>
    <TabPanel value={currentTab} index={1}>
      Send
    </TabPanel>
    <TabPanel value={currentTab} index={2}>
      Amount <TextField label="Mint Amount" value={amount} onChange={handleChangeAmount} />
    </TabPanel>
  </>
);

export default TokenModalBody;

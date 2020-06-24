import React, { ReactElement } from "react";
import { Text } from "@gnosis.pm/safe-react-components";
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
  hasAdministrationRole,
  hasFundingRole,
  currentTab,
  handleChangeTab,
  _amount,
  _handleChangeAmount,
}: {
  token: Token;
  hasAdministrationRole: boolean;
  hasFundingRole: boolean;
  currentTab: number;
  handleChangeTab: (_event: any, newValue: number) => void;
  _amount: string;
  _handleChangeAmount: (_event: any) => void;
}): ReactElement => (
  <>
    <Text size="lg">{`This is the ${token.symbol} modal`}</Text>

    <Tabs variant="fullWidth" value={currentTab} onChange={handleChangeTab}>
      <Tab label="Move" />
      <Tab label="Send" />
    </Tabs>
    <TabPanel value={currentTab} index={0}>
      <Text size="lg">
        {hasFundingRole ? "This user can transfer funds between pots" : "This user can't transfer funds between pots"}
      </Text>
    </TabPanel>
    <TabPanel value={currentTab} index={1}>
      <Text size="lg">
        {hasAdministrationRole ? "This user can initiate payments" : "This user can't initiate payments"}
      </Text>
    </TabPanel>
  </>
);

export default TokenModalBody;

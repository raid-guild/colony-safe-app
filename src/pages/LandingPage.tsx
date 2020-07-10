import React, { useState, ChangeEvent, useCallback } from "react";
import styled from "styled-components";

import { CircularProgress, Button } from "@material-ui/core";
import { Title, TextField } from "@gnosis.pm/safe-react-components";
import { getAddress } from "ethers/utils";
import { useSetColony } from "../contexts/ColonyContext";

const LandingPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px 24px;
  width: calc(100% - 48px);
  height: calc(100% - 32px);
`;

const ColonyNameInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const isAddress = (possibleAddress: string): boolean => {
  try {
    getAddress(possibleAddress);
    return true;
  } catch (error) {
    return false;
  }
};

const ColonyENSInput = () => {
  const setColony = useSetColony();
  const [ensName, setEnsName] = useState<string>("");
  const [clicked, setClicked] = useState<boolean>(false);

  const handleColonyNameInput = useCallback(
    (name: string) => {
      // If user has given the colony address or full ens name then can use that directly
      if (isAddress(name) || name.indexOf(".eth") > 0) setColony(name);

      // If not we assume they just gave the colony's subdomain and add the suffix
      setColony(`${name}.colony.joincolony.eth`);
    },
    [setColony],
  );

  if (clicked) return <CircularProgress />;
  return (
    <ColonyNameInputWrapper>
      <TextField
        label="Colony Name"
        value={ensName}
        onChange={(e: ChangeEvent<HTMLInputElement>): void => setEnsName(e.target.value)}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>): void => {
          if (e.key === "Enter") {
            setClicked(true);
            handleColonyNameInput(ensName);
          }
        }}
      />
      <Button
        onClick={() => {
          setClicked(true);
          handleColonyNameInput(ensName);
        }}
      >
        Confirm
      </Button>
    </ColonyNameInputWrapper>
  );
};

const LandingPage = () => {
  // If we have a predefined colony then there is no need to display other elements
  if (process.env.REACT_APP_COLONY_ENS_NAME) {
    return (
      <LandingPageWrapper>
        <CircularProgress />
      </LandingPageWrapper>
    );
  }

  return (
    <LandingPageWrapper>
      <Title size="md">A platform for community collaboration.</Title>
      <Title size="md">Do work, make decisions, and manage money, together.</Title>
      <ColonyENSInput />
    </LandingPageWrapper>
  );
};

export default LandingPage;

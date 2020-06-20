import React, { useState } from "react";
import styled from "styled-components";

import { CircularProgress, Button } from "@material-ui/core";
import { Title } from "@gnosis.pm/safe-react-components";
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

const LandingPage = () => {
  const setColony = useSetColony();
  const [clicked, setClicked] = useState<boolean>(false);
  return (
    <LandingPageWrapper>
      <Title size="md">A platform for community collaboration.</Title>
      <Title size="md">Do work, make decisions, and manage money, together.</Title>
      {clicked ? (
        <CircularProgress />
      ) : (
        <Button
          onClick={() => {
            setClicked(true);
            setColony(2); // Temporary value. This should take the user-inputted value from a text field
          }}
        >
          click me
        </Button>
      )}
    </LandingPageWrapper>
  );
};

export default LandingPage;

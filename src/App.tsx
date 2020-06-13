import React from "react";
import { ThemeProvider } from "styled-components";

import { SafeInfo, SdkInstance } from "@gnosis.pm/safe-apps-sdk";

import WidgetWrapper from "./components/WidgetWrapper";
import theme from "./theme";

import { useAppsSdk } from "./hooks";


function ColonyWidget() {
  
  /** State Variables **/
  const [appsSdk, safeInfo]: [SdkInstance, SafeInfo | undefined] = useAppsSdk();

  return (
    <ThemeProvider theme={theme}>
      <WidgetWrapper>
      </WidgetWrapper>
    </ThemeProvider>
  );
}

export default ColonyWidget;

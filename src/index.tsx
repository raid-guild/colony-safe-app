import React from "react";
import ReactDOM from "react-dom";

import { ThemeProvider } from "styled-components";
import App from "./App";
import GlobalStyles from "./global";
import ColonyProvider from "./contexts/ColonyContext";
import theme from "./theme";

ReactDOM.render(
  <>
    <GlobalStyles />
    <ThemeProvider theme={theme}>
      <ColonyProvider>
        <App />
      </ColonyProvider>
    </ThemeProvider>
  </>,
  document.getElementById("root"),
);

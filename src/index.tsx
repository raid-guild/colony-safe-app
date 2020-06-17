import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import GlobalStyles from "./global";
import ColonyProvider from "./contexts/ColonyContext";

ReactDOM.render(
  <>
    <GlobalStyles />
    <ColonyProvider>
      <App />
    </ColonyProvider>
  </>,
  document.getElementById("root"),
);

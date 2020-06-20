import React from "react";

import { useColonyClient } from "./contexts/ColonyContext";
import LandingPage from "./pages/LandingPage";
import ColonyPage from "./pages/ColonyPage";

function ColonyWidget() {
  const colonyClient = useColonyClient();

  return colonyClient ? <ColonyPage colonyClient={colonyClient} /> : <LandingPage />;
}

export default ColonyWidget;

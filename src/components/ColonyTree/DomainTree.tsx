import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { ColonyClient } from "@colony/colony-js";

import TreeView from "@material-ui/lab/TreeView";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { useColonyClient } from "../../contexts/ColonyContext";
import getColonyDomains from "../../utils/colony/getColonyDomains";
import { Domain } from "../../typings";
import DomainTreeItems from "./DomainTreeItems";

const useStyles = makeStyles({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400,
  },
});

export default function DomainTree() {
  const colonyClient: ColonyClient | undefined = useColonyClient();
  const [domains, setDomains] = useState<Domain[]>([]);
  const classes = useStyles();

  useEffect(() => {
    if (colonyClient) {
      getColonyDomains(colonyClient).then((newDomains: Domain[]) => setDomains(newDomains));
    } else {
      setDomains([]);
    }
  }, [colonyClient]);

  console.log(domains);
  return (
    <TreeView
      className={classes.root}
      defaultExpanded={["0"]}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
    >
      <DomainTreeItems domains={domains} />
    </TreeView>
  );
}

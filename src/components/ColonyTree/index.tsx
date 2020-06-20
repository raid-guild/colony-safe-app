import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { ColonyClient } from "@colony/colony-js";
import StyledTreeItem from "./StyledTreeItem";
import getColonyDomains from "../../utils/colony/getColonyDomains";
import { Domain } from "../../typings";
import { useColonyClient } from "../../contexts/ColonyContext";
import DomainTreeItems from "./DomainTreeItems";

const useStyles = makeStyles({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400,
  },
});

export default function ColonyTree() {
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

  return (
    <TreeView
      className={classes.root}
      defaultExpanded={["3"]}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
    >
      <StyledTreeItem nodeId="1" labelText="Entire Colony" />
      <StyledTreeItem nodeId="2" labelText="Rewards Pot" />
      <DomainTreeItems domains={domains} />
    </TreeView>
  );
}

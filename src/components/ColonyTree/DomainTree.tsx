import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import TreeView from "@material-ui/lab/TreeView";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import DomainTreeItems from "./DomainTreeItems";
import { useColonyDomains } from "../../contexts/ColonyContext";

const useStyles = makeStyles({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400,
  },
});

export default function DomainTree({
  currentDomainId,
  setCurrentDomainId,
}: {
  currentDomainId: number;
  setCurrentDomainId: Function;
}) {
  const domains = useColonyDomains();
  const classes = useStyles();
  const [expanded, setExpanded] = useState<string[]>([]);

  const handleToggle = (_event: any, nodeIds: string[]) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (_event: any, nodeIds: string[]) => {
    setCurrentDomainId(parseInt(nodeIds.toString(), 10));
  };

  return (
    <TreeView
      className={classes.root}
      defaultExpanded={["1"]}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      expanded={expanded}
      selected={[currentDomainId.toString()]}
      onNodeToggle={handleToggle}
      onNodeSelect={handleSelect}
    >
      <DomainTreeItems domains={domains} />
    </TreeView>
  );
}

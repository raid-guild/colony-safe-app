import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { ColonyClient } from "@colony/colony-js";
import { BigNumber } from "ethers/utils";

import TreeView from "@material-ui/lab/TreeView";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import StyledTreeItem from "./StyledTreeItem";
import { useColonyClient } from "../../contexts/ColonyContext";
import getColonyDomains from "../../utils/colony/getColonyDomains";

const useStyles = makeStyles({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400,
  },
});

type Domain = { skillId: BigNumber; fundingPotId: BigNumber; 0: BigNumber; 1: BigNumber };

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
      defaultExpanded={["1"]}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
    >
      <StyledTreeItem nodeId="1" labelText="Root Domain">
        <StyledTreeItem nodeId="2" labelText="Domain #1" />
        <StyledTreeItem nodeId="3" labelText="Domain #2" />
      </StyledTreeItem>
    </TreeView>
  );
}

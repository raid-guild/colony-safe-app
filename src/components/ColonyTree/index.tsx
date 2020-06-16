import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import StyledTreeItem from "./StyledTreeItem";

const useStyles = makeStyles({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400,
  },
});

export default function ColonyTree() {
  const classes = useStyles();

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
      <StyledTreeItem nodeId="3" labelText="Root Domain">
        <StyledTreeItem nodeId="4" labelText="Domain #1" />
        <StyledTreeItem nodeId="5" labelText="Domain #2" />
      </StyledTreeItem>
    </TreeView>
  );
}

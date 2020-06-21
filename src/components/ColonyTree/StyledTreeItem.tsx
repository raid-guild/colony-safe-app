import React, { ReactElement } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TreeItem from "@material-ui/lab/TreeItem";
import Typography from "@material-ui/core/Typography";

const useTreeItemStyles = makeStyles(theme => ({
  root: {
    //   color: theme.palette.text.secondary,
    //   "&:hover > $content": {
    //     // backgroundColor: theme.palette.action.hover,
    //   },
    //   "&:focus > $content, &$selected > $content": {
    //     // backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
    //     // color: "var(--tree-view-color)",
    //   },
    //   "&:focus > $content $label, &:hover > $content $label, &$selected > $content $label": {
    //     backgroundColor: "transparent",
    //   },
  },
  content: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "$expanded > &": {
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
  group: {
    marginLeft: 0,
    "& $content": {
      paddingLeft: theme.spacing(2),
    },
  },
  expanded: {},
  selected: {},
  label: {
    fontWeight: "inherit",
    color: "inherit",
  },
  labelRoot: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0.5, 0),
  },
  labelIcon: {
    marginRight: theme.spacing(1),
  },
  labelText: {
    fontWeight: "inherit",
    flexGrow: 1,
  },
}));

export default function StyledTreeItem({
  nodeId,
  children,
  labelText,
  labelInfo,
  ...others
}: {
  nodeId: string;
  children?: ReactElement[];
  labelText: string;
  labelInfo?: string;
}) {
  const classes = useTreeItemStyles();

  return (
    <TreeItem
      nodeId={nodeId}
      label={
        <div className={classes.labelRoot}>
          <Typography variant="body2" className={classes.labelText}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </div>
      }
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        selected: classes.selected,
        group: classes.group,
        label: classes.label,
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...others}
    >
      {children}
    </TreeItem>
  );
}

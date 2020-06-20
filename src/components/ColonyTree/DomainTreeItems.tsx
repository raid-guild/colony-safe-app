import React from "react";

import StyledTreeItem from "./StyledTreeItem";
import { Domain } from "../../typings";

const DomainTreeItems = ({ domains }: { domains: Domain[] }) => {
  if (domains.length === 0) return null;
  if (domains.length === 1) return <StyledTreeItem nodeId="0" labelText="Root Domain" />;

  return (
    <StyledTreeItem nodeId="0" labelText="Root Domain">
      {domains.slice(1).map((_domain: Domain, index: number) => {
        const domainNumber = index + 1;
        return (
          // eslint-disable-next-line react/no-array-index-key
          <StyledTreeItem key={domainNumber} nodeId={domainNumber.toString()} labelText={`Domain #${domainNumber}`} />
        );
      })}
    </StyledTreeItem>
  );
};

export default DomainTreeItems;

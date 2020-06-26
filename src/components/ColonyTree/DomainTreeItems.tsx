import React from "react";

import StyledTreeItem from "./StyledTreeItem";
import { Domain } from "../../typings";

const DomainTreeItems = ({ domains, startNodeId = 1 }: { domains: Domain[]; startNodeId?: number }) => {
  if (domains.length === 0) return null;
  if (domains.length === 1) return <StyledTreeItem nodeId={startNodeId.toString()} labelText="Root Domain" />;

  return (
    <StyledTreeItem nodeId={startNodeId.toString()} labelText="Root Domain">
      {domains.slice(1).map((_domain: Domain, index: number) => {
        const domainNumber = index + 1;
        const nodeId = startNodeId + domainNumber;
        return (
          // eslint-disable-next-line react/no-array-index-key
          <StyledTreeItem key={domainNumber} nodeId={nodeId.toString()} labelText={`Domain #${domainNumber}`} />
        );
      })}
    </StyledTreeItem>
  );
};

export default DomainTreeItems;

import React from "react";

import StyledTreeItem from "./StyledTreeItem";
import { Domain } from "../../typings";

const DomainTreeItems = ({ domains, startNoteId = 0 }: { domains: Domain[]; startNoteId?: number }) => {
  if (domains.length === 0) return null;
  if (domains.length === 1) return <StyledTreeItem nodeId={startNoteId.toString()} labelText="Root Domain" />;

  return (
    <StyledTreeItem nodeId={startNoteId.toString()} labelText="Root Domain">
      {domains.slice(1).map((_domain: Domain, index: number) => {
        const domainNumber = index + 1;
        const nodeId = startNoteId + domainNumber;
        return (
          // eslint-disable-next-line react/no-array-index-key
          <StyledTreeItem key={domainNumber} nodeId={nodeId.toString()} labelText={`Domain #${domainNumber}`} />
        );
      })}
    </StyledTreeItem>
  );
};

export default DomainTreeItems;

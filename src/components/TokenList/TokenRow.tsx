import React, { useState, useEffect } from "react";
import { TableRow, TableCell } from "@material-ui/core";

import { formatUnits, bigNumberify } from "ethers/utils";

import TokenModal from "../Modals/TokenModal";
import { useColonyClient } from "../../contexts/ColonyContext";
import { Token, Domain, PermissionProof } from "../../typings";
import useDomainTokenBalance from "./balance";

const useColonyDomain = (domainId: number) => {
  const client = useColonyClient();
  const [domain, setDomain] = useState<Domain>();

  useEffect(() => {
    if (client && domainId > 0)
      client
        .getDomain(domainId)
        .then(currentDomain =>
          setDomain({ domainId: bigNumberify(domainId), 2: bigNumberify(domainId), ...currentDomain }),
        );
  }, [client, domainId]);

  return domain;
};

const TokenRow = ({
  token,
  currentDomainId,
  adminPermissionProof,
  fundingPermissionProof,
}: {
  token: Token;
  currentDomainId: number;
  adminPermissionProof?: PermissionProof;
  fundingPermissionProof?: PermissionProof;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const domain = useColonyDomain(currentDomainId);
  const balance = useDomainTokenBalance(currentDomainId, token.address);

  return (
    <>
      {typeof domain !== "undefined" && (
        <TokenModal
          // isOpen={typeof adminPermissionProof !== "undefined" && typeof fundingPermissionProof !== "undefined" && isOpen}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          token={token}
          domain={domain}
          adminPermissionProof={adminPermissionProof}
          fundingPermissionProof={fundingPermissionProof}
        />
      )}
      <TableRow onClick={() => setIsOpen(true)}>
        <TableCell>{token.symbol}</TableCell>
        <TableCell align="right">{formatUnits(balance, token.decimals)}</TableCell>
      </TableRow>
    </>
  );
};

export default TokenRow;

import React, { useState } from "react";
import { TableRow, TableCell } from "@material-ui/core";

import { formatUnits } from "ethers/utils";

import TokenModal from "../Modals/TokenModal";
import { Token, PermissionProof } from "../../typings";
import { useDomainTokenBalance, useColonyDomain } from "../../contexts/ColonyContext/hooks";

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

import React, { ReactElement } from "react";
import { Text, TextField, Select } from "@gnosis.pm/safe-react-components";
import { Token, PermissionProof, Domain } from "../../../typings";

const TokenModalBody = ({
  token,
  targetDomain,
  handleChangeDomain,
  fundingPermissionProof,
  amount,
  domains,
  handleChangeAmount,
}: {
  token: Token;
  targetDomain: Domain;
  handleChangeDomain: (_event: any) => void;
  fundingPermissionProof?: PermissionProof;
  amount: string;
  domains: Domain[];
  handleChangeAmount: (_event: any) => void;
}): ReactElement => {
  return (
    <>
      <Text size="lg">
        {typeof fundingPermissionProof !== "undefined"
          ? "This user can transfer funds between pots"
          : "This user can't transfer funds between pots"}
      </Text>
      <Text size="md"> To </Text>
      <Select
        items={domains.map((domain, index) => ({
          id: domain.domainId.toString(),
          label: domain.domainId.toNumber() === 1 ? `Root Domain` : `Domain ${index}`,
        }))}
        activeItemId={targetDomain.domainId.toString()}
        onItemClick={id => {
          console.log(id);
          handleChangeDomain(parseInt(id, 10));
        }}
      />
      <Text size="lg">{`${token.symbol} Amount:`}</Text>
      <TextField style={{ width: "250px" }} label="Amount" value={amount} onChange={handleChangeAmount} />
    </>
  );
};

export default TokenModalBody;

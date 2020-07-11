import React, { ReactElement } from "react";
import { Text, TextField } from "@gnosis.pm/safe-react-components";
import { Token, PermissionProof } from "../../../typings";

const SendTokensBody = ({
  token,
  address,
  handleChangeAddress,
  adminPermissionProof,
  amount,
  handleChangeAmount,
}: {
  token: Token;
  address: string;
  handleChangeAddress: (_event: any) => void;

  adminPermissionProof?: PermissionProof;
  amount: string;
  handleChangeAmount: (_event: any) => void;
}): ReactElement => {
  return (
    <>
      <Text size="lg">
        {typeof adminPermissionProof !== "undefined"
          ? "This user can initiate payments"
          : "This user can't initiate payments"}
      </Text>
      <Text size="md"> To </Text>
      <TextField style={{ width: "250px" }} label="Address" value={address} onChange={handleChangeAddress} />
      <Text size="lg">{`${token.symbol} Amount:`}</Text>
      <TextField style={{ width: "250px" }} label="Amount" value={amount} onChange={handleChangeAmount} />
    </>
  );
};

export default SendTokensBody;

import React, { ReactElement } from "react";
import { Text } from "@gnosis.pm/safe-react-components";
import { formatUnits } from "ethers/utils";
import { PayoutInfo, Token } from "../../../typings";
import { useTokens } from "../../../contexts/ColonyContext";

const ModalBody = ({ payouts }: { payouts: PayoutInfo[] }): ReactElement => {
  const tokens = useTokens();

  return (
    <>
      <Text size="md">{`You may claim or waive your share of the following ${
        payouts.length ? `${payouts.length} payouts` : "payout"
      } :`}</Text>
      {payouts.map(payout => {
        const token = tokens.find(({ address }) => address === payout.tokenAddress) as Token;
        return (
          <Text size="md" key={payout.blockTimestamp.toString()}>{`${formatUnits(payout.amount, token?.decimals)} ${
            token?.symbol
          }`}</Text>
        );
      })}
    </>
  );
};

export default ModalBody;

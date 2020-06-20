import React from "react";
import styled from "styled-components";
import Blockies from "react-blockies";
import { Text } from "@gnosis.pm/safe-react-components";
import { shortenAddress } from "../../utils";

export const Identicon = styled(Blockies)`
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  border-radius: 50%;
  margin-left: ${({ size }) => size / 2}px;
  margin-right: ${({ size }) => size / 2}px;
`;

const AddressWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Address = ({ address, digits }: { address: string; digits?: number }) => {
  return (
    <AddressWrapper>
      <Identicon seed={address} size={10} scale={3} />
      <Text size="lg">{shortenAddress(address, digits)}</Text>
    </AddressWrapper>
  );
};

export default Address;

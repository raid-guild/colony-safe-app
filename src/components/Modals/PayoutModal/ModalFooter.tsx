import React from "react";
import { Button } from "@gnosis.pm/safe-react-components";
import styled from "styled-components";

const FooterWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

type Props = {
  okText?: string;
  cancelText?: string;
  okDisabled?: boolean;
  handleOk: () => void;
  handleCancel: () => void;
};

const ModalFooter = ({ cancelText = "Cancel", handleCancel, okDisabled, handleOk, okText = "Confirm" }: Props) => {
  return (
    <FooterWrapper>
      <Button size="md" color="secondary" variant="contained" onClick={handleCancel}>
        {cancelText}
      </Button>
      <Button size="md" color="primary" variant="contained" onClick={handleOk} disabled={okDisabled}>
        {okText}
      </Button>
    </FooterWrapper>
  );
};

export default ModalFooter;

import React from "react";
import styled, { css } from "styled-components";

import { DomainRoles } from "@colony/colony-js";

import AdministrationIcon from "../../assets/permissions/administration.svg";
import ArbitrationIcon from "../../assets/permissions/arbitration.svg";
import ArchitectureIcon from "../../assets/permissions/architecture.svg";
import FundingIcon from "../../assets/permissions/funding.svg";
import RecoveryIcon from "../../assets/permissions/recovery.svg";
import RootIcon from "../../assets/permissions/root.svg";

const StyledIcon = styled.img`
  padding: 0px 5px;
  opacity: 0.5;

  ${({ active }: { active: boolean }) =>
    active &&
    css`
      opacity: 1;
    `};
`;

const icons = [RootIcon, RecoveryIcon, ArbitrationIcon, ArchitectureIcon, AdministrationIcon, FundingIcon];
const PermissionIcons = ({ permissions }: { permissions: DomainRoles }) => {
  const { roles } = permissions;
  return (
    <>
      {icons.map((icon, index) => (
        <StyledIcon src={icon} alt="" active={roles.includes(index)} />
      ))}
    </>
  );
};

export default PermissionIcons;

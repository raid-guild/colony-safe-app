import React from "react";
import styled, { css } from "styled-components";

import { ColonyRole, DomainRoles } from "@colony/colony-js";

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

const roleIconMap = {
  [ColonyRole.Recovery]: RecoveryIcon,
  [ColonyRole.Root]: RootIcon,
  [ColonyRole.Arbitration]: ArbitrationIcon,
  [ColonyRole.Architecture]: ArchitectureIcon,
  [ColonyRole.ArchitectureSubdomain_DEPRECATED]: ArchitectureIcon,
  [ColonyRole.Funding]: FundingIcon,
  [ColonyRole.Administration]: AdministrationIcon,
};

const roleArray: ColonyRole[] = [
  ColonyRole.Root,
  ColonyRole.Recovery,
  ColonyRole.Arbitration,
  ColonyRole.Architecture,
  ColonyRole.Funding,
  ColonyRole.Administration,
];

const PermissionIcons = ({ permissions }: { permissions: DomainRoles }) => {
  const { roles } = permissions;
  return (
    <>
      {roleArray.map(role => (
        // eslint-disable-next-line react/no-array-index-key
        <StyledIcon key={role} src={roleIconMap[role]} alt="" active={roles.includes(role)} />
      ))}
    </>
  );
};

export default PermissionIcons;

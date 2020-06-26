import { ColonyClient, ColonyRole } from "@colony/colony-js";
import { Interface, BigNumberish } from "ethers/utils";
import { Transaction, PermissionUpdate } from "../../../typings";

const RoleSetter = {
  [ColonyRole.Recovery]: "setRecoveryRole",
  [ColonyRole.Root]: "setRootRole",
  [ColonyRole.Arbitration]: "setArbitrationRole",
  [ColonyRole.Architecture]: "setArchitectureRole",
  [ColonyRole.ArchitectureSubdomain_DEPRECATED]: "",
  [ColonyRole.Funding]: "setFundingRole",
  [ColonyRole.Administration]: "setAdministrationRole",
};

const setRootPermissionTx = (colonyClient: ColonyClient, user: string, updatedState: boolean): Transaction => ({
  data: colonyClient.interface.functions.setRootRole.encode([user, updatedState]),
  to: colonyClient.address,
  value: 0,
});

const setRecoveryPermissionTx = (colonyClient: ColonyClient, user: string, updatedState: boolean): Transaction => {
  const functionCall = updatedState ? "setRecoveryRole" : "removeRecoveryRole";
  return {
    data: colonyClient.interface.functions[functionCall].encode([user]),
    to: colonyClient.address,
    value: 0,
  };
};

const setPermissionTx = (
  colonyClient: ColonyClient,
  role: Exclude<ColonyRole, ColonyRole.Recovery | ColonyRole.Root>,
  user: string,
  updatedState: boolean,
  domainId: BigNumberish,
  permissionDomainId: BigNumberish,
  childSkillIndex: BigNumberish,
): Transaction => {
  const colonyInterface: Interface = colonyClient.interface;
  const functionCall = RoleSetter[role];
  return {
    data: colonyInterface.functions[functionCall].encode([
      permissionDomainId,
      childSkillIndex,
      user,
      domainId,
      updatedState,
    ]),
    to: colonyClient.address,
    value: 0,
  };
};

const SetPermissions = (
  colonyClient: ColonyClient,
  user: string,
  roleUpdates: PermissionUpdate[],
  permissionDomainId: BigNumberish,
  domainId: BigNumberish,
  childSkillIndex: BigNumberish,
): Transaction[] => {
  const txs: Transaction[] = roleUpdates.map(({ role, setTo }) => {
    if (role === ColonyRole.Recovery) {
      return setRecoveryPermissionTx(colonyClient, user, setTo);
    }
    if (role === ColonyRole.Root) {
      return setRootPermissionTx(colonyClient, user, setTo);
    }
    return setPermissionTx(colonyClient, role, user, setTo, domainId, permissionDomainId, childSkillIndex);
  });

  return txs;
};

export default SetPermissions;

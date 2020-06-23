import { ColonyRoles, ColonyRole, UserRoles, DomainRoles } from "@colony/colony-js";

const userHasDomainRole = (
  colonyRoles: ColonyRoles,
  userAddress: string | undefined,
  domain: number,
  role: ColonyRole,
) => {
  try {
    // Find all roles of address of interest
    const userRoles: UserRoles | undefined = colonyRoles.find(
      ({ address }: { address: string }) => address === userAddress,
    );
    // Find their roles on the domain of interest
    const domainRoles: DomainRoles | undefined = userRoles?.domains.find(
      ({ domainId }: { domainId: number }) => domainId === domain,
    );
    return domainRoles?.roles.includes(role) || false;
  } catch (e) {
    return false;
  }
};

export default userHasDomainRole;

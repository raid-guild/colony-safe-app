import { useState, useEffect, useMemo } from "react";

import { ColonyClient, ColonyRoles, ColonyRole, getMoveFundsPermissionProofs } from "@colony/colony-js";
import { TokenInfo } from "@colony/colony-js/lib/clients/TokenClient";
import { BigNumber, BigNumberish } from "ethers/utils";
import { getPermissionProofs } from "@colony/colony-js/lib/clients/Colony/extensions/commonExtensions";
import { Zero } from "ethers/constants";
import { Domain, PermissionProof, MoveFundsBetweenPotsProof, Token, PayoutInfo } from "../../typings";
import userHasDomainRole from "../../utils/colony/userHasDomainRole";
import { MAX_U256 } from "../../constants";
import { useColonyContext } from "./ColonyContext";
import getDomainTokenBalance from "../../utils/colony/getDomainTokenBalance";
import getActivePayouts from "../../utils/colony/getColonyPayouts";

export const useColonyClient = (): ColonyClient | undefined => {
  const { colonyClient } = useColonyContext();
  return colonyClient;
};

export const useSetColony = (): Function => {
  const { setColony } = useColonyContext();
  return setColony;
};

export const useColonyRoles = (): ColonyRoles => {
  const { colonyRoles } = useColonyContext();
  return colonyRoles;
};

export const useHasDomainPermission = (
  userAddress: string | undefined,
  domainId: number,
  role: ColonyRole,
): boolean => {
  const colonyRoles = useColonyRoles();

  const hasPermission = useMemo(() => {
    // Check if user has selected role (or root)
    const rootOnDomain = userHasDomainRole(colonyRoles, userAddress, domainId, ColonyRole.Root);
    const roleOnDomain = userHasDomainRole(colonyRoles, userAddress, domainId, role);
    // The user could also inherit this role from the root domain
    const rootOnRoot = userHasDomainRole(colonyRoles, userAddress, 1, ColonyRole.Root);
    const roleOnRoot = userHasDomainRole(colonyRoles, userAddress, 1, role);
    return rootOnDomain || roleOnDomain || rootOnRoot || roleOnRoot;
  }, [colonyRoles, userAddress, domainId, role]);

  return hasPermission;
};

export const useColonyDomains = (): Domain[] => {
  const { colonyDomains } = useColonyContext();

  return colonyDomains;
};

export const useColonyDomain = (domainId: number) => {
  const domains = useColonyDomains();

  const domain: Domain | undefined = useMemo(() => {
    return domains.find(testDomain => testDomain.domainId.toNumber() === domainId);
  }, [domainId, domains]);

  return domain;
};

export const useColonyVersion = (): BigNumber => {
  const colonyClient = useColonyClient();
  const [colonyVersion, setColonyVersion] = useState<BigNumber>(new BigNumber(0));

  useEffect(() => {
    if (colonyClient) {
      colonyClient.version().then((version: BigNumber) => setColonyVersion(version));
    }
  }, [colonyClient]);
  return colonyVersion;
};

export const useNativeTokenAddress = () => {
  const colonyClient = useColonyClient();
  const [nativeTokenAddress, setNativeTokenAddress] = useState<string>();

  useEffect(() => {
    if (colonyClient) {
      colonyClient.getToken().then((address: string) => setNativeTokenAddress(address));
    }
  }, [colonyClient]);

  return nativeTokenAddress;
};

export const useNativeTokenInfo = () => {
  const colonyClient = useColonyClient();
  const [tokenInfo, setTokenInfo] = useState<TokenInfo>();

  useEffect(() => {
    if (colonyClient) {
      colonyClient.tokenClient.getTokenInfo().then((info: TokenInfo) => setTokenInfo(info));
    }
  }, [colonyClient]);

  return tokenInfo;
};

export const useTokens = (): Token[] => {
  const { tokens } = useColonyContext();

  return tokens;
};

export const useToken = (tokenAddress: string): Token | undefined => {
  const tokens = useTokens();

  const token: Token | undefined = useMemo(() => {
    return tokens.find(testToken => testToken.address === tokenAddress);
  }, [tokenAddress, tokens]);

  return token;
};

export const useRewardInverse = (): BigNumber => {
  const colonyClient = useColonyClient();
  const [rewardInverse, setRewardInverse] = useState<BigNumber>(new BigNumber(MAX_U256));

  useEffect(() => {
    if (colonyClient) {
      colonyClient.getRewardInverse().then((rewards: BigNumber) => setRewardInverse(rewards));
    }
  }, [colonyClient]);

  return rewardInverse;
};

export const usePermissionProof = (
  domainId: BigNumberish,
  role: ColonyRole,
  userAddress: string,
): PermissionProof | undefined => {
  const client = useColonyClient();

  const [permissionProof, setPermissionProof] = useState<PermissionProof>();

  useEffect(() => {
    if (client && parseInt(domainId.toString(), 10) > 1) {
      getPermissionProofs(client, domainId, role, userAddress)
        .then(setPermissionProof)
        .catch(() => setPermissionProof(undefined));
    }
  }, [client, domainId, role, userAddress]);

  return permissionProof;
};

export const useMoveFundsBetweenPotsProof = (
  domainId: BigNumberish,
  fromPotId: BigNumberish,
  toPotId: BigNumberish,
  walletAddress: string,
): MoveFundsBetweenPotsProof | undefined => {
  const client = useColonyClient();

  const [moveFundsPermissionProof, setMoveFundsPermissionProof] = useState<MoveFundsBetweenPotsProof>();

  useEffect(() => {
    if (client) {
      getMoveFundsPermissionProofs(client, fromPotId, toPotId, walletAddress)
        .then(setMoveFundsPermissionProof)
        .catch(() => setMoveFundsPermissionProof(undefined));
    }
  }, [client, fromPotId, toPotId, walletAddress]);

  return moveFundsPermissionProof;
};

export const useOneTx = (
  domainId: BigNumberish,
  role: ColonyRole,
  userAddress: string,
): PermissionProof | undefined => {
  const client = useColonyClient();

  const [permissionProof, setPermissionProof] = useState<PermissionProof>();

  useEffect(() => {
    if (client) {
      getPermissionProofs(client, domainId, role, userAddress)
        .then(setPermissionProof)
        .catch(() => setPermissionProof(undefined));
    }
  }, [client, domainId, role, userAddress]);

  return permissionProof;
};

export const useDomainTokenBalance = (domainId: BigNumberish, token: string): BigNumber => {
  const colonyClient = useColonyClient();
  const colonyDomains = useColonyDomains();
  const [balance, setBalance] = useState<BigNumber>(Zero);

  useEffect(() => {
    if (colonyClient) {
      getDomainTokenBalance(colonyClient, colonyDomains, domainId, token).then(tokenBalance =>
        setBalance(tokenBalance),
      );
    }
  }, [colonyClient, colonyDomains, domainId, token]);

  return balance;
};

export const useActivePayouts = (): PayoutInfo[] => {
  const colonyClient = useColonyClient();
  const [activePayouts, setActivePayouts] = useState<PayoutInfo[]>([]);

  useEffect(() => {
    if (colonyClient) getActivePayouts(colonyClient).then(setActivePayouts);
  }, [colonyClient]);

  return activePayouts;
};

import React, { ChangeEvent } from "react";
import styled from "styled-components";

import { Checkbox, GenericModal, Text, ModalFooterConfirmation } from "@gnosis.pm/safe-react-components";
import { ColonyRole } from "@colony/colony-js";
import { Permission } from "./types";

const BodyHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid ${({ theme }) => theme.colors.separator};
  padding: 0 10px;
`;

const StyledItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 24px;
  height: 51px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.separator};
  :last-child {
    border-bottom: 0px;
  }
`;

const StyledImage = styled.img`
  width: 26px;
  height: 26px;
  object-fit: contain;
  margin: 0 16px 0 0;
`;

const StyledImageName = styled.div`
  display: flex;
  align-items: center;
`;

const TextDesc = styled(Text)`
  width: 350px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

type Props = {
  title?: string;
  defaultIconUrl: string;
  permissionsList: Permission[];
  isSubmitFormDisabled?: boolean;
  onSubmitForm: () => any;
  onPermissionToggle: (itemId: ColonyRole, checked: boolean) => any;
  onClose: () => any;
  newAccount?: boolean;
};

const PermissionsToggleList = ({
  permissions,
  onPermissionToggle,
  defaultIconUrl,
}: {
  permissions: Permission[];
  onPermissionToggle: (itemId: ColonyRole, checked: boolean) => any;
  defaultIconUrl: string;
}) => {
  const setDefaultImage = (e: any) => {
    e.target.onerror = null;
    e.target.src = defaultIconUrl;
  };
  return (
    <>
      {permissions.map(i => {
        const onChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean) =>
          onPermissionToggle(parseInt(i.id, 10), checked);

        return (
          <StyledItem key={i.id}>
            <StyledImageName>
              <StyledImage alt={i.name} onError={setDefaultImage} src={i.iconUrl} />
              <div>
                <div>
                  <Text size="lg" strong>
                    {i.name}
                  </Text>
                </div>
                <div>
                  <TextDesc size="md">{i.description && i.description}</TextDesc>
                </div>
              </div>
            </StyledImageName>
            <Checkbox label="" name={i.name} checked={i.checked} onChange={onChange} />
          </StyledItem>
        );
      })}
    </>
  );
};

const ManageList = ({
  title = "Set Permissions",
  permissionsList,
  defaultIconUrl,
  isSubmitFormDisabled = false,
  newAccount,
  onSubmitForm,
  onPermissionToggle,
  onClose,
}: Props) => {
  const getBody = () => (
    <>
      {newAccount && (
        <BodyHeader>
          <Text size="md"> Adding New Account</Text>
        </BodyHeader>
      )}
      <div>
        <PermissionsToggleList
          permissions={permissionsList}
          onPermissionToggle={onPermissionToggle}
          defaultIconUrl={defaultIconUrl}
        />
      </div>
    </>
  );

  const getFooter = () => (
    <ModalFooterConfirmation
      okText="Save"
      okDisabled={isSubmitFormDisabled}
      handleCancel={onClose}
      handleOk={onSubmitForm}
    />
  );

  return <GenericModal onClose={onClose} title={title} body={getBody()} footer={getFooter()} withoutBodyPadding />;
};

export default ManageList;

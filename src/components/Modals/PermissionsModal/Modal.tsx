import React from "react";
import styled from "styled-components";

import { GenericModal, Text, Switch, ModalFooterConfirmation } from "@gnosis.pm/safe-react-components";
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
  onPermissionToggle: (itemId: number | string, checked: boolean) => any;
  onClose: () => any;
};

const PermissionsToggleList = ({
  permissions,
  onPermissionToggle,
  defaultIconUrl,
}: {
  permissions: Permission[];
  onPermissionToggle: (itemId: number | string, checked: boolean) => any;
  defaultIconUrl: string;
}) => {
  const setDefaultImage = (e: any) => {
    e.target.onerror = null;
    e.target.src = defaultIconUrl;
  };
  return (
    <>
      {permissions.map(i => {
        const onChange = (checked: boolean) => onPermissionToggle(i.id, checked);

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
            <Switch checked={i.checked} onChange={onChange} />
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
  onSubmitForm,
  onPermissionToggle,
  onClose,
}: Props) => {
  const getBody = () => (
    <>
      <BodyHeader>placeholder</BodyHeader>
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

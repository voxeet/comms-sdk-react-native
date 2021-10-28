import React, { useState, useEffect, FunctionComponent } from 'react';
import { Modal, ScrollView } from 'react-native';

import CheckBox from '@react-native-community/checkbox';
import Button from '@ui/Button';
import Space from '@ui/Space';
import Text from '@ui/Text';
import { updatePermissions } from '@utils/conference.tester';

import type { Participant } from '../../../../src/services/conference/models';
import { ConferencePermission } from '../../../../src/services/conference/models';
import styles from './ConferenceScreen.style';

type UpdatePermissionsModalProps = {
  participant: Participant;
  open: boolean;
  closeModal: () => void;
};

const UpdatePermissionsModal: FunctionComponent<UpdatePermissionsModalProps> =
  ({ participant, open, closeModal }) => {
    const [userPermissions, setUserPermissions] = useState<string[]>([]);

    const enumToArray = (enumValue: any): string[] => {
      return Object.keys(enumValue).map((i) => enumValue[i]);
    };

    // Creates array from ConferencePermissions enum
    const permissions = enumToArray(ConferencePermission);

    // Convert permission name to display in modal name
    const convertPermissionName = (permission: string): string => {
      switch (permission) {
        case 'INVITE':
          return 'Invite participants';
        case 'KICK':
          return 'Kick participants';
        case 'UPDATE_PERMISSIONS':
          return 'Update participants permissions';
        case 'JOIN':
          return 'Join a conference';
        case 'SEND_AUDIO':
          return 'Send audio stream';
        case 'SEND_VIDEO':
          return 'Send video stream';
        case 'SHARE_SCREEN':
          return 'Share a screen';
        case 'SHARE_VIDEO':
          return 'Share a video';
        case 'SHARE_FILE':
          return 'Share a file';
        case 'SEND_MESSAGE':
          return 'Send a message';
        case 'RECORD':
          return 'Record a conference';
        case 'STREAM':
          return 'Stream a conference';
        default:
          console.log(
            `${permission} doesn't have case in name conversion method. `
          );
          return permission;
      }
    };

    useEffect(() => {
      setUserPermissions(userPermissions);
      console.log(`Permissions changed:`, userPermissions);
    }, [userPermissions]);

    return (
      <Modal visible={open} animationType="fade" transparent>
        <Space fw fh style={styles.modalBackground}>
          <Space style={styles.modalContainer}>
            <Space fw style={styles.modalTitleSection}>
              <Text
                size="l"
                align="center"
                color="black"
                weight="bold"
              >{`${participant.info.name}'s permissions`}</Text>
            </Space>
            <Space fw style={styles.modalSelectSection}>
              <ScrollView>
                {permissions.map((permission) => {
                  return (
                    <Space
                      mv="xxs"
                      pl="xxs"
                      fw
                      style={styles.modalCheckboxContainer}
                      key={permission}
                    >
                      <CheckBox
                        style={styles.modalCheckbox}
                        disabled={false}
                        value={false}
                        onValueChange={() => {
                          if (userPermissions.includes(permission)) {
                            setUserPermissions(
                              userPermissions.filter(
                                (userPermission) =>
                                  userPermission !== permission
                              )
                            );
                          } else {
                            setUserPermissions([
                              ...userPermissions,
                              permission,
                            ]);
                          }
                        }}
                      />
                      <Text color="black">
                        {convertPermissionName(permission)}
                      </Text>
                    </Space>
                  );
                })}
              </ScrollView>
            </Space>
            <Space fw pt="xs" style={styles.modalButtonSection}>
              <Button
                text="Close"
                size="small"
                color="dark"
                onPress={() => {
                  setUserPermissions([]);
                  closeModal();
                }}
              />
              <Button
                text="Update"
                size="small"
                color="dark"
                onPress={async () => {
                  closeModal();
                  await updatePermissions([
                    {
                      participant,
                      permissions: userPermissions.map((userPermission) => {
                        return userPermission as ConferencePermission;
                      }),
                    },
                  ]);
                  setUserPermissions([]);
                }}
              />
            </Space>
          </Space>
        </Space>
      </Modal>
    );
  };

export default UpdatePermissionsModal;

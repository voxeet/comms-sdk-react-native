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

const enumToArray = (enumValue: any): string[] => {
  return Object.keys(enumValue).map((i) => enumValue[i]);
};

type UpdatePermissionsModalProps = {
  participant: Participant;
  open: boolean;
  closeModal: () => void;
};

const UpdatePermissionsModal: FunctionComponent<UpdatePermissionsModalProps> =
  ({ participant, open, closeModal }) => {
    const [userPermissions, setUserPermissions] = useState<string[]>([]);

    // Creates array from ConferencePermissions enum
    const permissions = enumToArray(ConferencePermission);

    // Convert permission name to display in modal name
    const permissionNamingMap = new Map([
      ['INVITE', 'Invite participants'],
      ['KICK', 'Kick participants'],
      ['UPDATE_PERMISSIONS', 'Update participants permissions'],
      ['JOIN', 'Join a conference'],
      ['SEND_AUDIO', 'Send audio stream'],
      ['SEND_VIDEO', 'Send video stream'],
      ['SHARE_SCREEN', 'Share a screen'],
      ['SHARE_VIDEO', 'Share a video'],
      ['SHARE_FILE', 'Share a file'],
      ['SEND_MESSAGE', 'Send a message'],
      ['RECORD', 'Record a conference'],
      ['STREAM', 'Stream a conference'],
    ]);

    // Change userPermissions array, during changes in checkboxes
    const updateUserPermissionsArray = (permission: string) => {
      if (userPermissions.includes(permission)) {
        setUserPermissions(
          userPermissions.filter(
            (userPermission) => userPermission !== permission
          )
        );
      } else {
        setUserPermissions([...userPermissions, permission]);
      }
    };

    // Submit permissions
    const submitPermissions = async () => {
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
    };

    // Close modal without submit
    const closeModalWithoutSubmit = () => {
      setUserPermissions([]);
      closeModal();
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
                        onValueChange={() =>
                          updateUserPermissionsArray(permission)
                        }
                      />
                      <Text color="black">
                        {permissionNamingMap.get(permission)}
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
                onPress={closeModalWithoutSubmit}
              />
              <Button
                text="Update"
                size="small"
                color="dark"
                onPress={submitPermissions}
              />
            </Space>
          </Space>
        </Space>
      </Modal>
    );
  };

export default UpdatePermissionsModal;

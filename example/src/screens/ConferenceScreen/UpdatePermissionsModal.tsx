import React, { useState, useEffect, FunctionComponent } from 'react';
import { Modal, ScrollView } from 'react-native';

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
    const [userPermissions, setUserPermissions] = useState<
      Array<ConferencePermission>
    >([]);

    // Creates array from ConferencePermissions enum
    const permissions = [...Object.values(ConferencePermission)];

    // Convert permission name to display in modal name
    const mapPermissionToButtonName: Record<string, string> = {
      [ConferencePermission.INVITE]: 'Invite participants',
      [ConferencePermission.KICK]: 'Kick participants',
      [ConferencePermission.UPDATE_PERMISSIONS]:
        'Update participants permissions',
      [ConferencePermission.JOIN]: 'Join a conference',
      [ConferencePermission.SEND_AUDIO]: 'Send audio stream',
      [ConferencePermission.SEND_VIDEO]: 'Send video stream',
      [ConferencePermission.SHARE_SCREEN]: 'Share a screen',
      [ConferencePermission.SHARE_VIDEO]: 'Share a video',
      [ConferencePermission.SHARE_FILE]: 'Share a file',
      [ConferencePermission.SEND_MESSAGE]: 'Send a message',
      [ConferencePermission.RECORD]: 'Record a conference',
      [ConferencePermission.STREAM]: 'Stream a conference',
    };

    // Change userPermissions array, on buttons press
    const toggleUserPermission = (permission: ConferencePermission) => {
      userPermissions.includes(permission)
        ? setUserPermissions((up) => up.filter((p) => p !== permission))
        : setUserPermissions([...userPermissions, permission]);
    };

    // check for permission button color
    const hasUserPermission = (permission: ConferencePermission): boolean =>
      userPermissions.includes(permission);

    // Submit permissions
    const submitPermissions = async () => {
      closeModal();
      await updatePermissions([
        {
          participant,
          permissions: Array.from(userPermissions),
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
      console.log(userPermissions);
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
                      style={styles.modalButtonContainer}
                      key={permission}
                    >
                      <Button
                        text={`${mapPermissionToButtonName[permission]}`}
                        color={hasUserPermission(permission) ? 'green' : 'red'}
                        size="small"
                        onPress={() => {
                          toggleUserPermission(permission);
                        }}
                      />
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

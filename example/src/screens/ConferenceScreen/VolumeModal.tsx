import React, { FunctionComponent } from 'react';
import { Modal } from 'react-native';
import Text from '@ui/Text';
import Button from '@ui/Button';
import Space from '@ui/Space';
import { setStreamVolume, setParticipantVolume } from '@utils/audio.tester';
import styles from './ConferenceScreen.style';
import type { Participant } from '@dolbyio/comms-sdk-react-native/models';

type SetVolumeModalProps = {
    isSetStreamVolume: boolean;
    open: boolean;
    closeModal: () => void;
    participant: Participant;
};

const SetVolumeModal: FunctionComponent<SetVolumeModalProps> = ({
    isSetStreamVolume,
    open,
    closeModal,
    participant,
}) => {
    const closeModalWithoutSubmit = () => {
        closeModal();
    };

    const setVolume = async (participant: Participant, volume: number) => {
        if (isSetStreamVolume) {
            await setStreamVolume(participant, volume);
        } else {
            await setParticipantVolume(participant, volume);
        }
    };

    return (
        <Modal visible={open} animationType="fade" transparent>
            <Space fw fh style={styles.modalBackground}>
                <Space style={styles.volumeModalContainer}>
                    <Space mt="s">
                        <Text size="l" align="center" color="black">
                            {isSetStreamVolume ? "Set stream volume value" : "Set participant volume value"}
                        </Text>
                    </Space>
                    <Space mt="m" fw style={styles.modalButtonSection}>
                        <Button
                            text="0.0"
                            size="small"
                            color="dark"
                            onPress={() => setVolume(participant, 0.0)}
                        />
                        <Button
                            text="0.25"
                            size="small"
                            color="dark"
                            onPress={() => setVolume(participant, 0.25)}
                        />
                        <Button
                            text="0.5"
                            size="small"
                            color="dark"
                            onPress={() => setVolume(participant, 0.50)}
                        />
                        <Button
                            text="0.75"
                            size="small"
                            color="dark"
                            onPress={() => setVolume(participant, 0.75)}
                        />
                        <Button
                            text="1.0"
                            size="small"
                            color="dark"
                            onPress={() => setVolume(participant, 1.0)}
                        />
                    </Space>
                    <Space fw pt="xs" style={styles.modalButtonSection}>
                        <Button
                            text="Close"
                            size="small"
                            color="dark"
                            onPress={closeModalWithoutSubmit}
                        />
                    </Space>
                </Space>
            </Space>
        </Modal>
    );
};

export default SetVolumeModal;
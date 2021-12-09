import React, { useState, FunctionComponent, useEffect } from 'react';
import { Modal, TextInput } from 'react-native';

import Button from '@ui/Button';
import Space from '@ui/Space';
import { sendCommandMessage } from '@utils/command.tester';

import styles from './ConferenceScreen.style';

type SendMessageModalProps = {
  open: boolean;
  closeModal: () => void;
};

const SendMessageModal: FunctionComponent<SendMessageModalProps> = ({
  open,
  closeModal,
}) => {
  const [message, setMessage] = useState<string>('');

  // Close modal without submit
  const closeModalWithoutSubmit = () => {
    setMessage('');
    closeModal();
  };

  // Submit send message
  const submitSendMessage = async () => {
    await sendCommandMessage(message);
    closeModalWithoutSubmit();
  };

  useEffect(() => {
    setMessage(message);
  }, [message]);

  return (
    <Modal visible={open} animationType="fade" transparent>
      <Space fw fh style={styles.modalBackground}>
        <Space style={styles.modalContainer}>
          <Space fw style={styles.modalSelectSection}>
            <TextInput
              style={styles.messageInput}
              onChangeText={(value) => {
                setMessage(value);
              }}
              value={message}
              placeholder="Message you want to send"
            />
          </Space>
          <Space fw pt="xs" style={styles.modalButtonSection}>
            <Button
              text="Close"
              size="small"
              color="dark"
              onPress={closeModalWithoutSubmit}
            />
            <Button
              text="Send"
              size="small"
              color="dark"
              onPress={submitSendMessage}
            />
          </Space>
        </Space>
      </Space>
    </Modal>
  );
};

export default SendMessageModal;

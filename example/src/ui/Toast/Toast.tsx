import React from 'react';
import { Text as ReactNativeText } from 'react-native';
import RNToast from 'react-native-toast-message';

import Space from '@ui/Space';
import Text from '@ui/Text';

import styles from './Toast.style';

const Toast = ({ text1, text2, props }: any) => (
  <Space mv={'xs'} mt={'xxs'} style={styles.container}>
    <Space pv="xs" ph="xs" pr="l" mr={'s'}>
      <Space style={styles.titleContainer}>
        <Text header size="s" color={'black'}>
          {text1}
        </Text>
      </Space>

      <Text color="black" size="xs">
        {text2}
      </Text>
      {props.children}
    </Space>
    <ReactNativeText style={styles.exitIcon} onPress={() => RNToast.hide()}>
      ❌
    </ReactNativeText>
  </Space>
);

export default Toast;

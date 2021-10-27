import React from 'react';
import { Text as ReactNativeText } from 'react-native';
import Toast from 'react-native-toast-message';

import Space from '@ui/Space';
import Text from '@ui/Text';

import styles from './ToastConfig.style';

const ToastConfig = {
  my_custom_type: ({ text1, text2, props }: any) => (
    <Space mv={'xs'} mt={'xxs'} style={styles.container}>
      <ReactNativeText
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
        }}
        onPress={() => Toast.hide()}
      >
        ❌
      </ReactNativeText>
      <Space pv="xs" ph="xs" pr="l">
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
    </Space>
  ),
};

export default ToastConfig;

import React from 'react';
import { TextInput, TouchableWithoutFeedback, View } from 'react-native';

import Space from '../Space';
import Text from '../Text';

import styles from './Input.styles';

type InputProps = {
  onChange: (value: string) => void;
  label: string;
  value: string;
  disabled?: boolean;
};

const Input = ({ label, onChange, value, disabled = false }: InputProps) => {
  return (
    <>
      <Space mb="xxs">
        <Text size="s">{label}</Text>
      </Space>
      <TouchableWithoutFeedback>
        <View style={styles.view}>
          <TextInput
            style={[styles.input, disabled && styles.disabled]}
            onChangeText={onChange}
            value={value}
            editable={!disabled}
          />
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};
export default Input;

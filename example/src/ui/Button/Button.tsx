import React from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';

import COLORS from '@constants/colors.constants';

import Text from '../Text';
import styles from './Button.style';

type ButtonProps = {
  text: string;
  size?: 'small' | 'large';
  color?: 'light' | 'dark';
  style?: ViewStyle;
  onPress?: () => void;
};

const Button = ({
  text,
  size = 'large',
  color = 'light',
  style = undefined,
  onPress,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[`size-${size}`],
        styles[`color-${color}`],
        style,
      ]}
      onPress={onPress}
    >
      <Text color={color === 'light' ? COLORS.BLACK : COLORS.WHITE} size="m">
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

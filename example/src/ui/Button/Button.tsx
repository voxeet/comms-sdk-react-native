import COLORS from '../../constants/colors.constants';
import Text from '../Text';
import styles from './Button.style';
import React from 'react';
import { TouchableOpacity } from 'react-native';

type ButtonProps = {
  text: string;
  size?: 'small' | 'large';
  color?: 'light' | 'dark';
  onPress?: () => void;
};

const Button = ({
  text,
  size = 'large',
  color = 'light',
  onPress,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, styles[`size-${size}`], styles[`color-${color}`]]}
      onPress={onPress}
    >
      <Text color={color === 'light' ? COLORS.BLACK : COLORS.WHITE} size="m">
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

import React, { ReactNode } from 'react';
import { Text } from 'react-native';

import COLORS from '@constants/colors.constants';

import styles from './Text.style';

type CustomTextProps = {
  size?: string;
  weight?: string;
  align?: string;
  uppercase?: boolean;
  header?: boolean;
  underline?: boolean;
  color?: string;
  children?: ReactNode;
};

const CustomText = React.memo(
  ({
    size = 'm',
    uppercase = false,
    color = COLORS.WHITE,
    children,
    header = false,
    weight,
    underline = false,
    align = 'left',
    ...rest
  }: CustomTextProps) => {
    const textStyles: string[] = [
      // @ts-ignore
      styles[`${header ? 'HEADER' : 'TEXT'}_${size.toUpperCase()}`],
      // @ts-ignore
      weight && styles[`TEXT_${weight.toUpperCase()}`],
      uppercase && styles.TEXT_UPPERCASE,
      underline && styles.TEXT_UNDERLINE,
      {
        color: color || null,
        textAlign: align,
      },
    ];
    return (
      // @ts-ignore
      <Text style={textStyles} {...rest}>
        {children}
      </Text>
    );
  }
);

export default CustomText;

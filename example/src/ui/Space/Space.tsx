import React, { ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';

type SizeValue = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';

interface SpaceProps {
  fw?: boolean;
  fh?: boolean;
  m?: SizeValue;
  mv?: SizeValue;
  mh?: SizeValue;
  mt?: SizeValue;
  mr?: SizeValue;
  mb?: SizeValue;
  ml?: SizeValue;
  p?: SizeValue;
  pv?: SizeValue;
  ph?: SizeValue;
  pt?: SizeValue;
  pr?: SizeValue;
  pb?: SizeValue;
  pl?: SizeValue;
  vm?: SizeValue;
  hm?: SizeValue;
  style?: ViewStyle;
  children: ReactNode;
}

import styles from './Space.style';
const Space: React.FC<SpaceProps> = ({
  children,
  fw,
  fh,
  style,
  ...sizesProps
}) => {
  const spaceStyle = Object.entries(sizesProps).reduce(
    // @ts-ignore
    (result, [key, value]) => [...result, value && styles[`${key}_${value}`]],
    [] as any
  );

  return (
    <View style={[style, spaceStyle, fw && styles.fw, fh && styles.fh]}>
      {children}
    </View>
  );
};

export default Space;

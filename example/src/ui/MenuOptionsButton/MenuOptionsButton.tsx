import React, { FunctionComponent, ReactElement } from 'react';
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from 'react-native-popup-menu';

import Space from '@ui/Space';

import styles from './MenuOptionsButton.style';

export type Options = Array<{
  text: string;
  value: string;
  onSelect: () => void;
}>;

type MenuOptionsButtonProps = {
  options: Options;
  longPress?: boolean;
  children: ReactElement;
};

export const MenuOptionsButton: FunctionComponent<MenuOptionsButtonProps> = ({
  options,
  longPress = false,
  children,
}) => {
  return (
    <Space>
      <Menu>
        <MenuTrigger triggerOnLongPress={longPress}>{children}</MenuTrigger>
        <MenuOptions
          optionsContainerStyle={styles.optionsContainerStyle}
          customStyles={{
            optionWrapper: styles.optionWrapper,
            optionText: styles.optionText,
          }}
        >
          {options.map((option) => (
            <MenuOption
              key={option.value}
              text={option.text}
              value={option.value}
              onSelect={option.onSelect}
            />
          ))}
        </MenuOptions>
      </Menu>
    </Space>
  );
};

export default MenuOptionsButton;

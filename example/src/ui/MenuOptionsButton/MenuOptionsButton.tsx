import styles from './MenuOptionsButton.style';
import Space from '@ui/Space';
import React, { FunctionComponent, ReactElement } from 'react';
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from 'react-native-popup-menu';

export type Options = Array<{
  text: string;
  value: string;
  onSelect: () => void;
}>;

type MenuOptionsButtonProps = {
  options: Options;
  children: ReactElement;
};

export const MenuOptionsButton: FunctionComponent<MenuOptionsButtonProps> = ({
  options,
  children,
}) => {
  return (
    <Space mr="xs">
      <Menu>
        <MenuTrigger triggerOnLongPress>{children}</MenuTrigger>
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

import React, { FC, ReactNode, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './ExtendedOptions.style';
import Button from '@ui/Button';
import Space from '@ui/Space';

interface OptionsViewProps {
    label: string;
    children: ReactNode;
    verticalSpace: 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
}

export const ExtendedOptions: FC<OptionsViewProps> = ({ label, children, verticalSpace }) => {
    const [visible, setVisible] = useState(false);
    const [buttonIcon, setButtonIcon] = useState('∨');

    const toggleDropdown = () => {
      var newValue = !visible;
      setVisible(newValue);
      if (newValue) {
        setButtonIcon('∧')
      } else {
        setButtonIcon('∨')
      }
    };

    const renderChildren = () => {
        if (visible) {
          return (
            <View>
              {children}
            </View>
          );
        } else {
            return;
        }
    };

    return (
        <TouchableOpacity style={styles.button} onPress={toggleDropdown}>
            <Space mt={verticalSpace} style={styles.optionsHeader}>
                <Text style={styles.buttonText}>{label}</Text>
                <Button text={buttonIcon} color='light' size='xsmall' style={styles.extendButton} onPress={toggleDropdown}/>
            </Space>
            {renderChildren()}
        </TouchableOpacity>
    );
}

export default ExtendedOptions;
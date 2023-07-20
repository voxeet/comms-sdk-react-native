import Space from "@ui/Space";
import type { FC } from "react";
import styles from './Switch.style';
import React from "react";
import COLORS from '@constants/colors.constants';
import Text from "@ui/Text";
import { Switch as RSwitch } from "react-native";

interface SwitchProps {
    label: string;
    textColor?: string;
    verticalSpace: 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
    onValueChanged: () => void; 
    value: boolean;
    nativeID: string;
};

export const Switch: FC<SwitchProps> = ({ 
    label, 
    verticalSpace, 
    onValueChanged,
    textColor = COLORS.WHITE,
    value,
    nativeID,
}) => {
    const labelFor = `Label for ${nativeID}`;
    const switchId = `${nativeID}Switch`

    return (
        <Space mt={verticalSpace} style={styles.container}>
            <Text ariaLabel={labelFor} nativeID={nativeID} color={textColor} size='s'>
                {label}
            </Text>
            <RSwitch
                style={styles.switchStyle}
                trackColor={{false: '#767577', true: '#81b0ff'}}
                accessibilityHint='Dolby voice'
                ios_backgroundColor="#3e3e3e"
                onValueChange={onValueChanged}
                aria-label={switchId}
                aria-labelby={nativeID}
                value={value} />
        </Space>
    );
};

export default Switch;
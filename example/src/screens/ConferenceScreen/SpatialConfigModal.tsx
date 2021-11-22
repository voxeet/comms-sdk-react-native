import React, { FunctionComponent, useState } from 'react';
import { Modal, ScrollView, TextInput } from 'react-native';

import Button from '@ui/Button';
import Space from '@ui/Space';
import Text from '@ui/Text';
import {
  setSpatialDirection,
  setSpatialEnvironment,
  setSpatialPosition,
} from '@utils/conference.tester';

import type {
  Participant,
  SpatialDirection,
  SpatialScale,
  SpatialPosition,
} from '../../../../src/services/conference/models';
import styles from './ConferenceScreen.style';

export type SpatialConfigModalTypeModel =
  | 'setSpatialDirection'
  | 'setSpatialEnvironment'
  | 'setSpatialPosition';

type SetSpatialConfigModalProps = {
  type: SpatialConfigModalTypeModel;
  participant: Participant;
  open: boolean;
  closeModal: () => void;
};

type SpatialEnvironmentType = {
  scale: { x: 0; y: 0; z: 0 };
  forward: { x: 0; y: 0; z: 0 };
  up: { x: 0; y: 0; z: 0 };
  right: { x: 0; y: 0; z: 0 };
};

const SpatialConfigModal: FunctionComponent<SetSpatialConfigModalProps> = ({
  participant,
  type,
  open,
  closeModal,
}) => {
  // Initial values for state
  const initialSpatialDirectionValues: SpatialDirection = {
    x: 0,
    y: 0,
    z: 0,
  };

  const initialSpatialEnvironmentValues: SpatialEnvironmentType = {
    scale: { x: 0, y: 0, z: 0 },
    forward: { x: 0, y: 0, z: 0 },
    up: { x: 0, y: 0, z: 0 },
    right: { x: 0, y: 0, z: 0 },
  };

  const initialSpatialPositionValues: SpatialPosition = { x: 0, y: 0, z: 0 };

  // Each spatial method value state
  const [spatialDirectionValues, setSpatialDirectionValues] =
    useState<SpatialDirection>(initialSpatialDirectionValues);

  const [spatialEnvironmentValues, setSpatialEnvironmentValues] =
    useState<SpatialEnvironmentType>(initialSpatialEnvironmentValues);

  const [spatialPositionValues, setSpatialPositionValues] =
    useState<SpatialPosition>(initialSpatialPositionValues);

  // For creating content
  const methodSetSpatialDirectionParams: {
    title: string;
    params: Array<keyof SpatialDirection>;
  }[] = [{ title: 'Spatial Direction', params: ['x', 'y', 'z'] }];

  const methodSetSpatialEnvironmentParams: {
    title: keyof SpatialEnvironmentType;
    params: Array<keyof SpatialScale>;
  }[] = [
    { title: 'scale', params: ['x', 'y', 'z'] },
    { title: 'forward', params: ['x', 'y', 'z'] },
    { title: 'up', params: ['x', 'y', 'z'] },
    { title: 'right', params: ['x', 'y', 'z'] },
  ];

  const methodSetSpatialPositionParams: {
    title: string;
    params: Array<keyof SpatialPosition>;
  }[] = [{ title: 'Spatial Position', params: ['x', 'y', 'z'] }];

  const resetSpatialModalFields = () => {
    if (type === ('setSpatialDirection' as SpatialConfigModalTypeModel))
      setSpatialDirectionValues(initialSpatialDirectionValues);
    else if (type === ('setSpatialEnvironment' as SpatialConfigModalTypeModel))
      setSpatialEnvironmentValues(initialSpatialEnvironmentValues);
    else if (type === ('setSpatialPosition' as SpatialConfigModalTypeModel))
      setSpatialPositionValues(initialSpatialPositionValues);
    else throw Error('Unknown action!');
  };

  // Close modal without submit
  const closeModalAndResetFields = () => {
    resetSpatialModalFields();
    closeModal();
  };

  // Submit, reset state and submit modal
  const submitSpatialConfig = async () => {
    if (type === ('setSpatialDirection' as SpatialConfigModalTypeModel))
      await setSpatialDirection(participant, spatialDirectionValues);
    else if (type === ('setSpatialEnvironment' as SpatialConfigModalTypeModel))
      await setSpatialEnvironment(
        spatialEnvironmentValues.scale,
        spatialEnvironmentValues.forward,
        spatialEnvironmentValues.up,
        spatialEnvironmentValues.right
      );
    else if (type === ('setSpatialPosition' as SpatialConfigModalTypeModel))
      await setSpatialPosition(participant, spatialPositionValues);
    else throw Error('Unknown action!');
  };

  const spatialDirectionTypeContent = methodSetSpatialDirectionParams.map(
    (i) => {
      return (
        <Space ml="xs" mr="xs">
          <Text size="m" align="left" color="black">
            {i.title}
          </Text>
          {i.params.map((el) => {
            return (
              <Space fw style={styles.spatialInputContainer}>
                <Space style={styles.spatialInputLabelWrapper}>
                  <Text color="black">{el.toUpperCase()}</Text>
                </Space>
                <Space style={styles.spatialInputWrapper}>
                  <TextInput
                    style={styles.spatialInput}
                    onChangeText={(value) =>
                      setSpatialDirectionValues({
                        ...spatialDirectionValues,
                        [el]: Number(value),
                      })
                    }
                    value={spatialDirectionValues[el].toString()}
                    keyboardType="numeric"
                  />
                </Space>
              </Space>
            );
          })}
        </Space>
      );
    }
  );

  const spatialEnvironmentTypeContent = methodSetSpatialEnvironmentParams.map(
    (i) => {
      return (
        <Space ml="xs" mr="xs">
          <Text size="m" align="left" color="black">
            {i.title}
          </Text>
          {i.params.map((el) => {
            return (
              <Space fw style={styles.spatialInputContainer}>
                <Space style={styles.spatialInputLabelWrapper}>
                  <Text color="black">{el.toUpperCase()}</Text>
                </Space>
                <Space style={styles.spatialInputWrapper}>
                  <TextInput
                    style={styles.spatialInput}
                    onChangeText={(value) =>
                      setSpatialEnvironmentValues({
                        ...spatialEnvironmentValues,
                        [i.title]: {
                          ...spatialEnvironmentValues[i.title],
                          [el]: Number(value),
                        },
                      })
                    }
                    value={spatialEnvironmentValues[i.title][el].toString()}
                    keyboardType="numeric"
                  />
                </Space>
              </Space>
            );
          })}
        </Space>
      );
    }
  );

  const spatialPositionTypeContent = methodSetSpatialPositionParams.map((i) => {
    return (
      <Space ml="xs" mr="xs">
        <Text size="m" align="left" color="black">
          {i.title}
        </Text>
        {i.params.map((el) => {
          return (
            <Space fw style={styles.spatialInputContainer}>
              <Space style={styles.spatialInputLabelWrapper}>
                <Text color="black">{el.toUpperCase()}</Text>
              </Space>
              <Space style={styles.spatialInputWrapper}>
                <TextInput
                  style={styles.spatialInput}
                  onChangeText={(value) =>
                    setSpatialPositionValues({
                      ...spatialPositionValues,
                      [el]: Number(value),
                    })
                  }
                  value={spatialPositionValues[el].toString()}
                  keyboardType="numeric"
                />
              </Space>
            </Space>
          );
        })}
      </Space>
    );
  });

  const renderContentDependingOnTheModalType = () => {
    if (type === ('setSpatialDirection' as SpatialConfigModalTypeModel))
      return spatialDirectionTypeContent;
    else if (type === ('setSpatialEnvironment' as SpatialConfigModalTypeModel))
      return spatialEnvironmentTypeContent;
    else if (type === ('setSpatialPosition' as SpatialConfigModalTypeModel))
      return spatialPositionTypeContent;
    else throw Error('Unknown modal type');
  };

  return (
    <Modal visible={open} animationType="fade" transparent>
      <Space fw fh style={styles.modalBackground}>
        <Space style={styles.modalContainer}>
          <Space fw style={styles.modalTitleSection}>
            <Text size="l" align="center" color="black" weight="bold">
              {type}
            </Text>
          </Space>
          <Space fw style={styles.modalSelectSection}>
            <ScrollView>{renderContentDependingOnTheModalType()}</ScrollView>
          </Space>
          <Space fw pt="xs" style={styles.modalButtonSection}>
            <Button
              text="Close"
              size="small"
              color="dark"
              onPress={closeModalAndResetFields}
            />
            <Button
              text={'Submit'}
              size="small"
              color="dark"
              onPress={submitSpatialConfig}
            />
          </Space>
        </Space>
      </Space>
    </Modal>
  );
};

export default SpatialConfigModal;

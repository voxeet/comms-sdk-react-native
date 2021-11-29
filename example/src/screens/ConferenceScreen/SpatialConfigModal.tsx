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

export enum SpatialConfigModalTypeModel {
  setSpatialDirectionType = 'setSpatialDirection',
  setSpatialEnvironmentType = 'setSpatialEnvironment',
  setSpatialPositionType = 'setSpatialPosition',
}

type SetSpatialConfigModalProps = {
  type: SpatialConfigModalTypeModel;
  participant: Participant;
  open: boolean;
  closeModal: () => void;
};

type SpatialEnvironmentType = {
  scale: { x: number; y: number; z: number };
  forward: { x: number; y: number; z: number };
  up: { x: number; y: number; z: number };
  right: { x: number; y: number; z: number };
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
    scale: { x: 1, y: 1, z: 1 },
    forward: { x: 0, y: 0, z: 1 },
    up: { x: 0, y: 1, z: 0 },
    right: { x: 1, y: 0, z: 0 },
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
    params: Array<keyof SpatialScale> | Array<keyof SpatialPosition>;
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
    if (type === SpatialConfigModalTypeModel.setSpatialDirectionType)
      setSpatialDirectionValues(initialSpatialDirectionValues);
    else if (type === SpatialConfigModalTypeModel.setSpatialEnvironmentType)
      setSpatialEnvironmentValues(initialSpatialEnvironmentValues);
    else if (type === SpatialConfigModalTypeModel.setSpatialPositionType)
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
    if (type === SpatialConfigModalTypeModel.setSpatialDirectionType)
      await setSpatialDirection(spatialDirectionValues);
    else if (type === SpatialConfigModalTypeModel.setSpatialEnvironmentType)
      await setSpatialEnvironment(
        spatialEnvironmentValues.scale,
        spatialEnvironmentValues.forward,
        spatialEnvironmentValues.up,
        spatialEnvironmentValues.right
      );
    else if (type === SpatialConfigModalTypeModel.setSpatialPositionType)
      await setSpatialPosition(participant, spatialPositionValues);
    else throw Error('Unknown action!');
  };

  // Render inputs for spatialDirection and spatialPosition
  const renderModalInputSimple = (
    i: {
      title: string;
      params: Array<keyof SpatialDirection> | Array<keyof SpatialPosition>;
    },
    state: SpatialDirection | SpatialPosition,
    setState: any
  ) => {
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
                    setState({
                      ...state,
                      [el]: Number(value),
                    })
                  }
                  value={state[el].toString()}
                  keyboardType="numeric"
                />
              </Space>
            </Space>
          );
        })}
      </Space>
    );
  };

  // Render inputs for spatialEnvironment
  const renderModalInputContext = (
    i: {
      title: keyof SpatialEnvironmentType;
      params: Array<keyof SpatialScale> | Array<keyof SpatialPosition>;
    },
    state: SpatialEnvironmentType,
    setState: any
  ) => {
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
                    setState({
                      ...state,
                      [i.title]: {
                        ...state[i.title],
                        [el]: Number(value),
                      },
                    })
                  }
                  value={state[i.title][el].toString()}
                  keyboardType="numeric"
                />
              </Space>
            </Space>
          );
        })}
      </Space>
    );
  };

  const spatialDirectionTypeContent = methodSetSpatialDirectionParams.map(
    (i) => {
      return renderModalInputSimple(
        i,
        spatialDirectionValues,
        setSpatialDirectionValues
      );
    }
  );

  const spatialEnvironmentTypeContent = methodSetSpatialEnvironmentParams.map(
    (i) => {
      return renderModalInputContext(
        i,
        spatialEnvironmentValues,
        setSpatialEnvironmentValues
      );
    }
  );

  const spatialPositionTypeContent = methodSetSpatialPositionParams.map((i) => {
    return renderModalInputSimple(
      i,
      spatialPositionValues,
      setSpatialPositionValues
    );
  });

  const renderContentDependingOnTheModalType = () => {
    if (type === SpatialConfigModalTypeModel.setSpatialDirectionType)
      return spatialDirectionTypeContent;
    else if (type === SpatialConfigModalTypeModel.setSpatialEnvironmentType)
      return spatialEnvironmentTypeContent;
    else if (type === SpatialConfigModalTypeModel.setSpatialPositionType)
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

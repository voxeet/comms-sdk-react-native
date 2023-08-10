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
} from '@dolbyio/comms-sdk-react-native/models';
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
  const spatialDirectionElements: {
    title: string;
    coordinates: Array<keyof SpatialDirection>;
  }[] = [{ title: 'Spatial Direction', coordinates: ['x', 'y', 'z'] }];

  const spatialEnvironmentElements: {
    title: keyof SpatialEnvironmentType;
    coordinates: Array<keyof SpatialScale> | Array<keyof SpatialPosition>;
  }[] = [
    { title: 'scale', coordinates: ['x', 'y', 'z'] },
    { title: 'forward', coordinates: ['x', 'y', 'z'] },
    { title: 'up', coordinates: ['x', 'y', 'z'] },
    { title: 'right', coordinates: ['x', 'y', 'z'] },
  ];

  const spatialPositionElements: {
    title: string;
    coordinates: Array<keyof SpatialPosition>;
  }[] = [{ title: 'Spatial Position', coordinates: ['x', 'y', 'z'] }];

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
    element: {
      title: string;
      coordinates: Array<keyof SpatialDirection> | Array<keyof SpatialPosition>;
    },
    state: SpatialDirection | SpatialPosition,
    setState: any
  ) => {
    return (
      <Space ml="xs" mr="xs" key={element.title}>
        <Text size="m" align="left" color="black">
          {element.title}
        </Text>
        {element.coordinates.map((coord) => {
          return (
            <Space fw style={styles.spatialInputContainer} key={coord}>
              <Space style={styles.spatialInputLabelWrapper}>
                <Text color="black">{coord.toUpperCase()}</Text>
              </Space>
              <Space style={styles.spatialInputWrapper}>
                <TextInput
                  style={styles.spatialInput}
                  onChangeText={(value) =>
                    setState({
                      ...state,
                      [coord]: Number(value),
                    })
                  }
                  value={state[coord].toString()}
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
    element: {
      title: keyof SpatialEnvironmentType;
      coordinates: Array<keyof SpatialScale> | Array<keyof SpatialPosition>;
    },
    state: SpatialEnvironmentType,
    setState: any
  ) => {
    return (
      <Space ml="xs" mr="xs" key={element.title}>
        <Text size="m" align="left" color="black">
          {element.title}
        </Text>
        {element.coordinates.map((coord) => {
          return (
            <Space fw style={styles.spatialInputContainer} key={coord}>
              <Space style={styles.spatialInputLabelWrapper}>
                <Text color="black">{coord.toUpperCase()}</Text>
              </Space>
              <Space style={styles.spatialInputWrapper}>
                <TextInput
                  style={styles.spatialInput}
                  onChangeText={(value) =>
                    setState({
                      ...state,
                      [element.title]: {
                        ...state[element.title],
                        [coord]: Number(value),
                      },
                    })
                  }
                  value={state[element.title][coord].toString()}
                  keyboardType="numeric"
                />
              </Space>
            </Space>
          );
        })}
      </Space>
    );
  };

  const spatialDirectionTypeContent = spatialDirectionElements.map(
    (element) => {
      return renderModalInputSimple(
        element,
        spatialDirectionValues,
        setSpatialDirectionValues
      );
    }
  );

  const spatialEnvironmentTypeContent = spatialEnvironmentElements.map(
    (element) => {
      return renderModalInputContext(
        element,
        spatialEnvironmentValues,
        setSpatialEnvironmentValues
      );
    }
  );

  const spatialPositionTypeContent = spatialPositionElements.map((element) => {
    return renderModalInputSimple(
      element,
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
    <Modal visible={open} animationType="fade" transparent key={`spatial_modal_${type}`}>
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

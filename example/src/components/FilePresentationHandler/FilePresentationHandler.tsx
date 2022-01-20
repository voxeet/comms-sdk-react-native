import React, { useContext, useEffect } from 'react';
import { Alert } from 'react-native';

import { FilePresentationContext } from '@components/FilePresentationHandler/FilePresentationProvider';
import CommsAPI from '@dolbyio/react-native-comms-sdk';

import type {
  FileConvertedEventType,
  FilePresentationChangedEventType,
} from '../../../../src/services/filePresentation/events';
import { FilePresentationServiceEventNames } from '../../../../src/services/filePresentation/events';

const FilePresentationHandler: React.FC = () => {
  const { resetFilePresentation, startFilePresentation } = useContext(
    FilePresentationContext
  );
  const convertedFileEventHandler = (event: FileConvertedEventType) => {
    console.log('ON FILE CONVERTED\n', JSON.stringify(event, null, 2));
    Alert.alert(
      'FILE CONVERTED EVENT DATA',
      JSON.stringify(
        {
          fileId: event.fileConverted.id,
          fileName: event.fileConverted.name,
        },
        null,
        2
      )
    );
  };

  const filePresentationChangeEventHandler = async (
    event: FilePresentationChangedEventType,
    type?: FilePresentationServiceEventNames
  ) => {
    console.log(
      'ON FILE PRESENTATION CHANGE\n',
      JSON.stringify(event, null, 2),
      type
    );

    Alert.alert(
      'FILE PRESENTATION CHANGE EVENT DATA',
      JSON.stringify(
        {
          changeEventType: type,
          fileId: event.filePresentation.id,
        },
        null,
        2
      )
    );
    if (type === FilePresentationServiceEventNames.FilePresentationStopped) {
      resetFilePresentation();
      return;
    }
    if (
      type === FilePresentationServiceEventNames.FilePresentationStarted ||
      type === FilePresentationServiceEventNames.FilePresentationUpdated
    ) {
      try {
        const imageSrc = await CommsAPI.filePresentation.getImage(
          event.filePresentation.position || 0
        );
        startFilePresentation(imageSrc, event.filePresentation.owner.info.name);
      } catch (e) {
        console.log('failed to get presented file image source', e);
      }
    }
  };

  useEffect(() => {
    const fileConvertedUnsubscribeFn =
      CommsAPI.filePresentation.onFileConverted(convertedFileEventHandler);
    const filePresentationChangeUnsubscribeFn =
      CommsAPI.filePresentation.onFilePresentationChange(
        filePresentationChangeEventHandler
      );
    return () => {
      fileConvertedUnsubscribeFn();
      filePresentationChangeUnsubscribeFn();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default FilePresentationHandler;

import React, { useContext, useEffect } from 'react';
import Toast from 'react-native-toast-message';

import { FilePresentationContext } from '@components/FilePresentationHandler/FilePresentationProvider';
import DolbyIoIAPI from '@dolbyio/react-native-iapi-sdk';

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
    Toast.show({
      type: 'custom',
      props: {
        title: 'FILE CONVERTED EVENT DATA',
        content: JSON.stringify(
          {
            fileId: event.fileConverted.id,
            fileName: event.fileConverted.name,
          },
          null,
          2
        ),
      },
    });
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
    Toast.show({
      type: 'custom',
      props: {
        title: 'FILE PRESENTATION CHANGE EVENT DATA',
        content: JSON.stringify(
          {
            changeEventType: type,
            fileId: event.filePresentation.id,
          },
          null,
          2
        ),
      },
    });
    if (type === FilePresentationServiceEventNames.FilePresentationStopped) {
      resetFilePresentation();
      return;
    }
    if (
      type === FilePresentationServiceEventNames.FilePresentationStarted ||
      type === FilePresentationServiceEventNames.FilePresentationUpdated
    ) {
      try {
        const imageSrc = await DolbyIoIAPI.filePresentation.getImage(
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
      DolbyIoIAPI.filePresentation.onFileConverted(convertedFileEventHandler);
    const filePresentationChangeUnsubscribeFn =
      DolbyIoIAPI.filePresentation.onFilePresentationChange(
        filePresentationChangeEventHandler
      );
    return () => {
      fileConvertedUnsubscribeFn();
      filePresentationChangeUnsubscribeFn();
    };
  }, []);

  return null;
};

export default FilePresentationHandler;

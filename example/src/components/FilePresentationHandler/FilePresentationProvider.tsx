import React, { useState } from 'react';

export interface IFilePresentationProvider {
  isPresentingFile: Boolean;
  fileOwnerName?: string;
  fileSrc?: string;
  resetFilePresentation: () => void;
  startFilePresentation: (fileSrc: string, fileOwnerName?: string) => void;
}

export const FilePresentationContext =
  React.createContext<IFilePresentationProvider>({
    isPresentingFile: false,
    fileOwnerName: '',
    fileSrc: '',
    resetFilePresentation: () => {},
    startFilePresentation: () => {},
  });

export const FilePresentationProvider: React.FC = ({ children }) => {
  const [isPresentingFile, setIsPresentingFile] = useState(false);
  const [fileOwnerName, setFileOwnerName] = useState('');
  const [fileSrc, setFileSrc] = useState('');

  const resetPresentation = () => {
    setFileSrc('');
    setFileOwnerName('');
    setIsPresentingFile(false);
  };

  const startPresentation = (
    presentationFileSrc: string,
    filePresentationOwnerName?: string
  ) => {
    setIsPresentingFile(true);
    setFileSrc(presentationFileSrc);
    setFileOwnerName(filePresentationOwnerName || 'no data');
  };

  const contextValue = {
    isPresentingFile,
    fileOwnerName,
    fileSrc,
    startFilePresentation: startPresentation,
    resetFilePresentation: resetPresentation,
  };

  return (
    <FilePresentationContext.Provider value={contextValue}>
      {children}
    </FilePresentationContext.Provider>
  );
};

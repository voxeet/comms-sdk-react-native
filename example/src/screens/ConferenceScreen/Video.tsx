import React, { useEffect, useRef } from 'react';

import { VideoView } from '@dolbyio/comms-sdk-react-native';

import type { Participant } from '@dolbyio/comms-sdk-react-native/models';

type VideoProps = {
  participant: Participant;
  width: number;
  height: number;
  scaleType?: 'fill' | 'fit';
};

const Video = ({ participant, width, height, scaleType }: VideoProps) => {
  const videoView = useRef() as React.MutableRefObject<VideoView>;

  useEffect(() => {
    if (videoView?.current) {
      if (participant.streams?.length) {
        // @ts-ignore
        videoView.current.attach(
          participant,
          participant.streams[participant.streams.length - 1]
        );
        console.log('attach');
      } else {
        // @ts-ignore
        videoView.current.detach();
        console.log('detach');
      }
    }
  }, [participant]);

  return (
    <VideoView
      ref={videoView}
      style={{ width, height }}
      scaleType={scaleType}
    />
  );
};

export default Video;

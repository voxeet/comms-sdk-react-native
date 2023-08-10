import React, { useState } from 'react';
import { View, LayoutChangeEvent } from 'react-native';

import type { Participant } from '@dolbyio/comms-sdk-react-native/models';
import Video from './Video';

const GRID = [
  [1, 1],
  [1, 2],
  [2, 2],
  [2, 2],
  [2, 3],
  [2, 3],
  [3, 3],
  [3, 3],
  [3, 3],
];

type VideoGalleryProps = {
  participants: Participant[];
  scaleType?: 'fill' | 'fit';
};

const VideoGallery = ({ participants, scaleType }: VideoGalleryProps) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const onLayout = (event: LayoutChangeEvent) => {
    const { width: newWidth, height: newHeight } = event.nativeEvent.layout;
    setWidth(newWidth);
    setHeight(newHeight);
  };

  return (
    <View onLayout={onLayout} style={{ flex: 1, flexWrap: "wrap", flexDirection: "row", alignContent: "flex-start" }}>
      {participants.map((p) => (
        <Video
          key={p.id}
          participant={p}
          width={width / GRID[participants.length - 1][0]}
          height={height / GRID[participants.length - 1][1]}
          scaleType={scaleType}
          
        />
      ))}
    </View>
  );
};

export default VideoGallery;

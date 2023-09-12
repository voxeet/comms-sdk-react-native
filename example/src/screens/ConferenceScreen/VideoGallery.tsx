import React from 'react';
import { Dimensions, View } from 'react-native';
import type { Participant } from '@dolbyio/comms-sdk-react-native/models';
import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ParticipantAvatar from './ParticipantAvatar';

type VideoGalleryProps = {
  participants: Participant[];
  scaleType?: 'fill' | 'fit';
};

const VideoGallery = ({ participants, scaleType }: VideoGalleryProps) => {

  const numColumns = 2;
  const renderItem = ({ item }: { item: Participant }) => (
    <View style={styles.item}>
      <ParticipantAvatar participant={item} scaleType={scaleType} />
    </View>
  );

  const styles = StyleSheet.create({
    container: {
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingTop: 16,
    },
    item: {
      flex: 1,
      margin: 8,
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
      height: Dimensions.get('window').width / numColumns - 24,
    },
  });

  return (
    <FlatList
      data={participants}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      numColumns={numColumns}
      contentContainerStyle={styles.container}>
    </FlatList>
  );
};

export default VideoGallery;

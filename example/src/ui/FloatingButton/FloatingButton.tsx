import React, { useState } from 'react';
import { View, TouchableOpacity, Text, PanResponder } from 'react-native';

import styles from './FloatingButton.style';

interface MovableFloatingButtonProps {
  onPress: () => void;
  onLongPress?: () => void;
}

const MovableFloatingButton: React.FC<MovableFloatingButtonProps> = ({ onPress, onLongPress }) => {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [previousPosition, setPreviousPosition] = useState({ x: 0, y: 0 });

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      const pos = {
        x: previousPosition.x + gestureState.dx,
        y: previousPosition.y + gestureState.dy,
      }
      setPosition(pos);
      setPreviousPosition(pos);
    },
  });

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.button,
          {
            transform: [{ translateX: position.x }, { translateY: position.y }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
          <Text style={styles.buttonText}>ⓘ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};



export default MovableFloatingButton;

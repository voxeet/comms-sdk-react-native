import React, { Component } from 'react';
import { KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import COLORS from '@constants/colors.constants';

import FloatingButton from '@ui/FloatingButton';
import LoggerView from '@utils/Logger/LoggerView';
import NavigationProvider from './navigation/NavigationProvider';

export interface Props {}

export interface State {
  isOverlayVisible: boolean;
  isOverlayTouchable: boolean;
}

export default class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isOverlayVisible: false,
      isOverlayTouchable: true
    };
  }
  render() {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <StatusBar backgroundColor={COLORS.BLACK} />
          <NavigationProvider />
          <LoggerView isVisible={this.state.isOverlayVisible} isTouchable={this.state.isOverlayTouchable} />
          <FloatingButton 
            onPress={() => {this.setState({isOverlayVisible: !this.state.isOverlayVisible})}}
            onLongPress={() => {this.setState({isOverlayTouchable: !this.state.isOverlayTouchable})}}
          />
        </KeyboardAvoidingView>
      </GestureHandlerRootView>
    );
  }
}

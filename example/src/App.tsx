import React, { Component } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import DolbyIOProvider from '@components/DolbyIOProvider';

import Main from './Main';

export interface Props {}

export interface State {}

export default class App extends Component<Props, State> {
  render() {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <DolbyIOProvider>
            <Main />
          </DolbyIOProvider>
        </KeyboardAvoidingView>
      </GestureHandlerRootView>
    );
  }
}

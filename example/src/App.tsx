import Main from './Main';
import DolbyIOProvider from './components/DolbyIOProvider';
import React, { Component } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import Toast from 'react-native-toast-message';

export interface Props {}

export interface State {}

export default class App extends Component<Props, State> {
  render() {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <DolbyIOProvider>
          <Main />
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </DolbyIOProvider>
      </KeyboardAvoidingView>
    );
  }
}

import React, { Component } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RNToast from 'react-native-toast-message';

import DolbyIOProvider from '@components/DolbyIOProvider';
import { toastConfig } from '@utils/toast.config';

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
            <RNToast
              config={toastConfig}
              ref={(ref) => RNToast.setRef(ref)}
              autoHide={false}
            />
          </DolbyIOProvider>
        </KeyboardAvoidingView>
      </GestureHandlerRootView>
    );
  }
}

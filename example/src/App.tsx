import React, { Component } from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Platform,
  Alert,
  Text,
} from 'react-native';
// @ts-ignore
import { APP_ID, APP_SECRET } from 'react-native-dotenv';
import IAPISDK from '@dolbyio/react-native-iapi-sdk';

export interface Props {}

export interface State {}

export default class App extends Component<Props, State> {
  componentDidMount() {
    console.log(APP_ID, APP_SECRET);
    IAPISDK.initialize(APP_ID, APP_SECRET)
      .then(() => {
        Alert.alert('App initialized successfully');
      })
      .catch(() => {
        Alert.alert('App not initialized');
      });
  }

  render() {
    return (
      <SafeAreaView>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <Text>DOLBY IO IAPI TEST APP</Text>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

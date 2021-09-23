import React, { Component } from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  Text,
} from 'react-native';
// @ts-ignore
import { APP_ID, APP_SECRET } from 'react-native-dotenv';
import DolbyIoIAPI from '@dolbyio/react-native-iapi-sdk';

export interface Props {}

export interface State {}

export default class App extends Component<Props, State> {
  state = {
    activeConference: null,
  };

  initialize = async () => {
    DolbyIoIAPI.initialize(APP_ID, APP_SECRET)
      .then(async () => {
        await DolbyIoIAPI.session.open({ name: 'John Doe' });
        Alert.alert('App initialized successfully');
      })
      .catch(() => {
        Alert.alert('App not initialized');
      });
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <Text>DOLBY IO IAPI TEST APP</Text>
          <TouchableOpacity onPress={this.initialize}>
            <Text>INITIALIZE</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
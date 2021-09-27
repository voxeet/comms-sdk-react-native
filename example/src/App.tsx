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

  create = async () => {
    const response = await DolbyIoIAPI.conference.create({});
    Alert.alert(JSON.stringify(response));
    this.setState({
      activeConference: response,
    });
  };

  fetch = async () => {
    if (this.state.activeConference) {
      const response = await DolbyIoIAPI.conference.fetch(
        this.state.activeConference.id
      );
      Alert.alert(JSON.stringify(response));
    }
  };

  join = async () => {
    if (this.state.activeConference) {
      const response = await DolbyIoIAPI.conference.join(
        this.state.activeConference
      );
      Alert.alert(JSON.stringify(response));
    }
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <Text>DOLBY IO IAPI TEST APP</Text>
          <TouchableOpacity onPress={this.initialize}>
            <Text>INITIALIZE</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.create}>
            <Text>CREATE</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.fetch}>
            <Text>FETCH</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.join}>
            <Text>JOIN</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
import React, { Component } from 'react';
import {
  Appearance,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Platform,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import Initialization from './init/Init';
import VoxeetEnvironment from './VoxeetEnvironment';
import JoinConference from './conference/JoinConference';
import Login from './login/Login';
import ParticipantsView from './conference/ParticipantsView';
import ConferenceControls from './conference/ConferenceControls';
import ParticipantInviteView from './conference/inside/ParticipantInvite';

export interface Props {

}

export interface State {

}

export default class App extends Component<Props, State> {

  componentDidMount() {
    VoxeetEnvironment.addListener("initialization", this.onInit);
    VoxeetEnvironment.addListener("connect", this.onInit);
  }

  componentWillUnmount() {
    VoxeetEnvironment.removeListener("initialization", this.onInit);
    VoxeetEnvironment.removeListener("connect", this.onInit);
  }

  private onInit = () => {
    this.forceUpdate();
  }

  renderInitialized() {
    return (<>
      <Login />
      <View style={{height: 16}} />
      <JoinConference />
      <View style={{height: 16}} />
      <ConferenceControls />
      <View style={{height: 16}} />
      <ParticipantsView />
      <View style={{height: 16}} />
      <ParticipantInviteView />
    </>);
  }

  render() {
    const isDarkMode = Appearance.getColorScheme() === 'dark';

    const backgroundStyle = {
      height: "100%",
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior= {(Platform.OS === 'ios')? "padding" : undefined}>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={backgroundStyle}>
            {
              !VoxeetEnvironment.initialized
              ? <Initialization />
              : this.renderInitialized()
            }
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
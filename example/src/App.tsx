import React, { Component } from 'react';
import { KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import DolbyIOProvider from '@components/DolbyIOProvider';
import FilePresentationHandler, {
  FilePresentationProvider,
} from '@components/FilePresentationHandler';
import InvitationHandler from '@components/InvitationHandler';
import ConferenceCreatedHandler from '@components/ConferenceCreatedHandler';
import ConferenceEndedHandler from '@components/ConferenceEndedHandler';
import MessageHandler from '@components/MessageHandler';
import RecordingProvider from '@components/RecordingProvider';
import VideoPresentationHandler from '@components/VideoPresentationHandler';
import COLORS from '@constants/colors.constants';

import Main from './Main';
import ConferenceStatusHandler from '@components/ConferenceStatusHandler';
import ParticipantJoinedHandler from '@components/ParticipantJoinedHandler';
import ParticipantLeftHandler from '@components/ParticipantLeftHandler';
import ActiveParticipantsHandler from '@components/ActiveParticipantsHandler';

import FloatingButton from '@ui/FloatingButton';
import LoggerView from '@utils/Logger/LoggerView';

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
          <DolbyIOProvider>
            <RecordingProvider>
              <FilePresentationProvider>
                <Main />
                <LoggerView isVisible={this.state.isOverlayVisible} isTouchable={this.state.isOverlayTouchable} />
                <FloatingButton 
                onPress={() => {this.setState({isOverlayVisible: !this.state.isOverlayVisible})}}
                onLongPress={() => {this.setState({isOverlayTouchable: !this.state.isOverlayTouchable})}}
                />
                <FilePresentationHandler />
              </FilePresentationProvider>
            </RecordingProvider>
            <VideoPresentationHandler />
            <MessageHandler />
            <InvitationHandler />
            <ConferenceStatusHandler />
            <ConferenceCreatedHandler />
            <ConferenceEndedHandler />
            <ParticipantJoinedHandler />
            <ParticipantLeftHandler />
            <ActiveParticipantsHandler />
          </DolbyIOProvider>
        </KeyboardAvoidingView>
      </GestureHandlerRootView>
    );
  }
}

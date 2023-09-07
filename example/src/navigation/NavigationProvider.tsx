import ActiveParticipantsHandler from "@components/ActiveParticipantsHandler";
import ConferenceCreatedHandler from "@components/ConferenceCreatedHandler";
import ConferenceEndedHandler from "@components/ConferenceEndedHandler";
import ConferenceStatusHandler from "@components/ConferenceStatusHandler";
import DolbyIOProvider from "@components/DolbyIOProvider";
import FilePresentationHandler, { FilePresentationProvider } from "@components/FilePresentationHandler";
import InvitationHandler from "@components/InvitationHandler";
import MessageHandler from "@components/MessageHandler";
import ParticipantJoinedHandler from "@components/ParticipantJoinedHandler";
import ParticipantLeftHandler from "@components/ParticipantLeftHandler";
import RecordingProvider from "@components/RecordingProvider";
import VideoPresentationHandler from "@components/VideoPresentationHandler";
import AudioPreviewScreen from "@screens/AudioPreviewScreen/AudioPreviewScreen";
import ConferenceScreen from "@screens/ConferenceScreen";
import InputTokenScreen from "@screens/InputTokenScreen/InputTokenScreen";
import JoinScreen from "@screens/JoinScreen/JoinScreen";
import LoginScreen from "@screens/LoginScreen";
import React, { useState } from "react";

export enum ScreenType {
    InputTokenScreen,
    LoginScreen,
    JoinScreen, 
    AudioPreviewScreen,
    ConferenceScreen
}

export interface INavigationProvider {
    currentScreen: ScreenType,
    setScreen: (screen: ScreenType) => void
}

export const NavigationContext = React.createContext<INavigationProvider>({
    currentScreen: ScreenType.InputTokenScreen,
    setScreen: (_: ScreenType) => undefined
});

const NavigationProvider: React.FC = () => {
    const [currentScreen, setScreen] = useState(ScreenType.InputTokenScreen);
    const data = {
        currentScreen: currentScreen,
        setScreen: setScreen
    };

    const getScreen = (screen: ScreenType) => {
        switch(screen) {
            case ScreenType.InputTokenScreen:
                return <InputTokenScreen/>
            case ScreenType.LoginScreen:
                return <LoginScreen/>
            case ScreenType.JoinScreen:
                return <JoinScreen/>
            case ScreenType.ConferenceScreen:
                return <ConferenceScreen/>
            case ScreenType.AudioPreviewScreen:
                return <AudioPreviewScreen/>
        }
    }

    return (
        <NavigationContext.Provider value={data}>
            <DolbyIOProvider>
            <RecordingProvider>
              <FilePresentationProvider>
                {getScreen(currentScreen)}
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
            
        </NavigationContext.Provider>
    );
};

export default NavigationProvider;
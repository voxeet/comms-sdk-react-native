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
import React, { useState } from "react";
import { Screens, Screen } from "./ScreenFactory";



export interface INavigationProvider {
    currentScreen: Screen,
    setScreen: (screen: Screen) => void
}

export const NavigationContext = React.createContext<INavigationProvider>({
    currentScreen: Screens.InputTokenScreen,
    setScreen: (_: Screen) => undefined
});

const NavigationProvider: React.FC = () => {
    const [currentScreen, setScreen] = useState(Screens.InputTokenScreen);
    const data = {
        currentScreen: currentScreen,
        setScreen: setScreen
    };

    return (
        <NavigationContext.Provider value={data}>
            <DolbyIOProvider>
            <RecordingProvider>
              <FilePresentationProvider>
                {currentScreen.create()}
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
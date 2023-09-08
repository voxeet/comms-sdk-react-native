import AudioPreviewScreen from "@screens/AudioPreviewScreen"
import ConferenceScreen from "@screens/ConferenceScreen"
import InputTokenScreen from "@screens/InputTokenScreen"
import JoinScreen from "@screens/JoinScreen"
import LoginScreen from "@screens/LoginScreen"
import React from "react"

export interface Screen {
    create(): React.ReactElement
};

class ScreenFactory implements Screen {
    private _factoryClousure: () => React.ReactElement;

    constructor(factoryClousure: () => React.ReactElement ) {
        this._factoryClousure = factoryClousure;
    }

    create(): React.ReactElement {
        return this._factoryClousure();
    }
}

export const Screens = {
    InputTokenScreen: new ScreenFactory(() => <InputTokenScreen/>) as Screen,
    LoginScreen: new ScreenFactory(() => <LoginScreen/>) as Screen,
    JoinScreen: new ScreenFactory(() => <JoinScreen/>) as Screen,
    AudioPreviewScreen: new ScreenFactory(() => <AudioPreviewScreen/>) as Screen,
    ConferenceScreen: new ScreenFactory(() => <ConferenceScreen/>) as Screen,
}

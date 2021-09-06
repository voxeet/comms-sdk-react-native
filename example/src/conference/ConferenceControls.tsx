import React, { Component } from "react";
import Card from "../ui/Card";
import VoxeetEnvironment from "../VoxeetEnvironment";
import CustomSwitchWithPromise from "../ui/CustomSwitchWithPromise";
import {check, Permission, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import { Platform } from "react-native";
import type { ConferenceStatusUpdatedEvent } from "@dolbyio/react-native-iapi-sdk";
import { IAPISDK } from "@dolbyio/react-native-iapi-sdk";

export interface Props {

}

export interface State {
  conferenceAlias?: string,
  cameraState?: boolean
  status?: ConferenceStatusUpdatedEvent
}

export default class ConferenceControls extends Component<Props, State> {
  public state: State = { cameraState: false };

  componentDidMount() {
    VoxeetEnvironment.addListener("connect", this.onRefresh);
    VoxeetEnvironment.addListener("ConferenceStatusUpdatedEvent", this.onStatus);
  }

  componentWillUnmount() {
    VoxeetEnvironment.removeListener("connect", this.onRefresh);
    VoxeetEnvironment.removeListener("ConferenceStatusUpdatedEvent", this.onStatus);
  }

  private onRefresh = () => this.forceUpdate();
  private onStatus = (status: ConferenceStatusUpdatedEvent) => this.setState({status});

  private cameraPermission: Permission|undefined = Platform.select({
    android: PERMISSIONS.ANDROID.CAMERA,
    ios: PERMISSIONS.IOS.CAMERA
  });

  private check = async (): Promise<boolean> => {
    if(!this.cameraPermission) return true;
    const status = await check(this.cameraPermission);
    switch(status) {
      case RESULTS.GRANTED:
      case RESULTS.LIMITED: {
        return false;
      }
      case RESULTS.UNAVAILABLE:
      case RESULTS.BLOCKED:
      case RESULTS.DENIED:
      default: {
        return true;
      }
    }
  }


  private checkAndAlert = async (status: "unavailable"|"blocked"|"denied"|"granted"|"limited"): Promise<boolean> => {
    switch(status) {
      case RESULTS.UNAVAILABLE: {
        console.warn('Unable to start the camera on your platform !');
        return false;
      }
      case RESULTS.BLOCKED: {
        console.warn('The permission is blocked !');
        return false;
      }
      case RESULTS.DENIED: {
        console.warn('The permission has been refused !');
        return false;
      }
      case RESULTS.GRANTED:
      case RESULTS.LIMITED: {
        return true;
      }
      default: {
        console.warn('Unknown permission result but can\'t start camera !');
        return false;
      }
    }
  }

  private turnCamera = async (cameraState: boolean): Promise<boolean> => {
    if(!cameraState || !this.cameraPermission) {
      try {
        await IAPISDK.conference.stopVideo();
      } catch(e) {
        console.error("stopVideo error", e);
      }
      return cameraState;
    }

    var need_request = await this.check();
    if(need_request) {
      const result = await request(this.cameraPermission);
      need_request = !this.checkAndAlert(result);
    }

    if(!need_request) {
      try {
        await IAPISDK.conference.startVideo();
        return true;
      } catch(e) {
        console.error("stopVideo error", e);
        return false;
      }
    }

    return false;
  }

  render() {
    const { cameraState } = this.state;

    const connected = VoxeetEnvironment.connected;
    const inConference = !!VoxeetEnvironment.currentJoinedConference();

    return (
      <Card title="In conference controls">
        <CustomSwitchWithPromise 
          onValueChange={this.turnCamera}
          value={cameraState}
          textSelected="Camera on"
          textUnselected="Camera off"
          disabled={!inConference || !connected}
        />
      </Card>
    )
  }
}
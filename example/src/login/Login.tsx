import React, { Component } from "react";
import { View } from "react-native";
import { Button } from "react-native-material-ui";
import Card from "../ui/Card";
import VoxeetEnvironment from "../VoxeetEnvironment";
import { TextField } from 'rn-material-ui-textfield';
import AsyncStorage from "@react-native-community/async-storage";
import { ConferenceParticipant } from "@dolbyio/react-native-iapi-sdk";

export interface Props {

}

export interface State {
  externalId?: string,
  name?: string
  avatarUrl?: string
}

export default class Login extends Component<Props, State> {
  public state: State = {};

  componentDidMount() {
    this.load(); // asynchronously load previously logged in user
    VoxeetEnvironment.addListener("connect", this.onConnect);
  }

  componentWillUnmount() {
    VoxeetEnvironment.removeListener("connect", this.onConnect);
  }

  private onConnect = () => this.forceUpdate();

  private load = async () => {
    try {
      const json = await AsyncStorage.getItem("login");
      console.warn("json", json);
      if(json) {
        const { name, externalId, avatarUrl } = JSON.parse(json);
        this.setState({name, externalId, avatarUrl});
      }
    } catch(e) {

    }
  }

  private close = async () => {
    try {
      await VoxeetEnvironment.close();
    } catch(e) {
      console.error(e);
    }
  }

  private submit = async () => {
    try {
      const { externalId, name, avatarUrl } = this.state;
      if(!name) throw "Missing participantName";

      const participant = new ConferenceParticipant(externalId, name, avatarUrl);
      console.warn("opening a session", participant);
      await VoxeetEnvironment.connect(participant);
      await AsyncStorage.setItem("login", JSON.stringify({ externalId, name, avatarUrl}));
    } catch(e) {
      console.error("connect session error", e);
    }
  }

  render() {
    const { name, externalId, avatarUrl } = this.state;
    const connected = VoxeetEnvironment.connected;

    return (
      <Card title="Open session">
        <TextField
          disabled={connected}
          label="externalId"
          value={externalId}
          onChangeText={(externalId: string) => this.setState({externalId})} />
        <TextField
          disabled={connected}
          label="name"
          value={name}
          onChangeText={(name: string) => this.setState({name})} />
        <TextField
          disabled={connected}
          label="avatarUrl"
          value={avatarUrl}
          onChangeText={(avatarUrl: string) => this.setState({avatarUrl})} />
        <View style={{height: 16}} />

        <Button disabled={connected} onPress={() => this.submit()} text="open session" raised primary />
        <View style={{height: 16}} />
        <Button disabled={!connected} onPress={() => this.close()} text="close session" raised primary />
      </Card>
    )
  }
}
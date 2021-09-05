import React, { Component } from "react";
import { Button } from "react-native-material-ui";
import Card from "../ui/Card";
import VoxeetEnvironment, { VOXEET_APPID, VOXEET_APPSECRET } from "../VoxeetEnvironment";
import { TextField } from 'rn-material-ui-textfield'

export interface Props {

}

export interface State {
  appId?: string,
  appSecret?: string
}

export default class Initialization extends Component<Props, State> {
  public state: State = {
    appId: VOXEET_APPID,
    appSecret: VOXEET_APPSECRET
  };

  private submit = async () => {
    try {
      const { appId, appSecret } = this.state;
      if(!appId || !appSecret) throw "Missing appId/appSecret tuple";

      await VoxeetEnvironment.initialize(appId, appSecret);
    } catch(e) {
      console.error(e);
    }
  }

  render() {
    const { appId, appSecret } = this.state;

    return (
      <Card title="Initialization">
        <TextField
          value={appId}
          label="Application ID"
          onChangeText={(appId: string) => this.setState({appId})} />

        <TextField
          value={appSecret}
          label="Application Secret"
          onChangeText={(appSecret: string) => this.setState({appSecret})} />

        <Button onPress={() => this.submit()} text="Init" raised primary />
      </Card>
    )
  }
}
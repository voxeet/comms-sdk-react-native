import React, { Component } from "react";
import { Button } from "react-native-material-ui";
import Card from "../ui/Card";
import VoxeetEnvironment, { DEFAULT_URL } from "../VoxeetEnvironment";
import { TextField } from 'rn-material-ui-textfield'

export interface Props {

}

export interface State {
  url?: string,
}

export default class Initialization extends Component<Props, State> {
  public state: State = {
    url: DEFAULT_URL,
  };

  private submit = async () => {
    try {
      const { url } = this.state;
      if(!url) throw "Missing url tuple";

      await VoxeetEnvironment.initializeWithToken(url);
    } catch(e) {
      console.error(e);
    }
  }

  render() {
    const { url } = this.state;

    return (
      <Card title="Initialization">
        <TextField
          value={url}
          label="url to retrieve token"
          onChangeText={(url: string) => this.setState({url})} />

        <Button onPress={() => this.submit()} text="Init" raised primary />
      </Card>
    )
  }
}
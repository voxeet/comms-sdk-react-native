import React, { Component } from "react";
import { StyleSheet } from "react-native";
import Card from "../../ui/Card";
import { Button } from "react-native-material-ui";
import { TextField } from 'rn-material-ui-textfield';
import VoxeetEnvironment from "../../VoxeetEnvironment";
import { IAPISDK, Conference, ConferenceParticipant } from "@dolbyio/react-native-iapi-sdk";
import type { ConferenceStatusUpdatedEvent } from "@dolbyio/react-native-iapi-sdk";

export interface Props {

}

interface State {
  conference?: Conference | null,
  externalId?: string,
  name?: string,
  avatarUrl?: string
}

export default class ParticipantInviteView extends Component<Props, State> {

  state: State = {};

  componentDidMount() {
    VoxeetEnvironment.addListener("ConferenceStatusUpdatedEvent", this.onConferenceStatus);
  }

  componentWillUnmount() {
    VoxeetEnvironment.addListener("ConferenceStatusUpdatedEvent", this.onConferenceStatus);
  }

  private onConferenceStatus = async (event: ConferenceStatusUpdatedEvent|undefined) => {
    //future version will bring event.conference as it's an interesting structure to always have
    try {
      const conference = await IAPISDK.conference.getConference();
      this.setState({conference});
    } catch(e) {
      console.warn("onConferenceStatus in invite failed", e);
    }
  }

  private invite = async () => {
    try {
      const { conference, externalId, name, avatarUrl } = this.state;

      if(!conference || !conference.conferenceId) throw "not in a conference";
      if(!externalId) throw "invalid externalId";
      if(conference) await IAPISDK.notification.invite(conference, [ new ConferenceParticipant(externalId, name || "", avatarUrl)])
    } catch(e) {
      console.error("invite error", e);
    }
  }

  render() {
    const { externalId, conference } = this.state;

    return (<Card title="Invite a Participant">
      <TextField
        label="Participant's external ID"
        disabled={!conference}
        onChangeText={(externalId: string) => this.setState({externalId})} />
      <TextField
        label="name"
        disabled={!conference}
        onChangeText={(name: string) => this.setState({name})} />
      <TextField
        label="avatarUrl"
        disabled={!conference}
        onChangeText={(avatarUrl: string) => this.setState({avatarUrl})} />

      <Button disabled={!externalId || externalId.length == 0 || !conference} onPress={() => this.invite()} text="invite" raised primary />
    </Card>);
  }
}

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
  },
  image: {width: 50, height: 50}
});
import React, { Component } from "react";
import VoxeetEnvironment from "../VoxeetEnvironment";
import ParticipantView from "./inside/ParticipantView";

export interface Props {

}

interface State {
  participants: string[]
}

export default class ParticipantsView extends Component<Props, State> {

  state: State = {participants: []};

  componentDidMount() {
    VoxeetEnvironment.addListener("ConferenceStatusUpdatedEvent", this.update);
    VoxeetEnvironment.addListener("ParticipantAddedEvent", this.update);
    VoxeetEnvironment.addListener("ParticipantUpdatedEvent", this.update);
  }

  componentWillUnmount() {
    VoxeetEnvironment.removeListener("ConferenceStatusUpdatedEvent", this.update);
    VoxeetEnvironment.removeListener("ParticipantAddedEvent", this.update);
    VoxeetEnvironment.removeListener("ParticipantUpdatedEvent", this.update);
  }

  private update = async (event: any) => {
    const participants = await VoxeetEnvironment.participants();
    this.setState({participants: participants.map(p => p.participantId)});
  }

  render() {
    return this.state.participants.map(p => <ParticipantView key={p} participant={p} />);
  }
}
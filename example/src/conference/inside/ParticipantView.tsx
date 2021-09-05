import React, { Component } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import type { MediaStream, StreamAddedEvent, StreamRemovedEvent, StreamUpdatedEvent } from "@dolbyio/react-native-iapi-sdk";
import { VideoView, Participant } from "@dolbyio/react-native-iapi-sdk";
import Card from "../../ui/Card";
import VoxeetEnvironment from "../../VoxeetEnvironment";

export interface Props {
  participant: string
}

interface State {
  streams?: MediaStream[];
}

export default class ParticipantView extends Component<Props, State> {

  private participant?: Participant;
  state: State = {};
  private videoView: VideoView|null = null;

  private avatar() {
    if(!this.participant || !this.participant.avatarUrl) return <View style={styles.image} />;
    return <Image style={styles.image}source={{uri: this.participant.avatarUrl}} />
  }

  componentDidMount() {
    this.refreshStreams();
    VoxeetEnvironment.addListener("ParticipantAddedEvent", this.update);
    VoxeetEnvironment.addListener("ParticipantUpdatedEvent", this.update);
    VoxeetEnvironment.addListener("StreamAddedEvent", this.onStreamUpdate);
    VoxeetEnvironment.addListener("StreamUpdatedEvent", this.onStreamUpdate);
    VoxeetEnvironment.addListener("StreamRemovedEvent", this.onStreamUpdate);
  }

  componentWillUnmount() {
    VoxeetEnvironment.removeListener("StreamAddedEvent", this.onStreamUpdate);
    VoxeetEnvironment.removeListener("StreamUpdatedEvent", this.onStreamUpdate);
    VoxeetEnvironment.removeListener("StreamRemovedEvent", this.onStreamUpdate);
    VoxeetEnvironment.removeListener("ParticipantAddedEvent", this.update);
    VoxeetEnvironment.removeListener("ParticipantUpdatedEvent", this.update);
  }

  private onStreamUpdate = async (event: StreamAddedEvent|StreamUpdatedEvent|StreamRemovedEvent) => {
    const { participantId } = event.participant;

    if(participantId === this.props.participant) {
      this.refreshStreams();
    }
  }

  private refreshStreams = async () => {
    try {
      const { participant } = this.props;
      const streams: any[] = []; //await IAPISDK.conference.streams(participant);
      this.setState({streams});

      const cameraStream = streams ? streams.find(s => s.type == "Camera") : undefined;

      if(!this.videoView) return;
      if(cameraStream && cameraStream.hasVideoTracks) {
        const user = new Participant(participant); //we only need a pointer to the native
        await this.videoView.attach(user, cameraStream);
      } else {
        await this.videoView.unattach();
      }
    } catch(e) {
      console.error("onStreamUpdate error", e);
    }
  }

  private update = async (event: any) => {
    await VoxeetEnvironment.participants();
    this.participant = VoxeetEnvironment.participant(this.props.participant);
    this.forceUpdate();
  }

  private setVideoView(videoView: VideoView|null) {
    this.videoView = videoView;
  }

  render() {
    const { streams } = this.state;
    this.participant = VoxeetEnvironment.participant(this.props.participant);

    const cameraStream = streams ? streams.find(s => s.type == "Camera") : undefined;
    const { hasAudioTracks, hasVideoTracks } = cameraStream || {hasAudioTracks: false, hasVideoTracks: false};

    if(!this.participant) return null;
    return <Card title={this.participant.name || this.participant.participantId || ""}>
      <View style={styles.main}>
        { this.avatar() }
        <View style={{flexDirection: "column", flex: 1}}>
          <Text>Name: {this.participant.name}</Text>
          <Text>hasAudioTracks: {`${!!hasAudioTracks}`}</Text>
          <Text>hasVideoTracks: {`${!!hasVideoTracks}`}</Text>
        </View>
        <VideoView key={"video"} style={{width: 100, height: 200, backgroundColor: "black"}} scaleType={"fill"} ref={(ref: VideoView|null) => this.setVideoView(ref)} />
      </View>
    </Card>
  }
}

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
  },
  image: {width: 50, height: 50}
});
import { ConferenceStatusUpdatedEvent, IAPIEvents, IAPISDK, Participant, ConferenceStatus, ConferenceParticipant } from "@dolbyio/react-native-iapi-sdk";
import { EventEmitter2 } from "eventemitter2";
import type { ParticipantAddedEvent, ParticipantUpdatedEvent, StreamAddedEvent, StreamRemovedEvent, StreamUpdatedEvent } from "@dolbyio/react-native-iapi-sdk";
import { inConference } from "./Utils";
// @ts-ignore
import { DOLBYIO_TOKEN_URL } from 'react-native-dotenv';

export interface OnInitialization {
  sdk: typeof IAPISDK
}

interface EventMap {
  ["initialization"]: OnInitialization;
  ["connect"]: OnInitialization;
  ["ConferenceStatusUpdatedEvent"]: ConferenceStatusUpdatedEvent;
  ["ParticipantAddedEvent"]: ParticipantAddedEvent;
  ["ParticipantUpdatedEvent"]: ParticipantUpdatedEvent;
  ["StreamAddedEvent"]: StreamAddedEvent;
  ["StreamRemovedEvent"]: StreamRemovedEvent;
  ["StreamUpdatedEvent"]: StreamUpdatedEvent;
}

export const DEFAULT_URL = DOLBYIO_TOKEN_URL;

class VoxeetEnvironment {
  private emitter: EventEmitter2 = new EventEmitter2();

  private _events: IAPIEvents;
  private _init: boolean = false;
  private _connected: boolean = false;
  private _cache: { [key: string]: Participant; } = {};
  private _statuses: { [key: string]: ConferenceStatusUpdatedEvent; } = {};

  constructor() {
    this._events = IAPISDK.events;
    this._events.addListener("ConferenceStatusUpdatedEvent", this.onConferenceStatus);
    this._events.addListener("ParticipantAddedEvent", e => this.emit("ParticipantAddedEvent", e));
    this._events.addListener("ParticipantUpdatedEvent", e => this.emit("ParticipantUpdatedEvent", e));
    this._events.addListener("StreamAddedEvent", e => this.emit("StreamAddedEvent", e));
    this._events.addListener("StreamUpdatedEvent", e => this.emit("StreamUpdatedEvent", e));
    this._events.addListener("StreamRemovedEvent", e => this.emit("StreamRemovedEvent", e));
  }

  public currentJoinedConference(): ConferenceStatusUpdatedEvent|undefined {
    return this.statusMatching([ConferenceStatus.JOINING, ConferenceStatus.JOINED]);
  }

  private statusMatching(statuses: ConferenceStatus[]) {
    const matching = Object.keys(this._statuses).find(c => !!statuses.find(s => s == this._statuses[c].status));
    if(matching) return this._statuses[matching];
    return undefined;
  }

  public get events(): IAPIEvents {
    return this._events;
  }

  public get initialized(): boolean {
    return this._init;
  }

  public get connected(): boolean {
    return this._connected;
  }

  public initializeWithToken = async (url: string) => {
    await IAPISDK.initializeToken(undefined, () => {
      return new Promise((resolve, reject) => {
        fetch(url)
        .then(r => r.json())
        .then(b => b.access_token)
        .then(a => resolve(a))
        .catch(e => reject(e));
      });
    });
    this._init = true;
    this.emit("initialization", { sdk: IAPISDK });
  }

  public initialize = async (appId: string, appSecret: string) => {
    await IAPISDK.initialize(appId, appSecret);
    this._init = true;
    this.emit("initialization", { sdk: IAPISDK });
  }

  public participant = (p: string) => this._cache[p];

  public participants = async () => {
    try {
      const current = this.currentJoinedConference();
      if(!current || !inConference(current)) return [];
      const conferenceId = current.conferenceId;
      if(!conferenceId) throw "invalid conferenceId obtained";
      const conference = await IAPISDK.conference.fetchConference(conferenceId);
      if(!conference) throw "invalid conference obtained";

      const participants = await IAPISDK.conference.getParticipants(conference);

      participants.forEach(participant => {
        this._cache[participant.participantId] = participant;
      });
      return participants;
    } catch(e) {
      console.error("participants error :=", e);
    }
    return [];

  }

  public close = async () => {
    await IAPISDK.session.close();
    this._connected = false;
    this.emit("connect", { sdk: IAPISDK });
  }

  public connect = async (participant: ConferenceParticipant) => {
    await IAPISDK.session.open(participant);
    this._connected = true;
    this.emit("connect", { sdk: IAPISDK });
  }

  private onConferenceStatus = (status: ConferenceStatusUpdatedEvent) => {
    console.warn("VoxeetEnvironment onConferenceStatus", status);
    try {
      var current = this.statusMatching([ConferenceStatus.JOINED, ConferenceStatus.LEAVING]);
      if(!current) return;

      if(!status.conferenceId || status.conferenceId.length == 0) { //if no conferenceId
        if(current) current.status = status.status; //such case is about the leave, error etc...
      } else {
        current = status;
        this._statuses[status.conferenceId] = current;
      }
  
      if(current) {
        this.emit("ConferenceStatusUpdatedEvent", current);
        if(!inConference(current)) this._cache = {};
      }
    } catch(e) {
      console.error("onConferenceStatus", e);
    }
  }

  private emit<K extends keyof EventMap>(type: K, event: EventMap[K]) {
    return this.emitter.emit(type, event);
  }

  public addListener<K extends keyof EventMap>(
    type: K,
    listener: (event: EventMap[K]) => void
  ): this {
    this.emitter.addListener(type, listener);
    return this;
  }

  public removeListener<K extends keyof EventMap>(
    type: K,
    listener: (event: EventMap[K]) => void
  ): this {
    this.emitter.removeListener(type, listener);
    return this;
  }

}

export default new VoxeetEnvironment();
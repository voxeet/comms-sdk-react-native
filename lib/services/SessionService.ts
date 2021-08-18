import { NativeModules } from 'react-native';
import ConferenceUser from "../types/ConferenceUser";
import { Participant } from "../types";

const { RNSessionServiceModule } = NativeModules;

export default class SessionService {
  //TODO make sure open() is also possible
  public async open(participant: ConferenceUser): Promise<boolean> {
    return RNSessionServiceModule.open(participant);
  }

  public async close(): Promise<boolean> {
    return RNSessionServiceModule.close();
  }

  public async isLocalParticipant(participant: Participant): Promise<boolean> {
    throw "not implemented";
  }

  public async isSocketOpen(): Promise<boolean> {
    throw "not implemented";
  }
}
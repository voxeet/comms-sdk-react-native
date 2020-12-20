import { NativeModules } from 'react-native';
import ConferenceUser from "../types/ConferenceUser";

const { RNSessionServiceModule } = NativeModules;

export default class SessionService {
  open = async (participant: ConferenceUser): Promise<boolean> => {
      return RNSessionServiceModule.open(participant);
  }

  close = async (): Promise<boolean> => RNSessionServiceModule.close();
}
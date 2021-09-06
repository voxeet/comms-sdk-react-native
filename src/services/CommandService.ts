import { NativeModules } from 'react-native';
import { Conference, conferenceToMap } from './conference';

const { RNCommandServiceModule } = NativeModules;

export default class CommandService {
  public async send(conference: Conference, message: string): Promise<boolean> {
    return RNCommandServiceModule.send(conferenceToMap(conference), message);
  }
}

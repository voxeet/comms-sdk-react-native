/**
 * @category ConferenceService
 * @module ConferenceService
 */

import { Alert } from 'react-native';

export class ConferenceService {
  public join(): void {
    Alert.alert('Conference Joined');
  }
}

export default new ConferenceService();

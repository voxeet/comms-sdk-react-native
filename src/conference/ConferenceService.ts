import { Alert } from 'react-native';

class ConferenceService {
  public join(): void {
    Alert.alert('Conference Joined');
  }
}

export default new ConferenceService();

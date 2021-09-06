import type { ConferenceStatusUpdatedEvent } from "@dolbyio/react-native-iapi-sdk";
import { ConferenceStatus } from "@dolbyio/react-native-iapi-sdk";

export function inConference(status: ConferenceStatusUpdatedEvent) {
  if(!status || !status.status) return true;

  switch(status.status) {
    case ConferenceStatus.DEFAULT: return false;
    case ConferenceStatus.CREATING: return false;
    case ConferenceStatus.CREATED: return false;
    case ConferenceStatus.JOINING: return true;
    case ConferenceStatus.JOINED: return true;
    case ConferenceStatus.FIRST_PARTICIPANT: return true;
    case ConferenceStatus.NO_MORE_PARTICIPANT: return true;
    case ConferenceStatus.LEAVING: return false;
    case ConferenceStatus.LEFT: return false;
    case ConferenceStatus.ERROR: return false;
    case ConferenceStatus.DESTROYED: return false;
    case ConferenceStatus.ENDED:
    default: return false;
  }
}
import { ParticipantInfo } from "../conference";
import { ConferencePermission } from "./ConferencePermission";

export default interface ParticipantInvited {
  participant: ParticipantInfo;
  permissions: Array<ConferencePermission>;
}
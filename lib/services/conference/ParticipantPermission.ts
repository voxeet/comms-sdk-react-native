import { ConferencePermission } from "../notification/ConferencePermission";
import Participant from "./Participant";

export interface ParticipantPermission {
  participant: Participant;
  permissions: Array<ConferencePermission>;
}
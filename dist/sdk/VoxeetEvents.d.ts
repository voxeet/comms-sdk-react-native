import { ConferenceStatusUpdatedEvent, PermissionRefusedEvent, CameraSwitchSuccessEvent, CameraSwitchErrorEvent, QualityIndicators, RecordingStatusUpdatedEvent, ConferenceDestroyedPush, ConferenceEnded } from "../events/ConferenceStatusUpdatedEvent";
import { FilePresentationConverted, FilePresentationStarted, FilePresentationStopped, FilePresentationUpdated } from "../events/FilePresentationEvents";
import { VideoPresentationSeek, VideoPresentationPlay, VideoPresentationStopped, VideoPresentationPaused, VideoPresentationStarted } from "../events/VideoPresentationEvents";
import { ParticipantAddedEvent, ParticipantUpdatedEvent, StreamAddedEvent, StreamRemovedEvent, ConferenceParticipantQualityUpdatedEvent, StreamUpdatedEvent } from "../events/ConferenceUsersEvent";
import { UnregisterCallback } from '../types';
export interface VideoPresentationEvents {
    ["VideoPresentationSeek"]: VideoPresentationSeek;
    ["VideoPresentationPlay"]: VideoPresentationPlay;
    ["VideoPresentationStopped"]: VideoPresentationStopped;
    ["VideoPresentationPaused"]: VideoPresentationPaused;
    ["VideoPresentationStarted"]: VideoPresentationStarted;
}
export interface FilePresentationEvents {
    ["FilePresentationConverted"]: FilePresentationConverted;
    ["FilePresentationStarted"]: FilePresentationStarted;
    ["FilePresentationStopped"]: FilePresentationStopped;
    ["FilePresentationUpdated"]: FilePresentationUpdated;
}
export interface MediaDeviceEvents {
    ["CameraSwitchSuccessEvent"]: CameraSwitchSuccessEvent;
    ["CameraSwitchErrorEvent"]: CameraSwitchErrorEvent;
}
export interface ConferenceEvents {
    ["ConferenceStatusUpdatedEvent"]: ConferenceStatusUpdatedEvent;
    ["PermissionRefusedEvent"]: PermissionRefusedEvent;
    ["QualityIndicators"]: QualityIndicators;
    ["ConferenceDestroyedPush"]: ConferenceDestroyedPush;
    ["ConferenceEnded"]: ConferenceEnded;
    ["ParticipantAddedEvent"]: ParticipantAddedEvent;
    ["ParticipantUpdatedEvent"]: ParticipantUpdatedEvent;
    ["StreamAddedEvent"]: StreamAddedEvent;
    ["StreamUpdatedEvent"]: StreamUpdatedEvent;
    ["StreamRemovedEvent"]: StreamRemovedEvent;
    ["ConferenceParticipantQualityUpdatedEvent"]: ConferenceParticipantQualityUpdatedEvent;
}
export interface RecordingEvents {
    ["RecordingStatusUpdatedEvent"]: RecordingStatusUpdatedEvent;
}
interface EventMap extends VideoPresentationEvents, FilePresentationEvents, MediaDeviceEvents, ConferenceEvents {
}
export default class VoxeetEvents {
    constructor();
    addListener<K extends keyof EventMap>(type: K, listener: (event: EventMap[K]) => void): UnregisterCallback;
}
export {};

export enum VideoViewEventNames {
  CommandCallback = 'EVENT_VIDEOVIEW_COMMAND_CALLBACK',
}

export interface CommandCallbackEventType {}

export interface VideoViewEventMap {
  [VideoViewEventNames.CommandCallback]: CommandCallbackEventType;
}

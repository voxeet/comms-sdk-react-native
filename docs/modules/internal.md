# Namespace: internal

## Table of contents

### Classes

- [AudioService](../classes/internal.AudioService.md)
- [LocalAudio](../classes/internal.LocalAudio.md)
- [RemoteAudio](../classes/internal.RemoteAudio.md)
- [CommandService](../classes/internal.CommandService.md)
- [ConferenceService](../classes/internal.ConferenceService.md)
- [FilePresentationService](../classes/internal.FilePresentationService.md)
- [MediaDeviceService](../classes/internal.MediaDeviceService.md)
- [NotificationService](../classes/internal.NotificationService.md)
- [RecordingService](../classes/internal.RecordingService.md)
- [SessionService](../classes/internal.SessionService.md)
- [LocalVideo](../classes/internal.LocalVideo.md)
- [RemoteVideo](../classes/internal.RemoteVideo.md)
- [VideoService](../classes/internal.VideoService.md)
- [VideoPresentationService](../classes/internal.VideoPresentationService.md)

### Enumerations

- [ComfortNoiseLevel](../enums/internal.ComfortNoiseLevel.md)
- [AudioCaptureMode](../enums/internal.AudioCaptureMode.md)
- [NoiseReductionLevel](../enums/internal.NoiseReductionLevel.md)
- [ConferenceStatus](../enums/internal.ConferenceStatus.md)
- [ParticipantStatus](../enums/internal.ParticipantStatus.md)
- [ParticipantType](../enums/internal.ParticipantType.md)
- [RTCPMode](../enums/internal.RTCPMode.md)
- [Codec](../enums/internal.Codec.md)
- [ConferencePermission](../enums/internal.ConferencePermission.md)
- [MediaStreamType](../enums/internal.MediaStreamType.md)
- [SpatialAudioStyle](../enums/internal.SpatialAudioStyle.md)
- [VideoForwardingStrategy](../enums/internal.VideoForwardingStrategy.md)
- [VideoPresentationState](../enums/internal.VideoPresentationState.md)

### Interfaces

- [AudioCaptureModeOptions](../interfaces/internal.AudioCaptureModeOptions.md)
- [MessageReceivedEventType](../interfaces/internal.MessageReceivedEventType.md)
- [ParticipantChangedEventType](../interfaces/internal.ParticipantChangedEventType.md)
- [PermissionsUpdatedEventType](../interfaces/internal.PermissionsUpdatedEventType.md)
- [ConferenceStatusUpdatedEventType](../interfaces/internal.ConferenceStatusUpdatedEventType.md)
- [StreamChangedEventType](../interfaces/internal.StreamChangedEventType.md)
- [Conference](../interfaces/internal.Conference.md)
- [ConferenceCreateParameters](../interfaces/internal.ConferenceCreateParameters.md)
- [ConferenceCreateOptions](../interfaces/internal.ConferenceCreateOptions.md)
- [ConferenceLeaveOptions](../interfaces/internal.ConferenceLeaveOptions.md)
- [ConferenceConstraints](../interfaces/internal.ConferenceConstraints.md)
- [ConferenceJoinOptions](../interfaces/internal.ConferenceJoinOptions.md)
- [ConferenceListenOptions](../interfaces/internal.ConferenceListenOptions.md)
- [ConferenceReplayOptions](../interfaces/internal.ConferenceReplayOptions.md)
- [ConferenceMixingOptions](../interfaces/internal.ConferenceMixingOptions.md)
- [Participant](../interfaces/internal.Participant.md)
- [ParticipantInfo](../interfaces/internal.ParticipantInfo.md)
- [ParticipantInvited](../interfaces/internal.ParticipantInvited.md)
- [ParticipantPermissions](../interfaces/internal.ParticipantPermissions.md)
- [AudioProcessingOptions](../interfaces/internal.AudioProcessingOptions.md)
- [AudioProcessingSenderOptions](../interfaces/internal.AudioProcessingSenderOptions.md)
- [SpatialDirection](../interfaces/internal.SpatialDirection.md)
- [SpatialScale](../interfaces/internal.SpatialScale.md)
- [SpatialPosition](../interfaces/internal.SpatialPosition.md)
- [VideoForwardingOptions](../interfaces/internal.VideoForwardingOptions.md)
- [FileConvertedEventType](../interfaces/internal.FileConvertedEventType.md)
- [FilePresentationChangedEventType](../interfaces/internal.FilePresentationChangedEventType.md)
- [File](../interfaces/internal.File.md)
- [FileConverted](../interfaces/internal.FileConverted.md)
- [FilePresentation](../interfaces/internal.FilePresentation.md)
- [InvitationReceivedEventType](../interfaces/internal.InvitationReceivedEventType.md)
- [Recording](../interfaces/internal.Recording.md)
- [VideoPresentationEventType](../interfaces/internal.VideoPresentationEventType.md)
- [VideoPresentation](../interfaces/internal.VideoPresentation.md)

### Enumeration members

- [ParticipantAdded](internal.md#participantadded)
- [ParticipantUpdated](internal.md#participantupdated)
- [StreamAdded](internal.md#streamadded)
- [StreamUpdated](internal.md#streamupdated)
- [StreamRemoved](internal.md#streamremoved)
- [FilePresentationStarted](internal.md#filepresentationstarted)
- [FilePresentationStopped](internal.md#filepresentationstopped)
- [FilePresentationUpdated](internal.md#filepresentationupdated)
- [VideoPresentationPaused](internal.md#videopresentationpaused)
- [VideoPresentationPlayed](internal.md#videopresentationplayed)
- [VideoPresentationSought](internal.md#videopresentationsought)
- [VideoPresentationStarted](internal.md#videopresentationstarted)

### Type aliases

- [AudioTrack](internal.md#audiotrack)
- [VideoTrack](internal.md#videotrack)
- [MediaStream](internal.md#mediastream)
- [UnsubscribeFunction](internal.md#unsubscribefunction)

## Enumeration members

### ParticipantAdded

• **ParticipantAdded**: `Object` = `"EVENT_CONFERENCE_PARTICIPANT_ADDED"`

Emitted when a new participant is invited to a conference. The SDK does not emit the participantAdded event for the local participant. Listeners only receive the participantAdded events about users; they do not receive events for other listeners. Users receive the participantAdded events about users and do not receive any events about listeners.

___

### ParticipantUpdated

• **ParticipantUpdated**: `Object` = `"EVENT_CONFERENCE_PARTICIPANT_UPDATED"`

Emitted when a conference participant changes status. Listeners only receive the participantUpdated events about users; they do not receive events for other listeners. Users receive the participantUpdated events about users and do not receive any events about listeners.

___

### StreamAdded

• **StreamAdded**: `Object` = `"EVENT_CONFERENCE_STREAM_ADDED"`

Emitted when the SDK adds a new stream to a conference participant. Each conference participant can be connected to two streams: the `audio and video` stream and the `screen-share` stream. If a participant enables audio or video, the SDK adds the `audio and video` stream to the participant and emits the streamAdded event to all participants. When a participant is connected to the `audio and video` stream and changes the stream, for example, enables a camera while using a microphone, the SDK updates the `audio and video` stream and emits the [streamUpdated](#streamupdated) event. When a participant starts sharing a screen, the SDK adds the `screen-share` stream to this participants and emits the streamAdded event to all participants. The following graphic shows this behavior:
[block:image]
{
"images": [
{
"image": [
"https://files.readme.io/21575c1-conference-stream-added.png",
"conference-stream-added.png",
3048,
2060,
"#f6f7f7"
],
"caption": "The difference between the streamAdded and streamUpdated events"
}
]
}
[/block]
Based on the stream type, the application chooses to either render a camera view or a screen-share view.
When a new participant joins a conference with enabled audio and video, the SDK emits the streamAdded event that includes audio and video tracks.
The SDK can also emit the streamAdded event only for the local participant. When the local participant uses the [stopAudio](#stopaudio) method to locally mute the selected remote participant who does not use a camera, the local participant receives the [streamRemoved](#streamremoved) event. After using the [startAudio](#startaudio) method for this remote participant, the local participant receives the streamAdded event.

___

### StreamUpdated

• **StreamUpdated**: `Object` = `"EVENT_CONFERENCE_STREAM_UPDATED"`

Emitted when a conference participant who is connected to the `audio and video` stream changes the stream by enabling a microphone while using a camera or by enabling a camera while using a microphone. The event is emitted to all conference participants. The following graphic shows this behavior:
[block:image]
{
"images": [
{
"image": [
"https://files.readme.io/21575c1-conference-stream-added.png",
"conference-stream-added.png",
3048,
2060,
"#f6f7f7"
],
"caption": "The difference between the streamAdded and streamUpdated events"
}
]
}
[/block]
The SDK can also emit the streamUpdated event only for the local participant. When the local participant uses the [stopAudio](#stopaudio) or [startAudio](#startaudio) method to locally mute or unmute a selected remote participant who uses a camera, the local participant receives the streamUpdated event.

___

### StreamRemoved

• **StreamRemoved**: `Object` = `"EVENT_CONFERENCE_STREAM_REMOVED"`

Emitted when the SDK removes a stream from a conference participant. Each conference participant can be connected to two streams: the `audio and video` stream and the `screen-share` stream. If a participant disables audio and video or stops a screen-share presentation, the SDK removes the proper stream and emits the streamRemoved event to all conference participants.
The SDK can also emit the streamRemoved event only for the local participant. When the local participant uses the [stopAudio](#stopaudio) method to locally mute a selected remote participant who does not use a camera, the local participant receives the streamRemoved event.

___

### FilePresentationStarted

• **FilePresentationStarted**: `Object` = `"EVENT_FILEPRESENTATION_STARTED"`

Emitted when a presenter starts a file presentation.

___

### FilePresentationStopped

• **FilePresentationStopped**: `Object` = `"EVENT_FILEPRESENTATION_STOPPED"`

Emitted when a presenter ends a file presentation.

___

### FilePresentationUpdated

• **FilePresentationUpdated**: `Object` = `"EVENT_FILEPRESENTATION_UPDATED"`

Emitted when the presenter changes the displayed page of the shared file.

___

### VideoPresentationPaused

• **VideoPresentationPaused**: `Object` = `"EVENT_VIDEOPRESENTATION_PAUSED"`

Emitted when a video presentation is paused.

___

### VideoPresentationPlayed

• **VideoPresentationPlayed**: `Object` = `"EVENT_VIDEOPRESENTATION_PLAYED"`

Emitted when a video presentation is resumed.

___

### VideoPresentationSought

• **VideoPresentationSought**: `Object` = `"EVENT_VIDEOPRESENTATION_SOUGHT"`

Emitted when a video presentation is sought.

___

### VideoPresentationStarted

• **VideoPresentationStarted**: `Object` = `"EVENT_VIDEOPRESENTATION_STARTED"`

Emitted when a video presentation is started.

## Type aliases

### AudioTrack

Ƭ **AudioTrack**: `any`

The AudioTrack type gathers audio tracks available in a stream.

___

### VideoTrack

Ƭ **VideoTrack**: `any`

The VideoTrack type gathers video tracks available in a stream.

___

### MediaStream

Ƭ **MediaStream**: `Object`

The MediaStream type gathers information about media streams.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `String` | The media stream identifier. |
| `type` | [`MediaStreamType`](../enums/internal.MediaStreamType.md) | The media stream type. |
| `audioTracks` | [`AudioTrack`](internal.md#audiotrack)[] | The audio tracks available in the stream. |
| `videoTracks` | [`VideoTrack`](internal.md#videotrack)[] | The video tracks available in the stream. |
| `label` | `String` | The media stream label. |

___

### UnsubscribeFunction

Ƭ **UnsubscribeFunction**: () => `void`

#### Type declaration

▸ (): `void`

The UnsubscribeFunction unsubscribes from event listeners.

##### Returns

`void`

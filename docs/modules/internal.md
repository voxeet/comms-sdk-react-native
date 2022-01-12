# Namespace: internal

## Table of contents

### Enumerations

- [Codec](../enums/internal.Codec.md)
- [ComfortNoiseLevel](../enums/internal.ComfortNoiseLevel.md)
- [ConferencePermission](../enums/internal.ConferencePermission.md)
- [ConferenceStatus](../enums/internal.ConferenceStatus.md)
- [MediaStreamType](../enums/internal.MediaStreamType.md)
- [ParticipantStatus](../enums/internal.ParticipantStatus.md)
- [ParticipantType](../enums/internal.ParticipantType.md)
- [RTCPMode](../enums/internal.RTCPMode.md)
- [VideoPresentationState](../enums/internal.VideoPresentationState.md)

### Enumeration members

- [FilePresentationStarted](internal.md#filepresentationstarted)
- [FilePresentationStopped](internal.md#filepresentationstopped)
- [FilePresentationUpdated](internal.md#filepresentationupdated)
- [ParticipantAdded](internal.md#participantadded)
- [ParticipantUpdated](internal.md#participantupdated)
- [StreamAdded](internal.md#streamadded)
- [StreamRemoved](internal.md#streamremoved)
- [StreamUpdated](internal.md#streamupdated)
- [paused](internal.md#paused)
- [played](internal.md#played)
- [sought](internal.md#sought)
- [started](internal.md#started)

### Classes

- [CommandService](../classes/internal.CommandService.md)
- [ConferenceService](../classes/internal.ConferenceService.md)
- [FilePresentationService](../classes/internal.FilePresentationService.md)
- [MediaDeviceService](../classes/internal.MediaDeviceService.md)
- [NotificationService](../classes/internal.NotificationService.md)
- [RecordingService](../classes/internal.RecordingService.md)
- [SessionService](../classes/internal.SessionService.md)
- [VideoPresentationService](../classes/internal.VideoPresentationService.md)

### Interfaces

- [AudioProcessingOptions](../interfaces/internal.AudioProcessingOptions.md)
- [AudioProcessingSenderOptions](../interfaces/internal.AudioProcessingSenderOptions.md)
- [Conference](../interfaces/internal.Conference.md)
- [ConferenceConstraints](../interfaces/internal.ConferenceConstraints.md)
- [ConferenceCreateOptions](../interfaces/internal.ConferenceCreateOptions.md)
- [ConferenceCreateParameters](../interfaces/internal.ConferenceCreateParameters.md)
- [ConferenceJoinOptions](../interfaces/internal.ConferenceJoinOptions.md)
- [ConferenceLeaveOptions](../interfaces/internal.ConferenceLeaveOptions.md)
- [ConferenceMixingOptions](../interfaces/internal.ConferenceMixingOptions.md)
- [ConferenceReplayOptions](../interfaces/internal.ConferenceReplayOptions.md)
- [ConferenceStatusUpdatedEventType](../interfaces/internal.ConferenceStatusUpdatedEventType.md)
- [File](../interfaces/internal.File.md)
- [FileConverted](../interfaces/internal.FileConverted.md)
- [FileConvertedEventType](../interfaces/internal.FileConvertedEventType.md)
- [FilePresentation](../interfaces/internal.FilePresentation.md)
- [FilePresentationChangedEventType](../interfaces/internal.FilePresentationChangedEventType.md)
- [InvitationReceivedEventType](../interfaces/internal.InvitationReceivedEventType.md)
- [MessageReceivedEventType](../interfaces/internal.MessageReceivedEventType.md)
- [Participant](../interfaces/internal.Participant.md)
- [ParticipantChangedEventType](../interfaces/internal.ParticipantChangedEventType.md)
- [ParticipantInfo](../interfaces/internal.ParticipantInfo.md)
- [ParticipantInvited](../interfaces/internal.ParticipantInvited.md)
- [ParticipantPermissions](../interfaces/internal.ParticipantPermissions.md)
- [PermissionsUpdatedEventType](../interfaces/internal.PermissionsUpdatedEventType.md)
- [Recording](../interfaces/internal.Recording.md)
- [StreamChangedEventType](../interfaces/internal.StreamChangedEventType.md)
- [VideoPresentation](../interfaces/internal.VideoPresentation.md)
- [VideoPresentationEventType](../interfaces/internal.VideoPresentationEventType.md)

### Type aliases

- [AudioTrack](internal.md#audiotrack)
- [MediaStream](internal.md#mediastream)
- [UnsubscribeFunction](internal.md#unsubscribefunction)
- [VideoTrack](internal.md#videotrack)

## Enumeration members

### FilePresentationStarted

• **FilePresentationStarted**: `Object` = `"EVENT_FILEPRESENTATION_STARTED"`

Emitted when a presenter starts a file presentation.

---

### FilePresentationStopped

• **FilePresentationStopped**: `Object` = `"EVENT_FILEPRESENTATION_STOPPED"`

Emitted when a presenter ends a file presentation.

---

### FilePresentationUpdated

• **FilePresentationUpdated**: `Object` = `"EVENT_FILEPRESENTATION_UPDATED"`

Emitted when the presenter changes the displayed page of the shared file.

---

### ParticipantAdded

• **ParticipantAdded**: `Object` = `"EVENT_CONFERENCE_PARTICIPANT_ADDED"`

Emitted when a new participant is invited to a conference. The SDK does not emit the participantAdded event for the local participant. Listeners only receive the participantAdded events about users; they do not receive events for other listeners. Users receive the participantAdded events about users and do not receive any events about listeners.

---

### ParticipantUpdated

• **ParticipantUpdated**: `Object` = `"EVENT_CONFERENCE_PARTICIPANT_UPDATED"`

Emitted when a conference participant changes status. Listeners only receive the participantUpdated events about users; they do not receive events for other listeners. Users receive the participantUpdated events about users and do not receive any events about listeners.

---

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

---

### StreamRemoved

• **StreamRemoved**: `Object` = `"EVENT_CONFERENCE_STREAM_REMOVED"`

Emitted when the SDK removes a stream from a conference participant. Each conference participant can be connected to two streams: the `audio and video` stream and the `screen-share` stream. If a participant disables audio and video or stops a screen-share presentation, the SDK removes the proper stream and emits the streamRemoved event to all conference participants.
The SDK can also emit the streamRemoved event only for the local participant. When the local participant uses the [stopAudio](#stopaudio) method to locally mute a selected remote participant who does not use a camera, the local participant receives the streamRemoved event.

---

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

---

### paused

• **paused**: `Object` = `"EVENT_VIDEOPRESENTATION_PAUSED"`

Emitted when a video presentation is paused.

---

### played

• **played**: `Object` = `"EVENT_VIDEOPRESENTATION_PLAYED"`

Emitted when a video presentation is resumed.

---

### sought

• **sought**: `Object` = `"EVENT_VIDEOPRESENTATION_SOUGHT"`

Emitted when a video presentation is sought.

---

### started

• **started**: `Object` = `"EVENT_VIDEOPRESENTATION_STARTED"`

Emitted when a video presentation is started.

## Type aliases

### AudioTrack

Ƭ **AudioTrack**: `any`

The AudioTrack type gathers audio tracks available in a stream.

---

### MediaStream

Ƭ **MediaStream**: `Object`

The MediaStream type gathers information about media streams.

#### Type declaration

| Name          | Type                                                      | Description                               |
| :------------ | :-------------------------------------------------------- | :---------------------------------------- |
| `audioTracks` | [`AudioTrack`](internal.md#audiotrack)[]                  | The audio tracks available in the stream. |
| `id`          | `String`                                                  | The media stream identifier.              |
| `label`       | `String`                                                  | The media stream label.                   |
| `type`        | [`MediaStreamType`](../enums/internal.MediaStreamType.md) | The media stream type.                    |
| `videoTracks` | [`VideoTrack`](internal.md#videotrack)[]                  | The video tracks available in the stream. |

---

### UnsubscribeFunction

Ƭ **UnsubscribeFunction**: () => `void`

#### Type declaration

▸ (): `void`

The UnsubscribeFunction unsubscribes from event listeners.

##### Returns

`void`

---

### VideoTrack

Ƭ **VideoTrack**: `any`

The VideoTrack type gathers video tracks available in a stream.

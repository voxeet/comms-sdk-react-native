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
- [RTCStatsType](../enums/internal.RTCStatsType.md)
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
- [SpatialDirection](../interfaces/internal.SpatialDirection.md)
- [SpatialPosition](../interfaces/internal.SpatialPosition.md)
- [SpatialScale](../interfaces/internal.SpatialScale.md)
- [StreamChangedEventType](../interfaces/internal.StreamChangedEventType.md)
- [User](../interfaces/internal.User.md)
- [VideoPresentation](../interfaces/internal.VideoPresentation.md)
- [VideoPresentationEventType](../interfaces/internal.VideoPresentationEventType.md)

### Type aliases

- [AudioTrack](internal.md#audiotrack)
- [MediaStream](internal.md#mediastream)
- [RefreshAccessTokenInBackgroundType](internal.md#refreshaccesstokeninbackgroundtype)
- [RefreshAccessTokenType](internal.md#refreshaccesstokentype)
- [UnsubscribeFunction](internal.md#unsubscribefunction)
- [VideoTrack](internal.md#videotrack)

## Enumeration members

### FilePresentationStarted

• **FilePresentationStarted**: `Object` = `"EVENT_FILEPRESENTATION_STARTED"`

Emitted when the presenter started the file presentation.

___

### FilePresentationStopped

• **FilePresentationStopped**: `Object` = `"EVENT_FILEPRESENTATION_STOPPED"`

Emitted when the presenter ended the file presentation.

___

### FilePresentationUpdated

• **FilePresentationUpdated**: `Object` = `"EVENT_FILEPRESENTATION_UPDATED"`

Emitted when the presenter changed the displayed page of the shared file.

___

### ParticipantAdded

• **ParticipantAdded**: `Object` = `"EVENT_CONFERENCE_PARTICIPANT_ADDED"`

Emitted when a new participant is invited to a conference or joins a conference.

___

### ParticipantUpdated

• **ParticipantUpdated**: `Object` = `"EVENT_CONFERENCE_PARTICIPANT_UPDATED"`

Emitted when a participant changes ConferenceParticipantStatus.

___

### StreamAdded

• **StreamAdded**: `Object` = `"EVENT_CONFERENCE_STREAM_ADDED"`

Emitted when the SDK adds a new stream to a conference participant.

___

### StreamRemoved

• **StreamRemoved**: `Object` = `"EVENT_CONFERENCE_STREAM_REMOVED"`

Emitted when the SDK removes a stream from a conference participant.

___

### StreamUpdated

• **StreamUpdated**: `Object` = `"EVENT_CONFERENCE_STREAM_UPDATED"`

Emitted when a conference participant who is connected to the audio and video stream changes the stream by enabling a microphone while using a camera or by enabling a camera while using a microphone.

___

### paused

• **paused**: `Object` = `"EVENT_VIDEOPRESENTATION_PAUSED"`

Emitted when a video presentation is paused.

___

### played

• **played**: `Object` = `"EVENT_VIDEOPRESENTATION_PLAYED"`

Emitted when a video presentation is resumed.

___

### sought

• **sought**: `Object` = `"EVENT_VIDEOPRESENTATION_SOUGHT"`

Emitted when a video presentation is sought.

___

### started

• **started**: `Object` = `"EVENT_VIDEOPRESENTATION_STARTED"`

Emitted when a video presentation is started.

## Type aliases

### AudioTrack

Ƭ **AudioTrack**: `any`

___

### MediaStream

Ƭ **MediaStream**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `audioTracks` | [`AudioTrack`](internal.md#audiotrack)[] | The audio tracks available in the stream. |
| `id` | `String` | The media stream identifier. |
| `label` | `String` | The media stream label. |
| `type` | [`MediaStreamType`](../enums/internal.MediaStreamType.md) | The media stream type. |
| `videoTracks` | [`VideoTrack`](internal.md#videotrack)[] | The video tracks available in the stream. |

___

### RefreshAccessTokenInBackgroundType

Ƭ **RefreshAccessTokenInBackgroundType**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

___

### RefreshAccessTokenType

Ƭ **RefreshAccessTokenType**: () => `Promise`<`string`\>

#### Type declaration

▸ (): `Promise`<`string`\>

##### Returns

`Promise`<`string`\>

___

### UnsubscribeFunction

Ƭ **UnsubscribeFunction**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

___

### VideoTrack

Ƭ **VideoTrack**: `any`

# Interface: RecordingStatusUpdatedEventType

[internal](../modules/internal.md).RecordingStatusUpdatedEventType

The RecordingStatusUpdated interface gathers information about the received invitation.

## Table of contents

### Properties

- [recordingStatus](internal.RecordingStatusUpdatedEventType.md#recordingstatus)
- [conferenceId](internal.RecordingStatusUpdatedEventType.md#conferenceid)
- [participantId](internal.RecordingStatusUpdatedEventType.md#participantid)
- [timestamp](internal.RecordingStatusUpdatedEventType.md#timestamp)

## Properties

### recordingStatus

• **recordingStatus**: [`RecordingStatus`](../enums/internal.RecordingStatus.md)

The recording status.

___

### conferenceId

• **conferenceId**: `string`

The unique identifier of the conference.

___

### participantId

• **participantId**: `string`

The unique identifier of the participant who changed the recording status.

___

### timestamp

• **timestamp**: `number`

The timestamp that informs when the recording status changed.

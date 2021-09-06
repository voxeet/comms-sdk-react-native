[@dolbyio/react-native-iapi-sdk](../README.md) / [Exports](../modules.md) / [events/ConferenceStatusUpdatedEvent](../modules/events_ConferenceStatusUpdatedEvent.md) / ConferenceStatusUpdatedEvent

# Interface: ConferenceStatusUpdatedEvent

[events/ConferenceStatusUpdatedEvent](../modules/events_ConferenceStatusUpdatedEvent.md).ConferenceStatusUpdatedEvent

conferenceId and conferenceAlias can be empty on iOS if the status is LEFT (null or length = 0)
This is because the SDK is not currently handling sending conference information in the event

## Table of contents

### Properties

- [conferenceAlias](events_ConferenceStatusUpdatedEvent.ConferenceStatusUpdatedEvent.md#conferencealias)
- [conferenceId](events_ConferenceStatusUpdatedEvent.ConferenceStatusUpdatedEvent.md#conferenceid)
- [status](events_ConferenceStatusUpdatedEvent.ConferenceStatusUpdatedEvent.md#status)

## Properties

### conferenceAlias

• `Optional` **conferenceAlias**: `string`

___

### conferenceId

• `Optional` **conferenceId**: `string`

___

### status

• **status**: [`ConferenceStatus`](../enums/services_conference_ConferenceStatus.ConferenceStatus.md)

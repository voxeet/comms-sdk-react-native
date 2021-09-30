[@dolbyio/react-native-iapi-sdk](../README.md) / [Exports](../modules.md) / [%3Cinternal%3E](../modules/_internal_.md) / ConferenceJoinOptions

# Interface: ConferenceJoinOptions

[<internal>](../modules/_internal_.md).ConferenceJoinOptions

## Table of contents

### Properties

- [maxVideoForwarding](_internal_.ConferenceJoinOptions.md#maxvideoforwarding)
- [user](_internal_.ConferenceJoinOptions.md#user)

## Properties

### maxVideoForwarding

• `Optional` **maxVideoForwarding**: `number`

Sets the maximum number of video streams that may be transmitted to the joining participant. The valid parameter's values are between 0 and 25 for desktop browsers and between 0 and 4 for mobile browsers. In the case of providing a value smaller than 0 or greater than the valid values, SDK triggers the VideoForwardingError. If the parameter value is not specified, the SDK automatically sets the maximum possible value: 25 for desktop browsers and 4 for mobile browsers.

___

### user

• `Optional` **user**: [`JoinUserInfo`](_internal_.JoinUserInfo.md)

Information about the joining user

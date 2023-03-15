# Enumeration: SpatialAudioStyle

[internal](../modules/internal.md).SpatialAudioStyle

The SpatialAudioStyle enum defines how the spatial location is communicated between SDK and the Dolby.io server. The style can be defined during a conference creation, although its value for each participant depends on the participant's spatial audio setting. The shared spatial audio style is only available for participants who joined a conference with spatial audio enabled. Setting the spatial audio style is supported only on SDK 3.6 and later. The earlier SDK versions support only the individual mode and do not allow participants to join conferences created with the spatial audio style set to shared. The following table lists the possible spatial audio style settings for the local participant:

| Create: SpatialAudioStyle | Join: SpatialAudio | Result                            |
|---------------------------|--------------------|-----------------------------------|
| Individual                | True               | Success                           |
| Individual                | False              | Success                           |
| Shared                    | True               | Success only on SDK 3.6 and later |
| Shared                    | False              | Rejected                          |
| Disabled                  | True               | Rejected                          |
| Disabled                  | False              | Success                           |

## Enumeration Members

### INDIVIDUAL

• **INDIVIDUAL** = ``"INDIVIDUAL"``

Sets the spatial location that is based on the spatial scene, local participant's position, and remote participants'
positions. This allows a client to control the position using the local, self-contained logic. However, the client has to
communicate a large set of requests constantly to the server, which increases network traffic, log subsystem
pressure, and complexity of the client-side application. This option is selected by default. We recommend this mode
for A/V congruence scenarios in video conferencing and similar applications.

___

### SHARED

• **SHARED** = ``"SHARED"``

Sets the spatial location that is based on the spatial scene and the local participant's position, while the
relative positions among participants are calculated by the Dolby.io server. This way, the spatial scene is
shared by all participants, so that each client can set a position and participate in the shared scene. This
approach simplifies communication between the client and the server and decreases network traffic. We
recommend this mode for virtual space scenarios, such as 2D or 3D games, trade shows, virtual museums, water cooler scenarios, etc.

___

### DISABLED

• **DISABLED** = ``"DISABLED"``

Disables spatial audio in a conference.

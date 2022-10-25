# Enumeration: AudioCaptureMode

[internal](../modules/internal.md).AudioCaptureMode

The AudioCaptureMode model allows enabling and disabling audio processing for the local participant.

By default, the Dolby Voice audio processing algorithm is enabled in Dolby Voice conferences to improve voice communication. However, audio processing lowers the quality of non-voice audio. To send non-voice audio, such as music, disable audio processing by using the Unprocessed mode.

This model is available in SDK 3.7 and later.

## Table of contents

### Enumeration members

- [Standard](internal.AudioCaptureMode.md#standard)
- [Unprocessed](internal.AudioCaptureMode.md#unprocessed)

## Enumeration members

### Standard

• **Standard** = `"STANDARD"`

Enables audio processing to improve voice quality.

___

### Unprocessed

• **Unprocessed** = `"UNPROCESSED"`

Disables audio processing to allow transmitting non-voice audio to a conference.

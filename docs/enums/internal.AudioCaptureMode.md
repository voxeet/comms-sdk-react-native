# Enumeration: AudioCaptureMode

[internal](../modules/internal.md).AudioCaptureMode

The AudioCaptureMode model allows selecting the preferred mode for capturing the local participant's audio.

This model is available in SDK 3.7 and later.

## Table of contents

### Enumeration Members

- [Standard](internal.AudioCaptureMode.md#standard)
- [Unprocessed](internal.AudioCaptureMode.md#unprocessed)

## Enumeration Members

### Standard

• **Standard** = ``"STANDARD"``

The default mode aimed at enhancing speech to create a conversation-focused conference environment. This mode optimizes captured audio for speech by aggressively removing non-speech content, such as background noise. The mode is supported in SDK 3.7 and later.

___

### Unprocessed

• **Unprocessed** = ``"UNPROCESSED"``

Disables audio processing to allow transmitting non-voice audio to a conference. The mode is supported in SDK 3.7 and later.

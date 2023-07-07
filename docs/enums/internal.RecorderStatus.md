# Enumeration: RecorderStatus

[internal](../modules/internal.md).RecorderStatus

The RecorderStatus model gathers all possible statuses of audio samples recording for audio preview.

This model is available in SDK 3.10 and later.

## Table of contents

### Enumeration Members

- [NoRecordingAvailable](internal.RecorderStatus.md#norecordingavailable)
- [RecordingAvailable](internal.RecorderStatus.md#recordingavailable)
- [Recording](internal.RecorderStatus.md#recording)
- [Playing](internal.RecorderStatus.md#playing)
- [Released](internal.RecorderStatus.md#released)

## Enumeration Members

### NoRecordingAvailable

• **NoRecordingAvailable** = ``0``

There is no recording available.

___

### RecordingAvailable

• **RecordingAvailable** = ``1``

The recording is available.

___

### Recording

• **Recording** = ``2``

Recording is in progress.

___

### Playing

• **Playing** = ``3``

The recording is played.

___

### Released

• **Released** = ``4``

The audio session configuration is restarted; there are no recording in the memory.

# Interface: AudioCaptureModeOptions

[internal](../modules/internal.md).AudioCaptureModeOptions

The AudioCaptureModeOptions model allows selecting the preferred audio capture mode and additional options for the selected mode.

This model is available in SDK 3.7 and later.

## Table of contents

### Properties

- [mode](internal.AudioCaptureModeOptions.md#mode)
- [noiseReduction](internal.AudioCaptureModeOptions.md#noisereduction)
- [voiceFont](internal.AudioCaptureModeOptions.md#voicefont)

## Properties

### mode

• **mode**: [`AudioCaptureMode`](../enums/internal.AudioCaptureMode.md)

The preferred audio mode that allows enabling and disabling audio processing.

___

### noiseReduction

• `Optional` **noiseReduction**: [`NoiseReductionLevel`](../enums/internal.NoiseReductionLevel.md)

The selected noise reduction level.

___

### voiceFont

• `Optional` **voiceFont**: [`VoiceFont`](../enums/internal.VoiceFont.md)

The preferred voice modification effect that you can use to change the local participant's voice in real time.

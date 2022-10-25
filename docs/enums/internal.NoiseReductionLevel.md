# Enumeration: NoiseReductionLevel

[internal](../modules/internal.md).NoiseReductionLevel

The NoiseReductionLevel model allows selecting the preferred level of noise reduction.

This model is available in SDK 3.7 and later.

## Table of contents

### Enumeration members

- [High](internal.NoiseReductionLevel.md#high)
- [Low](internal.NoiseReductionLevel.md#low)

## Enumeration members

### High

• **High** = `"HIGH"`

Removes all background sounds to improve voice quality. Use this mode if you want to send only voice to a conference.

___

### Low

• **Low** = `"LOW"`

Removes stationary background sounds, such as the sound of a computer fan, air conditioning, or microphone hum, from audio transmitted to a conference. In this mode, non-stationary sounds are transmitted to give participants full context of other participants' environments and create a more realistic audio experience. If you want to send only voice to a conference, use the High level.

# Interface: SpatialScale

[internal](../modules/internal.md).SpatialScale

The SpatialScale model defines how to convert units from the application's coordinate system (pixels or centimeters) into meters used by the spatial audio coordinate system. For example, let's assume that SpatialScale is set to (100,100,100), which indicates that 100 of the applications units (cm) map to 1 meter for the audio coordinates. If the listener's location is (0,0,0)cm and a remote participant's location is (200,200,200)cm, the listener has an impression of hearing the remote participant from the (2,2,2)m location.

**Note**: The scale must have a value greater than zero. The default is (1,1,1).

## Table of contents

### Properties

- [x](internal.SpatialScale.md#x)
- [y](internal.SpatialScale.md#y)
- [z](internal.SpatialScale.md#z)

## Properties

### x

• **x**: `number`

The x component of the SpatialScale vector.

___

### y

• **y**: `number`

The y component of the SpatialScale vector.

___

### z

• **z**: `number`

The z component of the SpatialScale vector.

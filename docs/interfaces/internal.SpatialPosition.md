# Interface: SpatialPosition

[internal](../modules/internal.md).SpatialPosition

The SpatialPosition model represents a participant's audio position. The position is defined using Cartesian coordinates.

You can define the direction of each axis in the coordinate system using the [setSpatialEnvironment](doc:rn-client-sdk-references-conferenceservice#setspatialenvironment) method. By default, the environment consists of the following axes:

- X-axis: Extends positive to the right
- Y-axis: Extends positive upwards
- Z-axis: Extends positive forwards

The [setSpatialEnvironment](doc:rn-client-sdk-references-conferenceservice#setspatialenvironment) method allows the application to choose the meaning of each axis and match the usage of the application.

## Table of contents

### Properties

- [x](internal.SpatialPosition.md#x)
- [y](internal.SpatialPosition.md#y)
- [z](internal.SpatialPosition.md#z)

## Properties

### x

• **x**: `number`

The x-coordinate of a new audio location.

___

### y

• **y**: `number`

The y-coordinate of a new audio location.

___

### z

• **z**: `number`

The z-coordinate of a new audio location.

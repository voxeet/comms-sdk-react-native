# Interface: SpatialDirection

[internal](../modules/internal.md).SpatialDirection

The SpatialDirection model defines the direction a participant is facing. The model is specified as a set of three Euler rotations about the corresponding axis. The following properties define a rotation about the specified positive axis:

- `x`: A rotation about the x-axis
- `y`: A rotation about the y-axis
- `z`: A rotation about the z-axis

[block:html]
{
  "html": "<div class=\"grid-container\">\n<div class=\"video-1\" >\n <p><b>Yaw:</b> A rotation about the up axis, where the default environment is the y rotation.</p>\n<video controls width=\"250\">\n\n <source src=\"https://s3.us-west-1.amazonaws.com/static.dolby.link/videos/readme/communications/spatial/08_SpatialDirectionYaw_v03_220131.mp4\"\n type=\"video/mp4\">\n\n Sorry, your browser doesn't support embedded videos.\n</video>\n</div>\n\n<div class=\"video-2\">\n <p><b>Pitch:</b> A rotation about the right axis, where the default environment is the x rotation.</p>\n<video controls width=\"250\">\n\n <source src=\"https://s3.us-west-1.amazonaws.com/static.dolby.link/videos/readme/communications/spatial/09_SpatialDirectionPitch_v03_220131.mp4\"\n type=\"video/mp4\">\n\n Sorry, your browser doesn't support embedded videos.\n</video>\n</div>\n\n<div class=\"video-3\">\n <p><b>Roll:</b> A rotation about the forward axis, where the default environment is the z rotation.</p>\n<video controls width=\"250\">\n\n <source src=\"https://s3.us-west-1.amazonaws.com/static.dolby.link/videos/readme/communications/spatial/10_SpatialDirectionRoll_v03_220131.mp4\"\n type=\"video/mp4\">\n\n Sorry, your browser doesn't support embedded videos.\n</video>\n \n</div>\n</div>\n\n<style>\n .grid-container {\n display: grid; \n \n }\n \n .grid-container {\ndisplay: grid;\ngrid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\ngrid-column-gap: 10px;\ngrid-row-gap: 50px;\n}\n \n \n</style>"
}
[/block]

When using custom environment directions set in [setSpatialEnvironment](doc:rn-client-sdk-references-conferenceservice#setspatialenvironment), the rotation is defined to always rotate about the relevant axis according to the left handed curl rule. In the animations above you can see, for the y-axis rotation, if you curl your left hand up around with your thumb pointing down the +y axis, the direction the participant will rotate is in the direction the fingers are curling around the given axis. You can see the rotation arrows in those reference animations which correspond to positive rotation direction are pointing the same direction as the fingers of the curled left hand.

When a direction contains rotations around more than one axis, the rotations are applied in a defined order: yaw, pitch, and then roll. With the standard environment, this corresponds to y, x, and then z. When using custom environment directions, the directions are always in the order of yaw/pitch/roll, but which (x,y,z) axis those correspond to is different.

## Table of contents

### Properties

- [x](internal.SpatialDirection.md#x)
- [y](internal.SpatialDirection.md#y)
- [z](internal.SpatialDirection.md#z)

## Properties

### x

• **x**: `number`

The Euler rotation about the x-axis, in degrees.

___

### y

• **y**: `number`

The Euler rotation about the y-axis, in degrees.

___

### z

• **z**: `number`

The Euler rotation about the z-axis, in degrees.

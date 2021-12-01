# Enumeration: ConferenceStatus

[internal](../modules/internal.md).ConferenceStatus

## Table of contents

### Enumeration members

- [CREATED](internal.ConferenceStatus.md#created)
- [CREATING](internal.ConferenceStatus.md#creating)
- [DEFAULT](internal.ConferenceStatus.md#default)
- [DESTROYED](internal.ConferenceStatus.md#destroyed)
- [ENDED](internal.ConferenceStatus.md#ended)
- [ERROR](internal.ConferenceStatus.md#error)
- [FIRST_PARTICIPANT](internal.ConferenceStatus.md#first_participant)
- [JOINED](internal.ConferenceStatus.md#joined)
- [JOINING](internal.ConferenceStatus.md#joining)
- [LEAVING](internal.ConferenceStatus.md#leaving)
- [LEFT](internal.ConferenceStatus.md#left)
- [NO_MORE_PARTICIPANT](internal.ConferenceStatus.md#no_more_participant)

## Enumeration members

### CREATED

• **CREATED** = `"CREATED"`

Informs that a new conference is created.

___

### CREATING

• **CREATING** = `"CREATING"`

Informs that the conference is creating

___

### DEFAULT

• **DEFAULT** = `"DEFAULT"`

Default status

___

### DESTROYED

• **DESTROYED** = `"DESTROYED"`

Informs that the conference is destroyed. This status may be triggered by the following situations:

All conference participants left the conference
The time to live or the conference time limit elapsed
The conference creator used the Terminate REST API to terminate an ongoing conference

___

### ENDED

• **ENDED** = `"ENDED"`

Informs that a conference is ended.

___

### ERROR

• **ERROR** = `"ERROR"`

Informs that an error occurred during a conference.

___

### FIRST\_PARTICIPANT

• **FIRST\_PARTICIPANT** = `"FIRST_PARTICIPANT"`

**`deprecated`**

___

### JOINED

• **JOINED** = `"JOINED"`

Informs that the local participant successfully joined a conference.

___

### JOINING

• **JOINING** = `"JOINING"`

Informs that the local participant is joining a conference.

___

### LEAVING

• **LEAVING** = `"LEAVING"`

Informs that the local participant is leaving a conference.

___

### LEFT

• **LEFT** = `"LEFT"`

Informs that the local participant successfully left a conference.

___

### NO\_MORE\_PARTICIPANT

• **NO\_MORE\_PARTICIPANT** = `"NO_MORE_PARTICIPANT"`

**`deprecated`**

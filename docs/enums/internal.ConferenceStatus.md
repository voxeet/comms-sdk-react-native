# Enumeration: ConferenceStatus

[internal](../modules/internal.md).ConferenceStatus

The ConferenceStatus enum gathers the possible conference statuses.

## Table of contents

### Enumeration members

- [DEFAULT](internal.ConferenceStatus.md#default)
- [CREATING](internal.ConferenceStatus.md#creating)
- [CREATED](internal.ConferenceStatus.md#created)
- [JOINING](internal.ConferenceStatus.md#joining)
- [JOINED](internal.ConferenceStatus.md#joined)
- [LEAVING](internal.ConferenceStatus.md#leaving)
- [LEFT](internal.ConferenceStatus.md#left)
- [ERROR](internal.ConferenceStatus.md#error)
- [DESTROYED](internal.ConferenceStatus.md#destroyed)
- [ENDED](internal.ConferenceStatus.md#ended)

## Enumeration members

### DEFAULT

• **DEFAULT** = `"DEFAULT"`

The default conference status.

___

### CREATING

• **CREATING** = `"CREATING"`

The SDK is creating a conference.

___

### CREATED

• **CREATED** = `"CREATED"`

A new conference is created.

___

### JOINING

• **JOINING** = `"JOINING"`

The local participant is joining a conference.

___

### JOINED

• **JOINED** = `"JOINED"`

The local participant successfully joined a conference.

___

### LEAVING

• **LEAVING** = `"LEAVING"`

The local participant is leaving a conference.

___

### LEFT

• **LEFT** = `"LEFT"`

The local participant successfully left a conference.

___

### ERROR

• **ERROR** = `"ERROR"`

An error occurred during a conference.

___

### DESTROYED

• **DESTROYED** = `"DESTROYED"`

Informs that the conference is destroyed. This status may be triggered by the following situations:
- All conference participants left a conference
- The time to live or the conference time limit elapsed
- A conference creator used the Terminate REST API to terminate an ongoing conference

___

### ENDED

• **ENDED** = `"ENDED"`

A conference is ended.

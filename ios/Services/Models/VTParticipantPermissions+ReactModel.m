#import "VTParticipantPermissions+ReactModel.h"
#import "VTParticipant+ReactModel.h"
#import "VTConference+ReactModel.h"

static NSString * const keyParticipant = @"participant";
static NSString * const keyPermissions = @"permissions";

@interface NSNumber (ConferencePermission)

- (NSString * _Nonnull)asConferencePermission;

@end

@implementation VTParticipantPermissions (ReactModel)

+ (NSArray<VTParticipantPermissions *> * _Nonnull)permissionsWithArray:(NSArray<NSDictionary *> * _Nonnull)participantPermissions
                                                            conference:(VTConference * _Nonnull)conference {
    NSMutableArray *participantPermissionsList = [NSMutableArray new];
    for(NSDictionary* participantPermissionsObject in participantPermissions) {
        VTParticipant* participantObject = [conference findParticipant:[participantPermissionsObject participant]];
        NSArray<NSNumber *> *permissionsObject = [participantPermissionsObject permissions];
        if(participantObject != nil && permissionsObject != nil) {
            [participantPermissionsList addObject:[[VTParticipantPermissions alloc] initWithParticipant:participantObject
                                                                                        withPermissions:permissionsObject]];
        }
    }
    return participantPermissionsList;
}

- (NSDictionary * _Nonnull)reactDescription {
    return @{
        keyParticipant: [self.participant reactDescription],
        keyPermissions: [self permissionsReactDescription],
    };
}

- (NSArray * _Nonnull)permissionsReactDescription {
    NSMutableArray *stringPermissions = [NSMutableArray new];
    
    for(NSNumber *permissionNumber in self.permissions) {
        [stringPermissions addObject:[permissionNumber asConferencePermission]];
    }
    return stringPermissions;
}

@end

@implementation NSNumber (ConferencePermission)

- (NSString * _Nonnull)asConferencePermission {
    switch ((VTConferencePermission)self.intValue) {
        case VTConferencePermissionInvite:
            return @"INVITE";
        case VTConferencePermissionKick:
            return @"KICK";
        case VTConferencePermissionUpdatePermissions:
            return @"UPDATE_PERMISSIONS";
        case VTConferencePermissionJoin:
            return @"JOIN";
        case VTConferencePermissionSendAudio:
            return @"SEND_AUDIO";
        case VTConferencePermissionSendVideo:
            return @"SEND_VIDEO";
        case VTConferencePermissionShareScreen:
            return @"SHARE_SCREEN";
        case VTConferencePermissionShareVideo:
            return @"SHARE_VIDEO";
        case VTConferencePermissionShareFile:
            return @"SHARE_FILE";
        case VTConferencePermissionSendMessage:
            return @"SEND_MESSAGE";
        case VTConferencePermissionRecord:
            return @"RECORD";
        case VTConferencePermissionStream:
            return @"STREAM";
        default:
            return @"UNKNOWN";
    }
}

@end

@implementation NSDictionary (ParticipantPermissions)

- (NSDictionary * _Nullable)participant {
    return self[keyParticipant];
}

- (NSArray * _Nullable)permissions {
    return self[keyPermissions];
}

@end

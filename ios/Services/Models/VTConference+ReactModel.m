#import "VTConference+ReactModel.h"
#import "VTParticipant+ReactModel.h"
#import "VTConferenceParameters+ReactModel.h"
#import "NSObject+Utils.h"
#import "NSDictionary+Utils.h"

static NSString * const keyId = @"id";
static NSString * const keyAlias = @"alias";
static NSString * const keyIsNew = @"isNew";
static NSString * const keyParticipants = @"participants";
static NSString * const keyParams = @"params";
static NSString * const keyStatus = @"status";
static NSString * const keyPinCode = @"pinCode";

@implementation VTConference (ReactModel)

- (NSDictionary * _Nonnull)reactDescription {
    return @{
        keyId: self.id,
        keyAlias: self.alias,
        keyIsNew: @(self.isNew),
        keyParticipants: [self participantsDescription],
        keyParams: [self.params reactDescription],
        keyStatus: [self statusDescription],
        keyPinCode: self.pinCode ?: [NSNull null]
    };
}

- (NSArray<NSDictionary *> *)participantsDescription {
    NSMutableArray<NSDictionary *> *output = [NSMutableArray array];
    
    for (VTParticipant *participant in self.participants) {
        [output addObject:[participant reactDescription]];
    }
    
    return output;
}

- (NSString *)statusDescription {
    switch (self.status) {
        case VTConferenceStatusCreating:
            return @"CREATING";
        case VTConferenceStatusCreated:
            return @"CREATED";
        case VTConferenceStatusJoining:
            return @"JOINING";
        case VTConferenceStatusJoined:
            return @"JOINED";
        case VTConferenceStatusLeaving:
            return @"LEAVING";
        case VTConferenceStatusLeft:
            return @"LEFT";
        case VTConferenceStatusEnded:
            return @"ENDED";
        case VTConferenceStatusDestroyed:
            return @"DESTROYED";
        case VTConferenceStatusError:
            return @"ERROR";
    }
}

@end

#import "VTConference+ReactModel.h"
#import "VTParticipant+ReactModel.h"
#import "VTConferenceParameters+ReactModel.h"
#import "NSObject+Utils.h"
#import "NSDictionary+Utils.h"

#define KEY_ID @"id"
#define KEY_ALIAS @"alias"
#define KEY_IS_NEW @"isNew"
#define KEY_PARTICIPANTS @"participants"
#define KEY_PARAMS @"params"
#define KEY_STATUS @"status"
#define KEY_PIN_CODE @"pinCode"

@implementation VTConference (ReactModel)

- (NSDictionary *)reactTranslation {
    return @{
        @"id": self.id,
        @"alias": self.alias,
        @"isNew": @(self.isNew),
        @"participants": [self participantsTranslation],
        @"params": [self.params reactTranslation],
        @"status": [self statusTranslation],
        @"pinCode": self.pinCode ?: [NSNull null]
    };
}

- (NSArray<NSDictionary *> *)participantsTranslation {
    NSMutableArray<NSDictionary *> *output = [NSMutableArray array];
    
    for (VTParticipant *participant in self.participants) {
        [output addObject:[participant reactTranslation]];
    }
    
    return output;
}

- (NSString *)statusTranslation {
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

#import "VTParticipantInfo+ReactModel.h"
#import "NSObject+Utils.h"

#define KEY_EXTERNAL_ID @"externalId"
#define KEY_NAME @"name"
#define KEY_AVATAR_URL @"avatarUrl"

@implementation VTParticipantInfo (ReactModel)

+ (instancetype)createParticipantInfo:(NSDictionary *)dictionary {
    NSString *externalID = dictionary[KEY_EXTERNAL_ID];
    NSString *name = dictionary[KEY_NAME];
    NSString *avatarURL = dictionary[KEY_AVATAR_URL];
    
    VTParticipantInfo *participantInfo = [[VTParticipantInfo alloc]
                                          initWithExternalID:![externalID isEqual:[NSNull null]] ? externalID : nil
                                          name:![name isEqual:[NSNull null]] ? name : nil
                                          avatarURL: ![avatarURL isEqual:[NSNull null]] ? avatarURL : nil];
    return participantInfo;
}

- (NSDictionary *)reactTranslation {
    return @{
        KEY_EXTERNAL_ID: self.externalID ?: [NSNull null],
        KEY_NAME: self.name ?: [NSNull null],
        KEY_AVATAR_URL: self.avatarURL ?: [NSNull null]
    };
}

@end

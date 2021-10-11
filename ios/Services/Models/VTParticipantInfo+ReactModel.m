#import "VTParticipantInfo+ReactModel.h"
#import "NSObject+Utils.h"

static NSString * const keyExternalId = @"externalId";
static NSString * const keyName = @"name";
static NSString * const keyAvatarUrl = @"avatarUrl";

@implementation VTParticipantInfo (ReactModel)

+ (instancetype _Nonnull)createWithDictionary:(NSDictionary * _Nonnull)dictionary {
    NSString *externalID = dictionary[keyExternalId];
    NSString *name = dictionary[keyName];
    NSString *avatarURL = dictionary[keyAvatarUrl];
    
    VTParticipantInfo *participantInfo = [[VTParticipantInfo alloc] initWithExternalID:![externalID isEqual:[NSNull null]] ? externalID : nil
                                                                                  name:![name isEqual:[NSNull null]] ? name : nil
                                                                             avatarURL: ![avatarURL isEqual:[NSNull null]] ? avatarURL : nil];
    return participantInfo;
}

+ (NSArray<VTParticipantInfo *> * _Nonnull)generateWithArray:(NSArray<NSDictionary *> * _Nonnull)array {
    NSMutableArray *result = [NSMutableArray new];
    for(NSDictionary *dictionary in array) {
        [result addObject:[self createWithDictionary:dictionary]];
    }
    return result;
}

- (NSDictionary * _Nonnull)reactDescription {
    return @{
        keyExternalId: self.externalID ?: [NSNull null],
        keyName: self.name ?: [NSNull null],
        keyAvatarUrl: self.avatarURL ?: [NSNull null]
    };
}

@end

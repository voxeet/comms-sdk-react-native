#import "VTJoinOptions+ReactModel.h"
#import "VTJoinOptionsConstraints+ReactModel.h"
#import "NSObject+Utils.h"

#define KEY_CONSTRAINTS @"constraints"
#define KEY_MAX_VIDEO_FORWARDING @"maxVideoForwarding"
#define KEY_CONFERENCE_ACCESS_TOKEN @"conferenceAccessToken"

@implementation VTJoinOptions (ReactModel)

+ (instancetype)createJoinOptions:(NSDictionary *)dictionary
{
    VTJoinOptions *joinOptions = [VTJoinOptions new];
    [joinOptions updateWithOptions:dictionary];
    return joinOptions;
}

- (NSDictionary *)reactTranslation {
    return @{
        KEY_CONSTRAINTS: [self.constraints reactTranslation],
        KEY_MAX_VIDEO_FORWARDING: self.maxVideoForwarding ?: [NSNull null],
        KEY_CONFERENCE_ACCESS_TOKEN: self.conferenceAccessToken ?: [NSNull null]
    };
}

- (void)updateWithOptions:(NSDictionary *)options {
    if(options == nil) {
        return;
    }

    [self setValue:options[KEY_MAX_VIDEO_FORWARDING] forKey:KEY_MAX_VIDEO_FORWARDING type:[NSNumber class]];
    [self setValue:options[KEY_CONFERENCE_ACCESS_TOKEN] forKey:KEY_CONFERENCE_ACCESS_TOKEN type:[NSString class]];
    [self setValue:[VTJoinOptionsConstraints createJoinOptionsConstraints:options[KEY_CONSTRAINTS]] forKey:KEY_CONSTRAINTS];
}

@end

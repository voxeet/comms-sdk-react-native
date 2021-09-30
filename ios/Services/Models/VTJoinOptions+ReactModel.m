#import "VTJoinOptions+ReactModel.h"
#import "VTJoinOptionsConstraints+ReactModel.h"
#import "NSObject+Utils.h"

static NSString * const keyConstraints = @"constraints";
static NSString * const keyMaxVideoForwarding = @"maxVideoForwarding";
static NSString * const keyConferenceAccessToken = @"conferenceAccessToken";

@implementation VTJoinOptions (ReactModel)

+ (instancetype _Nonnull)createWithDictionary:(NSDictionary * _Nonnull)dictionary
{
    VTJoinOptions *joinOptions = [VTJoinOptions new];
    [joinOptions updateWithOptions:dictionary];
    return joinOptions;
}

- (NSDictionary * _Nonnull)reactDescription {
    return @{
        keyConstraints: [self.constraints reactDescription],
        keyMaxVideoForwarding: self.maxVideoForwarding ?: [NSNull null],
        keyConferenceAccessToken: self.conferenceAccessToken ?: [NSNull null]
    };
}

- (void)updateWithOptions:(NSDictionary *)options {
    if(options == nil) {
        return;
    }

    [self setValue:options[keyMaxVideoForwarding] forKey:keyMaxVideoForwarding type:[NSNumber class]];
    [self setValue:options[keyConferenceAccessToken] forKey:keyConferenceAccessToken type:[NSString class]];
    [self setValue:[VTJoinOptionsConstraints createWithDictionary:options[keyConstraints]] forKey:keyConstraints];
}

@end

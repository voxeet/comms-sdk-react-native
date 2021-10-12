#import "VTReplayOptions+ReactModel.h"
#import "NSObject+Utils.h"
#import "NSDictionary+Utils.h"

static NSString * const keyConferenceAccessToken = @"conferenceAccessToken";
static NSString * const keyOffset = @"offset";

@implementation VTReplayOptions (ReactModel)

+ (instancetype _Nonnull)createWithDictionary:(NSDictionary * _Nonnull)dictionary {
    VTReplayOptions *replayOptions = [VTReplayOptions new];
    [replayOptions updateWithOptions:dictionary];
    return replayOptions;
}

- (NSDictionary * _Nonnull)reactDescription {
    return @{
        keyConferenceAccessToken: self.conferenceAccessToken ?: [NSNull null],
        keyOffset: @(self.offset)
    };
}

- (void)updateWithOptions:(NSDictionary * _Nonnull)options {
    [self setValue:[options conferenceAccessToken] forKey:keyConferenceAccessToken type:[NSString class]];
    if([options isNumberValueForKey:keyOffset]) {
        self.offset = [[options offset] integerValue];
    }
}

@end

@implementation NSDictionary (ReplayOptions)

- (NSString * _Nullable)conferenceAccessToken {
    return self[keyConferenceAccessToken];
}

- (NSNumber * _Nullable)offset {
    return self[keyOffset];
}

@end

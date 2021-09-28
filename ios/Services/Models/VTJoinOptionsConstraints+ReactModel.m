#import "VTJoinOptionsConstraints+ReactModel.h"
#import "NSDictionary+Utils.h"

static NSString * const keyAudio = @"audio";
static NSString * const keyVideo = @"video";

@implementation VTJoinOptionsConstraints (ReactModel)

+ (instancetype _Nonnull)createWithDictionary:(NSDictionary * _Nonnull)dictionary {
    VTJoinOptionsConstraints *constraints = [VTJoinOptionsConstraints new];
    [constraints updateWithConstraints:dictionary];
    return constraints;
}

- (NSDictionary * _Nonnull)reactDescription {
    return @{
        keyAudio: @(self.audio),
        keyVideo: @(self.video)
    };
}

- (void)updateWithConstraints: (NSDictionary * _Nullable)constrains {
    if(constrains == nil) {
        return;
    }
    
    if([constrains isNumberValueForKey:keyVideo]) {
        self.video = [(NSNumber *)constrains[keyVideo] boolValue];
    } else {
        self.video = VoxeetSDK.shared.conference.defaultVideo;
    }
    
    if([constrains isNumberValueForKey:keyAudio]) {
        self.audio = [(NSNumber *)constrains[keyAudio] boolValue];
    }
}

@end



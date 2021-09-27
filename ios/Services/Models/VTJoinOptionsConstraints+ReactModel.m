#import "VTJoinOptionsConstraints+ReactModel.h"
#import "NSDictionary+Utils.h"

#define KEY_AUDIO @"audio"
#define KEY_VIDEO @"video"

@implementation VTJoinOptionsConstraints (ReactModel)

+ (instancetype)createJoinOptionsConstraints:(NSDictionary *)dictionary {
    VTJoinOptionsConstraints *constraints = [VTJoinOptionsConstraints new];
    [constraints updateWithConstraints:dictionary];
    return constraints;
}

- (NSDictionary *)reactTranslation {
    return @{
        KEY_AUDIO: @(self.audio),
        KEY_VIDEO: @(self.video)
    };
}

- (void)updateWithConstraints: (NSDictionary *)constrains {
    if(constrains == nil) {
        return;
    }
    
    if([constrains isNumberValueForKey:KEY_VIDEO]) {
        self.video = [(NSNumber *)constrains[KEY_VIDEO] boolValue];
    } else {
        self.video = VoxeetSDK.shared.conference.defaultVideo;
    }
    
    if([constrains isNumberValueForKey:KEY_AUDIO]) {
        self.audio = [(NSNumber *)constrains[KEY_AUDIO] boolValue];
    }
}

@end



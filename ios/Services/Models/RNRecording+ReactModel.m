#import "RNRecording+ReactModel.h"

static NSString * const keyParticipantId = @"participantId";
static NSString * const keyStartTimestamp = @"startTimestamp";

@implementation RNRecording (ReactModel)

- (NSDictionary * _Nonnull)reactDescription {
    return @{
        keyParticipantId: self.participantId ?: [NSNull null],
        keyStartTimestamp: self.startTimestamp ?: [NSNull null]
    };
}

@end

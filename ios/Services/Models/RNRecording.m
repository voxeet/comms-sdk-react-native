#import "RNRecording.h"

@implementation RNRecording

- (instancetype)initWithParticipantId:(NSString * _Nullable)participantId startTimestamp:(NSNumber * _Nullable)startTimestamp {
    self = [super init];
    if (self) {
        self.participantId = participantId;
        self.startTimestamp = startTimestamp;
    }
    return self;
}

@end

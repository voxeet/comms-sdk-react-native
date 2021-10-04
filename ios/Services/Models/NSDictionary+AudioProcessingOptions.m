#import "NSDictionary+AudioProcessingOptions.h"

static NSString * const keySend = @"send";
static NSString * const keyAudioProcessing = @"audioProcessing";

@implementation NSDictionary (AudioProcessing)

- (NSNumber * _Nullable)audioProcessing {
    return self[keySend][keyAudioProcessing];
}

@end

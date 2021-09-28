#import "VTConferenceParameters+ReactModel.h"
#import "NSObject+Utils.h"

static NSString * const keyLiveRecording = @"liveRecording";
static NSString * const keyRtcpMode = @"rtcpMode";
static NSString * const keyStats = @"stats";
static NSString * const keyTtl = @"ttl";
static NSString * const keyVideoCodec = @"videoCodec";
static NSString * const keyDolbyVoice = @"dolbyVoice";

@implementation VTConferenceParameters (ReactModel)

+ (instancetype _Nonnull)createWithDictionary:(NSDictionary * _Nonnull)dictionary {
    VTConferenceParameters *conferenceParams = [VTConferenceParameters new];
    [conferenceParams updateWithParams:dictionary];
    return conferenceParams;
}

- (NSDictionary * _Nonnull)reactDescription {
    return @{
        keyLiveRecording: @(self.liveRecording),
        keyRtcpMode: self.rtcpMode ?: [NSNull null],
        keyStats: @(self.stats),
        keyTtl: self.ttl ?: [NSNull null],
        keyVideoCodec: self.videoCodec ?: [NSNull null],
        keyDolbyVoice: @(self.dolbyVoice),
    };
}

- (void)updateWithParams:(NSDictionary * _Nullable)params {
    if(params == nil) {
        return;
    }

    [self setValue:params[keyLiveRecording] forKey:keyLiveRecording type:[NSNumber class]];
    [self setValue:params[keyRtcpMode] forKey:keyRtcpMode type:[NSString class]];
    [self setValue:params[keyStats] forKey:keyStats type:[NSNumber class]];
    [self setValue:params[keyTtl] forKey:keyTtl type:[NSNumber class]];
    [self setValue:params[keyVideoCodec] forKey:keyVideoCodec type:[NSString class]];
    [self setValue:params[keyDolbyVoice] forKey:keyDolbyVoice type:[NSNumber class]];
}

@end

#import "VTConferenceParameters+ReactModel.h"
#import "NSObject+Utils.h"

#define KEY_LIVE_RECORDING @"liveRecording"
#define KEY_RTCP_MODE @"rtcpMode"
#define KEY_STATS @"stats"
#define KEY_TTL @"ttl"
#define KEY_VIDEO_CODEC @"videoCodec"
#define KEY_DOLBY_VOICE @"dolbyVoice"

@implementation VTConferenceParameters (ReactModel)

+ (instancetype)createConferenceParameters:(NSDictionary *)dictionary {
    VTConferenceParameters *conferenceParams = [VTConferenceParameters new];
    [conferenceParams updateWithParams:dictionary];
    return conferenceParams;
}

- (NSDictionary *)reactTranslation {
    return @{
        KEY_LIVE_RECORDING: @(self.liveRecording),
        KEY_RTCP_MODE: self.rtcpMode ?: [NSNull null],
        KEY_STATS: @(self.stats),
        KEY_TTL: self.ttl ?: [NSNull null],
        KEY_VIDEO_CODEC: self.videoCodec ?: [NSNull null],
        KEY_DOLBY_VOICE: @(self.dolbyVoice),
    };
}

- (void)updateWithParams:(NSDictionary *)params {
    if(params == nil) {
        return;
    }

    [self setValue:params[KEY_LIVE_RECORDING] forKey:KEY_LIVE_RECORDING type:[NSNumber class]];
    [self setValue:params[KEY_RTCP_MODE] forKey:KEY_RTCP_MODE type:[NSString class]];
    [self setValue:params[KEY_STATS] forKey:KEY_STATS type:[NSNumber class]];
    [self setValue:params[KEY_TTL] forKey:KEY_TTL type:[NSNumber class]];
    [self setValue:params[KEY_VIDEO_CODEC] forKey:KEY_VIDEO_CODEC type:[NSString class]];
    [self setValue:params[KEY_DOLBY_VOICE] forKey:KEY_DOLBY_VOICE type:[NSNumber class]];
}

@end

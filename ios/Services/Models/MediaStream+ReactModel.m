#import "MediaStream+ReactModel.h"

static NSString * const keyId = @"id";
static NSString * const keyType = @"type";
static NSString * const keyAudioTracks = @"audioTracks";
static NSString * const keyVideoTracks = @"videoTracks";

@implementation MediaStream (ReactModel)
    
- (NSDictionary * _Nonnull)reactDescription {
    return @{
        keyId: self.streamId,
        keyType: [self typeDescription],
        keyAudioTracks: [self audioTracksDescription],
        keyVideoTracks: [self videoTracksDescription]
    };
}

- (NSString *)typeDescription {
    switch (self.type) {
        case Camera:
            return @"CAMERA";
        case ScreenShare:
            return @"SCREEN_SHARE";
        case Custom:
            return @"CUSTOM";
    }
}

- (NSArray<NSString *> *)audioTracksDescription {
    NSMutableArray<NSString *> *output = [NSMutableArray array];
    
    for (AudioTrack *track in self.audioTracks) {
        [output addObject:track.trackId];
    }
    
    return output;
}

- (NSArray<NSString *> *)videoTracksDescription {
    NSMutableArray<NSString *> *output = [NSMutableArray array];
    
    for (VideoTrack *track in self.videoTracks) {
        [output addObject:track.trackId];
    }
    
    return output;
}

@end

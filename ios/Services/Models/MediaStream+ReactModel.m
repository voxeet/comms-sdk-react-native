#import "MediaStream+ReactModel.h"

@implementation MediaStream (ReactModel)
    
- (NSDictionary *)reactTranslation {
    return @{
        @"id": self.streamId,
        @"type": [self typeTranslation],
        @"audioTracks": [self audioTracksTranslation],
        @"videoTracks": [self videoTracksTranslation]
    };
}

- (NSString *)typeTranslation {
    switch (self.type) {
        case Camera:
            return @"CAMERA";
        case ScreenShare:
            return @"SCREEN_SHARE";
        case Custom:
            return @"CUSTOM";
    }
}

- (NSArray<NSString *> *)audioTracksTranslation {
    NSMutableArray<NSString *> *output = [NSMutableArray array];
    
    for (AudioTrack *track in self.audioTracks) {
        [output addObject:track.trackId];
    }
    
    return output;
}

- (NSArray<NSString *> *)videoTracksTranslation {
    NSMutableArray<NSString *> *output = [NSMutableArray array];
    
    for (VideoTrack *track in self.videoTracks) {
        [output addObject:track.trackId];
    }
    
    return output;
}

@end

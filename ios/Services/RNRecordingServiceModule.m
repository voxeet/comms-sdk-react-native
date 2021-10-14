#import "RNRecordingServiceModule.h"
#import "RNRecording+ReactModel.h"

@import VoxeetSDK;

static NSInteger const defaultFireInterval = 0;

@implementation RNRecordingServiceModule
{
    RNRecording * _Nullable _current;
}

RCT_EXPORT_MODULE(DolbyIoIAPIRecordingServiceModule)

RCT_EXPORT_METHOD(current:(RCTPromiseResolveBlock _Nonnull)resolve
                  rejecter:(RCTPromiseRejectBlock _Nonnull)reject)
{
    resolve([self.current reactDescription]);
}

RCT_EXPORT_METHOD(start:(RCTPromiseResolveBlock _Nonnull)resolve
                  rejecter:(RCTPromiseRejectBlock _Nonnull)reject)
{
    [VoxeetSDK.shared.recording setDelegate:self];
    [VoxeetSDK.shared.recording startWithFireInterval:defaultFireInterval
                                           completion:^(NSError *error) {
        if (error != nil) {
            reject(@"error", [error localizedDescription], error);
        } else {
            resolve(nil);
        }
    }];
}

RCT_EXPORT_METHOD(stop:(RCTPromiseResolveBlock _Nonnull)resolve
                  rejecter:(RCTPromiseRejectBlock _Nonnull)reject)
{
    [VoxeetSDK.shared.recording stopWithCompletion:^(NSError *error) {
        if (error != nil) {
            reject(@"error", [error localizedDescription], error);
        } else {
            resolve(nil);
        }
    }];
}

- (RNRecording * _Nullable)current {
    @synchronized (self) {
        return _current;
    }
}

- (void)setCurrent:(RNRecording * _Nullable)current {
    @synchronized (self) {
        _current = current;
    }
}

#pragma mark - VTRecordingDelegate

- (void)recordingStatusUpdatedWithStatus:(enum VTRecordingStatus)status
                             participant:(VTParticipant * _Nullable)participant
                          startTimestamp:(NSNumber * _Nullable)startTimestamp {
    switch (status) {
        case VTRecordingStatusRecording:
            self.current = [[RNRecording alloc] initWithParticipantId:participant.id
                                                       startTimestamp:startTimestamp];
            break;
        case VTRecordingStatusNotRecording:
            self.current = nil;
            break;
        default:
            break;
    }
}

@end

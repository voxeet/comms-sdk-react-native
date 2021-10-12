#import "RNRecordingServiceModule.h"

@import VoxeetSDK;

static NSInteger const defaultFireInterval = 0;

@implementation RNRecordingServiceModule

RCT_EXPORT_MODULE(DolbyIoIAPIRecordingServiceModule)

RCT_EXPORT_METHOD(start:(RCTPromiseResolveBlock _Nonnull)resolve
                  rejecter:(RCTPromiseRejectBlock _Nonnull)reject)
{
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

@end

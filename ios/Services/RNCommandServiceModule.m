#import "RNCommandServiceModule.h"

@import VoxeetSDK;

@implementation RNCommandServiceModule

RCT_EXPORT_MODULE(DolbyIoIAPICommandServiceModule)

RCT_EXPORT_METHOD(send:(NSString * _Nonnull)message
                  resolve:(RCTPromiseResolveBlock _Nonnull)resolve
                  rejecter:(RCTPromiseRejectBlock _Nonnull)reject)
{
    [VoxeetSDK.shared.command sendWithMessage:message
                                   completion:^(NSError *error) {
        if (error != nil) {
            reject(@"error", [error localizedDescription], error);
        } else {
            resolve(nil);
        }
    }];
}

@end

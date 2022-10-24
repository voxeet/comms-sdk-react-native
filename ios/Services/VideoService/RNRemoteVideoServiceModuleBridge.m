#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_REMAP_MODULE(CommsAPIRemoteVideoModule, RNRemoteVideoServiceModule, NSObject)

RCT_EXTERN_METHOD(start:(NSDictionary * _Nonnull)participant
                  resolver:(RCTPromiseResolveBlock _Nonnull)resolve
                  rejecter:(RCTPromiseRejectBlock _Nonnull)reject);

RCT_EXTERN_METHOD(stop:(NSDictionary * _Nonnull)participant
                  resolver:(RCTPromiseResolveBlock _Nonnull)resolve
                  rejecter:(RCTPromiseRejectBlock _Nonnull)reject);

@end

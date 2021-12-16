#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_REMAP_MODULE(CommsAPIRecordingServiceModule, RNRecordingServiceModule, NSObject)

RCT_EXTERN_METHOD(current:(RCTPromiseResolveBlock _Nonnull)resolve
				  rejecter:(RCTPromiseRejectBlock _Nonnull)reject);

RCT_EXTERN_METHOD(start:(RCTPromiseResolveBlock _Nonnull)resolve
				  rejecter:(RCTPromiseRejectBlock _Nonnull)reject);

RCT_EXTERN_METHOD(stop:(RCTPromiseResolveBlock _Nonnull)resolve
				  rejecter:(RCTPromiseRejectBlock _Nonnull)reject);

@end

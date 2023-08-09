#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_REMAP_MODULE(CommsAPIAudioPreviewModule, RNAudioPreviewServiceModule, NSObject)

RCT_EXTERN_METHOD(status:(RCTPromiseResolveBlock _Nonnull)resolve
				  rejecter:(RCTPromiseRejectBlock _Nonnull)reject);

RCT_EXTERN_METHOD(getCaptureMode:(RCTPromiseResolveBlock _Nonnull)resolve
				  rejecter:(RCTPromiseRejectBlock _Nonnull)reject);

RCT_EXTERN_METHOD(setCaptureMode:(NSDictionary * _Nonnull)options
				  resolver:(RCTPromiseResolveBlock _Nonnull)resolve
				  rejecter:(RCTPromiseRejectBlock _Nonnull)reject);

RCT_EXTERN_METHOD(play:(BOOL)loop
				  resolver:(RCTPromiseResolveBlock _Nonnull)resolve
				  rejecter:(RCTPromiseRejectBlock _Nonnull)reject);

RCT_EXTERN_METHOD(record:(NSNumber * _Nonnull)duration
				  resolver:(RCTPromiseResolveBlock _Nonnull)resolve
				  rejecter:(RCTPromiseRejectBlock _Nonnull)reject);

RCT_EXTERN_METHOD(stop:(RCTPromiseResolveBlock _Nonnull)resolve
				  rejecter:(RCTPromiseRejectBlock _Nonnull)reject);

RCT_EXTERN_METHOD(release:(RCTPromiseResolveBlock _Nonnull)resolve
				  rejecter:(RCTPromiseRejectBlock _Nonnull)reject);

@end

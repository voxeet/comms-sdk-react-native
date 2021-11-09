#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_REMAP_MODULE(DolbyIoIAPIMediaDeviceService, RNMediaDeviceServiceModule, NSObject)

RCT_EXTERN_METHOD(switchCamera:(RCTPromiseResolveBlock _Nonnull)resolve
				  rejecter:(RCTPromiseRejectBlock _Nonnull)reject);

RCT_EXTERN_METHOD(switchSpeaker:(RCTPromiseResolveBlock _Nonnull)resolve
				  rejecter:(RCTPromiseRejectBlock _Nonnull)reject);

RCT_EXTERN_METHOD(isFrontCamera:(RCTPromiseResolveBlock _Nonnull)resolve
				  rejecter:(RCTPromiseRejectBlock _Nonnull)reject);

RCT_EXTERN_METHOD(getComfortNoiseLevel:(RCTPromiseResolveBlock _Nonnull)resolve
				  rejecter:(RCTPromiseRejectBlock _Nonnull)reject);

RCT_EXTERN_METHOD(setComfortNoiseLevel:(NSString * _Nonnull)noiseLevel
				  resolver:(RCTPromiseResolveBlock _Nonnull)resolve
				  rejecter:(RCTPromiseRejectBlock _Nonnull)reject);

@end

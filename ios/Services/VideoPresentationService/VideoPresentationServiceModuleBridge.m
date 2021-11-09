#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_REMAP_MODULE(DolbyIoIAPIVideoPresentationService, RNVideoPresentationServiceModule, RCTEventEmitter)

RCT_EXTERN_METHOD(start:(NSString * _Nonnull)urlString
									resolver:(RCTPromiseResolveBlock _Nonnull)resolve
									rejecter:(RCTPromiseRejectBlock _Nonnull)reject);

RCT_EXTERN_METHOD(stop:(RCTPromiseResolveBlock _Nonnull)resolve
									rejecter:(RCTPromiseRejectBlock _Nonnull)reject);

RCT_EXTERN_METHOD(play:(RCTPromiseResolveBlock _Nonnull)resolve
									rejecter:(RCTPromiseRejectBlock _Nonnull)reject);

RCT_EXTERN_METHOD(pause:(NSNumber * _Nonnull)timestamp
									resolver:(RCTPromiseResolveBlock _Nonnull)resolve
									rejecter:(RCTPromiseRejectBlock _Nonnull)reject);

RCT_EXTERN_METHOD(seek:(NSNumber * _Nonnull)timestamp
									resolver:(RCTPromiseResolveBlock _Nonnull)resolve
									rejecter:(RCTPromiseRejectBlock _Nonnull)reject);

RCT_EXTERN_METHOD(current:(RCTPromiseResolveBlock _Nonnull)resolve
									rejecter:(RCTPromiseRejectBlock _Nonnull)reject);

RCT_EXTERN_METHOD(state:(RCTPromiseResolveBlock _Nonnull)resolve
									rejecter:(RCTPromiseRejectBlock _Nonnull)reject);

@end

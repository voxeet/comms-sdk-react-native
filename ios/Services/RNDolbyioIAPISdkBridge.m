#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_REMAP_MODULE(DolbyIoIAPIModule, RNDolbyioIAPISdk, NSObject)

RCT_EXTERN_METHOD(initialize:(NSString * _Nonnull)consumerKey
				  consumerSecret:(NSString * _Nonnull)consumerSecret
				  resolver:(RCTPromiseResolveBlock _Nonnull)resolve
				  rejecter:(RCTPromiseRejectBlock _Nonnull)reject);

RCT_EXTERN_METHOD(initializeToken:(NSString * _Nonnull)accessToken
				  resolver:(RCTPromiseResolveBlock _Nonnull)resolve
				  rejecter:(RCTPromiseRejectBlock _Nonnull)reject);

RCT_EXTERN_METHOD(onAccessTokenOk:(NSString * _Nonnull)accessToken
				  resolver:(RCTPromiseResolveBlock _Nonnull)resolve
				  rejecter:(RCTPromiseRejectBlock _Nonnull)reject);

RCT_EXTERN_METHOD(onAccessTokenKo:(NSString * _Nullable)error
				  resolver:(RCTPromiseResolveBlock _Nonnull)resolve
				  rejecter:(RCTPromiseRejectBlock _Nonnull)reject);

@end

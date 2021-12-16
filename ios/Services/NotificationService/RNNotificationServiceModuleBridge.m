#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_REMAP_MODULE(CommsAPINotificationServiceModule, RNNotificationServiceModule, NSObject)

RCT_EXTERN_METHOD(invite:(NSDictionary * _Nonnull)conference
				  participants:(NSArray<NSDictionary *> * _Nonnull)participants
				  resolver:(RCTPromiseResolveBlock _Nonnull)resolve
				  rejecter:(RCTPromiseRejectBlock _Nonnull)reject);

RCT_EXTERN_METHOD(decline:(NSDictionary * _Nonnull)conference
				  resolver:(RCTPromiseResolveBlock _Nonnull)resolve
				  rejecter:(RCTPromiseRejectBlock _Nonnull)reject);

@end

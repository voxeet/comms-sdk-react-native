#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_REMAP_MODULE(DolbyIoIAPIFilePresentationService, RNFilePresentationServiceModule, NSObject)

RCT_EXTERN_METHOD(convert:(NSDictionary * _Nonnull)file
				  resolver:(RCTPromiseResolveBlock _Nonnull)resolve
				  rejecter:(RCTPromiseRejectBlock _Nonnull)reject);

@end

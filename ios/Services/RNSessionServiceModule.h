#import <React/RCTBridgeModule.h>

@interface RNSessionServiceModule : NSObject <RCTBridgeModule>

/// Opens a new session.
///
/// \param userInfo user info
///
/// \param resolve returns on success
///
/// \param reject returns error on failure
///
- (void)open:(NSDictionary *)userInfo
     resolve:(RCTPromiseResolveBlock)resolve
    rejecter:(RCTPromiseRejectBlock)reject;

@end

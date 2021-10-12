#import <React/RCTBridgeModule.h>

@interface RNCommandServiceModule : NSObject <RCTBridgeModule>
///
/// Sends a message to all conference participants.
///
/// \param send Message to send
///
/// \param resolve returns on success
///
/// \param reject returns error on failure
///
- (void)send:(NSString * _Nonnull)message
     resolve:(RCTPromiseResolveBlock _Nonnull)resolve
    rejecter:(RCTPromiseRejectBlock _Nonnull)reject;

@end

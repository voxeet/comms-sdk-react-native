#import <React/RCTBridgeModule.h>

@interface RNSessionServiceModule : NSObject <RCTBridgeModule>
///
/// Opens a new session.
///
/// \param userInfo user info
///
/// \param resolve returns on success
///
/// \param reject returns error on failure
///
- (void)open:(NSDictionary * _Nonnull)userInfo
     resolve:(RCTPromiseResolveBlock _Nonnull)resolve
    rejecter:(RCTPromiseRejectBlock _Nonnull)reject;
///
/// Closes the current session.
/// Close a session is like a logout, it will stop the socket and stop sending VoIP push notification.
///
/// \param resolve returns on success
///
/// \param reject returns error on failure
///
- (void)close:(RCTPromiseResolveBlock _Nonnull)resolve
     rejecter:(RCTPromiseRejectBlock _Nonnull)reject;

@end

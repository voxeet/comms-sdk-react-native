#import <React/RCTBridgeModule.h>

@interface RNNotificationServiceModule : NSObject <RCTBridgeModule>
///
/// Notifies conference participants about a conference invitation.
///
/// \param conference The conference object.
///
/// \param participants Information about the invited application users.
///
/// \param resolve returns on success
///
/// \param reject returns error on failure
///
- (void)invite:(NSDictionary * _Nonnull)conference
  participants:(NSArray<NSDictionary *> * _Nonnull)participants
       resolve:(RCTPromiseResolveBlock _Nonnull)resolve
      rejecter:(RCTPromiseRejectBlock _Nonnull)reject;
///
/// Declines the conference invitation.
///
/// \param conference The conference object.
///
/// \param resolve returns on success
///
/// \param reject returns error on failure
///
- (void)decline:(NSDictionary * _Nonnull)conference
        resolve:(RCTPromiseResolveBlock _Nonnull)resolve
       rejecter:(RCTPromiseRejectBlock _Nonnull)reject;

@end

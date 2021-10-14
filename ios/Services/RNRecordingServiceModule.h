#import <React/RCTBridgeModule.h>

@import VoxeetSDK;

@interface RNRecordingServiceModule : NSObject <RCTBridgeModule, VTRecordingDelegate>
///
/// Starts recording a conference.
///
/// \param resolve returns on success
///
/// \param reject returns error on failure
///
- (void)start:(RCTPromiseResolveBlock _Nonnull)resolve
     rejecter:(RCTPromiseRejectBlock _Nonnull)reject;
///
/// Stops recording a conference.
///
/// \param resolve returns on success
///
/// \param reject returns error on failure
///
-(void)stop:(RCTPromiseResolveBlock _Nonnull)resolve
   rejecter:(RCTPromiseRejectBlock _Nonnull)reject;

@end

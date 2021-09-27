#import <React/RCTBridgeModule.h>

@interface RNConferenceServiceModule : NSObject <RCTBridgeModule>

/// Creates a conference.
///
/// \param options conference options
///
/// \param resolve returns conference object
///
/// \param reject returns error on failure
///
- (void)create:(NSDictionary *)options
       resolve:(RCTPromiseResolveBlock)resolve
      rejecter:(RCTPromiseRejectBlock)reject;

/// Provides the conference object that allows joining a conference.
///
/// \param conferenceId conference id
///
/// \param resolve returns on success
///
/// \param reject returns error on failure
///
- (void)fetch:(NSString *)conferenceId
      resolve:(RCTPromiseResolveBlock)resolve
     rejecter:(RCTPromiseRejectBlock)reject;

/// Joins a conference.
///
/// \param conference conference object
///
/// \param options join options
///
/// \param resolve returns on success
///
/// \param reject returns error on failure
///
- (void)join:(NSDictionary *)conference
     options:(NSDictionary *)options
     resolve:(RCTPromiseResolveBlock)resolve
    rejecter:(RCTPromiseRejectBlock)reject;
@end

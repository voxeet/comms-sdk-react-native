#import <React/RCTBridgeModule.h>

@interface RNConferenceServiceModule : NSObject <RCTBridgeModule>
///
/// Creates a conference.
///
/// \param options conference options
///
/// \param resolve returns conference object
///
/// \param reject returns error on failure
///
- (void)create:(NSDictionary * _Nullable)options
       resolve:(RCTPromiseResolveBlock _Nonnull)resolve
      rejecter:(RCTPromiseRejectBlock _Nonnull)reject;
///
/// Provides the conference object that allows joining a conference.
///
/// \param conferenceId conference id
///
/// \param resolve returns on success
///
/// \param reject returns error on failure
///
- (void)fetch:(NSString * _Nonnull)conferenceId
      resolve:(RCTPromiseResolveBlock _Nonnull)resolve
     rejecter:(RCTPromiseRejectBlock _Nonnull)reject;
///
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
- (void)join:(NSDictionary * _Nonnull)conference
     options:(NSDictionary * _Nullable)options
     resolve:(RCTPromiseResolveBlock _Nonnull)resolve
    rejecter:(RCTPromiseRejectBlock _Nonnull)reject;
///
/// Returns information about the current conference.
///
/// \param resolve returns current conference object
///
/// \param reject returns error on failure
///
- (void)current:(RCTPromiseResolveBlock _Nonnull)resolve
       rejecter:(RCTPromiseRejectBlock _Nonnull)reject;
///
/// Gets the participant's audio level. The audio level value ranges from 0.0 to 1.0.
///
/// \param participant participant object
///
/// \param resolve returns participant's audio level on success
///
/// \param reject returns error on failure
///
- (void)getAudioLevel:(NSDictionary * _Nonnull)participant
              resolve:(RCTPromiseResolveBlock _Nonnull)resolve
             rejecter:(RCTPromiseRejectBlock _Nonnull)reject;
///
/// Provides the maximum number of video streams that may be transmitted to the local participant.
///
/// \param resolve returns the maximum number of video streams on success
///
/// \param reject returns error on failure
///
- (void)getMaxVideoForwarding:(RCTPromiseResolveBlock _Nonnull)resolve
                     rejecter:(RCTPromiseRejectBlock _Nonnull)reject;
///
/// Provides the participant with participant's id from the current conference.
///
/// \param participantId participant's id
///
/// \param resolve returns on success
///
/// \param reject returns error on failure
///
- (void)getParticipant:(NSString * _Nonnull)participantId
               resolve:(RCTPromiseResolveBlock _Nonnull)resolve
              rejecter:(RCTPromiseRejectBlock _Nonnull)reject;
///
/// Provides the list of participants from the conference.
///
/// \param conference conference object
///
/// \param resolve returns on success
///
/// \param reject returns error on failure
///
- (void)getParticipants:(NSDictionary * _Nonnull)conference
                resolve:(RCTPromiseResolveBlock _Nonnull)resolve
               rejecter:(RCTPromiseRejectBlock _Nonnull)reject;
///
/// Provides the status of the conference.
///
/// \param conference conference object
///
/// \param resolve returns on success
///
/// \param reject returns error on failure
///
- (void)getStatus:(NSDictionary * _Nonnull)conference
          resolve:(RCTPromiseResolveBlock _Nonnull)resolve
         rejecter:(RCTPromiseRejectBlock _Nonnull)reject;
///
/// Informs whether a participant is muted.
///
/// \param resolve returns on success
///
/// \param reject returns error on failure
///
- (void)isMuted:(RCTPromiseResolveBlock _Nonnull)resolve
       rejecter:(RCTPromiseRejectBlock _Nonnull)reject;
///
/// Gets the participant's current speaking status.
///
/// \param participant participant object
///
/// \param resolve returns on success
///
/// \param reject returns error on failure
///
- (void)isSpeaking:(NSDictionary * _Nonnull)participant
           resolve:(RCTPromiseResolveBlock _Nonnull)resolve
          rejecter:(RCTPromiseRejectBlock _Nonnull)reject;
@end

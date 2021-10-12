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
/// Kicks the participant from a conference.
///
/// \param participant Remote participant to kick.
///
/// \param resolve returns current conference object
///
/// \param reject returns error on failure
///
- (void)kick:(NSDictionary * _Nonnull)participant
     resolve:(RCTPromiseResolveBlock _Nonnull)resolve
    rejecter:(RCTPromiseRejectBlock _Nonnull)reject;
///
/// Leaves the current conference.
///
/// \param resolve returns current conference object
///
/// \param reject returns error on failure
///
- (void)leave:(RCTPromiseResolveBlock _Nonnull)resolve
     rejecter:(RCTPromiseRejectBlock _Nonnull)reject;
///
/// Updates the participant's conference permissions.
///
/// \param participantPermissions The updated participant's permissions.
///
/// \param resolve returns on success
///
/// \param reject returns error on failure
///
- (void)updatePermissions:(NSArray<NSDictionary *> * _Nonnull)participantPermissions
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
///
/// Provides standard WebRTC statistics for the application.
///
/// \param resolve returns local stats on success
///
/// \param reject returns error on failure
///
- (void)getLocalStats:(RCTPromiseResolveBlock _Nonnull)resolve
             rejecter:(RCTPromiseRejectBlock _Nonnull)reject;
///
/// Enables and disables audio processing for the conference participant..
///
/// \param processingOptions participant object
///
/// \param resolve returns on success
///
/// \param reject returns error on failure
///
-(void)setAudioProcessing:(NSDictionary * _Nonnull)processingOptions
                  resolve:(RCTPromiseResolveBlock _Nonnull)resolve
                 rejecter:(RCTPromiseRejectBlock _Nonnull)reject;
///
/// Sets the maximum number of video streams that may be transmitted to the local participant.
///
/// \param maxVideoForwarding The maximum number of video streams that may be transmitted to the local participant.
///
/// \param resolve returns on success
///
/// \param reject returns error on failure
///
-(void)setMaxVideoForwarding:(NSInteger)maxVideoForwarding
                     resolve:(RCTPromiseResolveBlock _Nonnull)resolve
                    rejecter:(RCTPromiseRejectBlock _Nonnull)reject;
///
/// Mutes or unmutes output (only compatible with Dolby Voice conferences).
///
/// \param isMuted <code>true</code> if user mutes output. Otherwise, <code>false</code>.
///
/// \param resolve returns on success
///
/// \param reject returns error on failure
///
-(void)muteOutput:(BOOL)isMuted
          resolve:(RCTPromiseResolveBlock _Nonnull)resolve
         rejecter:(RCTPromiseRejectBlock _Nonnull)reject;
///
/// Mutes or unmutes the specified user.
///
/// \param participant the participant you want to mute.
///
/// \param resolve returns on success
///
/// \param reject returns error on failure
///
-(void)mute:(BOOL)isMuted
participant:(NSDictionary * _Nonnull)participant
    resolve:(RCTPromiseResolveBlock _Nonnull)resolve
   rejecter:(RCTPromiseRejectBlock _Nonnull)reject;
///
/// Starts audio transmission between the local client and a conference.
///
/// \param participant the participant you want to mute.
///
/// \param resolve returns on success
///
/// \param reject returns error on failure
///
- (void)startAudio:(NSDictionary * _Nonnull)participant
           resolve:(RCTPromiseResolveBlock _Nonnull)resolve
          rejecter:(RCTPromiseRejectBlock _Nonnull)reject;
///
/// Notifies the server to either start sending the local participant's video stream to the conference or start sending a remote participant's video stream to the local participant.
///
/// \param participant the selected participant.
///
/// \param resolve returns on success
///
/// \param reject returns error on failure
///
- (void)startVideo:(NSDictionary * _Nonnull)participant
           resolve:(RCTPromiseResolveBlock _Nonnull)resolve
          rejecter:(RCTPromiseRejectBlock _Nonnull)reject;
///
/// Stops audio transmission between the local client and a conference.
///
/// \param participant the selected participant.
///
/// \param resolve returns on success
///
/// \param reject returns error on failure
///
- (void)stopAudio:(NSDictionary * _Nonnull)participant
          resolve:(RCTPromiseResolveBlock _Nonnull)resolve
         rejecter:(RCTPromiseRejectBlock _Nonnull)reject;
///
/// Notifies the server to either stop sending the local participant's video stream to the conference or stop sending a remote participant's video stream to the local participant.
///
/// \param participant the selected participant.
///
/// \param resolve returns on success
///
/// \param reject returns error on failure
///
- (void)stopVideo:(NSDictionary * _Nonnull)participant
          resolve:(RCTPromiseResolveBlock _Nonnull)resolve
         rejecter:(RCTPromiseRejectBlock _Nonnull)reject;

@end

///
/// Extension of VTParticipantPermissions class to support react model.
///
@import VoxeetSDK;

@interface VTParticipantPermissions (ReactModel)
///
/// Generates an array of VTParticipantPermissions
///
/// \param participantPermissions The updated participant's permissions.
///
/// \param conference conference with participants
///
/// \return NSArray of VTParticipantPermissions
///
+ (NSArray<VTParticipantPermissions *> * _Nonnull)permissionsWithArray:(NSArray<NSDictionary *> * _Nonnull)participantPermissions
                                                            conference:(VTConference * _Nonnull)conference;
///
/// Generates react model of the class.
///
/// \return NSDictionary
///
- (NSDictionary * _Nonnull)reactDescription;

@end

@interface NSDictionary (ParticipantPermissions)
///
/// Provides the participant
///
/// \return (optional)NSDictionary
///
- (NSDictionary * _Nullable)participant;
///
/// Provides the list of permissions for the participant
///
/// \return (optional)NSArray
///
- (NSArray * _Nullable)permissions;
@end

///
/// Extension of VTConference class to support react model.
///
@import VoxeetSDK;

@interface VTConference (ReactModel)
///
/// Generates react model of the class.
///
/// \return NSDictionary
///
- (NSDictionary * _Nonnull)reactDescription;
///
/// Looking for the participant on the conference.
///
/// \return (optional)VTParticipant
///
- (VTParticipant * _Nullable)findParticipant:(NSDictionary * _Nullable)participant;
///
/// Looking for the participant on the conference based on the participant's id.
///
/// \return (optional)VTParticipant
///
- (VTParticipant * _Nullable)findParticipantWithId:(NSString * _Nullable)participantId;

@end
///
/// Extension of NSDictionary class to simplify getting values from the react model.
///
@interface NSDictionary (Conference)
///
/// Provides the conference's id
///
/// \return (optional)NSString
///
- (NSString * _Nullable)conferenceId;
///
/// Provides the conference's status
///
/// \return (optional)NSString
///
- (NSString * _Nullable)conferenceStatus;
///
/// Provides the conference's participant list
///
/// \return (optional)NSArray
///
- (NSArray<NSDictionary *> * _Nullable)conferenceParticipants;

@end

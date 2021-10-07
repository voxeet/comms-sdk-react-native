///
/// Extension of VTParticipant class to support react model.
///
@import VoxeetSDK;

@interface VTParticipant (ReactModel)
///
/// Generates react model of the class.
///
/// \return NSDictionary
///
- (NSDictionary * _Nonnull)reactDescription;

@end

@interface NSDictionary (Participant)
///
/// Provides the participant's id
///
/// \return (optional)NSString
///
- (NSString * _Nullable)participantId;

@end

///
/// Extension of VTParticipantInfo class to support react model.
///
@import VoxeetSDK;

@interface VTParticipantInfo (ReactModel)
///
/// Creates instance of the class from react model.
///
/// \param dictionary react model
///
+ (instancetype _Nonnull)createWithDictionary:(NSDictionary * _Nonnull)dictionary;
///
/// Generates an array of instances of the class from react model.
///
/// \param array array of react models.
///
/// \return NSArray array of VTParticipantInfo objects.
///
+ (NSArray<VTParticipantInfo *> * _Nonnull)generateWithArray:(NSArray<NSDictionary *> * _Nonnull)array;
///
/// Generates react model of the class.
///
/// \return NSDictionary
///
- (NSDictionary * _Nonnull)reactDescription;

@end

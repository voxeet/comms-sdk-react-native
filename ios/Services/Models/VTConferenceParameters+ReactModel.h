///
/// Extension of VTConferenceParameters class to support react model.
///
@import VoxeetSDK;

@interface VTConferenceParameters (ReactModel)
///
/// Creates instance of the class from react model.
///
/// \param dictionary react model
///
+ (instancetype _Nonnull)createWithDictionary:(NSDictionary * _Nonnull)dictionary;
///
/// Generates react model of the class.
///
/// \return NSDictionary
///
- (NSDictionary * _Nonnull)reactDescription;
///
/// Updates object with params from react.
///
/// \param params params from react.
///
- (void)updateWithParams:(NSDictionary * _Nullable)params;

@end

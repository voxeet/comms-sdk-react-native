///
/// Extension of VTJoinOptionsConstraints class to support react model.
///
@import VoxeetSDK;

@interface VTJoinOptionsConstraints (ReactModel)
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
/// Updates object with constrains from react.
///
/// \param constrains constrains from react.
///
- (void)updateWithConstraints:(NSDictionary * _Nullable)constrains;

@end

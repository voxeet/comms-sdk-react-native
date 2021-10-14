///
/// Extension of VTReplayOptions class to support react model.
///
@import VoxeetSDK;

@interface VTReplayOptions (ReactModel)
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

@end

@interface NSDictionary (ReplayOptions)
///
/// The conference access token.
///
/// \return (optional)NSString
///
- (NSString * _Nullable)conferenceAccessToken;
///
/// Allows the application users to start replaying the recorded conference at a specific timestamp.
///
/// \return NSNumber
///
- (NSNumber * _Nullable)offset;
@end

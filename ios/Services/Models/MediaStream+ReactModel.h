///
/// Extension of MediaStream class to support react model.
///
@import WebRTC;

@interface MediaStream (ReactModel)
///
/// Generates react model of the class.
///
/// \return NSDictionary
///
- (NSDictionary * _Nonnull)reactDescription;

@end

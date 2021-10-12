///
/// Extension of RNRecording class to support react model.
///
#import "RNRecording.h"

@interface RNRecording (ReactModel)
///
/// Generates react model of the class.
///
/// \return NSDictionary
///
- (NSDictionary * _Nonnull)reactDescription;

@end

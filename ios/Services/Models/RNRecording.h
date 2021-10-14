///
/// The Recording model includes the recording timestamp that informs when the recording was started and the ID of a participant who started the recording.
///
@import Foundation;

@interface RNRecording: NSObject
/// The ID of the participant who started the recording.
@property (nonatomic, copy)NSString * _Nullable participantId;
/// The timestamp that informs when the recording was started.
@property (nonatomic, strong)NSNumber * _Nullable startTimestamp;
///
/// Creates instance of the class.
///
/// \param participantId The ID of the participant who started the recording.
///
/// \param startTimestamp The timestamp that informs when the recording was started.
///
- (instancetype _Nonnull)initWithParticipantId:(NSString * _Nullable)participantId startTimestamp:(NSNumber * _Nullable)startTimestamp;

@end

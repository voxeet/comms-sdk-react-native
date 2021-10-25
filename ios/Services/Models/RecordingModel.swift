import Foundation
///
/// The Recording model includes the recording timestamp that informs
/// when the recording was started and the ID of a participant who started the recording.
///
internal struct RecordingModel {
	/// The ID of the participant who started the recording.
	let participantId: String?
	/// The timestamp that informs when the recording was started.
	let startTimestamp: NSNumber?
}

// MARK: - ReactModelMappable
extension RecordingModel: ReactModelMappable {
	func toReactModel() -> ReactModelType {
		return [
			Keys.participantId: participantId ?? NSNull(),
			Keys.startTimestamp: startTimestamp ?? NSNull()
		].mapKeysToRawValue()
	}
}

// MARK: - ReactModel Keys
private enum Keys: String {
	case participantId, startTimestamp
}

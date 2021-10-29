import Foundation
import VoxeetSDK

/// The Stream  model emitted when the SDK adds, remove or update a new stream to a conference participant.
internal struct StreamDTO {
	/// The conference participant.
	let participant: VTParticipant
	/// The media stream.
	let	stream: MediaStream
}

// MARK: - ReactModelMappable
extension StreamDTO: ReactModelMappable {
	func toReactModel() -> ReactModelType {
		return [
			Keys.stream: stream.toReactModel(),
			Keys.participant: participant.toReactModel()
		].mapKeysToRawValue()
	}
}

// MARK: - ReactModel Keys
private enum Keys: String {
	case stream, participant
}

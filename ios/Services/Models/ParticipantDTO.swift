import Foundation
import VoxeetSDK

/// The Participant  model emitted when a participant is added or updated on the conference.
internal struct ParticipantDTO {
	/// The participant who sent the message.
	let participant: VTParticipant
}

// MARK: - ReactModelMappable
extension ParticipantDTO: ReactModelMappable {
	func toReactModel() -> ReactModelType {
		return [
			Keys.participant: participant.toReactModel()
		].mapKeysToRawValue()
	}
}

// MARK: - ReactModel Keys
private enum Keys: String {
	case participant
}

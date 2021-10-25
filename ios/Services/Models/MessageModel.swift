import Foundation
import VoxeetSDK

/// The Message  model emitted when a participant receives a message.
internal struct MessageModel {
	/// The participant who sent the message.
	let participant: VTParticipant
	/// The received message.
	let	message: String
}

// MARK: - ReactModelMappable
extension MessageModel: ReactModelMappable {
	func toReactModel() -> ReactModelType {
		return [
			Keys.message: message,
			Keys.participant: participant.toReactModel()
		].mapKeysToRawValue()
	}
}

// MARK: - ReactModel Keys
private enum Keys: String {
	case message, participant
}

import Foundation
import VoxeetSDK

internal extension VTParticipantInfo {

	/// Creates instance of the class from react model.
	/// - Parameter dictionary: react model dictionary
	/// - Returns: VTParticipantInfo
	static func create(with dictionary: [String: Any]) -> VTParticipantInfo {
		return VTParticipantInfo(
			externalID: dictionary.value(for: Keys.externalId),
			name: dictionary.value(for: Keys.name),
			avatarURL: dictionary.value(for: Keys.avatarUrl)
		)
	}
}

// MARK: - ReactModelMappable
extension VTParticipantInfo: ReactModelMappable {

	func toReactModel() -> ReactModelType {
		return [
			Keys.externalId: externalID ?? NSNull(),
			Keys.name: name ?? NSNull(),
			Keys.avatarUrl: avatarURL ?? NSNull(),
		].mapKeysToRawValue()
	}
}

// MARK: - ReactModel Keys
private enum Keys: String {
	case externalId, name, avatarUrl
}

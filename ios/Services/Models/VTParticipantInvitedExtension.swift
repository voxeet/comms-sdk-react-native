import Foundation
import VoxeetSDK

internal extension VTParticipantInvited {

	/// Creates instance of the class from react model.
	/// - Parameter dictionary: react model dictionary
	/// - Returns: VTParticipantInvited
	static func create(with dictionary: [String: Any]) -> VTParticipantInvited {
		let info: [String : Any]? = dictionary.value(for: Keys.info)
		let permissions: [String]? = dictionary.value(for: Keys.permissions)
		return VTParticipantInvited(
			info: VTParticipantInfo.create(with: info ?? [:]),
			permissions: permissions?.compactMap { VTConferencePermission.fromReactModel(value: $0) }
		)
	}
}

// MARK: - ReactModelMappable
extension VTParticipantInvited: ReactModelMappable {

	func toReactModel() -> ReactModelType {
		return [
			Keys.info: info.toReactModel(),
			Keys.permissions: permissions?.map { $0.toReactModelValue() } ?? []
		].mapKeysToRawValue()
	}
}

// MARK: - ReactModel Keys
private enum Keys: String {
	case info, permissions
}

import Foundation
import VoxeetSDK

/// The Stream  model emitted when the SDK adds, remove or update a new stream to a conference participant.
internal struct PermissionsDTO {
	/// The conference participant.
	let permissions: [VTConferencePermission]
}

// MARK: - ReactModelMappable
extension PermissionsDTO: ReactModelMappable {
	func toReactModel() -> ReactModelType {
		return [
			Keys.permissions: permissions.map { $0.toReactModelValue() }
		].mapKeysToRawValue()
	}
}

// MARK: - ReactModel Keys
private enum Keys: String {
	case permissions
}

import Foundation
import VoxeetSDK

/// The Status  model emitted when a conference status change
internal struct StatusDTO {
	/// The conference status.
	let	status: VTConferenceStatus
}

// MARK: - ReactModelMappable
extension StatusDTO: ReactModelMappable {
	func toReactModel() -> ReactModelType {
		return [
			Keys.status: status.toReactModelValue() ?? NSNull()
		].mapKeysToRawValue()
	}
}

// MARK: - ReactModel Keys
private enum Keys: String {
	case status
}

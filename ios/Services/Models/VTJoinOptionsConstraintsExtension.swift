import Foundation
import VoxeetSDK

internal extension VTJoinOptionsConstraints {

	/// Creates instance of the class from react model.
	/// - Parameter dictionary: react model dictionary
	/// - Returns: VTJoinOptionsConstraints
	static func create(with dictionary: [String: Any]?) -> VTJoinOptionsConstraints {
		let constraints = VTJoinOptionsConstraints()

		guard let dictionary = dictionary else { return constraints }
		let audio: NSNumber? = dictionary.value(for: Keys.audio)
		let video: NSNumber? = dictionary.value(for: Keys.video)

		constraints.video = video?.boolValue ??  VoxeetSDK.shared.conference.defaultVideo
		constraints.audio = audio?.boolValue ?? false

		return constraints
	}
}

// MARK: - ReactModelMappable
extension VTJoinOptionsConstraints: ReactModelMappable {

	func toReactModel() -> ReactModelType {
		return [
			Keys.audio: NSNumber(value: audio),
			Keys.video: NSNumber(value: video)
		].mapKeysToRawValue()
	}
}

// MARK: - ReactModel Keys
private enum Keys: String {
	case audio, video
}

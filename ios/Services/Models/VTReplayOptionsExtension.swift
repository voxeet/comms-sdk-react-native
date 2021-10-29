import Foundation
import VoxeetSDK

internal extension VTReplayOptions {

	/// Creates instance of the class from react model.
	/// - Parameter dictionary: react model dictionary
	/// - Returns: VTReplayOptions
	static func create(with dictionary: [String: Any]?) -> VTReplayOptions? {
		guard let dictionary = dictionary else { return nil }
		let options = VTReplayOptions()
		options.conferenceAccessToken = dictionary.value(for: Keys.conferenceAccessToken)
		options.offset = dictionary.value(for: Keys.offset) ?? 0
		return options
	}
}

// MARK: - ReactModelMappable
extension VTReplayOptions: ReactModelMappable {

	func toReactModel() -> ReactModelType {
		return [
			Keys.conferenceAccessToken: conferenceAccessToken ?? NSNull(),
			Keys.offset: offset
		].mapKeysToRawValue()
	}
}

// MARK: - ReactModel Keys
private enum Keys: String {
	case conferenceAccessToken, offset
}


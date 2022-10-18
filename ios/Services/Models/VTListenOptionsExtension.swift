import Foundation
import VoxeetSDK

internal extension VTListenOptions {

	/// Creates instance of the class from react model.
	/// - Parameter dictionary: react model dictionary
	/// - Returns: VTlistenOptions
	static func create(with dictionary: [String: Any]?) -> VTListenOptions? {
		guard let dictionary = dictionary else { return nil }
		let listenOptions = VTListenOptions()
		listenOptions.maxVideoForwarding = dictionary.value(for: Keys.maxVideoForwarding)
		listenOptions.conferenceAccessToken = dictionary.value(for: Keys.conferenceAccessToken)
		let spatialAudio: NSNumber? = dictionary.value(for: Keys.spatialAudio)
		listenOptions.spatialAudio = spatialAudio?.boolValue ?? false
		let strategy: String? = dictionary.value(for: Keys.videoForwardingStrategy)
		listenOptions.videoForwardingStrategy = VideoForwardingStrategy.fromReactModel(value: strategy)

		return listenOptions
	}
}

// MARK: - ReactModelMappable
extension VTListenOptions: ReactModelMappable {
	func toReactModel() -> ReactModelType {
		[
			Keys.maxVideoForwarding: maxVideoForwarding ?? NSNull(),
			Keys.conferenceAccessToken: conferenceAccessToken ?? NSNull(),
			Keys.spatialAudio: NSNumber(value: false),
			Keys.videoForwardingStrategy: videoForwardingStrategy?.toReactModelValue() ?? NSNull()
		].mapKeysToRawValue()
	}
}

// MARK: - ReactModel Keys
private enum Keys: String {
	case maxVideoForwarding, conferenceAccessToken, spatialAudio, videoForwardingStrategy
}

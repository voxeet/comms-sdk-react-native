import Foundation
import VoxeetSDK

internal extension VTJoinOptions {

	/// Creates instance of the class from react model.
	/// - Parameter dictionary: react model dictionary
	/// - Returns: VTJoinOptions
	static func create(with dictionary: [String: Any]?) -> VTJoinOptions? {
		guard let dictionary = dictionary else { return nil }
		let joinOptions = VTJoinOptions()
		joinOptions.maxVideoForwarding = dictionary.value(for: Keys.maxVideoForwarding)
		joinOptions.conferenceAccessToken = dictionary.value(for: Keys.conferenceAccessToken)
		joinOptions.constraints = VTJoinOptionsConstraints.create(with: dictionary.value(for: Keys.constraints))
		let spatialAudio: NSNumber? = dictionary.value(for: Keys.spatialAudio)
		joinOptions.spatialAudio = spatialAudio?.boolValue ?? false
		let stategy: String? = dictionary.value(for: Keys.videoForwardingStrategy)
		joinOptions.videoForwardingStrategy = VideoForwardingStrategy.fromReactModel(value: strategy)

		return joinOptions
	}
}

// MARK: - ReactModelMappable
extension VTJoinOptions: ReactModelMappable {
	func toReactModel() -> ReactModelType {
		[
			Keys.constraints: constraints.toReactModel(),
			Keys.maxVideoForwarding: maxVideoForwarding ?? NSNull(),
			Keys.conferenceAccessToken: conferenceAccessToken ?? NSNull(),
			Keys.spatialAudio: NSNumber(value: false)
			Keys.videoForwardingStrategy: videoForwardingStrategy?.toReactModelValue() ?? NSNull()
		].mapKeysToRawValue()
	}
}

// MARK: - ReactModel Keys
private enum Keys: String {
	case constraints, maxVideoForwarding, conferenceAccessToken, spatialAudio, videoForwardingStrategy
}

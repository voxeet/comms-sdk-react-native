import Foundation
import VoxeetSDK

internal extension VTConferenceOptions {

	/// Creates instance of the class from react model.
	/// - Parameter dictionary: react model dictionary
	/// - Returns: VTConferenceOptions
	static func create(with dictionary: [String: Any]?) -> VTConferenceOptions {
		let conferenceOptions = VTConferenceOptions()
		guard let dictionary = dictionary else { return conferenceOptions }

		conferenceOptions.alias = dictionary.value(for: Keys.alias)
		conferenceOptions.params.update(with: dictionary.value(for: Keys.params))
		conferenceOptions.pinCode = dictionary.value(for: Keys.pinCode)

		return conferenceOptions
	}
}

// MARK: - ReactModelMappable
extension VTConferenceOptions: ReactModelMappable {

	func toReactModel() -> ReactModelType {
		return [
			Keys.alias: alias ?? NSNull(),
			Keys.params: params.toReactModel(),
			Keys.pinCode: pinCode ?? NSNull()
		].mapKeysToRawValue()
	}
}

// MARK: - ReactModel Keys
private enum Keys: String {
	case alias, params, pinCode
}



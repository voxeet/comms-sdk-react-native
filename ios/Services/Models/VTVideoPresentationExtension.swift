import Foundation
import VoxeetSDK

// MARK: - ReactModelMappable
extension VTVideoPresentation: ReactModelMappable {

	func toReactModel() -> ReactModelType {
		return [
			Keys.owner: participant.toReactModel(),
			Keys.timestamp: NSNumber(value: timestamp),
			Keys.url: url.absoluteString
		].mapKeysToRawValue()

	}
}

// MARK: - ReactModel Keys
private enum Keys: String {
	case owner, timestamp, url
}

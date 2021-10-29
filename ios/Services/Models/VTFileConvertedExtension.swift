import Foundation
import VoxeetSDK

// MARK: - ReactModelMappable
extension VTFileConverted: ReactModelMappable {

	func toReactModel() -> ReactModelType {
		return [
			Keys.id: id,
			Keys.imageCount: NSNumber(value: imageCount),
			Keys.name: name ?? NSNull(),
			Keys.ownerID: ownerID ?? NSNull(),
			Keys.size: size ?? NSNull()
		].mapKeysToRawValue()
	}
}

// MARK: - ReactModel Keys
private enum Keys: String {
	case id, imageCount, name, ownerID, size
}


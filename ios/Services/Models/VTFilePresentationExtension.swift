import Foundation
import VoxeetSDK

// MARK: - ReactModelMappable
extension VTFilePresentation: ReactModelMappable {

	func toReactModel() -> ReactModelType {
		return [
			Keys.id: id,
			Keys.owner: owner.toReactModel(),
			Keys.imageCount: NSNumber(value: imageCount),
			Keys.position: NSNumber(value: position)
		].mapKeysToRawValue()

	}
}

// MARK: - ReactModel Keys
private enum Keys: String {
	case id, owner, imageCount, position
}


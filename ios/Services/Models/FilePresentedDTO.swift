import Foundation
import VoxeetSDK

/// The File Presented model emitted when the file is presented.
internal struct FilePresentedDTO {
	/// the presented file
	let filePresentation: VTFilePresentation
}

// MARK: - ReactModelMappable
extension FilePresentedDTO: ReactModelMappable {
	func toReactModel() -> ReactModelType {
		return [
			Keys.filePresentation: filePresentation.toReactModel()
		].mapKeysToRawValue()
	}
}

// MARK: - ReactModel Keys
private enum Keys: String {
	case filePresentation
}

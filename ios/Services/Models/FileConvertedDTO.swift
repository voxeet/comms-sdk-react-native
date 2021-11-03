import Foundation
import VoxeetSDK

/// The File Converted model emitted when the file is converted.
internal struct FileConvertedDTO {
	/// the converted file
	let fileConverted: VTFileConverted
}

// MARK: - ReactModelMappable
extension FileConvertedDTO: ReactModelMappable {
	func toReactModel() -> ReactModelType {
		return [
			Keys.fileConverted: fileConverted.toReactModel()
		].mapKeysToRawValue()
	}
}

// MARK: - ReactModel Keys
private enum Keys: String {
	case fileConverted
}

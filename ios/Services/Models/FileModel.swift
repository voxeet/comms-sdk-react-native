import Foundation
///
/// The File model used in FilePresentationService
///
internal struct FileModel {
	/// The url of the file
	let url: String?
}

extension FileModel {

	var fileUrl: URL? {
		guard let url = url else { return nil }
		return URL(string: url)
	}

	static func create(with dictionary: [String: Any]) -> FileModel {
		return FileModel(url: dictionary.value(for: Keys.url))
	}
}

// MARK: - ReactModelMappable
extension FileModel: ReactModelMappable {
	func toReactModel() -> ReactModelType {
		return [
			Keys.url: url ?? NSNull()
		].mapKeysToRawValue()
	}
}

// MARK: - ReactModel Keys
private enum Keys: String {
	case url
}

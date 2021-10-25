import Foundation
import VoxeetSDK

// MARK: - ReactModelMappable
extension MediaStream: ReactModelMappable {
	func toReactModel() -> ReactModelType {
		return [
			Keys.id: streamId ?? NSNull(),
			Keys.type: type.toReactModelValue() ?? NSNull(),
			Keys.audioTracks: audioTracks.compactMap { $0.trackId },
			Keys.videoTracks: videoTracks.compactMap { $0.trackId }
		].mapKeysToRawValue()
	}
}

// MARK: - ReactModel Keys
private enum Keys: String {
	case id, type, audioTracks, videoTracks
}



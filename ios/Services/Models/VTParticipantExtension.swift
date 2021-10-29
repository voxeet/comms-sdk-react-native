import Foundation
import VoxeetSDK

// MARK: - ReactModelMappable
extension VTParticipant: ReactModelMappable {

	func toReactModel() -> ReactModelType {
		[
			Keys.id: id ?? NSNull(),
			Keys.info: info.toReactModel(),
			Keys.type: type.toReactModelValue()  ?? NSNull(),
			Keys.status: status.toReactModelValue() ?? NSNull(),
			Keys.streams: streams.map { $0.toReactModel() },
			Keys.audioReceivingFrom: NSNumber(value: audioReceivingFrom),
			Keys.audioTransmitting: NSNumber(value: audioTransmitting)
		].mapKeysToRawValue()
	}
}

// MARK: - ReactModel Keys
private enum Keys: String {
	case id, info, type, status, streams, audioReceivingFrom, audioTransmitting
}

import Foundation
import VoxeetSDK

extension VideoForwardingStrategy: ReactModelValueMappable {

	typealias ReactModelValueType = String?

	static func fromReactModel(value: ReactModelValueType) -> VideoForwardingStrategy? {
		guard let value = value else { return nil }
		return VideoForwardingStrategyValue(rawValue: value)?.mapToVideoForwardingStrategyValue()
	}

	func toReactModelValue() -> ReactModelValueType {
		return mapToVideoForwardingStrategyValue?.rawValue
	}

	func mapToVideoForwardingStrategyValue() -> VideoForwardingStrategyValue? {
		switch self {
		case .lastSpeaker:
			return .lastSpeaker
		case .closestUser:
			return .closestUser
		@unknown default:
			return nil
		}
	}

	private enum VideoForwardingStrategyValue: ReactModelValueType {
		case lastSpeaker = "lastSpeakerStrategy"
		case closestUser = "closestUserStrategy"

		func mapToVideoForwardingStrategy() -> VideoForwardingStrategy? {
			switch self {
			case .lastSpeaker:
				return .lastSpeaker
			case .closestUser:
				return .closestUser
			@unknown default:
				return nil
			}
		}
	}
}

import Foundation
import VoxeetSDK

extension VideoForwardingStrategy: ReactModelValueMappable {

	typealias ReactModelValueType = String?

	static func fromReactModel(value: ReactModelValueType) -> VideoForwardingStrategy? {
		guard let value = value else { return nil }
		return VideoForwardingStrategyValue(rawValue: value)?.mapToVideoForwardingStrategy()
	}

	func toReactModelValue() -> ReactModelValueType {
		return mapToVideoForwardingStrategyValue()?.rawValue
	}

	private func mapToVideoForwardingStrategyValue() -> VideoForwardingStrategyValue? {
		switch self {
		case .lastSpeaker:
			return .lastSpeaker
		case .closestUser:
			return .closestUser
		@unknown default:
			return nil
		}
	}

	private enum VideoForwardingStrategyValue: String {
		case lastSpeaker = "LAST_SPEAKER"
		case closestUser = "CLOSEST_USER"

		func mapToVideoForwardingStrategy() -> VideoForwardingStrategy {
			switch self {
			case .lastSpeaker:
				return .lastSpeaker
			case .closestUser:
				return .closestUser
			}
		}
	}
}

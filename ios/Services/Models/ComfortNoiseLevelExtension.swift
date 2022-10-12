import Foundation
import VoxeetSDK

// MARK: - ReactModelValueMappable
extension ComfortNoiseLevel: ReactModelValueMappable {

	typealias ReactModelValueType = String?

	static func fromReactModel(value: ReactModelValueType) -> ComfortNoiseLevel? {
		guard let value = value else { return nil }
		return RNComfortNoiseLevel(rawValue: value)?.mapToComfortNoiseLevel()
	}

	func toReactModelValue() -> ReactModelValueType {
		return mapToRNComfortNoiseLevel()?.rawValue
	}

	private func mapToRNComfortNoiseLevel() -> RNComfortNoiseLevel? {
		switch self {
		case .low:
			return .low
		case .medium:
			return .medium
		case .off:
			return .off
		case .`default`:
			return .`default`
		default:
			return nil
		}
	}

	private enum RNComfortNoiseLevel: String {
		case low = "low"
		case medium = "medium"
		case off = "off"
		case `default` = "default"

		func mapToComfortNoiseLevel() -> ComfortNoiseLevel? {
			switch self {
			case .low:
				return .low
			case .medium:
				return .medium
			case .off:
				return .off
			case .`default`:
				return .`default`
			}
		}
	}
}

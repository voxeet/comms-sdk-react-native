import Foundation
import VoxeetSDK

// MARK: - ReactModelValueMappable
extension MediaEngineComfortNoiseLevel: ReactModelValueMappable {

	typealias ReactModelValueType = String?

	static func fromReactModel(value: ReactModelValueType) -> MediaEngineComfortNoiseLevel? {
		guard let value = value else { return nil }
		return RNMediaEngineComfortNoiseLevel(rawValue: value)?.mapToMediaEngineComfortNoiseLevel()
	}

	func toReactModelValue() -> ReactModelValueType {
		return mapToRNMediaEngineComfortNoiseLevel()?.rawValue
	}

	private func mapToRNMediaEngineComfortNoiseLevel() -> RNMediaEngineComfortNoiseLevel? {
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

	private enum RNMediaEngineComfortNoiseLevel: String {
		case low = "low"
		case medium = "medium"
		case off = "off"
		case `default` = "default"

		func mapToMediaEngineComfortNoiseLevel() -> MediaEngineComfortNoiseLevel? {
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

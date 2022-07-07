import Foundation
import VoxeetSDK

extension SpatialAudioStyle: ReactModelValueMappable {

	typealias ReactModelValueType = String?

	static func fromReactModel(value: ReactModelValueType) -> SpatialAudioStyle? {
		guard let value = value else { return nil }
		return SpatialAudioStyleValue(rawValue: value)?.mapToSpatialAudioStyle()
	}

	func toReactModelValue() -> ReactModelValueType {
		return mapToSpatialAudioStyleValue()?.rawValue
	}

	private func mapToSpatialAudioStyleValue() -> SpatialAudioStyleValue? {
		switch self {
		case .individual:
			return .individual
		case .shared:
			return .shared
		case .disabled:
			return .disabled
		@unknown default:
			return nil
		}
	}

	private enum SpatialAudioStyleValue: String {

		case individual = "INDIVIDUAL"
		case shared = "SHARED"
		case disabled = "DISABLED"

		func mapToSpatialAudioStyle() -> SpatialAudioStyle {
			switch self {
			case .individual:
				return .individual
			case .shared:
				return .shared
			case .disabled:
				return .disabled
			}
		}
	}
}

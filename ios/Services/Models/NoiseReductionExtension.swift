import Foundation
import VoxeetSDK

// MARK: - ReactModelValueMappable
extension StandardAudioCaptureMode.NoiseReduction: ReactModelValueMappable {

    typealias ReactModelValueType = String?

    static func fromReactModel(value: ReactModelValueType) -> StandardAudioCaptureMode.NoiseReduction? {
        guard let value = value else { return nil }
        return RNNoiseReduction(rawValue: value)?.mapToNoiseReduction()
    }

    func toReactModelValue() -> ReactModelValueType {
        return mapToRNNoiseReduction()?.rawValue
    }

    private func mapToRNNoiseReduction() -> RNNoiseReduction? {
        switch self {
        case .low:
            return .low
        case .high:
            return .high
        default:
            return nil
        }
    }

    private enum RNNoiseReduction: String {
        case low = "LOW"
        case high = "HIGH"

        func mapToNoiseReduction() -> StandardAudioCaptureMode.NoiseReduction? {
            switch self {
            case .low:
                return .low
            case .high:
                return .high
            }
        }
    }
}

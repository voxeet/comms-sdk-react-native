import Foundation
import VoxeetSDK

// MARK: - ReactModelMappable
extension AudioCaptureMode: ReactModelMappable {

    enum Mode: String {
        case standard = "STANDARD"
        case unprocessed = "UNPROCESSED"
    }

    var mode: Mode? {
        switch self {
        case is StandardAudioCaptureMode:
            return .standard
        case is UnprocessedAudioCaptureMode:
            return .unprocessed
        default:
            return nil
        }
    }

    var noiseReductionString: String? {
        guard let self = self as? StandardAudioCaptureMode else {
            return nil
        }
        return self.noiseReduction.toReactModelValue()
    }

    static func create(with dictionary: [String: Any]) -> AudioCaptureMode? {
        guard let mode: String = dictionary.value(for: Keys.mode) else {
            return nil
        }
        switch Mode(rawValue: mode) {
        case .standard:
            guard let noiseReduction = StandardAudioCaptureMode.NoiseReduction.fromReactModel(value: dictionary.value(for: Keys.noiseReduction)) else {
                return nil
            }
            return standard(noiseReduction: noiseReduction)
        case .unprocessed:
            return unprocessed()
        default:
            return nil
        }
    }

    func toReactModel() -> ReactModelType {
        return [
            Keys.mode: mode?.rawValue ?? NSNull(),
            Keys.noiseReduction: noiseReductionString ?? NSNull(),
        ].mapKeysToRawValue()
    }
}

// MARK: - ReactModel Keys
private enum Keys: String {
    case mode, noiseReduction
}

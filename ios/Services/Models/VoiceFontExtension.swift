import Foundation
import VoxeetSDK

// MARK: - ReactModelValueMappable
extension VoiceFont: ReactModelValueMappable {

    typealias ReactModelValueType = String?

    static func fromReactModel(value: ReactModelValueType) -> VoiceFont? {
        guard let value = value else { return nil }

        return RNVoiceFont(rawValue: value)?.mapToVoiceFont()
    }

    func toReactModelValue() -> ReactModelValueType {
        return mapToRNVoiceFont()?.rawValue
    }

    private func mapToRNVoiceFont() -> RNVoiceFont? {
        switch self {
        case .masculine:
            return .masculine
        case .feminine:
            return .feminine
        case .helium:
            return .helium
        case .darkModulation:
            return .darkModulation
        case .brokenRobot:
            return .brokenRobot
        case .interference:
            return .interference
        case .abyss:
            return .abyss
        case .wobble:
            return .wobble
        case .starshipCaptain:
            return .starshipCaptain
        case .nervousRobot:
            return .nervousRobot
        case .swarm:
            return .swarm
        case .amRadio:
            return .amRadio
        case .none:
            return RNVoiceFont.none
        default:
            return nil
        }
    }

    private enum RNVoiceFont: String {
        case masculine = "MASCULINE"
        case feminine = "FEMININE"
        case helium = "HELIUM"
        case darkModulation = "DARK_MODULATION"
        case brokenRobot = "BROKEN_ROBOT"
        case interference = "INTERFERENCE"
        case abyss = "ABYSS"
        case wobble = "WOBBLE"
        case starshipCaptain = "STARSHIP_CAPTAIN"
        case nervousRobot = "NERVOUS_ROBOT"
        case swarm = "SWARM"
        case amRadio = "AM_RADIO"
        case none = "NONE"

        func mapToVoiceFont() -> VoiceFont {
            switch self {
            case .masculine:
                return .masculine
            case .feminine:
                return .feminine
            case .helium:
                return .helium
            case .darkModulation:
                return .darkModulation
            case .brokenRobot:
                return .brokenRobot
            case .interference:
                return .interference
            case .abyss:
                return .abyss
            case .wobble:
                return .wobble
            case .starshipCaptain:
                return .starshipCaptain
            case .nervousRobot:
                return .nervousRobot
            case .swarm:
                return .swarm
            case .amRadio:
                return .amRadio
            case .none:
                return .none
            }
        }
    }
}

import Foundation
import VoxeetSDK

// MARK: - ReactModelMappable
extension VTConferenceStatusNotification: ReactModelMappable {

    func toReactModel() -> ReactModelType {
        return [
            Keys.conferenceAlias: conferenceAlias,
            Keys.conferenceId: conferenceID,
            Keys.live: NSNumber(value: live),
            Keys.participants: participants.map { $0.toReactModel() }
        ].mapKeysToRawValue()
    }
}

// MARK: - ReactModel Keys
private enum Keys: String {
    case conferenceAlias, conferenceId, participants, live
}

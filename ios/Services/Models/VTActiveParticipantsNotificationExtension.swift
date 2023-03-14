import Foundation
import VoxeetSDK

// MARK: - ReactModelMappable
extension VTActiveParticipantsNotification: ReactModelMappable {

    func toReactModel() -> ReactModelType {
        return [
            Keys.conferenceAlias: conferenceAlias,
            Keys.conferenceId: conferenceID,
            Keys.participantCount: NSNumber(value: participantCount),
            Keys.participants: participants.map { $0.toReactModel() }
        ].mapKeysToRawValue()
    }
}

// MARK: - ReactModel Keys
private enum Keys: String {
    case conferenceAlias, conferenceId, participants, participantCount
}

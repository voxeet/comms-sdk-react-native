import Foundation
import VoxeetSDK

// MARK: - ReactModelMappable
extension VTParticipantLeftNotification: ReactModelMappable {

    func toReactModel() -> ReactModelType {
        return [
            Keys.conferenceAlias: conferenceAlias,
            Keys.conferenceId: conferenceID,
            Keys.participant: participant.toReactModel()
        ].mapKeysToRawValue()
    }
}

// MARK: - ReactModel Keys
private enum Keys: String {
    case conferenceAlias, conferenceId, participant
}

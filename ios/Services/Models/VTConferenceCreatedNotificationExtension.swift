import Foundation
import VoxeetSDK

// MARK: - ReactModelMappable
extension VTConferenceCreatedNotification: ReactModelMappable {

    func toReactModel() -> ReactModelType {
        return [
            Keys.conferenceAlias: conferenceAlias,
            Keys.conferenceId: conferenceID
        ].mapKeysToRawValue()
    }
}

// MARK: - ReactModel Keys
private enum Keys: String {
    case conferenceAlias, conferenceId
}

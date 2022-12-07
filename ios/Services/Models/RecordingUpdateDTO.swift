import Foundation
import VoxeetSDK

internal struct RecordingUpdateDTO {
    let recordingStatus: VTRecordingStatus
    let conferenceId: String?
    let participantId: String?
    let timestamp: NSNumber?
}

// MARK: - ReactModelMappable
extension RecordingUpdateDTO: ReactModelMappable {
    func toReactModel() -> ReactModelType {
        return [
            Keys.recordingStatus: recordingStatus.toReactModelValue(),
            Keys.conferenceId: conferenceId  ?? NSNull(),
            Keys.participantId: participantId ?? NSNull(),
            Keys.timestamp: timestamp ?? NSNull()
        ].mapKeysToRawValue()
    }
}

// MARK: - ReactModel Keys
private enum Keys: String {
    case recordingStatus, participantId, conferenceId, timestamp
}

import Foundation
import VoxeetSDK

enum Event: String {
    case invitationReceived = "SUBSCRIPTION_TYPE_INVITATION_RECEIVED"
    case activeParticipants = "SUBSCRIPTION_TYPE_ACTIVE_PARTICIPANTS"
    case conferenceCreated = "SUBSCRIPTION_TYPE_CONFERENCE_CREATED"
    case conferenceEnded = "SUBSCRIPTION_TYPE_CONFERENCE_ENDED"
    case participantJoined = "SUBSCRIPTION_TYPE_PARTICIPANT_JOINED"
    case participantLeft = "SUBSCRIPTION_TYPE_PARTICIPANT_LEFT"
}

internal struct SubscriptionDTO {

    static func create(with dictionary: [String: Any]) -> SubscriptionDTO? {
        guard
            let type: String = dictionary.value(for: Keys.type),
            let conferenceAlias: String = dictionary.value(for: Keys.conferenceAlias)
        else { return nil }

        return SubscriptionDTO(type: type, conferenceAlias: conferenceAlias)
    }

    let type: String
    let conferenceAlias: String

    func subscription() -> VTSubscribeBase? {
        switch type {
        case Event.invitationReceived.rawValue:
            return VTSubscribeInvitation(conferenceAlias: conferenceAlias)
        case Event.activeParticipants.rawValue:
            return VTSubscribeActiveParticipants(conferenceAlias: conferenceAlias)
        case Event.conferenceCreated.rawValue:
            return VTSubscribeConferenceCreated(conferenceAlias: conferenceAlias)
        case Event.conferenceEnded.rawValue:
            return VTSubscribeConferenceEnded(conferenceAlias: conferenceAlias)
        case Event.participantJoined.rawValue:
            return VTSubscribeParticipantJoined(conferenceAlias: conferenceAlias)
        case Event.participantLeft.rawValue:
            return VTSubscribeParticipantLeft(conferenceAlias: conferenceAlias)
        default:
            return nil
        }
    }
}

// MARK: - ReactModelMappable
extension SubscriptionDTO: ReactModelMappable {
    func toReactModel() -> ReactModelType {
        return [
            Keys.type: type,
            Keys.conferenceAlias: conferenceAlias
        ].mapKeysToRawValue()
    }
}

// MARK: - ReactModel Keys
private enum Keys: String {
    case type, conferenceAlias
}

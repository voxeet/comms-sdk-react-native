import Foundation
import VoxeetSDK

// MARK: - ReactModelMappable
extension VTInvitationReceivedNotification: ReactModelMappable {

	func toReactModel() -> ReactModelType {
		return [
			Keys.conferenceAlias: conferenceAlias,
			Keys.conferenceId: conferenceID,
			Keys.conferenceToken: NSNull(),
			Keys.participant: participant.toReactModel()
		].mapKeysToRawValue()
	}
}

// MARK: - ReactModel Keys
private enum Keys: String {
	case conferenceAlias, conferenceId, conferenceToken, participant
}

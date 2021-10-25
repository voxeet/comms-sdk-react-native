import Foundation
import VoxeetSDK

// MARK: - ReactModelMappable
extension VTConference: ReactModelMappable {

	func toReactModel() -> ReactModelType {
		return [
			Keys.id: id,
			Keys.alias: alias,
			Keys.isNew: NSNumber(value: isNew),
			Keys.participants: participants.map { $0.toReactModel() },
			Keys.params: params.toReactModel(),
			Keys.status: status.toReactModelValue() ?? NSNull(),
			Keys.pinCode: pinCode ?? NSNull(),
		].mapKeysToRawValue()
	}

	func findParticipant(with identifier: String?) -> VTParticipant? {
		guard let identifier = identifier else { return nil }
		return participants.first(where: { $0.id == identifier })
	}
}

// MARK: - ReactModel Keys
private enum Keys: String {
	case id, alias, isNew, participants, params, status, pinCode
}


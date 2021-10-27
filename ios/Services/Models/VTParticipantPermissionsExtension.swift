import Foundation
import VoxeetSDK

internal extension VTParticipantPermissions {

	/// Generates an array of VTParticipantPermissions
	/// - Parameters:
	///   - participantPermissionsDictionary: The updated participant's permissions.
	///   - conference: conference with participants
	/// - Returns: list of VTParticipantPermissions
	static func permissions(
		with participantPermissionsDictionary: [[String: Any]],
		conference: VTConference
	) -> [VTParticipantPermissions] {

		return participantPermissionsDictionary.compactMap { permissionDictionary in
			let participantDictionary: [String: Any]? = permissionDictionary.value(for: Keys.participant)
			guard let participantId = participantDictionary?.identifier,
				  let participant = conference.participants.first(where: { $0.id == participantId }),
				  let permissionList: [NSNumber] = permissionDictionary.value(for: Keys.permissions)
			else { return nil }

			return VTParticipantPermissions(participant: participant, permissions: permissionList.map { $0.intValue })
		}
	}
}

// MARK: - ReactModelMappable
extension VTParticipantPermissions: ReactModelMappable {

	func toReactModel() -> ReactModelType {
		return [
			Keys.participant: participant.toReactModel(),
			Keys.permissions: permissions.map { $0.toReactModelValue() }
		].mapKeysToRawValue()
	}
}

// MARK: - ReactModel Keys
private enum Keys: String {
	case participant, permissions
}


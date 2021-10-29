import Foundation
import VoxeetSDK

// MARK: - ReactModelValueMappable
extension VTConferencePermission: ReactModelValueMappable {

	typealias ReactModelValueType = String?

	static func fromReactModel(value: ReactModelValueType) -> VTConferencePermission? {
		guard let value = value else { return nil }
		return ConferencePermission(rawValue: value)?.mapToVTConferencePermission()
	}

	func toReactModelValue() -> ReactModelValueType {
		return mapToConferencePermission()?.rawValue
	}

	private func mapToConferencePermission() -> ConferencePermission? {
		switch self {
		case .invite:
			return .invite
		case .kick:
			return .kick
		case .updatePermissions:
			return .updatePermissions
		case .join:
			return .join
		case .sendAudio:
			return .sendAudio
		case .sendVideo:
			return .sendVideo
		case .shareScreen:
			return .shareScreen
		case .shareVideo:
			return .shareVideo
		case .shareFile:
			return .shareFile
		case .sendMessage:
			return .sendMessage
		case .record:
			return .record
		case .stream:
			return .stream
		@unknown default:
			return nil
		}
	}

	private enum ConferencePermission: String {
		case invite = "INVITE"
		case kick = "KICK"
		case updatePermissions = "UPDATE_PERMISSIONS"
		case join = "JOIN"
		case sendAudio = "SEND_AUDIO"
		case sendVideo = "SEND_VIDEO"
		case shareScreen = "SHARE_SCREEN"
		case shareVideo = "SHARE_VIDEO"
		case shareFile = "SHARE_FILE"
		case sendMessage = "SEND_MESSAGE"
		case record = "RECORD"
		case stream = "STREAM"

		func mapToVTConferencePermission() -> VTConferencePermission {
			switch self {
			case .invite:
				return .invite
			case .kick:
				return .kick
			case .updatePermissions:
				return .updatePermissions
			case .join:
				return .join
			case .sendAudio:
				return .sendAudio
			case .sendVideo:
				return .sendVideo
			case .shareScreen:
				return .shareScreen
			case .shareVideo:
				return .shareVideo
			case .shareFile:
				return .shareFile
			case .sendMessage:
				return .sendMessage
			case .record:
				return .record
			case .stream:
				return .stream
			}
		}
	}
}

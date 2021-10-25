import Foundation
import VoxeetSDK

// MARK: - ReactModelValueMappable
extension VTConferencePermission: ReactModelValueMappable {

	typealias ReactModelValueType = String?

	func toReactModelValue() -> ReactModelValueType {
		switch self {
		case .invite:
			return "INVITE"
		case .kick:
			return "KICK"
		case .updatePermissions:
			return "UPDATE_PERMISSIONS"
		case .join:
			return "JOIN"
		case .sendAudio:
			return "SEND_AUDIO"
		case .sendVideo:
			return "SEND_VIDEO"
		case .shareScreen:
			return "SHARE_SCREEN"
		case .shareVideo:
			return "SHARE_VIDEO"
		case .shareFile:
			return "SHARE_FILE"
		case .sendMessage:
			return "SEND_MESSAGE"
		case .record:
			return "RECORD"
		case .stream:
			return "STREAM"
		@unknown default:
			return "UNKNOWN"
		}
	}
}

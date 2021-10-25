import Foundation
import VoxeetSDK

// MARK: - ReactModelValueMappable
extension VTParticipantStatus: ReactModelValueMappable {

	typealias ReactModelValueType = String?

	func toReactModelValue() -> ReactModelValueType {
		switch self {
		case .reserved:
			return "RESERVED"
		case .inactive:
			return "INACTIVE"
		case .decline:
			return "DECLINE"
		case .connecting:
			return "CONNECTING"
		case .connected:
			return "ON_AIR"
		case .left:
			return "LEFT"
		case .warning:
			return "WARNING"
		case .error:
			return "ERROR"
		case .kicked:
			return "KICKED"
		@unknown default:
			return nil
		}
	}
}

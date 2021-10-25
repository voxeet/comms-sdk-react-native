import Foundation
import VoxeetSDK

// MARK: - ReactModelValueMappable
extension VTParticipantType: ReactModelValueMappable {

	typealias ReactModelValueType = String?

	func toReactModelValue() -> ReactModelValueType {
		switch self {
		case .none:
			return "NONE"
		case .user:
			return "USER"
		case .pstn:
			return "PSTN"
		case .listener:
			return "LISTENER"
		case .mixer:
			return "MIXER"
		@unknown default:
			return nil
		}
	}
}

import Foundation
import VoxeetSDK

extension VTConferenceStatus: ReactModelValueMappable {

	typealias ReactModelValueType = String?

	func toReactModelValue() -> ReactModelValueType {
		switch self {
		case .creating:
			return "CREATING"
		case .created:
			return "CREATED"
		case .joining:
			return "JOINING"
		case .joined:
			return "JOINED"
		case .leaving:
			return "LEAVING"
		case .left:
			return "LEFT"
		case .ended:
			return "ENDED"
		case .destroyed:
			return "DESTROYED"
		case .error:
			return "ERROR"
		@unknown default:
			return nil
		}
	}
}

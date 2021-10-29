import Foundation
import VoxeetSDK

// MARK: - ReactModelValueMappable
extension MediaStreamType: ReactModelValueMappable {

	typealias ReactModelValueType = String?

	func toReactModelValue() -> ReactModelValueType {
		switch self {
		case .Camera:
			return "CAMERA"
		case .ScreenShare:
			return "SCREEN_SHARE"
		case .Custom:
			return "CUSTOM"
		@unknown default:
			return nil
		}
	}
}

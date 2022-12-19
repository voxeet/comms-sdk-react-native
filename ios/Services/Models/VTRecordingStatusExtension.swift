import Foundation
import VoxeetSDK

// MARK: - ReactModelValueMappable
extension VTRecordingStatus: ReactModelValueMappable {

	typealias ReactModelValueType = String

	func toReactModelValue() -> ReactModelValueType {
		switch self {
		case .recording:
			return "RECORDING"
		case .notRecording:
			return "NOT_RECORDING"
		@unknown default:
            return ""
		}
	}
}

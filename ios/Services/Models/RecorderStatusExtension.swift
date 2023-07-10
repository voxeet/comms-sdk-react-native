import Foundation
import VoxeetSDK

extension RecorderStatus: ReactModelValueMappable {
	
	typealias ReactModelValueType = String?
	
	func toReactModelValue() -> String? {
		let rnRecorderStatus: RNRecorderStatus?
		switch self {
		case .noRecordingAvailable:
			rnRecorderStatus = .noRecordingAvailable
		case .recordingAvailable:
			rnRecorderStatus = .recordingAvailable
		case .recording:
			rnRecorderStatus = .recording
		case .playing:
			rnRecorderStatus = .playing
		case .released:
			rnRecorderStatus = .released
		@unknown default:
			rnRecorderStatus = nil
		}
		return rnRecorderStatus?.rawValue
	}
	
	private enum RNRecorderStatus: String {
		case noRecordingAvailable = "NoRecordingAvailable"
		case recordingAvailable = "RecordingAvailable"
		case recording = "Recording"
		case playing = "Playing"
		case released = "Released"
	}
}

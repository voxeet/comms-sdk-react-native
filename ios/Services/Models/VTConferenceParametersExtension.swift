import Foundation
import VoxeetSDK

internal extension VTConferenceParameters {

	/// Creates instance of the class from react model.
	/// - Parameter dictionary: react model dictionary
	/// - Returns: VTConferenceParameters
	static func create(with dictionary: [String: Any]?) -> VTConferenceParameters {
		let conferenceParameters = VTConferenceParameters()
		guard let dictionary = dictionary else { return conferenceParameters }

		conferenceParameters.update(with: dictionary)

		return conferenceParameters
	}

	/// Updates parameters fom react model.
	/// - Parameter dictionary: react model dictionary
	func update(with dictionary: [String: Any]?) {
		guard let dictionary = dictionary else { return }

		let liveRecording: NSNumber? = dictionary.value(for: Keys.liveRecording)
		let stats: NSNumber? = dictionary.value(for: Keys.stats)
		let dolbyVoice: NSNumber? = dictionary.value(for: Keys.dolbyVoice)

		self.liveRecording = liveRecording?.boolValue ?? false
		self.rtcpMode = dictionary.value(for: Keys.rtcpMode)
		self.stats = stats?.boolValue ?? false
		self.ttl = dictionary.value(for: Keys.ttl)
		self.videoCodec = dictionary.value(for: Keys.videoCodec)
		self.dolbyVoice = dolbyVoice?.boolValue ?? false
	}
}

// MARK: - ReactModelMappable
extension VTConferenceParameters: ReactModelMappable {

	func toReactModel() -> ReactModelType {
		return [
			Keys.liveRecording: NSNumber(value: liveRecording),
			Keys.rtcpMode: rtcpMode ?? NSNull(),
			Keys.stats: NSNumber(value: stats),
			Keys.ttl: ttl ?? NSNull(),
			Keys.videoCodec: videoCodec ?? NSNull(),
			Keys.dolbyVoice: NSNumber(value: dolbyVoice)
		].mapKeysToRawValue()
	}
}

// MARK: - ReactModel Keys
private enum Keys: String {
	case liveRecording, rtcpMode, stats, ttl, videoCodec, dolbyVoice
}


import Foundation
import VoxeetSDK

// MARK: - Supported Events
private enum EventKeys: String, CaseIterable {
	/// Emitted when a video presentation is paused.
	case paused = "EVENT_VIDEOPRESENTATION_PAUSED"
	/// Emitted when a video presentation is resumed.
	case played = "EVENT_VIDEOPRESENTATION_PLAYED"
	/// Emitted when a video presentation is sought.
	case sought = "EVENT_VIDEOPRESENTATION_SOUGHT"
	/// Emitted when a video presentation is started.
	case started = "EVENT_VIDEOPRESENTATION_STARTED"
	/// Emitted when a video presentation is stopped.
	case stopped = "EVENT_VIDEOPRESENTATION_STOPPED"
}

@objc(RNVideoPresentationServiceModule)
public class VideoPresentationServiceModule: ReactEmitter {

	// MARK: - Events Setup
	@objc(supportedEvents)
	override public func supportedEvents() -> [String] {
		return EventKeys.allCases.mapToStrings()
	}

	// MARK: - Methods
	/// Enables the video presentation and starts playing the shared video file.
	/// - Parameters:
	///   - urlString: the URL string that specifies the video file location.
	///   - resolve: returns on success
	///   - reject: returns error on failure
	@objc(start:resolver:rejecter:)
	public func start(
		urlString: String,
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		guard let url = URL(string: urlString) else {
			return ModuleError.noUrlProvided.send(with: reject)
		}

		VoxeetSDK.shared.videoPresentation.start(url: url) { error in
			guard let error = error else {
				resolve(NSNull())
				return
			}
			error.send(with: reject)
		}
	}

	/// Stops the video presentation.
	/// - Parameters:
	///   - resolve: returns on success
	///   - reject: returns error on failure
	@objc(stop:rejecter:)
	public func stop(
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		VoxeetSDK.shared.videoPresentation.stop { error in
			guard let error = error else {
				resolve(NSNull())
				return
			}
			error.send(with: reject)
		}
	}

	/// Resumes the paused video presentation.
	/// - Parameters:
	///   - resolve: returns on success
	///   - reject: returns error on failure
	@objc(play:rejecter:)
	public func play(
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		VoxeetSDK.shared.videoPresentation.play { error in
			guard let error = error else {
				resolve(NSNull())
				return
			}
			error.send(with: reject)
		}
	}

	/// Pauses the video presentation.
	/// - Parameters:
	///   - timestamp: the timestamp that informs when the video needs to be paused, in milliseconds.
	///   - resolve: returns on success
	///   - reject: returns error on failure
	@objc(pause:resolver:rejecter:)
	public func pause(
		timestamp: NSNumber,
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		VoxeetSDK.shared.videoPresentation.pause(timestamp: timestamp.intValue) { error in
			guard let error = error else {
				resolve(NSNull())
				return
			}
			error.send(with: reject)
		}
	}

	/// Allows the presenter to navigate to the specific section of the shared video.
	/// - Parameters:
	///   - timestamp: the timestamp the presenter wants to start playing the video from, in milliseconds.
	///   - resolve: returns on success
	///   - reject: returns error on failure
	@objc(seek:resolver:rejecter:)
	public func seek(
		timestamp: NSNumber,
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		VoxeetSDK.shared.videoPresentation.seek(timestamp: timestamp.intValue) { error in
			guard let error = error else {
				resolve(NSNull())
				return
			}
			error.send(with: reject)
		}
	}
}

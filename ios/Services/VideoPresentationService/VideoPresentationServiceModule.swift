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

	public override func startObserving() {
		super.startObserving()
		VoxeetSDK.shared.videoPresentation.delegate = self;
	}

	public override func stopObserving() {
		super.stopObserving()
		VoxeetSDK.shared.videoPresentation.delegate = nil;
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

	// MARK: - Getters
	/// Returns information about the current video presentation.
	/// Use this accessor if you wish to receive information that is available in the VTVideoPresentation object,
	/// such as information about the participant who shares the video, the current timestamp, or the URL of the presented video file.
	/// - Parameters:
	///   - resolve: returns VideoPresentation object on success
	///   - reject: returns error on failure
	@objc(current:rejecter:)
	public func current(
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		guard let videoPresentation = VoxeetSDK.shared.videoPresentation.current else {
			ModuleError.noCurrenVideoPresentation.send(with: reject)
			return
		}
		resolve(videoPresentation.toReactModel())
	}

	/// Provides the current state of the video presentation.
	/// - Parameters:
	///   - resolve: returns VideoPresentationState object on success
	///   - reject: returns error on failure
	@objc(state:rejecter:)
	public func state(
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		resolve(VoxeetSDK.shared.videoPresentation.state.toReactModelValue() ?? NSNull())
	}
}

// MARK: - VTVideoPresentationDelegate
extension VideoPresentationServiceModule: VTVideoPresentationDelegate {

	public func started(videoPresentation: VTVideoPresentation) {
		send(
			event: EventKeys.started,
			body: videoPresentation.toReactModel()
		)
	}

	public func stopped(videoPresentation: VTVideoPresentation) {
		send(
			event: EventKeys.stopped,
			body: videoPresentation.toReactModel()
		)
	}

	public func played(videoPresentation: VTVideoPresentation) {
		send(
			event: EventKeys.played,
			body: videoPresentation.toReactModel()
		)
	}

	public func paused(videoPresentation: VTVideoPresentation) {
		send(
			event: EventKeys.paused,
			body: videoPresentation.toReactModel()
		)
	}

	public func sought(videoPresentation: VTVideoPresentation) {
		send(
			event: EventKeys.sought,
			body: videoPresentation.toReactModel()
		)
	}
}

import Foundation
import VoxeetSDK

@objc(RNRecordingServiceModule)
public class RecordingServiceModule: NSObject {

	@Atomic
	private var currentRecording: RecordingModel?

	/// Returns information about the current recording.
	/// - Parameters:
	///   - resolve: eturns current recording object
	///   - reject: returns error on failure
	@objc(current:rejecter:)
	public func current(
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		guard let currentRecording = currentRecording else {
			ModuleError.notRecording.send(with: reject)
			return
		}

		resolve(currentRecording.toReactModel())
	}

	/// Starts recording a conference.
	/// - Parameters:
	///   - resolve: returns on success
	///   - reject: returns error on failure
	@objc(start:rejecter:)
	public func start(
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		VoxeetSDK.shared.recording.delegate = self
		VoxeetSDK.shared.recording.start(fireInterval: Constants.fireInterval) { error in
			guard let error = error else {
				resolve(NSNull())
				return
			}
			error.send(with: reject)
		}
	}

	/// Stops recording a conference.
	/// - Parameters:
	///   - resolve: returns on success
	///   - reject: returns error on failure
	@objc(stop:rejecter:)
	public func stop(
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		VoxeetSDK.shared.recording.stop { error in
			guard let error = error else {
				resolve(NSNull())
				return
			}
			error.send(with: reject)
		}
	}

}

// MARK: - VTRecordingDelegate
extension RecordingServiceModule: VTRecordingDelegate {

	public func recordingStatusUpdated(
		status: VTRecordingStatus,
		participant: VTParticipant?,
		startTimestamp: NSNumber?
	) {
		switch status {
		case .recording:
			currentRecording = RecordingModel(
				participantId: participant?.id,
				startTimestamp: startTimestamp
			)
		case .notRecording:
			currentRecording = nil
		@unknown default:
			break
		}
	}
}

// MARK: - Constants
private struct Constants {
	static let fireInterval: Int = 0
}

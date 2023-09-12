import Foundation
import VoxeetSDK

// MARK: - Supported Events
private enum EventKeys: String, CaseIterable {
	/// Emitted when a recording status changes.
	case statusUpdated = "EVENT_RECORDING_STATUS_UPDATED"
}

@objc(RNRecordingServiceModule)
public class RecordingServiceModule: ReactEmitter {

    @objc public override static func requiresMainQueueSetup() -> Bool {
        return false
    }

	@Atomic
	private var currentRecording: RecordingModel?

    // MARK: - Events Setup
    @objc(supportedEvents)
    override public func supportedEvents() -> [String] {
        return EventKeys.allCases.mapToStrings()
    }

    public override func startObserving() {
        super.startObserving()
        VoxeetSDK.shared.recording.delegate = self;
    }

    public override func stopObserving() {
        super.stopObserving()
        VoxeetSDK.shared.recording.delegate = nil;
    }

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

        send(
            event: EventKeys.statusUpdated,
            body: RecordingUpdateDTO(
                recordingStatus: status,
                conferenceId: VoxeetSDK.shared.conference.current?.id,
                participantId: participant?.id,
                timestamp: startTimestamp
            ).toReactModel()
        )
    }
}

// MARK: - Constants
private struct Constants {
	static let fireInterval: Int = 0
}

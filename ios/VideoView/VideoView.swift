import Foundation
import VoxeetSDK
import UIKit

/// VTVideoView wrapper
public class VideoView: VTVideoView {

	/// Emitted when a command returns a value
	@objc public var onCommandEvent: RCTBubblingEventBlock?

	// MARK: - Properties

	/// Enable or disable a mirror effect.
	@objc public var isMirror: Bool = false {
		didSet {
			mirrorEffect = isMirror
		}
	}

	/// Allows changing video scaling type with "fill" or "fit" value
	@objc public var scaleType: String = "" {
		didSet {
			let type = ScaleType(rawValue: scaleType) ?? .fit
			contentFill = type == .fill
		}
	}

	/// Represents command event callback keys
	private enum CommandEventKey: String {
		case requestId
		case result
	}

	/// Represents view scale type
	private enum ScaleType: String {
		case fit
		case fill
	}

	// MARK: - Commands

	internal func attach(participantId: String?, streamId: String?) -> Bool {
		guard let participantId = participantId,
					let streamId = streamId,
					let participant = VoxeetSDK.shared.conference.current?.findParticipant(with: participantId),
					let stream = participant.streams.first(where: { $0.streamId == streamId }),
					!stream.videoTracks.isEmpty
		else { return false }

		attach(participant: participant, stream: stream)

		return true
	}

	internal func detach() -> Bool {
		unattach()
		return true
	}

	internal func isAttached() -> Bool {
		return userID != nil
	}

	/// Sends back the command result
	/// - Parameters:
	///   - dispatchId: the command id
	///   - result: the command result
	internal func sendCommandResultEvent(dispatchId: NSNumber, result: Bool) {
		guard let onCommandEvent = onCommandEvent else { return }
		onCommandEvent(
			[
				CommandEventKey.requestId: dispatchId,
				CommandEventKey.result: result,
			].mapKeysToRawValue()
		)
	}
}

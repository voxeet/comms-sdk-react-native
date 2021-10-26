import Foundation
import VoxeetSDK

// MARK: - Supported Events
private enum EventKeys: String, CaseIterable {
	case messageReceived = "EVENT_COMMAND_MESSAGE_RECEIVED"
}

@objc(RNCommandServiceModule)
public class CommandServiceModule: ReactEmitter {

	// MARK: - Events Setup
	@objc(supportedEvents)
	override public func supportedEvents() -> [String] {
		return EventKeys.allCases.mapToStrings()
	}

	public override func startObserving() {
		super.startObserving()
		VoxeetSDK.shared.command.delegate = self;
	}

	public override func stopObserving() {
		super.stopObserving()
		VoxeetSDK.shared.command.delegate = nil;
	}

	/// Sends a message to all conference participants.
	/// - Parameters:
	///   - message: message to send
	///   - resolve: returns on success
	///   - reject: returns error on failure
	@objc(send:resolver:rejecter:)
	public func send(
		message: String,
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		VoxeetSDK.shared.command.send(message: message) { error in
			guard let error = error else {
				resolve(NSNull())
				return
			}
			error.send(with: reject)
		}
	}
}

extension CommandServiceModule: VTCommandDelegate {

	public func received(participant: VTParticipant, message: String) {
		send(
			event: EventKeys.messageReceived,
			body: MessageDTO(
				participant: participant,
				message: message
			).toReactModel()
		)
	}
}

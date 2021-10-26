import Foundation
import VoxeetSDK

// MARK: - Supported Events
private enum EventKeys: String, CaseIterable {
	/// Emitted when the application user received an invitation.
	case invitationReceived = "EVENT_NOTIFICATION_INVITATION_RECEIVED"
}

@objc(RNNotificationServiceModule)
public class NotificationServiceModule: ReactEmitter {

	// MARK: - Events Setup
	@objc(supportedEvents)
	override public func supportedEvents() -> [String] {
		return EventKeys.allCases.mapToStrings()
	}

	public override func startObserving() {
		super.startObserving()
		VoxeetSDK.shared.notification.delegate = self;
	}

	public override func stopObserving() {
		super.stopObserving()
		VoxeetSDK.shared.notification.delegate = nil;
	}

	/// Notifies conference participants about a conference invitation.
	/// - Parameters:
	///   - conference: The conference object.
	///   - participants: Information about the invited application users.
	///   - resolve: returns on success
	///   - reject: returns error on failure
	@objc(invite:participants:resolver:rejecter:)
	public func invite(
		conference: [String: Any],
		participants: [[String: Any]],
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		guard let conferenceId = conference.identifier else {
			ModuleError.noConferenceId.send(with: reject)
			return
		}
		VoxeetSDK.shared.conference.fetch(conferenceID: conferenceId) { conference in
			VoxeetSDK.shared.notification.invite(
				conference: conference,
				participantInfos: participants.map { VTParticipantInfo.create(with: $0) }) { error in
					guard let error = error else {
						resolve(NSNull())
						return
					}
					error.send(with: reject)
			}
		}
	}

	/// Declines the conference invitation.
	/// - Parameters:
	///   - conference: The conference object.
	///   - resolve: returns on success
	///   - reject: returns error on failure
	@objc(decline:resolver:rejecter:)
	public func decline(
		conference: [String: Any],
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		guard let conferenceId = conference.identifier else {
			ModuleError.noConferenceId.send(with: reject)
			return
		}
		VoxeetSDK.shared.conference.fetch(conferenceID: conferenceId) { conference in
			VoxeetSDK.shared.notification.decline(conference: conference) { error in
				guard let error = error else {
					resolve(NSNull())
					return
				}
				error.send(with: reject)
			}
		}
	}
}

extension NotificationServiceModule: VTNotificationDelegate {

	public func invitationReceived(notification: VTInvitationReceivedNotification) {
		send(
			event: EventKeys.invitationReceived,
			body: notification.toReactModel()
		)
	}

	public func conferenceStatus(notification: VTConferenceStatusNotification) {}
	public func conferenceCreated(notification: VTConferenceCreatedNotification) {}
	public func conferenceEnded(notification: VTConferenceEndedNotification) {}
	public func participantJoined(notification: VTParticipantJoinedNotification) {}
	public func participantLeft(notification: VTParticipantLeftNotification) {}
}

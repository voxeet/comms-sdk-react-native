import Foundation
import VoxeetSDK

// MARK: - Supported Events
private enum EventKeys: String, CaseIterable {
	/// Emitted when the application user received an invitation.
	case invitationReceived = "EVENT_NOTIFICATION_INVITATION_RECEIVED"
    case activeParticipants = "EVENT_NOTIFICATION_ACTIVE_PARTICIPANTS"
    case conferenceStatus = "EVENT_NOTIFICATION_CONFERENCE_STATUS"
    case conferenceCreated = "EVENT_NOTIFICATION_CONFERENCE_CREATED"
    case conferenceEnded = "EVENT_NOTIFICATION_CONFERENCE_ENDED"
    case participantJoined = "EVENT_NOTIFICATION_PARTICIPANT_JOINED"
    case participantLeft = "EVENT_NOTIFICATION_PARTICIPANT_LEFT"
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

    /// Subscribes to the specified notifications.
    /// - Parameters:
    ///   - events: An array of the subscribed subscription types.
    ///   - resolve: returns on success
    ///   - reject: returns error on failure
    @objc(subscribe:resolver:rejecter:)
    public func subscribe(events: [[String: Any]],
                          resolve: @escaping RCTPromiseResolveBlock,
                          reject: @escaping RCTPromiseRejectBlock) {
        VoxeetSDK.shared.notification.subscribe(subscriptions: events.compactMap { SubscriptionDTO.create(with:$0)?.subscription() })
    }

    /// Unsubscribes from the specified notifications.
    /// - Parameters:
    ///   - events: An array of the subscribed subscription types.
    ///   - resolve: returns on success
    ///   - reject: returns error on failure
    @objc(unsubscribe:resolver:rejecter:)
    public func unsubscribe(events: [[String: Any]],
                            resolve: @escaping RCTPromiseResolveBlock,
                            reject: @escaping RCTPromiseRejectBlock) {
        VoxeetSDK.shared.notification.unsubscribe(subscriptions: events.compactMap { SubscriptionDTO.create(with:$0)?.subscription() })
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
				participantsInvited: participants.map { VTParticipantInvited.create(with: $0) }) { error in
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

    public func activeParticipants(notification: VTActiveParticipantsNotification) {
        send(
            event: EventKeys.activeParticipants,
            body: notification.toReactModel()
        )
    }

    public func conferenceStatus(notification: VTConferenceStatusNotification) {
        send(
            event: EventKeys.conferenceStatus,
            body: notification.toReactModel()
        )
    }

    public func conferenceCreated(notification: VTConferenceCreatedNotification) {
        send(
            event: EventKeys.conferenceCreated,
            body: notification.toReactModel()
        )
    }

    public func conferenceEnded(notification: VTConferenceEndedNotification) {
        send(
            event: EventKeys.conferenceEnded,
            body: notification.toReactModel()
        )
    }

    public func participantJoined(notification: VTParticipantJoinedNotification) {
        send(
            event: EventKeys.participantJoined,
            body: notification.toReactModel()
        )
    }
    
    public func participantLeft(notification: VTParticipantLeftNotification) {
        send(
            event: EventKeys.participantLeft,
            body: notification.toReactModel()
        )
    }
}

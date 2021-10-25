import Foundation
import VoxeetSDK

@objc(RNNotificationServiceModule)
public class NotificationServiceModule: NSObject {

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

import Foundation
import VoxeetSDK

@objc(RNSessionServiceModule)
public class SessionServiceModule: NSObject {

	/// Opens a new session.
	/// - Parameters:
	///   - userInfo: user info
	///   - resolve: eturns on success
	///   - reject: returns error on failure
	@objc(open:resolver:rejecter:)
	public func open(
		userInfo: [String: Any],
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		let participantInfo = VTParticipantInfo.create(with: userInfo)
		VoxeetSDK.shared.session.open(info: participantInfo) { error in
			guard let error = error else {
				resolve(NSNull())
				return
			}
			error.send(with: reject)
		}
	}

	/// Closes the current session.
	/// Close a session is like a logout, it will stop the socket and stop sending VoIP push notification.
	/// - Parameters:
	///   - resolve:  returns on success
	///   - reject: returns error on failure
	@objc(close:rejecter:)
	public func close(
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		VoxeetSDK.shared.session.close { error in
			guard let error = error else {
				resolve(NSNull())
				return
			}
			error.send(with: reject)
		}
	}

	/// Provides current session user.
	/// - Parameters:
	///   - resolve: returns on success
	///   - reject: returns error on failure
	@objc(getParticipant:rejecter:)
	public func getParticipant(
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		if let participant = VoxeetSDK.shared.session.participant {
			resolve(participant.toReactModel())
		} else {
			ModuleError.noCurrentParticipant.send(with: reject)
		}
	}

	/// Checks whether there is an open session that connects SDK with backend.
	/// - Parameters:
	///   - resolve: returns BOOL on success
	///   - reject: returns error on failure
	@objc(isOpen:rejecter:)
	public func isOpen(
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		resolve(NSNumber(value: VoxeetSDK.shared.session.isOpen))
	}
}


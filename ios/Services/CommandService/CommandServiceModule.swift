import Foundation
import VoxeetSDK

@objc(RNCommandServiceModule)
public class CommandServiceModule: NSObject {

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

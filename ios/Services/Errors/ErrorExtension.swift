import Foundation

internal extension Error {

	func send(with reject: RCTPromiseRejectBlock) {
		reject("error", localizedDescription, self)
	}
}

import Foundation

internal extension NSError {

	func send(with reject: RCTPromiseRejectBlock) {
		reject("error", localizedDescription, self)
	}
}

import Foundation

/// Represents the React EventEmitter
public class ReactEmitter: RCTEventEmitter {

	private var hasListeners: Bool = false

	public override func supportedEvents() -> [String] {
		return super.supportedEvents()
	}

	public override func startObserving() {
		super.startObserving()
		hasListeners = true
	}

	public override func stopObserving() {
		super.stopObserving()
		hasListeners = false
	}

	public func send<E: RawRepresentable>(event: E, body: Any) where E.RawValue == String {
		guard hasListeners else { return }
		sendEvent(withName: event.rawValue, body: body)
	}
}

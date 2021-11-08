import Foundation

/// Exposes native view to React Native and allows manipulating it.
@objc(RNVideoViewManager)
public class VideoViewManager: RCTViewManager {

	// MARK: - RCTViewManager

	public override class func requiresMainQueueSetup() -> Bool {
		return true
	}

	override public func view() -> UIView! {
		return VideoView()
	}

	// MARK: - Commands

	@objc(attach:dispatchId:participantId:streamId:)
	public func attach(reactTag: NSNumber, dispatchId: NSNumber, participantId: String?, streamId: String?) {
		getComponent(with: reactTag) { component in
			component.sendCommandResultEvent(
				dispatchId: dispatchId,
				result: component.attach(participantId: participantId, streamId: streamId)
			)
		}
	}

	@objc(detach:dispatchId:)
	public func detach(reactTag: NSNumber, dispatchId: NSNumber) {
		getComponent(with: reactTag) { component in
			component.sendCommandResultEvent(
				dispatchId: dispatchId,
				result: component.detach()
			)
		}
	}

	@objc(isAttached:dispatchId:)
	public func isAttached(reactTag: NSNumber, dispatchId: NSNumber) {
		getComponent(with: reactTag) { component in
			component.sendCommandResultEvent(
				dispatchId: dispatchId,
				result: component.isAttached()
			)
		}
	}
}

private extension VideoViewManager {
	
	func getComponent(
		with reactTag: NSNumber,
		completion: @escaping (_ component: VideoView) -> Void
	) {
		bridge.uiManager.addUIBlock { uiManager, viewRegistry in
			guard let viewRegistry = viewRegistry,
						let component = viewRegistry[reactTag] as? VideoView
			else { return }
			completion(component)
		}
	}
}

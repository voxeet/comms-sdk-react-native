import Foundation
import VoxeetSDK

@objc(RNAudioPreviewServiceModule)
public class AudioPreviewServiceModule: ReactEmitter {
	
	public override init() {
		super.init()
		VoxeetSDK.shared.audio.local.preview.onStatusChanged
			= { [weak self] (_ status: AudioPreviewStatus) -> Void in
				guard let status = status.toReactModelValue() else {
					return
				}
				self?.send(
					event: EventKeys.onStatusChanged,
					body: status
				)
			}
	}
	
	@objc(status:rejecter:)
	public func status(
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		guard
			let status = VoxeetSDK.shared.audio.local.preview.status.toReactModelValue()
		else {
			ModuleError.invalidAudioCaptureStatus.send(with: reject)
			return
		}
		resolve(status)
	}

	
	@objc(getCaptureMode:rejecter:)
	public func getCaptureMode(
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		resolve(VoxeetSDK.shared.audio.local.preview.captureMode.toReactModel())
	}

	@objc(setCaptureMode:resolver:rejecter:)
	public func setCaptureMode(
		options: [String: Any],
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		guard let captureMode = AudioCaptureMode.create(with: options) else {
			ModuleError.invalidAudioCaptureModeData(options).send(with: reject)
			return
		}
		VoxeetSDK.shared.audio.local.preview.captureMode = captureMode
		resolve(nil)
	}

	@objc(play:resolver:rejecter:)
	public func play(
		loop: Bool,
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		VoxeetSDK.shared.audio.local.preview.play { error in
			guard let error = error else {
				resolve(nil)
				return
			}
			error.send(with: reject)
		}
	}

	@objc(record:resolver:rejecter:)
	public func record(
		duration: NSNumber,
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		VoxeetSDK.shared.audio.local.preview.record(
			duration: duration.intValue
		) { error in
			guard let error = error else {
				resolve(nil)
				return
			}
			error.send(with: reject)
		}
	}

	@objc(stop:rejecter:)
	public func stop(
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
        if !VoxeetSDK.shared.audio.local.preview.stop() {
            ModuleError.audioPreviewGenericError.send(with: reject)
        }
		resolve(nil)
	}
	
	@objc(release:rejecter:)
	public func release(
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		VoxeetSDK.shared.audio.local.preview.release()
		resolve(nil)
	}
	
	public override func supportedEvents() -> [String] {
		return EventKeys.allCases.mapToStrings()
	}
}

private enum EventKeys: String, CaseIterable {
	/// Emitted when a new participant is invited to a conference or joins a conference.
	case onStatusChanged = "EVENT_AUDIO_PREVIEW_STATUS_CHANGED"
}

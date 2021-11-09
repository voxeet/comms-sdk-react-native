import Foundation
import VoxeetSDK

@objc(RNMediaDeviceServiceModule)
public class MediaDeviceServiceModule: NSObject {

	/// Changes the device camera (front or back).
	/// - Parameters:
	///   - resolve: returns on success
	///   - reject: returns error on failure
	@objc(switchCamera:rejecter:)
	public func switchCamera(
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		VoxeetSDK.shared.mediaDevice.switchCamera {
			resolve(NSNull())
		}
	}

	/// Switches the current speaker to another available speaker that is connected to the device.
	/// - Parameters:
	///   - resolve: returns on success
	///   - reject: returns error on failure
	@objc(switchSpeaker:rejecter:)
	public func switchSpeaker(
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		VoxeetSDK.shared.mediaDevice.switchDeviceSpeaker()
		resolve(NSNull())
	}

	/// Checks if the application uses the front-facing (true) or back-facing camera (false).
	/// - Parameters:
	///   - resolve: returns on success
	///   - reject: returns error on failure
	@objc(isFrontCamera:rejecter:)
	public func isFrontCamera(
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		resolve(VoxeetSDK.shared.mediaDevice.isFrontCamera)
	}

	/// Retrieves the comfort noise level setting for output devices in Dolby Voice conferences.
	/// - Parameters:
	///   - resolve: returns ComfortNoiseLevel on success
	///   - reject: returns error on failure
	@objc(getComfortNoiseLevel:rejecter:)
	public func getComfortNoiseLevel(
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		VoxeetSDK.shared.mediaDevice.getComfortNoiseLevel { noiseLevel, error in
			guard let error = error else {
				resolve(noiseLevel.toReactModelValue())
				return
			}
			error.send(with: reject)
		}
	}

	/// Configures the comfort noise level for output devices in Dolby Voice conferences.
	/// - Parameters:
	///   - noiseLevel: The selected comfort noise level.
	///   - resolve: returns ComfortNoiseLevel on success
	///   - reject: returns error on failure
	@objc(setComfortNoiseLevel:resolver:rejecter:)
	public func setComfortNoiseLevel(
		noiseLevel: String,
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		guard let mediaEngineComfortNoiseLevel = MediaEngineComfortNoiseLevel.fromReactModel(value: noiseLevel) else {
			ModuleError.unsupportedNoiseLevel(noiseLevel).send(with: reject)
			return
		}
		VoxeetSDK.shared.mediaDevice.setComfortNoiseLevel(comfortNoise: mediaEngineComfortNoiseLevel) { error in
				guard let error = error else {
					resolve(NSNull())
					return
				}
				error.send(with: reject)
			}
	}
}

import Foundation
import VoxeetSDK

@objc(RNLocalAudioServiceModule)
public class LocalAudioServiceModule: NSObject {

    /// Returns the local participant's audio capture mode in Dolby Voice conferences.
    /// - Parameters:
    ///   - resolve: returns ComfortNoiseLevel on success
    ///   - reject: returns error on failure
    @objc(getCaptureMode:rejecter:)
    public func getCaptureMode(
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        resolve(VoxeetSDK.shared.audio.local.captureMode?.toReactModel())
    }

    /// Sets the local participant's audio capture mode in Dolby Voice conferences.
    /// - Parameters:
    ///   - options: autio capture options
    ///   - resolve: returns ComfortNoiseLevel on success
    ///   - reject: returns error on failure
    @objc(setCaptureMode:resolver:rejecter:)
    public func setCaptureMode(
        options: [String: Any],
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        VoxeetSDK.shared.audio.local.captureMode = AudioCaptureMode.create(with: options)
        resolve(nil)
    }

    /// Returns the comfort noise level setting for output devices in Dolby Voice conferences.
    /// - Parameters:
    ///   - resolve: returns ComfortNoiseLevel on success
    ///   - reject: returns error on failure
    @objc(getComfortNoiseLevel:rejecter:)
    public func getComfortNoiseLevel(
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        VoxeetSDK.shared.audio.local.getComfortNoiseLevel { noiseLevel, error in
            guard let error = error else {
                resolve(noiseLevel?.toReactModelValue())
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
        guard let comfortNoiseLevel = ComfortNoiseLevel.fromReactModel(value: noiseLevel) else {
            ModuleError.unsupportedNoiseLevel(noiseLevel).send(with: reject)
            return
        }
        VoxeetSDK.shared.audio.local.setComfortNoiseLevel(comfortNoiseLevel) { error in
            guard let error = error else {
                resolve(NSNull())
                return
            }
            error.send(with: reject)
        }
    }

    /// Starts sending the local participant’s audio streams from the local client to the conference.
    /// - Parameters:
    ///   - resolve: returns on success
    ///   - reject: returns error on failure
    @objc(start:rejecter:)
    public func start(
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        VoxeetSDK.shared.audio.local.start { error in
            guard let error = error else {
                resolve(NSNull())
                return
            }
            error.send(with: reject)
        }
    }

    /// Stops sending local participant’s audio from the local client to the conference.
    /// - Parameters:
    ///   - resolve: returns on success
    ///   - reject: returns error on failure
    @objc(stop:rejecter:)
    public func stop(
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        VoxeetSDK.shared.audio.local.stop { error in
            guard let error = error else {
                resolve(NSNull())
                return
            }
            error.send(with: reject)
        }
    }
}

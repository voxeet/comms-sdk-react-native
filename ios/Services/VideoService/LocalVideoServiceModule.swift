import Foundation
import VoxeetSDK

@objc(RNLocalVideoServiceModule)
public class LocalVideoServiceModule: NSObject {

    /// Enables the local participant's video and sends the video to a conference.
    /// - Parameters:
    ///   - resolve: returns on success
    ///   - reject: returns error on failure
    @objc(start:rejecter:)
    public func start(
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        VoxeetSDK.shared.video.local.start { error in
            guard let error = error else {
                resolve(NSNull())
                return
            }
            error.send(with: reject)
        }
    }

    /// Disables the local participant's video and stops sending the video to a conference.
    /// - Parameters:
    ///   - resolve: returns on success
    ///   - reject: returns error on failure
    @objc(stop:rejecter:)
    public func stop(
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        VoxeetSDK.shared.video.local.stop { error in
            guard let error = error else {
                resolve(NSNull())
                return
            }
            error.send(with: reject)
        }
    }
}

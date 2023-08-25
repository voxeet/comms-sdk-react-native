import Foundation
import VoxeetSDK

@objc(RNRemoteVideoServiceModule)
public class RemoteVideoServiceModule: NSObject {

    @objc public static func requiresMainQueueSetup() -> Bool {
        return false
    }

    /// If the local participant used the stop method to stop receiving video streams from selected remote participants.
    /// - Parameters:
    ///   - participant: The selected remote participant who is locally muted through the stop method.
    ///   - resolve: returns on success
    ///   - reject: returns error on failure
    @objc(start:resolver:rejecter:)
    public func start(
        participant: [String: Any],
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        guard let participantObject = VoxeetSDK.shared.conference.current?.findParticipant(with: participant.identifier) else {
            ModuleError.noParticipant(participant.description).send(with: reject)
            return
        }
        VoxeetSDK.shared.video.remote.start(participant: participantObject) { error in
            guard let error = error else {
                resolve(NSNull())
                return
            }
            error.send(with: reject)
        }
    }

    /// Allows the local participant to stop receiving video from specific remote participants.
    /// - Parameters:
    ///   - participant: The selected remote participant who should be locally muted.
    ///   - resolve: returns on success
    ///   - reject: returns error on failure
    @objc(stop:resolver:rejecter:)
    public func stop(
        participant: [String: Any],
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        guard let participantObject = VoxeetSDK.shared.conference.current?.findParticipant(with: participant.identifier) else {
            ModuleError.noParticipant(participant.description).send(with: reject)
            return
        }
        VoxeetSDK.shared.video.remote.stop(participant: participantObject) { error in
            guard let error = error else {
                resolve(NSNull())
                return
            }
            error.send(with: reject)
        }
    }
}

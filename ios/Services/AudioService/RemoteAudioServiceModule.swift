import Foundation
import VoxeetSDK

@objc(RNRemoteAudioServiceModule)
public class RemoteAudioServiceModule: NSObject {

    /// Allows the local participant to unmute a specific remote participant who is locally muted through the stop method.
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
        VoxeetSDK.shared.audio.remote.start(participant: participantObject) { error in
            guard let error = error else {
                resolve(NSNull())
                return
            }
            error.send(with: reject)
        }
    }

    /// Allows the local participant to locally mute specific remote participants.
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
        VoxeetSDK.shared.audio.remote.stop(participant: participantObject) { error in
            guard let error = error else {
                resolve(NSNull())
                return
            }
            error.send(with: reject)
        }
    }
}

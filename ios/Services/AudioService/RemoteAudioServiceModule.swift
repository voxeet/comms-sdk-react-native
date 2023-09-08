import Foundation
import VoxeetSDK

@objc(RNRemoteAudioServiceModule)
public class RemoteAudioServiceModule: NSObject {

    @objc public static func requiresMainQueueSetup() -> Bool {
        return false
    }

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
    
    /// Sets the volume of a selected participant in non-Dolby Voice conferences to a preferred value between 0 and 1.
    /// - Parameters:
    ///   - participant: The selected remote participant who should be locally muted.
    ///   - volume: The preferred volume level between 0 (no audio) and 1 (full volume).
    ///   - resolve: returns on success
    ///   - reject: returns error on failure
    @objc(setParticipantVolume:volume:resolver:rejecter:)
    public func setParticipantVolume(
        participant: [String: Any],
        volume: Float,
        resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        guard let participantObject = VoxeetSDK.shared.conference.current?.findParticipant(with: participant.identifier) else {
            ModuleError.noParticipant(participant.description).send(with: reject)
            return
        }
        let result = VoxeetSDK.shared.audio.remote.setVolume(participant: participantObject, volume: volume)
        resolve(result)
    }
}

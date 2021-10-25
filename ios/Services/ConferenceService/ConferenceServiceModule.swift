import Foundation
import VoxeetSDK

@objc(RNConferenceServiceModule)
public class ConferenceServiceModule: NSObject {
	
	var current: VTConference? {
		VoxeetSDK.shared.conference.current
	}
	
	/// Creates a conference.
	/// - Parameters:
	///   - options: conference options
	///   - resolve: returns conference object
	///   - reject: returns error on failure
	@objc(create:resolver:rejecter:)
	public func create(
		options: [String: Any]?,
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		VoxeetSDK.shared.conference.create(options: VTConferenceOptions.create(with: options)) { conference in
			resolve(conference.toReactModel())
		} fail: { error in
			error.send(with: reject)
		}
	}
	
	/// Provides the conference object that allows joining a conference.
	/// - Parameters:
	///   - conferenceId: conference id
	///   - resolve: returns on success
	///   - reject: returns error on failure
	@objc(fetch:resolver:rejecter:)
	public func fetch(
		conferenceId: String,
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		VoxeetSDK.shared.conference.fetch(conferenceID: conferenceId) { conference in
			resolve(conference.toReactModel())
		}
	}
	
	/// Joins a conference.
	/// - Parameters:
	///   - conference: conference object
	///   - options: join options
	///   - resolve: returns on success
	///   - reject: returns error on failure
	@objc(join:options:resolver:rejecter:)
	public func join(
		conference: [String: Any],
		options: [String: Any]?,
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		guard let conferenceId = conference.identifier else {
			ModuleError.noConferenceId.send(with: reject)
			return
		}
		VoxeetSDK.shared.conference.fetch(conferenceID: conferenceId) { conference in
			VoxeetSDK.shared.conference.join(
				conference: conference,
				options: VTJoinOptions.create(with: options)) { conference in
					resolve(conference.toReactModel())
				} fail: { error in
					error.send(with: reject)
				}
		}
	}
	
	/// Kicks the participant from a conference.
	/// - Parameters:
	///   - participant: Remote participant to kick.
	///   - resolve: returns current conference object
	///   - reject: returns error on failure
	@objc(kick:resolver:rejecter:)
	public func kick(
		participant: [String: Any],
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		guard let participantObject = current?.findParticipant(with: participant.identifier) else {
			ModuleError.noParticipant(participant.description).send(with: reject)
			return
		}
		VoxeetSDK.shared.conference.kick(participant: participantObject) { error in
			guard let error = error else {
				resolve(NSNull())
				return
			}
			error.send(with: reject)
		}
	}
	
	/// Leaves the current conference.
	/// - Parameters:
	///   - resolve: returns current conference object
	///   - reject: returns error on failure
	@objc(leave:rejecter:)
	public func leave(
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		VoxeetSDK.shared.conference.leave { error in
			guard let error = error else {
				resolve(NSNull())
				return
			}
			error.send(with: reject)
		}
	}
	
	/// Replays the conference.
	/// - Parameters:
	///   - conference: conference object
	///   - replayOptions: The replay options.
	///   - mixingOptions: The object that notifies the server that a participant who replays the conference is a special participant called Mixer.
	///   - resolve: returns current conference object
	///   - reject: returns error on failure
	@objc(replay:replayOptions:mixingOptions:resolver:rejecter:)
	public func replay(
		conference: [String: Any],
		replayOptions: [String: Any]?,
		mixingOptions: [String: Any]?,
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		guard let conferenceId = conference.identifier else {
			ModuleError.noConferenceId.send(with: reject)
			return
		}
		VoxeetSDK.shared.conference.fetch(conferenceID: conferenceId) { conference in
			VoxeetSDK.shared.conference.replay(
				conference: conference,
				options: VTReplayOptions.create(with: replayOptions)) { error in
					guard let error = error else {
						resolve(NSNull())
						return
					}
					error.send(with: reject)
				}
		}
	}
	
	// MARK: - User Actions
	
	/// Updates the participant's conference permissions.
	/// - Parameters:
	///   - participantPermissions: The updated participant's permissions.
	///   - resolve: returns on success
	///   - reject: returns error on failure
	@objc(updatePermissions:resolver:rejecter:)
	public func updatePermissions(
		participantPermissions: [[String: Any]],
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		let permissions: [VTParticipantPermissions] = participantPermissions.compactMap {
			guard let participant = $0.participant,
				  let permissions = $0.permissions,
				  let conferenceParticipant = current?.findParticipant(with: participant.identifier) else {
					  return nil
				  }
			let conferencePermissions = permissions.compactMap { VTConferencePermission(rawValue: $0.intValue) }
			return VTParticipantPermissions(participant: conferenceParticipant,
											permissions: conferencePermissions)
		}
		VoxeetSDK.shared.conference.updatePermissions(participantPermissions: permissions) { error in
			guard let error = error else {
				resolve(NSNull())
				return
			}
			error.send(with: reject)
		}
	}
	
	/// Starts audio transmission between the local client and a conference.
	/// - Parameters:
	///   - participant: the participant you want to mute.
	///   - resolve: returns on success
	///   - reject: returns error on failure
	@objc(startAudio:resolver:rejecter:)
	public func startAudio(
		participant: [String: Any],
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		VoxeetSDK.shared.conference.startAudio(
			participant: current?.findParticipant(with: participant.identifier)
		) { error in
			guard let error = error else {
				resolve(NSNull())
				return
			}
			error.send(with: reject)
		}
	}
	
	/// Notifies the server to either start sending the local participant's video stream to the conference or start sending a remote participant's video stream to the local participant.
	/// - Parameters:
	///   - participant: the selected participant.
	///   - resolve: returns on success
	///   - reject: returns error on failure
	@objc(startVideo:resolver:rejecter:)
	public func startVideo(
		participant: [String: Any],
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		VoxeetSDK.shared.conference.startVideo(
			participant: current?.findParticipant(with: participant.identifier)
		) { error in
			guard let error = error else {
				resolve(NSNull())
				return
			}
			error.send(with: reject)
		}
	}
	
	/// Stops audio transmission between the local client and a conference.
	/// - Parameters:
	///   - participant: the selected participant.
	///   - resolve: returns on success
	///   - reject: returns error on failure
	@objc(stopAudio:resolver:rejecter:)
	public func stopAudio(
		participant: [String: Any],
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		VoxeetSDK.shared.conference.stopAudio(
			participant: current?.findParticipant(with: participant.identifier)
		) { error in
			guard let error = error else {
				resolve(NSNull())
				return
			}
			error.send(with: reject)
		}
	}
	
	/// Notifies the server to either stop sending the local participant's video stream to the conference or stop sending a remote participant's video stream to the local participant.
	/// - Parameters:
	///   - participant: the selected participant.
	///   - resolve: returns on success
	///   - reject: returns error on failure
	@objc(stopVideo:resolver:rejecter:)
	public func stopVideo(
		participant: [String: Any],
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		VoxeetSDK.shared.conference.stopVideo(
			participant: current?.findParticipant(with: participant.identifier)
		) { error in
			guard let error = error else {
				resolve(NSNull())
				return
			}
			error.send(with: reject)
		}
	}
	
	// MARK: - Getters
	
	/// Returns information about the current conference.
	/// - Parameters:
	///   - resolve: returns current conference object
	///   - reject: returns error on failure
	@objc(current:rejecter:)
	public func current(
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		guard let conference = current else {
			ModuleError.noCurrentConference.send(with: reject)
			return
		}
		resolve(conference.toReactModel())
	}
	
	/// Gets the participant's audio level. The audio level value ranges from 0.0 to 1.0.
	/// - Parameters:
	///   - participant: participant object
	///   - resolve: returns participant's audio level on success
	///   - reject: returns error on failure
	@objc(getAudioLevel:resolver:rejecter:)
	public func getAudioLevel(
		participant: [String: Any],
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		guard let participantObject = current?.findParticipant(with: participant.identifier) else {
			ModuleError.noParticipant(participant.description).send(with: reject)
			return
		}
		resolve(NSNumber(value: VoxeetSDK.shared.conference.audioLevel(participant: participantObject)))
	}
	
	/// Provides the maximum number of video streams that may be transmitted to the local participant.
	/// - Parameters:
	///   - resolve: returns the maximum number of video streams on success
	///   - reject: returns error on failure
	@objc(getMaxVideoForwarding:rejecter:)
	public func getMaxVideoForwarding(
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		resolve(NSNumber(value: VoxeetSDK.shared.conference.maxVideoForwarding))
	}
	
	/// Provides the participant with participant's id from the current conference.
	/// - Parameters:
	///   - participantId: participant's id
	///   - resolve: returns on success
	///   - reject: returns error on failure
	@objc(getParticipant:resolver:rejecter:)
	public func getParticipant(
		participantId: String,
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		guard let participantObject = current?.findParticipant(with: participantId) else {
			ModuleError.noParticipantId(participantId).send(with: reject)
			return
		}
		resolve(participantObject.toReactModel())
	}
	
	/// Provides the list of participants from the conference.
	/// - Parameters:
	///   - conference: conference object
	///   - resolve: returns on success
	///   - reject: returns error on failure
	@objc(getParticipants:resolver:rejecter:)
	public func getParticipants(
		conference: [String: Any],
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		guard let conferenceId = conference.identifier else {
			ModuleError.noConferenceId.send(with: reject)
			return
		}
		VoxeetSDK.shared.conference.fetch(conferenceID: conferenceId) { conference in
			resolve(conference.participants.map { $0.toReactModel() })
		}
	}
	
	/// Provides the status of the conference.
	/// - Parameters:
	///   - conference: conference object
	///   - resolve: returns on success
	///   - reject: returns error on failure
	@objc(getStatus:resolver:rejecter:)
	public func getStatus(
		conference: [String: Any],
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		guard let conferenceId = conference.identifier else {
			ModuleError.noConferenceId.send(with: reject)
			return
		}
		
		VoxeetSDK.shared.conference.fetch(conferenceID: conferenceId) { conference in
			resolve(conference.status.toReactModelValue)
		}
	}
	
	/// Informs whether a participant is muted.
	/// - Parameters:
	///   - resolve: returns on success
	///   - reject: returns error on failure
	@objc(isMuted:rejecter:)
	public func isMuted(
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		resolve(NSNumber(value: VoxeetSDK.shared.conference.isMuted()))
	}
	
	/// Gets the participant's current speaking status.
	/// - Parameters:
	///   - participant: participant object
	///   - resolve: returns on success
	///   - reject: returns error on failure
	@objc(isSpeaking:resolver:rejecter:)
	public func isSpeaking(
		participant: [String: Any],
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		guard let participantObject = current?.findParticipant(with: participant.identifier) else {
			ModuleError.noParticipant(participant.description).send(with: reject)
			return
		}
		resolve(NSNumber(value: VoxeetSDK.shared.conference.isSpeaking(participant: participantObject)))
	}
	
	/// Provides standard WebRTC statistics for the application.
	/// - Parameters:
	///   - resolve: returns local stats on success
	///   - reject: returns error on failure
	@objc(getLocalStats:rejecter:)
	public func getLocalStats(
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		guard let localStats = VoxeetSDK.shared.conference.localStats() else {
			ModuleError.noLocalStats.send(with: reject)
			return
		}
		resolve(localStats)
	}
	
	// MARK: - Setters
	
	/// Enables and disables audio processing for the conference participant..
	/// - Parameters:
	///   - processingOptions: participant object
	///   - resolve: returns on success
	///   - reject: returns error on failure
	@objc(setAudioProcessing:resolver:rejecter:)
	public func setAudioProcessing(
		processingOptions: [String: Any],
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		guard let audioProcessing = processingOptions.audioProcessing else {
			ModuleError.invalidOptions(processingOptions.description).send(with: reject)
			return
		}
		VoxeetSDK.shared.conference.audioProcessing(enable: audioProcessing.boolValue)
		resolve(NSNull())
	}
	
	/// Sets the maximum number of video streams that may be transmitted to the local participant.
	/// - Parameters:
	///   - maxVideoForwarding: The maximum number of video streams that may be transmitted to the local participant.
	///   - participants: The list of the prioritized participants.
	///   - resolve: returns on success
	///   - reject: returns error on failure
	@objc(setMaxVideoForwarding:participants:resolver:rejecter:)
	public func setMaxVideoForwarding(
		maxVideoForwarding: Int,
		participants: [[String:Any]],
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		VoxeetSDK.shared.conference.videoForwarding(
			max: maxVideoForwarding,
			participants: participants.compactMap { current?.findParticipant(with: $0.identifier) }) { error in
				guard let error = error else {
					resolve(NSNull())
					return
				}
				error.send(with: reject)
			}
	}
	
	/// Mutes or unmutes output (only compatible with Dolby Voice conferences).
	/// - Parameters:
	///   - isMuted: <code>true</code> if user mutes output. Otherwise, <code>false</code>.
	///   - resolve: returns on success
	///   - reject: returns error on failure
	@objc(muteOutput:resolver:rejecter:)
	public func muteOutput(
		isMuted: Bool,
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		VoxeetSDK.shared.conference.muteOutput(isMuted) { error in
			guard let error = error else {
				resolve(NSNull())
				return
			}
			error.send(with: reject)
		}
	}
	
	/// Mutes or unmutes the specified user.
	/// - Parameters:
	///   - participant: the participant you want to mute.
	///   - resolve: returns on success
	///   - reject: returns error on failure
	@objc(mute:participant:resolver:rejecter:)
	public func mute(
		isMuted: Bool,
		participant: [String: Any],
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		guard let participantObject = current?.findParticipant(with: participant.identifier) else {
			ModuleError.noParticipant(participant.description).send(with: reject)
			return
		}
		VoxeetSDK.shared.conference.mute(
			participant: participantObject,
			isMuted: isMuted) { error in
				guard let error = error else {
					resolve(NSNull())
					return
				}
				error.send(with: reject)
			}
	}
}

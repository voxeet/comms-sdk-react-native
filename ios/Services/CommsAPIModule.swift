import Foundation
import VoxeetSDK

// MARK: - Supported Events
private enum EventKeys: String, CaseIterable {
	case refreshToken = "EVENT_SDK_TOKEN_REFRESH"
}

@objc(RNCommsAPIModule)
public class CommsAPIModule: ReactEmitter {

	private var refreshToken: ((String?) -> Void)?

	// MARK: - Events Setup
	@objc(supportedEvents)
	override public func supportedEvents() -> [String] {
		return EventKeys.allCases.mapToStrings()
	}

	/// Initializes the CommsSDK using the customer key and secret.
	/// - Parameters:
	///   - consumerKey: consumer key
	///	  - consumerSecret: consumer secret
	///   - resolve: returns on success
	///   - reject: returns error on failure
	@objc(initialize:consumerSecret:resolver:rejecter:)
	public func initialize(
		consumerKey: String,
		consumerSecret: String,
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		VoxeetSDK.shared.initialize(consumerKey: consumerKey, consumerSecret: consumerSecret)
		setupSDK()
		resolve(NSNull())
	}

	/// Initializes the SDK with an access token that is provided by the customer's backend
	/// communicating with the Dolbyio servers.
	/// - Parameters:
	///	  - accessToken: the access token that is provided by the customer's backend
	///   - resolve: returns on success
	///   - reject: returns error on failure
	@objc(initializeToken:resolver:rejecter:)
	public func initializeToken(
		accessToken: String,
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		VoxeetSDK.shared.initialize(accessToken: accessToken) { [weak self] closure, _ in
			self?.refreshToken = closure
			self?.send(event: EventKeys.refreshToken, body: NSNull())
		}
		setupSDK()
		resolve(NSNull())
	}

	/// Emits an access token to a callback.
	/// - Parameters:
	///	  - accessToken: access token
	///   - resolve: returns current recording object
	///   - reject: returns error on failure
	@objc(onAccessTokenOk:resolver:rejecter:)
	public func onAccessTokenOk(
		accessToken: String,
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		refreshToken?(accessToken)
		resolve(NSNull())
	}

	/// Emits an error to a callback.
	/// - Parameters:
	///	  - error: reason of the refresh token failure
	///   - resolve: returns current recording object
	///   - reject: returns error on failure
	@objc(onAccessTokenKo:resolver:rejecter:)
	public func onAccessTokenKo(
		error: String?,
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		refreshToken?(nil)
		resolve(NSNull())
	}

	private func setupSDK() {
		VoxeetSDK.shared.telemetry.platform = .reactNative

		if let appGroup = Bundle.appGroup {
			VoxeetSDK.shared.appGroup = appGroup
		}

		if let preferredExtension = Bundle.preferredExtension {
			VoxeetSDK.shared.preferredExtension = preferredExtension
		}
	}
}

private extension Bundle {
	/// Returns the App Group name from main Info.plist file
	static var appGroup: String? {
		return Bundle.main.object(forInfoDictionaryKey: "CommsSDKAppGroupKey") as? String
	}

	/// Returns the Broadcast Extension Bundle Identifier from main Info.plist file
	static var preferredExtension: String? {
		return Bundle.main.object(forInfoDictionaryKey: "CommsSDKPreferredExtensionKey") as? String
	}
}

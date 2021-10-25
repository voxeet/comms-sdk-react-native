import Foundation
import VoxeetSDK

@objc(RNDolbyioIAPISdk)
public class DolbyIoIAPIModule: NSObject {
	private var refreshToken: ((String?) -> Void)?

	/// Initializes the Voxeet SDK using the customer key and secret.
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
		setupSDK()
		VoxeetSDK.shared.initialize(consumerKey: consumerKey, consumerSecret: consumerSecret)
		resolve(NSNull())
	}

	/// Initializes the SDK with an access token that is provided by the customer's backend
	/// communicating with the Voxeet servers. 
	/// - Parameters:
	///	  - accessToken: the access token that is provided by the customer's backend
	///   - resolve: returns on success
	///   - reject: returns error on failure
	@objc(initialize:resolver:rejecter:)
	public func initialize(
		accessToken: String,
		resolve: @escaping RCTPromiseResolveBlock,
		reject: @escaping RCTPromiseRejectBlock
	) {
		setupSDK()
		VoxeetSDK.shared.initialize(accessToken: accessToken) { [weak self] closure, _ in
			self?.refreshToken = closure
		}
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
		VoxeetSDK.shared.notification.push.type = .callKit
		VoxeetSDK.shared.telemetry.platform = .reactNative
	}
}

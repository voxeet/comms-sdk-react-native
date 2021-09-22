#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RNDolbyioIAPISdk : RCTEventEmitter <RCTBridgeModule>

/// Initializes the Voxeet SDK using the customer key and secret.
/// \discussion
/// For security purposes, prefer using the
/// \code
/// - (void)initializeToken:(NSString *)accessToken
///                 resolve:(RCTPromiseResolveBlock)resolve
///                rejecter:(RCTPromiseRejectBlock)reject;
/// \endcode
///
/// \param consumerKey consumer key
///
/// \param consumerSecret consumer secret
///
/// \param resolve returns resolve promise on success
///
- (void)initialize:(NSString *)consumerKey
    consumerSecret:(NSString *)consumerSecret
           resolve:(RCTPromiseResolveBlock)resolve
          rejecter:(RCTPromiseRejectBlock)reject;

/// Initializes the SDK with an access token that is provided by the customer's backend
/// communicating with the Voxeet servers. The access token allows securing the customer key and
/// secret. Due to a limited period of validity for security reasons, the token needs to be
/// refreshed. To refresh the token, the iOS Voxeet SDK calls the callback that calls the
/// customer's backend and returns a closure containing the refreshed access token. Then this
/// method emitts a refreshToken event that can be handled by the React Native.
///
/// \param accessToken the access token that is provided by the customer's backend
///
/// \param resolve returns resolve promise on success
///
- (void)initializeToken:(NSString *)accessToken
                resolve:(RCTPromiseResolveBlock)resolve
               rejecter:(RCTPromiseRejectBlock)reject;

/// Emits an access token to a callback.
///
/// \param accessToken access token
///
/// \param resolve returns resolve promise on success
///
- (void)onAccessTokenOk:(NSString *)accessToken
                resolve:(RCTPromiseResolveBlock)resolve
               rejecter:(RCTPromiseRejectBlock)reject;

/// Emits an error to a callback.
///
/// \param error reason of the refresh token failure
///
/// \param resolve returns resolve promise on success
///
- (void)onAccessTokenKo:(NSString *)error
                resolve:(RCTPromiseResolveBlock)resolve
               rejecter:(RCTPromiseRejectBlock)reject;
@end

#import "RNDolbyioIAPISdk.h"
#import <React/RCTLog.h>

@import VoxeetSDK;

typedef void (^RefreshAccessTokenClosure)(NSString *);

@interface RNDolbyioIAPISdk()

@property (nonatomic, copy) RefreshAccessTokenClosure refreshAccessTokenClosure;

@end

@implementation RNDolbyioIAPISdk
{
    BOOL _hasListeners;
}

RCT_EXPORT_MODULE(DolbyIoIAPIModule)

- (void)setupSDK
{
    VoxeetSDK.shared.notification.push.type = VTNotificationPushTypeCallKit;
    VoxeetSDK.shared.telemetry.platform = VTTelemetryPlatformReactNative;
}

#pragma mark: React Methods

RCT_EXPORT_METHOD(initialize:(NSString *)consumerKey
                  consumerSecret:(NSString *)consumerSecret
                  resolve:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    RCTLogInfo(@"initialize:consumerSecret");
    [self setupSDK];
    [VoxeetSDK.shared initializeWithConsumerKey:consumerKey
                                 consumerSecret:consumerSecret];
    resolve(nil);
}

RCT_EXPORT_METHOD(initializeToken:(NSString *)accessToken
                  resolve:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    RCTLogInfo(@"initializeToken");
    [self setupSDK];
    [VoxeetSDK.shared initializeWithAccessToken:accessToken
                   refreshTokenClosureWithParam:^(void (^closure)(NSString *), BOOL isExpired) {
        self.refreshAccessTokenClosure = closure;
        if (self->_hasListeners) {
            [self sendEventRefreshToken];
        }
    }];
    resolve(nil);
}

RCT_EXPORT_METHOD(onAccessTokenOk:(NSString *)accessToken
                  resolve:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    RCTLogInfo(@"onAccessTokenOk");
    self.refreshAccessTokenClosure(accessToken);
    resolve(nil);
}

RCT_EXPORT_METHOD(onAccessTokenKo:(NSString *)error
                  resolve:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    RCTLogInfo(@"onAccessTokenKo");
    self.refreshAccessTokenClosure(nil);
    resolve(nil);
}

#pragma mark: Events

- (NSArray<NSString *> *)supportedEvents
{
    return @[@"refreshToken"];
}

- (void)sendEventRefreshToken
{
    RCTLogInfo(@"sendEventRefreshToken");
    [self sendEventWithName:@"refreshToken" body:nil];
}

@end

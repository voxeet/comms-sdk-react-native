#import "RNSessionServiceModule.h"
#import "RNConferenceServiceModule.h"
#import "VTParticipantInfo+ReactModel.h"
#import "VTParticipant+ReactModel.h"
#import <React/RCTLog.h>

@import VoxeetSDK;

@implementation RNSessionServiceModule

RCT_EXPORT_MODULE(DolbyIoIAPISessionServiceModule)

RCT_EXPORT_METHOD(open:(NSDictionary * _Nonnull)userInfo
                  resolve:(RCTPromiseResolveBlock _Nonnull)resolve
                  rejecter:(RCTPromiseRejectBlock _Nonnull)reject)
{
    [VoxeetSDK.shared.session openWithInfo:[VTParticipantInfo createWithDictionary:userInfo]
                                completion:^(NSError *error) {
        if (error != nil) {
            reject(@"error", [error localizedDescription], error);
        } else {
            resolve(nil);
        }
    }];
}

RCT_EXPORT_METHOD(close:(RCTPromiseResolveBlock _Nonnull)resolve
                  rejecter:(RCTPromiseRejectBlock _Nonnull)reject)
{
    [VoxeetSDK.shared.session closeWithCompletion:^(NSError *error) {
        if (error != nil) {
            reject(@"error", [error localizedDescription], error);
        } else {
            resolve(nil);
        }
    }];
}

RCT_EXPORT_METHOD(getParticipant:(RCTPromiseResolveBlock _Nonnull)resolve
                  rejecter:(RCTPromiseRejectBlock _Nonnull)reject)
{
    VTParticipant* participant = [VoxeetSDK.shared.session participant];
    if (participant != nil) {
        resolve([participant reactDescription]);
    } else {
        reject(@"error", @"No current session user.", nil);
    }
}

@end

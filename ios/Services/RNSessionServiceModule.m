#import "RNSessionServiceModule.h"
#import "RNConferenceServiceModule.h"
#import "VTParticipantInfo+ReactModel.h"
#import <React/RCTLog.h>

@import VoxeetSDK;

@implementation RNSessionServiceModule

RCT_EXPORT_MODULE(DolbyIoIAPISessionServiceModule)

RCT_EXPORT_METHOD(open:(NSDictionary *)userInfo
                  resolve:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    RCTLogInfo(@"open");
    [VoxeetSDK.shared.session openWithInfo:[VTParticipantInfo createParticipantInfo:userInfo]
                                completion:^(NSError *error) {
        if (error != nil) {
            reject(@"connect_error", [error localizedDescription], nil);
        } else {
            resolve(nil);
        }
    }];
}

@end

#import "RNSessionServiceModule.h"
#import <React/RCTLog.h>

@import VoxeetSDK;

@implementation RNSessionServiceModule

RCT_EXPORT_MODULE(DolbyIoIAPISessionServiceModule)

RCT_EXPORT_METHOD(open:(NSDictionary *)userInfo
                  resolve:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    RCTLogInfo(@"open");
    NSString *externalID = userInfo[@"externalId"];
    NSString *name = userInfo[@"name"];
    NSString *avatarURL = userInfo[@"avatarUrl"];
    
    VTParticipantInfo *participantInfo = [[VTParticipantInfo alloc]
                                          initWithExternalID:![externalID isEqual:[NSNull null]] ? externalID : nil
                                          name:![name isEqual:[NSNull null]] ? name : nil
                                          avatarURL: ![avatarURL isEqual:[NSNull null]] ? avatarURL : nil];
    
    [VoxeetSDK.shared.session openWithInfo:participantInfo completion:^(NSError *error) {
        if (error != nil) {
            reject(@"connect_error", [error localizedDescription], nil);
        } else {
            resolve(nil);
        }
    }];
}

@end

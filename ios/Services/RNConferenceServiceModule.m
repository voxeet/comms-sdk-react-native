#import "RNConferenceServiceModule.h"
#import "VTConference+ReactModel.h"
#import "VTParticipant+ReactModel.h"
#import "VTConferenceOptions+ReactModel.h"
#import "VTConferenceParameters+ReactModel.h"
#import "VTJoinOptions+ReactModel.h"
#import <React/RCTLog.h>

@import VoxeetSDK;

@implementation RNConferenceServiceModule

RCT_EXPORT_MODULE(DolbyIoIAPIConferenceService)

RCT_EXPORT_METHOD(create:(NSDictionary *)options
                  resolve:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    RCTLogInfo(@"create");
    [VoxeetSDK.shared.conference createWithOptions:[VTConferenceOptions createWithDictionary:options]
                                           success:^(VTConference *conference) {
        resolve([conference reactDescription]);
    } fail:^(NSError *error) {
        reject(@"create_error", [error localizedDescription], nil);
    }];
}

RCT_EXPORT_METHOD(fetch:(NSString *)conferenceId
                  resolve:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    RCTLogInfo(@"fetch");
    [VoxeetSDK.shared.conference fetchWithConferenceID:conferenceId
                                            completion:^(VTConference *conference) {
        if (conference == nil) {
            reject(@"fetch_error", @"Couldn't find the conference", nil);
        } else {
            resolve([conference reactDescription]);
        }
    }];
}

RCT_EXPORT_METHOD(join:(NSDictionary *)conference
                  options:(NSDictionary *)options
                  resolve:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    RCTLogInfo(@"join");
    NSString *conferenceId = conference[@"id"];
    if (conferenceId == nil) {
        reject(@"join_error", @"Conference should contain conferenceId", nil);
        return;
    }
    
    [VoxeetSDK.shared.conference fetchWithConferenceID:conferenceId
                                            completion:^(VTConference *fetchedConference) {
        if (conference == nil) {
            reject(@"fetch_error", @"Couldn't find the conference", nil);
        }
        [VoxeetSDK.shared.conference joinWithConference:fetchedConference
                                                options:[VTJoinOptions createWithDictionary:options]
                                                success:^(VTConference *joinedConference) {
            resolve([joinedConference reactDescription]);
        }
                                                   fail:^(NSError *error) {
            reject(@"join_error", [error localizedDescription], nil);
        }];
    }];
}

@end

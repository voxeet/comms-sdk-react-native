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

RCT_EXPORT_METHOD(create:(NSDictionary * _Nullable)options
                  resolve:(RCTPromiseResolveBlock _Nonnull)resolve
                  rejecter:(RCTPromiseRejectBlock _Nonnull)reject)
{
    RCTLogInfo(@"create");
    [VoxeetSDK.shared.conference createWithOptions:[VTConferenceOptions createWithDictionary:options]
                                           success:^(VTConference *conference) {
        resolve([conference reactDescription]);
    } fail:^(NSError *error) {
        reject(@"create_error", [error localizedDescription], nil);
    }];
}

RCT_EXPORT_METHOD(fetch:(NSString * _Nonnull)conferenceId
                  resolve:(RCTPromiseResolveBlock _Nonnull)resolve
                  rejecter:(RCTPromiseRejectBlock _Nonnull)reject)
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

RCT_EXPORT_METHOD(join:(NSDictionary * _Nonnull)conference
                  options:(NSDictionary * _Nullable)options
                  resolve:(RCTPromiseResolveBlock _Nonnull)resolve
                  rejecter:(RCTPromiseRejectBlock _Nonnull)reject)
{
    RCTLogInfo(@"join");
    NSString * conferenceId = [conference conferenceId];
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

#pragma mark - Getters -

RCT_EXPORT_METHOD(current:(RCTPromiseResolveBlock _Nonnull)resolve
                  rejecter:(RCTPromiseRejectBlock _Nonnull)reject)
{
    RCTLogInfo(@"current");
    VTConference *conference = [VoxeetSDK.shared.conference current];
    if(conference) {
        resolve([conference reactDescription]);
    } else {
        reject(@"current_error", @"Missing current conference", nil);
    }
}

RCT_EXPORT_METHOD(getAudioLevel:(NSDictionary * _Nonnull)participant
                  resolve:(RCTPromiseResolveBlock _Nonnull)resolve
                  rejecter:(RCTPromiseRejectBlock _Nonnull)reject)
{
    RCTLogInfo(@"getAudioLevel");
    VTParticipant* participantObject = [[VoxeetSDK.shared.conference current] findParticipant:participant];
    if(participantObject != nil) {
        resolve(@([VoxeetSDK.shared.conference audioLevelWithParticipant:participantObject]));
    } else {
        reject(@"audioLevel_error", @"Couldn't find the participant", nil);
    }
}

RCT_EXPORT_METHOD(getMaxVideoForwarding:(RCTPromiseResolveBlock _Nonnull)resolve
                  rejecter:(RCTPromiseRejectBlock _Nonnull)reject)
{
    RCTLogInfo(@"getMaxVideoForwarding");
    resolve(@([VoxeetSDK.shared.conference maxVideoForwarding]));
}

RCT_EXPORT_METHOD(getParticipant:(NSString * _Nonnull)participantId
                  resolve:(RCTPromiseResolveBlock _Nonnull)resolve
                  rejecter:(RCTPromiseRejectBlock _Nonnull)reject)
{
    RCTLogInfo(@"ConferenceService - getParticipant");
    VTParticipant* participant = [[VoxeetSDK.shared.conference current] findParticipantWithId:participantId];
    if(participant != nil) {
        resolve([participant reactDescription]);
    } else {
        reject(@"getParticipant_error", @"Couldn't find the participant", nil);
    }
}

RCT_EXPORT_METHOD(getParticipants:(NSDictionary * _Nonnull)conference
                  resolve:(RCTPromiseResolveBlock _Nonnull)resolve
                  rejecter:(RCTPromiseRejectBlock _Nonnull)reject)
{
    RCTLogInfo(@"getParticipants");
    NSString* conferenceId = [conference conferenceId];
    
    if(conferenceId == nil) {
        reject(@"fetch_error", @"Couldn't find the conference", nil);
        return;
    }
    [VoxeetSDK.shared.conference fetchWithConferenceID:conferenceId
                                            completion:^(VTConference *conference) {
        if (conference == nil) {
            reject(@"fetch_error", @"Couldn't find the conference", nil);
        } else {
            resolve([[conference reactDescription] conferenceParticipants]);
        }
    }];
}

RCT_EXPORT_METHOD(getStatus:(NSDictionary * _Nonnull)conference
                  resolve:(RCTPromiseResolveBlock _Nonnull)resolve
                  rejecter:(RCTPromiseRejectBlock _Nonnull)reject)
{
    RCTLogInfo(@"getStatus");
    NSString* conferenceId = [conference conferenceId];
    
    if(conferenceId == nil) {
        reject(@"fetch_error", @"Couldn't find the conference", nil);
        return;
    }
    [VoxeetSDK.shared.conference fetchWithConferenceID:conferenceId
                                            completion:^(VTConference *conference) {
        NSString * _Nonnull status = [[conference reactDescription] conferenceStatus];
        if (status == nil) {
            reject(@"status_error", @"Couldn't find the conference status", nil);
        } else {
            resolve(status);
        }
    }];
}

RCT_EXPORT_METHOD(isMuted:(RCTPromiseResolveBlock _Nonnull)resolve
                  rejecter:(RCTPromiseRejectBlock _Nonnull)reject)
{
    RCTLogInfo(@"isMuted");
    resolve(@([VoxeetSDK.shared.conference isMuted]));
}

RCT_EXPORT_METHOD(isSpeaking:(NSDictionary * _Nonnull)participant
                  resolve:(RCTPromiseResolveBlock _Nonnull)resolve
                  rejecter:(RCTPromiseRejectBlock _Nonnull)reject)
{
    RCTLogInfo(@"isSpeaking");
    VTParticipant* participantObject = [[VoxeetSDK.shared.conference current] findParticipant:participant];
    if(participantObject != nil) {
        resolve(@([VoxeetSDK.shared.conference isSpeakingWithParticipant:participantObject]));
    } else {
        reject(@"isSpeaking_error", @"Couldn't find the participant", nil);
    }
}

@end

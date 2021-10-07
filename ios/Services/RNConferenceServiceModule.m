#import "RNConferenceServiceModule.h"
#import "VTConference+ReactModel.h"
#import "VTParticipant+ReactModel.h"
#import "VTConferenceOptions+ReactModel.h"
#import "VTConferenceParameters+ReactModel.h"
#import "VTJoinOptions+ReactModel.h"
#import "NSDictionary+AudioProcessingOptions.h"
#import <React/RCTLog.h>

@import VoxeetSDK;

@implementation RNConferenceServiceModule

RCT_EXPORT_MODULE(DolbyIoIAPIConferenceService)

RCT_EXPORT_METHOD(create:(NSDictionary * _Nullable)options
                  resolve:(RCTPromiseResolveBlock _Nonnull)resolve
                  rejecter:(RCTPromiseRejectBlock _Nonnull)reject)
{
    [VoxeetSDK.shared.conference createWithOptions:[VTConferenceOptions createWithDictionary:options]
                                           success:^(VTConference *conference) {
        resolve([conference reactDescription]);
    } fail:^(NSError *error) {
        reject(@"error", [error localizedDescription], error);
    }];
}

RCT_EXPORT_METHOD(fetch:(NSString * _Nonnull)conferenceId
                  resolve:(RCTPromiseResolveBlock _Nonnull)resolve
                  rejecter:(RCTPromiseRejectBlock _Nonnull)reject)
{
    [VoxeetSDK.shared.conference fetchWithConferenceID:conferenceId
                                            completion:^(VTConference *conference) {
        if (conference != nil) {
            resolve([conference reactDescription]);
        } else {
            reject(@"error", @"Couldn't find the conference.", nil);
        }
    }];
}

RCT_EXPORT_METHOD(join:(NSDictionary * _Nonnull)conference
                  options:(NSDictionary * _Nullable)options
                  resolve:(RCTPromiseResolveBlock _Nonnull)resolve
                  rejecter:(RCTPromiseRejectBlock _Nonnull)reject)
{
    NSString * conferenceId = [conference conferenceId];
    if (conferenceId == nil) {
        reject(@"error", @"Conference should contain conferenceId.", nil);
        return;
    }
    
    [VoxeetSDK.shared.conference fetchWithConferenceID:conferenceId
                                            completion:^(VTConference *fetchedConference) {
        if (conference == nil) {
            reject(@"error", @"Couldn't find the conference.", nil);
        }
        [VoxeetSDK.shared.conference joinWithConference:fetchedConference
                                                options:[VTJoinOptions createWithDictionary:options]
                                                success:^(VTConference *joinedConference) {
            resolve([joinedConference reactDescription]);
        }
                                                   fail:^(NSError *error) {
            reject(@"error", [error localizedDescription], error);
        }];
    }];
}

RCT_EXPORT_METHOD(kick:(NSDictionary * _Nonnull)participant
                  resolve:(RCTPromiseResolveBlock _Nonnull)resolve
                  rejecter:(RCTPromiseRejectBlock _Nonnull)reject)
{
    VTParticipant* participantObject = [[VoxeetSDK.shared.conference current] findParticipant:participant];
    if(participantObject != nil) {
        [VoxeetSDK.shared.conference kickWithParticipant:participantObject
                                              completion:^(NSError * _Nullable error) {
            if (error != nil) {
                reject(@"error", [error localizedDescription], error);
            } else {
                resolve(nil);
            }
        }];
    } else {
        reject(@"error", [NSString stringWithFormat:@"Couldn't find the participant: %@", [participant description]], nil);
    }
}

RCT_EXPORT_METHOD(leave:(RCTPromiseResolveBlock _Nonnull)resolve
                  rejecter:(RCTPromiseRejectBlock _Nonnull)reject)
{
    [VoxeetSDK.shared.conference leaveWithCompletion:^(NSError * _Nullable error) {
        if (error != nil) {
            reject(@"error", [error localizedDescription], error);
        } else {
            resolve(nil);
        }
    }];
}

RCT_EXPORT_METHOD(startAudio:(NSDictionary * _Nonnull)participant
                  resolve:(RCTPromiseResolveBlock _Nonnull)resolve
                  rejecter:(RCTPromiseRejectBlock _Nonnull)reject)
{
    VTParticipant* participantObject = [[VoxeetSDK.shared.conference current] findParticipant:participant];
    if(participantObject != nil) {
        [VoxeetSDK.shared.conference startAudioWithParticipant:participantObject
                                                    completion:^(NSError *error) {
            if (error != nil) {
                reject(@"error", [error localizedDescription], error);
            } else {
                resolve(nil);
            }
        }];
    } else {
        reject(@"error", [NSString stringWithFormat:@"Couldn't find the participant: %@", [participant description]], nil);
    }
}

RCT_EXPORT_METHOD(startVideo:(NSDictionary * _Nonnull)participant
                  resolve:(RCTPromiseResolveBlock _Nonnull)resolve
                  rejecter:(RCTPromiseRejectBlock _Nonnull)reject)
{
    VTParticipant* participantObject = [[VoxeetSDK.shared.conference current] findParticipant:participant];
    if(participantObject != nil) {
        [VoxeetSDK.shared.conference startVideoWithParticipant:participantObject
                                                    completion:^(NSError *error) {
            if (error != nil) {
                reject(@"error", [error localizedDescription], error);
            } else {
                resolve(nil);
            }
        }];
    } else {
        reject(@"error", [NSString stringWithFormat:@"Couldn't find the participant: %@", [participant description]], nil);
    }
}

RCT_EXPORT_METHOD(stopAudio:(NSDictionary * _Nonnull)participant
                  resolve:(RCTPromiseResolveBlock _Nonnull)resolve
                  rejecter:(RCTPromiseRejectBlock _Nonnull)reject)
{
    VTParticipant* participantObject = [[VoxeetSDK.shared.conference current] findParticipant:participant];
    if(participantObject != nil) {
        [VoxeetSDK.shared.conference stopAudioWithParticipant:participantObject
                                                    completion:^(NSError *error) {
            if (error != nil) {
                reject(@"error", [error localizedDescription], error);
            } else {
                resolve(nil);
            }
        }];
    } else {
        reject(@"error", [NSString stringWithFormat:@"Couldn't find the participant: %@", [participant description]], nil);
    }
}

RCT_EXPORT_METHOD(stopVideo:(NSDictionary * _Nonnull)participant
                  resolve:(RCTPromiseResolveBlock _Nonnull)resolve
                  rejecter:(RCTPromiseRejectBlock _Nonnull)reject)
{
    VTParticipant* participantObject = [[VoxeetSDK.shared.conference current] findParticipant:participant];
    if(participantObject != nil) {
        [VoxeetSDK.shared.conference stopVideoWithParticipant:participantObject
                                                    completion:^(NSError *error) {
            if (error != nil) {
                reject(@"error", [error localizedDescription], error);
            } else {
                resolve(nil);
            }
        }];
    } else {
        reject(@"error", [NSString stringWithFormat:@"Couldn't find the participant: %@", [participant description]], nil);
    }
}

#pragma mark - Getters -

RCT_EXPORT_METHOD(current:(RCTPromiseResolveBlock _Nonnull)resolve
                  rejecter:(RCTPromiseRejectBlock _Nonnull)reject)
{
    VTConference *conference = [VoxeetSDK.shared.conference current];
    if(conference != nil) {
        resolve([conference reactDescription]);
    } else {
        reject(@"error", @"Missing current conference.", nil);
    }
}

RCT_EXPORT_METHOD(getAudioLevel:(NSDictionary * _Nonnull)participant
                  resolve:(RCTPromiseResolveBlock _Nonnull)resolve
                  rejecter:(RCTPromiseRejectBlock _Nonnull)reject)
{
    VTParticipant* participantObject = [[VoxeetSDK.shared.conference current] findParticipant:participant];
    if(participantObject != nil) {
        resolve(@([VoxeetSDK.shared.conference audioLevelWithParticipant:participantObject]));
    } else {
        reject(@"error", @"Couldn't find the participant.", nil);
    }
}

RCT_EXPORT_METHOD(getMaxVideoForwarding:(RCTPromiseResolveBlock _Nonnull)resolve
                  rejecter:(RCTPromiseRejectBlock _Nonnull)reject)
{
    resolve(@([VoxeetSDK.shared.conference maxVideoForwarding]));
}

RCT_EXPORT_METHOD(getParticipant:(NSString * _Nonnull)participantId
                  resolve:(RCTPromiseResolveBlock _Nonnull)resolve
                  rejecter:(RCTPromiseRejectBlock _Nonnull)reject)
{
    VTParticipant* participant = [[VoxeetSDK.shared.conference current] findParticipantWithId:participantId];
    if(participant != nil) {
        resolve([participant reactDescription]);
    } else {
        reject(@"error", @"Couldn't find the participant.", nil);
    }
}

RCT_EXPORT_METHOD(getParticipants:(NSDictionary * _Nonnull)conference
                  resolve:(RCTPromiseResolveBlock _Nonnull)resolve
                  rejecter:(RCTPromiseRejectBlock _Nonnull)reject)
{
    NSString* conferenceId = [conference conferenceId];
    
    if(conferenceId == nil) {
        reject(@"error", @"Couldn't find the conference.", nil);
        return;
    }
    [VoxeetSDK.shared.conference fetchWithConferenceID:conferenceId
                                            completion:^(VTConference *conference) {
        if (conference != nil) {
            resolve([[conference reactDescription] conferenceParticipants]);
        } else {
            reject(@"error", @"Couldn't find the conference.", nil);
        }
    }];
}

RCT_EXPORT_METHOD(getStatus:(NSDictionary * _Nonnull)conference
                  resolve:(RCTPromiseResolveBlock _Nonnull)resolve
                  rejecter:(RCTPromiseRejectBlock _Nonnull)reject)
{
    NSString* conferenceId = [conference conferenceId];
    
    if(conferenceId == nil) {
        reject(@"error", @"Couldn't find the conference.", nil);
        return;
    }
    [VoxeetSDK.shared.conference fetchWithConferenceID:conferenceId
                                            completion:^(VTConference *conference) {
        NSString * _Nonnull status = [[conference reactDescription] conferenceStatus];
        if (status != nil) {
            resolve(status);
        } else {
            reject(@"error", @"Couldn't find the conference status.", nil);
        }
    }];
}

RCT_EXPORT_METHOD(isMuted:(RCTPromiseResolveBlock _Nonnull)resolve
                  rejecter:(RCTPromiseRejectBlock _Nonnull)reject)
{
    resolve(@([VoxeetSDK.shared.conference isMuted]));
}

RCT_EXPORT_METHOD(isSpeaking:(NSDictionary * _Nonnull)participant
                  resolve:(RCTPromiseResolveBlock _Nonnull)resolve
                  rejecter:(RCTPromiseRejectBlock _Nonnull)reject)
{
    VTParticipant* participantObject = [[VoxeetSDK.shared.conference current] findParticipant:participant];
    if(participantObject != nil) {
        resolve(@([VoxeetSDK.shared.conference isSpeakingWithParticipant:participantObject]));
    } else {
        reject(@"error", @"Couldn't find the participant.", nil);
    }
}

#pragma mark - Setters -

RCT_EXPORT_METHOD(setAudioProcessing:(NSDictionary * _Nonnull)processingOptions
                  resolve:(RCTPromiseResolveBlock _Nonnull)resolve
                  rejecter:(RCTPromiseRejectBlock _Nonnull)reject)
{
    NSNumber *option = [processingOptions audioProcessing];
    if(option != nil && [option isKindOfClass:[NSNumber class]]) {
        [VoxeetSDK.shared.conference audioProcessingWithEnable:[option boolValue]];
        resolve(nil);
    } else {
        reject(@"error", [NSString stringWithFormat:@"invalid options: %@", [processingOptions description]], nil);
    }
}

RCT_EXPORT_METHOD(setMaxVideoForwarding:(NSInteger)maxVideoForwarding
                  resolve:(RCTPromiseResolveBlock _Nonnull)resolve
                  rejecter:(RCTPromiseRejectBlock _Nonnull)reject)
{
    [VoxeetSDK.shared.conference videoForwardingWithMax:maxVideoForwarding
                                           participants:nil
                                             completion:^(NSError * _Nullable error) {
        if(error != nil) {
            reject(@"error", [error localizedDescription], error);
        } else {
            resolve(nil);
        }
    }];
}

RCT_EXPORT_METHOD(muteOutput:(BOOL)isMuted
                  resolve:(RCTPromiseResolveBlock _Nonnull)resolve
                  rejecter:(RCTPromiseRejectBlock _Nonnull)reject)
{
    [VoxeetSDK.shared.conference muteOutput:isMuted
                                 completion:^(NSError *error) {
        if (error != nil) {
            reject(@"error", [error localizedDescription], error);
        } else {
            resolve(nil);
        }
    }];
}

RCT_EXPORT_METHOD(mute:(BOOL)isMuted
                  participant:(NSDictionary * _Nonnull)participant
                  resolve:(RCTPromiseResolveBlock _Nonnull)resolve
                  rejecter:(RCTPromiseRejectBlock _Nonnull)reject)
{
    VTParticipant *participantObject = [[VoxeetSDK.shared.conference current] findParticipant:participant];
    if(participantObject == nil) {
        reject(@"error", [NSString stringWithFormat:@"Couldn't find the participant: %@", [participant description]], nil);
        return;
    }
    [VoxeetSDK.shared.conference muteWithParticipant:participantObject
                                             isMuted:isMuted
                                          completion:^(NSError *error) {
        if (error != nil) {
            reject(@"error", [error localizedDescription], error);
        } else {
            resolve(nil);
        }
    }];
}

@end

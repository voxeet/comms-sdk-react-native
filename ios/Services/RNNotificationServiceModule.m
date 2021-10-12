#import "RNNotificationServiceModule.h"
#import "VTConference+ReactModel.h"
#import "VTParticipantInfo+ReactModel.h"

@import VoxeetSDK;

@implementation RNNotificationServiceModule

RCT_EXPORT_MODULE(DolbyIoIAPINotificationService)

RCT_EXPORT_METHOD(invite:(NSDictionary * _Nonnull)conference
                  participants:(NSArray<NSDictionary *> * _Nonnull)participants
                  resolve:(RCTPromiseResolveBlock _Nonnull)resolve
                  rejecter:(RCTPromiseRejectBlock _Nonnull)reject)
{
    NSString *conferenceId = [conference conferenceId];
    if(conferenceId != nil) {
        [VoxeetSDK.shared.conference fetchWithConferenceID:conferenceId
                                                completion:^(VTConference *conference) {
            
            if (conference != nil) {
                [VoxeetSDK.shared.notification inviteWithConference:conference
                                                   participantInfos:[VTParticipantInfo generateWithArray:participants]
                                                         completion:^(NSError *error) {
                    if (error != nil) {
                        reject(@"error", [error localizedDescription], error);
                    } else {
                        resolve(nil);
                    }
                }];
            } else {
                reject(@"error", [NSString stringWithFormat:@"Couldn't find the conference with id: %@.", conferenceId], nil);
            }
        }];
    } else {
        reject(@"error", @"Conference should contain conferenceId.", nil);
    }
}

RCT_EXPORT_METHOD(decline:(NSDictionary * _Nonnull)conference
                  resolve:(RCTPromiseResolveBlock _Nonnull)resolve
                  rejecter:(RCTPromiseRejectBlock _Nonnull)reject)
{
    NSString *conferenceId = [conference conferenceId];
    if(conferenceId != nil) {
        [VoxeetSDK.shared.conference fetchWithConferenceID:conferenceId
                                                completion:^(VTConference *conference) {
            
            if (conference != nil) {
                [VoxeetSDK.shared.notification declineWithConference:conference
                                                          completion:^(NSError *error) {
                    if (error != nil) {
                        reject(@"error", [error localizedDescription], error);
                    } else {
                        resolve(nil);
                    }
                }];
            } else {
                reject(@"error", [NSString stringWithFormat:@"Couldn't find the conference with id: %@.", conferenceId], nil);
            }
        }];
    } else {
        reject(@"error", @"Conference should contain conferenceId.", nil);
    }
}

@end

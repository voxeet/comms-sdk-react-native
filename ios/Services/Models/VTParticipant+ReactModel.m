#import "VTParticipant+ReactModel.h"
#import "VTParticipantInfo+ReactModel.h"
#import "MediaStream+ReactModel.h"

static NSString * const keyId = @"id";
static NSString * const keyInfo = @"info";
static NSString * const keyType = @"type";
static NSString * const keyStatus = @"status";
static NSString * const keyStreams = @"streams";
static NSString * const keyAudioReceivingFrom = @"audioReceivingFrom";
static NSString * const keyAudioTransmitting = @"audioTransmitting";

@implementation VTParticipant (ReactModel)
    
- (NSDictionary * _Nonnull)reactDescription {
    return @{
        keyId: self.id ?: [NSNull null],
        keyInfo: [self.info reactDescription],
        keyType: [self typeDescription],
        keyStatus: [self statusDescription],
        keyStreams: [self streamsDescription],
        keyAudioReceivingFrom: @(self.audioReceivingFrom),
        keyAudioTransmitting: @(self.audioTransmitting)
    };
}

- (NSString *)statusDescription {
    switch (self.status) {
        case VTParticipantStatusReserved:
            return @"RESERVED";
        case VTParticipantStatusInactive:
            return @"INACTIVE";
        case VTParticipantStatusDecline:
            return @"DECLINE";
        case VTParticipantStatusConnecting:
            return @"CONNECTING";
        case VTParticipantStatusConnected:
            return @"ON_AIR";
        case VTParticipantStatusLeft:
            return @"LEFT";
        case VTParticipantStatusWarning:
            return @"WARNING";
        case VTParticipantStatusError:
            return @"ERROR";
        case VTParticipantStatusKicked:
            return @"KICKED";
    }
}

- (NSString *)typeDescription {
    switch (self.type) {
        case VTParticipantTypeNone:
            return @"NONE";
        case VTParticipantTypeUser:
            return @"USER";
        case VTParticipantTypePstn:
            return @"PSTN";
        case VTParticipantTypeListener:
            return @"LISTENER";
        case VTParticipantTypeMixer:
            return @"MIXER";
    }
}

- (NSArray<NSDictionary *> *)streamsDescription {
    NSMutableArray<NSDictionary *> *output = [NSMutableArray array];
    
    for (MediaStream *stream in self.streams) {
        [output addObject:[stream reactDescription]];
    }
    
    return output;
}

@end

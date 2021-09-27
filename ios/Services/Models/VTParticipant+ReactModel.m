#import "VTParticipant+ReactModel.h"
#import "VTParticipantInfo+ReactModel.h"
#import "MediaStream+ReactModel.h"

@implementation VTParticipant (ReactModel)
    
- (NSDictionary *)reactTranslation {
    return @{
        @"id": self.id ?: [NSNull null],
        @"info": [self.info reactTranslation],
        @"type": [self typeTranslation],
        @"status": [self statusTranslation],
        @"streams": [self streamsTranslation],
        @"audioReceivingFrom": @(self.audioReceivingFrom),
        @"audioTransmitting": @(self.audioTransmitting)
    };
}

- (NSString *)statusTranslation {
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

- (NSString *)typeTranslation {
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

- (NSArray<NSDictionary *> *)streamsTranslation {
    NSMutableArray<NSDictionary *> *output = [NSMutableArray array];
    
    for (MediaStream *stream in self.streams) {
        [output addObject:[stream reactTranslation]];
    }
    
    return output;
}

@end

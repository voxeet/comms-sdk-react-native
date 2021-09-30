#import "VTConferenceOptions+ReactModel.h"
#import "VTConferenceParameters+ReactModel.h"
#import "NSObject+Utils.h"

static NSString * const keyAlias = @"alias";
static NSString * const keyParams = @"params";
static NSString * const keyPinCode = @"pinCode";

@implementation VTConferenceOptions (ReactModel)

+ (instancetype _Nonnull)createWithDictionary:(NSDictionary * _Nonnull)dictionary {
    VTConferenceOptions *conferenceOptions = [VTConferenceOptions new];
    [conferenceOptions updateWithOptions:dictionary];
    return conferenceOptions;
}

- (NSDictionary * _Nonnull)reactDescription {
    return @{
        keyAlias: self.alias ?: [NSNull null],
        keyParams: [self.params reactDescription],
        keyPinCode: self.pinCode ?: [NSNull null]
    };
}

- (void)updateWithOptions:(NSDictionary *)options {
    if(options == nil) {
        return;
    }

    [self setValue:options[keyAlias] forKey:keyAlias type:[NSString class]];
    [self setValue:options[keyPinCode] forKey:keyPinCode type:[NSNumber class]];
    
    [self.params updateWithParams:options[keyParams]];
}

@end

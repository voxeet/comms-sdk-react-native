#import "VTConferenceOptions+ReactModel.h"
#import "VTConferenceParameters+ReactModel.h"
#import "NSObject+Utils.h"

#define KEY_ALIAS @"alias"
#define KEY_PARAMS @"params"
#define KEY_PIN_CODE @"pinCode"

@implementation VTConferenceOptions (ReactModel)

+ (instancetype)createConferenceOptions:(NSDictionary *)dictionary {
    VTConferenceOptions *conferenceOptions = [VTConferenceOptions new];
    [conferenceOptions updateWithOptions:dictionary];
    return conferenceOptions;
}

- (NSDictionary *)reactTranslation {
    return @{
        KEY_ALIAS: self.alias ?: [NSNull null],
        KEY_PARAMS: [self.params reactTranslation],
        KEY_PIN_CODE: self.pinCode ?: [NSNull null]
    };
}

- (void)updateWithOptions:(NSDictionary *)options {
    if(options == nil) {
        return;
    }

    [self setValue:options[KEY_ALIAS] forKey:KEY_ALIAS type:[NSString class]];
    [self setValue:options[KEY_PIN_CODE] forKey:KEY_PIN_CODE type:[NSNumber class]];
    
    [self.params updateWithParams:options[KEY_PARAMS]];
}

@end

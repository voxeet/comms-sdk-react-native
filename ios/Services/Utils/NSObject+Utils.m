#import "NSObject+Utils.h"

@implementation NSObject (Utils)
    
- (void)setValue:(id)value forKey:(NSString *)key type:(Class)type {
    if(value != nil && [value isKindOfClass:type]) {
        [self setValue:value forKey:key];
    }
}

@end


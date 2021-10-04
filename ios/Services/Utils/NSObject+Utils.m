#import "NSObject+Utils.h"

@implementation NSObject (Utils)
    
- (void)setValue:(id _Nullable)value forKey:(NSString * _Nonnull)key type:(Class _Nonnull)type {
    if(value != nil && [value isKindOfClass:type]) {
        [self setValue:value forKey:key];
    }
}

@end


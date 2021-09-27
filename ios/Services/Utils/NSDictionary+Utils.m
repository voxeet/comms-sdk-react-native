#import "NSDictionary+Utils.h"

@implementation NSDictionary (Utils)

- (BOOL)isNumberValueForKey:(NSString *)key
{
    return self[key] != nil && [self[key] isKindOfClass:[NSNumber class]];
}

@end

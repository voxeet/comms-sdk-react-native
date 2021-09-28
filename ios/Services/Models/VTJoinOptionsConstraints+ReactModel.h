@import VoxeetSDK;

@interface VTJoinOptionsConstraints (ReactModel)

+ (instancetype)createJoinOptionsConstraints:(NSDictionary *)dictionary;

- (NSDictionary *)reactTranslation;
- (void)updateWithConstraints: (NSDictionary *)constrains;

@end

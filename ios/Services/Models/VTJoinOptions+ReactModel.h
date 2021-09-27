@import VoxeetSDK;

@interface VTJoinOptions (ReactModel)

+ (instancetype)createJoinOptions:(NSDictionary *)dictionary;

- (NSDictionary *)reactTranslation;
- (void)updateWithOptions: (NSDictionary *)options;

@end

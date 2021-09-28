@import VoxeetSDK;

@interface VTConferenceParameters (ReactModel)

+ (instancetype)createConferenceParameters:(NSDictionary *)dictionary;

- (NSDictionary *)reactTranslation;
- (void)updateWithParams: (NSDictionary *)params;

@end

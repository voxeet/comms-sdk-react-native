#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTViewManager.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_REMAP_MODULE(COMVideoView, RNVideoViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(isMirror, BOOL);

RCT_EXPORT_VIEW_PROPERTY(scaleType, NSString);

RCT_EXPORT_VIEW_PROPERTY(onCommandEvent, RCTBubblingEventBlock);

RCT_EXTERN_METHOD(attach:(NSNumber * _Nonnull)reactTag
									dispatchId:(NSNumber * _Nonnull)dispatchId
									participantId:(NSString *)participantId
									streamId:(NSString *)streamId);

RCT_EXTERN_METHOD(detach:(NSNumber * _Nonnull)reactTag
									dispatchId:(NSNumber * _Nonnull)dispatchId);

RCT_EXTERN_METHOD(isAttached:(NSNumber * _Nonnull)reactTag
									dispatchId:(NSNumber * _Nonnull)dispatchId);


@end
